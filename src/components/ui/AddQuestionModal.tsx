import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { MissingQuestion, QuestionCategory, QuestionImportance } from '../../types';

interface AddQuestionModalProps {
  storyId: string;
  storyTitle: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (questionData: Omit<MissingQuestion, 'id' | 'storyId' | 'answered'>) => void;
}

export const AddQuestionModal: React.FC<AddQuestionModalProps> = ({
  storyTitle,
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [question, setQuestion] = useState('');
  const [whyItMatters, setWhyItMatters] = useState('');
  const [category, setCategory] = useState<QuestionCategory>('Technique Detail');
  const [importance, setImportance] = useState<QuestionImportance>('High');
  const [suggestedPrompt, setSuggestedPrompt] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) {
      setError('Please provide the question to ask.');
      return;
    }
    if (!whyItMatters.trim()) {
      setError('Please specify why this gap in knowledge matters.');
      return;
    }

    onSubmit({
      question: question.trim(),
      whyItMatters: whyItMatters.trim(),
      category,
      importance,
      suggestedPromptForInterview: suggestedPrompt.trim() || undefined,
    });

    // Reset and close
    setQuestion('');
    setWhyItMatters('');
    setSuggestedPrompt('');
    setError('');
    onClose();
  };

  const categories: QuestionCategory[] = [
    'Technique Detail',
    'Material Source',
    'Lost Step',
    'Cultural Origin',
    'Personal Memory',
    'Historical Context',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-950/85 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-xl bg-charcoal-900 border border-charcoal-700 rounded-sm shadow-2xl p-6 sm:p-8">
        
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-charcoal-800">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-amber-400">
              Custom Knowledge Gap
            </span>
            <h3 className="font-serif-editorial text-2xl text-parchment-100 mt-0.5">
              Add Follow-up Question
            </h3>
            <p className="text-xs text-parchment-400 mt-1">
              Adding to story: <span className="text-amber-300">{storyTitle}</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-parchment-400 hover:text-parchment-100 hover:bg-charcoal-800 rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          {/* Question Text */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-parchment-300 mb-1">
              The Question to Ask the Storyteller *
            </label>
            <textarea
              rows={2}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="e.g. What type of wood or stone was used for the hearth floor to withstand direct ember heat?"
              className="w-full bg-charcoal-950 border border-charcoal-700 focus:border-amber-400 rounded-sm px-3.5 py-2 text-sm text-parchment-100 placeholder:text-charcoal-500"
            />
          </div>

          {/* Category & Importance */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-parchment-300 mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as QuestionCategory)}
                className="w-full bg-charcoal-950 border border-charcoal-700 focus:border-amber-400 rounded-sm px-3 py-2 text-xs text-parchment-200"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-parchment-300 mb-1">
                Urgency / Importance
              </label>
              <select
                value={importance}
                onChange={(e) => setImportance(e.target.value as QuestionImportance)}
                className="w-full bg-charcoal-950 border border-charcoal-700 focus:border-amber-400 rounded-sm px-3 py-2 text-xs text-parchment-200"
              >
                <option value="Urgent">Urgent Gap (Elderly source / Critical technique)</option>
                <option value="High">High Priority (Necessary to replicate)</option>
                <option value="Reflective">Reflective Memory (Cultural & emotional)</option>
              </select>
            </div>
          </div>

          {/* Why It Matters */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-parchment-300 mb-1">
              Why This Gap Matters *
            </label>
            <input
              type="text"
              value={whyItMatters}
              onChange={(e) => setWhyItMatters(e.target.value)}
              placeholder="e.g. Modern stones shatter under heat; the exact quarry source is unrecorded."
              className="w-full bg-charcoal-950 border border-charcoal-700 focus:border-amber-400 rounded-sm px-3.5 py-2 text-xs text-parchment-200 placeholder:text-charcoal-500"
            />
          </div>

          {/* Suggested Prompt */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-parchment-300 mb-1">
              Suggested Conversational Prompt (Optional)
            </label>
            <input
              type="text"
              value={suggestedPrompt}
              onChange={(e) => setSuggestedPrompt(e.target.value)}
              placeholder='e.g. "Do you remember which hillside your father walked to when finding the hearth stone?"'
              className="w-full bg-charcoal-950 border border-charcoal-700 focus:border-amber-400 rounded-sm px-3.5 py-2 text-xs text-parchment-200 placeholder:text-charcoal-500 italic"
            />
          </div>

          {error && <p className="text-xs text-rose-400">{error}</p>}

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
              className="inline-flex items-center space-x-2 px-5 py-2 rounded-sm text-xs uppercase tracking-wider font-semibold text-charcoal-950 bg-amber-400 hover:bg-amber-300 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add Question to Gap Engine</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
