import React, { useState } from 'react';

/**
 * Section 9: Brand Mission Profile Card
 * Small, editorial mission card positioned at the bottom-left on desktop.
 * Replaces any generic photographer profile card with AFTERIMAGE's true preservation mission.
 */
export const BrandProfileCard: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside 
      className={`fixed bottom-8 left-8 z-30 hidden md:block max-w-xs transition-all duration-300 ${
        collapsed ? 'opacity-50 hover:opacity-100' : 'opacity-90'
      }`}
    >
      <div className="p-4 rounded-xs bg-[#0c0c0c]/85 border border-charcoal-800/80 backdrop-blur-md shadow-2xl space-y-2.5">
        <div className="flex items-center justify-between border-b border-charcoal-800 pb-2">
          <span className="font-serif text-sm tracking-[0.2em] uppercase text-parchment-100 font-medium">
            AFTERIMAGE
          </span>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-[9px] font-mono uppercase tracking-widest text-parchment-500 hover:text-amber-300 transition-colors"
          >
            {collapsed ? 'Expand' : 'Dismiss'}
          </button>
        </div>

        {!collapsed && (
          <p className="text-xs font-sans text-parchment-300 font-light leading-relaxed">
            We preserve the knowledge, stories, and traditions that risk disappearing&mdash;not by simply recording them, but by asking what is still missing before it is too late.
          </p>
        )}

        <div className="pt-1 flex items-center justify-between text-[10px] font-mono text-parchment-500">
          <span className="text-amber-400">Living Memory Archive</span>
          <span>2026</span>
        </div>
      </div>
    </aside>
  );
};

/**
 * Section 10: Subtle Archive Footer
 * Bottom-right: Living Memory Archive • 2026
 */
export const MinimalArchiveFooter: React.FC = () => {
  return (
    <footer className="fixed bottom-8 right-8 z-30 hidden sm:flex items-center space-x-3 text-xs font-mono text-parchment-500 pointer-events-none select-none">
      <span className="tracking-widest uppercase text-amber-400/80">Living Memory Archive</span>
      <span className="text-charcoal-700">&bull;</span>
      <span className="tracking-widest">2026</span>
    </footer>
  );
};
