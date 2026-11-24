import React from 'react';
import { Link } from 'react-router-dom';
import { 
  HelpCircle, 
  PlusCircle, 
  Archive, 
  ArrowRight, 
  Layers, 
  CheckCircle2, 
  FileText,
  Cpu
} from 'lucide-react';
import { useArchive } from '../context/ArchiveContext';

export const DashboardPage: React.FC = () => {
  const { stories, stats } = useArchive();

  const featuredStory = stories.find(s => s.isFeatured) || stories[0];
  const recentStories = stories.slice(0, 4);

  // Collect all unanswered urgent questions across all stories
  const allUnansweredQuestions = stories.flatMap(story => 
    story.missingQuestions
      .filter(q => !q.answered)
      .map(q => ({ ...q, storyTitle: story.title, storyId: story.id }))
  ).slice(0, 3);

  return (
    <div className="min-h-screen bg-charcoal-950 pb-28 text-parchment-200">
      
      {/* 1. Header / Custodian Command Center */}
      <section className="border-b border-charcoal-850 bg-gradient-to-b from-[#090807] to-charcoal-950 pt-12 pb-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-amber-400">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span>Custodian Command Center</span>
              <span>•</span>
              <span>Heritage Integrity Index</span>
            </div>
            <h1 className="font-serif-editorial text-3xl sm:text-5xl text-parchment-100 font-light">
              Your Living Archive
            </h1>
            <p className="text-sm sm:text-base text-parchment-300 font-light max-w-xl leading-relaxed">
              Custody over fragile human memories. Review newly detected gaps, verify oral accounts, and protect disappearing lineages.
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              to="/capture"
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xs text-xs uppercase tracking-widest font-semibold text-charcoal-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 shadow-md transition-all group"
            >
              <PlusCircle className="w-4 h-4 transition-transform group-hover:rotate-90 duration-300" />
              <span>Continue Preserving</span>
            </Link>

            <Link
              to="/archive"
              className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xs text-xs uppercase tracking-widest font-mono text-parchment-300 bg-charcoal-900 hover:bg-charcoal-850 border border-charcoal-800 hover:border-amber-500/40 transition-colors"
            >
              <Archive className="w-4 h-4 text-amber-400/80" />
              <span>Full Exhibition</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Editorial Metrics Band (Clean fine divider lines, large numbers, sparse labels) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-charcoal-800 border border-charcoal-800 rounded-sm overflow-hidden shadow-2xl">
          
          {/* Stat 1: Stories Preserved */}
          <div className="p-6 bg-charcoal-900/95 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest text-parchment-400">
              <span>Stories Preserved</span>
              <FileText className="w-4 h-4 text-amber-400/80" />
            </div>
            <div className="font-serif-editorial text-4xl sm:text-5xl text-parchment-100 font-light">
              {stats.totalStories}
            </div>
            <p className="text-[11px] text-parchment-400 font-mono">
              Across {new Set(stories.map(s => s.category)).size} cultural domains
            </p>
          </div>

          {/* Stat 2: Knowledge Entities */}
          <div className="p-6 bg-charcoal-900/95 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest text-parchment-400">
              <span>Knowledge Entities</span>
              <Layers className="w-4 h-4 text-amber-400/80" />
            </div>
            <div className="font-serif-editorial text-4xl sm:text-5xl text-amber-300 font-light">
              {stats.totalKnowledgeExtracted}
            </div>
            <p className="text-[11px] text-parchment-400 font-mono">
              Materials, tools & sensory lineages
            </p>
          </div>

          {/* Stat 3: Unanswered Questions (Urgent Accent) */}
          <Link
            to="/missing-questions"
            className="p-6 bg-charcoal-900/95 hover:bg-charcoal-850/80 transition-colors space-y-2 group block"
          >
            <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest text-rose-300">
              <span className="flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
                <span>Unanswered Gaps</span>
              </span>
              <HelpCircle className="w-4 h-4 text-rose-400" />
            </div>
            <div className="font-serif-editorial text-4xl sm:text-5xl text-rose-300 font-light">
              {stats.unansweredQuestions}
            </div>
            <p className="text-[11px] text-parchment-400 font-mono group-hover:text-amber-300 transition-colors flex items-center space-x-1">
              <span>Resolve in Gap Engine</span>
              <ArrowRight className="w-3 h-3" />
            </p>
          </Link>

          {/* Stat 4: Preservation Completeness */}
          <div className="p-6 bg-charcoal-900/95 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest text-parchment-400">
              <span>Preservation Index</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400/80" />
            </div>
            <div className="font-serif-editorial text-4xl sm:text-5xl text-emerald-400 font-light">
              {stats.preservationCompleteness}%
            </div>
            <p className="text-[11px] text-parchment-400 font-mono">
              Composite verification score
            </p>
          </div>

        </div>
      </div>

      {/* 3. Main Dashboard Panels */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left column (8 cols): Featured Memory & Recent Stream */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Featured Spotlight Memory */}
          {featuredStory && (
            <div className="rounded-sm border border-charcoal-800 bg-charcoal-900 overflow-hidden shadow-card-dark relative group">
              <div className="relative aspect-[21/9] sm:aspect-[16/7] overflow-hidden">
                <img
                  src={featuredStory.heroImage}
                  alt={featuredStory.title}
                  className="w-full h-full object-cover object-center brightness-75 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/40 to-transparent" />
                
                <div className="absolute top-4 left-4">
                  <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-xs bg-charcoal-950/80 text-amber-300 border border-amber-500/40 backdrop-blur-sm">
                    Featured Heritage Custody
                  </span>
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-4">
                <div className="flex items-center space-x-2 text-xs font-mono text-parchment-400">
                  <span>{featuredStory.category}</span>
                  <span>•</span>
                  <span>{featuredStory.location}</span>
                  <span>•</span>
                  <span>Preserved: {featuredStory.preservationDate}</span>
                </div>

                <h3 className="font-serif-editorial text-2xl sm:text-3xl text-parchment-100 font-medium leading-snug">
                  {featuredStory.title}
                </h3>

                <p className="text-sm text-parchment-300 font-light leading-relaxed">
                  {featuredStory.summary}
                </p>

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-xs font-mono text-parchment-400">
                    Keeper: <strong className="text-parchment-200">{featuredStory.storyteller.name}</strong>
                  </span>
                  <Link
                    to={`/story/${featuredStory.id}`}
                    className="inline-flex items-center space-x-1.5 text-xs font-mono text-amber-400 hover:text-amber-300 uppercase tracking-wider"
                  >
                    <span>Inspect Folio</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Recently Preserved Stream */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-charcoal-800 pb-3">
              <h3 className="font-serif-editorial text-xl sm:text-2xl text-parchment-100 font-light">
                Recent Preservations
              </h3>
              <Link
                to="/archive"
                className="text-xs font-mono text-amber-400 hover:text-amber-300 flex items-center space-x-1"
              >
                <span>View all</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-3">
              {recentStories.map((story) => (
                <Link
                  key={story.id}
                  to={`/story/${story.id}`}
                  className="p-4 sm:p-5 rounded-sm bg-charcoal-900 border border-charcoal-800 hover:border-amber-500/60 transition-all flex items-center justify-between gap-4 group"
                >
                  <div className="flex items-center space-x-4 min-w-0">
                    <img
                      src={story.heroImage}
                      alt={story.title}
                      className="w-12 h-12 rounded-xs object-cover border border-charcoal-750 shrink-0 brightness-90"
                    />
                    <div className="min-w-0 space-y-0.5">
                      <div className="flex items-center space-x-2 text-[10px] font-mono text-amber-400 uppercase tracking-wider">
                        <span>{story.category}</span>
                        <span>•</span>
                        <span className="text-parchment-500">{story.location}</span>
                      </div>
                      <h4 className="font-serif-editorial text-base text-parchment-100 font-medium truncate group-hover:text-amber-200 transition-colors">
                        {story.title}
                      </h4>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 shrink-0 text-xs font-mono text-parchment-400">
                    <span>{story.missingQuestions.filter(q => !q.answered).length} gaps</span>
                    <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

        </div>

        {/* Right column (4 cols): Urgent Questions Queue & Hybrid Engine */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* Urgent Questions Queue */}
          <div className="p-6 rounded-sm bg-charcoal-900 border border-amber-500/30 shadow-antique space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-charcoal-800">
              <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold">
                <HelpCircle className="w-4 h-4 text-rose-400" />
                <span>Urgent Questions Queue</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                Action Required
              </span>
            </div>

            <p className="text-xs text-parchment-300 font-light leading-relaxed">
              Formulated questions that should be posed to knowledge holders before the oral lineage is interrupted:
            </p>

            <div className="space-y-3 pt-1">
              {allUnansweredQuestions.map((q) => (
                <Link
                  key={q.id}
                  to={`/story/${q.storyId}`}
                  className="p-3.5 rounded-sm bg-charcoal-950 border border-charcoal-800 hover:border-amber-500/60 transition-all block space-y-1.5 group"
                >
                  <span className="text-[9px] font-mono uppercase tracking-widest text-parchment-500 block truncate">
                    {q.storyTitle}
                  </span>
                  <p className="font-serif-editorial text-sm text-parchment-100 italic leading-snug group-hover:text-amber-200 transition-colors">
                    &ldquo;{q.question}&rdquo;
                  </p>
                  <div className="flex items-center justify-between text-[10px] font-mono text-parchment-400 pt-1">
                    <span className="text-rose-400">{q.importance} Priority</span>
                    <span className="text-amber-400 flex items-center space-x-0.5">
                      <span>Answer</span>
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            <div className="pt-2">
              <Link
                to="/missing-questions"
                className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-xs text-xs uppercase tracking-widest font-mono text-parchment-200 bg-charcoal-850 hover:bg-charcoal-800 border border-charcoal-750 transition-colors"
              >
                <span>Open Missing Questions Engine</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Hybrid AI Logic Custody Card */}
          <div className="p-6 rounded-sm bg-charcoal-900 border border-charcoal-800 shadow-card-dark space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-charcoal-800">
              <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-wider text-amber-400">
                <Cpu className="w-4 h-4" />
                <span>Hybrid AI Engine</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400">Active</span>
            </div>

            <p className="text-xs text-parchment-300 font-light leading-relaxed">
              Configured with official Firebase AI Logic SDK (<code className="text-amber-300">gemini-3.8-flash</code>) with automatic fallback to local heuristic extractors when off-grid.
            </p>

            <div className="pt-2">
              <Link
                to="/settings"
                className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-xs text-xs uppercase tracking-widest font-mono text-parchment-300 bg-charcoal-950 hover:bg-charcoal-850 border border-charcoal-800 transition-colors"
              >
                <span>Audit AI & Connectivity</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
