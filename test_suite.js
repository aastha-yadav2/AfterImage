// Comprehensive Test Suite for AFTERIMAGE Hybrid AI
// Testing Parser, Resilience, Markdown Stripping, Error Handling, and Domain Mapping

function safeParseAIResponse(raw) {
  let cleaned = raw.trim();
  if (cleaned.startsWith('```json')) {
    cleaned = cleaned.replace(/^```json\s*/i, '').replace(/\s*```$/, '');
  } else if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```\s*/, '').replace(/\s*```$/, '');
  }
  const firstBrace = cleaned.indexOf('{');
  const lastBrace = cleaned.lastIndexOf('}');
  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    cleaned = cleaned.slice(firstBrace, lastBrace + 1);
  }
  const parsed = JSON.parse(cleaned);
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

function convertAnalysisToDomainModels(storyId, analysis) {
  const materials = analysis.toolsAndMaterials && analysis.toolsAndMaterials.length > 0
    ? analysis.toolsAndMaterials
    : analysis.knowledgeCaptured.filter(k => k.category.toLowerCase().includes('material')).map(k => k.detail);

  const people = analysis.importantPeople && analysis.importantPeople.length > 0
    ? analysis.importantPeople
    : analysis.knowledgeCaptured.filter(k => k.category.toLowerCase().includes('people')).map(k => k.detail);

  const techniques = analysis.stepsOrProcess && analysis.stepsOrProcess.length > 0
    ? analysis.stepsOrProcess
    : analysis.knowledgeCaptured.filter(k => k.category.toLowerCase().includes('technique') || k.category.toLowerCase().includes('step')).map(k => k.detail);

  const culturalContext = analysis.culturalSignificance
    ? [analysis.culturalSignificance]
    : analysis.knowledgeCaptured.filter(k => k.category.toLowerCase().includes('context')).map(k => k.detail);

  const extractedKnowledge = {
    people: people.length > 0 ? people : ['Unspecified Elder Custodian'],
    materials: materials.length > 0 ? materials : ['Vernacular Local Materials'],
    techniques: techniques.length > 0 ? techniques : ['Generational Tactile Practice'],
    culturalContext: culturalContext.length > 0 ? culturalContext : ['Living Intangible Cultural Heritage'],
    timePeriod: analysis.historicalContext || 'Contemporary Living Tradition',
  };

  const missingQuestions = analysis.missingKnowledge.map((gap, index) => {
    let importance = 'High';
    if (gap.urgency === 'URGENT') importance = 'Urgent';
    if (gap.urgency === 'REFLECTIVE') importance = 'Reflective';

    let category = 'Technique Detail';
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

console.log('--- EXECUTING AFTERIMAGE TEST SUITE ---');

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`[PASS] ${name}`);
    passed++;
  } catch (err) {
    console.error(`[FAIL] ${name}: ${err.message}`);
    failed++;
  }
}

// Test 1: Standard structured AI JSON parsing
test('1. Standard structured JSON parsing', () => {
  const json = JSON.stringify({
    summary: 'The living sukumo indigo vats of Tokushima.',
    knowledgeCaptured: [{ category: 'Materials', detail: 'Hon-yama wood ash' }],
    missingKnowledge: [{
      gap: 'Specific hardwood species for ash',
      reason: 'Wrong wood alters pH balance within two weeks.',
      urgency: 'URGENT',
      question: 'Which specific native hardwood species are felled for the lye?'
    }],
    importantPeople: ['Kazuo Sasaki (88)'],
    places: ['Kamiyama, Tokushima'],
    toolsAndMaterials: ['Hon-yama ash', 'Sukumo', 'Sake lees'],
    stepsOrProcess: ['Sensory foam evaluation by tasting at dawn'],
    culturalSignificance: '400-year living fermentation lineage',
    historicalContext: 'Edo period to present',
    uncertainties: ['Exact ratio of sake lees in winter'],
    preservationScore: 78,
    nextBestQuestion: 'Which specific native hardwood species are felled for the lye?'
  });
  const res = safeParseAIResponse(json);
  if (res.summary !== 'The living sukumo indigo vats of Tokushima.') throw new Error('Summary mismatch');
  if (res.missingKnowledge.length !== 1) throw new Error('Missing knowledge length mismatch');
  if (res.preservationScore !== 78) throw new Error('Score mismatch');
});

// Test 2: Markdown fence stripping
test('2. Markdown code block fence stripping (```json ... ```)', () => {
  const fenced = '```json\n{\n  "summary": "Fenced summary.",\n  "knowledgeCaptured": [],\n  "missingKnowledge": [{\n    "gap": "Firing temperature",\n    "reason": "Prevents crackling.",\n    "urgency": "HIGH",\n    "question": "How did you read the smoke color?"\n  }],\n  "preservationScore": 70,\n  "nextBestQuestion": "How did you read the smoke color?"\n}\n```';
  const res = safeParseAIResponse(fenced);
  if (res.summary !== 'Fenced summary.') throw new Error('Fenced summary mismatch');
  if (res.nextBestQuestion !== 'How did you read the smoke color?') throw new Error('Next best question mismatch');
});

// Test 3: Malformed JSON rejection
test('3. Malformed JSON rejection without crashing', () => {
  let threw = false;
  try {
    safeParseAIResponse('Not a json object');
  } catch {
    threw = true;
  }
  if (!threw) throw new Error('Did not throw on invalid JSON');
});

// Test 4: Missing required field rejection
test('4. Incomplete JSON (missing summary) validation', () => {
  let threw = false;
  try {
    safeParseAIResponse(JSON.stringify({ missingKnowledge: [] }));
  } catch {
    threw = true;
  }
  if (!threw) throw new Error('Did not validate missing summary field');
});

// Test 5: Domain model conversion & urgency mapping
test('5. Conversion to application ExtractedKnowledge & MissingQuestion models', () => {
  const analysis = {
    summary: 'Master Henrik Lindqvist Telemark Hardanger fiddle carving.',
    knowledgeCaptured: [
      { category: 'Materials', detail: 'North-facing mountain spruce' },
      { category: 'Techniques', detail: 'Plate tap-tone tuning to F# / G' }
    ],
    missingKnowledge: [
      {
        gap: 'Boiled reindeer bone glue ratio',
        reason: 'Synthetic glues ruin instruments because soundboards cannot be removed for repairs without fracturing.',
        urgency: 'URGENT',
        question: 'What is the exact ratio of reindeer bone glue to water?'
      },
      {
        gap: 'Internal rot acoustic echo test',
        reason: 'Prevents felling centuries-old trees unnecessarily.',
        urgency: 'HIGH',
        question: 'How did your grandfather test for rot with the axe poll?'
      }
    ],
    importantPeople: ['Henrik Lindqvist (79)', 'Olav Lindqvist (Grandfather)'],
    places: ['Notodden, Telemark, Norway'],
    toolsAndMaterials: ['Alpine spruce', 'Curly birch', 'Bone glue'],
    stepsOrProcess: ['Winter moon-phase felling', 'Tap-tone overtone tuning'],
    culturalSignificance: 'Norwegian folk fiddle heritage',
    historicalContext: '1850s to present',
    uncertainties: [],
    preservationScore: 74,
    nextBestQuestion: 'What is the exact ratio of reindeer bone glue to water?'
  };

  const { extractedKnowledge, missingQuestions } = convertAnalysisToDomainModels('story-telemark', analysis);
  if (!extractedKnowledge.people.includes('Henrik Lindqvist (79)')) throw new Error('People mapping failed');
  if (!extractedKnowledge.materials.includes('Alpine spruce')) throw new Error('Materials mapping failed');
  if (missingQuestions.length !== 2) throw new Error('Questions count mismatch');
  if (missingQuestions[0].importance !== 'Urgent') throw new Error('Urgent importance mapping failed');
  if (missingQuestions[1].importance !== 'High') throw new Error('High importance mapping failed');
  if (missingQuestions[0].category !== 'Material Source') throw new Error('Category mapping failed');
});

// Test 6: Safe bounds on preservation score
test('6. Preservation score clamping within 10-100%', () => {
  const underflow = safeParseAIResponse(JSON.stringify({ summary: 'test', preservationScore: -20 }));
  if (underflow.preservationScore < 10) throw new Error('Failed to clamp negative score');

  const overflow = safeParseAIResponse(JSON.stringify({ summary: 'test', preservationScore: 999 }));
  if (overflow.preservationScore > 100) throw new Error('Failed to clamp overflow score');
});

console.log(`\n========================================`);
console.log(`TEST RESULTS: ${passed} PASSED, ${failed} FAILED`);
console.log(`========================================`);

if (failed > 0) process.exit(1);
