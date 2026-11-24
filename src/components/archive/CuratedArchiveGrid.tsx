import React, { useState, useMemo } from 'react';
import { Story, Category } from '../../types';
import { MapPin } from 'lucide-react';

interface CuratedArchiveGridProps {
  stories: Story[];
  onSelectStory: (story: Story) => void;
}

const CATEGORIES: ('All' | Category)[] = [
  'All',
  'Crafts',
  'Traditions',
  'Recipes',
  'Oral Histories',
  'Places',
  'Family Knowledge',
  'Languages',
  'Other',
];

/**
 * Section 7: Curated Archive Grid
 * - Pure black obsidian background
 * - Minimal, generous editorial spacing
 * - Large archival photographs with subtle hover zoom
 * - Playfair Display titles and clean Inter metadata
 * - Category filter pills
 */
export const CuratedArchiveGrid: React.FC<CuratedArchiveGridProps> = ({
  stories,
  onSelectStory,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'All' | Category>('All');

  const filteredStories = useMemo(() => {
    if (selectedCategory === 'All') return stories;
    return stories.filter(s => s.category === selectedCategory);
  }, [stories, selectedCategory]);

  return (
    <div className="w-full min-h-screen bg-[#050505] pt-28 pb-32 px-6 sm:px-12 lg:px-20 animate-fadeIn">
      {/* Category Pills Header */}
      <div className="max-w-7xl mx-auto mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-charcoal-800 pb-8">
        <div className="space-y-2">
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-amber-400 block">
            CURATED EXHIBITION CATALOG
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-parchment-100">
            Living Archive Lineages
          </h2>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xs text-xs font-mono transition-all uppercase tracking-wider ${
                selectedCategory === cat
                  ? 'bg-parchment-100 text-[#050505] font-semibold'
                  : 'bg-[#0c0c0c] text-parchment-400 border border-charcoal-800 hover:border-amber-500/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Responsive Editorial Photographic Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
        {filteredStories.map((story) => {
          const unanswered = story.missingQuestions.filter(q => !q.answered).length;

          return (
            <article
              key={story.id}
              onClick={() => onSelectStory(story)}
              className="group cursor-pointer flex flex-col space-y-4"
            >
              {/* Image Frame with Subtle Zoom */}
              <div className="relative aspect-[4/3] sm:aspect-[16/11] overflow-hidden rounded-xs bg-[#0c0c0c] border border-charcoal-800 shadow-2xl">
                <img
                  src={story.heroImage}
                  alt={story.title}
                  loading="lazy"
                  className="w-full h-full object-cover object-center brightness-90 group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                {/* Section 11: Amber Gap Dot */}
                {unanswered > 0 && (
                  <div className="absolute top-3 right-3 flex items-center space-x-1.5 px-2 py-0.5 rounded-xs bg-[#050505]/80 border border-amber-500/40 text-[10px] font-mono text-amber-300 backdrop-blur-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    <span>{unanswered} Gaps</span>
                  </div>
                )}
              </div>

              {/* Minimal Captions */}
              <div className="space-y-1.5">
                <div className="flex items-center space-x-2 text-[10px] font-mono uppercase tracking-widest text-parchment-400">
                  <span className="text-amber-400">{story.category}</span>
                  <span>&bull;</span>
                  <span className="flex items-center space-x-1">
                    <MapPin className="w-3 h-3 text-parchment-500" />
                    <span>{story.location}</span>
                  </span>
                </div>

                <h3 className="font-serif text-xl sm:text-2xl text-parchment-100 font-light group-hover:text-amber-200 transition-colors leading-snug">
                  {story.title}
                </h3>

                <p className="text-xs font-sans text-parchment-400 font-light line-clamp-2 leading-relaxed">
                  {story.summary}
                </p>

                <div className="pt-2 flex items-center justify-between text-[11px] font-mono text-parchment-500">
                  <span>Keeper: {story.storyteller.name}</span>
                  <span className="text-amber-400/90 group-hover:translate-x-1 transition-transform">
                    View Folio &rarr;
                  </span>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};
