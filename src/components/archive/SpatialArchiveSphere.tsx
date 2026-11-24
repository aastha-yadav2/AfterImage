import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Story } from '../../types';

import { useNavigate } from 'react-router-dom';

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
 * Section 3 & 4 & 5:
 * IMMERSIVE 3D MEMORY SPHERE WITH INTEGRATED CENTRAL HEADLINE & SCROLL DOLLY
 * 
 * - Fibonacci sphere distribution of 20-30 archival images
 * - Pure black obsidian aesthetic
 * - Central Headline: "What the world forgets, we keep." (Playfair Display)
 * - Headline stays perfectly centered while photographs rotate in 3D around it (some in front, some behind)
 * - Short scroll distance acts as subtle camera dolly zoom
 * - Smooth inertial rotation without aggressive spinning
 * - Hover elevation & amber gap indicators
 */
export const SpatialArchiveSphere: React.FC<SpatialArchiveSphereProps> = ({
  stories,
  className = '',
  onSelectStory,
}) => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  // Rotation angles (radians)
  const [rotation, setRotation] = useState<{ x: number; y: number }>({ x: 0.05, y: 0.15 });
  const [hoveredStory, setHoveredStory] = useState<Story | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dollyZoom, setDollyZoom] = useState<number>(1);

  // Drag physics tracking
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const rotationStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const velocityRef = useRef<{ x: number; y: number }>({ x: 0.0002, y: 0.0008 });
  const animFrameRef = useRef<number | null>(null);
  const lastPointerTimeRef = useRef<number>(0);

  // Container dimensions
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

  // Section 5: Subtle scroll-linked camera dolly zoom
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      // Gentle dolly range from 1.0 up to 1.18
      const maxScroll = 500;
      const factor = 1 + Math.min(scrollY / maxScroll, 1) * 0.18;
      setDollyZoom(factor);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fibonacci sphere positioning with camera dolly calculation
  const sphereNodes: SphereNode[] = useMemo(() => {
    const count = stories.length;
    if (count === 0) return [];

    const isMobile = dimensions.width < 640;
    const baseRadius = isMobile 
      ? Math.min(dimensions.width * 0.44, 230)
      : Math.min(dimensions.width * 0.38, dimensions.height * 0.46, 420);

    const sphereRadius = baseRadius * dollyZoom;
    const goldenAngle = Math.PI * (3 - Math.sqrt(5)); // ~2.39996 rad

    return stories.map((story, i) => {
      const yNorm = 1 - (i / (count - 1 || 1)) * 2;
      const radiusAtY = Math.sqrt(Math.max(0, 1 - yNorm * yNorm));
      const theta = goldenAngle * i;

      const baseX = Math.cos(theta) * radiusAtY * sphereRadius;
      const baseY = yNorm * sphereRadius;
      const baseZ = Math.sin(theta) * radiusAtY * sphereRadius;

      // 3D rotation matrix
      const cosY = Math.cos(rotation.y);
      const sinY = Math.sin(rotation.y);
      const x1 = baseX * cosY - baseZ * sinY;
      const z1 = baseX * sinY + baseZ * cosY;

      const cosX = Math.cos(rotation.x);
      const sinX = Math.sin(rotation.x);
      const y2 = baseY * cosX - z1 * sinX;
      const z2 = baseY * sinX + z1 * cosX;

      const cameraDistance = sphereRadius * 2.3;
      const perspective = cameraDistance / (cameraDistance - z2);

      const screenX = dimensions.width / 2 + x1 * perspective;
      const screenY = dimensions.height / 2 + y2 * perspective;

      // Depth calculations
      const depthFactor = (z2 + sphereRadius) / (sphereRadius * 2);
      const scale = Math.max(0.45, Math.min(1.28, 0.52 + depthFactor * 0.72));
      const opacity = Math.max(0.18, Math.min(1, 0.22 + depthFactor * 0.78));
      const zIndex = Math.round((z2 + sphereRadius) * 10);
      const isFront = z2 > 0;

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
  }, [stories, rotation, dimensions, dollyZoom]);

  // Inertial damping and slow ambient rotation
  useEffect(() => {
    const loop = () => {
      if (!isDragging) {
        setRotation((prev) => ({
          x: Math.max(-0.55, Math.min(0.55, prev.x + velocityRef.current.x * 0.35)),
          y: (prev.y + velocityRef.current.y * 0.55) % (Math.PI * 2),
        }));

        velocityRef.current = {
          x: velocityRef.current.x * 0.965 + (0.0001 - velocityRef.current.x) * 0.035,
          y: velocityRef.current.y * 0.965 + (0.0006 - velocityRef.current.y) * 0.035,
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
    const nextRotX = Math.max(-0.6, Math.min(0.6, rotationStartRef.current.x - deltaY * sensitivity));
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

  // Center headline zIndex is midway (e.g. 1000) so nodes with z > 0 appear in front of it!
  const CENTER_HEADLINE_ZINDEX = 1500;

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
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(198,154,88,0.04)_0%,rgba(5,5,5,0.75)_65%,#050505_100%)]" />

      {/* Section 4: Central Headline directly embedded at 3D center */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none text-center select-none w-full max-w-xl px-4"
        style={{ zIndex: CENTER_HEADLINE_ZINDEX }}
      >
        <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light text-parchment-100 leading-[1.08] tracking-tight">
          What the world <br />
          <span className="italic font-normal text-amber-200/90">forgets, we keep.</span>
        </h1>
        <p className="font-sans text-xs sm:text-sm tracking-[0.25em] uppercase text-parchment-400 mt-4 font-light">
          Every memory deserves a future.
        </p>
      </div>

      {/* 3D Sphere of Floating Memory Photographs */}
      {sphereNodes.map((node) => {
        const isHovered = hoveredStory?.id === node.story.id;
        const unansweredGaps = node.story.missingQuestions.filter(q => !q.answered).length;

        return (
          <div
            key={node.story.id}
            onClick={() => {
              if (onSelectStory) onSelectStory(node.story);
              else navigate(`/story/${node.story.id}`);
            }}
            onPointerEnter={() => setHoveredStory(node.story)}
            onPointerLeave={() => setHoveredStory(null)}
            className="absolute top-0 left-0 transition-transform duration-75 ease-out will-change-transform interactive-memory"
            style={{
              transform: `translate3d(${node.screenX}px, ${node.screenY}px, 0) translate(-50%, -50%) scale(${
                isHovered ? node.scale * 1.15 : node.scale
              })`,
              zIndex: isHovered ? 9999 : (node.isFront ? CENTER_HEADLINE_ZINDEX + node.zIndex : node.zIndex),
              opacity: isHovered ? 1 : node.opacity,
            }}
          >
            {/* The Floating Archival Fragment */}
            <div
              className={`relative rounded-xs overflow-hidden transition-all duration-300 border ${
                isHovered
                  ? 'border-amber-400/90 shadow-[0_0_35px_rgba(198,154,88,0.5)] ring-1 ring-amber-400/50'
                  : node.isFront
                  ? 'border-charcoal-800 shadow-[0_15px_35px_rgba(0,0,0,0.85)] bg-[#0c0c0c]'
                  : 'border-charcoal-900 shadow-none bg-[#050505] brightness-75'
              }`}
              style={{
                width: dimensions.width < 640 ? '110px' : '145px',
                height: dimensions.width < 640 ? '145px' : '190px',
              }}
            >
              <img
                src={node.story.heroImage}
                alt={node.story.title}
                loading="lazy"
                className={`w-full h-full object-cover transition-all duration-500 ${
                  isHovered ? 'scale-105 brightness-105' : node.isFront ? 'brightness-90' : 'brightness-60 contrast-95'
                }`}
              />

              {/* Shading gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/25 to-transparent pointer-events-none" />

              {/* Section 11: Subtle Amber Point / Missing Knowledge Marker */}
              {unansweredGaps > 0 && (
                <div 
                  className="absolute top-2 right-2 flex items-center justify-center pointer-events-none"
                  title={`${unansweredGaps} unasked questions`}
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
                  </span>
                </div>
              )}

              {/* Card Bottom: Category & Title */}
              <div className="absolute bottom-2.5 left-2.5 right-2.5 space-y-0.5 pointer-events-none">
                <span className="text-[9px] font-mono tracking-widest uppercase text-amber-400/90 block truncate">
                  {node.story.category}
                </span>
                <p className="font-serif text-[11px] sm:text-xs text-parchment-100 font-light line-clamp-1 leading-tight">
                  {node.story.title}
                </p>
              </div>
            </div>
          </div>
        );
      })}

      {/* Floating Drag Prompt */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 pointer-events-none flex items-center space-x-2 text-[10px] font-mono tracking-[0.25em] uppercase text-parchment-500 opacity-70">
        <span>Drag to rotate</span>
        <span>&bull;</span>
        <span>Scroll to dolly</span>
      </div>
    </div>
  );
};
