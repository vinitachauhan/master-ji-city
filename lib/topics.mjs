// Topics inside a chapter - every chapter / unit is split into topics, and each topic opens on its own page.
// A topic is { title, text } (+ textHi for bilingual recipes, + intro: true on the first topic of a chapter).
// Textbook topics (like the sub-headings of a school book) come from lib/data/topics/*.mjs, looked up by
// class + chapter name. Topics are built when the data is read, so chapters edited in the Admin Panel get them too.
import { TOPICS_18 } from './data/topics/topics18.mjs';
import { TOPICS_912 } from './data/topics/topics912.mjs';

const norm = (s) => String(s || '').toLowerCase().replace(/[’'?!.,()]/g, '').replace(/\s+/g, ' ').trim();
const index = (groups) => {
  const map = new Map();
  for (const [cls, chapters] of Object.entries(groups)) {
    for (const [name, topics] of Object.entries(chapters)) map.set(`${cls}|${norm(name)}`, topics);
  }
  return map;
};
const BOOK = index({ ...TOPICS_18, ...TOPICS_912 });
export const bookTopics = (cls, chapterName) => BOOK.get(`${cls}|${norm(chapterName)}`) || [];
const asTopics = (list) => list.map(([title, text]) => ({ title, text }));

const L = {
  en: { intro: 'Introduction', poem: 'Read the Poem', story: 'Read the Story', meaning: 'Meaning', example: 'City and Village Example' },
  hi: { intro: 'पाठ परिचय', poem: 'कविता पढ़िए', story: 'कहानी पढ़िए', meaning: 'भावार्थ', example: 'शहर और गाँव का उदाहरण' },
  sa: { intro: 'पाठपरिचयः', poem: 'कविता', story: 'कथा', meaning: 'भावार्थः', example: 'नगरस्य ग्रामस्य च उदाहरणम्' },
};
const langOf = (subject) => (subject === 'Hindi' ? 'hi' : subject === 'Sanskrit' ? 'sa' : 'en');

// ---------- Play School - Class 8 ----------
export function topics18(ch) {
  const t = L[langOf(ch.subject)];
  const name = ch.chapterName || '';
  const kind = /^(Poem|कविता)/.test(name) ? 'poem' : /^(Story|कहानी|कथा)/.test(name) ? 'story' : 'intro';
  const out = [];
  // a poem / story with a "Meaning" part is split into two topics
  const parts = String(ch.notes || '').split(/\n(?=(?:भावार्थ|भावार्थः|Meaning|सीख|Moral)\s*[:-])/);
  out.push({ title: t[kind], text: parts[0].trim(), intro: true });
  if (parts.length > 1) out.push({ title: t.meaning, text: parts.slice(1).join('\n').trim() });
  out.push(...asTopics(bookTopics(ch.class, name)));
  if (ch.examples) out.push({ title: t.example, text: ch.examples });
  return out;
}

// ---------- Class 9 - 12 ----------
const STEP = /^(Step \d+ - [^:]+|चरण \d+ - [^:]+):\s*/;
export function topics912(ch) {
  const hi = ch.subject === 'Hindi';
  const notes = Array.isArray(ch.notes) ? ch.notes : [String(ch.notes || '')];
  const out = [{ title: hi ? 'मुख्य विचार / परिभाषा' : 'Main Idea and Definition', text: (notes[0] || '').replace(STEP, ''), intro: true }];
  out.push(...asTopics(bookTopics(ch.class, ch.chapterName)));
  if (ch.formulas) out.push({ title: hi ? 'याद रखने की बात / ट्रिक' : 'Formula and Memory Trick', text: ch.formulas });
  const how = notes.slice(2).map((n) => n.replace(STEP, '')).filter(Boolean);
  if (how.length) out.push({ title: hi ? 'जीवन से जोड़िए और अभ्यास कीजिए' : 'Connect, Practise and Revise', text: how.join('\n\n') });
  return out;
}

// ---------- College units, Computer Courses and Cooking recipes ----------
function sentenceTitle(s, fallback) {
  if (/^Use[ds] /.test(s)) return 'Uses and Applications';
  const colon = s.match(/^([^:.\n]{2,48}):\s/);
  if (colon) return colon[1].trim();
  const is = s.match(/^(?:An?|The)?\s*([^.:;]{2,40}?)\s(?:is|are|means|=)\s/);
  if (is) return is[1].trim().replace(/^./, (c) => c.toUpperCase());
  const words = s.replace(/[.:;]+$/, '').split(/\s+/);
  if (!words[0]) return fallback;
  return words.length <= 6 ? words.join(' ') : `${words.slice(0, 5).join(' ')}...`;
}
function splitSentences(text) {
  const raw = String(text || '').split(/(?<=[.!?।])\s+(?=[A-Z0-9"(ऀ-ॿ])/).map((s) => s.trim()).filter(Boolean);
  const out = [];
  for (const s of raw) {
    if (out.length && (out[out.length - 1].length < 45 || s.length < 30)) out[out.length - 1] += ` ${s}`;
    else out.push(s);
  }
  return out;
}
export function topicsCollege(u) {
  const unitTitle = String(u.unitName || '').replace(/^Unit \d+\s*-\s*/, '');
  const notes = String(u.notes || '');
  // recipes: Ingredients and Method (English + Hindi)
  if (u.notesHi || /\nMethod:/.test(notes)) {
    const [ing, ...m] = notes.split(/\n(?=Method:)/);
    const [ingHi, ...mHi] = String(u.notesHi || '').split(/\n(?=विधि:)/);
    const out = [{ title: 'Ingredients · सामग्री', text: ing.trim(), textHi: ingHi.trim(), intro: true }];
    if (m.length) out.push({ title: 'Method · विधि', text: m.join('\n').trim(), textHi: mHi.join('\n').trim() });
    return out;
  }
  // code / step-by-step notes (more than one line) stay together
  if (notes.includes('\n')) return [{ title: unitTitle, text: notes, intro: true }];
  const parts = splitSentences(notes);
  if (parts.length <= 1) return [{ title: unitTitle, text: notes, intro: true }];
  return parts.map((s, i) => ({ title: sentenceTitle(s, `Topic ${i + 1}`), text: s, ...(i === 0 ? { intro: true } : {}) }));
}
