import React, { useState, useEffect } from 'react';
import { useArchive } from '../context/ArchiveContext';
import { Story } from '../types';
import { MinimalHeader } from '../components/layout/MinimalHeader';
import { BrandProfileCard, MinimalArchiveFooter } from '../components/layout/BrandProfileCard';
import { SpatialArchiveSphere } from '../components/archive/SpatialArchiveSphere';
import { CuratedArchiveGrid } from '../components/archive/CuratedArchiveGrid';
import { StoryLightbox } from '../components/archive/StoryLightbox';
import { CustomCursor } from '../components/common/CustomCursor';

export const LandingPage: React.FC = () => {
  const { stories } = useArchive();

  // Section 2: Cinematic Introduction Sequence
  const [showIntro, setShowIntro] = useState(() => {
    try {
      return !sessionStorage.getItem('afterimage_cinematic_intro_seen');
    } catch {
      return true;
    }
  });

  const [introProgress, setIntroProgress] = useState(0); // 0 to 100%
  const [viewMode, setViewMode] = useState<'sphere' | 'grid'>('sphere');
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);

  // Intro loading line animation
  useEffect(() => {
    if (!showIntro) return;

    const interval = setInterval(() => {
      setIntroProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => dismissIntro(), 600);
          return 100;
        }
        return prev + 2.5;
      });
    }, 45);

    return () => clearInterval(interval);
  }, [showIntro]);

  const dismissIntro = () => {
    setShowIntro(false);
    try {
      sessionStorage.setItem('afterimage_cinematic_intro_seen', 'true');
    } catch {}
  };

  return (
    <div className="relative min-h-screen bg-[#050505] text-parchment-100 overflow-x-hidden selection:bg-amber-500/20 selection:text-amber-200">
      
      {/* Custom Cinematic Cursor for Desktop */}
      <CustomCursor />

      {/* Section 2: Cinematic Opening Experience */}
      {showIntro && (
        <div className="fixed inset-0 z-[100000] bg-[#050505] flex flex-col items-center justify-center p-8 select-none transition-opacity duration-1000">
          <div className="max-w-md w-full text-center space-y-6">
            
            {/* Wordmark */}
            <h1 className="font-serif text-3xl sm:text-5xl tracking-[0.28em] text-parchment-100 uppercase font-light animate-fadeIn">
              AFTERIMAGE
            </h1>

            {/* Small Subtitle */}
            <span className="text-[10px] font-mono tracking-[0.4em] uppercase text-amber-400 block -mt-2">
              A LIVING ARCHIVE
            </span>

            {/* Horizontal Loading Line */}
            <div className="w-full h-px bg-charcoal-800 relative overflow-hidden my-6">
              <div 
                className="absolute top-0 left-0 bottom-0 bg-amber-400 transition-all duration-75 ease-out"
                style={{ width: `${introProgress}%` }}
              />
            </div>

            {/* Below text */}
            <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-parchment-500">
              PRESERVING WHAT SHOULD NOT DISAPPEAR.
            </p>

            {/* Skip Option */}
            <div className="pt-4">
              <button
                onClick={dismissIntro}
                className="text-[10px] font-mono tracking-widest uppercase text-parchment-600 hover:text-amber-300 transition-colors"
              >
                [ Skip Intro ]
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Section 6: Minimal Fixed Header */}
      <MinimalHeader 
        showGridToggle={true} 
        isGridView={viewMode === 'grid'}
        onToggleGrid={() => setViewMode(viewMode === 'sphere' ? 'grid' : 'sphere')}
      />

      {/* Main View: 3D Spherical Archive OR Curated Grid */}
      {viewMode === 'sphere' ? (
        <main className="relative w-full h-screen overflow-hidden">
          <SpatialArchiveSphere 
            stories={stories}
            onSelectStory={(story) => setSelectedStory(story)}
          />
        </main>
      ) : (
        <main>
          <CuratedArchiveGrid
            stories={stories}
            onSelectStory={(story) => setSelectedStory(story)}
          />
        </main>
      )}

      {/* Section 8: Cinematic FLIP Story Viewer Lightbox */}
      <StoryLightbox 
        story={selectedStory}
        onClose={() => setSelectedStory(null)}
      />

      {/* Section 9: Brand Mission Profile Card (Hidden when modal is open) */}
      {!selectedStory && viewMode === 'sphere' && (
        <BrandProfileCard />
      )}

      {/* Section 10: Subtle Archive Footer */}
      {!selectedStory && (
        <MinimalArchiveFooter />
      )}

    </div>
  );
};
