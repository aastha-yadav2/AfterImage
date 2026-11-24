import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  HelpCircle, 
  PlusCircle, 
  Archive, 
  ArrowRight, 
  Layers, 
  CheckCircle2, 
  FileText
} from 'lucide-react';
import { useArchive } from '../context/ArchiveContext';
import { ImportanceBadge, Badge } from '../components/ui/Badge';
import { AIInferenceBadge } from '../components/ui/AIInferenceBadge';

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
    <div className="min-h-screen bg-charcoal-950 pb-24 text-parchment-200">
      
      {/* 1. Header / Welcome Banner */}
      <section className="border-b border-charcoal-850 bg-gradient-to-b from-charcoal-900/60 to-charcoal-950 pt-12 pb-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-amber-400">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
              <span>Custodian Console</span>
              <span>•</span>
              <span>Personal Living Archive</span>
            </div>
            <h1 className="font-serif-editorial text-3xl sm:text-5xl text-parchment-100 font-light">
              Your Living Archive
            </h1>
            <p className="text-sm sm:text-base text-parchment-300 font-light max-w-xl">
              Custody over fragile human memories. Review newly detected gaps, verify oral accounts, and protect disappearing lineages.
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              to="/capture"
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-sm text-xs uppercase tracking-wider font-semibold text-charcoal-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 shadow-md transition-all group"
            >
              <PlusCircle className="w-4 h-4 transition-transform group-hover:rotate-90 duration-300" />
              <span>Continue Preserving</span>
            </Link>

            <Link
              to="/archive"
              className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-sm text-xs uppercase tracking-wider font-medium text-parchment-200 bg-charcoal-900 hover:bg-charcoal-850 border border-charcoal-700"
            >
              <Archive className="w-4 h-4 text-amber-400/80" />
              <span>Full Archive</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Main Stats Metric Ribbon */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Stat 1: Stories Preserved */}
          <div className="p-5 rounded-sm bg-charcoal-900 border border-charcoal-800 shadow-card-dark flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-mono uppercase tracking-wider text-parchment-400">
                Stories Preserved
              </span>
              <div className="font-serif-editorial text-3xl sm:text-4xl text-parchment-100 font-normal">
                {stats.totalStories}
              </div>
              <span className="text-[11px] text-amber-400/80 font-mono">
                Across 6 cultural domains
              </span>
            </div>
            <div className="w-11 h-11 rounded-sm bg-charcoal-850 border border-charcoal-750 flex items-center justify-center text-amber-400">
              <FileText className="w-5 h-5" />
            </div>
          </div>

          {/* Stat 2: Knowledge Entities */}
          <div className="p-5 rounded-sm bg-charcoal-900 border border-charcoal-800 shadow-card-dark flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-mono uppercase tracking-wider text-parchment-400">
                Knowledge Captured
              </span>
              <div className="font-serif-editorial text-3xl sm:text-4xl text-amber-300 font-normal">
                {stats.totalKnowledgeExtracted}
              </div>
              <span className="text-[11px] text-parchment-400 font-mono">
                Materials, techniques & lineage
              </span>
            </div>
            <div className="w-11 h-11 rounded-sm bg-charcoal-850 border border-charcoal-750 flex items-center justify-center text-amber-400">
              <Layers className="w-5 h-5" />
            </div>
          </div>

          {/* Stat 3: Unanswered Questions (Urgent Accent) */}
          <Link
            to="/missing-questions"
            className="p-5 rounded-sm bg-charcoal-900 border border-amber-500/40 hover:border-amber-400 shadow-card-dark flex items-center justify-between transition-colors group"
          >
            <div className="space-y-1">
              <div className="flex items-center space-x-1.5 text-xs font-mono uppercase tracking-wider text-rose-300">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse"></span>
                <span>Questions Unanswered</span>
              </div>
              <div className="font-serif-editorial text-3xl sm:text-4xl text-rose-300 font-normal">
                {stats.unansweredQuestions}
              </div>
              <span className="text-[11px] text-parchment-400 font-mono group-hover:text-amber-300 transition-colors flex items-center space-x-1">
                <span>Resolve in Gap Engine</span>
                <ArrowRight className="w-3 h-3" />
              </span>
            </div>
            <div className="w-11 h-11 rounded-sm bg-rose-950/40 border border-rose-500/30 flex items-center justify-center text-rose-400">
              <HelpCircle className="w-5 h-5" />
            </div>
          </Link>

          {/* Stat 4: Preservation Completeness */}
          <div className="p-5 rounded-sm bg-charcoal-900 border border-charcoal-800 shadow-card-dark flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-mono uppercase tracking-wider text-parchment-400">
                Preservation Index
              </span>
              <div className="font-serif-editorial text-3xl sm:text-4xl text-emerald-400 font-normal">
                {stats.preservationCompleteness}%
              </div>
              <span className="text-[11px] text-parchment-400 font-mono">
                {stats.answeredQuestions} of {stats.totalQuestions} questions answered
              </span>
            </div>
            <div className="w-11 h-11 rounded-sm bg-emerald-950/40 border border-emerald-600/30 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>

        </div>
      </div>

      {/* 3. Main Dashboard Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column (8 cols): Featured Story + Recent Stories */}
        <div className="lg:col-span-8 space-y-10">
          
          {/* Featured Story Showcase */}
          {featuredStory && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-widest text-parchment-400 flex items-center space-x-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Featured In Focus</span>
                </span>
                <Link
                  to={`/story/${featuredStory.id}`}
                  className="text-xs font-mono uppercase tracking-wider text-amber-400 hover:text-amber-300"
                >
                  View Details &rarr;
                </Link>
              </div>

              <div className="rounded-sm border border-charcoal-800 bg-charcoal-900 overflow-hidden shadow-card-dark group">
                <div className="relative h-64 sm:h-72 w-full overflow-hidden">
                  <img
                    src={featuredStory.heroImage}
                    alt={featuredStory.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/40 to-transparent" />
                  
                  <div className="absolute top-4 left-4">
                    <Badge variant="amber">{featuredStory.category}</Badge>
                  </div>

                  <div className="absolute bottom-5 left-5 right-5 space-y-1.5">
                    <span className="text-xs font-mono text-parchment-400 uppercase tracking-wider">
                      {featuredStory.location} • Source: {featuredStory.storyteller.name}
                    </span>
                    <h3 className="font-serif-editorial text-2xl sm:text-3xl text-parchment-100 font-medium leading-tight">
                      {featuredStory.title}
                    </h3>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <p className="text-sm text-parchment-300 font-light leading-relaxed">
                    {featuredStory.summary}
                  </p>

                  <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs border-t border-charcoal-800">
                    <div className="flex items-center space-x-3 text-parchment-400 font-mono">
                      <AIInferenceBadge source={featuredStory.inferenceSource || 'IN_CLOUD'} />
                      <span>Score: {featuredStory.preservationScore}%</span>
                    </div>

                    <Link
                      to={`/missing-questions?storyId=${featuredStory.id}`}
                      className="inline-flex items-center space-x-1.5 text-amber-400 hover:text-amber-300 font-mono uppercase tracking-wider font-medium"
                    >
                      <span>Check {featuredStory.missingQuestions.filter(q => !q.answered).length} Unanswered Questions</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Recently Preserved Stories List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-widest text-parchment-400">
                Recently Preserved Stories
              </span>
              <Link
                to="/archive"
                className="text-xs font-mono uppercase tracking-wider text-amber-400 hover:text-amber-300"
              >
                View all ({stories.length}) &rarr;
              </Link>
            </div>

            <div className="space-y-3">
              {recentStories.map((story) => {
                const pendingQuestions = story.missingQuestions.filter(q => !q.answered).length;
                return (
                  <div
                    key={story.id}
                    className="p-4 sm:p-5 rounded-sm bg-charcoal-900 border border-charcoal-800/80 hover:border-amber-500/30 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group"
                  >
                    <div className="flex items-start space-x-4">
                      <img
                        src={story.heroImage}
                        alt={story.title}
                        className="w-16 h-16 rounded-sm object-cover object-center border border-charcoal-700 flex-shrink-0"
                      />
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider">
                            {story.category}
                          </span>
                          <span className="text-charcoal-600">•</span>
                          <span className="text-xs text-parchment-400 font-mono">
                            {story.storyteller.name}
                          </span>
                        </div>
                        <Link
                          to={`/story/${story.id}`}
                          className="font-serif-editorial text-lg text-parchment-100 hover:text-amber-200 transition-colors font-medium block"
                        >
                          {story.title}
                        </Link>
                        <p className="text-xs text-parchment-400 line-clamp-1 font-light">
                          {story.summary}
                        </p>
                      </div>
                    </div>

                    <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-2 text-right">
                      <span className={`text-[11px] font-mono px-2 py-0.5 rounded-sm border ${
                        pendingQuestions > 0 
                          ? 'bg-rose-950/40 text-rose-300 border-rose-600/30' 
                          : 'bg-emerald-950/40 text-emerald-300 border-emerald-600/30'
                      }`}>
                        {pendingQuestions > 0 ? `${pendingQuestions} gaps pending` : 'All gaps sealed'}
                      </span>
                      <Link
                        to={`/story/${story.id}`}
                        className="text-xs font-mono text-parchment-400 hover:text-amber-300 flex items-center space-x-1"
                      >
                        <span>Open</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Column (4 cols): Urgent Missing Questions Spotlight & Preserver Tools */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Urgent Questions Engine Widget */}
          <div className="rounded-sm border border-amber-500/30 bg-charcoal-900/90 p-6 space-y-5 shadow-card-dark">
            <div className="flex items-center justify-between pb-3 border-b border-charcoal-800">
              <div className="flex items-center space-x-2 text-amber-400">
                <HelpCircle className="w-4 h-4" />
                <span className="text-xs font-mono uppercase tracking-wider font-semibold">
                  Urgent Gaps to Ask
                </span>
              </div>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-rose-950/80 text-rose-300 border border-rose-500/30">
                Priority
              </span>
            </div>

            <p className="text-xs text-parchment-400 font-light leading-relaxed">
              These questions were uncovered by the gap engine. Ask the knowledge source while they are still available:
            </p>

            <div className="space-y-4">
              {allUnansweredQuestions.map((q) => (
                <div
                  key={q.id}
                  className="p-3.5 bg-charcoal-950/90 rounded border border-charcoal-800 space-y-2 hover:border-amber-500/40 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest">
                      {q.category}
                    </span>
                    <ImportanceBadge importance={q.importance} />
                  </div>

                  <p className="font-serif-editorial text-sm text-parchment-100 italic leading-snug">
                    &ldquo;{q.question}&rdquo;
                  </p>

                  <div className="flex items-center justify-between pt-1 text-[11px] border-t border-charcoal-850">
                    <span className="text-parchment-500 truncate max-w-[150px]">
                      {q.storyTitle}
                    </span>
                    <Link
                      to={`/missing-questions?storyId=${q.storyId}`}
                      className="text-amber-400 hover:text-amber-300 font-mono uppercase tracking-wider text-[10px] flex items-center space-x-1"
                    >
                      <span>Answer</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <Link
              to="/missing-questions"
              className="block w-full py-2.5 text-center rounded-sm text-xs uppercase tracking-wider font-semibold text-charcoal-950 bg-amber-400 hover:bg-amber-300 transition-colors"
            >
              Open Missing Questions Engine ({stats.unansweredQuestions})
            </Link>
          </div>

          {/* Quick Action: Start a new capture */}
          <div className="rounded-sm border border-charcoal-800 bg-charcoal-900 p-6 space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-parchment-400 block">
              Field Interviewing
            </span>
            <h4 className="font-serif-editorial text-xl text-parchment-100">
              Conducting an interview today?
            </h4>
            <p className="text-xs text-parchment-300 font-light leading-relaxed">
              Use the capture tool with audio guidance. The engine will parse materials and generate immediate follow-ups as you record.
            </p>
            <Link
              to="/capture"
              className="inline-flex items-center justify-center space-x-2 w-full py-2.5 rounded-sm text-xs uppercase tracking-wider font-medium text-parchment-200 bg-charcoal-800 hover:bg-charcoal-750 border border-charcoal-700"
            >
              <PlusCircle className="w-3.5 h-3.5 text-amber-400" />
              <span>Launch Capture Studio</span>
            </Link>
          </div>

        </div>

      </div>

    </div>
  );
};
