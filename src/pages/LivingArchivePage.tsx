import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Grid, 
  List, 
  HelpCircle, 
  Compass, 
  ArrowRight, 
  MapPin,
  Layers
} from 'lucide-react';
import { useArchive } from '../context/ArchiveContext';
import { Category } from '../types';
import { SpatialArchiveSphere } from '../components/archive/SpatialArchiveSphere';

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

export const LivingArchivePage: React.FC = () => {
  const { stories } = useArchive();

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'All' | Category>('All');
  const [selectedTag] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'spatial' | 'grid' | 'list'>('spatial');
  const sortBy = 'recent';

  // Filter & Sort stories
  const filteredStories = useMemo(() => {
    return stories
      .filter((story) => {
        // Category filter
        if (selectedCategory !== 'All' && story.category !== selectedCategory) {
          return false;
        }

        // Tag filter
        if (selectedTag && !story.tags.includes(selectedTag)) {
          return false;
        }

        // Search Query filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchesTitle = story.title.toLowerCase().includes(q);
          const matchesContent = story.content.toLowerCase().includes(q);
          const matchesSummary = story.summary.toLowerCase().includes(q);
          const matchesStoryteller = story.storyteller.name.toLowerCase().includes(q);
          const matchesLocation = (story.location || '').toLowerCase().includes(q);
          const matchesTags = story.tags.some(t => t.toLowerCase().includes(q));

          if (!matchesTitle && !matchesContent && !matchesSummary && !matchesStoryteller && !matchesLocation && !matchesTags) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'recent') {
          return new Date(b.preservationDate).getTime() - new Date(a.preservationDate).getTime();
        }
        if (sortBy === 'gaps') {
          const aGaps = a.missingQuestions.filter(q => !q.answered).length;
          const bGaps = b.missingQuestions.filter(q => !q.answered).length;
          return bGaps - aGaps;
        }
        if (sortBy === 'score') {
          return b.preservationScore - a.preservationScore;
        }
        if (sortBy === 'title') {
          return a.title.localeCompare(b.title);
        }
        return 0;
      });
  }, [stories, searchQuery, selectedCategory, selectedTag, sortBy]);

  return (
    <div className="min-h-screen bg-charcoal-950 pb-28 text-parchment-200">
      
      {/* 1. Archive Hero Masthead */}
      <section className="border-b border-charcoal-850 bg-charcoal-900/60 pt-10 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-3">
          <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-amber-400">
            <Compass className="w-3.5 h-3.5" />
            <span>Living Heritage Exhibition</span>
            <span>•</span>
            <span>{stories.length} Preserved Lineages</span>
          </div>
          <h1 className="font-serif-editorial text-3xl sm:text-5xl text-parchment-100 font-light">
            The Living Archive
          </h1>
          <p className="text-sm sm:text-base text-parchment-300 font-light max-w-2xl leading-relaxed">
            Navigate fragile memories suspended in digital space. Switch seamlessly between the 3D spatial sphere and editorial catalog.
          </p>
        </div>
      </section>

      {/* 2. Controls & Exhibition Filter Bar */}
      <section className="sticky top-20 z-30 bg-charcoal-950/90 backdrop-blur-md border-b border-charcoal-800 px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-parchment-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search traditions, artisans, materials..."
              className="w-full pl-9 pr-4 py-2 bg-charcoal-900 border border-charcoal-800 rounded-sm text-xs font-mono text-parchment-100 placeholder-parchment-500 focus:outline-none focus:border-amber-400/80 transition-colors"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="w-full md:w-auto flex items-center space-x-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-sm text-xs font-mono whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-amber-400 text-charcoal-950 font-semibold shadow-xs'
                    : 'bg-charcoal-900 text-parchment-400 hover:text-parchment-200 border border-charcoal-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* View Mode Toggle (3D Spatial / Grid / List) */}
          <div className="flex items-center space-x-2 shrink-0">
            <div className="flex items-center rounded-sm bg-charcoal-900 border border-charcoal-800 p-0.5">
              <button
                onClick={() => setViewMode('spatial')}
                className={`flex items-center space-x-1 px-3 py-1.5 rounded-xs text-xs font-mono transition-all ${
                  viewMode === 'spatial'
                    ? 'bg-amber-400 text-charcoal-950 font-semibold'
                    : 'text-parchment-400 hover:text-parchment-200'
                }`}
                title="3D Spatial Sphere"
              >
                <Layers className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">3D Sphere</span>
              </button>

              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-xs text-xs font-mono transition-all ${
                  viewMode === 'grid'
                    ? 'bg-amber-400 text-charcoal-950'
                    : 'text-parchment-400 hover:text-parchment-200'
                }`}
                title="Grid Exhibition"
              >
                <Grid className="w-4 h-4" />
              </button>

              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-xs text-xs font-mono transition-all ${
                  viewMode === 'list'
                    ? 'bg-amber-400 text-charcoal-950'
                    : 'text-parchment-400 hover:text-parchment-200'
                }`}
                title="List Archive"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        
        {/* SPATIAL 3D SPHERE VIEW */}
        {viewMode === 'spatial' && (
          <div className="rounded-sm border border-charcoal-800 bg-charcoal-900/50 shadow-2xl relative overflow-hidden animate-fadeIn">
            <div className="p-4 border-b border-charcoal-850 flex items-center justify-between text-xs font-mono text-parchment-400 bg-charcoal-900/70">
              <span className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                <span>Drag to explore spatial memory sphere ({filteredStories.length} matches)</span>
              </span>
              <button
                onClick={() => setViewMode('grid')}
                className="text-amber-400 hover:text-amber-300 transition-colors"
              >
                Switch to Grid &rarr;
              </button>
            </div>

            <SpatialArchiveSphere stories={filteredStories} />
          </div>
        )}

        {/* GRID VIEW */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
            {filteredStories.map((story) => {
              const unanswered = story.missingQuestions.filter(q => !q.answered).length;
              return (
                <Link
                  key={story.id}
                  to={`/story/${story.id}`}
                  className="group relative rounded-sm overflow-hidden bg-charcoal-900 border border-charcoal-800 hover:border-amber-500/60 transition-all duration-300 flex flex-col shadow-card-dark"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={story.heroImage}
                      alt={story.title}
                      loading="lazy"
                      className="w-full h-full object-cover brightness-90 group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-transparent to-transparent" />

                    <div className="absolute top-3 left-3 flex items-center space-x-2">
                      <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded bg-charcoal-950/80 text-amber-300 border border-amber-500/30 backdrop-blur-sm">
                        {story.category}
                      </span>
                    </div>

                    {unanswered > 0 && (
                      <div className="absolute top-3 right-3 flex items-center space-x-1 px-2 py-0.5 rounded bg-rose-950/80 text-rose-300 border border-rose-500/40 text-[10px] font-mono">
                        <HelpCircle className="w-3 h-3 text-rose-400" />
                        <span>{unanswered} Gaps</span>
                      </div>
                    )}
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-[11px] font-mono text-parchment-400">
                        <MapPin className="w-3 h-3 text-amber-400" />
                        <span>{story.location}</span>
                      </div>
                      <h3 className="font-serif-editorial text-xl text-parchment-100 font-medium leading-snug group-hover:text-amber-200 transition-colors">
                        {story.title}
                      </h3>
                      <p className="text-xs text-parchment-300 font-light line-clamp-2 leading-relaxed">
                        {story.summary}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-charcoal-800 flex items-center justify-between text-[11px] font-mono text-parchment-400">
                      <span>Keeper: {story.storyteller.name}</span>
                      <span className="text-amber-400 group-hover:translate-x-1 transition-transform flex items-center space-x-1">
                        <span>Examine</span>
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* LIST VIEW */}
        {viewMode === 'list' && (
          <div className="space-y-3 animate-fadeIn">
            {filteredStories.map((story) => {
              const unanswered = story.missingQuestions.filter(q => !q.answered).length;
              return (
                <Link
                  key={story.id}
                  to={`/story/${story.id}`}
                  className="group p-5 rounded-sm bg-charcoal-900 border border-charcoal-800 hover:border-amber-500/60 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center space-x-2 text-[10px] font-mono uppercase tracking-widest text-amber-400">
                      <span>{story.category}</span>
                      <span>•</span>
                      <span className="text-parchment-400">{story.location}</span>
                      <span>•</span>
                      <span>Score: {story.preservationScore}%</span>
                    </div>
                    <h3 className="font-serif-editorial text-lg text-parchment-100 font-medium group-hover:text-amber-200 transition-colors">
                      {story.title}
                    </h3>
                    <p className="text-xs text-parchment-300 font-light line-clamp-1">
                      {story.summary}
                    </p>
                  </div>

                  <div className="flex items-center space-x-4 shrink-0 text-xs font-mono">
                    {unanswered > 0 ? (
                      <span className="px-2.5 py-1 rounded bg-rose-950/60 text-rose-300 border border-rose-500/30">
                        {unanswered} Gaps Awaiting
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-500/30">
                        Preserved
                      </span>
                    )}

                    <span className="text-amber-400 group-hover:translate-x-1 transition-transform flex items-center space-x-1">
                      <span>View</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {filteredStories.length === 0 && (
          <div className="text-center py-20 p-8 rounded-sm bg-charcoal-900/50 border border-charcoal-800 space-y-3">
            <Compass className="w-8 h-8 text-amber-400/60 mx-auto" />
            <h3 className="font-serif-editorial text-xl text-parchment-200">No archival lineages matched</h3>
            <p className="text-xs font-mono text-parchment-400">Try adjusting your category or search parameters.</p>
          </div>
        )}

      </div>

    </div>
  );
};
