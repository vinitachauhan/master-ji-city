// AI Doubt Solver - answers student questions (text or photo) with Claude.
// If Claude is not configured / not reachable, falls back to the built-in chapter notes.
import Anthropic from '@anthropic-ai/sdk';
import { find } from './db.mjs';

const MODEL = 'claude-opus-5-5';

const SYSTEM = `You are "Master Ji", a kind and patient teacher for Indian students from Play School to College, in cities and villages (Delhi, Noida, Bulandshahr and nearby).

How to answer:
- Language: answer in the language of the question. English question → simple English. Question in Hindi (Devanagari or Hinglish), or about the Hindi subject → simple Hindi in Devanagari, like a Hindi textbook, keeping technical terms in English in brackets. Sanskrit question → Sanskrit like a Sanskrit textbook, with Hindi meanings in brackets.
- Match the student's class level. Short sentences. No jargon without explaining it.
- Use exactly these four sections, each starting with a line beginning "### " (headings in English; for Hindi answers add the Hindi word too, e.g. "### Answer (उत्तर)"):
### Answer
### Step by Step
### Example
### Summary
- "Step by Step": numbered steps (1. 2. 3.). For maths/science problems, show every calculation step and the final answer clearly.
- "Example": one everyday example from an Indian city or village (market, farm, metro, cricket, kitchen...).
- "Summary": 2-3 short lines.
- If a photo is unclear or cut off, say what you can read and ask the student to retake the photo.
- If the question is not about studies, careers or school life, politely say you help with studies and suggest asking a study question.
- Never invent facts. If you are not sure, say so.`;

function classLabel(c) { return /^\d+$/.test(c || '') ? `Class ${c}` : (c || 'not given'); }

export async function solveWithClaude({ question, image, cls, subject }) {
  const client = new Anthropic(); // reads ANTHROPIC_API_KEY (or an `ant auth login` profile)
  const content = [];
  if (image) content.push({ type: 'image', source: { type: 'base64', media_type: image.mediaType, data: image.data } });
  content.push({
    type: 'text',
    text: `Student: ${classLabel(cls)}${subject ? `, subject: ${subject}` : ''}\n\n${question ? `Question: ${question}` : 'Please solve the question in this photo.'}`,
  });

  const response = await client.beta.messages.create({
    model: MODEL,
    max_tokens: 16000,
    output_config: { effort: 'medium' },
    // If Claude declines on safety grounds, the API retries on a suitable fallback model in the same call.
    betas: ['server-side-fallback-2026-07-01'],
    fallbacks: 'default',
    system: SYSTEM,
    messages: [{ role: 'user', content }],
  });

  if (response.stop_reason === 'refusal') {
    return { answer: 'Sorry, I cannot answer this one. Please ask a question about your studies.', source: 'ai' };
  }
  const text = response.content.filter((b) => b.type === 'text').map((b) => b.text).join('\n').trim();
  return { answer: text || 'No answer came back - please try again.', source: 'ai', model: response.model };
}

// ---------- Offline fallback: best matching chapter from the built-in notes ----------
const words = (s) => String(s || '').toLowerCase().replace(/[^\p{L}\p{M}\p{N}\s]/gu, ' ').split(/\s+/).filter((w) => w.length > 2);

export async function solveOffline({ question, cls }) {
  const q = new Set(words(question));
  const is18 = !cls || !['9', '10', '11', '12', 'College'].includes(cls);
  const pool = is18
    ? await find('study_1_8', cls ? { class: cls } : {})
    : await find('study_9_12', cls === 'College' ? {} : { class: cls });
  let best = null; let bestScore = 0;
  for (const ch of pool) {
    const notes = Array.isArray(ch.notes) ? ch.notes.join(' ') : ch.notes;
    const score = words(ch.chapterName).filter((w) => q.has(w)).length * 3 + words(`${notes} ${ch.examples || ch.formulas || ''}`).filter((w) => q.has(w)).length;
    if (score > bestScore) { bestScore = score; best = { ...ch, notes }; }
  }
  if (!best || bestScore < 2) {
    return {
      answer: `### Answer\nThe built-in notes do not have a direct answer to this question.\n\n### Step by Step\n1. Add the chapter name or a key word to your question (for example "photosynthesis" or "fractions").\n2. Or open your class and subject in the Study section and read the chapter.\n\n### Example\nAsk like this: "What are simple equations in Class 7?"\n\n### Summary\nThe AI teacher is not connected right now, and the built-in notes had no close match. Try adding the chapter name to your question.`,
      source: 'offline',
    };
  }
  const steps = (Array.isArray(best.notes) ? best.notes : String(best.notes).split(/(?<=[.!?।])\s+|\n+/)).filter(Boolean).slice(0, 5);
  return {
    answer: `### Answer\nThis question seems to be about the chapter "${best.chapterName}" (${classLabel(best.class)} ${best.subject}).\n\n### Step by Step\n${steps.map((s, i) => `${i + 1}. ${String(s).replace(/^(Step|चरण) \d+ - /, '')}`).join('\n')}${best.formulas ? `\n${steps.length + 1}. Formula / key point: ${best.formulas}` : ''}\n\n### Example\n${best.examples || best.formulas || 'See the examples in the chapter notes.'}\n\n### Summary\nThis answer comes from the built-in notes for "${best.chapterName}". For a full step-by-step answer to your exact question, the AI teacher needs to be connected.`,
    source: 'offline',
    chapter: `${best.chapterName} (${classLabel(best.class)} ${best.subject})`,
  };
}

// ---------- simple per-IP rate limit (protects the paid AI calls) ----------
const hits = globalThis.__doubtHits || (globalThis.__doubtHits = new Map());
export function rateLimited(ip, limit = 8, windowMs = 10 * 60 * 1000) {
  const now = Date.now();
  const list = (hits.get(ip) || []).filter((t) => now - t < windowMs);
  if (list.length >= limit) { hits.set(ip, list); return Math.ceil((windowMs - (now - list[0])) / 60000); }
  list.push(now); hits.set(ip, list);
  if (hits.size > 5000) hits.clear();
  return 0;
}
