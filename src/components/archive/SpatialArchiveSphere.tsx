import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Story } from '../../types';

interface SpatialArchiveSphereProps {
  stories: Story[];
  className?: string;
  onSelectStory?: (story: Story) => void;
}

interface SphereNode {
  story: Story;
  phi: number;
  theta: number;
  radius: number;
  x: number;
  y: number;
  z: number;
  screenX: number;
  screenY: number;
  scale: number;
  opacity: number;
  zIndex: number;
  isFront: boolean;
}

/**
 * PROPER CIRCULAR SPHERICAL MEMORY ARCHIVE
 * 
 * Requirements:
 * 1. PROPER CIRCULAR SPHERE:
 *    - Uses a true mathematical spherical coordinate system with Fibonacci spiral distribution.
 *    - Perfectly centered around the viewport and headline.
 *    - Maintains consistent spherical radius across desktop and mobile.
 * 
 * 2. ALL IMAGES VISIBLE:
 *    - High minimum opacity (0.75 even for rear images) so NO image is hidden or lost in total darkness.
 *    - Dynamic depth scaling (0.75x to 1.15x) so rear cards are clearly readable and identifiable.
 *    - Crisp white/amber archival border on EVERY card ensuring strong silhouette contrast against the black void.
 *    - Front and back layers both remain distinct, crisp, and interactive.
 *    - Smooth drag-to-rotate with momentum and continuous ambient orbital rotation.
 */
export const SpatialArchiveSphere: React.FC<SpatialArchiveSphereProps> = ({
  stories,
  className = '',
  onSelectStory,
}) => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  // Rotation angles (radians)
  const [rotation, setRotation] = useState<{ x: number; y: number }>({ x: 0.08, y: 0.15 });
  const [hoveredStory, setHoveredStory] = useState<Story | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dollyZoom, setDollyZoom] = useState<number>(1);

  // Physics tracking
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const rotationStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const velocityRef = useRef<{ x: number; y: number }>({ x: 0.0003, y: 0.0012 });
  const animFrameRef = useRef<number | null>(null);
  const lastPointerTimeRef = useRef<number>(0);

  // Viewport dimensions
  const [dimensions, setDimensions] = useState({ width: 1200, height: 800 });

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth || window.innerWidth,
          height: containerRef.current.clientHeight || window.innerHeight,
        });
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Subtle scroll dolly zoom
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const factor = 1 + Math.min(scrollY / 600, 1) * 0.15;
      setDollyZoom(factor);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // If we have fewer than 22 stories, duplicate to populate a rich 24-node celestial sphere
  const memoryItems = useMemo(() => {
    if (stories.length === 0) return [];
    if (stories.length >= 20) return stories;
    
    // Fill up to 22-24 nodes for a full, lush circular sphere
    const duplicated: Story[] = [];
    while (duplicated.length < 24) {
      duplicated.push(...stories);
    }
    return duplicated.slice(0, 24);
  }, [stories]);

  // True Fibonacci Sphere Distribution
  const sphereNodes: SphereNode[] = useMemo(() => {
    const count = memoryItems.length;
    if (count === 0) return [];

    const isMobile = dimensions.width < 640;
    // Proper circular spherical radius
    const baseRadius = isMobile 
      ? Math.min(dimensions.width * 0.42, dimensions.height * 0.38, 240)
      : Math.min(dimensions.width * 0.38, dimensions.height * 0.44, 460);

    const sphereRadius = baseRadius * dollyZoom;
    const goldenAngle = Math.PI * (3 - Math.sqrt(5)); // Golden ratio angle ~2.39996 rad

    return memoryItems.map((story, i) => {
      // Latitude distribution from top (+1) to bottom (-1)
      const yNorm = 1 - (i / (count - 1 || 1)) * 2;
      const radiusAtY = Math.sqrt(Math.max(0, 1 - yNorm * yNorm));
      const theta = goldenAngle * i;

      // 3D Cartesian coordinates on the sphere
      const baseX = Math.cos(theta) * radiusAtY * sphereRadius;
      const baseY = yNorm * sphereRadius;
      const baseZ = Math.sin(theta) * radiusAtY * sphereRadius;

      // 3D Rotation Matrix (around Y and X axes)
      const cosY = Math.cos(rotation.y);
      const sinY = Math.sin(rotation.y);
      const x1 = baseX * cosY - baseZ * sinY;
      const z1 = baseX * sinY + baseZ * cosY;

      const cosX = Math.cos(rotation.x);
      const sinX = Math.sin(rotation.x);
      const y2 = baseY * cosX - z1 * sinX;
      const z2 = baseY * sinX + z1 * cosX;

      // Camera Perspective projection
      const cameraDistance = sphereRadius * 2.5;
      const perspective = cameraDistance / (cameraDistance - z2);

      const screenX = dimensions.width / 2 + x1 * perspective;
      const screenY = dimensions.height / 2 + y2 * perspective;

      // Depth calculations (normalized 0 far back, 1 front)
      const depthFactor = (z2 + sphereRadius) / (sphereRadius * 2);
      
      // CRITICAL: Ensure ALL images remain clearly visible and identifiable!
      // Scale: 0.72 (rear) to 1.15 (front)
      const scale = 0.72 + depthFactor * 0.43;
      // Opacity: 0.70 (rear) to 1.0 (front) — NEVER pitch black or invisible!
      const opacity = 0.70 + depthFactor * 0.30;
      const zIndex = Math.round((z2 + sphereRadius) * 10);
      const isFront = z2 > -sphereRadius * 0.15;

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
        isFront,
      };
    });
  }, [memoryItems, rotation, dimensions, dollyZoom]);

  // Ambient inertia rotation loop
  useEffect(() => {
    const loop = () => {
      if (!isDragging) {
        setRotation((prev) => ({
          x: Math.max(-0.6, Math.min(0.6, prev.x + velocityRef.current.x * 0.35)),
          y: (prev.y + velocityRef.current.y * 0.6) % (Math.PI * 2),
        }));

        velocityRef.current = {
          x: velocityRef.current.x * 0.965 + (0.0001 - velocityRef.current.x) * 0.035,
          y: velocityRef.current.y * 0.965 + (0.0008 - velocityRef.current.y) * 0.035,
        };
      }

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isDragging]);

  // Pointer drag events
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
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

    const sensitivity = 0.0045;
    const nextRotX = Math.max(-0.65, Math.min(0.65, rotationStartRef.current.x - deltaY * sensitivity));
    const nextRotY = rotationStartRef.current.y + deltaX * sensitivity;

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

  // Central headline z-index positioned midway so cards in front pass naturally over it
  const CENTER_HEADLINE_ZINDEX = 1200;

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      className={`relative w-full h-screen select-none cursor-grab active:cursor-grabbing overflow-hidden bg-[#050505] ${className}`}
      style={{ touchAction: 'none' }}
    >
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(198,154,88,0.06)_0%,rgba(5,5,5,0.75)_60%,#050505_100%)]" />

      {/* Circular Celestial Guideline (Visual hint of the perfect spherical geometry) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-25">
        <div className="w-[340px] sm:w-[540px] lg:w-[680px] h-[340px] sm:h-[540px] lg:h-[680px] rounded-full border border-amber-500/20" />
      </div>

      {/* Section 4: Central Headline directly embedded at 3D center */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none text-center select-none w-full max-w-xl px-6"
        style={{ zIndex: CENTER_HEADLINE_ZINDEX }}
      >
        <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light text-parchment-100 leading-[1.08] tracking-tight drop-shadow-md">
          What the world <br />
          <span className="italic font-normal text-amber-200/95">forgets, we keep.</span>
        </h1>
        <p className="font-sans text-xs sm:text-sm tracking-[0.25em] uppercase text-parchment-400 mt-4 font-light">
          Every memory deserves a future.
        </p>
      </div>

      {/* 3D Sphere of Floating Memory Photographs (All Images Crisp & Visible) */}
      {sphereNodes.map((node, idx) => {
        const isHovered = hoveredStory?.id === node.story.id;
        const unansweredGaps = node.story.missingQuestions.filter(q => !q.answered).length;

        return (
          <div
            key={`${node.story.id}-${idx}`}
            onClick={() => {
              if (onSelectStory) onSelectStory(node.story);
              else navigate(`/story/${node.story.id}`);
            }}
            onPointerEnter={() => setHoveredStory(node.story)}
            onPointerLeave={() => setHoveredStory(null)}
            className="absolute top-0 left-0 transition-transform duration-75 ease-out will-change-transform interactive-memory cursor-pointer"
            style={{
              transform: `translate3d(${node.screenX}px, ${node.screenY}px, 0) translate(-50%, -50%) scale(${
                isHovered ? node.scale * 1.2 : node.scale
              })`,
              zIndex: isHovered ? 9999 : (node.isFront ? CENTER_HEADLINE_ZINDEX + node.zIndex : node.zIndex),
              opacity: isHovered ? 1 : node.opacity,
            }}
          >
            {/* The Floating Archival Fragment with High Contrast Borders */}
            <div
              className={`relative rounded-xs overflow-hidden transition-all duration-300 border ${
                isHovered
                  ? 'border-amber-400 shadow-[0_0_35px_rgba(198,154,88,0.7)] ring-2 ring-amber-400/80'
                  : node.isFront
                  ? 'border-parchment-300/40 shadow-[0_12px_30px_rgba(0,0,0,0.85)] bg-[#0c0c0c]'
                  : 'border-charcoal-700/60 shadow-[0_8px_20px_rgba(0,0,0,0.75)] bg-[#101010]'
              }`}
              style={{
                width: dimensions.width < 640 ? '110px' : '145px',
                height: dimensions.width < 640 ? '145px' : '190px',
              }}
            >
              {/* Image with Guaranteed Visibility */}
              <img
                src={node.story.heroImage}
                alt={node.story.title}
                loading="eager"
                className={`w-full h-full object-cover transition-all duration-500 ${
                  isHovered ? 'scale-105 brightness-110' : node.isFront ? 'brightness-95 contrast-105' : 'brightness-85 contrast-100'
                }`}
              />

              {/* Shading gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/90 via-[#050505]/20 to-transparent pointer-events-none" />

              {/* Amber Missing Knowledge Marker */}
              {unansweredGaps > 0 && (
                <div 
                  className="absolute top-2 right-2 flex items-center justify-center pointer-events-none"
                  title={`${unansweredGaps} unasked questions`}
                >
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-80" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-400 border border-charcoal-950" />
                  </span>
                </div>
              )}

              {/* Card Bottom: Category & Title */}
              <div className="absolute bottom-2.5 left-2.5 right-2.5 space-y-0.5 pointer-events-none">
                <span className="text-[9px] font-mono tracking-widest uppercase text-amber-400 block truncate font-medium">
                  {node.story.category}
                </span>
                <p className="font-serif text-[11px] sm:text-xs text-parchment-100 font-normal line-clamp-1 leading-tight drop-shadow-sm">
                  {node.story.title}
                </p>
              </div>
            </div>
          </div>
        );
      })}

      {/* Floating Drag Prompt */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 pointer-events-none flex items-center space-x-2 text-[10px] font-mono tracking-[0.25em] uppercase text-parchment-400 opacity-85">
        <span>Drag to rotate sphere</span>
        <span>&bull;</span>
        <span>Scroll to dolly</span>
      </div>
    </div>
  );
};
