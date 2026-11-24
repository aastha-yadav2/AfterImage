import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ShieldCheck } from 'lucide-react';
import { useArchive } from '../../context/ArchiveContext';

export const Footer: React.FC = () => {
  const { stats } = useArchive();

  return (
    <footer className="border-t border-charcoal-850 bg-charcoal-950 text-parchment-400 pt-16 pb-12 relative overflow-hidden">
      {/* Subtle ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-b from-amber-500/5 to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-charcoal-850">
          
          {/* Col 1: Brand & Philosophy */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-sm border border-amber-500/40 bg-charcoal-900 flex items-center justify-center text-amber-400">
                <span className="font-serif-editorial text-xl italic">A</span>
              </div>
              <span className="font-serif-editorial text-2xl tracking-[0.16em] uppercase text-parchment-100">
                Afterimage
              </span>
            </div>
            
            <p className="text-sm font-light text-parchment-300 max-w-lg leading-relaxed">
              &ldquo;Some things disappear before we realize they mattered.&rdquo; 
              AFTERIMAGE is a living archive for the fragile, unwritten, and sensory knowledge of humankind — 
              actively uncovering unanswered questions before the voices that hold them fall silent.
            </p>

            <div className="pt-2 flex items-center space-x-6 text-xs text-parchment-500">
              <span className="flex items-center space-x-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-400/80" />
                <span>Local-First Sovereign Storage</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <Sparkles className="w-4 h-4 text-amber-400/80" />
                <span>#BuildHybridAI 2026</span>
              </span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-parchment-200">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/" className="hover:text-amber-300 transition-colors">
                  Archival Frontispiece
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-amber-300 transition-colors">
                  Living Dashboard
                </Link>
              </li>
              <li>
                <Link to="/archive" className="hover:text-amber-300 transition-colors">
                  Explore The Collection
                </Link>
              </li>
              <li>
                <Link to="/missing-questions" className="hover:text-amber-300 transition-colors">
                  Missing Questions Engine
                </Link>
              </li>
              <li>
                <Link to="/capture" className="hover:text-amber-300 transition-colors">
                  Preserve New Story
                </Link>
              </li>
              <li>
                <Link to="/settings" className="hover:text-amber-300 transition-colors">
                  Hybrid AI Architecture & Privacy
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Live Archive Metrics */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-parchment-200">
              Preservation Vitals
            </h4>
            <div className="p-3.5 bg-charcoal-900/80 rounded border border-charcoal-800 space-y-2 text-xs">
              <div className="flex justify-between items-center text-parchment-300">
                <span>Stories Preserved:</span>
                <span className="font-mono text-amber-300 font-semibold">{stats.totalStories}</span>
              </div>
              <div className="flex justify-between items-center text-parchment-300">
                <span>Knowledge Entities:</span>
                <span className="font-mono text-amber-300">{stats.totalKnowledgeExtracted}</span>
              </div>
              <div className="flex justify-between items-center text-parchment-300">
                <span>Gaps Unanswered:</span>
                <span className="font-mono text-amber-400/90">{stats.unansweredQuestions}</span>
              </div>
              <div className="pt-1.5 border-t border-charcoal-800 flex justify-between items-center text-[11px] text-parchment-400">
                <span>Preservation Index:</span>
                <span className="font-mono text-emerald-400 font-medium">{stats.preservationCompleteness}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright & attribution */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-parchment-500 space-y-3 sm:space-y-0">
          <div>
            AFTERIMAGE &copy; 2026. Built with reverence for the unwritten past.
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-[11px] font-mono text-amber-400/70 border border-amber-500/20 px-2 py-0.5 rounded">
              Firebase Hybrid AI Ready Architecture
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
