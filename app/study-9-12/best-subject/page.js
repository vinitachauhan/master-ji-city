'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useProfile } from '@/components/Profile';
import BarChart from '@/components/BarChart';

const STREAM_NAMES = { PCM: 'Science PCM', PCB: 'Science PCB', Commerce: 'Commerce', Arts: 'Arts' };
const SUBJECT_HI = { Maths: 'Maths', Science: 'Science', English: 'English', SST: 'SST', Reasoning: 'Reasoning', Accounts: 'Accounts' };

export default function BestSubject() {
  const { profile } = useProfile();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => { fetch('/api/aptitude').then((r) => r.json()).then((d) => setQuestions(d.questions || [])); }, []);

  const answered = Object.keys(answers).length;
  const submit = async () => {
    setSaving(true); setError('');
    try {
      const r = await fetch('/api/result', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentName: profile?.name || 'Student', class: profile?.class || '', city: profile?.city || '', answers }),
      });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error);
      setResult(d.result);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (e) { setError(e.message || 'Something went wrong, please try again.'); }
    setSaving(false);
  };

  if (result) {
    const s = result.scores;
    const name = result.studentName;
    const data = ['Maths', 'Science', 'English', 'SST', 'Reasoning', 'Accounts'].map((k) => ({
      label: k, value: s[k], hint: k === 'Accounts' ? 'estimated from Maths + Reasoning' : undefined,
    }));
    const stream = result.recommendedStream;
    return (
      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50">
        <div className="mx-auto max-w-4xl px-4 py-8">
          <div className="rounded-3xl bg-gradient-to-r from-blue-700 to-green-600 p-6 text-white shadow-xl sm:p-8">
            <p className="text-sm font-semibold text-blue-100">📊 My Best Subject - Result</p>
            <h1 className="mt-2 text-3xl font-black sm:text-5xl">{name}, You Are Best At {result.bestSubject} - {s[result.bestSubject]}%</h1>
            <p className="mt-2 text-xl font-semibold">Second best: {result.secondSubject} - {s[result.secondSubject]}%</p>
          </div>

          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
            <h2 className="text-lg font-bold text-slate-900">Subject-wise Score (%)</h2>
            <p className="mb-3 text-sm text-slate-500">{data.map((d) => `${d.label} ${d.value}%`).join(', ')}</p>
            <BarChart data={data} best={result.bestSubject} note="There was no separate Accounts test - this is estimated from the Maths + Reasoning scores." />
          </div>

          <div className="mt-6 rounded-2xl border-2 border-green-400 bg-green-50 p-6">
            <p className="text-2xl font-extrabold text-green-800">
              You are strongest in {SUBJECT_HI[result.bestSubject]}, so you should take the <u>{STREAM_NAMES[stream]}</u> stream. 🎯
            </p>
            <p className="mt-2 text-slate-700">
              Your interests point towards: {Object.entries(result.interest).filter(([, v]) => v > 0).map(([k, v]) => `${STREAM_NAMES[k]} (${v}/4)`).join(', ') || 'none selected'}.
            </p>
            <p className="mt-1 text-sm text-slate-500">This is a guide, not a final decision. Talk to your parents and teachers too.</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href={`/study-9-12/stream?best=${encodeURIComponent(result.bestSubject)}&stream=${stream}`} className="rounded-xl bg-green-600 px-5 py-3 font-bold text-white">🎯 See full stream details →</Link>
              <button onClick={() => { setResult(null); setAnswers({}); }} className="rounded-xl border-2 border-blue-600 px-5 py-3 font-bold text-blue-700">🔁 Retake test</button>
            </div>
            <p className="mt-3 text-xs text-slate-500">✔ Result saved to the database.</p>
          </div>
        </div>
      </main>
    );
  }

  const groups = [...new Set(questions.map((q) => q.subject))];
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="bg-gradient-to-r from-blue-700 to-green-600 text-white">
        <div className="mx-auto max-w-4xl px-4 py-6">
          <Link href="/study-9-12" className="text-sm font-semibold text-blue-100">← Class 9-12</Link>
          <h1 className="mt-1 text-2xl font-extrabold sm:text-4xl">📊 My Best Subject Test</h1>
          <p className="text-blue-100">{questions.length} questions · 4 per subject · Interest questions have no wrong answers</p>
        </div>
      </div>
      <div className="mx-auto max-w-4xl px-4 py-6">
        {groups.map((g) => (
          <section key={g} className="mb-6">
            <h2 className="mb-2 text-lg font-bold text-blue-800">{g === 'Interest' ? '💡 Interest' : g}</h2>
            <div className="space-y-3">
              {questions.filter((q) => q.subject === g).map((q) => (
                <div key={q.qid} className="rounded-xl border border-slate-200 bg-white p-4">
                  <p className="font-semibold">{q.question}</p>
                  <div className="mt-2 grid gap-2 sm:grid-cols-2">
                    {q.options.map((o) => (
                      <button key={o} onClick={() => setAnswers((a) => ({ ...a, [q.qid]: o }))}
                        className={`rounded-lg border-2 px-3 py-2 text-left ${answers[q.qid] === o ? 'border-blue-600 bg-blue-50 font-semibold' : 'border-slate-200 hover:border-blue-300'}`}>{o}</button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
        <div className="sticky bottom-3 rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-lg backdrop-blur">
          <div className="flex items-center justify-between gap-3">
            <div className="text-sm font-semibold">{answered} / {questions.length} answered
              <div className="mt-1 h-2 w-40 rounded bg-slate-100"><div className="h-2 rounded bg-green-500" style={{ width: `${questions.length ? (answered / questions.length) * 100 : 0}%` }} /></div>
            </div>
            <button disabled={answered < questions.length || saving} onClick={submit} className="rounded-xl bg-blue-600 px-5 py-3 font-bold text-white disabled:opacity-40">{saving ? 'Checking...' : 'See Result 📊'}</button>
          </div>
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </div>
      </div>
    </main>
  );
}
