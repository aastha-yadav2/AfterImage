import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Grid, 
  List, 
  HelpCircle, 
  Sparkles, 
  Compass, 
  ArrowRight, 
  MapPin
} from 'lucide-react';
import { useArchive } from '../context/ArchiveContext';
import { Category } from '../types';
import { Badge } from '../components/ui/Badge';

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

const FEATURED_COLLECTIONS = [
  {
    title: 'Vanishing Artisanal Lineages',
    description: 'Masters in their 80s and 90s preserving living dye vats, stone gravity masonry, and ancient woodcraft.',
    category: 'Crafts',
    count: '3 Stories',
    image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80'
  },
  {
    title: 'Heritage Foodways & Unmeasured Breads',
    description: 'Ancestral baking rituals, sourdough cultures, and microclimate wind intuition.',
    category: 'Recipes',
    count: '2 Stories',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80'
  },
  {
    title: 'Acoustic Dialects & Sonic Heritage',
    description: 'Whistled canyon grammars, work songs, and dialect terminology forgotten by dictionaries.',
    category: 'Languages',
    count: '2 Stories',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80'
  }
];

export const LivingArchivePage: React.FC = () => {
  const { stories } = useArchive();

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'All' | Category>('All');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'recent' | 'gaps' | 'score' | 'title'>('recent');

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
            <span>The Living Archive</span>
            <span>•</span>
            <span>Search & Exploration</span>
          </div>
          <h1 className="font-serif-editorial text-3xl sm:text-5xl text-parchment-100 font-light">
            Preserved Knowledge Collections
          </h1>
          <p className="text-sm sm:text-base text-parchment-300 font-light max-w-2xl">
            Browse oral narratives, family recipes, and disappearing craft techniques across regions and generations.
          </p>
        </div>
      </section>

      {/* 2. Featured Curated Collections */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-mono uppercase tracking-widest text-parchment-400 flex items-center space-x-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Curated Archival Folios</span>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FEATURED_COLLECTIONS.map((col, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedCategory(col.category as any)}
              className="group cursor-pointer rounded-sm border border-charcoal-800 bg-charcoal-900 overflow-hidden shadow-card-dark hover:border-amber-500/40 transition-all duration-300 relative"
            >
              <div className="h-36 w-full relative overflow-hidden">
                <img
                  src={col.image}
                  alt={col.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-85"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900 to-transparent" />
                <span className="absolute top-3 left-3 text-[10px] font-mono px-2 py-0.5 rounded bg-charcoal-950/80 text-amber-300 border border-charcoal-700">
                  {col.count}
                </span>
              </div>
              <div className="p-4 space-y-1.5">
                <h3 className="font-serif-editorial text-lg text-parchment-100 group-hover:text-amber-200 transition-colors">
                  {col.title}
                </h3>
                <p className="text-xs text-parchment-400 font-light line-clamp-2">
                  {col.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Search & Filter Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-6">
        
        {/* Main Search Input */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-parchment-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search stories by craft, elder's name, material (e.g. 'saffron', 'ash', 'Sasaki'), or location..."
            className="w-full bg-charcoal-900 border border-charcoal-750 focus:border-amber-400 focus:ring-1 focus:ring-amber-400/40 rounded-sm pl-12 pr-4 py-3.5 text-sm text-parchment-100 placeholder:text-charcoal-500 font-sans shadow-card-dark"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-mono text-parchment-400 hover:text-parchment-100"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Tabs */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setSelectedTag(null);
              }}
              className={`px-3.5 py-1.5 text-xs font-mono rounded-sm whitespace-nowrap border transition-all ${
                selectedCategory === cat
                  ? 'bg-amber-400 text-charcoal-950 border-amber-300 font-semibold shadow-sm'
                  : 'bg-charcoal-900 border-charcoal-800 text-parchment-400 hover:text-parchment-200 hover:border-charcoal-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Filter Meta & View Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
          
          <div className="flex items-center space-x-2 text-xs text-parchment-400 font-mono">
            <span>Showing {filteredStories.length} of {stories.length} stories</span>
            {selectedTag && (
              <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded bg-amber-950/60 text-amber-300 border border-amber-500/30">
                <span>#{selectedTag}</span>
                <button onClick={() => setSelectedTag(null)}>&times;</button>
              </span>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {/* Sort Dropdown */}
            <div className="flex items-center space-x-2">
              <span className="text-xs font-mono uppercase tracking-wider text-parchment-500">
                Sort:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-charcoal-900 border border-charcoal-750 text-parchment-200 text-xs font-mono rounded px-2.5 py-1.5 focus:border-amber-400 focus:outline-none"
              >
                <option value="recent">Recently Preserved</option>
                <option value="gaps">Most Gaps Pending</option>
                <option value="score">Preservation Completeness</option>
                <option value="title">Title (A-Z)</option>
              </select>
            </div>

            {/* Grid / List View Toggle */}
            <div className="flex items-center border border-charcoal-750 rounded-sm bg-charcoal-900 p-0.5">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-sm transition-colors ${
                  viewMode === 'grid' ? 'bg-charcoal-800 text-amber-300' : 'text-parchment-500 hover:text-parchment-300'
                }`}
                aria-label="Grid View"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-sm transition-colors ${
                  viewMode === 'list' ? 'bg-charcoal-800 text-amber-300' : 'text-parchment-500 hover:text-parchment-300'
                }`}
                aria-label="List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </section>

      {/* 4. Stories Display (Grid or List) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {filteredStories.length === 0 ? (
          <div className="p-16 text-center bg-charcoal-900/60 rounded border border-charcoal-800 space-y-4">
            <Compass className="w-10 h-10 text-charcoal-600 mx-auto" />
            <h3 className="font-serif-editorial text-2xl text-parchment-200">
              No living stories match your criteria
            </h3>
            <p className="text-xs text-parchment-400 max-w-md mx-auto">
              Try adjusting your search terms, resetting category filters, or contribute a new oral history to the archive.
            </p>
            <div className="pt-2">
              <Link
                to="/capture"
                className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-sm text-xs uppercase tracking-wider font-semibold text-charcoal-950 bg-amber-400 hover:bg-amber-300"
              >
                <span>Preserve New Story</span>
              </Link>
            </div>
          </div>
        ) : viewMode === 'grid' ? (
          /* Grid View */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredStories.map((story) => {
              const pendingQuestions = story.missingQuestions.filter(q => !q.answered).length;
              return (
                <div
                  key={story.id}
                  className="rounded-sm border border-charcoal-800 bg-charcoal-900 overflow-hidden shadow-card-dark hover:border-amber-500/40 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Hero Thumbnail */}
                    <div className="relative h-56 w-full overflow-hidden">
                      <img
                        src={story.heroImage}
                        alt={story.title}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-90"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/30 to-transparent" />
                      
                      <div className="absolute top-3 left-3">
                        <Badge variant="amber">{story.category}</Badge>
                      </div>

                      <div className="absolute top-3 right-3">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-charcoal-950/80 text-parchment-300 border border-charcoal-700">
                          {story.preservationScore}% Preserved
                        </span>
                      </div>

                      <div className="absolute bottom-3 left-3 right-3 text-xs font-mono text-parchment-400 flex items-center space-x-2">
                        <MapPin className="w-3.5 h-3.5 text-amber-400" />
                        <span className="truncate">{story.location || 'Local Record'}</span>
                      </div>
                    </div>

                    {/* Content Meta */}
                    <div className="p-6 space-y-3">
                      <div className="text-xs text-parchment-400 font-mono">
                        Source: <span className="text-parchment-200">{story.storyteller.name}</span>
                      </div>

                      <h3 className="font-serif-editorial text-xl sm:text-2xl text-parchment-100 group-hover:text-amber-200 transition-colors font-medium leading-snug">
                        <Link to={`/story/${story.id}`}>
                          {story.title}
                        </Link>
                      </h3>

                      <p className="text-xs text-parchment-400 font-light line-clamp-3 leading-relaxed">
                        {story.summary}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {story.tags.slice(0, 3).map((t) => (
                          <button
                            key={t}
                            onClick={() => setSelectedTag(t)}
                            className="text-[10px] font-mono px-2 py-0.5 rounded bg-charcoal-950 border border-charcoal-800 text-parchment-400 hover:text-amber-300"
                          >
                            #{t}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom Actions */}
                  <div className="px-6 py-4 border-t border-charcoal-800/80 bg-charcoal-950/40 flex items-center justify-between text-xs">
                    <Link
                      to={`/missing-questions?storyId=${story.id}`}
                      className="inline-flex items-center space-x-1 font-mono text-[11px] text-amber-400 hover:text-amber-300"
                    >
                      <HelpCircle className="w-3.5 h-3.5" />
                      <span>{pendingQuestions} Gaps Pending</span>
                    </Link>

                    <Link
                      to={`/story/${story.id}`}
                      className="inline-flex items-center space-x-1 font-mono text-xs uppercase tracking-wider text-parchment-300 hover:text-amber-300 font-medium"
                    >
                      <span>Explore</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* List View */
          <div className="space-y-4">
            {filteredStories.map((story) => {
              const pendingQuestions = story.missingQuestions.filter(q => !q.answered).length;
              return (
                <div
                  key={story.id}
                  className="p-5 rounded-sm border border-charcoal-800 bg-charcoal-900 hover:border-amber-500/40 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-card-dark group"
                >
                  <div className="flex items-start space-x-5">
                    <img
                      src={story.heroImage}
                      alt={story.title}
                      className="w-24 h-24 rounded-sm object-cover object-center border border-charcoal-700 flex-shrink-0"
                    />
                    <div className="space-y-1.5">
                      <div className="flex items-center space-x-2 text-xs font-mono">
                        <Badge variant="amber">{story.category}</Badge>
                        <span className="text-charcoal-600">•</span>
                        <span className="text-parchment-400">{story.location}</span>
                        <span className="text-charcoal-600">•</span>
                        <span className="text-parchment-400">Source: {story.storyteller.name}</span>
                      </div>

                      <Link
                        to={`/story/${story.id}`}
                        className="font-serif-editorial text-2xl text-parchment-100 group-hover:text-amber-200 transition-colors font-medium block"
                      >
                        {story.title}
                      </Link>

                      <p className="text-xs text-parchment-400 font-light max-w-2xl line-clamp-1">
                        {story.summary}
                      </p>
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-3 text-right">
                    <span className="text-xs font-mono px-2.5 py-1 rounded bg-rose-950/60 border border-rose-500/30 text-rose-300">
                      {pendingQuestions} Gaps Pending
                    </span>
                    <Link
                      to={`/story/${story.id}`}
                      className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-sm text-xs uppercase tracking-wider font-medium text-parchment-200 bg-charcoal-800 hover:bg-charcoal-750 border border-charcoal-700"
                    >
                      <span>Read Story</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

    </div>
  );
};
