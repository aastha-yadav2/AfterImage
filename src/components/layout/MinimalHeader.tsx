import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useArchive } from '../../context/ArchiveContext';

interface MinimalHeaderProps {
  onToggleGrid?: () => void;
  isGridView?: boolean;
  showGridToggle?: boolean;
}

/**
 * Section 6: Minimal Fixed Header
 * Left: AFTERIMAGE
 * Right: Menu (two thin horizontal lines animating into a cross)
 * Full-screen cinematic menu overlay (Section 12)
 */
export const MinimalHeader: React.FC<MinimalHeaderProps> = ({
  onToggleGrid,
  isGridView = false,
  showGridToggle = false,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { stats } = useArchive();

  const navItems = [
    { label: 'Enter the Archive', path: '/archive' },
    { label: 'Capture a Memory', path: '/capture' },
    { 
      label: 'Missing Questions', 
      path: '/missing-questions', 
      badge: stats.unansweredQuestions > 0 ? `${stats.unansweredQuestions} Gaps` : undefined 
    },
    { label: 'Custodian Console', path: '/dashboard' },
    { label: 'Hybrid AI & Privacy', path: '/settings' },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 px-6 sm:px-10 py-6 flex items-center justify-between pointer-events-none select-none">
        
        {/* Left: Minimal AFTERIMAGE wordmark */}
        <Link
          to="/"
          className="pointer-events-auto flex items-center space-x-2 group focus:outline-none"
        >
          <span className="font-serif text-xl sm:text-2xl tracking-[0.24em] font-light text-parchment-100 uppercase transition-colors group-hover:text-amber-300">
            AFTERIMAGE
          </span>
        </Link>

        {/* Center / Right: Optional Grid Toggle & Minimal Menu Trigger */}
        <div className="flex items-center space-x-6 pointer-events-auto">
          {showGridToggle && onToggleGrid && (
            <button
              onClick={onToggleGrid}
              className="text-xs font-mono tracking-widest uppercase text-parchment-400 hover:text-amber-300 transition-colors border border-charcoal-800 hover:border-amber-500/40 px-3.5 py-1.5 rounded-xs bg-[#050505]/60 backdrop-blur-sm"
            >
              {isGridView ? '3D Sphere' : 'Archive Grid'}
            </button>
          )}

          {/* Minimal Menu Hamburger: Two thin horizontal lines */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex flex-col justify-center items-end w-8 h-8 space-y-1.5 focus:outline-none group p-1"
            aria-label="Toggle Menu"
          >
            <span
              className={`block h-px bg-parchment-200 transition-all duration-300 ease-out ${
                menuOpen ? 'w-6 translate-y-2 rotate-45 bg-amber-300' : 'w-6 group-hover:w-7'
              }`}
            />
            <span
              className={`block h-px bg-parchment-200 transition-all duration-300 ease-out ${
                menuOpen ? 'w-6 -translate-y-1.5 -rotate-45 bg-amber-300' : 'w-4 group-hover:w-7'
              }`}
            />
          </button>
        </div>
      </header>

      {/* Section 12: Fullscreen Cinematic Menu Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-[#050505]/98 backdrop-blur-xl flex flex-col justify-between px-8 sm:px-16 py-12 animate-fadeIn select-none">
          {/* Top Filler for header height */}
          <div className="h-12" />

          {/* Center Links in Playfair Display Serif */}
          <nav className="max-w-4xl mx-auto w-full my-auto space-y-6 sm:space-y-8 text-center sm:text-left">
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-amber-400/80 block pb-2">
              EXHIBITION ARCHIVE INDEX
            </span>

            {navItems.map((item, idx) => {
              const active = location.pathname === item.path;
              return (
                <div key={item.path} className="overflow-hidden">
                  <Link
                    to={item.path}
                    onClick={() => setMenuOpen(false)}
                    className={`group inline-flex items-center space-x-4 font-serif text-3xl sm:text-5xl lg:text-6xl font-light tracking-wide transition-all duration-300 ${
                      active
                        ? 'text-amber-300 italic'
                        : 'text-parchment-300 hover:text-parchment-50 hover:translate-x-2'
                    }`}
                  >
                    <span className="text-xs font-mono text-parchment-600 group-hover:text-amber-400/70 -mt-4">
                      0{idx + 1}
                    </span>
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="text-xs font-mono tracking-widest px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </div>
              );
            })}
          </nav>

          {/* Bottom Mission statement */}
          <div className="max-w-4xl mx-auto w-full pt-8 border-t border-charcoal-850 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-parchment-500 gap-4">
            <span className="tracking-widest uppercase text-amber-400/80">
              Preserving what should not disappear.
            </span>
            <span className="tracking-wider">
              AFTERIMAGE Living Archive &copy; 2026
            </span>
          </div>
        </div>
      )}
    </>
  );
};
