import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import { 
  Story, 
  MissingQuestion, 
  ArchiveStats, 
  SystemSettings, 
  Category, 
  ExtractedKnowledge
} from '../types';
import { INITIAL_STORIES } from '../data/mockStories';
import { 
  analyzeStoryWithHybridAI, 
  convertAnalysisToDomainModels, 
  AnalysisExecutionResult 
} from '../services/hybridAIService';

interface ArchiveContextType {
  stories: Story[];
  stats: ArchiveStats;
  settings: SystemSettings;
  isAnalyzing: boolean;
  lastAnalysisMeta: AnalysisExecutionResult | null;
  addStory: (storyData: {
    title: string;
    subtitle?: string;
    category: Category;
    content: string;
    summary?: string;
    storytellerName: string;
    storytellerAge?: string;
    storytellerRelation?: string;
    location?: string;
    tags: string[];
    heroImage?: string;
    audioRecorded?: boolean;
    customExtractedKnowledge?: Partial<ExtractedKnowledge>;
  }) => Story;
  analyzeAndSaveStory: (storyData: {
    title: string;
    subtitle?: string;
    category: Category;
    content: string;
    storytellerName: string;
    storytellerAge?: string;
    storytellerRelation?: string;
    location?: string;
    tags: string[];
    heroImage?: string;
    audioRecorded?: boolean;
  }) => Promise<{ story: Story; meta: AnalysisExecutionResult }>;
  reanalyzeStory: (storyId: string) => Promise<{ story: Story; meta: AnalysisExecutionResult }>;
  updateStory: (id: string, updates: Partial<Story>) => void;
  deleteStory: (id: string) => void;
  getStoryById: (id: string) => Story | undefined;
  markQuestionAnswered: (
    storyId: string, 
    questionId: string, 
    answerText: string, 
    answeredBy?: string
  ) => void;
  toggleQuestionStatus: (storyId: string, questionId: string) => void;
  addCustomQuestion: (
    storyId: string, 
    questionData: Omit<MissingQuestion, 'id' | 'storyId' | 'answered'>
  ) => void;
  updateSettings: (updates: Partial<SystemSettings>) => void;
  resetToDemoData: () => void;
  exportArchiveJSON: () => string;
}

const STORAGE_KEY_STORIES = 'afterimage_living_archive_v4';
const STORAGE_KEY_SETTINGS = 'afterimage_settings_v4';

const DEFAULT_SETTINGS: SystemSettings = {
  localAiMode: true,
  cloudSyncEnabled: false,
  storageOption: 'local-only',
  audioQuality: 'lossless',
  autoExtractQuestions: true,
  themeAtmosphere: 'warm-ember',
  inferencePreference: 'PREFER_ON_DEVICE',
};

const defaultImages: Record<Category, string> = {
  Crafts: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80',
  Traditions: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
  Recipes: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80',
  'Oral Histories': 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80',
  Places: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
  'Family Knowledge': 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80',
  Languages: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1200&q=80',
  Other: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=1200&q=80',
};

const ArchiveContext = createContext<ArchiveContextType | undefined>(undefined);

export const ArchiveProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [stories, setStories] = useState<Story[]>(() => {
    try {
      let saved = localStorage.getItem(STORAGE_KEY_STORIES);
      if (!saved) {
        // Fallback check legacy keys and clean them
        saved = localStorage.getItem('afterimage_living_archive_v2') || localStorage.getItem('afterimage_living_archive');
        try {
          localStorage.removeItem('afterimage_living_archive_v2');
          localStorage.removeItem('afterimage_living_archive');
        } catch {}
      }
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Guarantee all core heritage stories always use current, verified image assets
          return parsed.map((s: Story) => {
            const matchedInitial = INITIAL_STORIES.find((init) => init.id === s.id);
            if (matchedInitial) {
              return { 
                ...s, 
                heroImage: matchedInitial.heroImage,
                galleryImages: matchedInitial.galleryImages || s.galleryImages
              };
            }
            return s;
          });
        }
      }
    } catch (e) {
      console.warn('Failed to parse saved archive from localStorage', e);
    }
    return INITIAL_STORIES;
  });

  const [settings, setSettings] = useState<SystemSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_SETTINGS);
      if (saved) {
        return { ...DEFAULT_SETTINGS, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.warn('Failed to parse settings from localStorage', e);
    }
    return DEFAULT_SETTINGS;
  });

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [lastAnalysisMeta, setLastAnalysisMeta] = useState<AnalysisExecutionResult | null>(null);

  // Active sync on mount: ensure any hot-reloaded state or cached stories update hero images immediately
  useEffect(() => {
    setStories((prev) => {
      let changed = false;
      const synced = prev.map((s) => {
        const init = INITIAL_STORIES.find((item) => item.id === s.id);
        if (init && s.heroImage !== init.heroImage) {
          changed = true;
          return { ...s, heroImage: init.heroImage, galleryImages: init.galleryImages || s.galleryImages };
        }
        return s;
      });
      return changed ? synced : prev;
    });
  }, []);

  // Sync stories to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_STORIES, JSON.stringify(stories));
    } catch (e) {
      console.error('Error saving stories to localStorage', e);
    }
  }, [stories]);

  // Sync settings to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(settings));
    } catch (e) {
      console.error('Error saving settings to localStorage', e);
    }
  }, [settings]);

  // Dynamic stats calculation
  const stats = useMemo<ArchiveStats>(() => {
    let totalQuestions = 0;
    let answeredQuestions = 0;
    let totalKnowledgeItems = 0;

    stories.forEach(story => {
      totalQuestions += story.missingQuestions.length;
      answeredQuestions += story.missingQuestions.filter(q => q.answered).length;
      totalKnowledgeItems += (
        story.extractedKnowledge.materials.length +
        story.extractedKnowledge.techniques.length +
        story.extractedKnowledge.people.length
      );
    });

    const unansweredQuestions = totalQuestions - answeredQuestions;
    const completeness = totalQuestions === 0 
      ? 100 
      : Math.round((answeredQuestions / totalQuestions) * 100);

    return {
      totalStories: stories.length,
      totalKnowledgeExtracted: totalKnowledgeItems,
      totalQuestions,
      unansweredQuestions,
      answeredQuestions,
      preservationCompleteness: completeness,
    };
  }, [stories]);

  /**
   * Synchronous / Immediate story capture (uses fallback heuristics)
   */
  const addStory = (storyData: {
    title: string;
    subtitle?: string;
    category: Category;
    content: string;
    summary?: string;
    storytellerName: string;
    storytellerAge?: string;
    storytellerRelation?: string;
    location?: string;
    tags: string[];
    heroImage?: string;
    audioRecorded?: boolean;
    customExtractedKnowledge?: Partial<ExtractedKnowledge>;
  }): Story => {
    const id = `story-${Date.now()}`;
    
    const newStory: Story = {
      id,
      title: storyData.title,
      subtitle: storyData.subtitle || `Preserved in ${storyData.category} archive`,
      category: storyData.category,
      content: storyData.content,
      summary: storyData.summary || storyData.content.slice(0, 180) + '...',
      storyteller: {
        name: storyData.storytellerName || 'Anonymous Custodian',
        ageOrEra: storyData.storytellerAge || 'Contemporary Elder',
        relation: storyData.storytellerRelation || 'Personal Record',
        location: storyData.location,
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      },
      location: storyData.location || 'Local Archive',
      period: 'Preserved 2026',
      tags: storyData.tags.length > 0 ? storyData.tags : [storyData.category, 'Oral Heritage'],
      heroImage: storyData.heroImage || defaultImages[storyData.category],
      audioRecording: storyData.audioRecorded ? {
        duration: '04:18',
        sampleRate: '48 kHz / 24-bit',
        recordedAt: new Date().toISOString().split('T')[0],
        status: 'ready'
      } : undefined,
      extractedKnowledge: {
        people: [storyData.storytellerName || 'Elder Custodian'],
        materials: ['Natural Local Materials'],
        techniques: ['Generational Practice'],
        culturalContext: [`Living vernacular tradition of ${storyData.category}`],
        timePeriod: 'Contemporary Heritage',
        ...(storyData.customExtractedKnowledge || {})
      },
      missingQuestions: [],
      preservationDate: new Date().toISOString().split('T')[0],
      preservationScore: 60,
      verificationStatus: 'Local Draft',
      inferenceSource: 'OFFLINE_FALLBACK',
    };

    setStories(prev => [newStory, ...prev]);
    return newStory;
  };

  /**
   * Asynchronous story preservation with Real Hybrid AI Analysis
   * - Attempts on-device first if preferred
   * - Falls back to Firebase Cloud AI
   * - Falls back to offline heuristic if unconfigured
   */
  const analyzeAndSaveStory = async (storyData: {
    title: string;
    subtitle?: string;
    category: Category;
    content: string;
    storytellerName: string;
    storytellerAge?: string;
    storytellerRelation?: string;
    location?: string;
    tags: string[];
    heroImage?: string;
    audioRecorded?: boolean;
  }): Promise<{ story: Story; meta: AnalysisExecutionResult }> => {
    setIsAnalyzing(true);
    const id = `story-${Date.now()}`;

    try {
      const result = await analyzeStoryWithHybridAI(
        storyData.title,
        storyData.content,
        storyData.category,
        storyData.storytellerName,
        settings.inferencePreference
      );

      setLastAnalysisMeta(result);

      const { extractedKnowledge, missingQuestions } = convertAnalysisToDomainModels(id, result.analysis);

      const newStory: Story = {
        id,
        title: storyData.title,
        subtitle: storyData.subtitle || `Preserved in ${storyData.category} archive`,
        category: storyData.category,
        content: storyData.content,
        summary: result.analysis.summary,
        storyteller: {
          name: storyData.storytellerName || 'Anonymous Custodian',
          ageOrEra: storyData.storytellerAge || 'Contemporary Elder',
          relation: storyData.storytellerRelation || 'Personal Record',
          location: storyData.location,
          avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
        },
        location: storyData.location || (result.analysis.places?.[0] || 'Local Archive'),
        period: result.analysis.historicalContext || 'Preserved 2026',
        tags: storyData.tags.length > 0 ? storyData.tags : [storyData.category, 'Oral Heritage'],
        heroImage: storyData.heroImage || defaultImages[storyData.category],
        audioRecording: storyData.audioRecorded ? {
          duration: '04:18',
          sampleRate: '48 kHz / 24-bit',
          recordedAt: new Date().toISOString().split('T')[0],
          status: 'ready'
        } : undefined,
        extractedKnowledge,
        missingQuestions,
        preservationDate: new Date().toISOString().split('T')[0],
        preservationScore: result.analysis.preservationScore,
        verificationStatus: result.isFallback ? 'Local Draft' : 'AI Extracted',
        inferenceSource: result.source,
        aiAnalysisTimestamp: new Date().toISOString(),
        nextBestQuestion: result.analysis.nextBestQuestion,
        uncertainties: result.analysis.uncertainties,
        culturalSignificance: result.analysis.culturalSignificance,
        historicalContext: result.analysis.historicalContext,
      };

      setStories(prev => [newStory, ...prev]);
      return { story: newStory, meta: result };
    } finally {
      setIsAnalyzing(false);
    }
  };

  /**
   * Re-analyze an existing story with the configured AI engine
   */
  const reanalyzeStory = async (storyId: string): Promise<{ story: Story; meta: AnalysisExecutionResult }> => {
    const existing = stories.find(s => s.id === storyId);
    if (!existing) throw new Error(`Story ${storyId} not found`);

    setIsAnalyzing(true);
    try {
      const result = await analyzeStoryWithHybridAI(
        existing.title,
        existing.content,
        existing.category,
        existing.storyteller.name,
        settings.inferencePreference
      );

      setLastAnalysisMeta(result);
      const { extractedKnowledge, missingQuestions } = convertAnalysisToDomainModels(storyId, result.analysis);

      // Preserve any previously answered questions
      const mergedQuestions = missingQuestions.map(newQ => {
        const prevAnswered = existing.missingQuestions.find(oldQ => 
          oldQ.question.toLowerCase() === newQ.question.toLowerCase() ||
          oldQ.category === newQ.category
        );
        if (prevAnswered && prevAnswered.answered) {
          return {
            ...newQ,
            answered: true,
            answerText: prevAnswered.answerText,
            answeredAt: prevAnswered.answeredAt,
            answeredBy: prevAnswered.answeredBy,
          };
        }
        return newQ;
      });

      const updatedStory: Story = {
        ...existing,
        summary: result.analysis.summary,
        extractedKnowledge,
        missingQuestions: mergedQuestions,
        preservationScore: result.analysis.preservationScore,
        verificationStatus: result.isFallback ? 'Local Draft' : 'AI Extracted',
        inferenceSource: result.source,
        aiAnalysisTimestamp: new Date().toISOString(),
        nextBestQuestion: result.analysis.nextBestQuestion,
        uncertainties: result.analysis.uncertainties,
        culturalSignificance: result.analysis.culturalSignificance,
        historicalContext: result.analysis.historicalContext,
      };

      setStories(prev => prev.map(s => s.id === storyId ? updatedStory : s));
      return { story: updatedStory, meta: result };
    } finally {
      setIsAnalyzing(false);
    }
  };

  const updateStory = (id: string, updates: Partial<Story>) => {
    setStories(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
  };

  const deleteStory = (id: string) => {
    setStories(prev => prev.filter(s => s.id !== id));
  };

  const getStoryById = (id: string) => {
    return stories.find(s => s.id === id);
  };

  const markQuestionAnswered = (
    storyId: string, 
    questionId: string, 
    answerText: string, 
    answeredBy: string = 'Archivist'
  ) => {
    setStories(prev => prev.map(story => {
      if (story.id !== storyId) return story;

      const updatedQuestions = story.missingQuestions.map(q => {
        if (q.id !== questionId) return q;
        return {
          ...q,
          answered: true,
          answerText,
          answeredAt: new Date().toISOString().split('T')[0],
          answeredBy,
        };
      });

      // Recalculate story preservation score
      const answeredCount = updatedQuestions.filter(q => q.answered).length;
      const scoreBonus = Math.round((answeredCount / (updatedQuestions.length || 1)) * 30);
      const newScore = Math.min(100, (story.preservationScore || 65) + scoreBonus);

      return {
        ...story,
        missingQuestions: updatedQuestions,
        preservationScore: newScore,
      };
    }));
  };

  const toggleQuestionStatus = (storyId: string, questionId: string) => {
    setStories(prev => prev.map(story => {
      if (story.id !== storyId) return story;

      const updatedQuestions = story.missingQuestions.map(q => {
        if (q.id !== questionId) return q;
        return {
          ...q,
          answered: !q.answered,
          answeredAt: !q.answered ? new Date().toISOString().split('T')[0] : undefined,
        };
      });

      return {
        ...story,
        missingQuestions: updatedQuestions,
      };
    }));
  };

  const addCustomQuestion = (
    storyId: string, 
    questionData: Omit<MissingQuestion, 'id' | 'storyId' | 'answered'>
  ) => {
    const newQuestion: MissingQuestion = {
      ...questionData,
      id: `q-custom-${Date.now()}`,
      storyId,
      answered: false,
    };

    setStories(prev => prev.map(story => {
      if (story.id !== storyId) return story;
      return {
        ...story,
        missingQuestions: [newQuestion, ...story.missingQuestions],
      };
    }));
  };

  const updateSettings = (updates: Partial<SystemSettings>) => {
    setSettings(prev => ({ ...prev, ...updates }));
  };

  const resetToDemoData = () => {
    setStories(INITIAL_STORIES);
    setSettings(DEFAULT_SETTINGS);
    localStorage.removeItem(STORAGE_KEY_STORIES);
    localStorage.removeItem(STORAGE_KEY_SETTINGS);
  };

  const exportArchiveJSON = () => {
    return JSON.stringify({
      exportDate: new Date().toISOString(),
      platform: 'AFTERIMAGE Knowledge Archive',
      version: '2.0.0-hybrid-ai',
      totalStories: stories.length,
      stories,
    }, null, 2);
  };

  return (
    <ArchiveContext.Provider
      value={{
        stories,
        stats,
        settings,
        isAnalyzing,
        lastAnalysisMeta,
        addStory,
        analyzeAndSaveStory,
        reanalyzeStory,
        updateStory,
        deleteStory,
        getStoryById,
        markQuestionAnswered,
        toggleQuestionStatus,
        addCustomQuestion,
        updateSettings,
        resetToDemoData,
        exportArchiveJSON,
      }}
    >
      {children}
    </ArchiveContext.Provider>
  );
};

export const useArchive = () => {
  const context = useContext(ArchiveContext);
  if (!context) {
    throw new Error('useArchive must be used within an ArchiveProvider');
  }
  return context;
};
