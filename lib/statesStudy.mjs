// States of India: topics of each state (each opens on its own page), a quiz per state and a practice quiz per language.
import { STATES, stateById } from './data/states/states.mjs';
import { LANGUAGES, PHRASES } from './data/states/languages.mjs';
import { COMMON_ACTIVITIES, STATE_ACTIVITIES } from './data/states/activities.mjs';

export { STATES, stateById, LANGUAGES, PHRASES };
const e = encodeURIComponent;
export const urlStates = {
  home: () => '/states',
  state: (id, tab) => `/states/state?s=${e(id)}${tab ? `&tab=${tab}` : ''}`,
  topic: (id, t) => `/states/topic?s=${e(id)}&t=${t}`,
  language: (code) => `/states/language?l=${e(code)}`,
};

export function stateTopics(s) {
  const langs = s.langs.map((c) => LANGUAGES[c]?.name).filter(Boolean);
  return [
    { title: 'Introduction', intro: true, text: `${s.name} is a ${s.kind === 'State' ? 'state' : 'Union Territory'} of India.\nCapital: ${s.capital}\nLanguage: ${s.official}\nFoundation / special day: ${s.day}\nFamous dance: ${s.dance}\nFamous food: ${s.food}\nMust-see place: ${s.place}` },
    { title: 'History', text: s.texts.history },
    { title: 'Geography - Land, Rivers and Climate', text: s.texts.geography },
    { title: 'Culture, Dance and Festivals', text: s.texts.culture },
    { title: 'Food', text: s.texts.food },
    { title: 'Famous Places', text: s.texts.places },
    { title: 'Economy - Farming and Industry', text: s.texts.economy },
    { title: 'School Activities', text: [`Special activities in schools of ${s.name}:`, ...(STATE_ACTIVITIES[s.id] || []).map((x) => `• ${x}`), '', 'In schools all over India:', ...COMMON_ACTIVITIES.map((x) => `• ${x}`)].join('\n') },
    { title: 'School Board and Study', text: `School board: ${s.board}.\nMany state boards now use NCERT-based books for most subjects, so the Play School - Class 12 chapters of this website help students of every state. Check your own board's syllabus for the state language and any extra chapters.\nLanguages to learn here: ${langs.join(', ')}.` },
  ];
}

// deterministic shuffle so the same quiz is shown every time
function shuffle(arr, seed) {
  let x = [...seed].reduce((a, c) => a * 31 + c.charCodeAt(0), 7) >>> 0 || 1;
  const r = () => { x ^= x << 13; x ^= x >>> 17; x ^= x << 5; return (x >>> 0) / 4294967296; };
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}
const mcq = (question, correct, pool, seed) => {
  const wrong = shuffle([...new Set(pool.filter((p) => p && p !== correct))], seed).slice(0, 3);
  return { question, correctAnswer: correct, options: shuffle([correct, ...wrong], `${seed}o`) };
};

export function stateQuiz(s) {
  const others = STATES.filter((x) => x.id !== s.id);
  const main = LANGUAGES[s.langs[0]]?.name;
  return [
    mcq(`What is the capital of ${s.name}?`, s.capital, others.map((x) => x.capital), `${s.id}1`),
    mcq(`Which language is learnt here for ${s.name}?`, main, Object.entries(LANGUAGES).filter(([c]) => !s.langs.includes(c)).map(([, l]) => l.name), `${s.id}2`),
    mcq(`Which dance is famous in ${s.name}?`, s.dance, others.map((x) => x.dance), `${s.id}3`),
    mcq(`Which food is famous in ${s.name}?`, s.food, others.map((x) => x.food), `${s.id}4`),
    mcq(`Which famous place is in ${s.name}?`, s.place, others.map((x) => x.place), `${s.id}5`),
    mcq(`"${s.capital}" is the capital of which state / UT?`, s.name, others.filter((x) => x.capital !== s.capital).map((x) => x.name), `${s.id}6`),
  ];
}

// "What does 'Vanakkam' mean?"
export function languageQuiz(code) {
  const l = LANGUAGES[code];
  const meanings = PHRASES.map(([en]) => en);
  const qs = l.phrases.map((p, i) => (p ? mcq(`What does "${p[0] || p[1]}" (${p[1]}) mean in ${l.name}?`, meanings[i], meanings, `${code}${i}`) : null)).filter(Boolean);
  if (l.numbers) qs.push(mcq(`How do you say 5 in ${l.name}?`, l.numbers[4], l.numbers, `${code}n5`), mcq(`What number is "${l.numbers[2]}" in ${l.name}?`, '3', ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'], `${code}n3`));
  return qs;
}

export const statesForLanguage = (code) => STATES.filter((s) => s.langs.includes(code));
