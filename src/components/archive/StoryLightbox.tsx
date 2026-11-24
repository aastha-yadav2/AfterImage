import React, { useEffect } from 'react';
import { Story } from '../../types';
import { X, HelpCircle, MapPin, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface StoryLightboxProps {
  story: Story | null;
  onClose: () => void;
}

/**
 * Section 8: Story Lightbox with Cinematic FLIP Expansion Transition
 * - Clean editorial layout over the visible 3D archive background
 * - Full resolution imagery, knowledge keeper, extracted entities, and unanswered questions
 * - Keyboard Escape, backdrop click, and close button support
 */
export const StoryLightbox: React.FC<StoryLightboxProps> = ({ story, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!story) return null;

  const unansweredQuestions = story.missingQuestions.filter(q => !q.answered);
  const answeredQuestions = story.missingQuestions.filter(q => q.answered);

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-[#050505]/92 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 lg:p-12 animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-5xl bg-[#0c0c0c] border border-charcoal-800 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] rounded-xs overflow-hidden my-auto max-h-[92vh] flex flex-col animate-scaleUp">
        
        {/* Top Floating Close Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-charcoal-800 bg-[#0c0c0c]/90 sticky top-0 z-20">
          <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-amber-400">
            <span>{story.category}</span>
            <span>&bull;</span>
            <span className="text-parchment-400">{story.location}</span>
          </div>

          <button
            onClick={onClose}
            className="flex items-center space-x-1.5 text-xs font-mono uppercase tracking-widest text-parchment-400 hover:text-amber-300 transition-colors p-1"
            aria-label="Close Story Viewer"
          >
            <span>Close</span>
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Story Editorial Content */}
        <div className="overflow-y-auto p-6 sm:p-10 space-y-8 scrollbar-thin">
          
          {/* Hero Archival Photograph */}
          <div className="relative aspect-[16/9] sm:aspect-[21/9] overflow-hidden rounded-xs border border-charcoal-800 shadow-2xl">
            <img
              src={story.heroImage}
              alt={story.title}
              onError={(e) => {
                const target = e.currentTarget;
                const fallback = 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1200&q=80';
                if (target.src !== fallback) {
                  target.src = fallback;
                }
              }}
              className="w-full h-full object-cover object-center brightness-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c] via-transparent to-transparent" />
            
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-parchment-300">
              <span className="flex items-center space-x-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>{story.location}</span>
              </span>
              <span className="text-amber-300 font-mono">{story.period}</span>
            </div>
          </div>

          {/* Title & Metadata */}
          <div className="space-y-3">
            <h2 className="font-serif text-3xl sm:text-5xl text-parchment-100 font-light leading-tight">
              {story.title}
            </h2>
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-parchment-400">
              <span>Knowledge Keeper: <strong className="text-parchment-100 font-medium">{story.storyteller.name}</strong> ({story.storyteller.ageOrEra})</span>
              <span>&bull;</span>
              <span>Recorded: {story.preservationDate}</span>
              <span>&bull;</span>
              <span className="text-emerald-400">Preservation Score: {story.preservationScore}%</span>
            </div>
          </div>

          {/* Narrative Content */}
          <div className="prose prose-invert max-w-none text-parchment-200 text-sm sm:text-base font-light leading-relaxed space-y-4 border-t border-charcoal-800 pt-6">
            <p className="font-serif text-lg sm:text-xl text-amber-200/90 italic font-normal">
              &ldquo;{story.summary}&rdquo;
            </p>
            {story.content.split('\n\n').map((paragraph, idx) => (
              <p key={idx} className="text-parchment-300 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Section 11: Signature Missing Questions Engine View */}
          <div className="p-6 sm:p-8 rounded-xs bg-[#050505] border border-amber-500/30 space-y-6">
            <div className="space-y-1">
              <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-amber-400">
                <HelpCircle className="w-4 h-4 text-rose-400" />
                <span>Missing Questions Engine</span>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl text-parchment-100 font-light">
                The story is preserved. But the knowledge isn&rsquo;t complete yet.
              </h3>
              <p className="text-xs font-sans text-parchment-400 font-light">
                Identified gaps that must be asked while the knowledge keeper is available:
              </p>
            </div>

            {/* Unanswered Gaps List */}
            <div className="space-y-3">
              {unansweredQuestions.map((q) => (
                <div 
                  key={q.id}
                  className="p-4 rounded-xs bg-[#0c0c0c] border border-charcoal-800 space-y-2 hover:border-amber-500/50 transition-colors"
                >
                  <div className="flex items-center justify-between text-[10px] font-mono text-parchment-500">
                    <span className="uppercase text-amber-400">{q.category}</span>
                    <span className="text-rose-400 uppercase tracking-widest">{q.importance} Priority</span>
                  </div>
                  <p className="font-serif text-base sm:text-lg text-parchment-100 italic leading-snug">
                    &ldquo;{q.question}&rdquo;
                  </p>
                  <p className="text-xs text-parchment-400 font-light">
                    <strong className="text-amber-300/80 font-mono text-[11px] block">Why this matters:</strong>
                    {q.whyItMatters}
                  </p>
                </div>
              ))}
            </div>

            {/* Answered Questions / Resolved Entities */}
            {answeredQuestions.length > 0 && (
              <div className="pt-4 border-t border-charcoal-800 space-y-2">
                <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Answered Knowledge Recovered:</span>
                </span>
                {answeredQuestions.map((q) => (
                  <div key={q.id} className="text-xs text-parchment-300 font-light pl-5 border-l border-emerald-500/30">
                    <strong className="text-parchment-100">{q.question}</strong>
                    <p className="text-emerald-300/90 italic mt-0.5">&ldquo;{q.answerText}&rdquo;</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Full Folio Link */}
          <div className="flex items-center justify-between pt-4 border-t border-charcoal-800 text-xs font-mono">
            <span className="text-parchment-500">Folio ID: {story.id}</span>
            <Link
              to={`/story/${story.id}`}
              onClick={onClose}
              className="inline-flex items-center space-x-1.5 text-amber-400 hover:text-amber-300 uppercase tracking-widest transition-colors"
            >
              <span>Open Detailed Study Folio</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
};
