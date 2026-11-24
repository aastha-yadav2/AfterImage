import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  HelpCircle, 
  Compass, 
  Sparkles, 
  MapPin, 
  Layers,
  X
} from 'lucide-react';
import { useArchive } from '../context/ArchiveContext';
import { SpatialArchiveSphere } from '../components/archive/SpatialArchiveSphere';

export const LandingPage: React.FC = () => {
  const { stories, stats } = useArchive();

  // Cinematic Prologue state (short, elegant, skippable)
  const [showPrologue, setShowPrologue] = useState(() => {
    // Show only once per browser session
    try {
      return !sessionStorage.getItem('afterimage_intro_viewed');
    } catch {
      return true;
    }
  });

  const [prologueStep, setPrologueStep] = useState(0);

  useEffect(() => {
    if (!showPrologue) return;

    const timer1 = setTimeout(() => setPrologueStep(1), 700);
    const timer2 = setTimeout(() => setPrologueStep(2), 2200);
    const timer3 = setTimeout(() => {
      dismissPrologue();
    }, 4500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [showPrologue]);

  const dismissPrologue = () => {
    setShowPrologue(false);
    try {
      sessionStorage.setItem('afterimage_intro_viewed', 'true');
    } catch {}
  };

  return (
    <div className="relative min-h-screen bg-charcoal-950 text-parchment-200 overflow-hidden">
      
      {/* 0. CINEMATIC PROLOGUE INTRO SEQUENCE (Dismissible / 3s max) */}
      {showPrologue && (
        <div className="fixed inset-0 z-50 bg-[#050505] flex flex-col items-center justify-center p-6 text-center select-none transition-opacity duration-1000">
          {/* Skip CTA */}
          <button
            onClick={dismissPrologue}
            className="absolute top-8 right-8 text-xs font-mono uppercase tracking-widest text-parchment-500 hover:text-amber-300 transition-colors flex items-center space-x-1.5"
          >
            <span>Skip Prologue</span>
            <X className="w-3.5 h-3.5" />
          </button>

          <div className="max-w-2xl space-y-6">
            {/* Step 0 & 1: Wordmark emerges from obsidian void */}
            <div className={`transition-all duration-1000 ${prologueStep >= 0 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
              <span className="font-serif-editorial text-4xl sm:text-6xl tracking-[0.25em] text-parchment-100 font-light uppercase block">
                AFTERIMAGE
              </span>
              <span className="text-xs font-mono tracking-[0.35em] text-amber-400 uppercase mt-2 block">
                Living Digital Archive
              </span>
            </div>

            {/* Step 2: The Core Premise */}
            <div className={`transition-all duration-1000 delay-300 ${prologueStep >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <p className="font-serif-editorial text-xl sm:text-3xl text-parchment-200 font-light italic leading-snug">
                &ldquo;Some things disappear before we realize they mattered.&rdquo;
              </p>
            </div>

            {/* Enter CTA */}
            <div className={`pt-6 transition-all duration-700 ${prologueStep >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
              <button
                onClick={dismissPrologue}
                className="inline-flex items-center space-x-2.5 px-6 py-2.5 rounded-sm text-xs uppercase tracking-widest font-semibold text-charcoal-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 transition-all shadow-md shadow-amber-950/60"
              >
                <span>Enter Archive</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Background ambient warmth and grain */}
      <div className="absolute inset-0 bg-grain-overlay pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[1100px] h-[550px] bg-amber-600/5 rounded-full blur-[160px] pointer-events-none" />

      {/* 1. CINEMATIC HERO SECTION */}
      <section className="relative pt-16 pb-20 lg:pt-28 lg:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          
          {/* Subtle archival badge */}
          <div className="inline-flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full border border-amber-500/30 bg-charcoal-900/90 text-xs font-mono tracking-widest uppercase text-amber-300 shadow-sm backdrop-blur-sm animate-fadeIn">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span>The Living Heritage Archive</span>
          </div>

          {/* Editorial Headline */}
          <h1 className="font-serif-editorial text-4xl sm:text-6xl lg:text-7xl font-light text-parchment-100 leading-[1.08] tracking-tight">
            Some things disappear <br className="hidden sm:inline" />
            <span className="italic font-normal text-amber-200/90">before we realize they mattered.</span>
          </h1>

          {/* Subheading */}
          <p className="font-sans text-base sm:text-xl lg:text-2xl text-parchment-300 font-light max-w-2xl mx-auto leading-relaxed">
            A living archive for the fragile, unwritten, and sensory knowledge of humankind.
          </p>

          {/* Primary & Secondary CTAs */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <Link
              to="/archive"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-3 px-8 py-4 rounded-sm text-xs sm:text-sm uppercase tracking-widest font-semibold text-charcoal-950 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 transition-all duration-300 shadow-xl shadow-amber-950/60 border border-amber-300/40 group"
            >
              <span>Enter the Archive</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 duration-200" />
            </Link>

            <Link
              to="/capture"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 px-8 py-4 rounded-sm text-xs sm:text-sm uppercase tracking-widest font-medium text-parchment-200 bg-charcoal-900/80 hover:bg-charcoal-850 border border-charcoal-700/80 hover:border-amber-500/40 transition-all duration-300"
            >
              <Compass className="w-4 h-4 text-amber-400" />
              <span>Begin Preserving</span>
            </Link>
          </div>

          {/* Real-time preservation metrics ticker */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-y-2 gap-x-8 text-xs font-mono text-parchment-500">
            <span className="flex items-center space-x-1.5">
              <span className="text-amber-400">●</span>
              <span>{stats.totalStories} Living Memories Preserved</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <span className="text-rose-400">●</span>
              <span>{stats.unansweredQuestions} Questions Awaiting Storytellers</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <span className="text-emerald-400">●</span>
              <span>Hybrid AI Logic Verified</span>
            </span>
          </div>
        </div>

        {/* 2. INTERACTIVE 3D SPATIAL MEMORY SPHERE (Centerpiece of the visual redesign) */}
        <div className="mt-12 sm:mt-16 rounded-sm border border-charcoal-800 bg-charcoal-900/40 shadow-2xl overflow-hidden relative">
          <div className="p-4 sm:p-6 border-b border-charcoal-850 flex flex-wrap items-center justify-between gap-3 bg-charcoal-900/80">
            <div className="flex items-center space-x-2">
              <Layers className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-mono uppercase tracking-widest text-parchment-100 font-semibold">
                Spatial Memory Sphere
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">
                Interactive 3D
              </span>
            </div>
            <Link
              to="/archive"
              className="text-xs font-mono text-amber-400 hover:text-amber-300 flex items-center space-x-1 transition-colors"
            >
              <span>Open Exhibition View</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* The 3D Sphere Component */}
          <SpatialArchiveSphere stories={stories} />
        </div>
      </section>

      {/* 3. SIGNATURE HIGHLIGHT: THE MISSING QUESTIONS ENGINE */}
      <section className="relative py-20 bg-charcoal-900/60 border-t border-b border-charcoal-850 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-amber-400">
              <HelpCircle className="w-4 h-4 text-rose-400 animate-pulse" />
              <span>Core Technological Differentiator</span>
            </div>

            <h2 className="font-serif-editorial text-3xl sm:text-5xl text-parchment-100 font-light leading-tight">
              AI that doesn&rsquo;t just summarize. <br />
              <span className="italic font-normal text-amber-200">It asks what was forgotten.</span>
            </h2>

            <p className="font-sans text-sm sm:text-base text-parchment-300 font-light leading-relaxed">
              When an elder passes or a tradition fades, it is rarely the broad facts that are lost—it is the subtle calibrations: the smell of the vat, the angle of the mallet, the unwritten songs that timed the fermentation.
            </p>

            <p className="font-sans text-sm sm:text-base text-parchment-300 font-light leading-relaxed">
              AFTERIMAGE&rsquo;s <strong>Missing Questions Engine</strong> analyzes each captured narrative, extracts structural knowledge entities, identifies critical knowledge gaps, and formulates urgent follow-up interview guides while the source is still here.
            </p>

            <div className="pt-2">
              <Link
                to="/missing-questions"
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-sm text-xs uppercase tracking-widest font-semibold text-parchment-100 bg-charcoal-850 hover:bg-charcoal-800 border border-amber-500/40 hover:border-amber-400 transition-all shadow-sm group"
              >
                <span>Launch Missing Questions Engine</span>
                <ArrowRight className="w-4 h-4 text-amber-400 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Visual Sample Card of an Identified Gap */}
          <div className="lg:col-span-6">
            <div className="p-6 sm:p-8 rounded-sm bg-charcoal-900 border border-amber-500/30 shadow-antique space-y-6 relative overflow-hidden">
              <div className="flex items-center justify-between pb-3 border-b border-charcoal-800">
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400">
                  Case Study • Tokushima Indigo
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/40 font-semibold">
                  Urgent Gap Identified
                </span>
              </div>

              <div className="space-y-3">
                <span className="text-xs font-mono uppercase tracking-widest text-parchment-400 block">
                  Unanswered Question:
                </span>
                <p className="font-serif-editorial text-xl sm:text-2xl text-parchment-100 italic leading-snug">
                  &ldquo;Which specific native hardwood species are burned for the lye, and in what season must the wood be felled?&rdquo;
                </p>
              </div>

              <div className="p-4 bg-charcoal-950 rounded border border-charcoal-800 space-y-2 text-xs">
                <span className="text-amber-300 font-mono text-[11px] uppercase tracking-wider block font-semibold">
                  Why it matters before knowledge holder is unavailable:
                </span>
                <p className="text-parchment-300 font-light leading-relaxed">
                  Different trees alter the pH balance; modern ash causes vat spoilage within two weeks. Master Sasaki is 88 years old and his apprentices must record this botanical taxonomy.
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 text-[11px] font-mono text-parchment-400">
                <span>Knowledge Keeper: Kazuo Sasaki (88)</span>
                <span className="text-emerald-400">Status: Active Interview Guide</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 4. FEATURED ARCHIVAL MEMORY EXHIBITION */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 border-b border-charcoal-800 pb-6">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-amber-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Living Exhibition</span>
            </div>
            <h2 className="font-serif-editorial text-3xl sm:text-5xl text-parchment-100 font-light mt-1">
              Curated Heritage Narratives
            </h2>
          </div>
          <Link
            to="/archive"
            className="text-xs font-mono text-amber-400 hover:text-amber-300 flex items-center space-x-1.5 transition-colors"
          >
            <span>View all {stats.totalStories} stories</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Story Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stories.slice(0, 3).map((story) => {
            const unanswered = story.missingQuestions.filter(q => !q.answered).length;
            return (
              <Link
                key={story.id}
                to={`/story/${story.id}`}
                className="group relative rounded-sm overflow-hidden bg-charcoal-900 border border-charcoal-800 hover:border-amber-500/60 transition-all duration-300 flex flex-col shadow-card-dark"
              >
                {/* Hero Image */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={story.heroImage}
                    alt={story.title}
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
                      <span>{unanswered} Gaps</span>
                    </div>
                  )}
                </div>

                {/* Content */}
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
                      <span>Enter</span>
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 5. CUSTODIAN INVITATION CTA */}
      <section className="py-24 bg-gradient-to-b from-charcoal-900 to-charcoal-950 border-t border-charcoal-850 px-4 sm:px-6 lg:px-8 text-center relative">
        <div className="max-w-3xl mx-auto space-y-6">
          <span className="text-xs font-mono uppercase tracking-widest text-amber-400 block">
            Preserve Before It Is Lost
          </span>
          <h2 className="font-serif-editorial text-3xl sm:text-5xl text-parchment-100 font-light leading-tight">
            Do you know a craft, a recipe, or a memory the world is about to forget?
          </h2>
          <p className="text-sm sm:text-base text-parchment-300 font-light leading-relaxed max-w-xl mx-auto">
            Document your grandparents&rsquo; unwritten technique, an endangered village dialect, or a culinary tradition. Our hybrid engine will help you formulate the questions that matter.
          </p>
          <div className="pt-4">
            <Link
              to="/capture"
              className="inline-flex items-center space-x-3 px-8 py-4 rounded-sm text-xs sm:text-sm uppercase tracking-widest font-semibold text-charcoal-950 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 transition-all shadow-xl shadow-amber-950/60 border border-amber-300/40 group"
            >
              <span>Begin Preserving a Memory</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};
