import React from 'react';
import { Cpu, Cloud, AlertCircle, Loader2 } from 'lucide-react';
import { InferenceSource } from '../../types';

interface AIInferenceBadgeProps {
  source?: InferenceSource;
  isAnalyzing?: boolean;
  modelUsed?: string;
  latencyMs?: number;
  className?: string;
  showDetails?: boolean;
}

export const AIInferenceBadge: React.FC<AIInferenceBadgeProps> = ({
  source,
  isAnalyzing,
  modelUsed,
  latencyMs,
  className = '',
  showDetails = false,
}) => {
  if (isAnalyzing) {
    return (
      <span className={`inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-sm bg-amber-950/60 border border-amber-500/40 text-amber-300 text-xs font-mono ${className}`}>
        <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-400" />
        <span>Analyzing with Hybrid AI...</span>
      </span>
    );
  }

  if (!source) {
    return (
      <span className={`inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-sm bg-charcoal-850 border border-charcoal-700 text-parchment-400 text-xs font-mono ${className}`}>
        <span className="w-1.5 h-1.5 rounded-full bg-charcoal-500"></span>
        <span>Awaiting Analysis</span>
      </span>
    );
  }

  if (source === 'ON_DEVICE') {
    return (
      <div className={`inline-flex items-center space-x-2 ${className}`}>
        <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-sm bg-emerald-950/70 border border-emerald-500/50 text-emerald-300 text-xs font-mono font-medium shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <Cpu className="w-3.5 h-3.5 text-emerald-400" />
          <span>Processed on your device</span>
        </span>
        {showDetails && (
          <span className="text-[11px] font-mono text-parchment-400">
            {modelUsed ? `${modelUsed}` : 'Gemini Nano'} {latencyMs ? `(${latencyMs}ms)` : ''}
          </span>
        )}
      </div>
    );
  }

  if (source === 'IN_CLOUD') {
    return (
      <div className={`inline-flex items-center space-x-2 ${className}`}>
        <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-sm bg-amber-950/70 border border-amber-500/50 text-amber-300 text-xs font-mono font-medium shadow-sm">
          <span className="w-2 h-2 rounded-full bg-amber-400"></span>
          <Cloud className="w-3.5 h-3.5 text-amber-400" />
          <span>Processed using cloud AI</span>
        </span>
        {showDetails && (
          <span className="text-[11px] font-mono text-parchment-400">
            {modelUsed ? `${modelUsed}` : 'Firebase AI Logic'} {latencyMs ? `(${latencyMs}ms)` : ''}
          </span>
        )}
      </div>
    );
  }

  // Fallback state
  return (
    <div className={`inline-flex items-center space-x-2 ${className}`}>
      <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-sm bg-charcoal-850 border border-charcoal-700 text-parchment-300 text-xs font-mono">
        <AlertCircle className="w-3.5 h-3.5 text-amber-400/80" />
        <span>Basic offline analysis — AI was not available.</span>
      </span>
      {showDetails && latencyMs && (
        <span className="text-[11px] font-mono text-parchment-500">
          ({latencyMs}ms)
        </span>
      )}
    </div>
  );
};
