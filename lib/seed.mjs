// Turns the default data into MongoDB documents.
import { STUDY_1_8, CLASSES_1_8, SUBJECTS_1_8 } from './data/study18.mjs';
import { STUDY_9_12, CLASSES_9_12, SUBJECTS_9_12 } from './data/study912.mjs';
import { APTITUDE } from './data/aptitude.mjs';
import { PICTURES } from './data/pictures.mjs';
import { COLLEGE_UNITS, STREAMS, COLLEGES } from './data/college.mjs';
import { JOBS } from './data/jobs.mjs';

// ---------- small helpers (deterministic, so the same data is built every time) ----------
function hash(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
  return h >>> 0;
}
function rng(seedStr) {
  let s = hash(seedStr) || 1;
  return () => { s ^= s << 13; s ^= s >>> 17; s ^= s << 5; return ((s >>> 0) % 100000) / 100000; };
}
function shuffle(arr, r) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}
const mcq = (question, correct, wrongs, r, tag) => ({
  question, options: shuffle([correct, ...wrongs.slice(0, 3)], r), correctAnswer: correct, ...(tag ? { tag } : {}),
});
const short = (s, n = 110) => (s.length > n ? s.slice(0, n).replace(/\s+\S*$/, '') + '...' : s);

// Topic-match MCQ: "Which chapter is this from?"
function topicMatch(prompt, chapterName, pool, r, tag) {
  const others = shuffle(pool.filter((n) => n !== chapterName), r).slice(0, 3);
  return mcq(prompt, chapterName, others, r, tag);
}

// ---------- Maths number questions (by class level) ----------
function mathsProblem(level, r) {
  const n = (a, b) => a + Math.floor(r() * (b - a + 1));
  const wrong = (ans, spread = 3) => {
    const set = new Set();
    while (set.size < 3) { const w = ans + (n(1, spread) * (r() < 0.5 ? -1 : 1)); if (w !== ans && w >= 0) set.add(w); }
    return [...set].map(String);
  };
  if (level <= 2) { const a = n(1, 5), b = n(1, 4); return { q: `${a} mango${a > 1 ? 'es' : ''} + ${b} mango${b > 1 ? 'es' : ''} = how many mangoes?`, a: a + b, w: wrong(a + b, 2) }; }
  if (level <= 4) { const a = n(11, 49), b = n(5, 30); return r() < 0.5
    ? { q: `${a} + ${b} = ?`, a: a + b, w: wrong(a + b, 10) }
    : { q: `${a + b} - ${b} = ?`, a, w: wrong(a, 10) }; }
  if (level <= 6) { const a = n(3, 9), b = n(4, 12); return r() < 0.5
    ? { q: `${a} children get ${b} toffees each. Total toffees?`, a: a * b, w: wrong(a * b, 8) }
    : { q: `${a * b} laddoos shared equally among ${a} friends. How many each?`, a: b, w: wrong(b, 3) }; }
  if (level === 7) { const a = n(3, 9), p = n(5, 25) * 2; return { q: `${a} pens at Rs ${p} each. Total Rs?`, a: a * p, w: wrong(a * p, 20) }; }
  const cp = n(2, 9) * 100, pct = [10, 20, 25, 50][n(0, 3)];
  return r() < 0.5
    ? { q: `What is ${pct}% of Rs ${cp}?`, a: (cp * pct) / 100, w: wrong((cp * pct) / 100, 20) }
    : (() => { const x = n(2, 12), k = n(2, 5), c = n(1, 9); return { q: `${k}x + ${c} = ${k * x + c}, x = ?`, a: x, w: wrong(x, 3) }; })();
}

// ---------- language of a subject: Hindi in Hindi, Sanskrit in Sanskrit, the rest in English ----------
export const langOf = (subject) => (subject === 'Hindi' ? 'hi' : subject === 'Sanskrit' ? 'sa' : 'en');
const REVISION = { en: 'Revision', hi: 'पुनरावृत्ति', sa: 'पुनरावृत्तिः' };

const T18 = {
  en: {
    imp: (n, notes, oq, oa) => n.startsWith('Poem') ? [
      'Learn the poem by heart and recite it with actions.', 'What is the poem about? Write in your own words.',
      'Pick out the rhyming words from the poem.', 'Which line did you like the most, and why?', `${oq} (Answer: ${oa})`,
      'What message or feeling does the poem give us?', 'Draw a picture of the scene in the poem.',
      'Write 4 lines of your own on the same topic.', 'Write the meanings of the difficult words.', 'Who is the poet? Write two lines about the poet (or "traditional" for a nursery rhyme).',
    ] : [
      `What is ${n}? Explain in your own words.`, `Write one example of ${n} from a city.`, `Write one example of ${n} from a village.`,
      `Write 3 important points about ${n}.`, `${oq} (Answer: ${oa})`, `Learn and write: "${short(notes, 90)}"`,
      `Make a small drawing or chart on ${n}.`, `Explain ${n} to your parents at home. What did they ask? Write it down.`,
      `Where is ${n} useful in daily life?`, `Write 5 lines on ${n}.`,
    ],
    fromNotes: (s) => `Which topic is this from? "${s}"`,
    fromExample: (s) => `Which topic is this example from? "${s}"`,
  },
  hi: {
    imp: (n, notes, oq, oa) => {
      if (n.startsWith('कहानी')) return [
        'इस कहानी के मुख्य पात्र कौन-कौन हैं?', 'कहानी को अपने शब्दों में संक्षेप में लिखिए।', 'इस कहानी से हमें क्या सीख मिलती है?',
        'कहानी की कौन-सी घटना आपको सबसे अच्छी लगी और क्यों?', `${oq} (उत्तर: ${oa})`, 'यदि आप कहानी के पात्र होते तो क्या करते?',
        'कहानी के लिए कोई दूसरा शीर्षक सुझाइए।', 'कहानी का कोई एक दृश्य चित्र बनाकर दिखाइए।',
        'कहानी की सीख शहर या गाँव के किसी अनुभव से जोड़कर लिखिए।', 'कहानी को कक्षा में अभिनय करके दिखाइए।',
      ];
      if (n.startsWith('कविता')) return [
        'कविता की पंक्तियाँ याद करके सुनाइए।', 'कविता का भाव अपने शब्दों में लिखिए।', 'कविता में आए तुकांत शब्द छाँटकर लिखिए।',
        'कविता का कौन-सा भाग आपको सबसे अच्छा लगा और क्यों?', `${oq} (उत्तर: ${oa})`, 'कविता से हमें क्या संदेश मिलता है?',
        'कविता के विषय पर एक चित्र बनाइए।', 'इसी विषय पर चार पंक्तियों की अपनी कविता लिखिए।',
        'कविता को लय के साथ गाकर सुनाइए।', 'कविता के कठिन शब्दों के अर्थ लिखिए।',
      ];
      return [
        `${n} क्या है? अपने शब्दों में समझाइए।`, `${n} का एक उदाहरण शहर से लिखिए।`, `${n} का एक उदाहरण गाँव से लिखिए।`,
        `${n} की तीन मुख्य बातें लिखिए।`, `${oq} (उत्तर: ${oa})`, `याद करके लिखिए: "${short(notes, 90)}"`,
        `${n} पर एक छोटा चित्र या चार्ट बनाइए।`, `घर पर माता-पिता को ${n} समझाइए। उन्होंने क्या पूछा? लिखिए।`,
        `${n} दैनिक जीवन में कहाँ काम आता है?`, `${n} पर पाँच वाक्य लिखिए।`,
      ];
    },
    fromNotes: (s) => `यह बात किस पाठ की है? "${s}"`,
    fromExample: (s) => `यह उदाहरण किस पाठ का है? "${s}"`,
  },
  sa: {
    imp: (n, notes, oq, oa) => [
      `"${n}" विषये स्वशब्दैः लिखत।`, `"${n}" इत्यस्य नगरात् एकम् उदाहरणं लिखत।`, `"${n}" इत्यस्य ग्रामात् एकम् उदाहरणं लिखत।`,
      `"${n}" विषये त्रीणि मुख्यवाक्यानि लिखत।`, `${oq} (उत्तरम्: ${oa})`, `स्मृत्वा लिखत - "${short(notes, 90)}"`,
      `"${n}" विषये एकं चित्रं रचयत।`, `गृहे पित्रोः समक्षं "${n}" उच्चैः पठत।`,
      `"${n}" दैनिकजीवने कुत्र उपयुज्यते? लिखत।`, `"${n}" विषये पञ्च वाक्यानि लिखत।`,
    ],
    fromNotes: (s) => `एतत् कस्मात् पाठात् अस्ति? "${s}"`,
    fromExample: (s) => `इदम् उदाहरणं कस्मात् पाठात् अस्ति? "${s}"`,
  },
};

// ---------- "Complete the line" questions for poems ----------
const STOP = new Set(['है', 'हैं', 'था', 'थी', 'थे', 'को', 'से', 'में', 'की', 'का', 'के', 'ने', 'और', 'जाएगी', 'जाएगा', 'हम', 'तो', 'वह',
  'is', 'am', 'are', 'the', 'a', 'an', 'of', 'to', 'in', 'and', 'so', 'my', 'i', 'you', 'it', 'he', 'she', 'we', 'they', 'me', 'be',
  'was', 'were', 'with', 'at', 'on', 'by', 'for', 'that', 'this', 'up', 'down', 'his', 'her', 'their', 'your', 'our', 'all', 'if', 'but', 'what', 'who',
  'too', 'about', 'when', 'not', 'no', 'can', 'do', 'have', 'any', 'how', 'there', 'then', 'into', 'from', 'out', 'over', 'him', 'them', 'one', 'some']);
const clean = (w) => w.replace(/^[\s"“”'‘’(]+|[\s"“”'‘’,.;:!?।)—-]+$/g, '');
function poemBlanks(chapterName, notes) {
  if (!/^(Poem|कविता)/.test(chapterName)) return [];
  const out = [];
  for (const raw of String(notes).split('\n')) {
    const line = raw.trim().replace(/^["“]+/, '').replace(/["”]+$/, '');
    if (!line || line === '...' || /^[(]/.test(line) || /^(Meaning|भावार्थ)/.test(line)) break;
    if (line.endsWith(':')) continue;
    const toks = line.split(/\s+/);
    for (let i = toks.length - 1; i >= 0; i--) {
      const w = clean(toks[i]);
      if (w.length >= 2 && !STOP.has(w.toLowerCase())) {
        out.push({ answer: w, line: toks.map((t, j) => (j === i ? t.replace(w, '___') : t)).join(' ') });
        break;
      }
    }
  }
  return out;
}

const PIC_ASK = { en: (e) => `${e}  What is this?`, hi: (e) => `${e}  यह क्या है?`, sa: (e) => `${e}  इदं किम्? (यह क्या है?)` };
const LINE_ASK = { en: (l) => `Complete the line: "${l}"`, hi: (l) => `पंक्ति पूरी कीजिए: "${l}"`, sa: (l) => `पङ्क्तिं पूरयत: "${l}"` };

// ================= Study 1-8 =================
// Every chapter gets 10 test questions: the chapter's own question, picture questions, poem lines,
// topic questions, then revision questions from the same class and the classes next to it.
export const TEST_SIZE_18 = 10;
export function buildStudy18() {
  const docs = [];
  for (const subject of SUBJECTS_1_8) {
    const lang = langOf(subject); const T = T18[lang];
    const allNames = [...new Set(CLASSES_1_8.flatMap((c) => STUDY_1_8[subject][c].map((ch) => ch[0])))];
    const poemWordPool = [...new Set(CLASSES_1_8.flatMap((c) => STUDY_1_8[subject][c].flatMap(([n, no]) => poemBlanks(n, no).map((b) => b.answer))))];
    CLASSES_1_8.forEach((cls, level) => {
      const chapters = STUDY_1_8[subject][cls];
      chapters.forEach(([chapterName, notes, examples, own], idx) => {
        const r = rng(`18|${cls}|${subject}|${chapterName}`);
        const [oq, oa, ...ow] = own;
        const importantQuestions = T.imp(chapterName, notes, oq, oa);
        const pictures = PICTURES[`${subject}|${cls}|${chapterName}`];
        const qs = [mcq(oq, oa, ow, r)];

        // 1. picture questions
        if (pictures && pictures.length >= 4) {
          for (const [emoji, name] of shuffle(pictures, r).slice(0, 4)) {
            qs.push(mcq(PIC_ASK[lang](emoji), name, shuffle(pictures.filter(([, n]) => n !== name).map(([, n]) => n), r), r));
          }
        }
        // 2. poem: complete the line
        const blanks = poemBlanks(chapterName, notes);
        for (const b of shuffle(blanks, r).slice(0, 3)) {
          const wrongs = shuffle([...new Set([...blanks.map((x) => x.answer), ...shuffle(poemWordPool, r)])].filter((w) => w !== b.answer), r);
          if (wrongs.length >= 3) qs.push(mcq(LINE_ASK[lang](b.line), b.answer, wrongs, r));
        }
        // 3. which topic is this from?
        qs.push(topicMatch(T.fromNotes(short(notes, 90)), chapterName, allNames, r));
        if (subject === 'Maths') {
          while (qs.length < TEST_SIZE_18) { const p = mathsProblem(level, r); qs.push(mcq(p.q, String(p.a), p.w, r)); }
          for (let k = 0; k < 5; k++) { const p = mathsProblem(level, r); importantQuestions[5 + k] = `Practice: ${p.q}`; }
        } else {
          qs.push(topicMatch(T.fromExample(short(examples, 90)), chapterName, allNames, r));
          // 4. revision: other chapters of this class, then the classes before / after
          const siblings = chapters.filter((_, j) => j !== idx);
          for (const [, , , sib] of siblings) { const [sq, sa, ...sw] = sib; qs.push(mcq(sq, sa, sw, r, REVISION[lang])); }
          for (const [sn, sno] of siblings) qs.push(topicMatch(T.fromNotes(short(sno, 90)), sn, allNames, r, REVISION[lang]));
          for (const [sn, , sex] of siblings) qs.push(topicMatch(T.fromExample(short(sex, 90)), sn, allNames, r, REVISION[lang]));
          for (const near of [CLASSES_1_8[level - 1], CLASSES_1_8[level + 1]].filter(Boolean)) {
            for (const [, , , nq] of STUDY_1_8[subject][near]) { const [a, b, ...c] = nq; qs.push(mcq(a, b, c, r, REVISION[lang])); }
          }
        }
        const seen = new Set();
        const testQuestions = qs.filter((q) => !seen.has(q.question) && seen.add(q.question)).slice(0, TEST_SIZE_18);
        // Maths: keep generating new (non-repeating) problems until there are 10
        for (let tries = 0; subject === 'Maths' && testQuestions.length < TEST_SIZE_18 && tries < 300; tries++) {
          const p = mathsProblem(level, r);
          if (!seen.has(p.q)) { seen.add(p.q); testQuestions.push(mcq(p.q, String(p.a), p.w, r)); }
        }

        docs.push({
          class: cls, subject, chapterNo: idx + 1, chapterName, notes, examples,
          ...(pictures ? { pictures: pictures.map(([emoji, name]) => ({ emoji, name })) } : {}),
          importantQuestions, testQuestions,
        });
      });
    });
  }
  return docs;
}

// ================= Study 9-12 =================
export const STUDY_PLANS = {
  Maths: '2 hours daily: 30 min theory + 90 min problems. Do the NCERT examples of each chapter first, then the exercise. Revise formulas on Sunday.',
  Science: '2 hours daily: Physics numericals, Chemistry equations, Biology diagrams - 40 min each.',
  Physics: '2 hours daily: 45 min concepts + 75 min numericals. Practise derivations by writing them out.',
  Chemistry: '1.5-2 hours daily: Physical (numericals), Organic (reactions chart), Inorganic (NCERT line by line).',
  Biology: '1.5-2 hours daily: read NCERT line by line, draw 2 diagrams a day, revise with flowcharts.',
  Accounts: '2 hours daily: practise only by writing. 5 journal entries + 1 long question every day.',
  'Business Studies': '1 hour daily: learn the keywords and give a real example for each point (Tata, Amul, a local shop).',
  Economics: '1-1.5 hours daily: draw graphs, write definitions in your own words, practise numericals.',
  History: '1 hour daily: make timelines, learn dates with flash cards, do map work weekly.',
  Geography: '1 hour daily: 10 min map practice, diagrams, learn data tables.',
  'Pol Science': '1 hour daily: list of articles and dates, current examples from the news.',
  Hindi: 'रोज़ 1 घंटा: पाठ का सार, कवि/लेखक-परिचय, व्याकरण के 10 प्रश्न और एक लेखन-अभ्यास। हर सप्ताह एक कविता कंठस्थ कीजिए।',
  English: '1 hour daily: one chapter summary, 10 grammar questions, writing-format practice; 15 min of English news.',
  Computer: '1-1.5 hours daily: type code on a computer/phone (online compiler) and check the output yourself.',
};

export function buildStudy912() {
  const docs = [];
  for (const subject of SUBJECTS_9_12) {
    const classes = CLASSES_9_12.filter((c) => STUDY_9_12[subject]?.[c]);
    const allNames = [...new Set(classes.flatMap((c) => STUDY_9_12[subject][c].map((ch) => ch[0])))];
    for (const cls of classes) {
      const chapters = STUDY_9_12[subject][cls];
      chapters.forEach(([chapterName, definition, formulas, own], idx) => {
        const r = rng(`912|${cls}|${subject}|${chapterName}`);
        const [oq, oa, ...ow] = own;
        const hi = langOf(subject) === 'hi';
        const n = chapterName; const d = short(definition, 100); const f = short(formulas, 100);
        const notes = hi ? [
          `चरण 1 - समझिए: ${definition}`,
          `चरण 2 - याद रखिए: ${formulas}`,
          `चरण 3 - जीवन से जोड़िए: "${n}" की बातें शहर (दिल्ली/नोएडा) और गाँव के जीवन में कहाँ दिखती हैं? सोचिए और लिखिए।`,
          'चरण 4 - अभ्यास: पाठ्यपुस्तक के सभी प्रश्न-अभ्यास हल कीजिए। जो प्रश्न गलत हुए, उन्हें अलग कॉपी में लिखिए।',
          'चरण 5 - दोहराइए: एक पृष्ठ का सार और कवि/लेखक-परिचय कार्ड बनाइए। परीक्षा से पहले यही पढ़िए।',
        ] : [
          `Step 1 - Understand: ${definition}`,
          `Step 2 - Remember: ${formulas}`,
          `Step 3 - Connect it to your surroundings: where do you see ${n} in daily life - in a city (Delhi/Noida) and in a village? Think and write.`,
          'Step 4 - Practise: finish the NCERT in-text questions and exercise. Write the questions you got wrong in a separate notebook.',
          'Step 5 - Revise: make a 1-page summary and a formula/definition card. Read only these before the exam.',
        ];
        const importantQuestions = hi ? [
          `(1 अंक) ${oq}`, `(1 अंक) "${n}" का मुख्य विषय एक वाक्य में लिखिए।`, `(2 अंक) "${d}" - उदाहरण सहित स्पष्ट कीजिए।`,
          `(2 अंक) इस तथ्य को स्पष्ट कीजिए: ${f}`, `(3 अंक) "${n}" की मुख्य बातें लिखिए।`,
          `(3 अंक) "${n}" का संदेश आज के जीवन (शहर और गाँव) में कैसे उपयोगी है?`, `(3 अंक) "${n}" से जुड़ी सामान्य गलतियाँ कौन-सी हैं?`,
          `(4 अंक) स्रोत-आधारित: दिए गए अंश को पढ़कर "${n}" से जुड़े प्रश्नों के उत्तर दीजिए।`,
          `(5 अंक) "${n}" का सारांश / व्याख्या विस्तार से लिखिए।`, `(5 अंक) "${n}" की तुलना पिछले पाठ से कीजिए।`,
        ] : [
          `(1 mark) ${oq}`, `(1 mark) Define ${n}.`, `(2 marks) "${d}" - explain this with an example.`,
          `(2 marks) Write and apply this formula / rule: ${f}`, `(3 marks) Explain the main points of ${n}.`,
          `(3 marks) Give a real-life use of ${n} (city + village example).`, `(3 marks) What are the most common mistakes in ${n}?`,
          `(4 marks) Case-based: describe a situation and apply the concept of ${n}.`,
          `(5 marks) ${n} - write the full topic with a diagram / derivation / example.`, `(5 marks) Link ${n} to the previous chapter and explain the difference.`,
        ];
        const previousYearQuestions = hi ? [
          `[बोर्ड पैटर्न - 1 अंक] ${oq}`, `[बोर्ड पैटर्न - 2 अंक] "${n}" का मुख्य भाव लिखिए।`,
          `[बोर्ड पैटर्न - 3 अंक] ${short(formulas, 90)} - इस पर आधारित प्रश्न बनाकर उत्तर लिखिए।`,
          `[बोर्ड पैटर्न - 5 अंक] "${n}" की विस्तार से व्याख्या कीजिए।`,
          `[बोर्ड पैटर्न - काव्यांश / गद्यांश] दिए गए अंश को पढ़कर "${n}" पर आधारित चार प्रश्नों के उत्तर दीजिए।`,
        ] : [
          `[Board Pattern - 1 mark] ${oq}`, `[Board Pattern - 2 marks] Define ${n}. Give one example.`,
          `[Board Pattern - 3 marks] ${short(formulas, 90)} - make a question based on this and solve it.`,
          `[Board Pattern - 5 marks] Explain ${n} in detail (with a diagram/example).`,
          `[Board Pattern - Case Study] Read the given passage and answer 4 questions on ${n}.`,
        ];
        const tag = REVISION[hi ? 'hi' : 'en'];
        const siblings = chapters.filter((_, j) => j !== idx);
        const testQuestions = [
          mcq(oq, oa, ow, r),
          topicMatch(hi ? `यह बात किस पाठ की है? "${d}"` : `Which chapter is this definition from? "${d}"`, chapterName, allNames, r),
          topicMatch(hi ? `यह तथ्य किस पाठ से जुड़ा है? "${f}"` : `Which chapter is this formula / trick from? "${f}"`, chapterName, allNames, r),
          ...siblings.map(([, , , sib]) => { const [sq, sa, ...sw] = sib; return mcq(sq, sa, sw, r, tag); }),
          ...siblings.slice(0, 3).map(([sn, sd]) => topicMatch(hi ? `यह किस पाठ की बात है? "${short(sd, 100)}"` : `Which chapter is this from? "${short(sd, 100)}"`, sn, allNames, r, tag)),
        ];
        docs.push({
          class: cls, subject, chapterNo: idx + 1, chapterName, notes, formulas,
          importantQuestions, previousYearQuestions, testQuestions: testQuestions.slice(0, 10),
          studyPlan: STUDY_PLANS[subject],
        });
      });
    }
  }
  return docs;
}

// ================= College =================
export function buildCollegeStudy() {
  const docs = [];
  for (const [course, subjects] of Object.entries(COLLEGE_UNITS)) {
    for (const [subject, info] of Object.entries(subjects)) {
      info.units.forEach((u, i) => docs.push({
        course, semester: 1, subject, subjectTitle: info.title, unitNo: i + 1, unitName: u.unitName,
        notes: u.notes, ...(u.notesHi ? { notesHi: u.notesHi } : {}), importantQuestions: u.imp, previousYearQuestions: u.pyq,
        studyPlan: info.studyPlan, jobs: info.jobs,
      }));
    }
  }
  return docs;
}

export function buildSeed() {
  return {
    study_1_8: buildStudy18(),
    study_9_12: buildStudy912(),
    aptitudeQuestions: APTITUDE.map((q) => ({ ...q })),
    streams: STREAMS.map((s) => ({ ...s })),
    collegeStudy: buildCollegeStudy(),
    colleges: COLLEGES.map((c) => ({ ...c })),
    jobs: JOBS.map((j) => ({ ...j })),
  };
}
