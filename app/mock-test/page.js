'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useProfile } from '@/components/Profile';

const CLASSES = ['9', '10', '11', '12'];
const SUBJECTS = ['Maths', 'Science', 'Physics', 'Chemistry', 'Biology', 'Accounts', 'Business Studies', 'Economics', 'History', 'Geography', 'Pol Science', 'Hindi', 'English', 'Computer'];
const fmt = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

export default function MockTest() {
  const { profile, addStars } = useProfile();
  const [cls, setCls] = useState('10');
  const [subject, setSubject] = useState('Science');
  const [stage, setStage] = useState('setup'); // setup | test | result
  const [test, setTest] = useState(null);
  const [answers, setAnswers] = useState({});
  const [current, setCurrent] = useState(0);
  const [left, setLeft] = useState(0);
  const [outcome, setOutcome] = useState(null);
  const [top, setTop] = useState([]);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const endsAt = useRef(0);
  const submitting = useRef(false);

  useEffect(() => { if (profile && CLASSES.includes(profile.class)) setCls(profile.class); }, [profile]);
  useEffect(() => { if ((cls === '11' || cls === '12') && subject === 'Science') setSubject('Physics'); }, [cls, subject]);

  const submit = useCallback(async () => {
    if (submitting.current || !test) return;
    submitting.current = true; setBusy(true); setError('');
    try {
      const r = await fetch('/api/mock-test', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId: test.sessionId, name: profile?.name, city: profile?.city, answers }),
      });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error);
      setOutcome(d); setStage('result');
      if (d.result.score > 0) addStars(d.result.score);
      fetch(`/api/mock-test?class=${test.class}&subject=${encodeURIComponent(test.subject)}&top=1`).then((x) => x.json()).then((x) => setTop(x.rows || []));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (e) { setError(e.message || 'Could not submit. Check your internet and try again.'); submitting.current = false; }
    setBusy(false);
  }, [test, answers, profile, addStars]);

  // Countdown timer - auto-submits at 00:00
  useEffect(() => {
    if (stage !== 'test') return;
    const t = setInterval(() => {
      const s = Math.max(0, Math.round((endsAt.current - Date.now()) / 1000));
      setLeft(s);
      if (s === 0) { clearInterval(t); submit(); }
    }, 500);
    return () => clearInterval(t);
  }, [stage, submit]);

  // Warn before leaving mid-test
  useEffect(() => {
    if (stage !== 'test') return;
    const h = (e) => { e.preventDefault(); e.returnValue = ''; };
    window.addEventListener('beforeunload', h);
    return () => window.removeEventListener('beforeunload', h);
  }, [stage]);

  const start = async () => {
    setBusy(true); setError('');
    try {
      const r = await fetch(`/api/mock-test?class=${cls}&subject=${encodeURIComponent(subject)}`);
      const d = await r.json();
      if (!r.ok) throw new Error(d.error);
      setTest(d); setAnswers({}); setCurrent(0); setOutcome(null); submitting.current = false;
      endsAt.current = Date.now() + d.durationSec * 1000; setLeft(d.durationSec);
      setStage('test');
    } catch (e) { setError(e.message || 'Could not start the test'); }
    setBusy(false);
  };

  const subjects = SUBJECTS.filter((s) => s !== 'Science' || cls === '9' || cls === '10');

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="bg-gradient-to-r from-blue-700 to-green-600 text-white">
        <div className="mx-auto max-w-5xl px-4 py-6">
          <Link href="/study-9-12" className="text-sm font-semibold text-blue-100">← Class 9-12</Link>
          <h1 className="mt-1 text-2xl font-extrabold sm:text-4xl">📝 Mock Test · Class 9-12</h1>
          <p className="text-blue-100">20 MCQ · 30 minutes · Result, Score, Rank and Right / Wrong answers</p>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-6">
        {error && <p className="mb-4 rounded-lg bg-red-50 p-3 text-red-700">⚠ {error}</p>}

        {stage === 'setup' && (
          <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
            <h2 className="text-lg font-bold text-blue-800">1. Choose Class</h2>
            <div className="mt-2 flex flex-wrap gap-2">
              {CLASSES.map((c) => <button key={c} onClick={() => setCls(c)} className={`rounded-full px-5 py-2 font-bold ${cls === c ? 'bg-blue-600 text-white' : 'bg-slate-100 hover:bg-blue-50'}`}>Class {c}</button>)}
            </div>
            <h2 className="mt-5 text-lg font-bold text-blue-800">2. Choose Subject</h2>
            <div className="mt-2 flex flex-wrap gap-2">
              {subjects.map((s) => <button key={s} onClick={() => setSubject(s)} className={`rounded-lg px-3 py-2 text-sm font-semibold ${subject === s ? 'bg-green-500 text-white' : 'bg-slate-100 hover:bg-green-50'}`}>{s}</button>)}
            </div>
            <div className="mt-6 rounded-xl bg-blue-50 p-4 text-sm text-slate-700">
              <p className="font-bold text-blue-800">Rules</p>
              <ul className="mt-1 list-disc pl-5">
                <li>20 questions, 30 minutes. The test submits itself when time runs out.</li>
                <li>No negative marking - try every question.</li>
                <li>Rank is among everyone who took Class {cls} {subject}. Same score? Faster time ranks higher.</li>
                <li>Every correct answer = +1 ⭐ star (collect enough stars for the Topper Certificate!).</li>
              </ul>
            </div>
            <button onClick={start} disabled={busy} className="mt-6 w-full rounded-2xl bg-gradient-to-r from-blue-600 to-green-600 px-6 py-4 text-xl font-extrabold text-white disabled:opacity-60 sm:w-auto">{busy ? 'Loading...' : 'Start Test ⏱️'}</button>
          </section>
        )}

        {stage === 'test' && test && (
          <>
            <div className="sticky top-[104px] z-30 mb-4 flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white/95 p-3 shadow-sm backdrop-blur md:top-[60px]">
              <div className="text-sm font-semibold text-slate-600">Class {test.class} · {test.subject}<br /><span className="text-slate-900">{Object.keys(answers).length} / {test.questions.length} answered</span></div>
              <div className={`rounded-xl px-4 py-2 font-mono text-2xl font-black tabular-nums ${left <= 60 ? 'animate-pulse bg-red-600 text-white' : left <= 300 ? 'bg-amber-100 text-amber-800' : 'bg-blue-50 text-blue-800'}`} aria-live="polite">⏱ {fmt(left)}</div>
              <button onClick={() => { if (confirm(`Submit now? ${test.questions.length - Object.keys(answers).length} question(s) not answered.`)) submit(); }} disabled={busy} className="rounded-xl bg-green-600 px-4 py-2 font-bold text-white disabled:opacity-60">Submit</button>
            </div>

            <div className="grid gap-4 lg:grid-cols-[1fr_220px]">
              <section className="rounded-2xl border border-slate-200 bg-white p-5">
                <p className="text-sm font-semibold text-green-700">Question {current + 1} of {test.questions.length} · {test.questions[current].chapter}</p>
                <h2 className="mt-2 text-xl font-bold text-slate-900">{test.questions[current].question}</h2>
                <div className="mt-4 grid gap-2">
                  {test.questions[current].options.map((o, k) => (
                    <button key={o} onClick={() => setAnswers((a) => ({ ...a, [current]: o }))}
                      className={`flex items-center gap-3 rounded-xl border-2 px-4 py-3 text-left ${answers[current] === o ? 'border-blue-600 bg-blue-50 font-semibold' : 'border-slate-200 hover:border-blue-300'}`}>
                      <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-bold ${answers[current] === o ? 'bg-blue-600 text-white' : 'bg-slate-100'}`}>{'ABCD'[k]}</span>{o}
                    </button>
                  ))}
                </div>
                <div className="mt-5 flex justify-between gap-2">
                  <button disabled={current === 0} onClick={() => setCurrent((c) => c - 1)} className="rounded-xl border border-slate-300 px-4 py-2 font-semibold disabled:opacity-40">← Previous</button>
                  {answers[current] && <button onClick={() => setAnswers((a) => { const n = { ...a }; delete n[current]; return n; })} className="text-sm text-slate-500 underline">Clear answer</button>}
                  {current < test.questions.length - 1
                    ? <button onClick={() => setCurrent((c) => c + 1)} className="rounded-xl bg-blue-600 px-4 py-2 font-semibold text-white">Next →</button>
                    : <button onClick={() => { if (confirm('Submit the test?')) submit(); }} className="rounded-xl bg-green-600 px-4 py-2 font-semibold text-white">Submit ✔</button>}
                </div>
              </section>
              <aside className="rounded-2xl border border-slate-200 bg-white p-4">
                <p className="text-sm font-bold text-slate-700">Questions</p>
                <div className="mt-2 grid grid-cols-5 gap-2">
                  {test.questions.map((_, i) => (
                    <button key={i} onClick={() => setCurrent(i)} aria-label={`Question ${i + 1}${answers[i] ? ', answered' : ''}`}
                      className={`h-10 rounded-lg text-sm font-bold ${i === current ? 'ring-2 ring-blue-600' : ''} ${answers[i] ? 'bg-green-500 text-white' : 'bg-slate-100 text-slate-700'}`}>{i + 1}</button>
                  ))}
                </div>
                <p className="mt-3 text-xs text-slate-500">Green = answered</p>
              </aside>
            </div>
          </>
        )}

        {stage === 'result' && outcome && <Result outcome={outcome} top={top} onRetry={() => setStage('setup')} />}
      </div>
    </main>
  );
}

function Result({ outcome, top, onRetry }) {
  const r = outcome.result;
  const [show, setShow] = useState('all');
  const review = outcome.review.filter((q) => show === 'all' || (show === 'right' ? q.isCorrect : !q.isCorrect));
  const msg = r.percent >= 90 ? '🏆 Outstanding! Topper level!' : r.percent >= 70 ? '🎉 Very good! Keep it up.' : r.percent >= 40 ? '👍 Good try - revise the wrong ones.' : '💪 Keep practising - read the chapter notes and try again.';
  return (
    <div className="space-y-6">
      <section className="rounded-3xl bg-gradient-to-r from-blue-700 to-green-600 p-6 text-white shadow-lg sm:p-8">
        <p className="text-sm font-semibold text-blue-100">Result · Class {r.class} {r.subject}</p>
        <h2 className="mt-1 text-4xl font-black sm:text-6xl">{r.score} / {r.total}</h2>
        <p className="mt-1 text-xl font-bold">{r.percent}% · {msg}</p>
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[['🏅 Rank', `#${r.rank} of ${r.participants}`], ['✅ Right', r.score], ['❌ Wrong', r.wrong], ['⏭ Skipped', r.skipped]].map(([k, v]) => (
            <div key={k} className="rounded-2xl bg-white/15 p-3"><p className="text-sm text-blue-100">{k}</p><p className="text-2xl font-black tabular-nums">{v}</p></div>
          ))}
        </div>
        <p className="mt-3 text-sm text-blue-100">Time taken: {fmt(r.timeTakenSec)} · +{r.score} ⭐ stars added · Result saved</p>
      </section>

      {top.length > 0 && (
        <section className="rounded-2xl border border-slate-200 bg-white p-5">
          <h3 className="text-lg font-bold text-blue-800">🏆 Top 10 - Class {r.class} {r.subject}</h3>
          <ol className="mt-2 divide-y divide-slate-100">
            {top.map((t, i) => (
              <li key={i} className="flex items-center justify-between py-2 text-sm">
                <span>{['🥇', '🥈', '🥉'][i] || `${i + 1}.`} <b>{t.name}</b> <span className="text-slate-500">{t.city}</span></span>
                <span className="tabular-nums font-semibold">{t.score}/{t.total} · {fmt(t.timeTakenSec)}</span>
              </li>
            ))}
          </ol>
        </section>
      )}

      <section className="rounded-2xl border border-slate-200 bg-white p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-lg font-bold text-blue-800">Right / Wrong Answers</h3>
          <div className="inline-flex gap-1 rounded-xl bg-slate-100 p-1">
            {[['all', 'All'], ['right', `Right (${r.score})`], ['wrong', `Wrong / skipped (${r.total - r.score})`]].map(([k, l]) => (
              <button key={k} onClick={() => setShow(k)} className={`rounded-lg px-3 py-1.5 text-sm font-semibold ${show === k ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-600'}`}>{l}</button>
            ))}
          </div>
        </div>
        <ol className="mt-4 space-y-3">
          {review.map((q) => (
            <li key={q.question} className={`rounded-xl border-l-4 p-4 ${q.isCorrect ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'}`}>
              <p className="font-semibold">{q.isCorrect ? '✅' : q.chosen ? '❌' : '⏭'} {q.question}</p>
              <p className="mt-1 text-sm">Your answer: <b>{q.chosen || 'Not answered'}</b></p>
              {!q.isCorrect && <p className="text-sm">Correct answer: <b className="text-green-700">{q.correctAnswer}</b></p>}
              <p className="mt-1 text-xs text-slate-500">Chapter: {q.chapter}</p>
            </li>
          ))}
        </ol>
      </section>

      <div className="flex flex-wrap gap-3">
        <button onClick={onRetry} className="rounded-xl bg-blue-600 px-5 py-3 font-bold text-white">🔁 Take another test</button>
        <Link href="/study-9-12/study" className="rounded-xl border-2 border-green-600 px-5 py-3 font-bold text-green-700">📘 Revise chapters</Link>
        <Link href="/certificate" className="rounded-xl border-2 border-amber-500 px-5 py-3 font-bold text-amber-700">🏆 My certificate</Link>
      </div>
    </div>
  );
}
