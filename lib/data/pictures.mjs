// Picture cards for early-class chapters (emoji pictures - no image files needed).
// Key: "Subject|Class|Chapter name"  →  [[emoji, name], ...]  (name in the chapter's language)

export const PICTURES = {
  // ---------- Hindi ----------
  'Hindi|Play School|चित्र देखो, बोलो': [
    ['🐄', 'गाय'], ['🐕', 'कुत्ता'], ['🐈', 'बिल्ली'], ['🏠', 'घर'], ['🌸', 'फूल'], ['🚌', 'बस'],
    ['🐦', 'चिड़िया'], ['🐟', 'मछली'], ['🌳', 'पेड़'], ['☀️', 'सूरज'], ['🐘', 'हाथी'], ['🦜', 'तोता'],
  ],
  'Hindi|Play School|स्वर पहचान (अ आ इ ई)': [['🥭', 'आ - आम'], ['🦉', 'उ - उल्लू'], ['🎋', 'ई - ईख (गन्ना)'], ['🍇', 'अं - अंगूर']],
  'Hindi|Play School|कविता - मछली जल की रानी': [['🐟', 'मछली'], ['💧', 'पानी'], ['🌊', 'नदी'], ['🪷', 'कमल']],
  'Hindi|Nursery|व्यंजन क से ज्ञ': [
    ['🕊️', 'क - कबूतर'], ['🐇', 'ख - खरगोश'], ['🪴', 'ग - गमला'], ['⏰', 'घ - घड़ी'], ['🥄', 'च - चम्मच'],
    ['🚢', 'ज - जहाज़'], ['🍅', 'ट - टमाटर'], ['🐟', 'म - मछली'], ['🍎', 'स - सेब'], ['🐘', 'ह - हाथी'],
  ],
  'Hindi|KG|कविता - चंदा मामा': [['🌙', 'चाँद'], ['⭐', 'तारा'], ['🌃', 'रात'], ['🛏️', 'चारपाई / पलंग']],
  'Hindi|1|कहानी - प्यासा कौआ': [['🐦‍⬛', 'कौआ'], ['🏺', 'घड़ा'], ['🪨', 'कंकड़'], ['💧', 'पानी']],

  // ---------- English ----------
  'English|Play School|Alphabet A to Z': [
    ['🍎', 'A - Apple'], ['⚽', 'B - Ball'], ['🐈', 'C - Cat'], ['🐕', 'D - Dog'], ['🥚', 'E - Egg'], ['🐟', 'F - Fish'],
    ['🐐', 'G - Goat'], ['🎩', 'H - Hat'], ['🍦', 'I - Ice cream'], ['🧃', 'J - Juice'], ['🪁', 'K - Kite'], ['🦁', 'L - Lion'],
  ],
  'English|Play School|Colour Names': [
    ['🔴', 'Red'], ['🔵', 'Blue'], ['🟢', 'Green'], ['🟡', 'Yellow'], ['🟠', 'Orange'], ['🟣', 'Purple'], ['⚫', 'Black'], ['⚪', 'White'], ['🟤', 'Brown'],
  ],
  'English|Nursery|Animal Names': [['🐄', 'Cow'], ['🐕', 'Dog'], ['🐈', 'Cat'], ['🦁', 'Lion'], ['🐔', 'Hen'], ['🐘', 'Elephant'], ['🐒', 'Monkey'], ['🐐', 'Goat']],
  'English|KG|Three Letter Words': [['🐈', 'Cat'], ['🦇', 'Bat'], ['🐔', 'Hen'], ['🖊️', 'Pen'], ['🚌', 'Bus'], ['🐄', 'Cow'], ['☀️', 'Sun'], ['🐷', 'Pig']],
  'English|KG|My Family Words': [['👩', 'Mother'], ['👨', 'Father'], ['👦', 'Brother'], ['👧', 'Sister'], ['👴', 'Grandfather'], ['👵', 'Grandmother']],
  'English|Play School|Poem - Twinkle Twinkle Little Star': [['⭐', 'Star'], ['💎', 'Diamond'], ['🌌', 'Sky']],

  // ---------- Maths ----------
  'Maths|Play School|Shapes': [['🔵', 'Circle'], ['🟥', 'Square'], ['🔺', 'Triangle'], ['▬', 'Rectangle'], ['🫓', 'Roti - Circle'], ['📱', 'Mobile - Rectangle']],
  'Maths|Play School|Counting 1 to 10': [['🍎', '1'], ['🍎🍎', '2'], ['🍎🍎🍎', '3'], ['🍎🍎🍎🍎', '4'], ['🍎🍎🍎🍎🍎', '5']],
  'Maths|Play School|Big and Small': [['🐘', 'Big - Elephant'], ['🐭', 'Small - Mouse'], ['🚌', 'Big - Bus'], ['🚲', 'Small - Cycle']],

  // ---------- Science ----------
  'Science|Play School|My Body Parts': [['👁️', 'Eye'], ['👂', 'Ear'], ['👃', 'Nose'], ['👄', 'Mouth'], ['✋', 'Hand'], ['🦶', 'Foot']],
  'Science|Play School|Fruits and Vegetables': [['🥭', 'Mango'], ['🍌', 'Banana'], ['🍎', 'Apple'], ['🍇', 'Grapes'], ['🥔', 'Potato'], ['🍅', 'Tomato'], ['🥕', 'Carrot'], ['🧅', 'Onion']],
  'Science|Play School|Animals Around Us': [['🐄', 'Cow (pet)'], ['🐕', 'Dog (pet)'], ['🐈', 'Cat (pet)'], ['🦁', 'Lion (wild)'], ['🐘', 'Elephant (wild)'], ['🐒', 'Monkey (wild)']],
  'Science|Nursery|Day and Night': [['☀️', 'Sun - Day'], ['🌙', 'Moon - Night'], ['⭐', 'Stars - Night']],
  'Science|KG|Seasons': [['☀️', 'Summer'], ['🌧️', 'Rainy season'], ['❄️', 'Winter']],
  'Science|2|Animal Homes': [['🪺', 'Nest - Bird'], ['🐕', 'Kennel - Dog'], ['🦁', 'Den - Lion'], ['🐟', 'Water - Fish'], ['🐎', 'Stable - Horse']],
  'Science|3|Birds': [['🦚', 'Peacock'], ['🦜', 'Parrot'], ['🐦‍⬛', 'Crow'], ['🐦', 'Sparrow'], ['🕊️', 'Pigeon']],

  // ---------- SST ----------
  'SST|Play School|Helpers': [['👨‍⚕️', 'Doctor'], ['👮', 'Police'], ['👩‍🌾', 'Farmer'], ['👩‍🏫', 'Teacher'], ['📮', 'Postman (letters)']],
  'SST|Nursery|Means of Transport': [['🚌', 'Bus'], ['🚗', 'Car'], ['🚆', 'Train'], ['🛺', 'Auto'], ['🚜', 'Tractor'], ['⛵', 'Boat'], ['🚢', 'Ship'], ['✈️', 'Aeroplane']],
  'SST|KG|National Symbols': [['🇮🇳', 'Tiranga - National Flag'], ['🦚', 'Peacock - National Bird'], ['🐅', 'Tiger - National Animal'], ['🪷', 'Lotus - National Flower'], ['🥭', 'Mango - National Fruit']],
  'SST|KG|Traffic Rules': [['🔴', 'Red - Stop'], ['🟡', 'Yellow - Get ready'], ['🟢', 'Green - Go'], ['🚸', 'Zebra crossing']],

  // ---------- Computer ----------
  'Computer|Nursery|Computer Parts': [['🖥️', 'Monitor'], ['⌨️', 'Keyboard'], ['🖱️', 'Mouse'], ['🔊', 'Speaker'], ['🖨️', 'Printer']],

  // ---------- Sanskrit ----------
  'Sanskrit|Play School|शरीरस्य अङ्गानि': [['👁️', 'नेत्रम् (आँख)'], ['👂', 'कर्णः (कान)'], ['👃', 'नासिका (नाक)'], ['✋', 'हस्तः (हाथ)'], ['🦶', 'पादः (पैर)']],
  'Sanskrit|Nursery|फलानां नामानि': [['🥭', 'आम्रम् (आम)'], ['🍌', 'कदलीफलम् (केला)'], ['🍊', 'नारङ्गम् (संतरा)'], ['🍎', 'सेवफलम् (सेब)']],
  'Sanskrit|KG|वर्णाः (रंगों के नाम)': [['🔴', 'रक्तः (लाल)'], ['🔵', 'नीलः (नीला)'], ['🟢', 'हरितः (हरा)'], ['🟡', 'पीतः (पीला)'], ['⚪', 'श्वेतः (सफ़ेद)']],
  'Sanskrit|KG|पशूनां नामानि': [['🐄', 'धेनुः (गाय)'], ['🐎', 'अश्वः (घोड़ा)'], ['🐘', 'गजः (हाथी)'], ['🦁', 'सिंहः (शेर)']],
  'Sanskrit|2|गृहस्य वस्तूनि': [['🏠', 'गृहम् (घर)'], ['🚪', 'कपाटम् (दरवाज़ा)'], ['🍲', 'पात्रम् (बर्तन)'], ['🪔', 'दीपः (दीया)']],
};
