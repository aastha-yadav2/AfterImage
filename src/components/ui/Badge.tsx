import React from 'react';
import { QuestionImportance } from '../../types';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'amber' | 'charcoal' | 'parchment' | 'emerald' | 'crimson';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ 
  children, 
  variant = 'amber', 
  size = 'sm',
  className = ''
}) => {
  const variantStyles = {
    amber: 'bg-amber-950/60 text-amber-300 border-amber-600/40',
    charcoal: 'bg-charcoal-850 text-parchment-300 border-charcoal-700',
    parchment: 'bg-parchment-200/10 text-parchment-100 border-parchment-300/30',
    emerald: 'bg-emerald-950/50 text-emerald-300 border-emerald-600/40',
    crimson: 'bg-rose-950/50 text-rose-300 border-rose-600/40',
  };

  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5 tracking-wider uppercase',
    md: 'text-xs px-2.5 py-1 tracking-wider uppercase font-medium',
  };

  return (
    <span className={`inline-flex items-center rounded-sm border font-mono ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}>
      {children}
    </span>
  );
};

export const ImportanceBadge: React.FC<{ importance: QuestionImportance }> = ({ importance }) => {
  switch (importance) {
    case 'Urgent':
      return (
        <span className="inline-flex items-center space-x-1.5 px-2 py-0.5 rounded-sm bg-rose-950/60 border border-rose-500/40 text-rose-300 text-[11px] font-mono tracking-wider uppercase font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-ping"></span>
          <span>Urgent Gap</span>
        </span>
      );
    case 'High':
      return (
        <span className="inline-flex items-center space-x-1.5 px-2 py-0.5 rounded-sm bg-amber-950/60 border border-amber-500/40 text-amber-300 text-[11px] font-mono tracking-wider uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
          <span>High Priority</span>
        </span>
      );
    case 'Reflective':
      return (
        <span className="inline-flex items-center space-x-1.5 px-2 py-0.5 rounded-sm bg-charcoal-800 border border-charcoal-600 text-parchment-300 text-[11px] font-mono tracking-wider uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-parchment-400"></span>
          <span>Reflective Memory</span>
        </span>
      );
    default:
      return null;
  }
};
