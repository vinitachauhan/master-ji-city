'use client';
// One state: its topics (each opens on its own page), its language(s) and a quiz.  /states/state?s=uttar-pradesh  (&tab=quiz)
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useProfile } from '@/components/Profile';
import Quiz from '@/components/Quiz';
import { Crumbs, withSuspense } from '@/components/study/common';
import { LANGUAGES, STATES, stateById, stateQuiz, stateTopics, urlStates } from '@/lib/statesStudy.mjs';

const TABS = [['topics', '📑 Topics'], ['language', '🗣️ Learn the Language'], ['quiz', '📝 Quiz (+⭐)']];

function StatePage() {
  const { addStars } = useProfile();
  const router = useRouter();
  const p = useSearchParams();
  const s = stateById(p.get('s'));
  const tab = TABS.some(([k]) => k === p.get('tab')) ? p.get('tab') : 'topics';
  if (!s) return <main className="mx-auto max-w-6xl px-4 py-8">State not found. <Link href={urlStates.home()} className="font-bold text-orange-700">Choose a state</Link></main>;
  const topics = stateTopics(s);
  const i = STATES.indexOf(s);
  const setTab = (k) => router.replace(urlStates.state(s.id, k === 'topics' ? '' : k), { scroll: false });

  return (
    <main className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-green-50">
      <div className="bg-gradient-to-r from-orange-500 via-amber-400 to-green-600 text-white">
        <div className="mx-auto max-w-6xl px-4 py-6">
          <Crumbs className="text-white" items={[['🏠 Home', '/'], ['States of India', urlStates.home()], [s.name]]} />
          <p className="mt-2 text-sm font-bold uppercase tracking-wide text-white/80">{s.kind}</p>
          <h1 className="text-3xl font-extrabold sm:text-5xl">{s.name}</h1>
          <div className="mt-3 flex flex-wrap gap-2 text-sm font-semibold">
            <span className="rounded-full bg-white/20 px-3 py-1">🏛️ {s.capital}</span>
            <span className="rounded-full bg-white/20 px-3 py-1">🗣️ {s.official}</span>
            <span className="rounded-full bg-white/20 px-3 py-1">💃 {s.dance}</span>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-4 py-6">
        <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
          {TABS.map(([k, t]) => <button key={k} onClick={() => setTab(k)} className={`shrink-0 rounded-full px-4 py-2 font-bold ${tab === k ? 'bg-orange-500 text-white' : 'bg-white text-slate-700 shadow-sm'}`}>{t}</button>)}
        </div>

        {tab === 'topics' && (
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {topics.map((t, n) => (
              <Link key={n} href={urlStates.topic(s.id, n + 1)} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-orange-400">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-100 font-black text-orange-700">{n + 1}</span>
                <span className="flex-1 font-bold text-slate-800">{t.title}</span>
                <span className="text-orange-500">→</span>
              </Link>
            ))}
          </div>
        )}

        {tab === 'language' && (
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {s.langs.map((c) => {
              const l = LANGUAGES[c];
              return (
                <Link key={c} href={urlStates.language(c)} className="rounded-2xl border border-green-200 bg-white p-5 shadow-sm transition hover:border-green-500">
                  <p className="text-3xl font-extrabold text-green-800" dir={l.rtl ? 'rtl' : undefined}>{l.native}</p>
                  <p className="text-lg font-bold">{l.name}</p>
                  <p className="text-sm text-slate-500">Script: {l.script}</p>
                  <p className="mt-2 text-slate-700">"{l.phrases[0]?.[1]}" = Hello · "{l.phrases[1]?.[1] || '-'}" = Thank you</p>
                  <span className="mt-3 inline-block rounded-full bg-green-600 px-4 py-1.5 font-bold text-white">Learn {l.name} →</span>
                </Link>
              );
            })}
            <p className="rounded-2xl bg-white p-4 text-sm text-slate-600 shadow-sm sm:col-span-2 lg:col-span-3">Language of {s.name}: {s.official}.</p>
          </div>
        )}

        {tab === 'quiz' && <div className="mt-4 rounded-2xl bg-white p-5 shadow-sm"><Quiz questions={stateQuiz(s)} onCorrect={() => addStars(1)} resetKey={s.id} /></div>}

        <div className="mt-6 flex flex-wrap justify-between gap-2">
          {i > 0 ? <Link href={urlStates.state(STATES[i - 1].id)} className="rounded-full bg-white px-4 py-2 font-bold shadow-sm">← {STATES[i - 1].name}</Link> : <span />}
          {i < STATES.length - 1 && <Link href={urlStates.state(STATES[i + 1].id)} className="rounded-full bg-orange-500 px-4 py-2 font-bold text-white">{STATES[i + 1].name} →</Link>}
        </div>
      </div>
    </main>
  );
}
export default withSuspense(StatePage);
