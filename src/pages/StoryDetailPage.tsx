import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  User, 
  Calendar, 
  ShieldCheck, 
  CheckCircle2, 
  Circle, 
  Play, 
  Pause, 
  Volume2, 
  Sparkles, 
  Check, 
  ArrowRight,
  RefreshCw
} from 'lucide-react';
import { useArchive } from '../context/ArchiveContext';
import { Badge, ImportanceBadge } from '../components/ui/Badge';
import { AnswerQuestionModal } from '../components/ui/AnswerQuestionModal';
import { AIInferenceBadge } from '../components/ui/AIInferenceBadge';
import { MissingQuestion } from '../types';

export const StoryDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getStoryById, stories, markQuestionAnswered, toggleQuestionStatus, reanalyzeStory, isAnalyzing } = useArchive();

  const story = getStoryById(id || '');

  // Audio simulator player state
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const audioProgress = 24;

  // Answering question modal state
  const [answeringQuestion, setAnsweringQuestion] = useState<MissingQuestion | null>(null);
  const [reanalyzeMsg, setReanalyzeMsg] = useState<string | null>(null);

  const handleReanalyze = async () => {
    if (!story) return;
    try {
      const { meta } = await reanalyzeStory(story.id);
      setReanalyzeMsg(`Re-analyzed via ${meta.sourceLabel} (${meta.latencyMs}ms)`);
      setTimeout(() => setReanalyzeMsg(null), 4000);
    } catch (err: any) {
      setReanalyzeMsg(`Analysis notice: ${err?.message || 'Failed'}`);
      setTimeout(() => setReanalyzeMsg(null), 4000);
    }
  };

  if (!story) {
    return (
      <div className="min-h-screen bg-charcoal-950 flex items-center justify-center p-4 text-parchment-200">
        <div className="text-center space-y-4 max-w-md">
          <h2 className="font-serif-editorial text-3xl text-parchment-100">
            Story Not Found in Living Archive
          </h2>
          <p className="text-xs text-parchment-400">
            The requested preservation folio may have been relocated or removed.
          </p>
          <Link
            to="/archive"
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-sm text-xs uppercase tracking-wider font-semibold text-charcoal-950 bg-amber-400"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Living Archive</span>
          </Link>
        </div>
      </div>
    );
  }

  // Related stories in same category or matching tags
  const relatedStories = stories
    .filter(s => s.id !== story.id && (s.category === story.category || s.tags.some(t => story.tags.includes(t))))
    .slice(0, 3);

  const pendingQuestionsCount = story.missingQuestions.filter(q => !q.answered).length;

  return (
    <div className="min-h-screen bg-charcoal-950 pb-28 text-parchment-200">
      
      {/* 1. Back Navigation & Breadcrumb */}
      <div className="border-b border-charcoal-850 bg-charcoal-900/50 py-3.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link
            to="/archive"
            className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-wider text-parchment-400 hover:text-amber-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Living Archive</span>
          </Link>

          <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
            <AIInferenceBadge 
              source={story.inferenceSource || 'IN_CLOUD'} 
              isAnalyzing={isAnalyzing} 
              showDetails={true} 
            />
            <button
              onClick={handleReanalyze}
              disabled={isAnalyzing}
              className="inline-flex items-center space-x-1.5 px-3 py-1 rounded bg-charcoal-850 hover:bg-charcoal-800 border border-charcoal-700 text-parchment-300 hover:text-amber-300 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-3 h-3 ${isAnalyzing ? 'animate-spin text-amber-400' : 'text-amber-400'}`} />
              <span>{isAnalyzing ? 'Analyzing...' : 'Re-analyze with AI'}</span>
            </button>
            {reanalyzeMsg && (
              <span className="text-[11px] text-amber-300 animate-fadeIn">
                {reanalyzeMsg}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* 2. Cinematic Hero Section */}
      <section className="relative w-full h-[450px] sm:h-[550px] overflow-hidden">
        <img
          src={story.heroImage}
          alt={story.title}
          className="w-full h-full object-cover object-center brightness-75 scale-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/60 to-transparent" />
        <div className="absolute inset-0 vignette-radial pointer-events-none" />

        {/* Hero Meta Overlay */}
        <div className="absolute bottom-10 left-0 right-0 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto space-y-4">
            
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="amber">{story.category}</Badge>
              <span className="text-parchment-400 text-xs font-mono">
                {story.location}
              </span>
              <span className="text-charcoal-600">•</span>
              <span className="text-amber-300 text-xs font-mono">
                {story.period}
              </span>
            </div>

            <h1 className="font-serif-editorial text-3xl sm:text-5xl lg:text-6xl text-parchment-100 font-normal leading-[1.1]">
              {story.title}
            </h1>

            {story.subtitle && (
              <p className="font-serif-editorial text-lg sm:text-xl text-amber-200/90 italic font-light max-w-3xl">
                {story.subtitle}
              </p>
            )}

            {/* Storyteller Byline */}
            <div className="pt-2 flex flex-wrap items-center gap-6 text-xs font-mono text-parchment-300">
              <span className="flex items-center space-x-2">
                <User className="w-4 h-4 text-amber-400" />
                <span>Source: <strong className="text-parchment-100 font-semibold">{story.storyteller.name}</strong> ({story.storyteller.ageOrEra})</span>
              </span>
              <span className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-amber-400" />
                <span>Preserved on {story.preservationDate}</span>
              </span>
              <span className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Preservation Score: {story.preservationScore}%</span>
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Main Reading Body + Extracted Knowledge Sidebar */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Main Content (8 cols) */}
        <div className="lg:col-span-8 space-y-10">
          
          {/* Audio Testimony Player (if available) */}
          <div className="p-4 sm:p-5 bg-charcoal-900 border border-charcoal-800 rounded-sm space-y-3 shadow-card-dark">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-amber-400 uppercase tracking-widest flex items-center space-x-2">
                <Volume2 className="w-4 h-4 text-amber-400" />
                <span>Primary Oral Testimony ({story.audioRecording?.duration || '38:12'})</span>
              </span>
              <span className="text-parchment-500">
                {story.audioRecording?.sampleRate || '96 kHz / 24-bit Archival Master'}
              </span>
            </div>

            <div className="flex items-center space-x-4 pt-1">
              <button
                type="button"
                onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                className="w-10 h-10 rounded-full bg-amber-500 hover:bg-amber-400 text-charcoal-950 flex items-center justify-center transition-colors shadow-sm"
              >
                {isPlayingAudio ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
              </button>

              <div className="flex-1 space-y-1">
                <div className="w-full bg-charcoal-950 h-2 rounded-full overflow-hidden border border-charcoal-800">
                  <div
                    className="bg-amber-400 h-full transition-all"
                    style={{ width: `${isPlayingAudio ? (audioProgress + 15) % 100 : audioProgress}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] font-mono text-parchment-500">
                  <span>04:12</span>
                  <span>{story.audioRecording?.duration || '38:12'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* AI Knowledge Synthesis & Insights */}
          <div className="p-6 bg-charcoal-900 border border-charcoal-800 rounded-sm space-y-4 shadow-card-dark">
            <div className="flex items-center justify-between pb-3 border-b border-charcoal-800">
              <span className="text-xs font-mono uppercase tracking-widest text-amber-400 flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>AI Preservation Analysis</span>
              </span>
              <AIInferenceBadge source={story.inferenceSource || 'IN_CLOUD'} />
            </div>

            <p className="text-sm text-parchment-200 font-light leading-relaxed">
              {story.summary}
            </p>

            {story.nextBestQuestion && (
              <div className="p-3 bg-amber-950/20 border border-amber-600/30 rounded text-xs space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 block font-semibold">
                  Recommended Immediate Follow-up Question:
                </span>
                <p className="font-serif-editorial text-sm text-parchment-100 italic">
                  &ldquo;{story.nextBestQuestion}&rdquo;
                </p>
              </div>
            )}

            {(story.culturalSignificance || story.uncertainties?.length) && (
              <div className="pt-2 border-t border-charcoal-850 space-y-2 text-xs">
                {story.culturalSignificance && (
                  <div>
                    <strong className="text-parchment-300 font-medium">Cultural Significance: </strong>
                    <span className="text-parchment-400">{story.culturalSignificance}</span>
                  </div>
                )}
                {story.uncertainties && story.uncertainties.length > 0 && (
                  <div className="text-amber-300/80">
                    <strong className="text-amber-400 font-medium">Recorded Uncertainties / Gaps: </strong>
                    <span>{story.uncertainties.join(' • ')}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Editorial Story Text */}
          <article className="prose prose-invert max-w-none space-y-6">
            <div className="font-serif-editorial text-lg sm:text-xl text-parchment-100 font-light leading-relaxed whitespace-pre-line border-l-2 border-amber-500/40 pl-6 sm:pl-8 italic">
              {story.content}
            </div>
          </article>

          {/* Tags */}
          <div className="pt-6 border-t border-charcoal-850 flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-wider text-parchment-500 mr-2">
              Keywords:
            </span>
            {story.tags.map((t) => (
              <span
                key={t}
                className="px-2.5 py-1 text-xs font-mono rounded bg-charcoal-900 border border-charcoal-800 text-parchment-300"
              >
                #{t}
              </span>
            ))}
          </div>

          {/* EMBEDDED MISSING QUESTIONS SECTION */}
          <div className="pt-8 border-t border-charcoal-850 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-amber-400">
                  The Missing Questions Engine
                </span>
                <h3 className="font-serif-editorial text-2xl sm:text-3xl text-parchment-100 mt-0.5">
                  Knowledge Gaps in this Folio ({story.missingQuestions.length})
                </h3>
              </div>
              <Link
                to={`/missing-questions?storyId=${story.id}`}
                className="text-xs font-mono uppercase tracking-wider text-amber-400 hover:text-amber-300 flex items-center space-x-1"
              >
                <span>Full Engine View</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <p className="text-xs text-parchment-400 font-light leading-relaxed">
              These questions identify critical gaps in the narrative. Preserve the answers while {story.storyteller.name} is still available to testify.
            </p>

            <div className="space-y-4">
              {story.missingQuestions.map((q) => (
                <div
                  key={q.id}
                  className={`p-5 rounded-sm border transition-all ${
                    q.answered
                      ? 'bg-charcoal-900/40 border-charcoal-800'
                      : 'bg-charcoal-900 border-amber-500/30'
                  }`}
                >
                  <div className="flex items-center justify-between pb-2 border-b border-charcoal-850 text-xs">
                    <span className="font-mono text-amber-400 uppercase tracking-widest">
                      {q.category}
                    </span>
                    <ImportanceBadge importance={q.importance} />
                  </div>

                  <h4 className="font-serif-editorial text-lg text-parchment-100 font-normal mt-2.5 leading-snug">
                    &ldquo;{q.question}&rdquo;
                  </h4>

                  <p className="text-xs text-parchment-400 font-light mt-1.5 leading-relaxed">
                    <strong className="text-parchment-300 font-medium">Why this gap matters: </strong>
                    {q.whyItMatters}
                  </p>

                  {/* Confirmed answer */}
                  {q.answered && q.answerText && (
                    <div className="mt-3 p-3 rounded bg-emerald-950/20 border border-emerald-600/30 text-xs space-y-1">
                      <div className="flex items-center space-x-1.5 font-mono text-emerald-300">
                        <Check className="w-3.5 h-3.5" />
                        <span>Preserved Account ({q.answeredBy || 'Archivist'}):</span>
                      </div>
                      <p className="font-serif-editorial text-parchment-100 italic">
                        &ldquo;{q.answerText}&rdquo;
                      </p>
                    </div>
                  )}

                  <div className="pt-3 mt-3 border-t border-charcoal-850 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => toggleQuestionStatus(story.id, q.id)}
                      className="text-xs font-mono text-parchment-400 hover:text-amber-300 flex items-center space-x-1.5"
                    >
                      {q.answered ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Circle className="w-3.5 h-3.5" />}
                      <span>{q.answered ? 'Marked Answered' : 'Toggle Status'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setAnsweringQuestion(q)}
                      className="px-3 py-1.5 text-xs font-mono uppercase tracking-wider text-charcoal-950 bg-amber-400 hover:bg-amber-300 font-medium rounded-sm"
                    >
                      {q.answered ? 'Edit Answer' : 'Record Answer'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Extracted Knowledge Sidebar (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          <div className="p-6 bg-charcoal-900 border border-charcoal-800 rounded-sm space-y-6 shadow-card-dark sticky top-28">
            <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-amber-400 pb-3 border-b border-charcoal-800">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Extracted Knowledge Entities</span>
            </div>

            {/* People */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-parchment-400 block">
                Lineage & Key Custodians:
              </span>
              <ul className="space-y-1.5 text-xs text-parchment-200">
                {story.extractedKnowledge.people.map((p, i) => (
                  <li key={i} className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400/80"></span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Materials */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 block">
                Materials & Botanicals:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {story.extractedKnowledge.materials.map((m, i) => (
                  <span key={i} className="text-xs font-mono px-2 py-0.5 rounded bg-charcoal-950 border border-charcoal-800 text-parchment-200">
                    {m}
                  </span>
                ))}
              </div>
            </div>

            {/* Techniques */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-parchment-400 block">
                Techniques & Sensory Cues:
              </span>
              <ul className="space-y-1.5 text-xs text-parchment-300">
                {story.extractedKnowledge.techniques.map((t, i) => (
                  <li key={i} className="flex items-start space-x-2">
                    <span className="text-emerald-400/80">•</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Cultural Context */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-parchment-400 block">
                Historical Context:
              </span>
              <ul className="space-y-1 text-xs text-parchment-400 font-light">
                {story.extractedKnowledge.culturalContext.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>

            {/* Preservation Summary Gauge */}
            <div className="pt-4 border-t border-charcoal-800 space-y-2 text-xs font-mono">
              <div className="flex justify-between text-parchment-300">
                <span>Preservation Index:</span>
                <span className="text-amber-300 font-semibold">{story.preservationScore}%</span>
              </div>
              <div className="w-full bg-charcoal-950 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-amber-400 h-full"
                  style={{ width: `${story.preservationScore}%` }}
                />
              </div>
              <div className="text-[11px] text-parchment-500 pt-1">
                {pendingQuestionsCount} questions pending elder follow-up
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* 4. Related Stories in Living Archive */}
      {relatedStories.length > 0 && (
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 pt-12 border-t border-charcoal-850 space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-widest text-parchment-400">
              Related Living Folios
            </span>
            <Link
              to="/archive"
              className="text-xs font-mono uppercase tracking-wider text-amber-400 hover:text-amber-300"
            >
              Explore Full Archive &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedStories.map((rel) => (
              <Link
                key={rel.id}
                to={`/story/${rel.id}`}
                className="rounded-sm border border-charcoal-800 bg-charcoal-900 overflow-hidden shadow-card-dark hover:border-amber-500/40 transition-all group block"
              >
                <div className="h-32 w-full overflow-hidden">
                  <img
                    src={rel.heroImage}
                    alt={rel.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-85"
                  />
                </div>
                <div className="p-4 space-y-1">
                  <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest">
                    {rel.category}
                  </span>
                  <h4 className="font-serif-editorial text-base text-parchment-100 group-hover:text-amber-200 line-clamp-1">
                    {rel.title}
                  </h4>
                  <p className="text-xs text-parchment-400 line-clamp-2 font-light">
                    {rel.summary}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Answer Modal */}
      <AnswerQuestionModal
        isOpen={!!answeringQuestion}
        question={answeringQuestion}
        storyTitle={story.title}
        onClose={() => setAnsweringQuestion(null)}
        onSubmit={(questionId, answerText, answeredBy) => {
          markQuestionAnswered(story.id, questionId, answerText, answeredBy);
        }}
      />

    </div>
  );
};
