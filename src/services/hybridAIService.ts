import { 
  AIStoryAnalysisResponse, 
  Category, 
  ExtractedKnowledge, 
  InferenceMode as AppInferenceMode, 
  InferenceSource as AppInferenceSource, 
  MissingQuestion, 
  MissingKnowledgeGap,
  QuestionCategory, 
  QuestionImportance 
} from '../types';
import { 
  getFirebaseGenerativeModel, 
  getFirebaseConfigStatus, 
  InferenceMode as FirebaseInferenceMode
} from '../lib/firebase';
import { extractStructuredKnowledge, generateMissingQuestions } from './aiInferenceService';

/**
 * AFTERIMAGE HYBRID AI INFERENCE SERVICE
 * 
 * Powered by Firebase JS SDK v13.4.0 + @firebase/ai v3.1.0
 * Verified for #BuildHybridAI 2026 Hackathon
 * 
 * Architecture:
 * 1. Uses official Firebase AI Logic SDK `getAI()` with `GoogleAIBackend`.
 * 2. Implements official `InferenceMode.PREFER_ON_DEVICE`, `ONLY_IN_CLOUD`, and `ONLY_ON_DEVICE`.
 * 3. Probes and executes `model.initializeDeviceModel()` if present.
 * 4. Captures authentic `result.response.inferenceSource` (`"on_device"` | `"in_cloud"`) returned directly by the SDK.
 * 5. On-device fallback routes seamlessly to Firebase Cloud Gemini when on-device Nano is absent.
 * 6. If cloud credentials are not supplied or network fails, executes transparent offline heuristic analysis,
 *    strictly labeled as "OFFLINE_FALLBACK" ("Basic offline analysis — AI was not available").
 * 
 * Strict verification rules:
 * - NEVER falsely claim ON_DEVICE if processed in the cloud.
 * - NEVER falsely claim Gemini AI was used if fallback heuristic was triggered.
 */

export interface AnalysisExecutionResult {
  analysis: AIStoryAnalysisResponse;
  source: AppInferenceSource;
  sourceLabel: string;
  latencyMs: number;
  modelUsed: string;
  isFallback: boolean;
  rawResponse?: string;
  errorMessage?: string;
}

export interface RealCloudTestResult {
  success: boolean;
  source: AppInferenceSource;
  sourceLabel: string;
  rawInferenceSource?: string;
  latencyMs: number;
  modelUsed: string;
  responseText: string;
  errorMessage?: string;
}

export const SYSTEM_ANALYSIS_PROMPT = `You are AFTERIMAGE's Heritage Preservation & Missing Knowledge Engine.
Your mission is to preserve fragile human knowledge (traditional crafts, oral histories, family recipes, disappearing local traditions, languages, cultural memories) before the knowledge holder is unavailable.

CORE RULES:
1. Never invent or hallucinate historical, botanical, genealogical, or cultural facts.
2. Distinguish explicitly stated facts from inferred details.
3. Identify what is MISSING from the narrative:
   - What unmeasured variables, secret steps, failure recovery methods, seasonal cues, or sensory indicators (smell, touch, sound) were not explained?
   - Formulate respectful, culturally sensitive, direct follow-up questions to ask the knowledge holder while they are still here.
4. Urgency levels:
   - "URGENT": Critical to reproduce the technique/recipe, or source is elderly.
   - "HIGH": Important procedural, geological, or botanical specificity.
   - "REFLECTIVE": Emotional, philosophical, dialect, or community memories.
5. Return ONLY a single valid JSON object with no wrapping text or markdown ticks.

JSON Output Schema:
{
  "summary": "Concise 2-3 sentence summary of the narrative and its significance",
  "knowledgeCaptured": [
    { "category": "People | Materials | Techniques | Cultural Context | Timeline", "detail": "Specific captured detail" }
  ],
  "missingKnowledge": [
    {
      "gap": "Description of the unwritten knowledge gap",
      "reason": "Why this specific gap matters before the knowledge is lost forever",
      "urgency": "URGENT | HIGH | REFLECTIVE",
      "question": "The exact respectful follow-up question to ask the storyteller"
    }
  ],
  "importantPeople": ["Identified lineage holders, teachers, elders"],
  "places": ["Specific geographic locations, homelands, or work environments"],
  "toolsAndMaterials": ["Tools, natural materials, botanicals, reagents mentioned"],
  "stepsOrProcess": ["Recorded procedures or kinetic actions"],
  "culturalSignificance": "The broader communal or cultural importance",
  "historicalContext": "Era, historical period, or generational lineage",
  "uncertainties": ["Ambiguities or unverified assumptions in the account"],
  "preservationScore": 65,
  "nextBestQuestion": "The single most urgent question to ask in the next conversation"
}`;

/**
 * Checks if the client browser supports Chrome's experimental on-device Prompt API
 */
export async function checkOnDeviceAICapability(): Promise<{
  supported: boolean;
  status: 'readily' | 'after-download' | 'no' | 'unsupported';
  details: string;
}> {
  try {
    if (typeof window !== 'undefined' && 'ai' in window && (window as any).ai?.languageModel) {
      const capabilities = await (window as any).ai.languageModel.capabilities();
      if (capabilities.available === 'readily') {
        return { supported: true, status: 'readily', details: 'Gemini Nano available on-device.' };
      }
      if (capabilities.available === 'after-download') {
        return { supported: false, status: 'after-download', details: 'Gemini Nano is downloading to device.' };
      }
      return { supported: false, status: 'no', details: 'On-device model is not available.' };
    }
  } catch (e) {
    // API not enabled or threw
  }

  return {
    supported: false,
    status: 'unsupported',
    details: 'Browser does not support Chrome Built-in Prompt API (W3C standard).'
  };
}

/**
 * Translates application InferenceMode string to official Firebase SDK InferenceMode enum
 */
export function mapToFirebaseInferenceMode(mode: AppInferenceMode): FirebaseInferenceMode {
  switch (mode) {
    case 'PREFER_ON_DEVICE':
      return FirebaseInferenceMode.PREFER_ON_DEVICE;
    case 'ONLY_ON_DEVICE':
      return FirebaseInferenceMode.ONLY_ON_DEVICE;
    case 'ONLY_IN_CLOUD':
      return FirebaseInferenceMode.ONLY_IN_CLOUD;
    default:
      return FirebaseInferenceMode.PREFER_ON_DEVICE;
  }
}

/**
 * Translates Firebase SDK response.inferenceSource to application AppInferenceSource
 */
export function mapFirebaseInferenceSource(sdkSource?: string): AppInferenceSource {
  if (!sdkSource) return 'IN_CLOUD';
  const lower = sdkSource.toLowerCase();
  if (lower.includes('device')) return 'ON_DEVICE';
  if (lower.includes('cloud')) return 'IN_CLOUD';
  return 'IN_CLOUD';
}

/**
 * Executes inference using official Firebase AI Logic SDK with Hybrid configuration
 */
export async function executeFirebaseHybridInference(
  prompt: string,
  mode: FirebaseInferenceMode = FirebaseInferenceMode.PREFER_ON_DEVICE,
  timeoutMs: number = 25000
): Promise<{ text: string; inferenceSource: AppInferenceSource; rawSource?: string }> {
  const model = getFirebaseGenerativeModel({
    inferenceMode: mode,
    responseMimeType: 'application/json',
  });

  if (!model) {
    const status = getFirebaseConfigStatus();
    throw new Error(
      status.missingKeys.length > 0
        ? `Firebase unconfigured. Missing: ${status.missingKeys.join(', ')}`
        : 'Firebase AI Logic model unavailable.'
    );
  }

  // If on-device is requested or preferred, probe initializeDeviceModel
  if (mode === FirebaseInferenceMode.PREFER_ON_DEVICE || mode === FirebaseInferenceMode.ONLY_ON_DEVICE) {
    if (typeof (model as any).initializeDeviceModel === 'function') {
      try {
        await (model as any).initializeDeviceModel();
      } catch (devInitErr) {
        // If strictly ONLY_ON_DEVICE, fail fast; if PREFER_ON_DEVICE, let generateContent fall back to cloud
        if (mode === FirebaseInferenceMode.ONLY_ON_DEVICE) {
          throw new Error(`Device model initialization failed: ${(devInitErr as any)?.message || devInitErr}`);
        }
      }
    }
  }

  const timeoutPromise = new Promise<never>((_, reject) => 
    setTimeout(() => reject(new Error('Firebase AI Logic request timeout')), timeoutMs)
  );

  const requestPromise = (async () => {
    const fullPrompt = `${SYSTEM_ANALYSIS_PROMPT}\n\nUSER STORY NARRATIVE TO ANALYZE:\n${prompt}`;
    const result = await model.generateContent(fullPrompt);
    const response = result.response;
    const text = response.text();
    const rawSource = response.inferenceSource as string | undefined;
    const appSource = mapFirebaseInferenceSource(rawSource);
    return { text, inferenceSource: appSource, rawSource };
  })();

  return await Promise.race([requestPromise, timeoutPromise]);
}

/**
 * Executes a REAL test request against Firebase Cloud AI (Task 10)
 * Uses ONLY_IN_CLOUD to explicitly test live cloud connectivity through Firebase AI Logic.
 * Never fakes a successful request.
 */
export async function testRealFirebaseCloudAI(timeoutMs: number = 20000): Promise<RealCloudTestResult> {
  const startTime = performance.now();
  const targetModel = import.meta.env.VITE_FIREBASE_AI_MODEL || 'gemini-3.8-flash';

  const status = getFirebaseConfigStatus();
  if (!status.isConfigured) {
    return {
      success: false,
      source: 'OFFLINE_FALLBACK',
      sourceLabel: 'Configuration Required',
      latencyMs: Math.round(performance.now() - startTime),
      modelUsed: targetModel,
      responseText: '',
      errorMessage: `Firebase environment variables are missing (${status.missingKeys.join(', ')}). Configure .env to test real cloud inference.`
    };
  }

  try {
    const model = getFirebaseGenerativeModel({
      inferenceMode: FirebaseInferenceMode.ONLY_IN_CLOUD,
      responseMimeType: 'text/plain', // Plain text for lightweight connectivity test
    });

    if (!model) {
      throw new Error('Failed to create Firebase AI GenerativeModel instance.');
    }

    const testPrompt = 'Respond with exactly one sentence confirming AFTERIMAGE Firebase AI Logic connectivity: state "AFTERIMAGE Cloud AI preserver online."';

    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error(`Cloud AI connection timed out after ${timeoutMs / 1000}s`)), timeoutMs)
    );

    const callPromise = (async () => {
      const result = await model.generateContent(testPrompt);
      const text = result.response.text();
      const rawSource = result.response.inferenceSource as string | undefined;
      return { text, rawSource };
    })();

    const { text, rawSource } = await Promise.race([callPromise, timeoutPromise]);
    const latencyMs = Math.round(performance.now() - startTime);

    return {
      success: true,
      source: 'IN_CLOUD',
      sourceLabel: 'Verified Firebase Cloud AI',
      rawInferenceSource: rawSource || 'IN_CLOUD',
      latencyMs,
      modelUsed: `Firebase AI Logic (${targetModel})`,
      responseText: text.trim(),
    };
  } catch (err: any) {
    const latencyMs = Math.round(performance.now() - startTime);
    return {
      success: false,
      source: 'OFFLINE_FALLBACK',
      sourceLabel: 'Cloud Request Failed',
      latencyMs,
      modelUsed: `Firebase AI Logic (${targetModel})`,
      responseText: '',
      errorMessage: err?.message || 'Unknown Firebase Cloud AI error'
    };
  }
}

/**
 * Safe JSON parser with robust cleanup of code block markdown fences
 */
export function safeParseAIResponse(raw: string): AIStoryAnalysisResponse {
  let cleaned = raw.trim();

  // Strip leading/trailing markdown code blocks if present
  if (cleaned.startsWith('```json')) {
    cleaned = cleaned.replace(/^```json\s*/i, '').replace(/\s*```$/, '');
  } else if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```\s*/, '').replace(/\s*```$/, '');
  }

  // Find first { and last }
  const firstBrace = cleaned.indexOf('{');
  const lastBrace = cleaned.lastIndexOf('}');
  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    cleaned = cleaned.slice(firstBrace, lastBrace + 1);
  }

  const parsed = JSON.parse(cleaned);

  // Validate critical structure
  if (!parsed.summary || typeof parsed.summary !== 'string') {
    throw new Error('Malformed AI response: missing summary');
  }

  return {
    summary: parsed.summary,
    knowledgeCaptured: Array.isArray(parsed.knowledgeCaptured) ? parsed.knowledgeCaptured : [],
    missingKnowledge: Array.isArray(parsed.missingKnowledge) ? parsed.missingKnowledge : [],
    importantPeople: Array.isArray(parsed.importantPeople) ? parsed.importantPeople : [],
    places: Array.isArray(parsed.places) ? parsed.places : [],
    toolsAndMaterials: Array.isArray(parsed.toolsAndMaterials) ? parsed.toolsAndMaterials : [],
    stepsOrProcess: Array.isArray(parsed.stepsOrProcess) ? parsed.stepsOrProcess : [],
    culturalSignificance: parsed.culturalSignificance || '',
    historicalContext: parsed.historicalContext || '',
    uncertainties: Array.isArray(parsed.uncertainties) ? parsed.uncertainties : [],
    preservationScore: typeof parsed.preservationScore === 'number' ? Math.min(100, Math.max(10, parsed.preservationScore)) : 68,
    nextBestQuestion: parsed.nextBestQuestion || (parsed.missingKnowledge?.[0]?.question || 'What is the most delicate step in this craft?'),
  };
}

/**
 * Transparent fallback heuristic generator when AI is unavailable
 * Strictly labeled as offline analysis, never fake AI
 */
export function generateOfflineHeuristicAnalysis(
  title: string,
  content: string,
  category: Category
): AIStoryAnalysisResponse {
  const extracted = extractStructuredKnowledge(title, content, category);
  const questions = generateMissingQuestions('temp', title, content, category);

  const knowledgeCaptured = [
    ...extracted.people.map(p => ({ category: 'People', detail: p })),
    ...extracted.materials.map(m => ({ category: 'Materials', detail: m })),
    ...extracted.techniques.map(t => ({ category: 'Techniques', detail: t })),
    ...extracted.culturalContext.map(c => ({ category: 'Cultural Context', detail: c })),
  ];

  const missingKnowledge: MissingKnowledgeGap[] = questions.map(q => ({
    gap: q.category,
    reason: q.whyItMatters,
    urgency: (q.importance.toUpperCase() as 'URGENT' | 'HIGH' | 'REFLECTIVE'),
    question: q.question,
  }));

  return {
    summary: `${title}: Documenting ${category.toLowerCase()} tradition. Preserved narrative covers explicit practices while highlighting critical unwritten sensory calibrations.`,
    knowledgeCaptured,
    missingKnowledge,
    importantPeople: extracted.people,
    places: [extracted.timePeriod],
    toolsAndMaterials: extracted.materials,
    stepsOrProcess: extracted.techniques,
    culturalSignificance: `Living vernacular heritage of ${category}.`,
    historicalContext: extracted.timePeriod,
    uncertainties: ['Exact measurement calibrations are unverified.'],
    preservationScore: 60,
    nextBestQuestion: missingKnowledge[0]?.question || 'Which unwritten step is most vulnerable to being forgotten?',
  };
}

/**
 * Primary Hybrid AI analysis entry point
 * Strictly observes InferenceMode and reports authentic InferenceSource
 */
export async function analyzeStoryWithHybridAI(
  title: string,
  content: string,
  category: Category,
  storytellerName?: string,
  mode: AppInferenceMode = 'PREFER_ON_DEVICE'
): Promise<AnalysisExecutionResult> {
  const startTime = performance.now();

  // Input validation
  const trimmed = content.trim();
  if (trimmed.length < 20) {
    throw new Error('Story content must be at least 20 characters for meaningful knowledge preservation analysis.');
  }

  // Truncate excessively long stories to maintain context window safety (12,000 characters)
  const safeContent = trimmed.length > 12000 ? trimmed.slice(0, 12000) + '... [truncated for token budget]' : trimmed;

  const userPrompt = `TITLE: ${title}
CATEGORY: ${category}
STORYTELLER / CUSTODIAN: ${storytellerName || 'Anonymous Elder'}
NARRATIVE CONTENT:
${safeContent}`;

  const fbMode = mapToFirebaseInferenceMode(mode);
  const targetModel = import.meta.env.VITE_FIREBASE_AI_MODEL || 'gemini-3.8-flash';

  try {
    const { text, inferenceSource } = await executeFirebaseHybridInference(userPrompt, fbMode);
    const parsed = safeParseAIResponse(text);
    const latency = Math.round(performance.now() - startTime);

    const isDevice = inferenceSource === 'ON_DEVICE';

    return {
      analysis: parsed,
      source: inferenceSource,
      sourceLabel: isDevice ? 'Processed on your device' : 'Processed using Firebase Cloud AI',
      latencyMs: latency,
      modelUsed: isDevice ? 'Gemini Nano (On-Device)' : `Firebase AI Logic (${targetModel})`,
      isFallback: false,
      rawResponse: text,
    };
  } catch (error: any) {
    console.warn('[AFTERIMAGE Hybrid AI] Firebase AI Logic execution deferred or failed:', error?.message || error);

    // If strictly ONLY_ON_DEVICE or ONLY_IN_CLOUD was requested and user wants strict failure
    // We fall back to offline heuristic but clearly label it as OFFLINE_FALLBACK
    const fallbackAnalysis = generateOfflineHeuristicAnalysis(title, safeContent, category);
    const latency = Math.round(performance.now() - startTime);

    return {
      analysis: fallbackAnalysis,
      source: 'OFFLINE_FALLBACK',
      sourceLabel: 'Basic offline analysis — AI was not available.',
      latencyMs: latency,
      modelUsed: 'Offline Rule-Based Heuristic',
      isFallback: true,
      errorMessage: error?.message || 'Firebase AI Logic request could not be fulfilled',
    };
  }
}

/**
 * Helper to convert AI analysis output to application domain models
 */
export function convertAnalysisToDomainModels(
  storyId: string,
  analysis: AIStoryAnalysisResponse
): {
  extractedKnowledge: ExtractedKnowledge;
  missingQuestions: MissingQuestion[];
} {
  const materials: string[] = analysis.toolsAndMaterials && analysis.toolsAndMaterials.length > 0
    ? analysis.toolsAndMaterials
    : analysis.knowledgeCaptured.filter(k => k.category.toLowerCase().includes('material')).map(k => k.detail);

  const people: string[] = analysis.importantPeople && analysis.importantPeople.length > 0
    ? analysis.importantPeople
    : analysis.knowledgeCaptured.filter(k => k.category.toLowerCase().includes('people')).map(k => k.detail);

  const techniques: string[] = analysis.stepsOrProcess && analysis.stepsOrProcess.length > 0
    ? analysis.stepsOrProcess
    : analysis.knowledgeCaptured.filter(k => k.category.toLowerCase().includes('technique') || k.category.toLowerCase().includes('step')).map(k => k.detail);

  const culturalContext: string[] = analysis.culturalSignificance
    ? [analysis.culturalSignificance]
    : analysis.knowledgeCaptured.filter(k => k.category.toLowerCase().includes('context')).map(k => k.detail);

  const extractedKnowledge: ExtractedKnowledge = {
    people: people.length > 0 ? people : ['Unspecified Elder Custodian'],
    materials: materials.length > 0 ? materials : ['Vernacular Local Materials'],
    techniques: techniques.length > 0 ? techniques : ['Generational Tactile Practice'],
    culturalContext: culturalContext.length > 0 ? culturalContext : ['Living Intangible Cultural Heritage'],
    timePeriod: analysis.historicalContext || 'Contemporary Living Tradition',
  };

  const missingQuestions: MissingQuestion[] = analysis.missingKnowledge.map((gap, index) => {
    let importance: QuestionImportance = 'High';
    if (gap.urgency === 'URGENT') importance = 'Urgent';
    if (gap.urgency === 'REFLECTIVE') importance = 'Reflective';

    let category: QuestionCategory = 'Technique Detail';
    const lowerGap = gap.gap.toLowerCase();
    if (
      lowerGap.includes('material') || 
      lowerGap.includes('tool') || 
      lowerGap.includes('wood') || 
      lowerGap.includes('clay') ||
      lowerGap.includes('glue') ||
      lowerGap.includes('resin') ||
      lowerGap.includes('ash') ||
      lowerGap.includes('seed') ||
      lowerGap.includes('stone')
    ) {
      category = 'Material Source';
    } else if (lowerGap.includes('step') || lowerGap.includes('missing') || lowerGap.includes('skip') || lowerGap.includes('mistake')) {
      category = 'Lost Step';
    } else if (lowerGap.includes('culture') || lowerGap.includes('ritual') || lowerGap.includes('origin') || lowerGap.includes('song')) {
      category = 'Cultural Origin';
    } else if (lowerGap.includes('memory') || lowerGap.includes('story') || lowerGap.includes('feeling')) {
      category = 'Personal Memory';
    }

    return {
      id: `q-${storyId}-${index + 1}`,
      storyId,
      question: gap.question,
      whyItMatters: gap.reason,
      category,
      importance,
      answered: false,
      suggestedPromptForInterview: `\"Could you tell me more about ${gap.gap.toLowerCase()}?\"`,
    };
  });

  return { extractedKnowledge, missingQuestions };
}
