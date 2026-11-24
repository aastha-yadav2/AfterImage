import React, { useEffect, useState } from 'react';

/**
 * Custom Cinematic Cursor
 * A restrained, circular cursor with smooth trailing and hover expansion.
 * Automatically disabled on touch / coarse pointer devices.
 */
export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true);
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      // Detect if hovering an interactive element
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest('a, button, [role="button"], input, .cursor-pointer, .interactive-memory');
        setIsHovered(!!interactive);
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [isVisible]);

  if (isTouch || !isVisible) return null;

  return (
    <div
      className="fixed top-0 left-0 pointer-events-none z-[99999] transition-transform duration-75 ease-out will-change-transform"
      style={{
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
      }}
    >
      {/* Outer subtle ring */}
      <div
        className={`-translate-x-1/2 -translate-y-1/2 rounded-full border border-amber-400/60 transition-all duration-200 ease-out ${
          isHovered
            ? 'w-10 h-10 bg-amber-400/10 border-amber-300 scale-110 shadow-[0_0_15px_rgba(198,154,88,0.3)]'
            : 'w-6 h-6 border-parchment-400/40'
        }`}
      />
      {/* Center pinpoint */}
      <div
        className={`absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-parchment-100 transition-all duration-150 ${
          isHovered ? 'w-1 h-1 bg-amber-300' : 'w-1.5 h-1.5'
        }`}
      />
    </div>
  );
};
