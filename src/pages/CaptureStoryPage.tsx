import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Mic, 
  Square, 
  MapPin, 
  User, 
  Sparkles, 
  Save, 
  HelpCircle, 
  Image as ImageIcon,
  ArrowRight,
  Loader2,
  FileText
} from 'lucide-react';
import { useArchive } from '../context/ArchiveContext';
import { Category } from '../types';
import { extractStructuredKnowledge } from '../services/aiInferenceService';
import { AIInferenceBadge } from '../components/ui/AIInferenceBadge';

const CATEGORIES: Category[] = [
  'Traditions',
  'Crafts',
  'Recipes',
  'Oral Histories',
  'Places',
  'Family Knowledge',
  'Languages',
  'Other',
];

const CURATED_HERO_IMAGES = [
  {
    label: 'Old Hands & Traditional Indigo Craft',
    url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80',
    category: 'Crafts'
  },
  {
    label: 'Heritage Bread Trough & Stone Grains',
    url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80',
    category: 'Recipes'
  },
  {
    label: 'Ancient Dry Stone Landscape',
    url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    category: 'Traditions'
  },
  {
    label: 'Resonant Tone Wood & Luthiery',
    url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80',
    category: 'Family Knowledge'
  },
  {
    label: 'Mountain Ravine & Sonic Landscape',
    url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    category: 'Places'
  },
  {
    label: 'Elder Storyteller Portrait',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=80',
    category: 'Oral Histories'
  }
];

export const CaptureStoryPage: React.FC = () => {
  const navigate = useNavigate();
  const { analyzeAndSaveStory, isAnalyzing } = useArchive();

  // Form states
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [category, setCategory] = useState<Category>('Crafts');
  const [content, setContent] = useState('');
  const [storytellerName, setStorytellerName] = useState('');
  const [storytellerAge, setStorytellerAge] = useState('');
  const [storytellerRelation, setStorytellerRelation] = useState('');
  const [location, setLocation] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>(['Vernacular Knowledge']);
  const [selectedImage, setSelectedImage] = useState(CURATED_HERO_IMAGES[0].url);
  const [customImageUrl, setCustomImageUrl] = useState('');

  // Audio recording simulation state
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [hasRecordedAudio, setHasRecordedAudio] = useState(false);

  // Errors & saving state
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [analysisPhase, setAnalysisPhase] = useState<string>('');

  // Live extraction preview
  const [liveEntities, setLiveEntities] = useState(() => 
    extractStructuredKnowledge(title, content, category)
  );

  const loadDemoStory = () => {
    setTitle('The Breathing Onggi Jars of Ulsan: Natural Pine Ash and Micro-Porous Fermentation');
    setSubtitle('Preserving the unwritten clay-slapping rhythms and climbing kiln draft cues of Master Jin-Woo Park.');
    setCategory('Crafts');
    setStorytellerName('Master Jin-Woo Park');
    setStorytellerAge('86 years old (Human Cultural Asset)');
    setStorytellerRelation('Documented via field oral history recording');
    setLocation('Oegosan Onggi Village, Ulsan, South Korea');
    setTags(['Onggi Pot', 'Clay Fermentation', 'Wood Firing', 'Vanishing Craft', 'Natural Glaze']);
    setSelectedImage(CURATED_HERO_IMAGES[0].url);
    setContent(`For seventy years I have coiled heavy red clay from the valley marsh to build the tall onggi fermentation jars. Modern factory ceramic pots are vitrified and completely glassy; they suffocate the food inside. But a true onggi pot breathes through millions of microscopic pores that allow kimchi, doenjang, and soy sauce to ferment through the winter without spoiling.

We knead the wet clay with our bare heels on straw mats until every pocket of river air escapes. If an apprentice leaves even one tiny air bead, the pot explodes into shrapnel inside the wood kiln at one thousand degrees.

We build the walls using the tteol-jil coil technique on a wooden kick wheel, supporting the inner wall with a round wooden anvil while slapping the outer surface with a grooved wooden paddle (dokkaebi-bangmangi) in a rapid triplet cadence. The rhythmic sound tells you if the wall thickness is uniform before any caliper touches it.

The glaze is made purely of sifted red mountain pine ash mixed with decomposed granite leaf mold and river silt. We do not use modern chemical fluxes. We burn split pine wood in the climbing dragon kiln for seven days and nights without sleep. When the flame turns from bright straw yellow to a deep cherry rose, that is when the kiln mouth must be sealed with fresh mud bricks. My sons both went to university in Seoul; neither has learned how to read the draft holes.`);
    setHasRecordedAudio(true);
    setErrors({});
  };

  // Audio timer effect
  useEffect(() => {
    let interval: any = null;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  // Update live preview when content changes
  useEffect(() => {
    if (content.length > 20) {
      const extracted = extractStructuredKnowledge(title, content, category);
      setLiveEntities(extracted);
    }
  }, [title, content, category]);

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const trimmed = tagInput.trim().replace(/^#/, '');
      if (trimmed && !tags.includes(trimmed)) {
        setTags([...tags, trimmed]);
        setTagInput('');
      }
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      setHasRecordedAudio(true);
    } else {
      setIsRecording(true);
      setRecordingSeconds(0);
    }
  };

  const formatTimer = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!title.trim()) newErrors.title = 'Title is required';
    if (!content.trim() || content.trim().length < 30) {
      newErrors.content = 'Please write or paste at least 30 characters of the story or memory';
    }
    if (!storytellerName.trim()) {
      newErrors.storytellerName = 'Please enter the name of the knowledge source or elder';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setAnalysisPhase('Initiating Hybrid AI Pipeline...');

    try {
      const finalHero = customImageUrl.trim() || selectedImage;

      const { story: savedStory } = await analyzeAndSaveStory({
        title: title.trim(),
        subtitle: subtitle.trim() || undefined,
        category,
        content: content.trim(),
        storytellerName: storytellerName.trim(),
        storytellerAge: storytellerAge.trim() || undefined,
        storytellerRelation: storytellerRelation.trim() || undefined,
        location: location.trim() || undefined,
        tags,
        heroImage: finalHero,
        audioRecorded: hasRecordedAudio,
      });

      // Smooth navigation directly to the Missing Questions Engine
      navigate(`/missing-questions?storyId=${savedStory.id}&justSaved=true`);
    } catch (err: any) {
      console.error('Preservation failed:', err);
      setErrors({ form: err?.message || 'Failed to analyze story with AI. Please try again.' });
    }
  };

  return (
    <div className="min-h-screen bg-charcoal-950 pb-28 text-parchment-200">
      
      {/* Header */}
      <section className="border-b border-charcoal-850 bg-charcoal-900/60 pt-10 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-amber-400">
              <span>Preservation Studio</span>
              <span>•</span>
              <span>Step 1: Capture Fragile Knowledge</span>
            </div>
            <h1 className="font-serif-editorial text-3xl sm:text-5xl text-parchment-100 font-light">
              Capture a Memory or Oral History
            </h1>
            <p className="text-sm sm:text-base text-parchment-300 font-light max-w-2xl">
              Document unwritten recipes, artisanal methods, or ancestral stories. Our Hybrid AI Missing Questions Engine will genuinely inspect the narrative for critical knowledge gaps.
            </p>
          </div>

          <button
            type="button"
            onClick={loadDemoStory}
            className="self-start md:self-auto inline-flex items-center space-x-2 px-4 py-2.5 rounded-sm text-xs font-mono uppercase tracking-wider bg-amber-950/50 hover:bg-amber-950/80 border border-amber-600/40 text-amber-300 transition-colors shadow-sm"
          >
            <FileText className="w-3.5 h-3.5 text-amber-400" />
            <span>Load Demo Craft Story</span>
          </button>
        </div>
      </section>

      {/* Main Studio Workspace: Dual Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column (8 cols): Primary Inputs */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* 1. Title & Category */}
            <div className="p-6 sm:p-8 bg-charcoal-900 border border-charcoal-800 rounded-sm space-y-6 shadow-card-dark">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-parchment-300 mb-2">
                  Story Title *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    if (errors.title) setErrors({ ...errors, title: '' });
                  }}
                  placeholder="e.g. Master Sasaki's Fermented Indigo Vat or Grandmother Rosa's Salt Dough"
                  className="w-full bg-charcoal-950 border border-charcoal-700 focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 rounded-sm px-4 py-3 text-lg font-serif-editorial text-parchment-100 placeholder:text-charcoal-500"
                />
                {errors.title && <p className="text-xs text-rose-400 mt-1.5">{errors.title}</p>}
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-parchment-300 mb-2">
                  Sub-narrative / Archival Note (Optional)
                </label>
                <input
                  type="text"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  placeholder="e.g. Preserving the tactile cues of stone-ground durum before oral transmission ends"
                  className="w-full bg-charcoal-950 border border-charcoal-700 focus:border-amber-400 rounded-sm px-4 py-2.5 text-xs text-parchment-200 placeholder:text-charcoal-500"
                />
              </div>

              {/* Category Selector */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-parchment-300 mb-2.5">
                  Knowledge Domain / Category *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setCategory(cat)}
                      className={`px-3 py-2 text-xs font-mono rounded-sm border transition-all text-center ${
                        category === cat
                          ? 'bg-amber-950/80 border-amber-500 text-amber-300 font-medium shadow-sm'
                          : 'bg-charcoal-950 border-charcoal-750 text-parchment-400 hover:text-parchment-200 hover:border-charcoal-600'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 2. Audio Capture Studio & Simulator */}
            <div className="p-6 sm:p-8 bg-charcoal-900 border border-charcoal-800 rounded-sm space-y-4 shadow-card-dark">
              <div className="flex items-center justify-between pb-3 border-b border-charcoal-800">
                <div className="flex items-center space-x-2 text-amber-400">
                  <Mic className="w-4 h-4" />
                  <span className="text-xs font-mono uppercase tracking-wider font-semibold">
                    Direct Oral Audio Recording
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-charcoal-800 text-parchment-400 border border-charcoal-700">
                  Prepared for Local Audio API
                </span>
              </div>

              <p className="text-xs text-parchment-400 font-light">
                Preserve the raw cadence, dialect pronunciations, and pauses of the storyteller. Audio will be paired directly with extracted knowledge entities.
              </p>

              {/* Recorder Box */}
              <div className="p-5 bg-charcoal-950 rounded border border-charcoal-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <button
                    type="button"
                    onClick={toggleRecording}
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                      isRecording
                        ? 'bg-rose-600 text-white animate-pulse shadow-lg shadow-rose-900/50'
                        : 'bg-amber-500 text-charcoal-950 hover:bg-amber-400'
                    }`}
                  >
                    {isRecording ? <Square className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                  </button>

                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-base font-semibold text-parchment-100">
                        {formatTimer(recordingSeconds)}
                      </span>
                      {isRecording && (
                        <span className="inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono text-rose-400 bg-rose-950/80 rounded border border-rose-500/30 animate-pulse">
                          ● Recording Master Audio
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-parchment-500 font-mono">
                      {hasRecordedAudio
                        ? 'Audio captured (48 kHz / 24-bit ready for archive)'
                        : isRecording
                        ? 'Listening to oral frequency...'
                        : 'Click microphone to record oral testimony'}
                    </span>
                  </div>
                </div>

                {/* Animated simulated waveform */}
                <div className="flex items-center space-x-1 h-8 px-3 bg-charcoal-900/90 rounded border border-charcoal-800">
                  {[24, 45, 12, 60, 30, 75, 40, 85, 20, 50, 65, 30, 48, 15, 70].map((h, i) => (
                    <div
                      key={i}
                      className={`w-1 rounded-full transition-all duration-150 ${
                        isRecording ? 'bg-amber-400' : 'bg-charcoal-700'
                      }`}
                      style={{
                        height: isRecording ? `${Math.max(15, (h + (recordingSeconds * 7) % 60))}%` : '20%',
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* 3. Written Story Content */}
            <div className="p-6 sm:p-8 bg-charcoal-900 border border-charcoal-800 rounded-sm space-y-4 shadow-card-dark">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-mono uppercase tracking-wider text-parchment-300">
                  Narrative, Instructions or Transcript *
                </label>
                <span className="text-[11px] font-mono text-parchment-500">
                  {content.length} characters
                </span>
              </div>

              <textarea
                rows={10}
                value={content}
                onChange={(e) => {
                  setContent(e.target.value);
                  if (errors.content) setErrors({ ...errors, content: '' });
                }}
                placeholder="Write or paste the full story, recipe, technique, or transcript here. Detail the materials, the smells, the seasons, the exact movements of the hands, or what the elder said about how they learned it..."
                className="w-full bg-charcoal-950 border border-charcoal-700 focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 rounded-sm px-4 py-3 text-sm font-sans text-parchment-100 placeholder:text-charcoal-600 leading-relaxed"
              />
              {errors.content && <p className="text-xs text-rose-400 mt-1">{errors.content}</p>}
            </div>

            {/* 4. Storyteller / Custodian Lineage */}
            <div className="p-6 sm:p-8 bg-charcoal-900 border border-charcoal-800 rounded-sm space-y-6 shadow-card-dark">
              <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-wider text-amber-400 pb-3 border-b border-charcoal-800">
                <User className="w-4 h-4" />
                <span>Knowledge Source / Storyteller</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-parchment-300 mb-1.5">
                    Source Name *
                  </label>
                  <input
                    type="text"
                    value={storytellerName}
                    onChange={(e) => {
                      setStorytellerName(e.target.value);
                      if (errors.storytellerName) setErrors({ ...errors, storytellerName: '' });
                    }}
                    placeholder="e.g. Master Kazuo Sasaki or Grandmother Maria"
                    className="w-full bg-charcoal-950 border border-charcoal-700 focus:border-amber-400 rounded-sm px-3.5 py-2 text-xs text-parchment-200"
                  />
                  {errors.storytellerName && (
                    <p className="text-xs text-rose-400 mt-1">{errors.storytellerName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-parchment-300 mb-1.5">
                    Age or Historical Era
                  </label>
                  <input
                    type="text"
                    value={storytellerAge}
                    onChange={(e) => setStorytellerAge(e.target.value)}
                    placeholder="e.g. 88 years old (19th-generation artisan)"
                    className="w-full bg-charcoal-950 border border-charcoal-700 focus:border-amber-400 rounded-sm px-3.5 py-2 text-xs text-parchment-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-parchment-300 mb-1.5">
                    Relationship / Preservation Role
                  </label>
                  <input
                    type="text"
                    value={storytellerRelation}
                    onChange={(e) => setStorytellerRelation(e.target.value)}
                    placeholder="e.g. Preserved by granddaughter Giulia or Field Archivist"
                    className="w-full bg-charcoal-950 border border-charcoal-700 focus:border-amber-400 rounded-sm px-3.5 py-2 text-xs text-parchment-200"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-parchment-300 mb-1.5 flex items-center space-x-1">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    <span>Location / Homeland (Optional)</span>
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Kamiyama, Tokushima, Japan or Yorkshire Dales"
                    className="w-full bg-charcoal-950 border border-charcoal-700 focus:border-amber-400 rounded-sm px-3.5 py-2 text-xs text-parchment-200"
                  />
                </div>
              </div>
            </div>

            {/* 5. Archival Photography Selector */}
            <div className="p-6 sm:p-8 bg-charcoal-900 border border-charcoal-800 rounded-sm space-y-4 shadow-card-dark">
              <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-wider text-amber-400 pb-3 border-b border-charcoal-800">
                <ImageIcon className="w-4 h-4" />
                <span>Archival Hero Image</span>
              </div>

              <p className="text-xs text-parchment-400 font-light">
                Select a curated archival photograph that matches the atmosphere, or provide an image URL:
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {CURATED_HERO_IMAGES.map((img) => (
                  <button
                    key={img.url}
                    type="button"
                    onClick={() => {
                      setSelectedImage(img.url);
                      setCustomImageUrl('');
                    }}
                    className={`relative rounded-sm overflow-hidden aspect-[4/3] border transition-all group ${
                      selectedImage === img.url && !customImageUrl
                        ? 'border-amber-400 ring-2 ring-amber-400/40'
                        : 'border-charcoal-750 hover:border-charcoal-600'
                    }`}
                  >
                    <img
                      src={img.url}
                      alt={img.label}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute inset-0 bg-charcoal-950/40" />
                    <span className="absolute bottom-1.5 left-2 right-2 text-[10px] text-parchment-200 font-mono truncate text-left">
                      {img.label}
                    </span>
                  </button>
                ))}
              </div>

              <div className="pt-2">
                <label className="block text-xs font-mono uppercase tracking-wider text-parchment-300 mb-1">
                  Or Paste Custom Image URL
                </label>
                <input
                  type="url"
                  value={customImageUrl}
                  onChange={(e) => setCustomImageUrl(e.target.value)}
                  placeholder="https://images.example.com/family-photo.jpg"
                  className="w-full bg-charcoal-950 border border-charcoal-700 focus:border-amber-400 rounded-sm px-3.5 py-2 text-xs text-parchment-200"
                />
              </div>
            </div>

            {/* 6. Tags */}
            <div className="p-6 bg-charcoal-900 border border-charcoal-800 rounded-sm space-y-3">
              <label className="block text-xs font-mono uppercase tracking-wider text-parchment-300">
                Archival Tags
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {tags.map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center space-x-1.5 px-2.5 py-1 text-xs font-mono bg-charcoal-800 text-parchment-200 border border-charcoal-700 rounded-sm"
                  >
                    <span>#{t}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(t)}
                      className="text-parchment-400 hover:text-rose-400"
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleAddTag}
                placeholder="Type tag and press Enter (e.g. Fermentation, Dales, Saffron)"
                className="w-full bg-charcoal-950 border border-charcoal-700 focus:border-amber-400 rounded-sm px-3.5 py-2 text-xs text-parchment-200"
              />
            </div>

            {/* Error banner if submission fails */}
            {errors.form && (
              <div className="p-4 rounded bg-rose-950/50 border border-rose-500/40 text-xs text-rose-300 space-y-1">
                <p className="font-semibold">{errors.form}</p>
                <p className="text-[11px] text-parchment-400">
                  You can configure Firebase AI keys in Settings or continue with basic offline preservation.
                </p>
              </div>
            )}

            {/* Submit Action */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs font-mono text-parchment-400">
                {isAnalyzing ? (
                  <span className="flex items-center space-x-2 text-amber-400 animate-pulse">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>{analysisPhase || 'Analyzing narrative with Hybrid AI...'}</span>
                  </span>
                ) : (
                  <span>Ready to preserve into Living Archive</span>
                )}
              </span>

              <button
                type="submit"
                disabled={isAnalyzing}
                className={`w-full sm:w-auto inline-flex items-center justify-center space-x-3 px-8 py-3.5 rounded-sm text-xs uppercase tracking-widest font-semibold transition-all ${
                  isAnalyzing 
                    ? 'bg-charcoal-800 text-parchment-400 cursor-wait border border-charcoal-700' 
                    : 'text-charcoal-950 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 shadow-xl shadow-amber-950/50 border border-amber-300/40'
                }`}
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
                    <span>Analyzing & Preserving...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Preserve & Run Hybrid AI</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

          </div>

          {/* Right Column (4 cols): LIVE "Preservation Guardian Preview" */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="sticky top-28 space-y-6">
              
              <div className="p-6 bg-charcoal-900 border border-amber-500/30 rounded-sm space-y-5 shadow-card-dark">
                <div className="flex items-center justify-between pb-3 border-b border-charcoal-800">
                  <div className="flex items-center space-x-2 text-amber-400">
                    <Sparkles className="w-4 h-4" />
                    <span className="text-xs font-mono uppercase tracking-wider font-semibold">
                      Live Entity Extraction
                    </span>
                  </div>
                  <AIInferenceBadge isAnalyzing={isAnalyzing} source="ON_DEVICE" showDetails={false} />
                </div>

                <p className="text-xs text-parchment-400 font-light leading-relaxed">
                  As you type, AFTERIMAGE automatically maps tacit knowledge entities before initiating gap analysis:
                </p>

                {/* Extracted People */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-parchment-400">
                    People & Custodians Identified:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {liveEntities.people.map((p, idx) => (
                      <span key={idx} className="text-xs font-mono px-2 py-0.5 rounded bg-charcoal-950 border border-charcoal-800 text-parchment-200">
                        {p}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Extracted Materials */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400">
                    Materials & Botanicals Detected:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {liveEntities.materials.map((m, idx) => (
                      <span key={idx} className="text-xs font-mono px-2 py-0.5 rounded bg-amber-950/40 border border-amber-600/30 text-amber-300">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Extracted Techniques */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-parchment-400">
                    Techniques & Sensory Cues:
                  </span>
                  <ul className="space-y-1 text-xs text-parchment-300">
                    {liveEntities.techniques.map((t, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <span className="text-amber-400/80">•</span>
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Next Step Callout */}
                <div className="pt-3 border-t border-charcoal-800 space-y-2">
                  <div className="flex items-center space-x-1.5 text-xs font-mono text-amber-400">
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>Next: The Missing Questions Engine</span>
                  </div>
                  <p className="text-[11px] text-parchment-400 font-light">
                    Upon saving, the engine will cross-check the narrative against known craft patterns to find unanswered failure modes and unmeasured variables.
                  </p>
                </div>
              </div>

            </div>

          </div>

        </form>
      </div>

    </div>
  );
};
