'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useProfile } from '@/components/Profile';
import { speak } from '@/components/speech';

const KID_CLASSES = ['Play School', 'Nursery', 'KG', '1', '2', '3', '4', '5', '6', '7', '8'];
const SUBJECTS = ['Maths', 'Science', 'English', 'Hindi', 'SST', 'Physics', 'Chemistry', 'Biology', 'Accounts', 'Economics', 'History', 'Geography', 'Computer', 'Other'];
const EXAMPLES = ['What is multiplication? How do I do 5 x 4?', 'Explain photosynthesis simply', 'x + 5 = 12, what is x?', 'संज्ञा किसे कहते हैं? उदाहरण दीजिए।', 'Explain Ohm’s law (V = IR) with an example'];

// Shrink a photo in the browser before upload (max 1280px, JPEG) so it works on slow mobile data.
async function compressImage(file) {
  const url = URL.createObjectURL(file);
  try {
    const img = await new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = rej; i.src = url; });
    const scale = Math.min(1, 1280 / Math.max(img.width, img.height));
    const canvas = document.createElement('canvas');
    canvas.width = Math.round(img.width * scale); canvas.height = Math.round(img.height * scale);
    canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
    return { preview: dataUrl, mediaType: 'image/jpeg', data: dataUrl.split(',')[1] };
  } finally { URL.revokeObjectURL(url); }
}

// Tiny renderer for the answer: "### " headings, numbered steps, **bold**
function Answer({ text, kid }) {
  const bold = (s) => s.split(/(\*\*[^*]+\*\*)/g).map((part, i) => part.startsWith('**') && part.endsWith('**') ? <strong key={i}>{part.slice(2, -2)}</strong> : part);
  const blocks = [];
  let list = null;
  text.split('\n').forEach((raw, i) => {
    const line = raw.trimEnd();
    const num = line.match(/^\s*(\d+)[.)]\s+(.*)$/);
    const bullet = line.match(/^\s*[-*•]\s+(.*)$/);
    if (num || bullet) {
      if (!list) { list = { ordered: !!num, items: [] }; blocks.push(list); }
      list.items.push(num ? num[2] : bullet[1]);
      return;
    }
    list = null;
    if (/^#{1,4}\s/.test(line)) blocks.push({ h: line.replace(/^#{1,4}\s+/, ''), key: i });
    else if (line.trim()) blocks.push({ p: line, key: i });
  });
  return (
    <div className="space-y-2 leading-relaxed">
      {blocks.map((b, i) => b.h ? (
        <h3 key={i} className={`mt-4 rounded-lg px-3 py-1.5 font-extrabold ${kid ? 'bg-yellow-200 text-pink-700' : 'bg-blue-50 text-blue-800'}`}>{b.h}</h3>
      ) : b.p ? <p key={i}>{bold(b.p)}</p> : b.ordered ? (
        <ol key={i} className="list-decimal space-y-1 pl-6">{b.items.map((t, j) => <li key={j}>{bold(t)}</li>)}</ol>
      ) : <ul key={i} className="list-disc space-y-1 pl-6">{b.items.map((t, j) => <li key={j}>{bold(t)}</li>)}</ul>)}
    </div>
  );
}

export default function DoubtPage() {
  const { profile } = useProfile();
  const [question, setQuestion] = useState('');
  const [subject, setSubject] = useState('');
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const fileRef = useRef(null);
  const kid = !profile || KID_CLASSES.includes(profile.class);

  const loadHistory = () => {
    if (!profile?.name) return;
    fetch(`/api/doubt?name=${encodeURIComponent(profile.name)}&class=${encodeURIComponent(profile.class)}&city=${encodeURIComponent(profile.city)}`)
      .then((r) => r.json()).then((d) => setHistory(d.rows || [])).catch(() => {});
  };
  useEffect(loadHistory, [profile]); // eslint-disable-line react-hooks/exhaustive-deps

  const onFile = async (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (!f.type.startsWith('image/')) { setError('Please choose a photo (JPG / PNG).'); return; }
    try { setPhoto(await compressImage(f)); setError(''); } catch { setError('Could not read this photo. Try another one.'); }
  };

  const ask = async (e) => {
    e?.preventDefault();
    if (!question.trim() && !photo) { setError('Type your question or add a photo.'); return; }
    setLoading(true); setError(''); setResult(null);
    try {
      const r = await fetch('/api/doubt', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: profile?.name, class: profile?.class, city: profile?.city, subject, question, image: photo ? { mediaType: photo.mediaType, data: photo.data } : null }),
      });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error || 'Something went wrong');
      setResult(d); loadHistory();
    } catch (err) { setError(err.message); }
    setLoading(false);
  };

  const plain = (t) => t.replace(/#{1,4}\s*/g, '').replace(/\*\*/g, '');

  return (
    <main className={`min-h-screen ${kid ? 'bg-gradient-to-b from-yellow-200 via-pink-100 to-sky-200 font-kid' : 'bg-slate-50'}`}>
      <div className={kid ? '' : 'bg-gradient-to-r from-blue-700 to-green-600 text-white'}>
        <div className="mx-auto max-w-4xl px-4 py-6">
          <Link href="/" className={`text-sm font-bold ${kid ? 'text-pink-600' : 'text-blue-100'}`}>← Home</Link>
          <h1 className={`mt-1 text-3xl font-extrabold sm:text-5xl ${kid ? 'text-slate-900' : ''}`}>🤖 AI Doubt Solver</h1>
          <p className={`text-lg font-semibold ${kid ? 'text-pink-600' : 'text-blue-100'}`}>Ask in English or Hindi, or send a photo of your question - Master Ji will explain step by step!</p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl space-y-6 px-4 py-6">
        <form onSubmit={ask} className={kid ? 'rounded-3xl border-4 border-pink-300 bg-white p-5 shadow-pop' : 'rounded-2xl border border-slate-200 bg-white p-5 shadow-sm'}>
          <label className="block text-lg font-bold">Your question
            <textarea value={question} onChange={(e) => setQuestion(e.target.value)} rows={4} maxLength={2000}
              placeholder="e.g. What is photosynthesis? / x + 5 = 12, x = ? / संज्ञा किसे कहते हैं?"
              className={`mt-2 w-full rounded-xl border-2 p-3 text-base font-normal outline-none ${kid ? 'border-yellow-300 focus:border-pink-400' : 'border-slate-200 focus:border-blue-500'}`} />
          </label>
          <div className="mt-2 flex flex-wrap gap-2">
            {EXAMPLES.map((x) => <button type="button" key={x} onClick={() => setQuestion(x)} className={`rounded-full px-3 py-1 text-sm ${kid ? 'bg-sky-100 text-sky-800' : 'bg-blue-50 text-blue-800'}`}>{x}</button>)}
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <input ref={fileRef} type="file" accept="image/*" capture="environment" onChange={onFile} className="hidden" />
            <button type="button" onClick={() => fileRef.current?.click()} className={`rounded-xl px-4 py-2.5 font-bold ${kid ? 'bg-yellow-300 text-slate-900' : 'bg-slate-100 text-slate-800 hover:bg-slate-200'}`}>📷 {photo ? 'Change photo' : 'Add photo of question'}</button>
            <select value={subject} onChange={(e) => setSubject(e.target.value)} className="rounded-xl border-2 border-slate-200 bg-white px-3 py-2.5">
              <option value="">Subject (optional)</option>{SUBJECTS.map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>
          {photo && (
            <div className="mt-3 flex items-start gap-3">
              <img src={photo.preview} alt="Your question photo" className="max-h-48 rounded-xl border border-slate-200" />
              <button type="button" onClick={() => { setPhoto(null); if (fileRef.current) fileRef.current.value = ''; }} className="text-sm font-semibold text-red-600">Remove</button>
            </div>
          )}

          <button disabled={loading} className={`mt-5 w-full rounded-2xl px-6 py-4 text-xl font-extrabold text-white disabled:opacity-60 sm:w-auto ${kid ? 'bg-pink-500 hover:bg-pink-600' : 'bg-blue-600 hover:bg-blue-700'}`}>
            {loading ? '🤔 Master Ji is thinking...' : 'Ask 🚀'}
          </button>
          {error && <p className="mt-3 rounded-lg bg-red-50 p-3 text-red-700">⚠ {error}</p>}
        </form>

        {result && (
          <section className={kid ? 'rounded-3xl border-4 border-sky-300 bg-white p-5 shadow-pop' : 'rounded-2xl border border-slate-200 bg-white p-5 shadow-sm'}>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className={`text-2xl font-extrabold ${kid ? 'text-sky-700' : 'text-blue-800'}`}>🎓 Master Ji’s Answer</h2>
              <div className="flex gap-2">
                <button onClick={() => speak(plain(result.answer))} className={`rounded-full px-3 py-1.5 text-sm font-bold ${kid ? 'bg-pink-100 text-pink-700' : 'bg-blue-50 text-blue-700'}`}>🔊 Listen</button>
                <span className={`rounded-full px-3 py-1.5 text-xs font-bold ${result.source === 'ai' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>{result.source === 'ai' ? '✔ AI answer' : '📘 From built-in notes'}</span>
              </div>
            </div>
            {result.question && <p className="mt-2 text-slate-600"><b>Question:</b> {result.question}</p>}
            {result.note && <p className="mt-2 rounded-lg bg-amber-50 p-2 text-sm text-amber-800">ℹ {result.note} Showing the closest answer from the built-in notes.</p>}
            <div className="mt-3 text-lg"><Answer text={result.answer} kid={kid} /></div>
            <p className="mt-4 text-xs text-slate-500">✔ Saved to your doubts. AI can make mistakes - check important answers with your teacher.</p>
          </section>
        )}

        {history.length > 0 && (
          <section className={kid ? 'rounded-3xl bg-white/80 p-5' : 'rounded-2xl border border-slate-200 bg-white p-5'}>
            <h2 className="text-xl font-extrabold">📚 My recent doubts</h2>
            <ul className="mt-3 space-y-2">
              {history.map((h, i) => (
                <li key={i}>
                  <button onClick={() => { setResult({ ...h, note: '' }); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="w-full rounded-xl border border-slate-200 bg-white p-3 text-left hover:border-blue-400">
                    <p className="font-semibold">{h.question || '📷 Photo question'}</p>
                    <p className="text-xs text-slate-500">{new Date(h.createdAt).toLocaleString('en-IN')} {h.subject && `· ${h.subject}`}</p>
                  </button>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </main>
  );
}
