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
      }
    ],
    preservationDate: '2026-05-01',
    preservationScore: 78,
    isFeatured: true,
    verificationStatus: 'Archived Permanently'
  },
  {
    id: 'story-sicilian-bread',
    title: 'The Saffron Loaf of Enna: Storing Yeast in Wild Olive Leaves',
    subtitle: 'A medieval Easter grain tradition preserved by the women of central Sicily across 700 years.',
    category: 'Recipes',
    content: `In the hilltop fortress city of Enna in Sicily, 91-year-old Nonna Rosa Alessi wakes at three in the morning during Holy Week. She does not buy commercial baker's yeast. In her cool stone pantry, she unwraps a linen bundle containing wild olive leaves gathered before the first autumn rains.

"My great-grandmother told me: the olive tree carries the breath of the mountain," Rosa whispers, sifting stone-ground Timilia durum wheat into a carved wooden trough (madia). "We steep the dried olive leaves in rainwater and spring honey. After three days, it bubbles like young wine. That is the sourdough starter."

The dough is kneaded with mountain spring saffron harvested from Monte Altesina. It takes four women taking turns with rhythmic forearm pushes for over an hour. When shaped into braided crowns representing the crown of thorns, it rises in a straw basket under sheep's wool blankets for nine hours.

"Baking it with almond shells in a wood-fired stone oven gives the crust its dark bronze glaze," Nonna Rosa explains. "Today young people buy instant dry yeast in plastic packets. They do not know that the olive leaf gave the bread its sour, herbal heart that kept it moist for twenty days on shepherd journeys."`,
    summary: 'Nonna Rosa Alessi documents the rare technique of fermenting durum sourdough starters using wild olive leaves and honey, keeping heirloom Timilia loaves fresh for weeks.',
    storyteller: {
      name: 'Rosa Alessi',
      ageOrEra: '91 years old',
      relation: 'Preserved by granddaughter Chiara Alessi',
      location: 'Enna, Sicily, Italy',
      avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    },
    location: 'Enna, Sicily, Italy',
    period: 'Tradition documented from 14th-century Norman-Sicilian monastic archives',
    tags: ['Ancient Grains', 'Timilia Wheat', 'Wild Fermentation', 'Baking', 'Sicilian Heritage'],
    heroImage: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1400&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?auto=format&fit=crop&w=800&q=80'
    ],
    audioRecording: {
      duration: '31:40',
      sampleRate: '48 kHz / 24-bit',
      recordedAt: '2026-03-29',
      status: 'transcribed',
    },
    extractedKnowledge: {
      people: ['Rosa Alessi', 'Enna Village Matriarchs', 'Madia Woodcarvers'],
      materials: [
        'Heirloom Timilia ancient durum flour',
        'Dried wild olive leaves (Olea europaea var. sylvestris)',
        'Wild thistle flower honey',
        'Monte Altesina mountain saffron'
      ],
      techniques: [
        'Wild leaf yeast extraction in cold spring water and raw honey',
        'Wooden trough (Madia) micro-climate seasoning without chemical wash',
        'Wool blanket temperature regulation during slow 9-hour rise'
      ],
      culturalContext: [
        'Sicilian Easter Eucharistic symbolism and agrarian spring renewal',
        'Ancient shepherd provisions for long seasonal transhumance journeys'
      ],
      timePeriod: 'Medieval Sicily (1300s) to present day'
    },
    missingQuestions: [
      {
        id: 'q-bread-1',
        storyId: 'story-sicilian-bread',
        question: 'Which side of the wild olive tree must the leaves be picked from, and does the presence of white lichen alter fermentation speed?',
        whyItMatters: 'Wild epiphytic yeasts vary substantially depending on windward exposure and sunlight, which governs yeast culture viability.',
        category: 'Material Source',
        importance: 'Urgent',
        answered: false,
        suggestedPromptForInterview: '"Nonna Rosa, when you walked into the grove with your mother, did you harvest from the north shade or the south sun?"'
      }
    ],
    preservationDate: '2026-04-02',
    preservationScore: 84,
    isFeatured: true,
    verificationStatus: 'Archived Permanently'
  },
  {
    id: 'story-dry-stone-yorkshire',
    title: 'The Dry Stone Acoustic Grammar of Swaledale',
    subtitle: 'Balancing gravity and limestone fractures without mortar across the windswept Yorkshire Dales.',
    category: 'Crafts',
    content: `George Metcalfe (84) can tell if a stone wall will stand for two centuries merely by rapping the top cope stone with the handle of his walling hammer.

"Mortar is a trap," George says, squinting across the steep green valley of Muker. "Mortar freezes, cracks, and lets water sit. A dry stone wall lets the winter wind blow clean through it. The water drains through the hearting stones without freezing in place."

Dry stone wallers in northern England build field boundaries using only local limestone and millstone grit. The foundational stones (footings) are wedged into the glacial till. Courses taper upward to 'through-stones' that tie the two faces together across the rubble core.

"Every quarry has its own grain," George demonstrates, feeling the cold edge of a rough limestone slab. "You find the bedding plane. If you lay a stone upside down against its natural sedimentary grain, frost will shear it in three winters. You listen to the sound when your mallet strikes: a clear bell means solid stone; a dull thud means an invisible fracture line."`,
    summary: 'Master dry-stone waller George Metcalfe explains the acoustic resonance and sedimentary grain reading required to erect mortarless walls that survive two centuries of sub-zero gales.',
    storyteller: {
      name: 'George Metcalfe',
      ageOrEra: '84 years old (Master Waller)',
      relation: 'Preserved by Yorkshire Dales Heritage Trust',
      location: 'Muker, Swaledale, North Yorkshire, UK',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    },
    location: 'Swaledale, North Yorkshire, England',
    period: 'Enclosure boundaries built from 1650 to Victorian era',
    tags: ['Dry Stone Walling', 'Masonry', 'Vernacular Architecture', 'Acoustic Testing', 'Yorkshire'],
    heroImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1400&q=85',
    audioRecording: {
      duration: '48:02',
      sampleRate: '48 kHz / 24-bit',
      recordedAt: '2026-02-14',
      status: 'transcribed',
    },
    extractedKnowledge: {
      people: ['George Metcalfe', 'Swaledale Wallers Guild', 'Dales Quarrymen'],
      materials: [
        'Carboniferous Great Scar limestone',
        'Millstone grit through-stones',
        'Glacial gravel hearting rubble'
      ],
      techniques: [
        'Hammer tap resonance testing for invisible frost micro-fissures',
        'Sedimentary bedding plane alignment to prevent freeze-thaw lamination',
        'Inward batter angle of one inch per foot of height'
      ],
      culturalContext: [
        'Post-medieval sheep enclosure acts and communal grazing heritage',
        'Windbreak shelter architecture during Pennine blizzards'
      ],
      timePeriod: '17th to 19th Century'
    },
    missingQuestions: [
      {
        id: 'q-stone-1',
        storyId: 'story-dry-stone-yorkshire',
        question: 'What is the precise ratio of large packing stones to crushed hearting gravel inside the core cavity?',
        whyItMatters: 'If the hearting is too fine, sheep rubbing collapses the face; if too large, wind turbulence vibrates the outer skin loose.',
        category: 'Technique Detail',
        importance: 'Urgent',
        answered: false,
        suggestedPromptForInterview: '"George, when you pour the rubble into the middle between the faces, how tightly do you hand-chock the void?"'
      }
    ],
    preservationDate: '2026-02-20',
    preservationScore: 72,
    isFeatured: true,
    verificationStatus: 'Archived Permanently'
  },
  {
    id: 'story-silbo-gomero',
    title: 'The Whistled Canyon Grammar of La Gomera',
    subtitle: 'How shepherds communicate complex sentences across two miles of Atlantic volcanic ravines.',
    category: 'Languages',
    content: `Standing on the edge of the Barranco de Chejelipes on the Canary Island of La Gomera, 79-year-old Don Isidro Mesa puts his bent index finger into his mouth. With his left hand cupped around his cheek, he emits a high-pitched modulation that echoes off the basalt cliffs like birdsong.

Two miles across the chasm, an answering whistle rises from a terraced goat farm.

"Silbo Gomero is not a code of signals," Don Isidro explains. "It is the Spanish language transposed into whistling. We substitute the vowels with high and low acoustic frequencies, and the consonants with melodic pitch breaks and staccato interruptions. I can tell a shepherd across the valley to bring down the brown goat with the torn ear, and he will understand every syllable."

Developed by the indigenous Guanche inhabitants before the Spanish conquest in the 15th century, Silbo Gomero allowed islanders to talk across impassable ravines without walking for four hours down and up canyon trails.`,
    summary: 'Don Isidro Mesa preserves the phonetics, tongue placements, and acoustic canyon reflections of Silbo Gomero, the indigenous whistled language of the Canary Islands.',
    storyteller: {
      name: 'Isidro Mesa',
      ageOrEra: '79 years old',
      relation: 'Preserved by Canary Cultural Custodians',
      location: 'La Gomera, Canary Islands, Spain',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    },
    location: 'La Gomera, Canary Islands, Spain',
    period: 'Pre-Hispanic indigenous Guanche origin (prior to 1400s)',
    tags: ['Acoustic Language', 'Whistled Dialect', 'Canary Islands', 'Guanche Culture', 'Oral History'],
    heroImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1400&q=85',
    audioRecording: {
      duration: '54:12',
      sampleRate: '96 kHz / 24-bit',
      recordedAt: '2026-01-19',
      status: 'transcribed',
    },
    extractedKnowledge: {
      people: ['Isidro Mesa', 'Gomero Goat Herders', 'Island School Custodians'],
      materials: [
        'Natural acoustic finger bracing (single or double knuckle)',
        'Cupped palm resonance chamber',
        'Volcanic canyon wind currents'
      ],
      techniques: [
        'Vowel transposition into two distinct formant pitch registers (high / low)',
        'Consonant modulation using tongue blade damping against the incisors',
        'Wind drift compensation by angling acoustic projection off basalt bluffs'
      ],
      culturalContext: [
        'Ancient Guanche ravine communication and warning alarms during pirate raids',
        'UNESCO Intangible Cultural Heritage of Humanity'
      ],
      timePeriod: 'Pre-15th century to present day'
    },
    missingQuestions: [
      {
        id: 'q-silbo-1',
        storyId: 'story-silbo-gomero',
        question: 'How do whistlers adjust pitch when hot Saharan Calima winds change the air density across the canyon?',
        whyItMatters: 'Dry desert wind alters acoustic transmission speed and muffles high-frequency consonants.',
        category: 'Technique Detail',
        importance: 'Urgent',
        answered: false,
        suggestedPromptForInterview: '"Don Isidro, when the red dust blows from Africa, how do your lips compensate for the thick air?"'
      }
    ],
    preservationDate: '2026-01-25',
    preservationScore: 90,
    isFeatured: true,
    verificationStatus: 'Archived Permanently'
  },
  {
    id: 'story-telemark-lute',
    title: 'The Hardanger Fiddle of Telemark: Carving Sympathetic Strings',
    subtitle: 'The acoustic woodcraft and bone glue chemistry of Norway’s national folk instrument.',
    category: 'Crafts',
    content: `In the snowbound pine forest of Notodden in Telemark, Henrik Lindqvist (82) carves the arch of a Hardanger fiddle soundboard from alpine Norway spruce that fell during a winter blizzard forty years ago.

"The wood must dry for at least thirty winters in a drafty loft," Henrik tells us, holding the translucent shaving of spruce up to the candlelight. "A Hardanger fiddle has four bowed strings, but beneath them lie four or five sympathetic steel strings that hum when the bow strikes the top strings. That hum is the acoustic soul of the mountain."

Unlike standard violins, the Hardanger fiddle has an arched soundboard, mother-of-pearl purfling, and an elaborate lion or dragon head carved into the scroll. The varnish is made by melting raw amber and linseed oil over hot embers.`,
    summary: 'Luthier Henrik Lindqvist documents the rare acoustic plate tuning and pine resin varnishing methods of the Norwegian Hardanger fiddle.',
    storyteller: {
      name: 'Henrik Lindqvist',
      ageOrEra: '82 years old (Master Luthier)',
      relation: 'Preserved by son Erik Lindqvist',
      location: 'Notodden, Telemark, Norway',
      avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
    },
    location: 'Telemark, Norway',
    period: 'Tradition spanning 5 generations of village instrument makers',
    tags: ['Luthier', 'Acoustic Woodcraft', 'Hardanger Fiddle', 'Norwegian Heritage', 'Sound Physics'],
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
        'Graduated thickness graduation: 2.2mm at sound holes tapering to 3.8mm at arch apex'
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
      }
    ],
    preservationDate: '2026-03-08',
    preservationScore: 76,
    isFeatured: false,
    verificationStatus: 'Local Draft'
  },
  {
    id: 'story-echizen-washi',
    title: 'Echizen Washi: River Stone Bark Beating',
    subtitle: 'The 1,500-year-old papermaking technique of Imadate using snowmelt rivers and mulberry bast.',
    category: 'Crafts',
    content: `In the village of Imadate in Fukui Prefecture, 86-year-old Keisuke Yamada stands barefoot in freezing river water.

"Kozo (mulberry) bark cannot be bleached with chlorine," Keisuke explains. "Chlorine eats the cellulose fiber. We lay the stripped inner bark into the icy snowmelt of the Okamoto River. The winter sunlight and running snowmelt naturally bleach the lignin without snapping a single fiber."

After bleaching, the fibers are beaten with heavy oak clubs on river granite for four hours until they form a cloud in a wooden vat of water and tororo-aoi mucilage. Sheets dried on ginkgo wood boards remain pliable for a thousand years.`,
    summary: 'Master Yamada preserves the snowmelt bleaching and wooden vat balancing of Echizen paper, the oldest recorded papermaking tradition in Japan.',
    storyteller: {
      name: 'Keisuke Yamada',
      ageOrEra: '86 years old',
      relation: 'Preserved by Fukui Craft Guild',
      location: 'Imadate, Fukui, Japan',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    },
    location: 'Imadate, Fukui Prefecture, Japan',
    period: 'Recorded continuously since 500 CE',
    tags: ['Washi', 'Papermaking', 'Kozo', 'Snow Bleaching', 'Japanese Craft'],
    heroImage: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1400&q=85',
    extractedKnowledge: {
      people: ['Keisuke Yamada', 'Imadate River Workers'],
      materials: ['Kozo mulberry bast', 'Tororo-aoi hibiscus mucilage', 'Ginkgo drying boards'],
      techniques: ['Sun bleaching in river current', 'Wooden mallet stone beating', 'Single-stroke bamboo screen dipping'],
      culturalContext: ['Imperial Nara period sutra printing and restoration'],
      timePeriod: '6th century to present'
    },
    missingQuestions: [
      {
        id: 'q-washi-1',
        storyId: 'story-echizen-washi',
        question: 'What is the maximum water temperature before the tororo-aoi mucilage breaks down during vat dipping?',
        whyItMatters: 'If the water exceeds 10°C, the viscosity collapses and paper sheets form uneven clumps.',
        category: 'Technique Detail',
        importance: 'Urgent',
        answered: false,
        suggestedPromptForInterview: '"How do you judge the coldness of the vat before adding the root extract?"'
      }
    ],
    preservationDate: '2026-04-12',
    preservationScore: 82,
    isFeatured: true,
    verificationStatus: 'Archived Permanently'
  },
  {
    id: 'story-aleppo-soap',
    title: 'The Cold Cauldrons of Aleppo: Saponifying Laurel Oil',
    subtitle: 'The 3,000-year-old laurel oil soap curing methods passed down through underground vaults.',
    category: 'Crafts',
    content: `In the ancient soap factories of northern Syria, master soapmaker Mahmoud Zanabili (77) pours emerald laurel berry oil into boiling olive oil and wood ash lye.

"Commercial factories cook soap in six hours," Mahmoud explains. "Aleppo soap cooks for three days and three nights in deep stone pits. Then we pour it onto the stone floor, walk across it with wooden planks strapped to our feet, and slice it by hand. It must dry in high brick towers for nine months until the green surface oxidizes into a golden amber crust."`,
    summary: 'The ancient art of cooking olive and wild laurel oil in stone vats and air-curing in desert towers for nine months.',
    storyteller: {
      name: 'Mahmoud Zanabili',
      ageOrEra: '77 years old',
      relation: 'Preserved by Levantine Heritage Foundation',
      location: 'Aleppo, Syria',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    },
    location: 'Aleppo, Syria',
    period: 'Bronze age to present',
    tags: ['Laurel Oil', 'Soap Craft', 'Syrian Heritage', 'Ancient Alchemy'],
    heroImage: 'https://images.unsplash.com/photo-1608248597359-bb4fc2721868?auto=format&fit=crop&w=1400&q=85',
    extractedKnowledge: {
      people: ['Mahmoud Zanabili', 'Zanabili Soap Guild'],
      materials: ['Wild laurel oil (Laurus nobilis)', 'Cold-pressed Syrian olive oil', 'Barilla desert plant ash'],
      techniques: ['Three-day subterranean simmering', 'Shoe-plank floor leveling', 'Nine-month tower drying'],
      culturalContext: ['Traditional cleansing rituals of the ancient Levant'],
      timePeriod: 'Antiquity to present'
    },
    missingQuestions: [
      {
        id: 'q-aleppo-1',
        storyId: 'story-aleppo-soap',
        question: 'What is the precise percentage of wild laurel oil required to balance skin healing against shelf-life degradation?',
        whyItMatters: 'Too much laurel makes the soap soft; too little loses antiseptic qualities.',
        category: 'Material Source',
        importance: 'Urgent',
        answered: false,
        suggestedPromptForInterview: '"What aroma in the boiling pit tells you it is time to turn off the flame?"'
      }
    ],
    preservationDate: '2026-03-18',
    preservationScore: 80,
    isFeatured: true,
    verificationStatus: 'Archived Permanently'
  },
  {
    id: 'story-georgian-qvevri',
    title: 'The Underground Qvevri of Kakheti: Clay Vessel Winemaking',
    subtitle: 'Burying wild amber wine in beeswax-sealed terracotta amphorae across Caucasian winters.',
    category: 'Traditions',
    content: `In the Alazani Valley of Georgia, 80-year-old Zaza Maisuradze washes the inside of an eight-foot terracotta egg (Qvevri) buried up to its neck in the damp earth of his marani cellar.

"The Qvevri is the mother's womb of wine," Zaza smiles, holding a brush of wild cherry bark. "We do not filter. The grapes, skins, stalks, and pips ferment together with wild vineyard yeasts. The cone bottom collects the sediment naturally. The earth keeps the temperature constant through winter frost and summer heat. After six months underground, the wine turns brilliant amber."`,
    summary: 'The 8,000-year-old UNESCO winemaking tradition of Kakheti using beeswax-sealed clay vessels buried in the earth.',
    storyteller: {
      name: 'Zaza Maisuradze',
      ageOrEra: '80 years old',
      relation: 'Preserved by Georgian Cultural Archive',
      location: 'Kakheti, Georgia',
      avatarUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=400&q=80',
    },
    location: 'Kakheti, Republic of Georgia',
    period: 'Practiced continuously since 6000 BCE (UNESCO)',
    tags: ['Qvevri', 'Amber Wine', 'Clay Amphorae', 'Ancient Viticulture', 'Georgia'],
    heroImage: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1400&q=85',
    extractedKnowledge: {
      people: ['Zaza Maisuradze', 'Kakheti Qvevri Potters'],
      materials: ['Red Caucasian mountain clay', 'Raw mountain beeswax', 'Wild cherry bark brushes'],
      techniques: ['Cone-bottom natural gravitational clarification', 'Beeswax interior hot sealing', 'Subterranean geothermal fermentation'],
      culturalContext: ['Birthplace of viticulture and traditional supra banquets'],
      timePeriod: '6000 BCE to present'
    },
    missingQuestions: [
      {
        id: 'q-qvevri-1',
        storyId: 'story-georgian-qvevri',
        question: 'How hot must the clay vessel be when painting the molten beeswax onto the interior pores?',
        whyItMatters: 'If the terracotta is too cool, wax peels off into the wine; if too hot, wax burns and imparts bitterness.',
        category: 'Technique Detail',
        importance: 'Urgent',
        answered: false,
        suggestedPromptForInterview: '"How do you test the heat of the vessel wall with your hand before pouring the wax?"'
      }
    ],
    preservationDate: '2026-02-28',
    preservationScore: 85,
    isFeatured: true,
    verificationStatus: 'Archived Permanently'
  },
  {
    id: 'story-kintsugi-kyoto',
    title: 'The Urushi Sap Alchemy of Kyoto Kintsugi',
    subtitle: 'Repairing broken ceramics with poisonous tree lacquer and dusted 24-karat gold.',
    category: 'Crafts',
    content: `In a quiet alley of Kyoto's Higashiyama district, master lacquerer Toshio Hasegawa (85) repairs a chipped 16th-century tea bowl.

"People think Kintsugi is about decorative gold glue," Toshio says softly. "Gold is only the very last dust layer. The real strength comes from raw urushi sap extracted from wild lacquer trees in deep summer. Urushi does not dry by evaporation; it cures only in a dark, humid cedar cabinet (furo) through an enzyme reaction with moisture. It takes three months of patience for each layer."`,
    summary: 'Master Hasegawa documents the delicate moisture curing and natural urushi sap chemistry of traditional Japanese kintsugi repair.',
    storyteller: {
      name: 'Toshio Hasegawa',
      ageOrEra: '85 years old (Master Urushi Artisan)',
      relation: 'Preserved by Kyoto Traditional Arts Guild',
      location: 'Kyoto, Japan',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    },
    location: 'Kyoto, Japan',
    period: 'Muromachi Period (15th century) to present',
    tags: ['Kintsugi', 'Urushi', 'Lacquer', 'Wabi-Sabi', 'Ceramics'],
    heroImage: 'https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&w=1400&q=85',
    extractedKnowledge: {
      people: ['Toshio Hasegawa', 'Kyoto Lacquer Masters'],
      materials: ['Raw Ki-urushi tree sap', 'Diatomaceous clay powder (Tonoko)', 'Fine Japanese 24k gold powder'],
      techniques: ['Humid cabinet curing at 75% relative humidity', 'Charcoal water polishing between coats', 'Cotton-dusted gold leaf application'],
      culturalContext: ['Wabi-sabi philosophy of celebrating fractures and transience'],
      timePeriod: '15th century to present'
    },
    missingQuestions: [
      {
        id: 'q-kintsugi-1',
        storyId: 'story-kintsugi-kyoto',
        question: 'What is the precise humidity level inside the cedar curing chamber that prevents the lacquer from wrinkling?',
        whyItMatters: 'Excess humidity causes the urushi skin to flash-cure and blister, ruining adhesion to the ceramic.',
        category: 'Technique Detail',
        importance: 'Urgent',
        answered: false,
        suggestedPromptForInterview: '"How do you judge the moisture in the wooden cabinet without modern hygrometers?"'
      }
    ],
    preservationDate: '2026-04-15',
    preservationScore: 88,
    isFeatured: true,
    verificationStatus: 'Archived Permanently'
  },
  {
    id: 'story-navajo-weaving',
    title: 'The Spider Rock Looms of Diné Tah',
    subtitle: 'Carding churro sheep wool and harvesting cliffside snakeweed for Navajo ceremonial blankets.',
    category: 'Traditions',
    content: `At the rim of Canyon de Chelly, 83-year-old weaver Eleanor Begay cards raw fleece from her flock of heritage Navajo-Churro sheep.

"We do not use patterns written on paper," Eleanor tells us, her weathered hands spinning wool with a juniper spindle. "The design comes into the mind while watching the sunrise on the sandstone walls. We boil wild snakeweed for yellow, wild walnuts for rich chocolate brown, and cochineal from prickly pear cactus for crimson. You must never finish a blanket with a sealed border—you must leave an open thread, the Ch'ihónít'i (spirit line), so your thoughts can leave the loom."`,
    summary: 'Eleanor Begay documents the oral geometry, mineral dye botanicals, and spiritual weaver pathways of traditional Navajo rugs.',
    storyteller: {
      name: 'Eleanor Begay',
      ageOrEra: '83 years old (Diné Weaver)',
      relation: 'Preserved by Indigenous Arts Initiative',
      location: 'Canyon de Chelly, Arizona, USA',
      avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    },
    location: 'Navajo Nation, Arizona, USA',
    period: 'Generational matriarchal lineage spanning centuries',
    tags: ['Navajo Weaving', 'Diné Heritage', 'Natural Dyes', 'Textiles', 'Oral History'],
    heroImage: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1400&q=85',
    extractedKnowledge: {
      people: ['Eleanor Begay', 'Diné Matriarchs'],
      materials: ['Churro sheep wool', 'Wild snakeweed flowers', 'Cochineal cactus insects', 'Piñon pine pitch'],
      techniques: ['Upright two-beam wooden loom weaving', 'Finger carding without synthetic detergents', 'Spirit line border release'],
      culturalContext: ['Navajo creation stories and Spider Woman loom teachings'],
      timePeriod: '17th century to present'
    },
    missingQuestions: [
      {
        id: 'q-navajo-1',
        storyId: 'story-navajo-weaving',
        question: 'Which canyon soil mordant is used to lock the yellow snakeweed dye against desert sun fading?',
        whyItMatters: 'Without the specific iron-rich clay water, natural plant dyes wash out in rainwater.',
        category: 'Material Source',
        importance: 'Urgent',
        answered: false,
        suggestedPromptForInterview: '"Where along the canyon wash did your mother dig the red mud for the dye pot?"'
      }
    ],
    preservationDate: '2026-03-22',
    preservationScore: 81,
    isFeatured: true,
    verificationStatus: 'Archived Permanently'
  },
  {
    id: 'story-irish-currach',
    title: 'The Tarred Canvas Currachs of the Aran Islands',
    subtitle: 'Steering wave-riding skin boats through the wild Atlantic surf of Inis Mór.',
    category: 'Crafts',
    content: `On the storm-lashed rocks of Inis Mór, 81-year-old fisherman Padraig O'Flaherty ties hazel and willow ribs into a lightweight skeleton using tarred twine.

"A currach has no keel," Padraig shouts above the Atlantic roar. "A boat with a deep wooden keel fights the sea; a currach dances on top of the crest like a cork. Long ago we covered them in cowhide; now we stretch heavy canvas and coat it with boiling coal tar. If you strike a wave wrong in Galway Bay, the timber bends beneath your boots, but it does not shatter."`,
    summary: 'The ancient construction and wave navigation techniques of Ireland’s mortarless, keel-less coastal skin boats.',
    storyteller: {
      name: 'Padraig O\'Flaherty',
      ageOrEra: '81 years old',
      relation: 'Preserved by Aran Maritime Heritage Trust',
      location: 'Inis Mór, Aran Islands, Ireland',
      avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
    },
    location: 'Aran Islands, County Galway, Ireland',
    period: 'Early medieval Gaelic ocean transport',
    tags: ['Currach', 'Boatbuilding', 'Maritime', 'Gaelic Heritage', 'Aran Islands'],
    heroImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1400&q=85',
    extractedKnowledge: {
      people: ['Padraig O\'Flaherty', 'Aran Island Rowers'],
      materials: ['Hazel laths', 'Coarse linen canvas', 'Boiling pine pitch and coal tar'],
      techniques: ['Rib bending over peat smoke', 'Keelless wave surfing', 'Square-bladed counterbalanced rowing'],
      culturalContext: ['Island survival, offshore kelp harvesting, and Gaelic ocean voyages'],
      timePeriod: '6th century to present'
    },
    missingQuestions: [
      {
        id: 'q-currach-1',
        storyId: 'story-irish-currach',
        question: 'What is the precise mixture of pine pitch and coal tar that stays flexible in freezing seawater without becoming brittle?',
        whyItMatters: 'Brittle tar fractures against wave slams, letting water saturate the interior canvas.',
        category: 'Material Source',
        importance: 'Urgent',
        answered: false,
        suggestedPromptForInterview: '"Padraig, how much tallow did your father add to the pitch bucket on frost mornings?"'
      }
    ],
    preservationDate: '2026-02-10',
    preservationScore: 75,
    isFeatured: true,
    verificationStatus: 'Archived Permanently'
  },
  {
    id: 'story-kyrgyz-yurt',
    title: 'The Steppe Felt and Willow Ribs of Lake Issyk-Kul',
    subtitle: 'Steaming flexible birch poles and pressing nomadic wool shelters against Himalayan blizzards.',
    category: 'Crafts',
    content: `In the mountain foothills of Kyzyl-Tuu in Kyrgyzstan, 78-year-old yurt master Beishenbek Aliyev bends fresh willow poles into the lattice walls (kerege) of a traditional nomadic dwelling.

"The yurt (Boz-Üi) has no nails, no screws, and no metal," Beishenbek explains. "It is held together entirely by rawhide thongs and woven camel wool ropes. We press autumn sheep wool under boiling water to create thick pressed felt (kiiz) that breathes in the summer heat but traps woodstove heat during winter blizzards at ten thousand feet."`,
    summary: 'The mathematical geometry and steam-bent willow architecture of Kyrgyz felt yurts.',
    storyteller: {
      name: 'Beishenbek Aliyev',
      ageOrEra: '78 years old',
      relation: 'Preserved by Central Asian Nomadic Archive',
      location: 'Kyzyl-Tuu, Kyrgyzstan',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    },
    location: 'Lake Issyk-Kul, Kyrgyzstan',
    period: 'Ancient Central Asian nomadic traditions (UNESCO)',
    tags: ['Yurt', 'Nomadic Architecture', 'Felt Craft', 'Central Asia', 'Living Tradition'],
    heroImage: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1400&q=85',
    extractedKnowledge: {
      people: ['Beishenbek Aliyev', 'Kyzyl-Tuu Master Carpenters'],
      materials: ['Mountain red willow (tal)', 'Heavy autumn sheep wool felt', 'Camel leather lashings'],
      techniques: ['Steam bending over open peat fires', 'Felt rolling with horse teams', 'Circular crown (tunduk) acoustic balance'],
      culturalContext: ['Central Asian steppe migration and sacred domestic cosmic order'],
      timePeriod: '1st millennium BCE to present'
    },
    missingQuestions: [
      {
        id: 'q-yurt-1',
        storyId: 'story-kyrgyz-yurt',
        question: 'How long must the freshly felled red willow be buried in wet steppe clay before steam bending?',
        whyItMatters: 'Clay curing preserves sap moisture so poles bend smoothly without grain fractures.',
        category: 'Technique Detail',
        importance: 'Urgent',
        answered: false,
        suggestedPromptForInterview: '"Beishenbek, how do you tell when the wood has absorbed enough river earth to enter the steam box?"'
      }
    ],
    preservationDate: '2026-03-12',
    preservationScore: 79,
    isFeatured: true,
    verificationStatus: 'Archived Permanently'
  }
];
