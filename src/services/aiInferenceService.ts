import { Category, ExtractedKnowledge, MissingQuestion } from '../types';

/**
 * AFTERIMAGE HYBRID AI SERVICE CONTRACT
 * 
 * Architecture Prepared for #BuildHybridAI 2026:
 * - Phase 1 (Current): Client-side structural knowledge parser and question-gap heuristics
 *   providing transparent preview functionality without simulated external claims.
 * - Phase 2 (Firebase Hybrid AI): 
 *   - Tier 1: Local on-device Gemini Nano (via Chrome Built-in Prompt API / WebGPU)
 *     for zero-latency offline gap detection on sensitive personal recordings.
 *   - Tier 2: Cloud Firebase Functions + Genkit (Gemini 2.5 Pro / Flash)
 *     for deep ethnographic validation, cross-archive linking, and dialect audio transcription.
 */

export interface HybridAIStatus {
  localEngine: {
    status: 'ready' | 'dormant' | 'disabled';
    backend: 'Client Parser (Phase 1)' | 'Gemini Nano (Phase 2)';
    latencyMs: number;
  };
  cloudEngine: {
    status: 'connected-sandbox' | 'standby';
    provider: 'Firebase Genkit Vertex Endpoint' | 'Local-First Archive';
    region: string;
  };
}

export const getHybridAIStatus = (): HybridAIStatus => ({
  localEngine: {
    status: 'ready',
    backend: 'Client Parser (Phase 1)',
    latencyMs: 14,
  },
  cloudEngine: {
    status: 'standby',
    provider: 'Firebase Genkit Vertex Endpoint',
    region: 'us-central1 (Prepared for Phase 2)',
  },
});

/**
 * Extracts structured entities and knowledge from story text
 */
export function extractStructuredKnowledge(_title: string, content: string, category: Category): ExtractedKnowledge {
  const words = content.toLowerCase();
  
  // People heuristics
  const peopleSet = new Set<string>();
  const namePatterns = [
    /(?:master|uncle|aunt|nonna|nonno|grandfather|grandmother|elder|mrs?\.|mr\.)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/gi,
    /([A-Z][a-z]+\s+[A-Z][a-z]+)\s+(?:\(\d+\)|tells us|remembers|explained|said)/g
  ];
  
  for (const pattern of namePatterns) {
    let match;
    while ((match = pattern.exec(content)) !== null) {
      if (match[1] && match[1].length > 2) {
        peopleSet.add(match[1].trim());
      }
    }
  }

  // Material extraction based on sensory & ingredient vocabulary
  const materialsSet = new Set<string>();
  const materialKeywords = [
    'wood', 'clay', 'stone', 'ash', 'sake', 'flour', 'saffron', 'water',
    'cotton', 'linen', 'iron', 'copper', 'wool', 'resin', 'seed', 'soil',
    'leaves', 'bark', 'oil', 'salt', 'mortar', 'yeast', 'honey', 'silk',
    'spruce', 'birch', 'fennel', 'limestone', 'granite', 'tallow'
  ];

  materialKeywords.forEach(keyword => {
    if (words.includes(keyword)) {
      materialsSet.add(keyword.charAt(0).toUpperCase() + keyword.slice(1));
    }
  });

  // Techniques extraction
  const techniquesSet = new Set<string>();
  if (words.includes('ferment') || words.includes('yeast') || words.includes('dough')) {
    techniquesSet.add('Sensory fermentation management');
  }
  if (words.includes('knead') || words.includes('hand') || words.includes('trough')) {
    techniquesSet.add('Manual kinetic conditioning');
  }
  if (words.includes('sound') || words.includes('listen') || words.includes('tap') || words.includes('whistle')) {
    techniquesSet.add('Acoustic resonance evaluation');
  }
  if (words.includes('fire') || words.includes('ash') || words.includes('temperature') || words.includes('hearth')) {
    techniquesSet.add('Microclimate & thermal regulation');
  }
  if (words.includes('wind') || words.includes('season') || words.includes('winter') || words.includes('frost')) {
    techniquesSet.add('Meteorological timing & environmental alignment');
  }

  if (techniquesSet.size === 0) {
    techniquesSet.add(`Traditional ${category} craft method`);
    techniquesSet.add('Tactile memory transmission');
  }

  return {
    people: Array.from(peopleSet).length > 0 ? Array.from(peopleSet) : ['Elder Custodian', 'Primary Narrator'],
    materials: Array.from(materialsSet).length > 0 ? Array.from(materialsSet) : ['Natural Local Materials', 'Heirloom Tools'],
    techniques: Array.from(techniquesSet),
    culturalContext: [
      `Vernacular tradition of ${category}`,
      'Oral generational lineage',
      'Intangible cultural heritage'
    ],
    timePeriod: '20th Century & Pre-industrial Traditions'
  };
}

/**
 * Detects informational gaps and generates prioritized Missing Questions
 */
export function generateMissingQuestions(
  storyId: string,
  _title: string,
  content: string,
  _category: Category
): MissingQuestion[] {
  const questions: MissingQuestion[] = [];
  const textLower = content.toLowerCase();

  // Gap 1: Material sourcing & botanical/geological specificity
  if (
    textLower.includes('wood') || 
    textLower.includes('herb') || 
    textLower.includes('seed') || 
    textLower.includes('stone') || 
    textLower.includes('water')
  ) {
    questions.push({
      id: `gen-${storyId}-mat`,
      storyId,
      question: `What are the exact micro-habitat conditions, seasons, or physical cues for harvesting the raw materials described in this narrative?`,
      whyItMatters: `Without documenting the precise lunar timing, soil moisture, or tree species selection criteria, future craftspeople cannot replicate this technique sustainably.`,
      category: 'Material Source',
      importance: 'Urgent',
      answered: false,
      suggestedPromptForInterview: `"Could you show me or describe the exact place you gathered these materials, and how you knew that day was the right day?"`
    });
  }

  // Gap 2: Measurement, sensory threshold or undocumented kinetic feeling
  questions.push({
    id: `gen-${storyId}-tech`,
    storyId,
    question: `What is the physical sensation (sound, smell, skin resistance) that indicates the process is progressing correctly before modern instruments exist?`,
    whyItMatters: `Traditional knowledge relies on multi-sensory calibrations (smell, touch, acoustic feedback) that are never recorded in written handbooks.`,
    category: 'Technique Detail',
    importance: 'Urgent',
    answered: false,
    suggestedPromptForInterview: `"When you close your eyes and do this step, what is the exact sound or aroma you are waiting for?"`
  });

  // Gap 3: Missing intermediary transitions / failure modes
  questions.push({
    id: `gen-${storyId}-fail`,
    storyId,
    question: `What is the most common mistake an untrained apprentice makes here, and how was a spoiled batch revived or diagnosed?`,
    whyItMatters: `Oral traditions carry critical failure recovery steps that are only revealed when things go wrong.`,
    category: 'Lost Step',
    importance: 'High',
    answered: false,
    suggestedPromptForInterview: `"Did you ever ruin a batch or a piece when you were first learning? What did your teacher tell you to do?"`
  });

  // Gap 4: Cultural lineage and emotional memory
  questions.push({
    id: `gen-${storyId}-cult`,
    storyId,
    question: `What ritual phrases, songs, or seasonal celebrations accompanied this preservation work in previous generations?`,
    whyItMatters: `Techniques were historically bound to community rhythms and verbal mnemonic devices that kept the lineage intact.`,
    category: 'Cultural Origin',
    importance: 'Reflective',
    answered: false,
    suggestedPromptForInterview: `"Was there a song or an old saying your family repeated while doing this together?"`
  });

  return questions;
}
