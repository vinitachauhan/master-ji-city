// Words → emoji pictures, used to draw a picture strip for any topic (English and Hindi words).
// English words match whole words (also plurals); Hindi words match inside the text.
export const WORD_PICTURES = [
  // animals and birds
  ['🐄', 'cow', 'गाय'], ['🐃', 'buffalo', 'भैंस'], ['🐐', 'goat', 'बकरी'], ['🐕', 'dog', 'कुत्ता'], ['🐈', 'cat', 'बिल्ली'], ['🐘', 'elephant', 'हाथी'],
  ['🦁', 'lion', 'शेर'], ['🐅', 'tiger', 'बाघ'], ['🐒', 'monkey', 'बंदर'], ['🐇', 'rabbit', 'खरगोश'], ['🐢', 'tortoise', 'कछुआ'], ['🐊', 'crocodile', 'मगरमच्छ'],
  ['🐍', 'snake', 'साँप'], ['🐟', 'fish', 'मछली'], ['🐸', 'frog', 'मेंढक'], ['🐜', 'ant', 'चींटी'], ['🐝', 'bee', 'मधुमक्खी'], ['🦋', 'butterfly', 'तितली'],
  ['🦟', 'mosquito', 'मच्छर'], ['🐛', 'caterpillar', 'इल्ली'], ['🪱', 'earthworm', 'केंचुआ'], ['🐦', 'bird', 'चिड़िया'], ['🦜', 'parrot', 'तोता'], ['🕊️', 'pigeon', 'कबूतर'],
  ['🐦‍⬛', 'crow', 'कौआ'], ['🦚', 'peacock', 'मोर'], ['🐔', 'hen', 'मुर्गी'], ['🦉', 'owl', 'उल्लू'], ['🦌', 'deer', 'हिरण'], ['🐪', 'camel', 'ऊँट'],
  ['🐎', 'horse', 'घोड़ा'], ['🐑', 'sheep', 'भेड़'], ['🐻‍❄️', 'polar bear', 'ध्रुवीय भालू'], ['🦇', 'bat', 'चमगादड़'], ['🐌', 'snail', 'घोंघा'], ['🦠', 'bacteria', 'जीवाणु'],
  // plants and food
  ['🌳', 'tree', 'पेड़'], ['🌱', 'seed', 'बीज'], ['🌿', 'leaf', 'पत्ता'], ['🌸', 'flower', 'फूल'], ['🌾', 'wheat', 'गेहूँ'], ['🍚', 'rice', 'चावल'],
  ['🌽', 'maize', 'मक्का'], ['🥕', 'carrot', 'गाजर'], ['🥔', 'potato', 'आलू'], ['🧅', 'onion', 'प्याज़'], ['🍅', 'tomato', 'टमाटर'], ['🥭', 'mango', 'आम'],
  ['🍎', 'apple', 'सेब'], ['🍌', 'banana', 'केला'], ['🍇', 'grapes', 'अंगूर'], ['🥛', 'milk', 'दूध'], ['🥚', 'egg', 'अंडा'], ['🍯', 'honey', 'शहद'],
  ['🫓', 'roti', 'रोटी'], ['🍞', 'bread', 'ब्रेड'], ['🥗', 'vegetable', 'सब्ज़ी'], ['🍬', 'toffee', 'टॉफी'], ['🍋', 'lemon', 'नींबू'], ['🥜', 'peanut', 'मूँगफली'],
  ['🌶️', 'chilli', 'मिर्च'], ['🧂', 'salt', 'नमक'], ['🍬', 'sugar', 'चीनी'], ['🫘', 'pulses', 'दाल'], ['🌵', 'cactus', 'कैक्टस'], ['🍄', 'fungi', 'कवक'],
  ['🎋', 'sugarcane', 'गन्ना'], ['🌻', 'sunflower', 'सूरजमुखी'],
  // nature, earth, sky
  ['☀️', 'sun', 'सूरज'], ['🌙', 'moon', 'चाँद'], ['⭐', 'star', 'तारा'], ['🌍', 'earth', 'पृथ्वी'], ['🪐', 'planet', 'ग्रह'], ['☁️', 'cloud', 'बादल'],
  ['🌧️', 'rain', 'बारिश'], ['🌈', 'rainbow', 'इंद्रधनुष'], ['❄️', 'snow', 'बर्फ'], ['🌬️', 'wind', 'हवा'], ['🌪️', 'cyclone', 'चक्रवात'], ['⚡', 'lightning', 'बिजली'],
  ['💧', 'water', 'पानी'], ['🌊', 'ocean', 'समुद्र'], ['🏞️', 'river', 'नदी'], ['🏔️', 'mountain', 'पहाड़'], ['🏜️', 'desert', 'रेगिस्तान'], ['🌋', 'volcano', 'ज्वालामुखी'],
  ['🌲', 'forest', 'जंगल'], ['🪨', 'rock', 'चट्टान'], ['🟤', 'soil', 'मिट्टी'], ['🔥', 'fire', 'आग'], ['💨', 'air', 'वायु'], ['🫧', 'oxygen', 'ऑक्सीजन'],
  ['🌡️', 'temperature', 'तापमान'], ['🌏', 'globe', 'ग्लोब'], ['🗺️', 'map', 'नक्शा'], ['🧭', 'compass', 'दिशा'], ['🏝️', 'island', 'द्वीप'], ['🌐', 'continent', 'महाद्वीप'],
  // places, people, things
  ['🏙️', 'city', 'शहर'], ['🏡', 'village', 'गाँव'], ['🏠', 'house', 'घर'], ['🏫', 'school', 'स्कूल'], ['🏥', 'hospital', 'अस्पताल'], ['🏪', 'shop', 'दुकान'],
  ['🛕', 'temple', 'मंदिर'], ['🕌', 'mosque', 'मस्जिद'], ['⛪', 'church', 'चर्च'], ['🏛️', 'parliament', 'संसद'], ['⚖️', 'court', 'न्यायालय'], ['🇮🇳', 'india', 'भारत'],
  ['🚌', 'bus', 'बस'], ['🚗', 'car', 'कार'], ['🚆', 'train', 'रेल'], ['✈️', 'aeroplane', 'हवाई जहाज़'], ['🚢', 'ship', 'जहाज़'], ['🚲', 'bicycle', 'साइकिल'],
  ['🛺', 'auto', 'ऑटो'], ['🚦', 'traffic', 'ट्रैफ़िक'], ['👨‍🌾', 'farmer', 'किसान'], ['👩‍⚕️', 'doctor', 'डॉक्टर'], ['👩‍🏫', 'teacher', 'शिक्षक'], ['👮', 'police', 'पुलिस'],
  ['👨‍👩‍👧', 'family', 'परिवार'], ['👶', 'baby', 'बच्चा'], ['🧒', 'children', 'बच्चे'], ['📮', 'post', 'डाक'], ['📱', 'mobile', 'मोबाइल'], ['📺', 'tv', 'टीवी'],
  ['📻', 'radio', 'रेडियो'], ['📰', 'newspaper', 'अख़बार'], ['💻', 'computer', 'कंप्यूटर'], ['⌨️', 'keyboard', 'कीबोर्ड'], ['🖱️', 'computer mouse', 'माउस'], ['🖨️', 'printer', 'प्रिंटर'],
  ['🌐', 'internet', 'इंटरनेट'], ['📧', 'email', 'ईमेल'], ['📚', 'book', 'किताब'], ['✏️', 'pencil', 'पेंसिल'], ['🖍️', 'crayon', 'क्रेयॉन'], ['🎨', 'colour', 'रंग'],
  ['💰', 'money', 'पैसा'], ['🪙', 'coin', 'सिक्का'], ['💵', 'note', 'नोट'], ['⏰', 'clock', 'घड़ी'], ['📅', 'calendar', 'कैलेंडर'], ['🎁', 'gift', 'उपहार'],
  ['🪔', 'diwali', 'दीवाली'], ['🎆', 'festival', 'त्योहार'], ['👕', 'clothes', 'कपड़े'], ['🧥', 'woollen', 'ऊनी'], ['☂️', 'umbrella', 'छाता'], ['🧼', 'soap', 'साबुन'],
  ['🪥', 'brush', 'ब्रश'], ['🦷', 'teeth', 'दाँत'], ['🗑️', 'dustbin', 'कूड़ेदान'], ['♻️', 'recycle', 'रीसायकल'], ['🏭', 'factory', 'कारख़ाना'], ['⛽', 'petrol', 'पेट्रोल'],
  ['🔋', 'battery', 'बैटरी'], ['💡', 'bulb', 'बल्ब'], ['🔌', 'electricity', 'विद्युत'], ['🧲', 'magnet', 'चुंबक'], ['🔦', 'torch', 'टॉर्च'], ['🕯️', 'candle', 'मोमबत्ती'],
  ['🪞', 'mirror', 'दर्पण'], ['🔍', 'lens', 'लेंस'], ['🔬', 'microscope', 'सूक्ष्मदर्शी'], ['🧪', 'acid', 'अम्ल'], ['⚗️', 'chemical', 'रासायनिक'], ['⚛️', 'atom', 'परमाणु'],
  ['🧬', 'dna', 'डीएनए'], ['🫀', 'heart', 'हृदय'], ['🫁', 'lungs', 'फेफड़े'], ['🧠', 'brain', 'मस्तिष्क'], ['🦴', 'bone', 'हड्डी'], ['👁️', 'eye', 'आँख'],
  ['👂', 'ear', 'कान'], ['👃', 'nose', 'नाक'], ['👅', 'tongue', 'जीभ'], ['✋', 'hand', 'हाथ'], ['🦶', 'leg', 'पैर'], ['🩸', 'blood', 'रक्त'],
  ['💊', 'medicine', 'दवा'], ['💉', 'vaccine', 'टीका'], ['🩹', 'first aid', 'प्राथमिक चिकित्सा'], ['🔊', 'sound', 'ध्वनि'], ['🎵', 'song', 'गीत'], ['🥁', 'drum', 'ढोल'],
  // maths
  ['➕', 'addition', 'जोड़'], ['➖', 'subtraction', 'घटाना'], ['✖️', 'multiplication', 'गुणा'], ['➗', 'division', 'भाग'], ['🔢', 'number', 'संख्या'], ['🟰', 'equation', 'समीकरण'],
  ['🔺', 'triangle', 'त्रिभुज'], ['⬛', 'square', 'वर्ग'], ['▭', 'rectangle', 'आयत'], ['⚪', 'circle', 'वृत्त'], ['🎲', 'dice', 'पासा'], ['🧊', 'cube', 'घन'],
  ['📏', 'ruler', 'पैमाना'], ['📐', 'angle', 'कोण'], ['⚖️', 'weight', 'वज़न'], ['🍕', 'fraction', 'भिन्न'], ['📊', 'bar graph', 'दंड आलेख'], ['🥧', 'pie chart', 'पाई चार्ट'],
  ['📈', 'graph', 'ग्राफ'], ['🧮', 'abacus', 'गिनती'], ['%', 'percentage', 'प्रतिशत'], ['🏷️', 'discount', 'छूट'],
];

const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const WORDS = WORD_PICTURES.map(([e, en, hi]) => ({
  e, en, hi,
  enRe: new RegExp(`\\b${esc(en)}(s|es)?\\b`, 'i'),
  hiRe: new RegExp(`(^|[^\\u0900-\\u097F])${esc(hi)}(?=$|[^\\u0900-\\u097F])`),
}));

// up to `max` pictures for a piece of text, in the order the words appear; Hindi text shows Hindi labels
export function picturesFor(text, max = 8) {
  const t = String(text || '');
  const hindi = /[\u0900-\u097F]/.test(t);
  const hits = [];
  for (const w of WORDS) {
    const m = (hindi ? w.hiRe : w.enRe).exec(t);
    if (m && !hits.some((h) => h.emoji === w.e)) hits.push({ at: m.index, emoji: w.e, name: hindi ? w.hi : w.en.replace(/^./, (c) => c.toUpperCase()) });
  }
  return hits.sort((a, b) => a.at - b.at).slice(0, max).map(({ emoji, name }) => ({ emoji, name }));
}

// Ready concept diagrams (flowcharts with pictures) for common school topics.
// [words to match in the topic / chapter, diagram title, steps [emoji, label]]
export const CONCEPT_DIAGRAMS = [
  [/food (chain|web)|आहार श्रृंखला|खाद्य श्रृंखला|\bproducers?\b|\bconsumers?\b|trophic/i, 'Food Chain', [['🌿', 'Grass (producer)'], ['🦗', 'Grasshopper'], ['🐸', 'Frog'], ['🐍', 'Snake'], ['🦅', 'Eagle (top consumer)']]],
  [/water cycle|जल चक्र|evaporation|condensation|वाष्पीकरण/i, 'Water Cycle', [['☀️', 'Sun heats water'], ['💨', 'Evaporation'], ['☁️', 'Condensation - clouds'], ['🌧️', 'Rain'], ['🌊', 'Rivers and sea']]],
  [/photosynthesis|प्रकाश संश्लेषण|chlorophyll|make (their own )?food/i, 'Photosynthesis', [['☀️', 'Sunlight'], ['💧', 'Water + CO₂'], ['🌿', 'Leaf (chlorophyll)'], ['🍬', 'Glucose (food)'], ['🫧', 'Oxygen given out']]],
  [/digest|alimentary|पाचन/i, 'Digestion', [['👄', 'Mouth (chewing, saliva)'], ['⬇️', 'Food pipe'], ['🫃', 'Stomach'], ['〰️', 'Small intestine (absorption)'], ['🚽', 'Large intestine (waste out)']]],
  [/germinat|seeds? (and|tells|dispersal)|अंकुरण/i, 'Seed to Plant', [['🌰', 'Seed'], ['💧', 'Water, air, warmth'], ['🌱', 'Sprout'], ['🪴', 'Young plant'], ['🌳', 'Tree with fruits']]],
  [/silk ?(moth|worm)|sericulture|रेशम/i, 'Life Cycle of the Silk Moth', [['🥚', 'Egg'], ['🐛', 'Caterpillar (silkworm)'], ['🥥', 'Cocoon (silk)'], ['🦋', 'Moth']]],
  [/butterfly|metamorphosis|तितली/i, 'Life Cycle of a Butterfly', [['🥚', 'Egg'], ['🐛', 'Caterpillar'], ['🫘', 'Pupa'], ['🦋', 'Butterfly']]],
  [/\bfibre|fabric|spinning|weaving|रेशे/i, 'Fibre to Fabric', [['🌱', 'Fibre (cotton, wool)'], ['🧶', 'Spinning - yarn'], ['🧵', 'Weaving / knitting'], ['🟫', 'Fabric'], ['👕', 'Clothes']]],
  [/breath|respirat|lungs|श्वसन|साँस/i, 'Breathing', [['👃', 'Nose (air in)'], ['🫁', 'Windpipe → lungs'], ['🩸', 'Oxygen into blood'], ['⚡', 'Energy from food'], ['💨', 'CO₂ breathed out']]],
  [/\bheart|circulat|blood vessel|हृदय|रक्त परिसंचरण/i, 'Blood Circulation', [['🫀', 'Heart pumps'], ['➡️', 'Arteries'], ['🧍', 'Body parts get oxygen'], ['⬅️', 'Veins'], ['🫀', 'Back to heart']]],
  [/crop production|agricultural practices|kharif|rabi|फसल/i, 'Crop Production', [['🚜', 'Ploughing'], ['🌱', 'Sowing'], ['🐄', 'Manuring'], ['💧', 'Irrigation'], ['🌾', 'Harvesting'], ['🏚️', 'Storage']]],
  [/\bcircuit|electric cell|विद्युत परिपथ/i, 'Electric Circuit', [['🔋', 'Cell (+ and -)'], ['〰️', 'Wire'], ['🔘', 'Switch (closed)'], ['💡', 'Bulb glows'], ['↩️', 'Back to the cell']]],
  [/solid,? liquid|states of matter|change of state|\bmelting|अवस्था/i, 'States of Matter', [['🧊', 'Solid (ice)'], ['🔥', 'Melting'], ['💧', 'Liquid (water)'], ['♨️', 'Boiling / evaporation'], ['💨', 'Gas (vapour)']]],
  [/inside our earth|layers of the earth|\bcrust\b|\bmantle\b|पृथ्वी की परतें/i, 'Layers of the Earth', [['🟫', 'Crust (we live here)'], ['🟧', 'Mantle'], ['🟥', 'Outer core'], ['🔴', 'Inner core']]],
  [/panchayat|gram sabha|पंचायत/i, 'Panchayati Raj', [['🏡', 'Gram Sabha (villagers)'], ['🧑‍🤝‍🧑', 'Gram Panchayat'], ['🏢', 'Panchayat Samiti (block)'], ['🏛️', 'Zila Parishad (district)']]],
  [/rainwater harvesting|saving water|every drop|drop by drop/i, 'Rainwater Harvesting', [['🌧️', 'Rain on the roof'], ['🚰', 'Pipe'], ['🪣', 'Filter'], ['🛢️', 'Tank / pit'], ['🚿', 'Use later']]],
  [/\bwaste\b|garbage|recycl|compost|कचरा/i, 'Waste to Use', [['🗑️', 'Separate wet and dry waste'], ['🪱', 'Wet waste → compost'], ['♻️', 'Dry waste → recycle'], ['🌱', 'Compost for plants']]],
];

// the first ready diagram that matches the topic, else the chapter
export function conceptFor(...texts) {
  for (const text of texts) {
    const hit = CONCEPT_DIAGRAMS.find(([re]) => re.test(String(text || '')));
    if (hit) return { title: hit[1], steps: hit[2] };
  }
  return null;
}
