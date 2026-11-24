import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  HelpCircle, 
  CheckCircle2, 
  Circle, 
  Plus, 
  Download, 
  Printer, 
  ArrowRight, 
  User, 
  AlertTriangle,
  Check,
  RefreshCw
} from 'lucide-react';
import { useArchive } from '../context/ArchiveContext';
import { MissingQuestion, QuestionImportance } from '../types';
import { ImportanceBadge, Badge } from '../components/ui/Badge';
import { AnswerQuestionModal } from '../components/ui/AnswerQuestionModal';
import { AddQuestionModal } from '../components/ui/AddQuestionModal';
import { AIInferenceBadge } from '../components/ui/AIInferenceBadge';

export const MissingQuestionsEnginePage: React.FC = () => {
  const { stories, markQuestionAnswered, toggleQuestionStatus, addCustomQuestion, reanalyzeStory, isAnalyzing } = useArchive();
  const [searchParams, setSearchParams] = useSearchParams();
  const [reanalyzeMsg, setReanalyzeMsg] = useState<string | null>(null);

  // Active selected story
  const requestedStoryId = searchParams.get('storyId');
  const selectedStory = useMemo(() => {
    if (requestedStoryId) {
      const found = stories.find(s => s.id === requestedStoryId);
      if (found) return found;
    }
    return stories[0];
  }, [stories, requestedStoryId]);

  // Filters
  const [filterImportance, setFilterImportance] = useState<QuestionImportance | 'All'>('All');
  const [filterStatus, setFilterStatus] = useState<'all' | 'unanswered' | 'answered'>('all');

  // Modals state
  const [answeringQuestion, setAnsweringQuestion] = useState<MissingQuestion | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [showFieldGuideModal, setShowFieldGuideModal] = useState(false);

  // Filtered questions
  const questions = useMemo(() => {
    if (!selectedStory) return [];
    return selectedStory.missingQuestions.filter(q => {
      if (filterImportance !== 'All' && q.importance !== filterImportance) return false;
      if (filterStatus === 'unanswered' && q.answered) return false;
      if (filterStatus === 'answered' && !q.answered) return false;
      return true;
    });
  }, [selectedStory, filterImportance, filterStatus]);

  const unansweredCount = selectedStory?.missingQuestions.filter(q => !q.answered).length || 0;
  const answeredCount = selectedStory?.missingQuestions.filter(q => q.answered).length || 0;
  const totalCount = selectedStory?.missingQuestions.length || 0;
  const completenessPercent = totalCount === 0 ? 100 : Math.round((answeredCount / totalCount) * 100);

  const handleStorySelect = (storyId: string) => {
    setSearchParams({ storyId });
  };

  return (
    <div className="min-h-screen bg-charcoal-950 pb-28 text-parchment-200">
      
      {/* 1. Header / Engine Masthead */}
      <section className="border-b border-charcoal-850 bg-gradient-to-b from-charcoal-900/90 to-charcoal-950 pt-10 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-3">
          <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-amber-400">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
            <span>Core Differentiator</span>
            <span>•</span>
            <span>Knowledge Gap Discovery</span>
          </div>
          <h1 className="font-serif-editorial text-3xl sm:text-5xl text-parchment-100 font-light">
            The Missing Questions Engine
          </h1>
          <p className="text-sm sm:text-base text-parchment-300 font-light max-w-2xl leading-relaxed">
            The questions you forget to ask will disappear with the storyteller. AFTERIMAGE analyzes recorded narratives to reveal critical technical ambiguities, unmeasured variables, and cultural origins before it is too late.
          </p>

          {/* Story Selector Bar */}
          <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <span className="text-xs font-mono uppercase tracking-wider text-parchment-400">
                Examining Story:
              </span>
              <select
                value={selectedStory?.id || ''}
                onChange={(e) => handleStorySelect(e.target.value)}
                className="bg-charcoal-900 border border-charcoal-700 text-parchment-100 text-xs font-mono rounded px-3 py-2 focus:border-amber-400 focus:outline-none"
              >
                {stories.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.title} ({s.missingQuestions.filter(q => !q.answered).length} gaps pending)
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-sm text-xs font-mono uppercase tracking-wider bg-charcoal-850 hover:bg-charcoal-800 border border-charcoal-700 text-parchment-200 transition-colors"
              >
                <Plus className="w-3.5 h-3.5 text-amber-400" />
                <span>Add Custom Question</span>
              </button>

              <button
                onClick={() => setShowFieldGuideModal(true)}
                className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-sm text-xs font-mono uppercase tracking-wider bg-amber-950/40 hover:bg-amber-950/70 border border-amber-600/30 text-amber-300 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Interview Field Guide</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Engine Interface */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        
        {/* Story Context Banner */}
        {selectedStory && (
          <div className="p-6 bg-charcoal-900 border border-charcoal-800 rounded-sm mb-10 shadow-card-dark">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              
              <div className="lg:col-span-8 space-y-3">
                <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono text-amber-400 uppercase tracking-widest">
                  <Badge variant="amber">{selectedStory.category}</Badge>
                  <span>•</span>
                  <span>{selectedStory.location}</span>
                  <span className="text-charcoal-600">•</span>
                  <AIInferenceBadge source={selectedStory.inferenceSource || 'IN_CLOUD'} />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h2 className="font-serif-editorial text-2xl sm:text-3xl text-parchment-100 font-medium">
                    {selectedStory.title}
                  </h2>
                  <button
                    onClick={async () => {
                      if (!selectedStory) return;
                      try {
                        const { meta } = await reanalyzeStory(selectedStory.id);
                        setReanalyzeMsg(`Re-analyzed via ${meta.sourceLabel} (${meta.latencyMs}ms)`);
                        setTimeout(() => setReanalyzeMsg(null), 4000);
                      } catch (err: any) {
                        setReanalyzeMsg(`Notice: ${err?.message || 'Failed'}`);
                        setTimeout(() => setReanalyzeMsg(null), 4000);
                      }
                    }}
                    disabled={isAnalyzing}
                    className="self-start sm:self-auto inline-flex items-center space-x-1.5 px-3 py-1 text-xs font-mono rounded bg-charcoal-850 hover:bg-charcoal-800 border border-charcoal-700 text-parchment-300 hover:text-amber-300 transition-colors disabled:opacity-50"
                  >
                    <RefreshCw className={`w-3 h-3 ${isAnalyzing ? 'animate-spin text-amber-400' : 'text-amber-400'}`} />
                    <span>{isAnalyzing ? 'Analyzing...' : 'Re-run AI Gap Engine'}</span>
                  </button>
                </div>

                {reanalyzeMsg && (
                  <p className="text-xs font-mono text-amber-300 animate-fadeIn">
                    {reanalyzeMsg}
                  </p>
                )}

                <p className="text-xs text-parchment-400 font-light leading-relaxed max-w-3xl line-clamp-2">
                  {selectedStory.summary}
                </p>

                {selectedStory.nextBestQuestion && (
                  <div className="p-3 rounded bg-amber-950/20 border border-amber-600/30 text-xs text-amber-200/90 space-y-1">
                    <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider block font-semibold">
                      AI Priority Recommendation for Next Elder Interview:
                    </span>
                    <p className="font-serif-editorial text-sm text-parchment-100 italic">
                      &ldquo;{selectedStory.nextBestQuestion}&rdquo;
                    </p>
                  </div>
                )}

                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-parchment-400 pt-1">
                  <span className="flex items-center space-x-1 text-parchment-300">
                    <User className="w-3.5 h-3.5 text-amber-400" />
                    <span>Source: {selectedStory.storyteller.name} ({selectedStory.storyteller.ageOrEra})</span>
                  </span>
                  <span>•</span>
                  <span>Preserved: {selectedStory.preservationDate}</span>
                </div>
              </div>

              {/* Preservation Completeness Progress Gauge */}
              <div className="lg:col-span-4 p-4 bg-charcoal-950/80 rounded border border-charcoal-800 space-y-2">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-parchment-300 uppercase tracking-wider">Gap Resolution Index</span>
                  <span className="text-amber-300 font-semibold">{completenessPercent}%</span>
                </div>
                
                {/* Progress bar */}
                <div className="w-full bg-charcoal-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 transition-all duration-500"
                    style={{ width: `${completenessPercent}%` }}
                  />
                </div>

                <div className="flex justify-between text-[11px] font-mono text-parchment-400 pt-1">
                  <span>{answeredCount} of {totalCount} Gaps Resolved</span>
                  <span className="text-rose-300">{unansweredCount} Urgent Follow-ups</span>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* The Comparative Deep Dive: "What We Already Know" vs "The Gaps" */}
        {selectedStory && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            
            {/* Panel A: What We Already Know */}
            <div className="p-6 bg-charcoal-900/70 border border-charcoal-800 rounded-sm space-y-4">
              <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-emerald-400 pb-2 border-b border-charcoal-800">
                <CheckCircle2 className="w-4 h-4" />
                <span>What We Already Know (Extracted)</span>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="font-mono text-[10px] text-parchment-400 uppercase tracking-wider block mb-1">
                    Documented Materials:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedStory.extractedKnowledge.materials.map((m, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-charcoal-950 border border-charcoal-800 text-parchment-200 font-mono">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="font-mono text-[10px] text-parchment-400 uppercase tracking-wider block mb-1">
                    Recorded Techniques:
                  </span>
                  <ul className="space-y-1 text-parchment-300">
                    {selectedStory.extractedKnowledge.techniques.map((t, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <span className="text-emerald-400">✓</span>
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Panel B: Missing Knowledge / Identified Gaps */}
            <div className="p-6 bg-charcoal-900/70 border border-rose-950/60 rounded-sm space-y-4">
              <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-rose-300 pb-2 border-b border-charcoal-800">
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                <span>Fragile Knowledge At Risk</span>
              </div>

              <p className="text-xs text-parchment-300 font-light leading-relaxed">
                The narrative omits failure recovery thresholds, sensory calibration (tongue/smell tests), and seasonal gathering cycles. If unrecorded, an apprentice trying to replicate this craft in 2040 will experience frequent batch spoilage.
              </p>

              <div className="p-3 bg-rose-950/20 border border-rose-500/20 rounded text-xs text-rose-200/90 font-mono space-y-1">
                <div className="flex justify-between">
                  <span>Pending urgent questions:</span>
                  <span className="font-bold text-rose-300">{unansweredCount} questions</span>
                </div>
                <div className="flex justify-between">
                  <span>Custodian age:</span>
                  <span className="text-parchment-300">{selectedStory.storyteller.ageOrEra || 'Senior Elder'}</span>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* Filter Controls Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-charcoal-800">
          
          {/* Status Tabs */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-3 py-1.5 text-xs font-mono rounded-sm transition-colors ${
                filterStatus === 'all'
                  ? 'bg-amber-400 text-charcoal-950 font-semibold'
                  : 'text-parchment-400 hover:text-parchment-200 bg-charcoal-900'
              }`}
            >
              All Questions ({totalCount})
            </button>
            <button
              onClick={() => setFilterStatus('unanswered')}
              className={`px-3 py-1.5 text-xs font-mono rounded-sm transition-colors ${
                filterStatus === 'unanswered'
                  ? 'bg-rose-500 text-charcoal-950 font-semibold'
                  : 'text-parchment-400 hover:text-parchment-200 bg-charcoal-900'
              }`}
            >
              Unanswered ({unansweredCount})
            </button>
            <button
              onClick={() => setFilterStatus('answered')}
              className={`px-3 py-1.5 text-xs font-mono rounded-sm transition-colors ${
                filterStatus === 'answered'
                  ? 'bg-emerald-500 text-charcoal-950 font-semibold'
                  : 'text-parchment-400 hover:text-parchment-200 bg-charcoal-900'
              }`}
            >
              Resolved ({answeredCount})
            </button>
          </div>

          {/* Importance Filter */}
          <div className="flex items-center space-x-2">
            <span className="text-xs font-mono uppercase tracking-wider text-parchment-500">
              Urgency:
            </span>
            <select
              value={filterImportance}
              onChange={(e) => setFilterImportance(e.target.value as any)}
              className="bg-charcoal-900 border border-charcoal-700 text-parchment-200 text-xs font-mono rounded px-2.5 py-1.5"
            >
              <option value="All">All Importance Levels</option>
              <option value="Urgent">Urgent Gap Only</option>
              <option value="High">High Priority Only</option>
              <option value="Reflective">Reflective Memory Only</option>
            </select>
          </div>

        </div>

        {/* Questions Feed / Grid */}
        <div className="mt-8 space-y-6">
          {questions.length === 0 ? (
            <div className="p-12 text-center bg-charcoal-900/60 rounded border border-charcoal-800 space-y-3">
              <HelpCircle className="w-8 h-8 text-charcoal-600 mx-auto" />
              <h3 className="font-serif-editorial text-xl text-parchment-200">
                No questions match the current filter
              </h3>
              <p className="text-xs text-parchment-400">
                Try switching the status tab or clearing the urgency filter.
              </p>
            </div>
          ) : (
            questions.map((q) => (
              <div
                key={q.id}
                className={`p-6 sm:p-8 rounded-sm border transition-all duration-300 shadow-card-dark ${
                  q.answered
                    ? 'bg-charcoal-900/50 border-charcoal-800/80'
                    : 'bg-charcoal-900 border-amber-500/30 hover:border-amber-500/60'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-charcoal-850">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="text-xs font-mono text-amber-400 uppercase tracking-widest font-medium">
                      {q.category}
                    </span>
                    <span className="text-charcoal-700">•</span>
                    <ImportanceBadge importance={q.importance} />
                  </div>

                  <div className="flex items-center space-x-3">
                    <button
                      type="button"
                      onClick={() => toggleQuestionStatus(q.storyId, q.id)}
                      className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-sm text-xs font-mono border transition-colors ${
                        q.answered
                          ? 'bg-emerald-950/60 border-emerald-600/40 text-emerald-300'
                          : 'bg-charcoal-850 border-charcoal-700 text-parchment-400 hover:text-parchment-200'
                      }`}
                    >
                      {q.answered ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Circle className="w-3.5 h-3.5" />}
                      <span>{q.answered ? 'Marked Answered' : 'Mark as Answered'}</span>
                    </button>
                  </div>
                </div>

                {/* The Question in Editorial Serif */}
                <div className="py-4 space-y-3">
                  <h3 className="font-serif-editorial text-2xl sm:text-3xl text-parchment-100 font-light leading-snug">
                    &ldquo;{q.question}&rdquo;
                  </h3>

                  {/* Why it matters */}
                  <div className="p-3 bg-charcoal-950/80 rounded border border-charcoal-800/80 text-xs text-parchment-300 font-light leading-relaxed">
                    <strong className="text-parchment-200 font-mono uppercase tracking-wider text-[11px] block mb-1">
                      Archival Significance:
                    </strong>
                    {q.whyItMatters}
                  </div>

                  {/* Suggested Courteous Prompt */}
                  {q.suggestedPromptForInterview && (
                    <div className="p-3 bg-amber-950/20 border border-amber-600/20 rounded text-xs text-amber-200/90 font-light italic">
                      <strong className="not-italic font-mono uppercase tracking-wider text-[10px] text-amber-400 block mb-0.5">
                        Suggested Interview Phrasing for Storyteller:
                      </strong>
                      {q.suggestedPromptForInterview}
                    </div>
                  )}

                  {/* Answer Section if resolved */}
                  {q.answered && q.answerText && (
                    <div className="mt-4 p-4 rounded bg-emerald-950/20 border border-emerald-600/30 space-y-2">
                      <div className="flex items-center justify-between text-xs font-mono text-emerald-300">
                        <span className="flex items-center space-x-1.5 font-semibold">
                          <Check className="w-4 h-4" />
                          <span>Preserved Testimony (Sealed)</span>
                        </span>
                        <span>Recorded by {q.answeredBy || 'Archivist'} on {q.answeredAt || 'Archive Date'}</span>
                      </div>
                      <p className="text-sm font-serif-editorial text-parchment-100 italic leading-relaxed">
                        &ldquo;{q.answerText}&rdquo;
                      </p>
                    </div>
                  )}
                </div>

                {/* Footer Action */}
                <div className="pt-3 flex items-center justify-between border-t border-charcoal-850">
                  <span className="text-[11px] font-mono text-parchment-500">
                    Question ID: {q.id}
                  </span>

                  <button
                    type="button"
                    onClick={() => setAnsweringQuestion(q)}
                    className="inline-flex items-center space-x-2 px-4 py-2 rounded-sm text-xs uppercase tracking-wider font-semibold text-charcoal-950 bg-amber-400 hover:bg-amber-300 transition-colors shadow-sm"
                  >
                    <span>{q.answered ? 'Edit Recorded Answer' : 'Record Answer from Storyteller'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

      </div>

      {/* Answer Modal */}
      <AnswerQuestionModal
        isOpen={!!answeringQuestion}
        question={answeringQuestion}
        storyTitle={selectedStory?.title || ''}
        onClose={() => setAnsweringQuestion(null)}
        onSubmit={(questionId, answerText, answeredBy) => {
          if (selectedStory) {
            markQuestionAnswered(selectedStory.id, questionId, answerText, answeredBy);
          }
        }}
      />

      {/* Add Custom Question Modal */}
      <AddQuestionModal
        isOpen={isAddModalOpen}
        storyId={selectedStory?.id || ''}
        storyTitle={selectedStory?.title || ''}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={(questionData) => {
          if (selectedStory) {
            addCustomQuestion(selectedStory.id, questionData);
          }
        }}
      />

      {/* Interview Field Guide Printable Modal */}
      {showFieldGuideModal && selectedStory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-950/85 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-3xl bg-charcoal-900 border border-charcoal-700 rounded-sm shadow-2xl p-6 sm:p-8 max-h-[85vh] overflow-y-auto">
            
            <div className="flex items-start justify-between pb-4 border-b border-charcoal-800">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-amber-400">
                  Printable Preservation Field Sheet
                </span>
                <h3 className="font-serif-editorial text-2xl text-parchment-100">
                  Interview Field Guide: {selectedStory.title}
                </h3>
                <p className="text-xs text-parchment-400 mt-1">
                  Take this field guide when visiting {selectedStory.storyteller.name} ({selectedStory.location})
                </p>
              </div>
              <button
                onClick={() => setShowFieldGuideModal(false)}
                className="p-1 text-parchment-400 hover:text-parchment-100"
              >
                &times;
              </button>
            </div>

            <div className="my-6 space-y-6 text-sm">
              <div className="p-4 bg-charcoal-950 rounded border border-charcoal-800 space-y-2">
                <p className="font-mono text-xs text-amber-400 uppercase tracking-wider">
                  Field Archivist Instructions:
                </p>
                <p className="text-xs text-parchment-300 font-light leading-relaxed">
                  Ask these questions gently in the storyteller's own dialect or comfortable language. Do not rush technical terms; encourage sensory metaphors ("does it smell like autumn leaves?").
                </p>
              </div>

              <div className="space-y-4">
                {selectedStory.missingQuestions.map((q, idx) => (
                  <div key={q.id} className="p-4 bg-charcoal-950/60 rounded border border-charcoal-800 space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-amber-400">Q{idx + 1}. {q.category}</span>
                      <ImportanceBadge importance={q.importance} />
                    </div>
                    <p className="font-serif-editorial text-base text-parchment-100 italic">
                      &ldquo;{q.question}&rdquo;
                    </p>
                    {q.suggestedPromptForInterview && (
                      <p className="text-xs text-parchment-400">
                        <strong className="text-amber-300">Prompt: </strong> {q.suggestedPromptForInterview}
                      </p>
                    )}
                    <div className="mt-3 pt-3 border-t border-dashed border-charcoal-800 h-16 flex items-end">
                      <span className="text-[10px] font-mono text-charcoal-600">
                        [Field Notes / Oral Recording Timestamp: _____________________]
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 flex items-center justify-end space-x-3 border-t border-charcoal-800">
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center space-x-2 px-4 py-2 rounded-sm text-xs font-mono uppercase tracking-wider bg-charcoal-800 text-parchment-200 hover:bg-charcoal-750"
              >
                <Printer className="w-4 h-4 text-amber-400" />
                <span>Print Guide</span>
              </button>
              <button
                type="button"
                onClick={() => setShowFieldGuideModal(false)}
                className="px-5 py-2 rounded-sm text-xs uppercase tracking-wider font-semibold text-charcoal-950 bg-amber-400 hover:bg-amber-300"
              >
                Close Field Guide
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
