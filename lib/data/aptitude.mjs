// My Best Subject Test - 4 questions each: Maths, Science, English, SST, Reasoning, Interest
// Interest questions have no wrong answer - each option points towards a stream.

export const APTITUDE = [
  // Maths
  { qid: 'm1', subject: 'Maths', question: '15% of 200 = ?', options: ['30', '15', '20', '35'], correctAnswer: '30' },
  { qid: 'm2', subject: 'Maths', question: 'A shop sells 4 pens for Rs 48. What is the price of 1 pen?', options: ['Rs 12', 'Rs 10', 'Rs 14', 'Rs 8'], correctAnswer: 'Rs 12' },
  { qid: 'm3', subject: 'Maths', question: '2x + 6 = 20, x = ?', options: ['7', '13', '8', '6'], correctAnswer: '7' },
  { qid: 'm4', subject: 'Maths', question: 'A square has a side of 6 cm. What is its area?', options: ['36 cm²', '24 cm²', '12 cm²', '30 cm²'], correctAnswer: '36 cm²' },
  // Science
  { qid: 's1', subject: 'Science', question: 'By which process do plants make their food?', options: ['Photosynthesis', 'Respiration', 'Digestion', 'Evaporation'], correctAnswer: 'Photosynthesis' },
  { qid: 's2', subject: 'Science', question: 'Chemical formula of water?', options: ['H₂O', 'CO₂', 'O₂', 'NaCl'], correctAnswer: 'H₂O' },
  { qid: 's3', subject: 'Science', question: 'Unit of electric current?', options: ['Ampere', 'Volt', 'Watt', 'Ohm'], correctAnswer: 'Ampere' },
  { qid: 's4', subject: 'Science', question: 'Which organ pumps blood in the human body?', options: ['Heart', 'Lungs', 'Kidney', 'Liver'], correctAnswer: 'Heart' },
  // English
  { qid: 'e1', subject: 'English', question: 'Choose the correct sentence:', options: ['She goes to school.', 'She go to school.', 'She going school.', 'She gone to school.'], correctAnswer: 'She goes to school.' },
  { qid: 'e2', subject: 'English', question: 'Opposite of "ancient"?', options: ['Modern', 'Old', 'Past', 'Early'], correctAnswer: 'Modern' },
  { qid: 'e3', subject: 'English', question: 'Plural of "mouse"?', options: ['Mice', 'Mouses', 'Mices', 'Mousees'], correctAnswer: 'Mice' },
  { qid: 'e4', subject: 'English', question: 'One word for "very happy":', options: ['Delighted', 'Angry', 'Tired', 'Bored'], correctAnswer: 'Delighted' },
  // SST
  { qid: 't1', subject: 'SST', question: 'When did the Constitution of India come into force?', options: ['26 January 1950', '15 August 1947', '26 November 1949', '2 October 1950'], correctAnswer: '26 January 1950' },
  { qid: 't2', subject: 'SST', question: 'Capital of Uttar Pradesh?', options: ['Lucknow', 'Kanpur', 'Prayagraj', 'Noida'], correctAnswer: 'Lucknow' },
  { qid: 't3', subject: 'SST', question: 'Who led the Dandi March?', options: ['Mahatma Gandhi', 'Bhagat Singh', 'Jawaharlal Nehru', 'Subhas Chandra Bose'], correctAnswer: 'Mahatma Gandhi' },
  { qid: 't4', subject: 'SST', question: 'Who issues currency notes in India?', options: ['RBI', 'SBI', 'Parliament', 'Election Commission'], correctAnswer: 'RBI' },
  // Reasoning
  { qid: 'r1', subject: 'Reasoning', question: 'Series: 2, 4, 8, 16, ?', options: ['32', '24', '20', '18'], correctAnswer: '32' },
  { qid: 'r2', subject: 'Reasoning', question: 'Odd one out: Mango, Banana, Cauliflower, Apple', options: ['Cauliflower', 'Mango', 'Banana', 'Apple'], correctAnswer: 'Cauliflower' },
  { qid: 'r3', subject: 'Reasoning', question: 'If CAT = 3120, then DOG = ? (A=1, B=2...)', options: ['4157', '4156', '3157', '4167'], correctAnswer: '4157' },
  { qid: 'r4', subject: 'Reasoning', question: 'Ravi is taller than Mohan. Mohan is taller than Sita. Who is the shortest?', options: ['Sita', 'Ravi', 'Mohan', 'Cannot say'], correctAnswer: 'Sita' },
  // Interest (no wrong answers)
  { qid: 'i1', subject: 'Interest', question: 'What do you enjoy doing in your free time?', options: ['Opening up a phone or computer to see how it works', 'Reading about plants, animals and the human body', 'Keeping shop accounts, counting money, business ideas', 'Reading or writing stories, history and news'], optionStreams: ['PCM', 'PCB', 'Commerce', 'Arts'] },
  { qid: 'i2', subject: 'Interest', question: 'What work would you like to do when you grow up?', options: ['Build machines or software', 'Treat sick people', 'Work in a bank or run my own business', 'Teach, or serve the country (IAS, Police)'], optionStreams: ['PCM', 'PCB', 'Commerce', 'Arts'] },
  { qid: 'i3', subject: 'Interest', question: 'Which school period is the most fun for you?', options: ['Maths / Computer', 'Biology / Science lab', 'Accounts / money-related maths', 'History / Hindi / Geography'], optionStreams: ['PCM', 'PCB', 'Commerce', 'Arts'] },
  { qid: 'i4', subject: 'Interest', question: 'Which video would you watch till the end?', options: ['How rockets and robots are built', 'How doctors do an operation', 'How a startup earned crores', 'The story of a UPSC topper'], optionStreams: ['PCM', 'PCB', 'Commerce', 'Arts'] },
];
