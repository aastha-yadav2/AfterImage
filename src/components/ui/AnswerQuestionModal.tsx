import React, { useState } from 'react';
import { X, CheckCircle, User } from 'lucide-react';
import { MissingQuestion } from '../../types';
import { ImportanceBadge } from './Badge';

interface AnswerQuestionModalProps {
  question: MissingQuestion | null;
  storyTitle: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (questionId: string, answerText: string, answeredBy: string) => void;
}

export const AnswerQuestionModal: React.FC<AnswerQuestionModalProps> = ({
  question,
  storyTitle,
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [answerText, setAnswerText] = useState(question?.answerText || '');
  const [answeredBy, setAnsweredBy] = useState(question?.answeredBy || 'Archivist / Family Custodian');
  const [error, setError] = useState('');

  if (!isOpen || !question) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!answerText.trim()) {
      setError('Please provide the recorded testimony or answer.');
      return;
    }
    onSubmit(question.id, answerText.trim(), answeredBy.trim());
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-950/85 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-charcoal-900 border border-amber-500/30 rounded-sm shadow-2xl p-6 sm:p-8 overflow-hidden">
        
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-start justify-between pb-4 border-b border-charcoal-800">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-wider text-amber-400 mb-1">
              <span>Living Archive</span>
              <span>•</span>
              <span>{storyTitle}</span>
            </div>
            <h3 className="font-serif-editorial text-2xl text-parchment-100">
              Preserve Unanswered Knowledge
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-parchment-400 hover:text-parchment-100 hover:bg-charcoal-800 rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Question Details Box */}
        <div className="my-5 p-4 bg-charcoal-950/70 border border-charcoal-800 rounded-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-amber-400/90 uppercase tracking-widest">
              {question.category}
            </span>
            <ImportanceBadge importance={question.importance} />
          </div>

          <p className="font-serif-editorial text-lg text-parchment-100 italic leading-relaxed">
            &ldquo;{question.question}&rdquo;
          </p>

          <div className="pt-2 border-t border-charcoal-850 text-xs text-parchment-400">
            <strong className="text-parchment-300 font-medium">Why this gap matters: </strong>
            {question.whyItMatters}
          </div>

          {question.suggestedPromptForInterview && (
            <div className="p-2.5 bg-amber-950/30 border border-amber-600/20 rounded text-xs text-amber-200/90 italic">
              <strong className="not-italic text-amber-400 uppercase tracking-wider font-mono text-[10px] block mb-1">
                Suggested Interview Prompt for Storyteller:
              </strong>
              {question.suggestedPromptForInterview}
            </div>
          )}
        </div>

        {/* Answer Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-parchment-300 mb-1.5">
              The Preserved Answer / Storyteller's Account *
            </label>
            <textarea
              rows={4}
              value={answerText}
              onChange={(e) => {
                setAnswerText(e.target.value);
                if (error) setError('');
              }}
              placeholder="Record the exact words, measurements, sensory details, or memories provided by the storyteller..."
              className="w-full bg-charcoal-950 border border-charcoal-700 focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 rounded-sm px-3.5 py-2.5 text-sm text-parchment-100 placeholder:text-charcoal-500 font-sans leading-relaxed"
            />
            {error && <p className="text-xs text-rose-400 mt-1">{error}</p>}
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-parchment-300 mb-1.5 flex items-center space-x-1.5">
              <User className="w-3.5 h-3.5 text-amber-400" />
              <span>Answer Confirmed By / Source</span>
            </label>
            <input
              type="text"
              value={answeredBy}
              onChange={(e) => setAnsweredBy(e.target.value)}
              placeholder="e.g. Master Kazuo Sasaki (Elder), or Giulia Vizzini (Granddaughter)"
              className="w-full bg-charcoal-950 border border-charcoal-700 focus:border-amber-400 rounded-sm px-3.5 py-2 text-xs text-parchment-200 placeholder:text-charcoal-500 font-sans"
            />
          </div>

          {/* Actions */}
          <div className="pt-4 flex items-center justify-end space-x-3 border-t border-charcoal-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs uppercase tracking-wider text-parchment-400 hover:text-parchment-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center space-x-2 px-5 py-2 rounded-sm text-xs uppercase tracking-wider font-semibold text-charcoal-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-md transition-all"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Save & Seal Knowledge</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
