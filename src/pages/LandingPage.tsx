import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  HelpCircle, 
  Compass
} from 'lucide-react';
import { useArchive } from '../context/ArchiveContext';

export const LandingPage: React.FC = () => {
  const { stories, stats } = useArchive();
  const featuredStory = stories.find(s => s.isFeatured) || stories[0];

  return (
    <div className="relative min-h-screen bg-charcoal-950 overflow-hidden">
      {/* Background ambient warmth and grain */}
      <div className="absolute inset-0 bg-grain-overlay pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-amber-600/5 rounded-full blur-[140px] pointer-events-none" />

      {/* 1. CINEMATIC HERO SECTION */}
      <section className="relative pt-20 pb-28 lg:pt-32 lg:pb-36 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-4xl mx-auto space-y-8">
          
          {/* Subtle archival badge */}
          <div className="inline-flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full border border-amber-500/30 bg-charcoal-900/90 text-xs font-mono tracking-widest uppercase text-amber-300 shadow-sm backdrop-blur-sm animate-fadeIn">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
            <span>A Living Archive for Fragile Knowledge</span>
          </div>

          {/* Editorial Headline */}
          <h1 className="font-serif-editorial text-4xl sm:text-6xl lg:text-7xl font-light text-parchment-100 leading-[1.08] tracking-tight">
            Some things disappear before we realize they mattered.
          </h1>

          {/* Subheading */}
          <p className="font-sans text-lg sm:text-xl lg:text-2xl text-parchment-300 font-light max-w-2xl mx-auto leading-relaxed">
            Preserve the voices, knowledge, and stories the world is about to forget.
          </p>

          {/* CTAs */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <Link
              to="/capture"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-3 px-8 py-4 rounded-sm text-sm uppercase tracking-widest font-semibold text-charcoal-950 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 transition-all duration-300 shadow-xl shadow-amber-950/60 border border-amber-300/40 group"
            >
              <span>Begin preserving</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 duration-200" />
            </Link>

            <Link
              to="/archive"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 px-8 py-4 rounded-sm text-sm uppercase tracking-widest font-medium text-parchment-200 bg-charcoal-900/80 hover:bg-charcoal-850 border border-charcoal-700/80 hover:border-amber-500/40 transition-all duration-300"
            >
              <Compass className="w-4 h-4 text-amber-400" />
              <span>Explore the archive</span>
            </Link>
          </div>

          {/* Editorial metadata snippet */}
          <div className="pt-8 flex flex-wrap items-center justify-center gap-y-2 gap-x-8 text-xs font-mono text-parchment-500">
            <span className="flex items-center space-x-1.5">
              <span className="text-amber-400/80">●</span>
              <span>{stats.totalStories} Stories in Living Custody</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <span className="text-amber-400/80">●</span>
              <span>{stats.unansweredQuestions} Questions Awaiting Storytellers</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <span className="text-amber-400/80">●</span>
              <span>Zero-Loss Audio & Structured Extraction</span>
            </span>
          </div>
        </div>

        {/* Cinematic Archival Imagery Mosaic */}
        <div className="mt-16 sm:mt-24 grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-6 items-center">
          
          {/* Left card: Craft & Old Hands */}
          <div className="md:col-span-4 relative group overflow-hidden rounded-sm border border-charcoal-800 bg-charcoal-900 aspect-[4/5] shadow-card-dark">
            <img
              src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80"
              alt="Elder artisan hands working natural indigo"
              className="w-full h-full object-cover object-center brightness-90 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/40 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400">
                Kamiyama, Japan
              </span>
              <h3 className="font-serif-editorial text-lg text-parchment-100 font-medium leading-snug">
                The Smell of Living Blue: Fermenting Indigo without Instruments
              </h3>
            </div>
          </div>

          {/* Center spotlight card: The Core Differentiator Callout */}
          <div className="md:col-span-5 relative overflow-hidden rounded-sm border border-amber-500/30 bg-charcoal-900/95 p-6 sm:p-8 shadow-antique space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-amber-400 text-xs font-mono uppercase tracking-wider">
                <HelpCircle className="w-4 h-4 text-amber-400 animate-pulse" />
                <span>The Missing Questions Engine</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">
                AI Gap Detection
              </span>
            </div>

            <div className="space-y-3">
              <span className="text-xs font-mono uppercase tracking-widest text-parchment-400">
                Identified Gap Before Knowledge is Lost:
              </span>
              <p className="font-serif-editorial text-xl sm:text-2xl text-parchment-100 italic leading-snug">
                &ldquo;Which specific native hardwood species are burned for the lye, and what season must the wood be felled?&rdquo;
              </p>
              <div className="p-3 bg-charcoal-950/80 rounded border border-charcoal-800 text-xs text-parchment-300 space-y-1">
                <p className="text-amber-300 font-mono text-[11px] uppercase tracking-wider">Why it matters to preserve now:</p>
                <p className="font-light">
                  Different trees alter the pH balance; modern ash causes vat spoilage within two weeks. Master Sasaki is 88 years old.
                </p>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-charcoal-800 text-xs">
              <span className="text-parchment-400 font-light">Status: Pending Elder Follow-up</span>
              <Link 
                to="/missing-questions" 
                className="text-amber-400 hover:text-amber-300 font-mono uppercase tracking-wider flex items-center space-x-1"
              >
                <span>View Engine</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* Right card: Handwritten Recipes & Memories */}
          <div className="md:col-span-3 relative group overflow-hidden rounded-sm border border-charcoal-800 bg-charcoal-900 aspect-[4/5] shadow-card-dark">
            <img
              src="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80"
              alt="Old wooden trough and stone-ground heritage bread"
              className="w-full h-full object-cover object-center brightness-90 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/40 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400">
                Modica Alta, Sicily
              </span>
              <h3 className="font-serif-editorial text-lg text-parchment-100 font-medium leading-snug">
                Kneading Until the Dough Sighs: Nonna Rosaria’s Easter Loaf
              </h3>
            </div>
          </div>

        </div>
      </section>

      {/* 2. THE PHILOSOPHY / HOW AFTERIMAGE TRANSCENDS REGULAR AI */}
      <section className="py-24 border-t border-charcoal-850 bg-charcoal-900/40 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16 space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-400">
              Beyond Chatbots & Cold Transcripts
            </span>
            <h2 className="font-serif-editorial text-3xl sm:text-5xl text-parchment-100 font-light leading-tight">
              Oral memory is fragile. When a storyteller leaves, the questions you forgot to ask vanish forever.
            </h2>
            <p className="text-parchment-300 font-light text-base leading-relaxed pt-2">
              Most digital tools treat recordings as static files or generic summaries. AFTERIMAGE treats memory as an endangered living ecosystem — actively discovering what is missing while the human custodian is still present.
            </p>
          </div>

          {/* The 5-Pillar Architecture */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            
            {/* Step 1 */}
            <div className="p-6 bg-charcoal-900/80 border border-charcoal-800 rounded-sm space-y-3 relative group hover:border-amber-500/40 transition-colors">
              <div className="w-10 h-10 rounded-sm bg-charcoal-850 border border-charcoal-700 flex items-center justify-center text-amber-400 font-mono text-sm">
                01
              </div>
              <h3 className="font-serif-editorial text-xl text-parchment-100">
                Capture the Voice
              </h3>
              <p className="text-xs text-parchment-400 font-light leading-relaxed">
                Record oral histories, unwritten family recipes, artisanal movements, and local dialects directly into sovereign storage.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-6 bg-charcoal-900/80 border border-charcoal-800 rounded-sm space-y-3 relative group hover:border-amber-500/40 transition-colors">
              <div className="w-10 h-10 rounded-sm bg-charcoal-850 border border-charcoal-700 flex items-center justify-center text-amber-400 font-mono text-sm">
                02
              </div>
              <h3 className="font-serif-editorial text-xl text-parchment-100">
                Extract Structured Entities
              </h3>
              <p className="text-xs text-parchment-400 font-light leading-relaxed">
                Isolates tacit knowledge: people, unwritten materials, microclimate cues, forgotten tools, and kinetic techniques.
              </p>
            </div>

            {/* Step 3 - Highlighted Core Differentiator */}
            <div className="p-6 bg-gradient-to-b from-charcoal-850 to-charcoal-900 border-2 border-amber-500/50 rounded-sm space-y-3 relative group shadow-amber-subtle">
              <div className="w-10 h-10 rounded-sm bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300 font-mono text-sm font-bold">
                03
              </div>
              <div className="inline-block px-2 py-0.5 text-[9px] font-mono uppercase tracking-widest text-amber-300 bg-amber-950/80 rounded border border-amber-600/30">
                Core Differentiator
              </div>
              <h3 className="font-serif-editorial text-xl text-amber-200 font-semibold">
                Missing Questions Engine
              </h3>
              <p className="text-xs text-parchment-300 font-light leading-relaxed">
                Identifies critical gaps in the story and generates respectful interview questions before the master or elder is unavailable.
              </p>
            </div>

            {/* Step 4 */}
            <div className="p-6 bg-charcoal-900/80 border border-charcoal-800 rounded-sm space-y-3 relative group hover:border-amber-500/40 transition-colors">
              <div className="w-10 h-10 rounded-sm bg-charcoal-850 border border-charcoal-700 flex items-center justify-center text-amber-400 font-mono text-sm">
                04
              </div>
              <h3 className="font-serif-editorial text-xl text-parchment-100">
                Seal the Follow-ups
              </h3>
              <p className="text-xs text-parchment-400 font-light leading-relaxed">
                Interactively record answers, measure preservation completeness scores, and continuously resolve knowledge deficits.
              </p>
            </div>

            {/* Step 5 */}
            <div className="p-6 bg-charcoal-900/80 border border-charcoal-800 rounded-sm space-y-3 relative group hover:border-amber-500/40 transition-colors">
              <div className="w-10 h-10 rounded-sm bg-charcoal-850 border border-charcoal-700 flex items-center justify-center text-amber-400 font-mono text-sm">
                05
              </div>
              <h3 className="font-serif-editorial text-xl text-parchment-100">
                Searchable Living Archive
              </h3>
              <p className="text-xs text-parchment-400 font-light leading-relaxed">
                A connected, searchable cultural repository preserved for future descendants, apprentices, and historians.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 3. FEATURED STORY SPOTLIGHT */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border border-charcoal-800 bg-charcoal-900/90 rounded-sm overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12">
          
          {/* Image */}
          <div className="lg:col-span-5 relative min-h-[360px] lg:min-h-full">
            <img
              src={featuredStory.heroImage}
              alt={featuredStory.title}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-transparent to-transparent lg:hidden" />
            <div className="absolute top-4 left-4">
              <span className="px-2.5 py-1 text-xs font-mono uppercase tracking-widest text-charcoal-950 bg-amber-400 font-semibold rounded-sm">
                Featured Heritage
              </span>
            </div>
          </div>

          {/* Details */}
          <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-xs font-mono text-amber-400/90 uppercase tracking-widest">
                <span>{featuredStory.category}</span>
                <span>•</span>
                <span>{featuredStory.location}</span>
              </div>

              <h2 className="font-serif-editorial text-3xl sm:text-4xl text-parchment-100 leading-tight">
                {featuredStory.title}
              </h2>

              <p className="text-sm sm:text-base text-parchment-300 font-light leading-relaxed">
                {featuredStory.summary}
              </p>

              {/* Storyteller attribution */}
              <div className="pt-2 flex items-center space-x-3 text-xs text-parchment-400">
                <span className="text-amber-300 font-medium">Source:</span>
                <span>{featuredStory.storyteller.name} ({featuredStory.storyteller.ageOrEra})</span>
              </div>

              {/* Gaps detected indicator */}
              <div className="pt-2 flex items-center space-x-4 text-xs font-mono">
                <span className="px-2.5 py-1 rounded bg-rose-950/60 border border-rose-500/40 text-rose-300">
                  {featuredStory.missingQuestions.filter(q => !q.answered).length} Gaps Pending Answer
                </span>
                <span className="text-parchment-400">
                  Preservation Score: {featuredStory.preservationScore}%
                </span>
              </div>
            </div>

            <div className="pt-6 border-t border-charcoal-800 flex flex-wrap items-center justify-between gap-4">
              <Link
                to={`/story/${featuredStory.id}`}
                className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest font-semibold text-amber-400 hover:text-amber-300 transition-colors"
              >
                <span>Read Full Archive Narrative</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to={`/missing-questions?storyId=${featuredStory.id}`}
                className="inline-flex items-center space-x-2 px-4 py-2 text-xs uppercase tracking-wider font-medium text-parchment-200 bg-charcoal-800 hover:bg-charcoal-750 border border-charcoal-700 rounded-sm"
              >
                <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
                <span>Explore Missing Questions</span>
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* 4. PRESERVATION CALL TO ACTION */}
      <section className="py-24 border-t border-charcoal-850 relative">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <span className="text-xs font-mono uppercase tracking-widest text-amber-400">
            Before the memory fades
          </span>
          <h2 className="font-serif-editorial text-3xl sm:text-5xl text-parchment-100 font-light leading-tight">
            Who in your life holds knowledge that exists in no book?
          </h2>
          <p className="text-parchment-300 font-light text-base max-w-xl mx-auto leading-relaxed">
            Record a grandmother’s unmeasured recipe, an uncle’s boatbuilding technique, or a disappearing neighborhood song before the chance slips away.
          </p>
          <div className="pt-4">
            <Link
              to="/capture"
              className="inline-flex items-center space-x-3 px-8 py-4 rounded-sm text-sm uppercase tracking-widest font-semibold text-charcoal-950 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 shadow-xl transition-all"
            >
              <span>Preserve a story right now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
