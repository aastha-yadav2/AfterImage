export type Category = 
  | 'Traditions'
  | 'Crafts'
  | 'Recipes'
  | 'Oral Histories'
  | 'Places'
  | 'Family Knowledge'
  | 'Languages'
  | 'Other';

export type QuestionImportance = 'Urgent' | 'High' | 'Reflective';

export type QuestionCategory = 
  | 'Technique Detail'
  | 'Material Source'
  | 'Lost Step'
  | 'Cultural Origin'
  | 'Personal Memory'
  | 'Historical Context';

export interface MissingQuestion {
  id: string;
  storyId: string;
  question: string;
  whyItMatters: string;
  category: QuestionCategory;
  importance: QuestionImportance;
  answered: boolean;
  answerText?: string;
  answeredAt?: string;
  answeredBy?: string;
  suggestedPromptForInterview?: string;
}

export interface ExtractedKnowledge {
  people: string[];
  materials: string[];
  techniques: string[];
  culturalContext: string[];
  timePeriod: string;
}

export interface Storyteller {
  name: string;
  ageOrEra?: string;
  relation?: string;
  location?: string;
  avatarUrl?: string;
}

export type InferenceSource = 'ON_DEVICE' | 'IN_CLOUD' | 'OFFLINE_FALLBACK';

export type InferenceMode = 'PREFER_ON_DEVICE' | 'ONLY_ON_DEVICE' | 'ONLY_IN_CLOUD';

export interface CapturedKnowledgeEntity {
  category: string;
  detail: string;
}

export interface MissingKnowledgeGap {
  gap: string;
  reason: string;
  urgency: 'URGENT' | 'HIGH' | 'REFLECTIVE';
  question: string;
}

export interface AIStoryAnalysisResponse {
  summary: string;
  knowledgeCaptured: CapturedKnowledgeEntity[];
  missingKnowledge: MissingKnowledgeGap[];
  importantPeople?: string[];
  places?: string[];
  toolsAndMaterials?: string[];
  stepsOrProcess?: string[];
  culturalSignificance?: string;
  historicalContext?: string;
  uncertainties?: string[];
  preservationScore: number;
  nextBestQuestion: string;
}

export interface Story {
  id: string;
  title: string;
  subtitle?: string;
  category: Category;
  content: string;
  summary: string;
  storyteller: Storyteller;
  location?: string;
  period?: string;
  tags: string[];
  heroImage: string;
  galleryImages?: string[];
  audioRecording?: {
    duration: string;
    sampleRate?: string;
    recordedAt: string;
    status: 'ready' | 'transcribed';
  };
  extractedKnowledge: ExtractedKnowledge;
  missingQuestions: MissingQuestion[];
  preservationDate: string;
  preservationScore: number; // 0 - 100
  isFeatured?: boolean;
  verificationStatus: 'Local Draft' | 'AI Extracted' | 'Archived Permanently';
  
  // Real Hybrid AI Audit Trail
  inferenceSource?: InferenceSource;
  aiAnalysisTimestamp?: string;
  nextBestQuestion?: string;
  uncertainties?: string[];
  culturalSignificance?: string;
  historicalContext?: string;
}

export interface ArchiveStats {
  totalStories: number;
  totalKnowledgeExtracted: number;
  totalQuestions: number;
  unansweredQuestions: number;
  answeredQuestions: number;
  preservationCompleteness: number; // percentage
}

export interface SystemSettings {
  localAiMode: boolean;
  cloudSyncEnabled: boolean;
  storageOption: 'local-only' | 'encrypted-sync';
  audioQuality: 'lossless' | 'standard';
  autoExtractQuestions: boolean;
  themeAtmosphere: 'warm-ember' | 'dark-charcoal';
  inferencePreference: InferenceMode;
}
