import { Story } from '../types';

export const INITIAL_STORIES: Story[] = [
  {
    id: 'story-indigo-tokushima',
    title: 'The Indigo Fermentation of Tokushima: The Smell of Living Blue',
    subtitle: 'Preserving the unwritten sensory cues of natural sukumo vats before the 19th-generation masters retire.',
    category: 'Crafts',
    content: `In the small valley of Kamiyama in Tokushima Prefecture, master Kazuo Sasaki (88) stirs the deep earthenware vat before the morning mist lifts from the Yoshino River.

"You cannot use a thermometer for sukumo," Sasaki-san tells us, his fingertips dyed a dark, permanent ultramarine. "The vat is a breathing belly. When the microbes wake up, the foam smells like freshly cut autumn grass and toasted wheat. If it smells sharp or vinegary, it has caught a chill."

Natural Japanese indigo (Aizome) does not dissolve in water. It requires a living fermentation of fermented polygonum tinctorium leaves (sukumo), high-alkaline wood ash lye (aku), wheat bran, and sake dregs. Every morning at 5:30 AM, Sasaki-san checks the "flower" (the purple froth floating on the surface). He dips two fingers, licks the foam, and listens to the subtle effervescence.

"Modern factories add sodium hydrosulfite to reduce the indigo in twenty minutes," he sighs. "That indigo dies on the thread in ten years. Living fermented indigo repels insects, strengthens the cotton hemp fibers, and deepens in luster for two hundred years. But my grandson works in software in Osaka. There are only four masters left in our prefecture who know how to brew the winter ash lye."`,
    summary: 'Master Kazuo Sasaki preserves the 400-year-old living fermentation techniques of Tokushima sukumo indigo, relying on taste, aroma, and wood ash lye rather than industrial chemicals.',
    storyteller: {
      name: 'Kazuo Sasaki',
      ageOrEra: '88 years old (19th-generation Aizome Dyer)',
      relation: 'Preserved via oral interview by Haruki Tanaka',
      location: 'Kamiyama, Tokushima, Japan',
      avatarUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=400&q=80',
    },
    location: 'Kamiyama, Tokushima Prefecture, Japan',
    period: 'Technique practiced continuously since 1620 (Edo Era)',
    tags: ['Aizome', 'Natural Dyeing', 'Fermentation', 'Textiles', 'Edo Heritage', 'Vanishing Craft'],
    heroImage: 'https://images.unsplash.com/photo-1606744888344-493238955de0?auto=format&fit=crop&w=1400&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80',
    ],
    audioRecording: {
      duration: '42:15',
      sampleRate: '96 kHz / 24-bit PCM',
      recordedAt: '2026-04-18',
      status: 'transcribed',
    },
    extractedKnowledge: {
      people: ['Kazuo Sasaki (Master Dyer)', 'Tokushima Aizome Guild Elders', 'Kamiyama Village Woodcutters'],
      materials: [
        'Sukumo (fermented Polygonum tinctorium leaves)',
        'Hon-yama hardwood ash lye (Aku)',
        'Unpasteurized sake lees (Sake kasu)',
        'Wheat bran (Fusuma)',
        'Yoshino river well water'
      ],
      techniques: [
        'Sensory foam evaluation (smell of cut grass vs vinegar)',
        'Graduated ash lye temperature staging (first, second, third brewings)',
        'Hand-aeration stroke without introducing micro-bubbles',
        'Winter vat burial in cedar sawdust for warmth conservation'
      ],
      culturalContext: [
        'Tokushima feudal indigo monopoly during Edo Period',
        'Traditional protective garments for samurai and firefighters due to flame and insect repellency'
      ],
      timePeriod: 'Edo Period (1603-1867) to present day'
    },
    missingQuestions: [
      {
        id: 'q-indigo-1',
        storyId: 'story-indigo-tokushima',
        question: 'Which specific native hardwood species are burned for the lye, and what season must the wood be felled?',
        whyItMatters: 'Different wood species alter the pH and mineral salinity. Modern ash causes vat spoilage within two weeks if the mineral balance is incorrect.',
        category: 'Material Source',
        importance: 'Urgent',
        answered: false,
        suggestedPromptForInterview: '"Sasaki-san, if someone had to gather the wood for the lye today, which exact trees on the mountain did your father tell you never to touch, and which ones gave the sweet lye?"'
      },
      {
        id: 'q-indigo-2',
        storyId: 'story-indigo-tokushima',
        question: 'What is the precise sensory threshold when tasting the foam that signals the need to add more sake dregs versus limestone powder?',
        whyItMatters: 'The balance between acidity and alkalinity is maintained by tongue sensation; without documented criteria, apprentices cannot balance living vats.',
        category: 'Technique Detail',
        importance: 'Urgent',
        answered: true,
        answerText: 'Sasaki-san confirmed: if the tongue feels a sharp prickle like unripe persimmon, it needs a handful of slaked lime. If it feels sweet and slippery like silk broth, add warm sake lees to feed the bacteria.',
        answeredAt: '2026-05-02',
        answeredBy: 'Haruki Tanaka (Archivist)',
        suggestedPromptForInterview: '"When you touch the foam to your lips, describe the exact sensation on the sides of your tongue."'
      },
      {
        id: 'q-indigo-3',
        storyId: 'story-indigo-tokushima',
        question: 'How deep into the earthen floor must the vat be submerged during the frost months of January?',
        whyItMatters: 'Geothermal insulation keeps the bacterial colonies from going dormant in mountain winters.',
        category: 'Lost Step',
        importance: 'High',
        answered: false,
        suggestedPromptForInterview: '"When your father built the winter chamber in 1948, how many shaku deep did he dig into the clay bed?"'
      },
      {
        id: 'q-indigo-4',
        storyId: 'story-indigo-tokushima',
        question: 'What were the rhythmic work songs (Ai-fumi uta) sung while treading the fermenting leaves, and did the tempo dictate the turning speed?',
        whyItMatters: 'Traditional work songs often functioned as precision auditory timers before wristwatches or digital stopwatches existed.',
        category: 'Cultural Origin',
        importance: 'Reflective',
        answered: false,
        suggestedPromptForInterview: '"Do you remember the song your mother hummed when the four workers turned the pile together at dawn?"'
      }
    ],
    preservationDate: '2026-04-20',
    preservationScore: 78,
    isFeatured: true,
    verificationStatus: 'AI Extracted'
  },
  {
    id: 'story-sicilian-bread',
    title: "Nonni Rosaria's Saffron Easter Bread (U Zuccaro) Without Measurements",
    subtitle: 'Deciphering the touch-based ancestral baking rituals of the Iblei Mountains before handwritten notes fade.',
    category: 'Recipes',
    content: `In the hillside town of Modica Alta, Sicily, Rosaria Calvino (91) has made "U Zuccaro" every Holy Thursday since 1944. There is no written recipe. There are no scales or measuring cups in her stone scullery.

"You measure with your palm and the hollow of your wrist," Nonna Rosaria says, flour dusting the deep creases around her eyes. "My mother Carmela learned it from the nuns of San Benedetto before the monastery roof fell."

She uses ancient Russello and Timilia stone-ground durum grains, soaked saffron stigmas gathered from the wild limestone slopes, and a wild fennel seed tea. The dough is not mixed in a metal bowl; it is beaten inside a handmade beechwood trough (la madia) until "it sighs like a sleeping child" — small pockets of trapped fermentation air that softly pop under the palm.

"If the sirocco wind is blowing from Africa, the dough needs three more prayers of kneading," she explains. "If the tramontana wind comes from the north, you wrap the madia in two wool blankets from my wedding dowry."`,
    summary: 'A 90-year-old Sicilian grandmother bakes ritual Easter bread guided entirely by sensory intuition, microclimate wind shifts, and ancestral dough-kneading cues.',
    storyteller: {
      name: 'Rosaria Calvino',
      ageOrEra: '91 years old (Matriarch)',
      relation: 'Preserved by granddaughter Giulia Vizzini',
      location: 'Modica Alta, Sicily, Italy',
      avatarUrl: 'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?auto=format&fit=crop&w=400&q=80',
    },
    location: 'Modica Alta, Val di Noto, Sicily',
    period: 'Passed orally since late 18th century',
    tags: ['Ancient Grains', 'Sicilian Heritage', 'Oral Recipe', 'Fermentation', 'Folk Tradition', 'Vanishing Foodways'],
    heroImage: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1400&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?auto=format&fit=crop&w=800&q=80',
    ],
    audioRecording: {
      duration: '34:50',
      sampleRate: '48 kHz / 24-bit',
      recordedAt: '2026-03-29',
      status: 'transcribed',
    },
    extractedKnowledge: {
      people: ['Rosaria Calvino', 'Carmela Calvino (mother)', 'Benedictine Nuns of San Benedetto'],
      materials: [
        'Russello stone-ground durum flour',
        'Timilia whole heritage wheat',
        'Wild Iblei mountain saffron threads',
        'Wild mountain fennel seeds (semi di finocchietto selvatico)',
        'Olive wood embers for hearth baking',
        'Beechwood kneading trough (Madia)'
      ],
      techniques: [
        'Aural dough test: listening for the "sigh" (respiro della pasta)',
        'Atmospheric compensation: sirocco wind adjustment vs tramontana north wind',
        'Saffron extraction via warm sheep whey rather than plain water',
        'Dowry wool blanket thermal insulation during bulk proofing'
      ],
      culturalContext: [
        'Holy Week Easter ritual symbolism in Baroque Sicily',
        'Oral resistance to industrial grain standardized milling'
      ],
      timePeriod: '1800s - present'
    },
    missingQuestions: [
      {
        id: 'q-bread-1',
        storyId: 'story-sicilian-bread',
        question: 'What is the exact botanical stage of the wild fennel seed: is it harvested fresh green in late autumn, or sun-dried on flat terra cotta tiles?',
        whyItMatters: 'Green fennel seeds contain volatile essential oils that will turn bitter in long yeast ferments, whereas sun-dried seeds provide sweet anethole.',
        category: 'Material Source',
        importance: 'Urgent',
        answered: false,
        suggestedPromptForInterview: '"Nonna, when you and Carmela picked the fennel behind the church, were the flower heads still yellow or already dry and gray?"'
      },
      {
        id: 'q-bread-2',
        storyId: 'story-sicilian-bread',
        question: 'How was the sourdough starter (criscenti) kept alive across harsh winters when no baking took place for weeks?',
        whyItMatters: 'Heritage starters contain unique wild lactobacillus strains native to Modica limestone caves that are completely absent in commercial yeasts.',
        category: 'Lost Step',
        importance: 'High',
        answered: false,
        suggestedPromptForInterview: '"Where in the kitchen cupboard did your mother hide the jar of criscenti when the winter frost arrived?"'
      },
      {
        id: 'q-bread-3',
        storyId: 'story-sicilian-bread',
        question: 'Why did the nuns specify sheep whey instead of goat or cow milk for steeping the saffron?',
        whyItMatters: 'Sheep milk whey contains high butterfat content that acts as an emulsion vehicle for fat-soluble crocin carotenoids in saffron.',
        category: 'Technique Detail',
        importance: 'Reflective',
        answered: true,
        answerText: 'Nonni explained that cow milk was too sweet and watered down the saffron color, while goat whey was too acidic and killed the yeast. Sheep whey from the morning ricotta curd had the exact richness.',
        answeredAt: '2026-04-05',
        answeredBy: 'Giulia Vizzini',
        suggestedPromptForInterview: '"Why sheep whey, Nonna? Did goat milk ruin the loaf?"'
      }
    ],
    preservationDate: '2026-04-01',
    preservationScore: 82,
    isFeatured: true,
    verificationStatus: 'Archived Permanently'
  },
  {
    id: 'story-dry-stone-yorkshire',
    title: 'The Voice of the Last Dry-Stone Wallers of the Yorkshire Dales',
    subtitle: 'Reading the song of the stone: how 200-year-old gravity boundaries survive without a grain of mortar.',
    category: 'Crafts',
    content: `Along the high limestone scar of Malham in North Yorkshire, Arthur Pendelton (84) fits stones together that were quarried during the Napoleonic wars.

"A good wall has two faces and one heart," Arthur says, resting a calloused hand on a weathered limestone copestone. "The mistake young lads make today with their laser levels is trying to make stone flat. Stone isn't flat. You have to find where it wants to sleep."

Dry stone walling relies entirely on friction, interlocking angles, and a dense central packing of small irregular fragments known as 'hearting'. In a region subject to horizontal gales and freezing rains, a mortared wall cracks in ten winters because water gets trapped inside and freezes. A dry wall lets the wind blow straight through its cracks.

Arthur remembers over sixty dialect words for stone shapes — through-stones, scapplers, crawlers, and wigglers. None of these words appear in modern masonry textbooks.`,
    summary: 'Arthur Pendelton explains the lost acoustic and tactile secrets of dry stone walling in the Yorkshire Dales, where gravity and wind permeability create boundaries that outlast cement.',
    storyteller: {
      name: 'Arthur Pendelton',
      ageOrEra: '84 years old (Master Waller)',
      relation: 'Preserved by the Dales Vernacular Heritage Trust',
      location: 'Malhamdale, North Yorkshire, UK',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    },
    location: 'Yorkshire Dales, England',
    period: 'Tradition dates to 18th-century Enclosure Acts and medieval monastic sheepfolds',
    tags: ['Dry Stone Walling', 'Traditional Masonry', 'Dialect Words', 'Yorkshire', 'Folk Architecture', 'Gravity Structures'],
    heroImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1400&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
    ],
    audioRecording: {
      duration: '56:12',
      sampleRate: '96 kHz / 24-bit',
      recordedAt: '2026-02-14',
      status: 'ready',
    },
    extractedKnowledge: {
      people: ['Arthur Pendelton', 'Three generations of Pendelton wallers', 'Lord Ribblesdale estate quarrymen'],
      materials: [
        'Carboniferous Great Scar limestone',
        'Yoredale sandstone grit',
        'Glacial erratic field boulders',
        'Crushed limestone hearting chips'
      ],
      techniques: [
        'Sound testing: tapping stone with hammer to detect invisible internal fault lines',
        'The "Two-on-One, One-on-Two" bonding rule across wall cheeks',
        'Batter angle incline calculation using weighted string plumb frames',
        'Frost drainage gradient through angled footings'
      ],
      culturalContext: [
        'Parliamentary Enclosure Acts dividing common fell pasture',
        'Vanishing Dales dialect specialized vocabulary for sheep folds and gates'
      ],
      timePeriod: '1750 - Present'
    },
    missingQuestions: [
      {
        id: 'q-stone-1',
        storyId: 'story-dry-stone-yorkshire',
        question: 'What are the definitions and specific spatial functions of the remaining 40 unrecorded dialect stone terms Arthur mentioned?',
        whyItMatters: 'These words contain exact geometric instructions for wall stability that prevent catastrophic shear failures under heavy snow drifts.',
        category: 'Technique Detail',
        importance: 'Urgent',
        answered: false,
        suggestedPromptForInterview: '"Arthur, can we walk down the lane with a voice recorder while you point at each stone and name its shape in dialect?"'
      },
      {
        id: 'q-stone-2',
        storyId: 'story-dry-stone-yorkshire',
        question: 'How do wallers calculate the placement interval of the massive "through-stones" that tie both external faces together across steep gradients?',
        whyItMatters: 'Through-stones bear the lateral hydrostatic soil pressure on hillside slopes; incorrect spacing leads to slope collapse.',
        category: 'Lost Step',
        importance: 'High',
        answered: false,
        suggestedPromptForInterview: '"On the 30-degree incline above the beck, how many paces apart did your grandfather space the through-irons?"'
      }
    ],
    preservationDate: '2026-02-18',
    preservationScore: 71,
    isFeatured: false,
    verificationStatus: 'AI Extracted'
  },
  {
    id: 'story-silbo-gomero',
    title: 'Silbo Gomero: Whistling Across the Ravines of La Gomera',
    subtitle: 'The acoustic linguistics of canyon speech: transmitting syntax across four kilometers of volcanic abyss.',
    category: 'Languages',
    content: `On the Canary Island of La Gomera, the terrain is split by volcanic barrancos — deep ravines where walking to the neighboring ridge takes three hours, but line of sight is only five hundred meters.

Elena Morales (77) can whistle a full news bulletin across the canyon.

"You tuck your index knuckle beneath the tongue, pull the lower lip tight against the canine, and make your mouth an organ pipe," Elena explains. "Silbo is not a code of signals like Morse code. It is the Spanish language whistled: every vowel is a pitch frequency, and every consonant is an interruption or slide."

During the 1950s and 60s, road construction and telephone lines nearly extinguished the language. Elena remembers when mothers whistled to tell sons working in the terraced plots which cow had calved, or warned neighbors when tax collectors were ascending the gorge.

"When afternoon clouds descend into the barranco, the humidity changes how the high notes carry," she notes. "You have to flatten the tone, or the damp air swallows the syllables."`,
    summary: 'Elena Morales preserves the nuances of Silbo Gomero, the whistled language of the Canary Islands, detailing acoustic modulation through microclimate fog.',
    storyteller: {
      name: 'Elena Morales',
      ageOrEra: '77 years old (Silbadora & Teacher)',
      relation: 'Preserved in partnership with Canary Islands Linguistic Heritage',
      location: 'Vallehermoso, La Gomera, Spain',
      avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    },
    location: 'La Gomera, Canary Islands, Spain',
    period: 'Guanche pre-Hispanic origin, adapted to Spanish in the 16th century',
    tags: ['Whistled Languages', 'Linguistics', 'Acoustics', 'Canary Islands', 'Guanche Heritage', 'Oral History'],
    heroImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1400&q=85',
    audioRecording: {
      duration: '28:40',
      sampleRate: '96 kHz / 24-bit',
      recordedAt: '2026-01-10',
      status: 'transcribed',
    },
    extractedKnowledge: {
      people: ['Elena Morales', 'Vallehermoso goatherds', 'Master silbadores of Chipude'],
      materials: [
        'Acoustic resonance of volcanic basalt ravines',
        'Physical anatomy: index finger knuckle, tongue tension, lip closure'
      ],
      techniques: [
        'Vowel pitch mapping: 2 distinct whistled vowels dividing high/low acoustic space',
        'Consonant articulation: 4 pitch transitions (continuous vs interrupted, ascending vs descending)',
        'Atmospheric dampening compensation: lowering fundamental frequency in heavy sea mists'
      ],
      culturalContext: [
        'Pre-colonial Guanche whistle survival through centuries of isolation',
        'Communication network during sudden forest fires and emergency medical summons'
      ],
      timePeriod: 'Pre-15th century to present day'
    },
    missingQuestions: [
      {
        id: 'q-silbo-1',
        storyId: 'story-silbo-gomero',
        question: 'Were there gender-specific whistled nicknames or private family frequencies that outside listeners in the canyon could not decode?',
        whyItMatters: 'In open acoustic environments, privacy was maintained through coded phonetic substitutions that have never been formally documented.',
        category: 'Cultural Origin',
        importance: 'High',
        answered: false,
        suggestedPromptForInterview: '"Elena, when you whistled something you didn\'t want the whole valley to overhear, how did you disguise your words?"'
      },
      {
        id: 'q-silbo-2',
        storyId: 'story-silbo-gomero',
        question: 'What exercises were taught to children whose natural dental anatomy made traditional knuckle whistling difficult?',
        whyItMatters: 'Preservation initiatives in local schools struggle with teaching children who cannot produce the required 110-decibel sound pressure.',
        category: 'Technique Detail',
        importance: 'Reflective',
        answered: true,
        answerText: 'Elena demonstrated the two-finger flat pinch used by children without strong upper incisors, which relies on curling the tongue tip backwards against the hard palate.',
        answeredAt: '2026-02-01',
        answeredBy: 'Linguistic Heritage Team',
        suggestedPromptForInterview: '"How did your grandfather teach kids who were missing front teeth?"'
      }
    ],
    preservationDate: '2026-01-15',
    preservationScore: 85,
    isFeatured: false,
    verificationStatus: 'Archived Permanently'
  },
  {
    id: 'story-telemark-lute',
    title: 'Grandfather’s Hand-Carved Lute Bracing and the Resonance of Ancient Spruce',
    subtitle: 'Harvesting resonant wood by moonlight: the acoustics of 300-year-old Norwegian Telemark hardingfele.',
    category: 'Family Knowledge',
    content: `In the deep pine and spruce forests of Telemark, Norway, Henrik Lindqvist (79) carves the delicate internal soundboard braces for the Hardanger fiddle (Hardingfele).

"You cannot buy tone wood from a lumber yard catalogue," Henrik says, running his thumb over a razor-sharp miniature gouge. "My grandfather took me up the northern granite cliffs in November. You look for trees that grew in starved soil where the annual rings are so tight they look like the pages of a Bible. And you fell the tree only when the sap has retreated down into the bedrock roots."

Henrik tunes the top soundboard by holding the carved spruce plate by the upper node point and tapping it with the knuckle of his middle finger. He listens not to the initial click, but to the lingering overtone hum that dies away in the workshop silence.

"If the bell tone hums between an F-sharp and a G, the fiddle will sing in the low register when the dancer stamps his boots on the barn floor. If it hums higher, it will scream like an owl."`,
    summary: 'Henrik Lindqvist details the acoustic woodcraft, sap cycles, and tap-tone frequencies behind hand-carved Norwegian Hardanger fiddles.',
    storyteller: {
      name: 'Henrik Lindqvist',
      ageOrEra: '79 years old (Luthier)',
      relation: 'Preserved by son Erik Lindqvist',
      location: 'Notodden, Telemark, Norway',
      avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
    },
    location: 'Telemark, Norway',
    period: 'Tradition spanning 5 generations of village instrument makers',
    tags: ['Luthier', 'Acoustic Woodcraft', 'Hardanger Fiddle', 'Norwegian Heritage', 'Sound Physics', 'Living Tradition'],
    heroImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1400&q=85',
    audioRecording: {
      duration: '39:10',
      sampleRate: '96 kHz / 24-bit',
      recordedAt: '2026-03-04',
      status: 'ready',
    },
    extractedKnowledge: {
      people: ['Henrik Lindqvist', 'Olav Lindqvist (grandfather)', 'Telemark folk fiddlers'],
      materials: [
        'Slow-growth North-slope Norway spruce (Picea abies)',
        'Mountain curly birch (Flammebjørk)',
        'Boiled bone glue from reindeer hoof cartilage',
        'Raw amber melted in linseed oil varnish'
      ],
      techniques: [
        'Moon-phase winter felling during lowest sap moisture content',
        'Plate tap-tone acoustic tuning to F# / G overtone resonance',
        'Graduated thickness graduation: 2.2mm at sound holes tapering to 3.8mm at arch apex',
        'Reversible hot hide glue joints for instrument longevity'
      ],
      culturalContext: [
        'Traditional Norwegian wedding ceremonies and spring dance festivals',
        'Myths of the Fossegrim waterfall spirit teaching fiddle playing'
      ],
      timePeriod: '1850s to present'
    },
    missingQuestions: [
      {
        id: 'q-lute-1',
        storyId: 'story-telemark-lute',
        question: 'What is the exact ratio of reindeer hoof bone glue to water to ensure the soundboard can be disassembled 80 years later for repair without fracturing the spruce?',
        whyItMatters: 'Modern synthetic glues permanently ruin acoustic instruments because they cannot be cleanly softened with gentle steam.',
        category: 'Technique Detail',
        importance: 'Urgent',
        answered: false,
        suggestedPromptForInterview: '"Henrik, when you boil the glue pot on the stove, how do you test the thickness between your thumb and finger?"'
      },
      {
        id: 'q-lute-2',
        storyId: 'story-telemark-lute',
        question: 'How did his grandfather identify internal rot in a standing mountain spruce before putting the saw to the trunk?',
        whyItMatters: 'Prevents the unnecessary felling of centuries-old ancient growth trees that cannot be used for soundboards.',
        category: 'Lost Step',
        importance: 'High',
        answered: false,
        suggestedPromptForInterview: '"Did Olav strike the bark with an axe poll to hear the hollow echo, or did he read the resin beads on the bark?"'
      }
    ],
    preservationDate: '2026-03-08',
    preservationScore: 76,
    isFeatured: false,
    verificationStatus: 'Local Draft'
  }
];
