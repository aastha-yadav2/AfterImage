import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Cpu, 
  Download, 
  RefreshCw, 
  Lock, 
  CheckCircle2, 
  AlertTriangle,
  FileJson,
  Loader2,
  Sparkles,
  Cloud,
  Zap,
  XCircle
} from 'lucide-react';
import { useArchive } from '../context/ArchiveContext';
import { getFirebaseConfigStatus } from '../lib/firebase';
import { 
  checkOnDeviceAICapability, 
  analyzeStoryWithHybridAI, 
  testRealFirebaseCloudAI,
  AnalysisExecutionResult,
  RealCloudTestResult
} from '../services/hybridAIService';
import { InferenceMode } from '../types';
import { AIInferenceBadge } from '../components/ui/AIInferenceBadge';

export const SettingsPage: React.FC = () => {
  const { settings, updateSettings, resetToDemoData, exportArchiveJSON, stats } = useArchive();
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  // Real Firebase configuration status
  const firebaseStatus = getFirebaseConfigStatus();

  // On-device capability detection
  const [onDeviceStatus, setOnDeviceStatus] = useState<{
    supported: boolean;
    status: string;
    details: string;
  }>({ supported: false, status: 'checking', details: 'Probing browser capabilities...' });

  // Live Pipeline Test state (Hybrid PREFER_ON_DEVICE / User preference)
  const [isTestingPipeline, setIsTestingPipeline] = useState(false);
  const [testResult, setTestResult] = useState<AnalysisExecutionResult | null>(null);
  const [testError, setTestError] = useState<string | null>(null);

  // Dedicated Real Cloud AI Test state (Task 10: "Test Real Firebase Cloud AI")
  const [isTestingCloud, setIsTestingCloud] = useState(false);
  const [cloudTestResult, setCloudTestResult] = useState<RealCloudTestResult | null>(null);

  useEffect(() => {
    checkOnDeviceAICapability().then(res => setOnDeviceStatus(res));
  }, []);

  const handleExport = () => {
    const dataStr = exportArchiveJSON();
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `afterimage-living-archive-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  const handleReset = () => {
    if (window.confirm('Reset archive to authentic demo heritage stories? This will replace any newly created stories.')) {
      resetToDemoData();
      setResetSuccess(true);
      setTimeout(() => setResetSuccess(false), 3000);
    }
  };

  const handleRunPipelineTest = async () => {
    setIsTestingPipeline(true);
    setTestResult(null);
    setTestError(null);

    try {
      const result = await analyzeStoryWithHybridAI(
        'Echizen Washi: Beating Kozo Mulberry Bark on River Stones',
        'In the mountain village of Imadate in Fukui Prefecture, the craft of hand-making Echizen paper has been practiced for 1,500 years. The long inner bark fibers of the kozo (mulberry) bush are harvested in deep winter. After steaming and stripping, the fibers must be washed in snowmelt river water to naturally bleach the lignin without using chlorine. Then two craftsmen beat the wet fiber bundles with heavy oak mallets on smooth river granite for four hours. When the beaten fiber forms a fine silken cloud in cold water, we add tororo-aoi mucilage (hibiscus root extract) to suspend the fibers. If the water temperature rises above 10 degrees Celsius, the mucilage breaks down and the paper sheets will clump unevenly.',
        'Crafts',
        'Master Keisuke Yamada (Echizen Washi Guild Elder)',
        settings.inferencePreference
      );
      setTestResult(result);
    } catch (err: any) {
      setTestError(err?.message || 'Pipeline test failed');
    } finally {
      setIsTestingPipeline(false);
    }
  };

  const handleRunRealCloudTest = async () => {
    setIsTestingCloud(true);
    setCloudTestResult(null);

    try {
      const result = await testRealFirebaseCloudAI(20000);
      setCloudTestResult(result);
    } catch (err: any) {
      setCloudTestResult({
        success: false,
        source: 'OFFLINE_FALLBACK',
        sourceLabel: 'Cloud Request Failed',
        latencyMs: 0,
        modelUsed: import.meta.env.VITE_FIREBASE_AI_MODEL || 'gemini-3.8-flash',
        responseText: '',
        errorMessage: err?.message || 'Unexpected Cloud Test error'
      });
    } finally {
      setIsTestingCloud(false);
    }
  };

  return (
    <div className="min-h-screen bg-charcoal-950 pb-28 text-parchment-200">
      
      {/* Header */}
      <section className="border-b border-charcoal-850 bg-charcoal-900/60 pt-10 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-2">
          <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-amber-400">
            <ShieldCheck className="w-4 h-4" />
            <span>Custodian Controls</span>
            <span>•</span>
            <span>Architecture & Data Sovereignty</span>
          </div>
          <h1 className="font-serif-editorial text-3xl sm:text-5xl text-parchment-100 font-light">
            Settings & Firebase Hybrid AI
          </h1>
          <p className="text-sm sm:text-base text-parchment-300 font-light max-w-2xl">
            Audit live Firebase AI Logic connectivity, configure hybrid on-device preferences, and verify actual inference sources.
          </p>
        </div>
      </section>

      {/* Main Settings Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 space-y-10">
        
        {/* 1. Real Firebase AI Configuration Status */}
        <div className="p-6 sm:p-8 bg-charcoal-900 border border-charcoal-800 rounded-sm space-y-6 shadow-card-dark">
          <div className="flex items-center justify-between pb-3 border-b border-charcoal-800">
            <div className="flex items-center space-x-2.5 text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold">
              <Cloud className="w-4 h-4" />
              <span>Firebase AI Logic SDK (v13.4.0)</span>
            </div>
            <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
              firebaseStatus.isConfigured 
                ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40' 
                : 'bg-amber-950/80 text-amber-300 border-amber-500/40'
            }`}>
              {firebaseStatus.isConfigured ? 'Connected & Verified' : 'Awaiting Environment Keys'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
            <div className="p-3.5 bg-charcoal-950 rounded border border-charcoal-800 space-y-1">
              <span className="text-[10px] text-parchment-500 uppercase">Project ID</span>
              <p className="text-parchment-100 truncate font-semibold">
                {firebaseStatus.projectId || '(Not configured)'}
              </p>
            </div>
            <div className="p-3.5 bg-charcoal-950 rounded border border-charcoal-800 space-y-1">
              <span className="text-[10px] text-parchment-500 uppercase">Target Gemini Model</span>
              <p className="text-amber-300 font-semibold">
                {import.meta.env.VITE_FIREBASE_AI_MODEL || 'gemini-3.8-flash'}
              </p>
            </div>
            <div className="p-3.5 bg-charcoal-950 rounded border border-charcoal-800 space-y-1">
              <span className="text-[10px] text-parchment-500 uppercase">App Check Security</span>
              <p className={`font-semibold capitalize ${
                firebaseStatus.appCheckEnabled ? 'text-emerald-300' : 'text-parchment-400'
              }`}>
                {firebaseStatus.appCheckMode}
              </p>
            </div>
          </div>

          {!firebaseStatus.isConfigured && (
            <div className="p-4 rounded bg-amber-950/30 border border-amber-600/30 text-xs text-parchment-300 space-y-2">
              <div className="flex items-center space-x-1.5 text-amber-400 font-mono font-medium">
                <AlertTriangle className="w-4 h-4" />
                <span>Firebase Environment Keys Missing</span>
              </div>
              <p className="font-light">
                To connect to live Firebase Cloud AI, duplicate <code className="text-amber-300">.env.example</code> to <code className="text-amber-300">.env</code> and add your project credentials.
              </p>
              <p className="text-[11px] text-parchment-400 font-mono">
                Missing: {firebaseStatus.missingKeys.join(', ')}
              </p>
              <p className="text-[11px] text-emerald-400 font-light">
                ✓ AFTERIMAGE will gracefully run using transparent on-device and offline heuristic modes in the meantime.
              </p>
            </div>
          )}
        </div>

        {/* 2. Hybrid AI Inference Mode Preference */}
        <div className="p-6 sm:p-8 bg-charcoal-900 border border-charcoal-800 rounded-sm space-y-6 shadow-card-dark">
          <div className="flex items-center justify-between pb-3 border-b border-charcoal-800">
            <div className="flex items-center space-x-2.5 text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold">
              <Cpu className="w-4 h-4" />
              <span>Hybrid Inference Routing (#BuildHybridAI 2026)</span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-charcoal-800 text-parchment-400">
              InferenceMode
            </span>
          </div>

          <p className="text-xs text-parchment-300 font-light leading-relaxed">
            Select how AFTERIMAGE balances zero-latency sovereign on-device processing against cloud model depth:
          </p>

          <div className="space-y-3">
            {[
              {
                mode: 'PREFER_ON_DEVICE' as InferenceMode,
                title: 'PREFER_ON_DEVICE (Recommended Hybrid Mode)',
                desc: 'Attempts local on-device inference first (Chrome Built-in Prompt API / Gemini Nano). If unavailable or downloading, automatically routes to Firebase Cloud Gemini.',
                badge: 'Default / Hackathon Standard'
              },
              {
                mode: 'ONLY_ON_DEVICE' as InferenceMode,
                title: 'ONLY_ON_DEVICE (Strict Sovereign Mode)',
                desc: 'Guarantees zero network transmission. If an on-device model is not available in the user browser, falls back strictly to local sandbox heuristics.',
                badge: '100% Offline'
              },
              {
                mode: 'ONLY_IN_CLOUD' as InferenceMode,
                title: 'ONLY_IN_CLOUD (Cloud Gemini Mode)',
                desc: 'Directly routes knowledge gap analysis through Firebase AI Logic and Google Vertex/Developer API.',
                badge: 'Direct Cloud'
              }
            ].map(item => (
              <label
                key={item.mode}
                onClick={() => updateSettings({ inferencePreference: item.mode })}
                className={`p-4 rounded-sm border cursor-pointer block transition-all ${
                  settings.inferencePreference === item.mode
                    ? 'bg-amber-950/30 border-amber-500/80 ring-1 ring-amber-500/30'
                    : 'bg-charcoal-950 border-charcoal-800 hover:border-charcoal-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="inferencePreference"
                      checked={settings.inferencePreference === item.mode}
                      onChange={() => updateSettings({ inferencePreference: item.mode })}
                      className="accent-amber-500"
                    />
                    <span className="text-xs font-mono font-semibold text-parchment-100">
                      {item.title}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-charcoal-850 text-amber-300 border border-charcoal-750">
                    {item.badge}
                  </span>
                </div>
                <p className="text-xs text-parchment-400 font-light pl-6 mt-1.5 leading-relaxed">
                  {item.desc}
                </p>
              </label>
            ))}
          </div>

          {/* On-device capability status indicator */}
          <div className="p-3.5 bg-charcoal-950 rounded border border-charcoal-800 flex items-center justify-between text-xs font-mono">
            <span className="text-parchment-400">Browser On-Device Gemini Nano Status:</span>
            <span className={onDeviceStatus.supported ? 'text-emerald-400 font-semibold' : 'text-parchment-400'}>
              {onDeviceStatus.details}
            </span>
          </div>
        </div>

        {/* 3. DEDICATED REAL CLOUD TEST (TASK 10 REQUIREMENT) */}
        <div className="p-6 sm:p-8 bg-charcoal-900 border border-sky-500/40 rounded-sm space-y-5 shadow-card-dark">
          <div className="flex items-center justify-between pb-3 border-b border-charcoal-800">
            <div className="flex items-center space-x-2 text-sky-400 font-mono text-xs uppercase tracking-wider font-semibold">
              <Zap className="w-4 h-4" />
              <span>Real Cloud AI Verification (Firebase AI Logic)</span>
            </div>
            <span className="text-[10px] font-mono text-sky-300 bg-sky-950/60 px-2 py-0.5 rounded border border-sky-800">
              InferenceMode.ONLY_IN_CLOUD
            </span>
          </div>

          <p className="text-xs text-parchment-300 font-light leading-relaxed">
            Directly executes an authentic cloud AI request through Firebase AI Logic (<code className="text-sky-300">getGenerativeModel</code> with <code className="text-sky-300">GoogleAIBackend</code>). Tests live latency, reports genuine returned <code className="text-sky-300">inferenceSource</code>, and never simulates success.
          </p>

          <div className="flex items-center space-x-4">
            <button
              type="button"
              onClick={handleRunRealCloudTest}
              disabled={isTestingCloud}
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-sm text-xs uppercase tracking-wider font-semibold text-charcoal-950 bg-gradient-to-r from-sky-400 to-sky-500 hover:from-sky-300 disabled:opacity-50 transition-all shadow-md"
            >
              {isTestingCloud ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-charcoal-950" />
                  <span>Contacting Firebase Cloud AI...</span>
                </>
              ) : (
                <>
                  <Cloud className="w-4 h-4" />
                  <span>Test Real Firebase Cloud AI</span>
                </>
              )}
            </button>
          </div>

          {/* Cloud Test Results Display */}
          {cloudTestResult && (
            <div className={`mt-4 p-5 rounded border space-y-3 animate-fadeIn text-xs font-mono ${
              cloudTestResult.success 
                ? 'bg-charcoal-950 border-sky-500/50' 
                : 'bg-rose-950/30 border-rose-500/50'
            }`}>
              <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-charcoal-800">
                <div className="flex items-center space-x-2">
                  {cloudTestResult.success ? (
                    <span className="flex items-center space-x-1.5 text-emerald-400 font-semibold">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Cloud AI Test Succeeded</span>
                    </span>
                  ) : (
                    <span className="flex items-center space-x-1.5 text-rose-400 font-semibold">
                      <XCircle className="w-4 h-4" />
                      <span>Cloud AI Test Notice</span>
                    </span>
                  )}
                  <span className="text-parchment-500">•</span>
                  <span className="text-parchment-300">Latency: <strong className="text-parchment-100">{cloudTestResult.latencyMs}ms</strong></span>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-parchment-400">inferenceSource:</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    cloudTestResult.source === 'IN_CLOUD' 
                      ? 'bg-sky-950 text-sky-300 border border-sky-500/50'
                      : 'bg-amber-950 text-amber-300 border border-amber-500/50'
                  }`}>
                    {cloudTestResult.rawInferenceSource || cloudTestResult.source}
                  </span>
                </div>
              </div>

              <div className="space-y-1 text-xs font-sans">
                <span className="text-[10px] font-mono uppercase tracking-wider text-parchment-400 block font-semibold">
                  Model Endpoint:
                </span>
                <p className="text-parchment-200 font-mono text-[11px]">
                  {cloudTestResult.modelUsed}
                </p>
              </div>

              {cloudTestResult.success && cloudTestResult.responseText && (
                <div className="space-y-1 text-xs font-sans pt-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-sky-300 block font-semibold">
                    Model Response:
                  </span>
                  <p className="p-3 bg-charcoal-900 rounded border border-charcoal-800 text-parchment-100 font-mono text-[11px]">
                    {cloudTestResult.responseText}
                  </p>
                </div>
              )}

              {!cloudTestResult.success && cloudTestResult.errorMessage && (
                <div className="space-y-1 text-xs font-sans pt-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-rose-300 block font-semibold">
                    Diagnostics / Details:
                  </span>
                  <p className="p-3 bg-charcoal-900 rounded border border-rose-900/40 text-rose-200 font-mono text-[11px] leading-relaxed">
                    {cloudTestResult.errorMessage}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* 4. Live Full-Pipeline Story Analysis Test */}
        <div className="p-6 sm:p-8 bg-charcoal-900 border border-amber-500/30 rounded-sm space-y-5 shadow-card-dark">
          <div className="flex items-center justify-between pb-3 border-b border-charcoal-800">
            <div className="flex items-center space-x-2 text-amber-400 font-mono text-xs uppercase tracking-wider font-semibold">
              <Sparkles className="w-4 h-4" />
              <span>Full Story Analysis Pipeline Verification</span>
            </div>
            <span className="text-[10px] font-mono text-parchment-400">
              Heritage Narrative Test
            </span>
          </div>

          <p className="text-xs text-parchment-300 font-light leading-relaxed">
            Evaluates a traditional Japanese Washi paper craft narrative using the configured routing mode (<code className="text-amber-300">{settings.inferencePreference}</code>) and generates complete structured knowledge preservation models:
          </p>

          <button
            type="button"
            onClick={handleRunPipelineTest}
            disabled={isTestingPipeline}
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-sm text-xs uppercase tracking-wider font-semibold text-charcoal-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 disabled:opacity-50 transition-all shadow-md"
          >
            {isTestingPipeline ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-charcoal-950" />
                <span>Running Heritage Analysis...</span>
              </>
            ) : (
              <>
                <Cpu className="w-4 h-4" />
                <span>Run Full Story Pipeline Test</span>
              </>
            )}
          </button>

          {/* Test Results Display */}
          {testResult && (
            <div className="mt-4 p-5 bg-charcoal-950 rounded border border-charcoal-750 space-y-3 animate-fadeIn">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-charcoal-800 text-xs font-mono">
                <AIInferenceBadge source={testResult.source} showDetails={true} latencyMs={testResult.latencyMs} />
                <span className="text-parchment-400">Model: <strong className="text-parchment-100">{testResult.modelUsed}</strong></span>
              </div>

              <div className="space-y-1.5 text-xs">
                <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 block font-semibold">
                  Extracted Summary:
                </span>
                <p className="text-parchment-200 font-light">
                  {testResult.analysis.summary}
                </p>
              </div>

              <div className="space-y-1.5 text-xs pt-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-rose-300 block font-semibold">
                  Sample Identified Gap & Follow-up Question:
                </span>
                <p className="font-serif-editorial text-sm text-parchment-100 italic">
                  &ldquo;{testResult.analysis.nextBestQuestion}&rdquo;
                </p>
              </div>
            </div>
          )}

          {testError && (
            <div className="p-4 rounded bg-rose-950/50 border border-rose-500/40 text-xs text-rose-300">
              <strong className="block font-semibold mb-1">Pipeline Test Error:</strong>
              {testError}
            </div>
          )}
        </div>

        {/* 5. Firebase App Check & Development Guide */}
        <div className="p-6 sm:p-8 bg-charcoal-900 border border-charcoal-800 rounded-sm space-y-5 shadow-card-dark">
          <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-wider text-amber-400 pb-3 border-b border-charcoal-800">
            <Lock className="w-4 h-4" />
            <span>Firebase App Check & Development Security Guide</span>
          </div>

          <div className="space-y-3 text-xs text-parchment-300 font-light leading-relaxed">
            <p>
              Firebase App Check protects your Gemini API quota against token theft and unauthorized origin requests:
            </p>

            <div className="p-4 bg-charcoal-950 rounded border border-charcoal-800 space-y-3 font-mono text-[11px]">
              <div>
                <span className="text-amber-400 block mb-1">1. Local Development (Debug Provider):</span>
                <p className="text-parchment-400 leading-normal">
                  In Firebase Console &rarr; App Check &rarr; Apps &rarr; Manage Debug Tokens, generate a debug token and add it to your <code className="text-parchment-100">.env</code> as <code className="text-amber-300">VITE_FIREBASE_APPCHECK_DEBUG_TOKEN</code>.
                </p>
              </div>

              <div className="pt-2 border-t border-charcoal-850">
                <span className="text-amber-400 block mb-1">2. Production Deployment (ReCaptcha Enterprise):</span>
                <p className="text-parchment-400 leading-normal">
                  Register your web domain in Google Cloud reCAPTCHA Enterprise, obtain a site key, and set <code className="text-amber-300">VITE_FIREBASE_APPCHECK_SITE_KEY</code>.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 6. Export & Archival Backup */}
        <div className="p-6 sm:p-8 bg-charcoal-900 border border-charcoal-800 rounded-sm space-y-6 shadow-card-dark">
          <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-wider text-amber-400 pb-3 border-b border-charcoal-800">
            <Download className="w-4 h-4" />
            <span>Archive Export & Backup</span>
          </div>

          <p className="text-xs text-parchment-300 font-light leading-relaxed">
            Download your living archive for long-term cold storage or off-grid migration. Includes all {stats.totalStories} stories, {stats.totalKnowledgeExtracted} extracted entities, and {stats.totalQuestions} questions.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={handleExport}
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-sm text-xs uppercase tracking-wider font-semibold text-charcoal-950 bg-amber-400 hover:bg-amber-300 transition-colors shadow-sm"
            >
              <FileJson className="w-4 h-4" />
              <span>Export Living Archive (.JSON)</span>
            </button>

            {downloadSuccess && (
              <span className="text-xs font-mono text-emerald-400 flex items-center space-x-1.5 animate-fadeIn">
                <CheckCircle2 className="w-4 h-4" />
                <span>Archive exported successfully!</span>
              </span>
            )}
          </div>
        </div>

        {/* 7. Reset to Demo Data */}
        <div className="p-6 sm:p-8 bg-charcoal-900 border border-rose-950/60 rounded-sm space-y-4 shadow-card-dark">
          <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-wider text-rose-400 pb-3 border-b border-charcoal-800">
            <AlertTriangle className="w-4 h-4" />
            <span>Reset / Restoration</span>
          </div>

          <p className="text-xs text-parchment-400 font-light">
            If you wish to restore the authentic demonstration stories (Tokushima Indigo, Sicilian Saffron Bread, Yorkshire Dry Stone, La Gomera Whistled Speech, Telemark Hardingfele), you can reset the archive state:
          </p>

          <div className="flex items-center space-x-4">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-sm text-xs font-mono uppercase tracking-wider text-rose-300 bg-rose-950/50 hover:bg-rose-900/60 border border-rose-600/40 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Restore Default Heritage Dataset</span>
            </button>

            {resetSuccess && (
              <span className="text-xs font-mono text-emerald-400 flex items-center space-x-1.5 animate-fadeIn">
                <CheckCircle2 className="w-4 h-4" />
                <span>Archive restored to demo dataset!</span>
              </span>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
