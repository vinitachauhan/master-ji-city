// Play School to Class 8 - default chapters.
// Each chapter: [chapterName, notes, example (City + Village), [mcqQuestion, correct, wrong1, wrong2, wrong3]]
// Hindi is written in Hindi (Devanagari) like a Hindi textbook; Sanskrit like a Sanskrit textbook; all other subjects in English.

export const CLASSES_1_8 = ['Play School', 'Nursery', 'KG', '1', '2', '3', '4', '5', '6', '7', '8'];
export const SUBJECTS_1_8 = ['Hindi', 'English', 'Maths', 'Science', 'SST', 'Computer', 'Sanskrit'];

export const STUDY_1_8 = {
  Hindi: {
    'Play School': [
      ['स्वर पहचान (अ आ इ ई)', 'अ से अनार, आ से आम, इ से इमली, ई से ईख। हर अक्षर की अपनी ध्वनि होती है।', 'शहर में: दुकान के बोर्ड पर "अ" ढूँढो। गाँव में: खेत में ईख (गन्ना) देखो - ई से ईख!', ['अ से क्या?', 'अनार', 'केला', 'घर', 'मछली']],
      ['चित्र देखो, बोलो', 'चित्र देखकर उसका नाम हिंदी में बोलो - गाय, कुत्ता, घर, फूल।', 'शहर में: बस का चित्र देखो, बोलो "बस"। गाँव में: गाय का चित्र देखो, बोलो "गाय"।', ['दूध देने वाला जानवर कौन है?', 'गाय', 'शेर', 'बिल्ली', 'चिड़िया']],
      ['कविता - मछली जल की रानी', 'मछली जल की रानी है,\nजीवन उसका पानी है।\nहाथ लगाओ, डर जाएगी,\nबाहर निकालो, मर जाएगी।\n(पारंपरिक बाल-कविता)\nभावार्थ: मछली पानी में रहती है। पानी ही उसका जीवन है। उसे हाथ लगाने से वह डर जाती है और पानी से बाहर निकालने पर मर जाती है। इसलिए मछली को पानी में ही रहने दो।', 'शहर में: एक्वेरियम में मछली देखो, उसे हाथ मत लगाओ। गाँव में: तालाब में मछली देखो, तालाब को साफ़ रखो।', ['मछली को पानी से बाहर निकालने पर क्या होगा?', 'वह मर जाएगी', 'वह उड़ जाएगी', 'वह सो जाएगी', 'वह गाना गाएगी']],
    ],
    Nursery: [
      ['स्वर अ से अः', 'अ आ इ ई उ ऊ ऋ ए ऐ ओ औ - ये स्वर हैं। अं और अः को मिलाकर अ से अः तक 13 वर्ण पढ़ाए जाते हैं।', 'शहर में: स्कूल की कॉपी में स्वर लिखो। गाँव में: मिट्टी पर उँगली से "अ" लिखो।', ['उ से क्या?', 'उल्लू', 'आम', 'केला', 'घोड़ा']],
      ['व्यंजन क से ज्ञ', 'क ख ग घ ... से ज्ञ तक व्यंजन होते हैं। क से कबूतर, ख से खरगोश।', 'शहर में: छत पर कबूतर देखो - क! गाँव में: खेत में खरगोश देखो - ख!', ['ख से क्या?', 'खरगोश', 'गमला', 'मछली', 'फूल']],
      ['दो अक्षर वाले शब्द', 'दो अक्षर जोड़कर शब्द बनता है: क + ल = कल, घ + र = घर।', 'शहर में: बस स्टॉप पर "बस" पढ़ो। गाँव में: "हल" - किसान का हल!', ['घ + र = ?', 'घर', 'कल', 'जल', 'फल']],
    ],
    KG: [
      ['आ की मात्रा (ा)', 'अक्षर के बाद "ा" लगाने से आवाज़ लंबी हो जाती है: क → का, म → मा।', 'शहर में: बोर्ड पर "राम" पढ़ो। गाँव में: "गाय" बोलो - ग + ा + य।', ['क + ा = ?', 'का', 'कि', 'कु', 'के']],
      ['तीन अक्षर वाले शब्द', 'तीन अक्षर जोड़कर शब्द बनते हैं: कमल, नमक, बतख।', 'शहर में: रसोई में "नमक" ढूँढो। गाँव में: तालाब में "कमल" और "बतख" देखो।', ['न + म + क = ?', 'नमक', 'कमल', 'बतख', 'मगर']],
      ['कविता - चंदा मामा', '"चंदा मामा दूर के" - रात को आसमान में चाँद चमकता है।', 'शहर में: बालकनी से चाँद देखो। गाँव में: आँगन में चारपाई पर लेटकर चाँद देखो।', ['चाँद कब दिखता है?', 'रात को', 'दोपहर को', 'कभी नहीं', 'केवल स्कूल में']],
    ],
    '1': [
      ['वर्णमाला', 'हिंदी वर्णमाला में स्वर और व्यंजन होते हैं। अ से अः तक 13 वर्ण (अं, अः सहित) और क से ह तक 33 व्यंजन, साथ में क्ष, त्र, ज्ञ, श्र।', 'शहर में: गाड़ी की नंबर प्लेट पर हिंदी अक्षर पढ़ो। गाँव में: दुकान का नाम पढ़ो।', ['अ से अः तक कितने वर्ण पढ़ाए जाते हैं?', '13', '33', '26', '10']],
      ['इ और ई की मात्रा (ि ी)', 'छोटी इ की मात्रा (ि) अक्षर से पहले लगती है, बड़ी ई की मात्रा (ी) अक्षर के बाद: कि, की।', 'शहर में: पुस्तकालय में "किताब"। गाँव में: त्योहार पर "खीर"।', ['"किताब" में कौन-सी मात्रा है?', 'ि (छोटी इ)', 'ी (बड़ी ई)', 'ा', 'ु']],
      ['कहानी - प्यासा कौआ', 'कौए ने घड़े में कंकड़ डाले, पानी ऊपर आया और उसने पानी पी लिया। सीख: हिम्मत और बुद्धि से काम लो।', 'शहर में: बोतल में कंकड़ डालकर देखो। गाँव में: मटके में कंकड़ डालो - पानी ऊपर आ जाएगा!', ['कौए ने घड़े में क्या डाला?', 'कंकड़', 'दूध', 'रेत', 'पत्ते']],
    ],
    '2': [
      ['संज्ञा', 'किसी व्यक्ति, स्थान, वस्तु या भाव के नाम को संज्ञा कहते हैं: राम, दिल्ली, किताब।', 'शहर में: "नोएडा" - स्थान का नाम। गाँव में: "बैल" - जानवर का नाम। दोनों संज्ञा हैं!', ['संज्ञा किसे कहते हैं?', 'नाम बताने वाले शब्द को', 'काम बताने वाले शब्द को', 'रंग बताने वाले शब्द को', 'गिनती को']],
      ['लिंग', 'पुल्लिंग = पुरुष जाति (लड़का, घोड़ा)। स्त्रीलिंग = स्त्री जाति (लड़की, घोड़ी)।', 'शहर में: दुकानदार भैया - पुल्लिंग। गाँव में: गाय - स्त्रीलिंग।', ['"घोड़ी" किस लिंग का शब्द है?', 'स्त्रीलिंग', 'पुल्लिंग', 'दोनों', 'कोई नहीं']],
      ['वचन', 'एकवचन = एक वस्तु (केला)। बहुवचन = अनेक वस्तुएँ (केले)।', 'शहर में: एक बस, कई बसें। गाँव में: एक पेड़, कई पेड़।', ['"केला" का बहुवचन क्या है?', 'केले', 'केलाएँ', 'केली', 'केलों']],
    ],
    '3': [
      ['सर्वनाम', 'संज्ञा के स्थान पर आने वाले शब्द सर्वनाम कहलाते हैं: मैं, तुम, वह, हम। "राम स्कूल गया, वह पढ़ता है।"', 'शहर में: "वह मेट्रो से आया।" गाँव में: "वह खेत गया।" - वह = सर्वनाम।', ['इनमें सर्वनाम कौन-सा है?', 'वह', 'घर', 'सुंदर', 'दौड़ना']],
      ['विशेषण', 'संज्ञा की विशेषता बताने वाले शब्द विशेषण कहलाते हैं: लाल सेब, मोटा आदमी, पाँच केले।', 'शहर में: "ऊँची इमारत"। गाँव में: "हरा खेत"। ऊँची/हरा = विशेषण।', ['"लाल गुलाब" में विशेषण कौन-सा है?', 'लाल', 'गुलाब', 'दोनों', 'कोई नहीं']],
      ['क्रिया', 'काम होने या करने का बोध कराने वाले शब्द क्रिया कहलाते हैं: खाना, पढ़ना, दौड़ना, लिखना।', 'शहर में: "बच्चे साइकिल चलाते हैं।" गाँव में: "किसान हल चलाता है।" चलाना = क्रिया।', ['क्रिया कौन-सा शब्द है?', 'दौड़ना', 'घर', 'नीला', 'मैं']],
    ],
    '4': [
      ['पर्यायवाची शब्द', 'समान अर्थ वाले शब्द पर्यायवाची कहलाते हैं: पानी = जल, नीर। सूरज = रवि, दिनकर।', 'शहर में: नल का "जल"। गाँव में: कुएँ का "नीर"। दोनों का अर्थ पानी है!', ['"सूरज" का पर्यायवाची कौन-सा है?', 'रवि', 'चंद्र', 'तारा', 'बादल']],
      ['विलोम शब्द', 'उल्टे अर्थ वाले शब्द विलोम कहलाते हैं: दिन-रात, सच-झूठ, अंदर-बाहर।', 'शहर में: लिफ़्ट "ऊपर-नीचे"। गाँव में: कुएँ से बाल्टी "ऊपर-नीचे"।', ['"दिन" का विलोम क्या है?', 'रात', 'सुबह', 'सूरज', 'शाम']],
      ['पत्र लेखन (छुट्टी के लिए प्रार्थना-पत्र)', 'प्रार्थना-पत्र में ये भाग होते हैं: सेवा में, विषय, संबोधन, मुख्य बात, धन्यवाद, नाम और दिनांक।', 'शहर में: प्रधानाचार्य को छुट्टी का पत्र। गाँव में: शादी में जाने के लिए छुट्टी का पत्र।', ['छुट्टी का प्रार्थना-पत्र किसे लिखते हैं?', 'प्रधानाचार्य को', 'मित्र को', 'दुकानदार को', 'किसी को नहीं']],
    ],
    '5': [
      ['मुहावरे', 'मुहावरा एक विशेष अर्थ देता है: "आँख का तारा" = बहुत प्यारा। "नाक में दम करना" = बहुत परेशान करना।', 'शहर में: जाम ने "नाक में दम" कर दिया। गाँव में: बेटा माँ की "आँख का तारा" है।', ['"आँख का तारा" का अर्थ क्या है?', 'बहुत प्यारा', 'आँख में दर्द', 'तारा देखना', 'गुस्सा']],
      ['काल', 'भूतकाल = बीता हुआ समय (मैंने खाया)। वर्तमान काल = अभी का समय (मैं खा रहा हूँ)। भविष्यत् काल = आने वाला समय (मैं खाऊँगा)।', 'शहर में: "कल मॉल जाऊँगा" - भविष्यत् काल। गाँव में: "कल मेला गया था" - भूतकाल।', ['"मैं कल स्कूल जाऊँगा" - कौन-सा काल है?', 'भविष्यत् काल', 'भूतकाल', 'वर्तमान काल', 'कोई नहीं']],
      ['निबंध लेखन', 'निबंध के तीन भाग होते हैं: भूमिका (शुरुआत), विस्तार (मुख्य बातें) और उपसंहार (अंत)।', 'शहर में: "मेरा शहर" पर निबंध। गाँव में: "मेरा गाँव" पर निबंध।', ['निबंध की शुरुआत को क्या कहते हैं?', 'भूमिका', 'उपसंहार', 'शीर्षक', 'विस्तार']],
    ],
    '6': [
      ['संधि', 'दो वर्णों के मेल से होने वाले परिवर्तन को संधि कहते हैं: विद्या + आलय = विद्यालय (दीर्घ संधि)।', 'शहर में: "पुस्तकालय" (पुस्तक + आलय)। गाँव में: "देवालय" (देव + आलय)।', ['विद्या + आलय = ?', 'विद्यालय', 'विद्याआलय', 'विद्यलय', 'विद्याला']],
      ['समास', 'दो या अधिक शब्दों के मेल से बने नए छोटे शब्द को समास कहते हैं: राजा का पुत्र = राजपुत्र। माता-पिता = द्वंद्व समास।', 'शहर में: "रसोईघर" (रसोई के लिए घर)। गाँव में: "गंगाजल" (गंगा का जल)।', ['"गंगाजल" का समास-विग्रह क्या है?', 'गंगा का जल', 'गंगा और जल', 'जल की गंगा', 'गंगा से जल']],
      ['वाक्य के भेद', 'अर्थ के आधार पर वाक्य के छह भेद हैं: विधानवाचक, निषेधवाचक, प्रश्नवाचक, आज्ञावाचक, इच्छावाचक, विस्मयादिबोधक।', 'शहर में: "क्या मेट्रो आ गई?" - प्रश्नवाचक। गाँव में: "खेत में मत जाओ!" - निषेधवाचक।', ['"क्या तुम आओगे?" - कौन-सा वाक्य है?', 'प्रश्नवाचक', 'आज्ञावाचक', 'विस्मयादिबोधक', 'विधानवाचक']],
    ],
    '7': [
      ['उपसर्ग और प्रत्यय', 'उपसर्ग शब्द के आगे लगता है (अनु + दान = अनुदान)। प्रत्यय शब्द के पीछे लगता है (धन + वान = धनवान)।', 'शहर में: "परदेस" (पर + देस)। गाँव में: "खेतिहर" (खेती + हर)।', ['"धनवान" में प्रत्यय कौन-सा है?', 'वान', 'धन', 'ध', 'वन']],
      ['अलंकार परिचय', 'काव्य की शोभा बढ़ाने वाले तत्वों को अलंकार कहते हैं - अनुप्रास (एक वर्ण की आवृत्ति), उपमा (तुलना)।', 'शहर में: "चारु चंद्र की चंचल किरणें" - अनुप्रास। गाँव में: "मुख चंद्रमा के समान है" - उपमा।', ['एक ही वर्ण बार-बार आए तो कौन-सा अलंकार होता है?', 'अनुप्रास', 'उपमा', 'रूपक', 'यमक']],
      ['अनुच्छेद लेखन', 'किसी एक विषय पर 100-150 शब्दों का छोटा अनुच्छेद - साफ़ भाषा में और क्रम से।', 'शहर में: "मेट्रो यात्रा" पर अनुच्छेद। गाँव में: "बरसात का दिन" पर अनुच्छेद।', ['अनुच्छेद लगभग कितने शब्दों का होता है?', '100-150', '10', '1000', '5']],
    ],
    '8': [
      ['रस परिचय', 'काव्य पढ़ने या सुनने से जो आनंद मिलता है, उसे रस कहते हैं। नौ रस हैं - शृंगार, हास्य, करुण, वीर, रौद्र, भयानक, वीभत्स, अद्भुत, शांत।', 'शहर में: हास्य कवि सम्मेलन - हास्य रस। गाँव में: आल्हा गायन - वीर रस।', ['काव्य में मुख्य रूप से कितने रस माने जाते हैं?', '9', '5', '12', '3']],
      ['वाच्य', 'कर्तृवाच्य (राम ने खाना खाया), कर्मवाच्य (राम द्वारा खाना खाया गया), भाववाच्य (मुझसे चला नहीं जाता)।', 'शहर में: "मुझसे चला नहीं जाता" - भाववाच्य। गाँव में: "किसान ने फ़सल काटी" - कर्तृवाच्य।', ['"राम द्वारा पत्र लिखा गया" - कौन-सा वाच्य है?', 'कर्मवाच्य', 'कर्तृवाच्य', 'भाववाच्य', 'कोई नहीं']],
      ['औपचारिक पत्र', 'कार्यालय या अधिकारी को लिखा जाने वाला पत्र: सेवा में, विषय, महोदय, विनम्र भाषा, भवदीय।', 'शहर में: नगर निगम को सफ़ाई के लिए पत्र। गाँव में: ग्राम प्रधान को सड़क के लिए पत्र।', ['औपचारिक पत्र किसे लिखा जाता है?', 'अधिकारी को', 'मित्र को', 'भाई को', 'माँ को']],
    ],
  },

  English: {
    'Play School': [
      ['Alphabet A to Z', 'English has 26 letters: A for Apple, B for Ball, C for Cat.', 'City: "M" for Metro. Village: "C" for Cow.', ['A for ?', 'Apple', 'Ball', 'Dog', 'Sun']],
      ['Colour Names', 'Red, Blue, Green, Yellow - say the colour of everything you see.', 'City: the traffic light is red, yellow and green. Village: green fields and yellow mustard flowers.', ['What colour is a leaf?', 'Green', 'Red', 'Black', 'Pink']],
      ['Poem - Twinkle Twinkle Little Star', 'Twinkle, twinkle, little star,\nHow I wonder what you are!\nUp above the world so high,\nLike a diamond in the sky.\n(Jane Taylor)\nMeaning: a child wonders about the shining star in the sky.', 'City: look at the stars from your rooftop. Village: see many stars in the open sky.', ['Twinkle twinkle little ___?', 'Star', 'Car', 'Jar', 'Bar']],
    ],
    Nursery: [
      ['Capital and Small Letters', 'Capital letters: A B C. Small letters: a b c. A name always starts with a capital letter.', 'City: "DELHI" in capitals on a sign board. Village: "Ram" - R is capital.', ['Small letter of "B"?', 'b', 'd', 'p', 'q']],
      ['Phonics Sounds', 'Every letter has a sound: a as in apple, b as in bat, c as in cat (k sound).', 'City: b-u-s = bus. Village: c-o-w = cow.', ['"Cat" starts with which sound?', 'k', 's', 't', 'a']],
      ['Animal Names', 'Cow, Dog, Cat, Lion, Hen - learn the names of animals around you.', 'City: a lion at the zoo. Village: a cow and hens near the house.', ['Which animal gives us milk?', 'Cow', 'Dog', 'Hen', 'Lion']],
    ],
    KG: [
      ['Three Letter Words', 'C-A-T = Cat, B-A-T = Bat, H-E-N = Hen. Three letters make one word.', 'City: B-U-S. Village: H-E-N, C-O-W.', ['P-E-N = ?', 'Pen', 'Pan', 'Pin', 'Pun']],
      ['This and That', 'This = something near you. That = something far away.', 'City: "This is my bag, that is a bus." Village: "This is a cow, that is a tree."', ['Which word is used for something far away?', 'That', 'This', 'These', 'Is']],
      ['My Family Words', 'Mother, Father, Brother, Sister, Grandfather, Grandmother.', 'City: "My father goes to the office." Village: "My grandfather works in the field."', ['Your father’s mother is your ___?', 'Grandmother', 'Sister', 'Aunt', 'Mother']],
    ],
    '1': [
      ['Naming Words (Nouns)', 'Words that name a person, place, animal or thing are nouns: Ram, Delhi, pen, dog.', 'City: Noida, metro - nouns. Village: tractor, well - nouns.', ['Which is a noun?', 'Pen', 'Run', 'Big', 'Fast']],
      ['A and An', 'Use "an" before a vowel sound (a, e, i, o, u): an apple. Use "a" before other sounds: a cat.', 'City: a bus, an auto. Village: a cow, an ox.', ['___ egg', 'an', 'a', 'the', 'is']],
      ['Opposite Words', 'Big-Small, Hot-Cold, Up-Down, Happy-Sad.', 'City: a tall building and a short shop. Village: a big tree and a small plant.', ['Opposite of "Hot"?', 'Cold', 'Warm', 'Sun', 'Big']],
    ],
    '2': [
      ['Singular and Plural', 'One = singular (boy). Many = plural (boys). Box → boxes, child → children.', 'City: one car, two cars. Village: one goat, many goats.', ['Plural of "child"?', 'Children', 'Childs', 'Childes', 'Child']],
      ['Is, Am, Are', 'I → am. He / she / it / one thing → is. We / you / they / many things → are.', 'City: "The metro is fast." Village: "The cows are in the field."', ['I ___ a student.', 'am', 'is', 'are', 'be']],
      ['Action Words (Verbs)', 'Words that show action are verbs: run, eat, read, write, play.', 'City: "Children play cricket in the park." Village: "Farmers plough the field."', ['Which is a verb?', 'Run', 'Table', 'Red', 'Happy']],
    ],
    '3': [
      ['Pronouns', 'Words used in place of nouns: I, you, he, she, it, we, they.', 'City: "Riya takes the bus. She is smart." Village: "Ramu milks the cow. He is strong."', ['Pronoun for "Sita"?', 'She', 'He', 'It', 'They']],
      ['Adjectives', 'Describing words: big, red, tall, beautiful, five.', 'City: "a tall building". Village: "a green field". Tall and green are adjectives.', ['"A red apple" - which word is the adjective?', 'red', 'apple', 'a', 'none']],
      ['Simple Sentences', 'A sentence has a subject and a verb: "Ravi eats a mango." Start with a capital letter and end with a full stop.', 'City: "Mom buys milk." Village: "Grandma feeds the cow."', ['A sentence ends with a ___?', 'Full stop', 'Comma', 'Capital letter', 'Nothing']],
    ],
    '4': [
      ['Present Tense', 'Use it for things that happen every day: "I go to school." With he / she, add s to the verb: "She goes."', 'City: "He takes the metro daily." Village: "She feeds the hens daily."', ['She ___ to school.', 'goes', 'go', 'going', 'gone']],
      ['Prepositions', 'Words that show position: in, on, under, behind, near.', 'City: "The phone is on the table." Village: "The cat is under the cot."', ['The book is ___ the bag (inside).', 'in', 'on', 'under', 'behind']],
      ['Story Writing', 'A story has a beginning, a middle, an end and a moral.', 'City: "The lost puppy in the mall". Village: "The clever farmer".', ['What comes at the end of a story?', 'The moral', 'The title', 'The date', 'The address']],
    ],
    '5': [
      ['Past and Future Tense', 'Past: "I played." Future: "I will play." Present: "I play."', 'City: "Yesterday I went to the mall." Village: "Tomorrow I will go to the fair."', ['"I will go" - which tense?', 'Future', 'Past', 'Present', 'None']],
      ['Adverbs', 'Adverbs tell us more about verbs: slowly, quickly, loudly, well.', 'City: "The car moved slowly in traffic." Village: "The bull ran quickly."', ['"He runs fast" - which word is the adverb?', 'fast', 'He', 'runs', 'none']],
      ['Informal Letter', 'A letter to a friend or relative: address, date, Dear ___, body, Yours lovingly.', 'City: a letter to your cousin about a Delhi trip. Village: a letter to a friend about the harvest festival.', ['An informal letter is written to a ___?', 'Friend', 'Principal', 'Manager', 'Police officer']],
    ],
    '6': [
      ['Parts of Speech', 'There are 8 parts of speech: noun, pronoun, verb, adjective, adverb, preposition, conjunction, interjection.', 'City: "Wow! The metro is fast." - "Wow" is an interjection. Village: "Ram and Shyam farm." - "and" is a conjunction.', ['How many parts of speech are there?', '8', '5', '10', '6']],
      ['Subject-Verb Agreement', 'A singular subject takes a singular verb (He plays). A plural subject takes a plural verb (They play).', 'City: "The buses are late." Village: "The farmer works hard."', ['The boys ___ playing.', 'are', 'is', 'am', 'was']],
      ['Paragraph Writing', 'One topic, a topic sentence first, 3-4 supporting lines and a conclusion.', 'City: "My Favourite Market". Village: "A Morning in My Village".', ['The first line of a paragraph is the ___?', 'Topic sentence', 'Conclusion', 'Date', 'Title']],
    ],
    '7': [
      ['Active and Passive Voice', 'Active: "Ram wrote a letter." Passive: "A letter was written by Ram."', 'City: "The police stopped the car" → "The car was stopped by the police." Village: "The farmer cut the crop" → "The crop was cut by the farmer."', ['Which word usually appears in the passive voice?', 'by', 'and', 'or', 'so']],
      ['Direct and Indirect Speech', 'Direct: He said, "I am happy." Indirect: He said that he was happy.', 'City: Mom said, "Take the bus." → Mom told me to take the bus.', ['In indirect speech, which word often follows "said"?', 'that', 'and', 'but', 'is']],
      ['Notice Writing', 'A notice has: NOTICE, school name, date, heading, body (what, when, where), name and designation. About 50 words.', 'City: a notice for a Science Exhibition. Village: a notice for a Tree Plantation Drive.', ['About how many words is a notice?', '50', '500', '5', '1000']],
    ],
    '8': [
      ['Clauses', 'A clause is a group of words with a subject and a verb. A main clause can stand alone; a subordinate clause cannot.', 'City: "I stayed home because it rained." Village: "When the bell rang, we went home."', ['"because it rained" is a ___ clause.', 'Subordinate', 'Main', 'Noun', 'None']],
      ['Modals', 'can (ability), may (permission), must (duty), should (advice), will (future).', 'City: "You must wear a helmet." Village: "You should save water."', ['Which modal gives advice?', 'should', 'can', 'may', 'will']],
      ['Formal Letter and Email', 'Formal letter: sender’s address, date, receiver, subject, Sir/Madam, body, Yours faithfully. Email: To, Subject, short body.', 'City: an email to the municipal office about garbage. Village: a letter to the block officer about a hand pump.', ['A formal letter ends with ___?', 'Yours faithfully', 'Yours lovingly', 'Bye', 'Love']],
    ],
  },

  Maths: {
    'Play School': [
      ['Counting 1 to 10', 'Count 1, 2, 3 ... 10. Count on your fingers!', 'City: count 5 cars in the parking. Village: count 3 goats.', ['What comes after 3?', '4', '2', '5', '1']],
      ['Shapes', 'Circle (round), square, triangle, rectangle.', 'City: a roti is round, a mobile is a rectangle. Village: the chulha opening is round, a samosa is a triangle!', ['What shape is a roti?', 'Circle', 'Square', 'Triangle', 'Rectangle']],
      ['Big and Small', 'An elephant is big, a mouse is small. Compare and find which is bigger.', 'City: a bus is big, a cycle is small. Village: a tree is big, a plant is small.', ['Which is big?', 'Elephant', 'Mouse', 'Ant', 'Mosquito']],
    ],
    Nursery: [
      ['Counting 1 to 50', 'Count from 1 to 50. Learn the tens: 10, 20, 30, 40, 50.', 'City: count 20 stairs in your building. Village: count 30 mangoes on the tree.', ['What comes after 20?', '21', '19', '30', '12']],
      ['Before and After', 'Before = the number that comes first. After = the number that comes next. Before 5 is 4, after 5 is 6.', 'City: in a lift, 2nd floor comes before 3rd. Village: house 8 comes after house 7.', ['What comes after 9?', '10', '8', '7', '11']],
      ['More and Less', 'The group with more things has "more". The other has "less".', 'City: 5 toffees vs 2 toffees - 5 is more. Village: 4 mangoes vs 1 mango - 4 is more.', ['Which is more - 7 or 3?', '7', '3', 'Both are equal', 'Cannot say']],
    ],
    KG: [
      ['Counting 1 to 100', 'Count from 1 to 100. Count in tens: 10, 20 ... 100.', 'City: a 100 rupee note. Village: count 100 bricks.', ['What comes after 99?', '100', '90', '98', '101']],
      ['Addition (Single Digit)', 'Addition means putting together. 2 + 3 = 5. Count on your fingers.', 'City: 2 pencils + 3 pencils = 5 pencils. Village: 2 hens + 1 hen = 3 hens.', ['2 + 3 = ?', '5', '6', '4', '23']],
      ['Subtraction (Single Digit)', 'Subtraction means taking away. 5 - 2 = 3.', 'City: 5 balloons, 2 burst, 3 are left. Village: 6 mangoes, 2 eaten, 4 are left.', ['5 - 2 = ?', '3', '7', '2', '4']],
    ],
    '1': [
      ['Numbers 1 to 100', 'Read, write and count numbers forwards and backwards. 45 = forty-five.', 'City: read bus number 45. Village: count the sheep up to 100.', ['In 45, what is the tens digit?', '4', '5', '45', '0']],
      ['Addition', 'Add 2-digit numbers: 12 + 5 = 17. Add the ones first, then the tens.', 'City: a Rs 10 biscuit + a Rs 5 toffee = Rs 15. Village: 12 eggs + 6 eggs = 18 eggs.', ['12 + 5 = ?', '17', '15', '7', '125']],
      ['Subtraction', '18 - 6 = 12. Take the smaller number away from the bigger one.', 'City: Rs 20 minus a Rs 8 toffee leaves Rs 12. Village: 15 mangoes, 5 sold, 10 left.', ['18 - 6 = ?', '12', '24', '10', '14']],
    ],
    '2': [
      ['Place Value (Tens and Ones)', '34 = 3 tens + 4 ones = 30 + 4.', 'City: a 34-floor building - 3 tens, 4 ones. Village: 34 goats = 30 + 4.', ['In 56, what is the ones digit?', '6', '5', '50', '56']],
      ['Tables 2 to 5', 'Learn the tables: 2 x 3 = 6, 3 x 4 = 12, 5 x 5 = 25. Say them every day!', 'City: 3 packets with 4 biscuits each = 12 biscuits. Village: 5 baskets with 2 mangoes each = 10 mangoes.', ['3 x 4 = ?', '12', '7', '34', '9']],
      ['Money', 'Coins and notes: Rs 1, 2, 5, 10 coins; Rs 10, 20, 50, 100 notes.', 'City: a Rs 50 note at the shop. Village: a Rs 10 coin at the fair.', ['Two Rs 10 notes = ?', 'Rs 20', 'Rs 10', 'Rs 12', 'Rs 100']],
    ],
    '3': [
      ['Numbers up to 1000', '3-digit numbers: 345 = 3 hundreds + 4 tens + 5 ones.', 'City: a Rs 500 note. Village: 250 kg of wheat.', ['In 345, what is the hundreds digit?', '3', '4', '5', '34']],
      ['Multiplication', 'Multiplication is repeated addition. 4 x 3 = 4 + 4 + 4 = 12.', 'City: 4 rows with 3 cars each = 12 cars. Village: 3 fields with 4 trees each = 12 trees.', ['4 x 3 = ?', '12', '7', '43', '1']],
      ['Time', 'On a clock, the short hand shows hours and the long hand shows minutes. 1 hour = 60 minutes.', 'City: the school bus comes at 7:30. Village: going to the field at 5 in the morning.', ['1 hour = ? minutes', '60', '100', '30', '24']],
    ],
    '4': [
      ['Division', 'Division means sharing equally. 12 ÷ 3 = 4.', 'City: 12 chocolates shared by 3 friends = 4 each. Village: 20 mangoes shared by 4 children = 5 each.', ['12 ÷ 3 = ?', '4', '9', '15', '36']],
      ['Fractions', 'A fraction is a part of a whole. Half a roti = 1/2, a quarter = 1/4.', 'City: a pizza cut into 4 pieces, you eat 1 = 1/4. Village: half a roti = 1/2.', ['Half = ?', '1/2', '1/4', '2/1', '1/3']],
      ['Measurement (Length and Weight)', '1 metre = 100 cm, 1 km = 1000 m, 1 kg = 1000 g, 1 litre = 1000 ml.', 'City: the metro station is 2 km away. Village: 1 kg jaggery, 1 litre milk.', ['1 kg = ? g', '1000', '100', '10', '500']],
    ],
    '5': [
      ['Numbers', 'Large numbers: 1,00,000 = one lakh. Indian place values: ones, tens, hundreds, thousands, ten thousands, lakhs.', 'City: Noida’s population is in lakhs. Village: a Rs 1,00,000 tractor loan.', ['1,00,000 = ?', 'One lakh', 'Ten thousand', 'One crore', 'One hundred']],
      ['Addition', 'Add large numbers with carrying: 2,345 + 1,678 = 4,023.', 'City: a Rs 2,345 phone cover + Rs 1,678 = Rs 4,023. Village: 1,250 kg + 750 kg of wheat = 2,000 kg.', ['1,250 + 750 = ?', '2,000', '1,900', '2,100', '1,000']],
      ['Multiplication', 'What is multiplication? Repeated addition! 2 x 3 = 6 (2 + 2 + 2). Bigger example: 25 x 4 = 100.', 'City: 5 pens at Rs 10 each, total = 5 x 10 = Rs 50. Village: 6 sacks of 50 kg each = 300 kg.', ['5 pens at Rs 10 each - total?', 'Rs 50', 'Rs 15', 'Rs 510', 'Rs 5']],
    ],
    '6': [
      ['Integers', 'Positive numbers (+3), negative numbers (-3) and 0. On the number line, negatives are to the left of 0.', 'City: the basement in a lift is floor -1. Village: winter temperature in the hills can be -2 °C.', ['-3 + 5 = ?', '2', '-8', '8', '-2']],
      ['Fractions and Decimals', '1/2 = 0.5, 1/4 = 0.25.', 'City: 0.5 litre of petrol. Village: 2.5 kg of potatoes.', ['1/2 as a decimal?', '0.5', '0.2', '1.2', '2.0']],
      ['Basic Geometry', 'Point, line, line segment, ray, angle. A right angle = 90°.', 'City: the corner of a building is 90°. Village: the boundary of a field is a line segment.', ['A right angle = ?', '90°', '180°', '45°', '360°']],
    ],
    '7': [
      ['Rational Numbers', 'Numbers of the form p/q where q ≠ 0: 3/4, -2/5, 7 (= 7/1).', 'City: 3/4 litre of juice. Village: 1/2 bigha of land.', ['Which is a rational number?', '3/4', '3/0', 'None', '∞']],
      ['Simple Equations', 'Equation: x + 5 = 12, so x = 7. Do the same thing on both sides.', 'City: x rupees + Rs 5 bus fare = Rs 12, so x = 7. Village: x kg + 3 kg = 10 kg, so x = 7.', ['x + 5 = 12, x = ?', '7', '17', '5', '12']],
      ['Perimeter and Area', 'Rectangle: perimeter = 2(l + b), area = l x b.', 'City: a 10 m x 5 m room has area 50 m². Village: a 20 m x 10 m field has area 200 m².', ['Area of a 5 x 4 rectangle?', '20', '18', '9', '40']],
    ],
    '8': [
      ['Squares and Square Roots', 'Square: 5² = 25. Square root: √25 = 5.', 'City: 16 tiles in a 4 x 4 square. Village: a square field of 100 m² has a side of 10 m.', ['√49 = ?', '7', '9', '49', '24.5']],
      ['Linear Equations', 'One variable: 2x + 3 = 11 → 2x = 8 → x = 4.', 'City: 2 tickets + Rs 3 = Rs 11, so 1 ticket = Rs 4. Village: 2 sacks + 3 kg = 11 kg, so 1 sack = 4 kg.', ['2x + 3 = 11, x = ?', '4', '7', '8', '3']],
      ['Percentage and Profit-Loss', 'Percent means "out of 100". Profit = SP - CP. Profit % = Profit / CP x 100.', 'City: an item bought for Rs 100 and sold for Rs 120 = 20% profit. Village: grain bought for Rs 500 and sold for Rs 450 = Rs 50 loss.', ['CP 100, SP 120 - profit %?', '20%', '120%', '12%', '2%']],
    ],
  },

  Science: {
    'Play School': [
      ['My Body Parts', 'Eyes (see), ears (hear), nose (smell), hands and legs.', 'City and village: we see with our eyes and hear with our ears!', ['What do we see with?', 'Eyes', 'Ears', 'Nose', 'Legs']],
      ['Fruits and Vegetables', 'Fruits: mango, banana, apple. Vegetables: potato, tomato, cauliflower.', 'City: the vegetable market or supermarket. Village: fresh vegetables from the field.', ['A mango is a ___?', 'Fruit', 'Vegetable', 'Animal', 'Toy']],
      ['Animals Around Us', 'Pet animals: cow, dog, cat. Wild animals: lion, elephant, monkey.', 'City: a dog in the street, a lion at the zoo. Village: a cow and a buffalo at home.', ['Which is a pet animal?', 'Cow', 'Lion', 'Cheetah', 'Wolf']],
    ],
    Nursery: [
      ['Sense Organs', 'Eyes, ears, nose, tongue and skin are our five sense organs.', 'City: we hear a horn with our ears. Village: we smell flowers with our nose.', ['What do we taste with?', 'Tongue', 'Eyes', 'Ears', 'Hands']],
      ['Day and Night', 'The Sun shines in the day; the Moon and stars shine at night.', 'City: street lights at night. Village: fireflies and stars at night.', ['What shines in the day?', 'The Sun', 'The Moon', 'Stars', 'A bulb']],
      ['Water', 'We need water to drink, bathe and cook. Save water!', 'City: water from a tap. Village: water from a hand pump or well.', ['What should we do with water?', 'Save it', 'Waste it', 'Throw it', 'Nothing']],
    ],
    KG: [
      ['Plants Around Us', 'Trees, plants, grass and creepers. Trees give us fruit, shade and fresh air.', 'City: trees in the park. Village: neem and peepal trees.', ['What do trees give us?', 'Shade', 'Smoke', 'Garbage', 'Noise']],
      ['Good Habits', 'Wash your hands, brush your teeth, take a bath, sleep early.', 'City and village: wash your hands with soap before eating!', ['What should we do before eating?', 'Wash hands', 'Sleep', 'Play', 'Watch TV']],
      ['Seasons', 'Summer, rainy season and winter. Cotton clothes in summer, woollen clothes in winter.', 'City: AC and heaters. Village: paddy is planted in the rainy season.', ['What clothes do we wear in winter?', 'Woollen', 'Cotton', 'Paper', 'None']],
    ],
    '1': [
      ['Living and Non-Living Things', 'Living things breathe, grow and eat - people, trees, animals. Non-living things do not - a stone, a chair.', 'City: a car is non-living, a dog is living. Village: a plough is non-living, an ox is living.', ['Which is living?', 'Tree', 'Stone', 'Chair', 'Bottle']],
      ['Our Food', 'Food gives us energy. From plants: dal, rice. From animals: milk, eggs.', 'City: milk packets from the dairy. Village: milk from the family cow.', ['Where does milk come from?', 'Cow', 'Tree', 'Stone', 'Soil']],
      ['Clean Water', 'Drink clean water. Boil or filter water before drinking.', 'City: an RO filter. Village: boil water before drinking.', ['How can we make water safe?', 'By boiling it', 'By adding soil', 'Nothing', 'By adding salt']],
    ],
    '2': [
      ['Parts of a Plant', 'Root, stem, leaf, flower and fruit.', 'City: a tulsi plant in a pot. Village: a wheat plant in the field.', ['Which part takes in water?', 'Root', 'Leaf', 'Flower', 'Fruit']],
      ['Animal Homes', 'Dog - kennel, bird - nest, lion - den, fish - water.', 'City: pigeons make nests on balconies. Village: cows live in a cowshed, horses in a stable.', ['What is a bird’s home called?', 'Nest', 'Den', 'Kennel', 'Stable']],
      ['Air Around Us', 'We cannot see air but we can feel it. We need air to breathe.', 'City: we feel air from a fan. Village: kites fly in the wind.', ['Can we see air?', 'No', 'Yes', 'Sometimes', 'Only at night']],
    ],
    '3': [
      ['Food and Health', 'A balanced diet has grains (energy), dal (protein), fruits and vegetables (vitamins). Eat less junk food.', 'City: fewer burgers, more dal-roti. Village: chana, jaggery and milk are healthy!', ['Which food gives protein?', 'Dal', 'Chips', 'Cold drink', 'Toffee']],
      ['Birds', 'Birds have feathers, a beak and two legs. Parrot, peacock (national bird), crow, sparrow.', 'City: pigeons and crows. Village: peacocks, parrots and herons in the fields.', ['India’s national bird?', 'Peacock', 'Parrot', 'Crow', 'Pigeon']],
      ['Our Earth', 'The Earth is round. About 3/4 is water and 1/4 is land. It moves around the Sun.', 'City: a globe in the classroom. Village: watch the sunrise and sunset.', ['Shape of the Earth?', 'Round', 'Flat', 'Square', 'Triangle']],
    ],
    '4': [
      ['Food Chain', 'Grass → deer → lion. Plants are producers; animals are consumers.', 'City: grain → mouse → cat. Village: grass → goat → human.', ['A food chain starts with ___?', 'Plants', 'Lion', 'Humans', 'Stones']],
      ['Teeth and Digestion', 'Four types of teeth: incisors (cut), canines (tear), premolars and molars (grind). Food is digested in the stomach.', 'City and village: brush twice a day; chewing sugarcane makes teeth strong.', ['Which teeth grind food?', 'Molars', 'Incisors', 'Canines', 'None']],
      ['Matter - Solid, Liquid, Gas', 'Solids have a fixed shape (stone). Liquids flow (water). Gases spread out (steam).', 'City: ice cube → water → steam. Village: water boiling on the chulha.', ['Water is a ___?', 'Liquid', 'Solid', 'Gas', 'None']],
    ],
    '5': [
      ['Human Skeleton', 'An adult body has 206 bones. The skull protects the brain; the ribs protect the heart and lungs.', 'City: bones in an X-ray. Village: drink milk for strong bones.', ['How many bones in an adult body?', '206', '100', '300', '50']],
      ['Photosynthesis', 'Leaves make food using sunlight, water and carbon dioxide, and give out oxygen.', 'City: give your balcony plant sunlight. Village: crops grow in the sunlight.', ['What do leaves give out?', 'Oxygen', 'Smoke', 'Carbon dioxide', 'Water']],
      ['Safety and First Aid', 'Clean a cut with clean water and put a bandage on it. Cool a burn with cold water. Emergency number: 112.', 'City: cross the road at a zebra crossing. Village: go to a hospital at once after a snake bite.', ['India’s emergency number?', '112', '100100', '0', '555']],
    ],
    '6': [
      ['Components of Food', 'Carbohydrates (energy), proteins (growth), fats, vitamins, minerals, fibre and water.', 'City: oats, paneer. Village: bajra roti, buttermilk, saag.', ['Which nutrient helps the body grow?', 'Protein', 'Fat', 'Fibre', 'Water']],
      ['Separation of Substances', 'Methods: filtration, winnowing, evaporation, sedimentation.', 'City: straining tea with a strainer. Village: winnowing grain with a soop.', ['Separating husk from grain is called ___?', 'Winnowing', 'Filtration', 'Using a magnet', 'Boiling']],
      ['Light and Shadow', 'Light travels in a straight line. An opaque object makes a shadow.', 'City: your shadow under a street light. Village: a tree’s shadow is short at noon.', ['How does light travel?', 'In a straight line', 'In a circle', 'In a zigzag', 'Backwards']],
    ],
    '7': [
      ['Nutrition in Plants', 'Autotrophs make their own food (green plants). Amarbel is a parasite - it takes food from other plants.', 'City: a money plant. Village: amarbel wrapped around a tree.', ['Organisms that make their own food are ___?', 'Autotrophs', 'Parasites', 'Heterotrophs', 'Humans']],
      ['Heat', 'A thermometer measures temperature. Heat moves by conduction (metals), convection (water/air) and radiation (from the Sun).', 'City: ACs are fitted high up - convection. Village: an iron kadhai heats quickly - conduction.', ['Normal human body temperature?', '37 °C', '100 °C', '0 °C', '50 °C']],
      ['Acids, Bases and Salts', 'Acids taste sour (lemon). Bases are bitter and soapy (soap). Acid + base = salt + water.', 'City: baking soda is a base. Village: tamarind is sour (acid), lime (chuna) is a base.', ['Lemon juice is a(n) ___?', 'Acid', 'Base', 'Salt', 'Neutral']],
    ],
    '8': [
      ['Crop Production', 'Kharif crops (rainy season - paddy) and rabi crops (winter - wheat). Steps: ploughing, sowing, manure, irrigation, harvesting.', 'City: grain arrives at the mandi. Village: wheat is sown in the rabi season.', ['Wheat is a ___ crop.', 'Rabi', 'Kharif', 'Zaid', 'None']],
      ['Microorganisms', 'Tiny living things - bacteria, viruses, fungi. Some are useful (curd), some cause disease.', 'City: bacteria in packaged curd. Village: home-made curd is set by Lactobacillus.', ['What sets milk into curd?', 'Bacteria', 'Viruses', 'Mosquitoes', 'Soil']],
      ['Force and Pressure', 'Force is a push or a pull. Pressure = force / area.', 'City: a sharp nail goes in easily (small area). Village: an ox pulls a cart - force.', ['Pressure = ?', 'Force / Area', 'Force x Area', 'Mass x g', 'Area / Force']],
    ],
  },

  SST: {
    'Play School': [
      ['My Family', 'Mother, father, brother, sister, grandfather, grandmother - my family.', 'City: a small family in a flat. Village: a big family in one house.', ['Your father’s father is your ___?', 'Grandfather', 'Uncle', 'Brother', 'Cousin']],
      ['My School', 'At school, teachers teach us, we meet friends and we learn.', 'City: going by school bus. Village: walking or cycling to school.', ['Who teaches at school?', 'Teacher', 'Doctor', 'Driver', 'Farmer']],
      ['Helpers', 'Doctor (treatment), postman (letters), farmer (grain), police (safety).', 'City: a traffic police officer. Village: a farmer in the field.', ['Who grows grain?', 'Farmer', 'Doctor', 'Postman', 'Pilot']],
    ],
    Nursery: [
      ['My Home', 'A home has rooms: kitchen, bedroom, bathroom. Our home keeps us safe.', 'City: a flat in an apartment. Village: a house with a courtyard.', ['Where is food cooked?', 'Kitchen', 'Bathroom', 'Roof', 'Garage']],
      ['Means of Transport', 'Land: bus, car, train. Water: boat, ship. Air: aeroplane.', 'City: metro, auto. Village: tractor, bullock cart.', ['What flies in the sky?', 'Aeroplane', 'Bus', 'Boat', 'Train']],
      ['Our Festivals', 'Diwali, Holi, Eid, Christmas, Gurpurab - we celebrate together.', 'City: Diwali lights in the society. Village: fairs, and Holi songs.', ['The festival of colours?', 'Holi', 'Diwali', 'Eid', 'Christmas']],
    ],
    KG: [
      ['Community Helpers', 'Plumber (taps), electrician (electricity), sanitation worker, nurse.', 'City: sanitation workers collect garbage. Village: the ASHA worker gives vaccines.', ['Who fixes taps?', 'Plumber', 'Barber', 'Tailor', 'Cobbler']],
      ['Traffic Rules', 'Red = stop, yellow = get ready, green = go. Cross at the zebra crossing.', 'City: stop at the signal. Village: walk carefully on the highway.', ['What do you do at a red light?', 'Stop', 'Go', 'Run', 'Dance']],
      ['National Symbols', 'Tiranga (flag), peacock (bird), tiger (animal), lotus (flower), mango (fruit).', 'City: the tiranga on 15 August. Village: lotus flowers in the pond.', ['India’s national flower?', 'Lotus', 'Rose', 'Marigold', 'Sunflower']],
    ],
    '1': [
      ['My Neighbourhood', 'Places near us: shops, park, hospital, school, post office.', 'City: mall, metro station. Village: chaupal, panchayat bhawan.', ['Where do we go for treatment?', 'Hospital', 'School', 'Park', 'Bank']],
      ['Our Clothes', 'Summer: cotton. Winter: woollen. Rainy season: raincoat.', 'City: school uniform. Village: dhoti-kurta, saree.', ['What do we wear in the rain?', 'Raincoat', 'Sweater', 'Shawl', 'Nothing']],
      ['Types of Houses', 'Kachcha (mud), pucca (brick and cement), hut, flat, houseboat.', 'City: flats. Village: kachcha and pucca houses.', ['A house of brick and cement is ___?', 'Pucca', 'Kachcha', 'A tent', 'A hut']],
    ],
    '2': [
      ['Village and City', 'Village: farming, open spaces. City: factories, offices, crowds.', 'City: Noida, Delhi. Village: villages of Bulandshahr.', ['Where is there more farming?', 'Village', 'City', 'Mall', 'Airport']],
      ['Means of Communication', 'Phone, letter, TV, internet, newspaper.', 'City: WhatsApp video call. Village: radio, mobile.', ['Who delivers letters?', 'Postman', 'Doctor', 'Teacher', 'Driver']],
      ['Good Citizen', 'Follow rules, keep places clean, plant trees, vote when you grow up.', 'City: put garbage in the dustbin. Village: help clean the village.', ['Where should garbage go?', 'Dustbin', 'Road', 'Drain', 'Field']],
    ],
    '3': [
      ['Our State - Uttar Pradesh', 'UP’s capital is Lucknow. The Ganga and Yamuna flow here. It is the state with the largest population.', 'City: Lucknow, Noida, Kanpur. Village: the fields of Bulandshahr.', ['Capital of UP?', 'Lucknow', 'Delhi', 'Agra', 'Kanpur']],
      ['Maps and Directions', 'Four directions: north, south, east, west. The Sun rises in the east.', 'City: Google Maps. Village: find directions by looking at the Sun.', ['Where does the Sun rise?', 'East', 'West', 'North', 'South']],
      ['Our Country India', 'Capital: New Delhi. 28 states and 8 union territories. The Himalayas are in the north.', 'City: India Gate in Delhi. Village: the country’s grain comes from villages.', ['Capital of India?', 'New Delhi', 'Mumbai', 'Lucknow', 'Kolkata']],
    ],
    '4': [
      ['Rivers of India', 'Ganga (longest river in India), Yamuna, Brahmaputra, Godavari, Narmada.', 'City: the Yamuna flows through Delhi. Village: farming on the banks of the Ganga (near Narora, Bulandshahr).', ['Longest river in India?', 'Ganga', 'Yamuna', 'Narmada', 'Kaveri']],
      ['Indian Farmers', 'Farmers grow our grain using tractors, tube-wells and manure. "Jai Jawan Jai Kisan".', 'City: grain reaches the mandi and supermarket. Village: farmers go to the fields in the morning.', ['Who gave the slogan "Jai Jawan Jai Kisan"?', 'Lal Bahadur Shastri', 'Mahatma Gandhi', 'Jawaharlal Nehru', 'Bhagat Singh']],
      ['Gram Panchayat', 'The village government - the Pradhan (Sarpanch) is elected. Cities have a Nagar Nigam.', 'City: Nagar Nigam - Mayor. Village: Gram Pradhan.', ['Head of the village panchayat?', 'Pradhan', 'Mayor', 'Prime Minister', 'DM']],
    ],
    '5': [
      ['Continents and Oceans', '7 continents (Asia is the largest), 5 oceans (Pacific is the largest).', 'City: find India on the globe. Village: our village is in Asia!', ['Largest continent?', 'Asia', 'Africa', 'Europe', 'Australia']],
      ['Freedom Fighters', 'Gandhi ji, Bhagat Singh, Rani Laxmibai, Subhas Chandra Bose, Nehru ji. India became free on 15 August 1947.', 'City: Gandhi Smriti, Delhi. Village: in 1857, people of Meerut and Bulandshahr also fought.', ['When did India become free?', '15 August 1947', '26 January 1950', '2 October 1869', '1857']],
      ['Our Constitution', 'The Constitution came into force on 26 January 1950. Dr B. R. Ambedkar was its chief architect.', 'City: the Republic Day parade. Village: flag hoisting at school.', ['Chief architect of the Constitution?', 'Dr Ambedkar', 'Gandhi ji', 'Sardar Patel', 'Tilak']],
    ],
    '6': [
      ['Earth in the Solar System', 'There are 8 planets. Earth is the third planet from the Sun. The Moon is Earth’s satellite.', 'City: a planetarium. Village: watch the stars at night.', ['Earth is the ___ planet from the Sun.', 'Third', 'First', 'Fifth', 'Eighth']],
      ['Early Humans', 'Hunting, stone tools, discovery of fire, then farming.', 'City: stone tools in a museum. Village: farming began in this way.', ['Early humans made tools of ___?', 'Stone', 'Plastic', 'Steel', 'Gold']],
      ['Panchayati Raj', 'Three levels: Gram Panchayat, Kshetra Panchayat (block), Zila Panchayat.', 'City: ward councillor. Village: Gram Sabha meeting.', ['How many levels in Panchayati Raj?', '3', '2', '5', '1']],
    ],
    '7': [
      ['Delhi Sultans and Mughals', 'Delhi Sultanate (1206-1526), Mughals (from Babur in 1526). Akbar, Shah Jahan (Taj Mahal).', 'City: Qutub Minar, Red Fort (Delhi). Village: hear old stories from your grandparents.', ['Who built the Taj Mahal?', 'Shah Jahan', 'Akbar', 'Babur', 'Aurangzeb']],
      ['Environment', 'Natural (air, water, trees) and human-made (buildings, roads). Reduce pollution.', 'City: poor AQI - plant trees. Village: do not burn stubble.', ['How can we reduce pollution?', 'Plant trees', 'Burn garbage', 'Use more cars', 'Use more plastic']],
      ['Equality in Democracy', 'Every person is equal. Every adult (18+) has one vote.', 'City: everyone is equal on the metro. Village: everyone votes in the pradhan election.', ['Voting age in India?', '18', '21', '16', '25']],
    ],
    '8': [
      ['Resources', 'Natural (water, soil), human-made, and human resources. Renewable vs non-renewable.', 'City: solar panels - renewable. Village: gobar gas - renewable.', ['Which is renewable?', 'Solar energy', 'Coal', 'Petrol', 'Diesel']],
      ['The Revolt of 1857', 'The first war of independence. It began in Meerut on 10 May 1857. Mangal Pandey, Rani Laxmibai.', 'City: Meerut, Delhi. Village: people of Bulandshahr-Malagarh also fought.', ['Where did the 1857 revolt begin?', 'Meerut', 'Mumbai', 'Chennai', 'Patna']],
      ['Parliament', 'Parliament = Lok Sabha + Rajya Sabha + President. It makes laws.', 'City: Parliament House, Delhi. Village: our MP represents our area.', ['Who makes laws?', 'Parliament', 'Police', 'Courts', 'DM']],
    ],
  },

  Computer: {
    'Play School': [
      ['What Is a Computer', 'A computer is a machine - for study, games and songs.', 'City: computers in offices. Village: computers at the CSC (Jan Seva Kendra).', ['A computer is a ___?', 'Machine', 'Animal', 'Fruit', 'Tree']],
      ['Mouse', 'We click with the mouse. It is small and looks like a mouse!', 'City and village: hold the mouse and click!', ['What do we click with?', 'Mouse', 'Monitor', 'CPU', 'Speaker']],
      ['Keyboard', 'A keyboard has letters and numbers - we use it to type.', 'City: keyboards at a cyber cafe. Village: keyboards in the school lab.', ['What do we type with?', 'Keyboard', 'Mouse', 'Speaker', 'Printer']],
    ],
    Nursery: [
      ['Computer Parts', 'Monitor (like a TV), CPU (the brain), keyboard, mouse.', 'City: a laptop has all parts together. Village: separate parts in the lab.', ['The brain of the computer?', 'CPU', 'Mouse', 'Monitor', 'Speaker']],
      ['Uses of Computers', 'Study, banking, ticket booking, drawing, games.', 'City: booking railway tickets online. Village: Aadhaar and farmer registration at the CSC.', ['What can a computer do?', 'Book tickets', 'Cook food', 'Take a bath', 'Sleep']],
      ['Do’s and Don’ts', 'Use with clean hands, keep food and water away, do not look at the screen for too long.', 'City and village: sit quietly in the computer lab.', ['What should we keep away from a computer?', 'Water', 'Notebook', 'Pencil', 'Teacher']],
    ],
    KG: [
      ['Monitor and CPU', 'Pictures appear on the monitor. The CPU thinks and does all the work.', 'City: an office monitor. Village: the monitor at the CSC.', ['Where do pictures appear?', 'Monitor', 'CPU', 'Mouse', 'Keyboard']],
      ['Mouse Clicks', 'Left click (select), double click (open), right click (menu).', 'City and village: open a game with a double click.', ['To open a file we ___?', 'Double click', 'Right click', 'Do nothing', 'Scroll']],
      ['Paint Basics', 'Draw in MS Paint with the brush, colours and shapes.', 'City: draw your house. Village: draw a field and the Sun.', ['Which software do we draw in?', 'Paint', 'Calculator', 'Excel', 'Chrome']],
    ],
    '1': [
      ['Computer - A Machine', 'A computer works on human commands - fast, correct and without getting tired.', 'City: an ATM is also a computer! Village: the bank mitra’s machine.', ['Does a computer get tired?', 'No', 'Yes', 'At night', 'On Sunday']],
      ['Parts of a Computer', 'Monitor, CPU, keyboard, mouse, speaker, printer.', 'City: print copies with a printer. Village: print forms at the CSC.', ['Sound comes from the ___?', 'Speaker', 'Mouse', 'Monitor', 'CPU']],
      ['Using a Mouse', 'Parts of a mouse: left button, right button, scroll wheel.', 'City and village: use the scroll wheel to move a page up and down.', ['What moves a page up and down?', 'Scroll wheel', 'Left button', 'Wire', 'Mouse pad']],
    ],
    '2': [
      ['Keyboard Keys', 'Alphabet keys, number keys, space bar (the longest key), Enter, Backspace (to erase).', 'City and village: type your name; press Backspace if you make a mistake.', ['The longest key?', 'Space bar', 'Enter', 'Shift', 'Esc']],
      ['MS Paint', 'Tools: pencil, brush, fill (colour), eraser, shapes.', 'City: draw a car. Village: draw a bullock cart.', ['Which tool fills colour?', 'Fill', 'Eraser', 'Pencil', 'Text']],
      ['Uses of Computers', 'Schools, hospitals, banks, railways, homes - everywhere.', 'City: hospital reports. Village: crop insurance online for farmers.', ['Do banks use computers?', 'Yes', 'No', 'Never', 'Cannot say']],
    ],
    '3': [
      ['Input and Output Devices', 'Input: keyboard, mouse, microphone. Output: monitor, printer, speaker.', 'City: scanning an Aadhaar card (input). Village: printing a form (output).', ['Which is an output device?', 'Printer', 'Keyboard', 'Mouse', 'Microphone']],
      ['Starting and Shutting Down', 'Start: press the power button. Shut down: Start → Power → Shut down. Never just switch off the plug.', 'City and village: always shut down properly after work.', ['The right way to switch off?', 'Shut down', 'Pull the plug', 'Pull the wire', 'Pour water']],
      ['Typing Practice', 'Home row keys: A S D F - J K L ;. Use both hands.', 'City and village: practise typing for 10 minutes every day.', ['The home row keys are ___?', 'ASDF JKL;', 'QWERTY', '1234', 'ZXCV']],
    ],
    '4': [
      ['Memory and Storage', 'RAM (temporary), ROM (permanent), hard disk, pen drive. Units: KB, MB, GB.', 'City: a 128 GB phone. Village: photos on a pen drive.', ['1 GB = ? MB', '1024', '100', '10', '1000000']],
      ['MS Word Basics', 'Type, bold (Ctrl+B), italic (Ctrl+I), underline (Ctrl+U), save (Ctrl+S).', 'City: make a resume. Village: type the panchayat notice.', ['Shortcut to save?', 'Ctrl + S', 'Ctrl + B', 'Ctrl + P', 'Alt + F4']],
      ['Introduction to the Internet', 'The internet is a network of computers around the world. Browser: Chrome. Search: Google.', 'City: online classes. Village: check mandi prices online.', ['Which is a browser?', 'Chrome', 'Word', 'Paint', 'Excel']],
    ],
    '5': [
      ['Operating System', 'The OS runs the computer: Windows, Linux, Android (phones).', 'City: Android on your phone. Village: Windows on the school PC.', ['A phone’s operating system?', 'Android', 'Word', 'Chrome', 'Excel']],
      ['MS PowerPoint', 'Make slides for a presentation. New slide: Ctrl+M.', 'City: slides for a science project. Village: a "My Village" presentation.', ['Shortcut for a new slide?', 'Ctrl + M', 'Ctrl + S', 'Ctrl + N', 'Ctrl + Z']],
      ['Internet Safety', 'Never share your password or OTP. Do not open unknown links.', 'City: avoid fake shopping links. Village: a "you won a lottery" call is a fraud.', ['Who should you share your OTP with?', 'No one', 'A friend', 'A stranger', 'Everyone']],
    ],
    '6': [
      ['Hardware and Software', 'Hardware can be touched (mouse). Software cannot be touched (Chrome, Word).', 'City: a laptop is hardware, Zoom is software. Village: a mobile is hardware, a UPI app is software.', ['Which is software?', 'MS Word', 'Mouse', 'Monitor', 'Printer']],
      ['MS Excel Basics', 'Rows (1, 2, 3) + columns (A, B, C) = cells (A1). Use it for tables and calculations.', 'City: a household budget. Village: a milk account.', ['What is A1?', 'A cell', 'A row', 'A sheet', 'A file']],
      ['Email', 'An email address looks like name@gmail.com. Parts: To, Subject, Body, Attachment.', 'City: a job application by email. Village: a scholarship form by email.', ['What comes after @ in an email address?', 'The domain (gmail.com)', 'The password', 'The name', 'The phone number']],
    ],
    '7': [
      ['Number System (Binary)', 'Computers understand only 0 and 1 (binary). 5 = 101.', 'City and village: a bulb ON = 1, OFF = 0!', ['Binary digits are ___?', '0 and 1', '0 to 9', '1 to 10', 'A to Z']],
      ['Excel Formulas', '=SUM(A1:A5), =AVERAGE(), =MAX(). Every formula starts with =.', 'City: total shop sales. Village: a month’s milk with =SUM.', ['A formula starts with ___?', '=', '+', '#', '@']],
      ['Scratch Programming', 'Join blocks to make games and animations. Sprite (character), script (blocks).', 'City and village: make the cat move and make a sound.', ['A character in Scratch is a ___?', 'Sprite', 'Cell', 'Slide', 'Tab']],
    ],
    '8': [
      ['Networking Basics', 'Connected computers form a network. LAN (small), WAN (large), Wi-Fi.', 'City: an office LAN. Village: BharatNet brings internet to villages.', ['The internet is which type of network?', 'WAN', 'LAN', 'PAN', 'None']],
      ['Introduction to HTML', 'HTML is the language of web pages. Tags: <h1>, <p>, <img>. Files end in .html.', 'City: a website for a shop. Village: make a website for your village!', ['Tag for a paragraph?', '<p>', '<h1>', '<img>', '<a>']],
      ['Cyber Safety and AI', 'Use strong passwords and 2-step verification. AI = machines that learn (like ChatGPT and Claude).', 'City: beware of deepfake videos. Village: avoid fake KYC calls - report fraud on 1930.', ['India’s cyber fraud helpline?', '1930', '100', '108', '101']],
    ],
  },

};

// ---------------- Hindi: कहानियाँ (सीख वाली) और कविताएँ - हर कक्षा में 1 कहानी + 1 कविता ----------------
// कहानियाँ: पारंपरिक लोककथाएँ / पंचतंत्र (अपने शब्दों में), प्रेमचंद (सार्वजनिक)। कविताएँ: Master Ji की नई रचनाएँ,
// और सार्वजनिक (public domain) कवियों - सुभद्रा कुमारी चौहान, मैथिलीशरण गुप्त - की कुछ पंक्तियाँ।
export const HINDI_KAHANI_KAVITA = {
  'Play School': [
    ['कहानी - चींटी और कबूतर', 'एक चींटी नदी में गिर गई। पेड़ पर बैठे कबूतर ने एक पत्ता पानी में गिरा दिया। चींटी पत्ते पर चढ़कर बच गई।\nकुछ दिन बाद एक शिकारी कबूतर पर निशाना लगा रहा था। चींटी ने शिकारी के पैर में काट लिया। शिकारी चिल्लाया और कबूतर उड़ गया।\nसीख: दूसरों की मदद करो, वे भी तुम्हारी मदद करेंगे।', 'शहर में: पार्क में गिरे बच्चे को उठाओ। गाँव में: पड़ोसी की गाय खो जाए तो ढूँढने में मदद करो।', ['चींटी को किसने बचाया?', 'कबूतर ने', 'शिकारी ने', 'मछली ने', 'शेर ने']],
    ['कविता - मेरी गुड़िया', 'मेरी गुड़िया प्यारी-प्यारी,\nपहने लाल रंग की साड़ी।\nरोज़ सुबह वह जल्दी उठती,\nमेरे साथ वह खाना खाती।\nरात को मैं उसे सुलाऊँ,\nलोरी गाकर उसे बहलाऊँ।\n(रचना: Master Ji)', 'शहर में: अपने खिलौने को नाम दो। गाँव में: मिट्टी या कपड़े की गुड़िया बनाओ।', ['गुड़िया ने किस रंग की साड़ी पहनी है?', 'लाल', 'नीली', 'हरी', 'पीली']],
  ],
  Nursery: [
    ['कहानी - शेर और चूहा', 'एक शेर सो रहा था। एक छोटा चूहा उसके ऊपर कूदने लगा। शेर जाग गया और चूहे को पकड़ लिया। चूहे ने कहा, "मुझे छोड़ दो, मैं कभी तुम्हारी मदद करूँगा।" शेर हँसा और उसे छोड़ दिया।\nएक दिन शेर शिकारी के जाल में फँस गया। चूहे ने अपने दाँतों से जाल काट दिया और शेर आज़ाद हो गया।\nसीख: किसी को छोटा मत समझो। हर कोई काम आ सकता है।', 'शहर में: छोटा भाई भी तुम्हारी मदद कर सकता है। गाँव में: छोटी-सी चींटी भी मिलकर बड़ा काम करती है।', ['जाल किसने काटा?', 'चूहे ने', 'शेर ने', 'शिकारी ने', 'हाथी ने']],
    ['कविता - आओ हाथ धोएँ', 'खाने से पहले, खेल के बाद,\nहाथ धोना रखना याद।\nसाबुन लेकर झाग बनाओ,\nउँगली-उँगली ख़ूब रगड़ाओ।\nसाफ़ हाथ से रोटी खाओ,\nकीटाणुओं को दूर भगाओ।\n(रचना: Master Ji)', 'शहर में: नल पर साबुन से हाथ धोओ। गाँव में: हैंडपंप पर साबुन से हाथ धोओ।', ['खाने से पहले क्या करना चाहिए?', 'हाथ धोना', 'सोना', 'खेलना', 'टीवी देखना']],
  ],
  KG: [
    ['कहानी - खरगोश और कछुआ', 'खरगोश को अपनी तेज़ दौड़ पर बहुत घमंड था। उसने कछुए को दौड़ की चुनौती दी। दौड़ शुरू हुई, खरगोश बहुत आगे निकल गया और पेड़ के नीचे सो गया।\nकछुआ धीरे-धीरे पर बिना रुके चलता रहा। जब खरगोश जागा, कछुआ जीत चुका था।\nसीख: धीरे-धीरे पर लगातार मेहनत करने वाला जीतता है। घमंड मत करो।', 'शहर में: रोज़ थोड़ा-थोड़ा पढ़ो, परीक्षा में जीत तुम्हारी। गाँव में: किसान रोज़ मेहनत करता है, तभी फ़सल अच्छी होती है।', ['दौड़ किसने जीती?', 'कछुए ने', 'खरगोश ने', 'शेर ने', 'किसी ने नहीं']],
    ['कविता - सूरज दादा', 'सूरज दादा सुबह आते,\nलाल-सुनहरी धूप फैलाते।\nचिड़िया चहकें, फूल खिलें,\nखेतों में सब काम चलें।\nशाम हुई तो घर को जाते,\nकल फिर आने का वादा कर जाते।\n(रचना: Master Ji)', 'शहर में: सुबह छत पर जाकर सूरज उगते देखो। गाँव में: खेत में सूरज के साथ काम शुरू होता है।', ['सूरज दादा कब आते हैं?', 'सुबह', 'रात को', 'कभी नहीं', 'केवल रविवार को']],
  ],
  '1': [
    ['कहानी - लालची कुत्ता', 'एक कुत्ते को रोटी का टुकड़ा मिला। वह उसे मुँह में दबाकर पुल पार कर रहा था। पानी में उसे अपनी परछाईं दिखी। उसे लगा कि दूसरा कुत्ता बड़ी रोटी लिए खड़ा है।\nलालच में उसने भौंकने के लिए मुँह खोला - और उसकी अपनी रोटी पानी में गिर गई।\nसीख: लालच बुरी बला है। जो मिला है, उसमें संतोष करो।', 'शहर में: दुकान से ज़्यादा टॉफ़ी के लालच में झगड़ा मत करो। गाँव में: मेले में ज़्यादा पाने के लालच में अपना सामान मत खोओ।', ['कुत्ते की रोटी कहाँ गिरी?', 'पानी में', 'सड़क पर', 'घर में', 'पेड़ पर']],
    ['कविता - मेरा प्यारा गाँव', 'हरे-भरे हैं खेत जहाँ,\nमीठे-मीठे आम वहाँ।\nनीम की ठंडी छाँव तले,\nबच्चे खेलें, गीत चलें।\nगाय रँभाए, मोर नचे,\nमेरा गाँव सबसे अच्छा लगे।\n(रचना: Master Ji)', 'शहर में: छुट्टियों में दादा-दादी के गाँव जाओ। गाँव में: अपने गाँव की तीन अच्छी बातें लिखो।', ['कविता में किस पेड़ की छाँव है?', 'नीम', 'आम', 'पीपल', 'बरगद']],
  ],
  '2': [
    ['कहानी - ईमानदार लकड़हारा', 'एक गरीब लकड़हारे की कुल्हाड़ी नदी में गिर गई। वह रोने लगा। जल देवता प्रकट हुए और सोने की कुल्हाड़ी निकालकर लाए। लकड़हारे ने कहा, "यह मेरी नहीं है।" फिर चाँदी की कुल्हाड़ी लाए, उसने फिर मना किया।\nअंत में लोहे की कुल्हाड़ी आई। लकड़हारा बोला, "हाँ, यही मेरी है!" उसकी ईमानदारी से ख़ुश होकर देवता ने उसे तीनों कुल्हाड़ियाँ दे दीं।\nसीख: ईमानदारी सबसे अच्छी नीति है।', 'शहर में: रास्ते में मिला पर्स पुलिस या मालिक को लौटाओ। गाँव में: दुकानदार ज़्यादा पैसे लौटाए तो वापस कर दो।', ['लकड़हारे ने कौन-सी कुल्हाड़ी अपनी बताई?', 'लोहे की', 'सोने की', 'चाँदी की', 'लकड़ी की']],
    ['कविता - पेड़ लगाओ', 'आओ मिलकर पेड़ लगाएँ,\nधरती को हम हरा बनाएँ।\nपेड़ हमें दें फल और छाया,\nशुद्ध हवा का अनमोल माया।\nरोज़ इन्हें हम पानी देंगे,\nबदले में ये जीवन देंगे।\n(रचना: Master Ji)', 'शहर में: बालकनी या पार्क में पौधा लगाओ। गाँव में: खेत की मेड़ पर पेड़ लगाओ।', ['पेड़ हमें क्या देते हैं?', 'फल और छाया', 'धुआँ', 'शोर', 'कचरा']],
  ],
  '3': [
    ['कहानी - एकता में बल', 'एक किसान के चार बेटे थे जो आपस में लड़ते रहते थे। किसान ने उन्हें लकड़ियों का एक गट्ठर दिया और कहा, "इसे तोड़ो।" कोई भी उसे तोड़ नहीं पाया।\nफिर किसान ने गट्ठर खोलकर एक-एक लकड़ी दी। सबने आसानी से तोड़ दी। किसान बोला, "अगर तुम साथ रहोगे तो कोई तुम्हें हरा नहीं सकेगा।"\nसीख: एकता में बल है।', 'शहर में: स्कूल प्रोजेक्ट मिलकर करो तो जल्दी और अच्छा बनता है। गाँव में: सब मिलकर गाँव की सफ़ाई करें।', ['गट्ठर क्यों नहीं टूटा?', 'लकड़ियाँ एक साथ बँधी थीं', 'लकड़ियाँ लोहे की थीं', 'बेटे थके थे', 'किसान ने मना किया']],
    ['कविता - बारिश आई', 'काले-काले बादल छाए,\nठंडी-ठंडी हवा चलाए।\nटप-टप-टप बूँदें गिरतीं,\nसूखी धरती ख़ुश हो जाती।\nकागज़ की हम नाव चलाएँ,\nबारिश में हम गाना गाएँ।\n(रचना: Master Ji)', 'शहर में: बारिश में सड़क पर पानी भरा - संभलकर चलो। गाँव में: बारिश में धान की रोपाई होती है।', ['बारिश में बच्चे क्या चलाते हैं?', 'कागज़ की नाव', 'साइकिल', 'पतंग', 'कार']],
  ],
  '4': [
    ['कहानी - चींटी और टिड्डा', 'गर्मियों में चींटी दिन-रात दाने इकट्ठे करती थी। टिड्डा गाना गाता और हँसता, "इतनी मेहनत क्यों करती हो?"\nसर्दी आई। चारों ओर बर्फ़ थी और खाना नहीं मिलता था। चींटी के पास भरपूर दाने थे, पर टिड्डा भूखा काँप रहा था। तब उसे समझ आया कि समय पर मेहनत करनी चाहिए थी।\nसीख: आज की मेहनत कल का सहारा है। आलस्य मत करो।', 'शहर में: परीक्षा से पहले रोज़ पढ़ो, आख़िरी दिन नहीं। गाँव में: किसान अनाज बचाकर रखता है ताकि पूरे साल काम आए।', ['सर्दी में कौन भूखा रहा?', 'टिड्डा', 'चींटी', 'दोनों', 'कोई नहीं']],
    ['कविता - मेहनत', 'मेहनत से जो पढ़ते हैं,\nवही आगे बढ़ते हैं।\nगिरकर फिर जो उठते हैं,\nवही मंज़िल तक चलते हैं।\nआलस्य को दूर भगाओ,\nमेहनत से नाम कमाओ।\n(रचना: Master Ji)', 'शहर में: रोज़ एक घंटा पढ़ाई का नियम बनाओ। गाँव में: खेत में मेहनत से ही फ़सल लहलहाती है।', ['कविता के अनुसार आगे कौन बढ़ता है?', 'मेहनत से पढ़ने वाला', 'आलसी', 'सोने वाला', 'शोर करने वाला']],
  ],
  '5': [
    ['कहानी - बंदर और मगरमच्छ', 'नदी किनारे जामुन के पेड़ पर एक बंदर रहता था। उसकी दोस्ती एक मगरमच्छ से हो गई। बंदर उसे रोज़ मीठे जामुन देता था। मगरमच्छ की पत्नी ने कहा, "जो रोज़ जामुन खाता है, उसका कलेजा कितना मीठा होगा! मुझे वह चाहिए।"\nमगरमच्छ बंदर को पीठ पर बिठाकर नदी के बीच ले गया और सच बता दिया। बंदर ने तुरंत सोचा और कहा, "अरे! मेरा कलेजा तो पेड़ पर रखा है, चलो वापस लेने चलते हैं।" किनारे पहुँचते ही बंदर पेड़ पर चढ़ गया और बच गया।\nसीख: मुसीबत में घबराओ नहीं, बुद्धि से काम लो। (पंचतंत्र)', 'शहर में: कोई अनजान व्यक्ति लालच दे तो समझदारी से मना करो। गाँव में: मुसीबत में घबराने के बजाय उपाय सोचो।', ['बंदर ने अपनी जान कैसे बचाई?', 'बुद्धि से', 'लड़कर', 'रोकर', 'भागकर']],
    ['कविता - झाँसी की रानी (सुभद्रा कुमारी चौहान)', 'प्रसिद्ध पंक्तियाँ:\n"बुंदेले हरबोलों के मुँह हमने सुनी कहानी थी,\nख़ूब लड़ी मर्दानी वह तो झाँसी वाली रानी थी।"\nभावार्थ: यह कविता 1857 की वीरांगना रानी लक्ष्मीबाई की वीरता का गुणगान करती है। रानी ने अंग्रेज़ों से डटकर युद्ध किया और देश के लिए बलिदान दिया।', 'शहर में: 19 नवंबर (रानी लक्ष्मीबाई जयंती) पर कविता पाठ करो। गाँव में: लोक-गीतों में भी वीरों की कहानियाँ गाई जाती हैं।', ['"झाँसी की रानी" कविता किसने लिखी?', 'सुभद्रा कुमारी चौहान', 'महादेवी वर्मा', 'प्रेमचंद', 'तुलसीदास']],
  ],
  '6': [
    ['कहानी - सोने का अंडा देने वाली मुर्गी', 'एक किसान के पास एक मुर्गी थी जो रोज़ एक सोने का अंडा देती थी। किसान धीरे-धीरे अमीर होने लगा, पर उसका लालच बढ़ता गया।\nउसने सोचा, "मुर्गी के पेट में बहुत सारे अंडे होंगे, एक साथ निकाल लूँ।" उसने मुर्गी को मार डाला, पर पेट में एक भी अंडा नहीं मिला। अब रोज़ मिलने वाला अंडा भी हमेशा के लिए चला गया।\nसीख: लालच में आकर जल्दबाज़ी करने से जो है, वह भी चला जाता है।', 'शहर में: जल्दी अमीर बनाने वाली नकली स्कीमों से बचो। गाँव में: धीरज से खेती करने वाला ही फ़ायदा पाता है।', ['इस कहानी की मुख्य सीख क्या है?', 'लालच बुरा है', 'मुर्गी पालो', 'सोना ख़रीदो', 'जल्दी सोओ']],
    ['कविता - नर हो, न निराश करो मन को (मैथिलीशरण गुप्त)', 'प्रसिद्ध पंक्तियाँ:\n"नर हो, न निराश करो मन को,\nकुछ काम करो, कुछ काम करो,\nजग में रह कर कुछ नाम करो।"\nभावार्थ: राष्ट्रकवि मैथिलीशरण गुप्त कहते हैं कि मनुष्य को कभी निराश नहीं होना चाहिए। मेहनत करते रहो और अच्छे कामों से संसार में नाम कमाओ।', 'शहर में: परीक्षा में कम अंक आएँ तो निराश न हो, फिर से मेहनत करो। गाँव में: फ़सल ख़राब हो जाए तो भी किसान अगली बार फिर बोता है।', ['"राष्ट्रकवि" किसे कहा जाता है?', 'मैथिलीशरण गुप्त', 'कबीर', 'सूरदास', 'रहीम']],
  ],
  '7': [
    ['कहानी - बीरबल की खिचड़ी', 'सर्दी की रात अकबर ने घोषणा की, "जो रात भर ठंडे तालाब में खड़ा रहेगा, उसे इनाम मिलेगा।" एक गरीब आदमी पूरी रात खड़ा रहा। सुबह उसने बताया कि दूर महल का एक दीया दिखता रहा। दरबारियों ने कहा, "इसे दीये से गरमी मिली," और इनाम नहीं दिया।\nअगले दिन बीरबल दरबार नहीं आए। अकबर ने पूछा तो बोले, "खिचड़ी पका रहा हूँ।" बीरबल ने हाँडी बहुत ऊँचे पेड़ पर टाँगी थी और आग नीचे ज़मीन पर थी। अकबर हँसे, "इतनी दूर से खिचड़ी कैसे पकेगी?" बीरबल बोले, "जैसे दूर के दीये से उस आदमी को गरमी मिली!" अकबर समझ गए और गरीब को इनाम दिया।\nसीख: अन्याय के ख़िलाफ़ बुद्धिमानी से आवाज़ उठाओ। (लोककथा)', 'शहर में: किसी के साथ गलत हो तो समझदारी से सच बोलो। गाँव में: पंचायत में न्याय की बात रखो।', ['बीरबल ने खिचड़ी के उदाहरण से क्या समझाया?', 'दूर के दीये से गरमी नहीं मिलती', 'खिचड़ी स्वादिष्ट होती है', 'पेड़ ऊँचा था', 'आग तेज़ थी']],
    ['कविता - सच्चा मित्र', 'दुख में जो साथ निभाए,\nवही सच्चा मित्र कहलाए।\nग़लती पर जो टोके प्यार से,\nराह दिखाए हर बार से।\nसुख में तो सब साथ चलें,\nदुख में मित्र पहचान मिलें।\n(रचना: Master Ji)', 'शहर में: दोस्त बीमार हो तो उसे नोट्स दो। गाँव में: मुसीबत में पड़ोसी की मदद करो।', ['सच्चा मित्र कब पहचाना जाता है?', 'दुख में', 'सुख में', 'त्योहार पर', 'कभी नहीं']],
  ],
  '8': [
    ['कहानी - ईदगाह (प्रेमचंद)', 'चार साल का हामिद अपनी दादी अमीना के साथ रहता है। ईद के दिन वह तीन पैसे लेकर मेले जाता है। उसके दोस्त खिलौने और मिठाइयाँ ख़रीदते हैं, पर हामिद सोचता है कि रोटी सेंकते समय दादी के हाथ जल जाते हैं।\nवह तीन पैसे में एक चिमटा ख़रीदता है। दोस्त हँसते हैं, पर हामिद तर्क से जीत जाता है। घर पहुँचकर दादी पहले नाराज़ होती है, फिर हामिद के प्रेम को समझकर रो पड़ती है और उसे दुआएँ देती है।\nसीख: सच्चा प्रेम त्याग और दूसरों की भलाई सोचने में है।', 'शहर में: अपनी पॉकेट मनी से माता-पिता या दादा-दादी के लिए कुछ उपयोगी लाओ। गाँव में: मेले में अपनों की ज़रूरत का ध्यान रखो।', ['हामिद ने मेले से क्या ख़रीदा?', 'चिमटा', 'खिलौना', 'मिठाई', 'गुब्बारा']],
    ['कविता - मेरा भारत', 'उत्तर में हिमालय प्रहरी,\nदक्षिण में सागर की लहरी।\nगंगा-यमुना की धारा प्यारी,\nखेतों में हरियाली न्यारी।\nभाषा, भोजन, वेश अनेक,\nफिर भी हम सब भारतवासी एक।\n(रचना: Master Ji)', 'शहर में: अलग-अलग राज्यों के दोस्तों से उनकी भाषा का एक शब्द सीखो। गाँव में: गाँव के मेले में अनेक रंग दिखते हैं - यही भारत की एकता है।', ['कविता के अनुसार भारत की विशेषता क्या है?', 'अनेकता में एकता', 'केवल एक भाषा', 'केवल पहाड़', 'केवल समुद्र']],
  ],
};

const SANSKRIT_START = {
  Sanskrit: {
    'Play School': [
      ['प्रार्थना-श्लोकः', '"ॐ सह नाववतु। सह नौ भुनक्तु।" - गुरु और शिष्य साथ-साथ पढ़ें, यह प्रार्थना है।', 'नगरे ग्रामे च: विद्यालयस्य प्रार्थनासभायां श्लोकं वदत।', ['प्रार्थना कदा क्रियते? (प्रार्थना कब करते हैं?)', 'प्रातः', 'अर्धरात्रौ', 'कदापि न', 'क्रीडासमये']],
      ['सङ्ख्याः १-५', 'एकम् (१), द्वे (२), त्रीणि (३), चत्वारि (४), पञ्च (५)।', 'नगरे: पञ्च सोपानानि (५ सीढ़ियाँ)। ग्रामे: द्वौ वृषभौ (२ बैल)।', ['"पञ्च" = ?', '५', '३', '२', '१']],
      ['शरीरस्य अङ्गानि', 'नेत्रम् (आँख), कर्णः (कान), नासिका (नाक), हस्तः (हाथ), पादः (पैर)।', 'नगरे ग्रामे च: स्वनेत्रं स्पृष्ट्वा वदत - "नेत्रम्"।', ['"हस्तः" = ?', 'हाथ', 'पैर', 'आँख', 'कान']],
    ],
    Nursery: [
      ['सरस्वती-वन्दना', '"या कुन्देन्दुतुषारहारधवला..." - विद्या की देवी सरस्वती की वन्दना।', 'नगरे ग्रामे च: वसन्तपञ्चम्यां सरस्वतीवन्दना भवति।', ['सरस्वती कस्याः देवी? (सरस्वती किसकी देवी हैं?)', 'विद्यायाः', 'धनस्य', 'शक्तेः', 'वर्षायाः']],
      ['सङ्ख्याः १-१०', 'षट् (६), सप्त (७), अष्ट (८), नव (९), दश (१०)।', 'नगरे: दश तलानि (१० मंज़िल)। ग्रामे: सप्त धेनवः (७ गायें)।', ['"दश" = ?', '१०', '७', '८', '९']],
      ['फलानां नामानि', 'आम्रम् (आम), कदलीफलम् (केला), नारङ्गम् (संतरा), सेवफलम् (सेब)।', 'नगरे: फलापणः (फल की दुकान)। ग्रामे: आम्रवाटिका - आम्रम्!', ['"आम्रम्" = ?', 'आम', 'केला', 'सेब', 'अंगूर']],
    ],
    KG: [
      ['गायत्री-मन्त्रः', '"ॐ भूर्भुवः स्वः। तत्सवितुर्वरेण्यम्..." - बुद्धि के लिए प्रार्थना।', 'नगरे ग्रामे च: प्रातः शान्तमनसा मन्त्रं वदत।', ['गायत्री-मन्त्रः किमर्थम्? (किसके लिए?)', 'बुद्धये', 'क्रीडायै', 'भोजनाय', 'निद्रायै']],
      ['वर्णाः (रंगों के नाम)', 'रक्तः (लाल), नीलः (नीला), हरितः (हरा), पीतः (पीला), श्वेतः (सफ़ेद)।', 'नगरे: यातायातदीपः रक्तः। ग्रामे: क्षेत्रं हरितम्।', ['"हरितः" = ?', 'हरा', 'लाल', 'पीला', 'काला']],
      ['पशूनां नामानि', 'धेनुः (गाय), अश्वः (घोड़ा), गजः (हाथी), सिंहः (शेर)।', 'नगरे: चिडियाघरे सिंहः। ग्रामे: गृहे धेनुः।', ['"गजः" = ?', 'हाथी', 'घोड़ा', 'गाय', 'शेर']],
    ],
    '1': [
      ['वर्णमाला', 'संस्कृतवर्णमाला देवनागरीलिप्यां लिख्यते - स्वराः व्यञ्जनानि च। "क, ख, ग, घ, ङ..."', 'नगरे ग्रामे च: हिन्दीवर्णाः संस्कृतवर्णाः च समानाः सन्ति।', ['संस्कृतं कस्यां लिप्यां लिख्यते?', 'देवनागर्याम्', 'रोमनलिप्याम्', 'उर्दूलिप्याम्', 'तमिललिप्याम्']],
      ['शब्दपरिचयः', 'बालकः (लड़का), बालिका (लड़की), पुस्तकम् (किताब), विद्यालयः (स्कूल)।', 'नगरे: बालकः विद्यालयं गच्छति। ग्रामे: बालिका क्षेत्रे अस्ति।', ['"पुस्तकम्" = ?', 'किताब', 'कलम', 'घर', 'पेड़']],
      ['सरलश्लोकाः', '"मातृदेवो भव। पितृदेवो भव।" - माता-पिता देवता के समान हैं।', 'नगरे ग्रामे च: मातापित्रोः सम्मानं कुरुत।', ['"मातृदेवो भव" इत्यस्य अर्थः कः?', 'माता देवता के समान है', 'पिता गुरु है', 'गुरु देवता है', 'अतिथि देवता है']],
    ],
    '2': [
      ['लिङ्गपरिचयः', 'पुंलिङ्गम्: बालकः। स्त्रीलिङ्गम्: बालिका। नपुंसकलिङ्गम्: फलम्।', 'नगरे: बालकः विद्यालयं गच्छति। ग्रामे: लता (बेल) - स्त्रीलिङ्गम्।', ['"फलम्" किं लिङ्गम्?', 'नपुंसकलिङ्गम्', 'पुंलिङ्गम्', 'स्त्रीलिङ्गम्', 'किमपि न']],
      ['सङ्ख्याः १-२०', 'एकादश (११), द्वादश (१२) ... विंशतिः (२०)।', 'नगरे: विंशतिः रूप्यकाणि (२० रुपये)। ग्रामे: द्वादश अजाः (१२ बकरियाँ)।', ['"विंशतिः" = ?', '२०', '१२', '११', '१०']],
      ['गृहस्य वस्तूनि', 'गृहम् (घर), कपाटम् (दरवाज़ा), पात्रम् (बर्तन), दीपः (दीया)।', 'नगरे: भवनस्य कपाटम्। ग्रामे: दीपावल्यां दीपः।', ['"दीपः" = ?', 'दीया', 'दरवाज़ा', 'बर्तन', 'घर']],
    ],
    '3': [
      ['वचनपरिचयः', 'संस्कृते त्रीणि वचनानि - एकवचनम् (बालकः), द्विवचनम् (बालकौ), बहुवचनम् (बालकाः)।', 'नगरे: द्वौ बालकौ - द्विवचनम्। ग्रामे: बहवः बालकाः - बहुवचनम्।', ['संस्कृते कति वचनानि?', 'त्रीणि', 'द्वे', 'एकम्', 'चत्वारि']],
      ['सर्वनामानि (सः, सा, तत्)', 'सः (वह - पुंलिङ्ग), सा (वह - स्त्रीलिङ्ग), तत् (वह - नपुंसकलिङ्ग)।', 'नगरे: सः लोकयाने (बस में) अस्ति। ग्रामे: सा क्षेत्रे अस्ति।', ['स्त्रीलिङ्गे "वह" इति किम्?', 'सा', 'सः', 'तत्', 'अहम्']],
      ['क्रियापदानि', 'पठति (पढ़ता है), लिखति (लिखता है), खादति (खाता है), गच्छति (जाता है)।', 'नगरे: बालकः विद्यालयं गच्छति। ग्रामे: कृषकः क्षेत्रं गच्छति।', ['"पठति" = ?', 'पढ़ता है', 'लिखता है', 'खाता है', 'सोता है']],
    ],
    '4': [
      ['शब्दरूपाणि - बालक', 'प्रथमा विभक्तिः - बालकः, बालकौ, बालकाः।', 'नगरे ग्रामे च: शब्दरूपाणि गीतवत् स्मरत।', ['"बालक" शब्दस्य प्रथमा-बहुवचनम्?', 'बालकाः', 'बालकः', 'बालकौ', 'बालकम्']],
      ['धातुरूपाणि - पठ्', 'लट्लकारे प्रथमपुरुषे - पठति, पठतः, पठन्ति।', 'नगरे: छात्राः पठन्ति। ग्रामे: बालिकाः पठन्ति।', ['"पठ्" धातोः लट्लकारे प्रथमपुरुष-बहुवचनम्?', 'पठन्ति', 'पठति', 'पठतः', 'पठामि']],
      ['सुभाषितम्', '"विद्या ददाति विनयम्" - विद्या विनय (नम्रता) देती है।', 'नगरे ग्रामे च: विद्वान् जनः विनम्रः भवति।', ['विद्या किं ददाति?', 'विनयम्', 'क्रोधम्', 'धनम्', 'अहङ्कारम्']],
    ],
    '5': [
      ['कारकपरिचयः', 'सप्त विभक्तयः सम्बोधनं च - कर्ता, कर्म, करणम्, सम्प्रदानम्, अपादानम्, सम्बन्धः, अधिकरणम्, सम्बोधनम्।', 'नगरे: रामः (कर्ता) पुस्तकं (कर्म) पठति। ग्रामे: कृषकः हलेन (करणम्) कर्षति।', ['सम्बोधनसहिताः विभक्तयः कति?', 'अष्ट', 'तिस्रः', 'पञ्च', 'दश']],
      ['लट्लकारः', 'वर्तमानकाले लट्लकारः प्रयुज्यते - पठति, लिखति। "अहं पठामि" = मैं पढ़ता हूँ।', 'नगरे: अहं मेट्रोयानेन गच्छामि। ग्रामे: अहं क्षेत्रं गच्छामि।', ['लट्लकारः कस्मिन् काले प्रयुज्यते?', 'वर्तमानकाले', 'भूतकाले', 'भविष्यत्काले', 'आज्ञायाम्']],
      ['अव्ययानि', 'एते शब्दाः कदापि न परिवर्तन्ते - अत्र (यहाँ), तत्र (वहाँ), अद्य (आज), श्वः (आने वाला कल)।', 'नगरे ग्रामे च: अद्य विद्यालयः अस्ति।', ['"अत्र" = ?', 'यहाँ', 'वहाँ', 'कब', 'क्यों']],
    ],
    '6': [
      ['अकारान्त-पुंलिङ्ग-शब्दाः', 'एते शब्दाः "अ" वर्णे समाप्यन्ते - बालक, राम, देव। एषां रूपाणि समानानि चलन्ति।', 'नगरे: रामः। ग्रामे: कृषकः - अकारान्तपुंलिङ्गशब्दः।', ['अकारान्तपुंलिङ्गस्य उदाहरणं किम्?', 'बालक', 'लता', 'फल', 'नदी']],
      ['लृट्लकारः', 'भविष्यत्काले लृट्लकारः - पठिष्यति (पढ़ेगा), गमिष्यति (जाएगा)।', 'नगरे: श्वः सः दिल्लीं गमिष्यति। ग्रामे: कृषकः सस्यं कर्तिष्यति।', ['लृट्लकारः कस्मिन् काले प्रयुज्यते?', 'भविष्यत्काले', 'वर्तमानकाले', 'भूतकाले', 'आज्ञायाम्']],
      ['सङ्ख्यावाचकशब्दाः', 'एकः, द्वौ, त्रयः ... शतम् (१००), सहस्रम् (१०००)।', 'नगरे: शतं रूप्यकाणि। ग्रामे: सहस्रम् इक्षवः (गन्ने)।', ['"शतम्" = ?', '१००', '१०००', '१०', '५०']],
    ],
    '7': [
      ['सन्धिपरिचयः', 'दीर्घसन्धिः - हिम + आलयः = हिमालयः। गुणसन्धिः - महा + इन्द्रः = महेन्द्रः।', 'नगरे ग्रामे च: विद्या + आलयः = विद्यालयः!', ['हिम + आलयः = ?', 'हिमालयः', 'हिमआलयः', 'हिमलयः', 'हिमायः']],
      ['लङ्लकारः', 'भूतकाले लङ्लकारः - अपठत् (पढ़ा), अगच्छत् (गया)।', 'नगरे: ह्यः सः दिल्लीम् अगच्छत्। ग्रामे: कृषकः क्षेत्रम् अगच्छत्।', ['लङ्लकारः कस्मिन् काले प्रयुज्यते?', 'भूतकाले', 'वर्तमानकाले', 'भविष्यत्काले', 'आज्ञायाम्']],
      ['उपसर्गाः', 'प्र, परा, अप, सम्, अनु - एते धातोः पूर्वं युज्यन्ते। प्र + हरति = प्रहरति।', 'नगरे ग्रामे च: अनु + गच्छति = अनुगच्छति (पीछे जाता है)।', ['उपसर्गः कुत्र युज्यते?', 'धातोः पूर्वम्', 'धातोः पश्चात्', 'मध्ये', 'कुत्रापि न']],
    ],
    '8': [
      ['प्रत्ययाः', 'क्त्वा (करके) - पठित्वा। ल्यप् - आगम्य। तुमुन् (के लिए) - पठितुम्।', 'नगरे: भोजनं खादित्वा विद्यालयं गच्छति। ग्रामे: क्षेत्रं गन्तुम् उद्यतः।', ['"पठितुम्" इत्यत्र कः प्रत्ययः?', 'तुमुन्', 'क्त्वा', 'ल्यप्', 'कोऽपि न']],
      ['विलोमशब्दाः', 'सुखम् - दुःखम्, दिवसः - रात्रिः, जयः - पराजयः।', 'नगरे ग्रामे च: दिवसे कार्यम्, रात्रौ विश्रामः।', ['"सुखम्" इत्यस्य विलोमशब्दः कः?', 'दुःखम्', 'रात्रिः', 'जयः', 'दिवसः']],
      ['अनुवादाभ्यासः', 'हिन्दी → संस्कृतम्: "राम पढ़ता है" = "रामः पठति"।', 'नगरे: "मैं मेट्रो से जाता हूँ" = "अहं मेट्रोयानेन गच्छामि"। ग्रामे: "किसान खेत जाता है" = "कृषकः क्षेत्रं गच्छति"।', ['"राम पढ़ता है" इत्यस्य संस्कृतानुवादः?', 'रामः पठति', 'रामः लिखति', 'रामः गच्छति', 'रामः खादति']],
    ],
  },
};

// ---------------- English poems: nursery rhymes and classic poems (all public domain) - 2 per class ----------------
export const ENGLISH_POEMS = {
  'Play School': [
    ["Poem - Baa Baa Black Sheep", "Baa, baa, black sheep,\nHave you any wool?\nYes sir, yes sir,\nThree bags full.\nOne for the master,\nAnd one for the dame,\nAnd one for the little boy\nWho lives down the lane.\n(Traditional nursery rhyme)\nMeaning: the sheep shares its wool with everyone.", "City: wool is made into sweaters in factories. Village: shepherds cut wool from sheep.", ["How many bags of wool does the sheep have?", "Three", "One", "Two", "Ten"]],
    ["Poem - Humpty Dumpty", "Humpty Dumpty sat on a wall,\nHumpty Dumpty had a great fall.\nAll the king’s horses and all the king’s men\nCouldn’t put Humpty together again.\n(Traditional nursery rhyme)\nMeaning: be careful - some things cannot be fixed once broken.", "City: do not sit on high walls or balcony railings. Village: do not climb on the edge of a well.", ["Where did Humpty Dumpty sit?", "On a wall", "On a tree", "On a chair", "On a bus"]],
  ],
  Nursery: [
    ["Poem - Jack and Jill", "Jack and Jill went up the hill\nTo fetch a pail of water.\nJack fell down and broke his crown,\nAnd Jill came tumbling after.\n(Traditional nursery rhyme)\nMeaning: walk carefully, especially on slopes.", "City: hold the railing on stairs. Village: walk carefully on the slope to the pond.", ["Why did Jack and Jill go up the hill?", "To fetch water", "To play", "To sleep", "To eat"]],
    ["Poem - Johny Johny Yes Papa", "Johny Johny, yes Papa?\nEating sugar? No Papa.\nTelling lies? No Papa.\nOpen your mouth. Ha ha ha!\n(Traditional nursery rhyme)\nMeaning: always tell the truth.", "City and village: if you make a mistake, tell your parents the truth.", ["What was Johny eating?", "Sugar", "Rice", "Bread", "An apple"]],
  ],
  KG: [
    ["Poem - Rain Rain Go Away", "Rain, rain, go away,\nCome again another day.\nLittle children want to play,\nRain, rain, go away.\n(Traditional nursery rhyme)\nMeaning: children want the rain to stop so they can play outside.", "City: rain fills the roads with water. Village: rain is good for crops.", ["Why do the children want the rain to go away?", "They want to play", "They want to sleep", "They want to eat", "They are hungry"]],
    ["Poem - Hickory Dickory Dock", "Hickory, dickory, dock,\nThe mouse ran up the clock.\nThe clock struck one,\nThe mouse ran down.\nHickory, dickory, dock.\n(Traditional nursery rhyme)\nMeaning: a fun rhyme about time and a little mouse.", "City: look at a wall clock at school. Village: look at the clock in the panchayat bhawan.", ["What ran up the clock?", "A mouse", "A cat", "A dog", "A bird"]],
  ],
  '1': [
    ["Poem - Mary Had a Little Lamb", "Mary had a little lamb,\nIts fleece was white as snow;\nAnd everywhere that Mary went,\nThe lamb was sure to go.\n(Traditional nursery rhyme)\nMeaning: love and care make animals our friends.", "City: a pet dog follows its owner. Village: a goat kid follows the child who feeds it.", ["What colour was the lamb’s fleece?", "White", "Black", "Brown", "Grey"]],
    ["Poem - One, Two, Buckle My Shoe", "One, two, buckle my shoe;\nThree, four, knock at the door;\nFive, six, pick up sticks;\nSeven, eight, lay them straight;\nNine, ten, a big fat hen.\n(Traditional counting rhyme)\nMeaning: a rhyme to learn counting from 1 to 10.", "City: count the stairs as you climb. Village: count the hens in the yard.", ["What comes with \"three, four\"?", "Knock at the door", "Buckle my shoe", "Pick up sticks", "A big fat hen"]],
  ],
  '2': [
    ["Poem - Hey Diddle Diddle", "Hey diddle diddle,\nThe cat and the fiddle,\nThe cow jumped over the moon;\nThe little dog laughed\nTo see such sport,\nAnd the dish ran away with the spoon.\n(Traditional nursery rhyme)\nMeaning: a funny, make-believe rhyme that sparks imagination.", "City: imagine your school bag talking! Village: imagine a buffalo flying over the fields!", ["What jumped over the moon?", "The cow", "The cat", "The dog", "The dish"]],
    ["Poem - Little Miss Muffet", "Little Miss Muffet\nSat on a tuffet,\nEating her curds and whey;\nAlong came a spider,\nWho sat down beside her\nAnd frightened Miss Muffet away.\n(Traditional nursery rhyme)\nMeaning: a spider frightens a little girl - spiders are small and mostly harmless.", "City: you may see spiders in corners of the flat. Village: spiders make webs in the cowshed.", ["What frightened Miss Muffet?", "A spider", "A dog", "A cat", "A mouse"]],
  ],
  '3': [
    ["Poem - Who Has Seen the Wind?", "Who has seen the wind?\nNeither I nor you:\nBut when the leaves hang trembling,\nThe wind is passing through.\n\nWho has seen the wind?\nNeither you nor I:\nBut when the trees bow down their heads,\nThe wind is passing by.\n(Christina Rossetti)\nMeaning: we cannot see the wind, but we can see what it does.", "City: a flag flutters on a building. Village: the wheat crop sways in the wind.", ["How do we know the wind is passing?", "Leaves tremble and trees bow", "We can see it", "It is coloured", "It makes the sun shine"]],
    ["Poem - The Swing", "How do you like to go up in a swing,\nUp in the air so blue?\nOh, I do think it the pleasantest thing\nEver a child can do!\n(Robert Louis Stevenson)\nMeaning: the joy of swinging high in the open air.", "City: swings in the society park. Village: a swing tied to a neem tree during Sawan.", ["What does the child think about swinging?", "It is the pleasantest thing", "It is boring", "It is scary", "It is hard work"]],
  ],
  '4': [
    ["Poem - My Shadow", "I have a little shadow that goes in and out with me,\nAnd what can be the use of him is more than I can see.\nHe is very, very like me from the heels up to the head;\nAnd I see him jump before me, when I jump into my bed.\n(Robert Louis Stevenson)\nMeaning: a child wonders about his shadow, which copies everything he does.", "City: your shadow under a street light. Village: long shadows in the fields in the evening.", ["Who goes in and out with the child?", "His shadow", "His dog", "His friend", "His brother"]],
    ["Poem - The Owl and the Pussy-Cat", "The Owl and the Pussy-cat went to sea\nIn a beautiful pea-green boat,\nThey took some honey, and plenty of money,\nWrapped up in a five-pound note.\n(Edward Lear)\nMeaning: a funny, imaginative journey of two animal friends.", "City: a boat ride at a lake. Village: a boat crossing the river.", ["What colour was their boat?", "Pea-green", "Red", "Blue", "Yellow"]],
  ],
  '5': [
    ["Poem - Trees", "I think that I shall never see\nA poem lovely as a tree.\n(Joyce Kilmer - opening lines)\nMeaning: the poet feels that a tree is more beautiful than any poem made by people.", "City: trees along the roads give shade and clean air. Village: the big peepal tree is the meeting place.", ["What does the poet find lovelier than a poem?", "A tree", "A river", "A house", "A flower"]],
    ["Poem - Bed in Summer", "In winter I get up at night\nAnd dress by yellow candle-light.\nIn summer, quite the other way,\nI have to go to bed by day.\n(Robert Louis Stevenson)\nMeaning: in summer the days are long, so the child must sleep while it is still light.", "City: in summer it is bright even at 7 pm. Village: in winter farmers start work before sunrise.", ["In summer, when does the child go to bed?", "While it is still day", "At midnight", "Never", "In the morning"]],
  ],
  '6': [
    ["Poem - Where the Mind is Without Fear", "Where the mind is without fear and the head is held high;\nWhere knowledge is free;\nWhere the world has not been broken up into fragments\nBy narrow domestic walls;\n...\nInto that heaven of freedom, my Father, let my country awake.\n(Rabindranath Tagore, Gitanjali)\nMeaning: Tagore prays for a free, fearless and united India where knowledge is open to all.", "City: everyone can read in a public library. Village: free schools and libraries for every child.", ["Who wrote \"Where the Mind is Without Fear\"?", "Rabindranath Tagore", "William Wordsworth", "Robert Frost", "Sarojini Naidu"]],
    ["Poem - The Brook", "For men may come and men may go,\nBut I go on for ever.\n(Alfred, Lord Tennyson - refrain)\nMeaning: the brook (stream) keeps flowing for ever, while human lives are short.", "City: the Yamuna flows through Delhi year after year. Village: the canal near the fields keeps flowing.", ["What does the brook say about itself?", "It goes on for ever", "It stops at night", "It dries up", "It flows backwards"]],
  ],
  '7': [
    ["Poem - Leisure", "What is this life if, full of care,\nWe have no time to stand and stare.\n(W. H. Davies - opening lines)\nMeaning: we are so busy that we forget to enjoy nature. Take time to look around.", "City: put your phone down and look at the sky. Village: enjoy the sunset over the fields.", ["What does the poet say we have no time for?", "To stand and stare", "To work", "To eat", "To sleep"]],
    ["Poem - Daffodils", "I wandered lonely as a cloud\nThat floats on high o’er vales and hills,\nWhen all at once I saw a crowd,\nA host, of golden daffodils;\n(William Wordsworth)\nMeaning: the memory of a field of flowers fills the lonely poet with joy.", "City: flower beds in a park. Village: yellow mustard fields in winter.", ["What did the poet see?", "Golden daffodils", "Red roses", "A crowd of people", "A river"]],
  ],
  '8': [
    ["Poem - If", "If you can keep your head when all about you\nAre losing theirs and blaming it on you,\nIf you can trust yourself when all men doubt you,\nBut make allowance for their doubting too;\n...\nYours is the Earth and everything that’s in it,\nAnd - which is more - you’ll be a Man, my son!\n(Rudyard Kipling)\nMeaning: stay calm, believe in yourself and be fair to others - that is true maturity.", "City: stay calm during an exam even if others panic. Village: stay patient when the crop fails and try again.", ["What is the main message of \"If\"?", "Stay calm and believe in yourself", "Run away from problems", "Blame others", "Never trust anyone"]],
    ["Poem - Stopping by Woods on a Snowy Evening", "The woods are lovely, dark and deep,\nBut I have promises to keep,\nAnd miles to go before I sleep,\nAnd miles to go before I sleep.\n(Robert Frost - last stanza)\nMeaning: life is beautiful, but we must first finish our duties. Nehru kept these lines on his desk.", "City: finish homework before watching TV. Village: finish the field work before resting.", ["What does the poet have to keep?", "Promises", "Secrets", "Money", "Horses"]],
  ],
};

// Attach Sanskrit and add the Hindi stories / poems and English poems to every class.
STUDY_1_8.Sanskrit = SANSKRIT_START.Sanskrit;
for (const [cls, items] of Object.entries(HINDI_KAHANI_KAVITA)) STUDY_1_8.Hindi[cls].push(...items);
for (const [cls, items] of Object.entries(ENGLISH_POEMS)) STUDY_1_8.English[cls].push(...items);
