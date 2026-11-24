import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Story } from '../../types';
import { RotateCw, HelpCircle, ArrowUpRight } from 'lucide-react';

interface SpatialArchiveSphereProps {
  stories: Story[];
  className?: string;
  onSelectStory?: (story: Story) => void;
}

interface SphereNode {
  story: Story;
  // Spherical coordinates
  phi: number; // Polar angle (0 to PI)
  theta: number; // Azimuthal angle (0 to 2*PI)
  radius: number;
  // Projected 3D coordinates
  x: number;
  y: number;
  z: number;
  // Projected 2D screen coordinates
  screenX: number;
  screenY: number;
  scale: number;
  opacity: number;
  zIndex: number;
}

/**
 * AFTERIMAGE Spatial Spherical Memory Archive
 * 
 * Inspired by high-end spatial photographic galleries:
 * - Distributes heritage story memories across a virtual 3D sphere.
 * - Smooth inertial drag-to-rotate with inertia damping.
 * - Dynamic z-depth projection: memories in front are sharp, illuminated, and interactive;
 *   memories in back fade into the dark obsidian ether with subtle blur and opacity.
 * - Interactive memory inspection card on hover / focus.
 * - Touch & pointer responsive with seamless mobile fallback.
 */
export const SpatialArchiveSphere: React.FC<SpatialArchiveSphereProps> = ({
  stories,
  className = '',
  onSelectStory,
}) => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  // Rotation angles (radians)
  const [rotation, setRotation] = useState<{ x: number; y: number }>({ x: 0.1, y: 0.2 });
  const [hoveredStory, setHoveredStory] = useState<Story | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Drag physics tracking
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const rotationStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const velocityRef = useRef<{ x: number; y: number }>({ x: 0.0012, y: 0.0018 });
  const animFrameRef = useRef<number | null>(null);
  const lastPointerTimeRef = useRef<number>(0);

  // Container dimensions
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

  // Measure container
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const { clientWidth, clientHeight } = containerRef.current;
        setDimensions({
          width: clientWidth || 800,
          height: clientHeight || 600,
        });
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Golden ratio Fibonacci spiral distribution across sphere
  const sphereNodes: SphereNode[] = useMemo(() => {
    const count = stories.length;
    if (count === 0) return [];

    const isMobile = dimensions.width < 640;
    const sphereRadius = isMobile 
      ? Math.min(dimensions.width * 0.42, 220)
      : Math.min(dimensions.width * 0.36, dimensions.height * 0.42, 360);

    const goldenAngle = Math.PI * (3 - Math.sqrt(5)); // ~2.39996 rad

    return stories.map((story, i) => {
      // Fibonacci sphere distribution for even, aesthetic spacing
      const yNorm = 1 - (i / (count - 1 || 1)) * 2; // from 1 to -1
      const radiusAtY = Math.sqrt(Math.max(0, 1 - yNorm * yNorm));
      const theta = goldenAngle * i;

      // Base spherical coordinates
      const baseX = Math.cos(theta) * radiusAtY * sphereRadius;
      const baseY = yNorm * sphereRadius;
      const baseZ = Math.sin(theta) * radiusAtY * sphereRadius;

      // Apply 3D rotation matrix around X and Y axes
      // 1. Rotate around Y axis (horizontal drag)
      const cosY = Math.cos(rotation.y);
      const sinY = Math.sin(rotation.y);
      const x1 = baseX * cosY - baseZ * sinY;
      const z1 = baseX * sinY + baseZ * cosY;

      // 2. Rotate around X axis (vertical drag)
      const cosX = Math.cos(rotation.x);
      const sinX = Math.sin(rotation.x);
      const y2 = baseY * cosX - z1 * sinX;
      const z2 = baseY * sinX + z1 * cosX;

      // Perspective projection
      const cameraDistance = sphereRadius * 2.3;
      const perspective = cameraDistance / (cameraDistance - z2);

      const screenX = dimensions.width / 2 + x1 * perspective;
      const screenY = dimensions.height / 2 + y2 * perspective;

      // Normalized depth (-1 far back, +1 near front)
      const depthFactor = (z2 + sphereRadius) / (sphereRadius * 2);
      const scale = Math.max(0.45, Math.min(1.25, 0.55 + depthFactor * 0.65));
      const opacity = Math.max(0.2, Math.min(1, 0.25 + depthFactor * 0.75));
      const zIndex = Math.round((z2 + sphereRadius) * 10);

      return {
        story,
        phi: Math.acos(yNorm),
        theta,
        radius: sphereRadius,
        x: x1,
        y: y2,
        z: z2,
        screenX,
        screenY,
        scale,
        opacity,
        zIndex,
      };
    });
  }, [stories, rotation, dimensions]);

  // Ambient inertia and slow rotation loop
  useEffect(() => {
    const loop = () => {

      if (!isDragging) {
        // Subtle ambient orbital drift when idle
        setRotation((prev) => ({
          x: Math.max(-0.6, Math.min(0.6, prev.x + velocityRef.current.x * 0.4)),
          y: (prev.y + velocityRef.current.y * 0.6) % (Math.PI * 2),
        }));

        // Damping velocity toward gentle baseline drift
        velocityRef.current = {
          x: velocityRef.current.x * 0.96 + (0.0003 - velocityRef.current.x) * 0.04,
          y: velocityRef.current.y * 0.96 + (0.0010 - velocityRef.current.y) * 0.04,
        };
      }

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isDragging]);

  // Pointer / Mouse / Touch interaction handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    setHasInteracted(true);
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    rotationStartRef.current = { ...rotation };
    lastPointerTimeRef.current = performance.now();
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging) return;

    const deltaX = e.clientX - dragStartRef.current.x;
    const deltaY = e.clientY - dragStartRef.current.y;
    const now = performance.now();
    const dt = Math.max(now - lastPointerTimeRef.current, 16);

    const sensitivity = 0.005;
    const nextRotX = Math.max(-0.7, Math.min(0.7, rotationStartRef.current.x - deltaY * sensitivity));
    const nextRotY = rotationStartRef.current.y + deltaX * sensitivity;

    // Track fling velocity
    velocityRef.current = {
      x: (-deltaY * sensitivity) / (dt / 16),
      y: (deltaX * sensitivity) / (dt / 16),
    };
    lastPointerTimeRef.current = now;

    setRotation({ x: nextRotX, y: nextRotY });
  }, [isDragging]);

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    try {
      (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
    } catch {}
  };

  const handleSelect = (story: Story) => {
    if (onSelectStory) {
      onSelectStory(story);
    } else {
      navigate(`/story/${story.id}`);
    }
  };

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      className={`relative w-full h-[520px] sm:h-[620px] lg:h-[720px] select-none cursor-grab active:cursor-grabbing overflow-hidden ${className}`}
      style={{ touchAction: 'none' }}
    >
      {/* Ambient background depth lighting */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(223,156,59,0.06)_0%,rgba(9,8,7,0.85)_65%,#050505_100%)]" />

      {/* Orbit Rings (Subtle celestial archival compass) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
        <div className="w-[320px] sm:w-[480px] lg:w-[600px] h-[320px] sm:h-[480px] lg:h-[600px] rounded-full border border-amber-500/25 animate-spin-slower" />
        <div className="absolute w-[220px] sm:w-[340px] lg:w-[440px] h-[220px] sm:h-[340px] lg:h-[440px] rounded-full border border-charcoal-700/60" />
      </div>

      {/* Sphere Nodes / Suspended Memory Artifacts */}
      {sphereNodes.map((node) => {
        const isHovered = hoveredStory?.id === node.story.id;
        const unansweredCount = node.story.missingQuestions.filter(q => !q.answered).length;

        // Front-facing threshold
        const isFront = node.z > 0;

        return (
          <div
            key={node.story.id}
            onClick={() => handleSelect(node.story)}
            onPointerEnter={() => setHoveredStory(node.story)}
            onPointerLeave={() => setHoveredStory(null)}
            className="absolute top-0 left-0 transition-transform duration-100 ease-out will-change-transform group"
            style={{
              transform: `translate3d(${node.screenX}px, ${node.screenY}px, 0) translate(-50%, -50%) scale(${
                isHovered ? node.scale * 1.15 : node.scale
              })`,
              zIndex: isHovered ? 9999 : node.zIndex,
              opacity: isHovered ? 1 : node.opacity,
            }}
          >
            {/* The Archival Memory Card */}
            <div
              className={`relative rounded-sm overflow-hidden transition-all duration-300 border ${
                isHovered
                  ? 'border-amber-400 shadow-[0_0_30px_rgba(223,156,59,0.45)] ring-1 ring-amber-400/60'
                  : isFront
                  ? 'border-charcoal-700/80 shadow-card-dark bg-charcoal-900/90'
                  : 'border-charcoal-850/60 shadow-none bg-charcoal-950/80 grayscale'
              }`}
              style={{
                width: dimensions.width < 640 ? '110px' : '140px',
                height: dimensions.width < 640 ? '150px' : '190px',
              }}
            >
              {/* Image */}
              <img
                src={node.story.heroImage}
                alt={node.story.title}
                loading="lazy"
                className={`w-full h-full object-cover transition-all duration-500 ${
                  isHovered ? 'scale-105 brightness-105' : isFront ? 'brightness-90' : 'brightness-60'
                }`}
              />

              {/* Cinematic Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/30 to-transparent" />

              {/* Minimal Tag / Marker */}
              <div className="absolute top-2 left-2 right-2 flex items-center justify-between pointer-events-none">
                <span className="text-[9px] font-mono tracking-widest uppercase px-1.5 py-0.5 rounded-xs bg-charcoal-950/80 text-amber-300/90 border border-amber-500/20 backdrop-blur-xs">
                  {node.story.category}
                </span>

                {unansweredCount > 0 && (
                  <span className="w-2 h-2 rounded-full bg-rose-500 ring-2 ring-charcoal-950 animate-pulse" title={`${unansweredCount} questions awaiting knowledge holder`} />
                )}
              </div>

              {/* Card Footer Caption */}
              <div className="absolute bottom-2 left-2 right-2 space-y-0.5 pointer-events-none">
                <p className="font-serif-editorial text-[11px] sm:text-xs text-parchment-100 font-light line-clamp-2 leading-tight">
                  {node.story.title}
                </p>
                <p className="text-[9px] font-mono text-parchment-400 truncate">
                  {node.story.location || node.story.storyteller.name}
                </p>
              </div>

              {/* Hover Highlight Ring */}
              {isHovered && (
                <div className="absolute inset-0 border border-amber-300/50 pointer-events-none animate-pulse" />
              )}
            </div>
          </div>
        );
      })}

      {/* Focused Hover Card (Appears gracefully when hovering any memory node) */}
      {hoveredStory && (
        <div className="absolute bottom-6 left-6 right-6 sm:left-auto sm:right-8 sm:w-96 p-4 rounded-sm bg-charcoal-900/95 border border-amber-500/40 backdrop-blur-md shadow-antique z-[10000] animate-fadeIn pointer-events-auto">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center space-x-2 text-[10px] font-mono uppercase tracking-widest text-amber-400">
                <span>{hoveredStory.category}</span>
                <span>•</span>
                <span className="text-parchment-400">{hoveredStory.location}</span>
              </div>
              <h4 className="font-serif-editorial text-base sm:text-lg text-parchment-100 font-medium leading-snug">
                {hoveredStory.title}
              </h4>
            </div>
            <button
              onClick={() => handleSelect(hoveredStory)}
              className="p-1.5 rounded-sm bg-amber-400 text-charcoal-950 hover:bg-amber-300 transition-colors shadow-sm shrink-0"
              title="Enter Memory"
            >
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-parchment-300 font-light line-clamp-2 mt-2 leading-relaxed">
            {hoveredStory.summary}
          </p>

          <div className="mt-3 pt-2.5 border-t border-charcoal-800 flex items-center justify-between text-[11px] font-mono text-parchment-400">
            <span>Keeper: <strong className="text-parchment-200">{hoveredStory.storyteller.name}</strong></span>
            <span className="text-amber-400 flex items-center space-x-1">
              <HelpCircle className="w-3 h-3 text-rose-400" />
              <span>{hoveredStory.missingQuestions.filter(q => !q.answered).length} Gaps</span>
            </span>
          </div>
        </div>
      )}

      {/* Interaction Hint Overlay */}
      {!hasInteracted && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full border border-amber-500/30 bg-charcoal-900/80 backdrop-blur-sm text-xs font-mono text-parchment-300 flex items-center space-x-2 shadow-sm pointer-events-none animate-bounce">
          <RotateCw className="w-3.5 h-3.5 text-amber-400" />
          <span>Drag to rotate the memory sphere</span>
        </div>
      )}

      {/* Spatial Controls Corner Pill */}
      <div className="absolute top-4 right-4 flex items-center space-x-2 text-[10px] font-mono uppercase tracking-wider text-parchment-400 bg-charcoal-900/70 border border-charcoal-800 px-3 py-1.5 rounded-full backdrop-blur-sm pointer-events-none">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
        <span>3D Memory Sphere ({stories.length} Suspended)</span>
      </div>
    </div>
  );
};
