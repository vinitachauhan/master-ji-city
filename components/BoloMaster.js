'use client';
import { useRef, useState } from 'react';
import { speak, getRecognizer } from './speech';

const NUM_WORDS = {
  ek: 1, do: 2, teen: 3, char: 4, chaar: 4, paanch: 5, panch: 5, chhe: 6, chhah: 6, saat: 7, aath: 8, nau: 9, das: 10,
  one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10,
  एक: 1, दो: 2, तीन: 3, चार: 4, पांच: 5, पाँच: 5, छह: 6, सात: 7, आठ: 8, नौ: 9, दस: 10,
};
const OPS = [
  [/(guna|गुणा|into|times|\bx\b|×|\*|multiply|multiplied by)/i, '*'],
  [/(plus|jod|जोड़|और|aur|\+|add)/i, '+'],
  [/(minus|ghata|घटा|kam|कम|-|subtract)/i, '-'],
  [/(bhag|भाग|divide|divided by|÷|\/)/i, '/'],
];

// "2 guna 3 kitna hota hai" -> 6
function tryMaths(text) {
  const t = text.toLowerCase().replace(/[?।]/g, ' ');
  const tokens = t.split(/\s+/).map((w) => (NUM_WORDS[w] !== undefined ? String(NUM_WORDS[w]) : w));
  const joined = tokens.join(' ');
  const nums = joined.match(/\d+(\.\d+)?/g);
  if (!nums || nums.length < 2) return null;
  const op = OPS.find(([re]) => re.test(joined));
  if (!op) return null;
  const [a, b] = nums.slice(0, 2).map(Number);
  const res = { '*': a * b, '+': a + b, '-': a - b, '/': b ? +(a / b).toFixed(2) : NaN }[op[1]];
  if (Number.isNaN(res)) return 'You cannot divide by zero!';
  const name = { '*': 'times', '+': 'plus', '-': 'minus', '/': 'divided by' }[op[1]];
  return `${a} ${name} ${b} equals ${res}. Well done, good question!`;
}

const words = (s) => s.toLowerCase().replace(/[^\p{L}\p{M}\p{N}\s]/gu, ' ').split(/\s+/).filter((w) => w.length > 2);

function answerFromChapters(text, chapters) {
  const q = new Set(words(text));
  let best = null; let bestScore = 0;
  for (const ch of chapters || []) {
    const title = words(ch.chapterName);
    const body = words(`${ch.notes} ${ch.examples || ''}`);
    const score = title.filter((w) => q.has(w)).length * 3 + body.filter((w) => q.has(w)).length;
    if (score > bestScore) { bestScore = score; best = ch; }
  }
  if (!best || bestScore < 2) return null;
  return `${best.chapterName}: ${best.notes} Example: ${best.examples || ''}`;
}

export default function BoloMaster({ chapters = [], theme = 'kid' }) {
  const [listening, setListening] = useState(false);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [typed, setTyped] = useState('');
  const recRef = useRef(null);

  const respond = (text) => {
    setQuestion(text);
    const ans = tryMaths(text)
      || answerFromChapters(text, chapters)
      || 'I do not know this one yet. Select a Class and Subject above, then say a chapter name - like "What is multiplication" or "5 times 4".';
    setAnswer(ans);
    speak(ans);
  };

  const start = () => {
    const rec = getRecognizer();
    if (!rec) { setAnswer('This phone/browser does not support the mic. Type your question below! (Use Chrome)'); return; }
    recRef.current = rec;
    rec.onresult = (e) => respond(e.results[0][0].transcript);
    rec.onerror = () => { setListening(false); setAnswer('No voice heard. Allow mic permission and speak again.'); };
    rec.onend = () => setListening(false);
    setListening(true);
    rec.start();
  };

  const kid = theme === 'kid';
  return (
    <section className={kid ? 'rounded-3xl bg-white p-5 shadow-pop border-4 border-pink-300' : 'rounded-2xl bg-white p-5 shadow border border-slate-200'}>
      <h3 className={kid ? 'text-2xl font-extrabold text-pink-600' : 'text-xl font-bold text-blue-800'}>🎤 Bolo Master</h3>
      <p className="text-slate-600">Tap the mic and ask - Master Ji will answer out loud!</p>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          onClick={listening ? () => recRef.current?.stop() : start}
          className={`flex h-20 w-20 items-center justify-center rounded-full text-4xl text-white shadow-lg transition ${listening ? 'bg-red-500 animate-pulse' : kid ? 'bg-pink-500 hover:bg-pink-600' : 'bg-blue-600 hover:bg-blue-700'}`}
          aria-label={listening ? 'Stop listening' : 'Ask with mic'}
        >🎙️</button>
        <form className="flex flex-1 min-w-[200px] gap-2" onSubmit={(e) => { e.preventDefault(); if (typed.trim()) { respond(typed.trim()); setTyped(''); } }}>
          <input value={typed} onChange={(e) => setTyped(e.target.value)} placeholder='Or type: "5 times 4"' className="flex-1 min-w-0 rounded-xl border-2 border-slate-200 px-3 py-2" />
          <button className={`rounded-xl px-4 py-2 font-bold text-white ${kid ? 'bg-sky-500' : 'bg-blue-600'}`}>Ask</button>
        </form>
      </div>
      {listening && <p className="mt-3 font-semibold text-red-500">Listening... speak now! 👂</p>}
      {question && <p className="mt-3"><b>You asked:</b> {question}</p>}
      {answer && (
        <div className={`mt-2 rounded-2xl p-4 ${kid ? 'bg-yellow-100' : 'bg-blue-50'}`}>
          <b>🎓 Master Ji:</b> {answer}
          <button onClick={() => speak(answer)} className="ml-2 underline text-sm">🔊 Listen again</button>
        </div>
      )}
    </section>
  );
}
