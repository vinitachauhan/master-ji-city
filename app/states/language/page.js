'use client';
// Learn a language of India - /states/language?l=ta
import { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useProfile } from '@/components/Profile';
import Quiz from '@/components/Quiz';
import { speakIn } from '@/components/speech';
import { Crumbs, withSuspense } from '@/components/study/common';
import VideoLinks from '@/components/study/VideoLinks';
import { LANGUAGES, PHRASES, languageQuiz, statesForLanguage, urlStates } from '@/lib/statesStudy.mjs';

function LanguagePage() {
  const { addStars } = useProfile();
  const code = useSearchParams().get('l');
  const l = LANGUAGES[code];
  const [noVoice, setNoVoice] = useState(false);
  if (!l) return <main className="mx-auto max-w-6xl px-4 py-8">Language not found. <Link href={urlStates.home()} className="font-bold text-green-700">States of India</Link></main>;
  const say = (native, roman) => { if (!speakIn(native || roman, l.voice)) setNoVoice(true); };

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 via-white to-orange-50">
      <div className="bg-gradient-to-r from-green-700 to-emerald-500 text-white">
        <div className="mx-auto max-w-6xl px-4 py-6">
          <Crumbs className="text-white" items={[['🏠 Home', '/'], ['States of India', urlStates.home()], [`Learn ${l.name}`]]} />
          <h1 className="mt-2 text-3xl font-extrabold sm:text-5xl">🗣️ Learn {l.name} <span className="font-semibold" dir={l.rtl ? 'rtl' : undefined}>{l.native}</span></h1>
          <p className="mt-1 text-green-100">Script: {l.script} · Spoken in: {statesForLanguage(code).map((s) => s.name).join(', ')}</p>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-4 py-6">
        <section className="rounded-2xl bg-white p-4 shadow-sm sm:p-5">
          <h2 className="text-xl font-extrabold text-slate-900">1. Everyday words and sentences</h2>
          <p className="text-sm text-slate-500">Read the word, say it aloud with the Roman pronunciation, then tap 🔊 to listen.</p>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {PHRASES.map(([en, hi], i) => {
              const ph = l.phrases[i];
              if (!ph) return null;
              return (
                <div key={i} className="flex items-center gap-3 rounded-xl border border-slate-200 p-3">
                  <div className="flex-1">
                    {ph[0] && <p className="text-2xl font-bold text-green-800" dir={l.rtl ? 'rtl' : undefined}>{ph[0]}</p>}
                    <p className="font-semibold text-orange-700">🔤 {ph[1]}</p>
                    <p className="text-sm text-slate-600">{en} · {hi}</p>
                  </div>
                  {l.voice && <button onClick={() => say(ph[0], ph[1])} className="rounded-full bg-green-100 px-3 py-2 text-lg" aria-label={`Listen: ${en}`}>🔊</button>}
                </div>
              );
            })}
          </div>
          {noVoice && <p className="mt-3 rounded-lg bg-amber-50 p-2 text-sm text-amber-800">This phone / computer has no {l.name} voice installed, so it may read it with another voice. Read the Roman pronunciation instead.</p>}
          {l.phrases.some((x) => !x) && <p className="mt-3 text-xs text-slate-500">Only words we are sure of are shown. Ask a local speaker to teach you more!</p>}
        </section>

        {l.numbers && (
          <section className="mt-5 rounded-2xl bg-white p-4 shadow-sm sm:p-5">
            <h2 className="text-xl font-extrabold text-slate-900">2. Counting 1 to 10</h2>
            <div className="mt-3 grid grid-cols-5 gap-2 sm:grid-cols-10">
              {l.numbers.map((n, i) => (
                <button key={i} onClick={() => l.voice && say(null, n)} className="rounded-xl border border-green-200 bg-green-50 p-2 text-center">
                  <p className="text-2xl font-black text-green-800">{i + 1}</p>
                  <p className="text-sm font-semibold">{n}</p>
                </button>
              ))}
            </div>
          </section>
        )}

        <section className="mt-5 rounded-2xl bg-white p-4 shadow-sm sm:p-5">
          <h2 className="text-xl font-extrabold text-slate-900">{l.numbers ? '3' : '2'}. Practice Quiz (+⭐)</h2>
          <div className="mt-3"><Quiz questions={languageQuiz(code)} onCorrect={() => addStars(1)} resetKey={code} /></div>
        </section>

        <VideoLinks query={`learn ${l.name} language for beginners`} hindi={false} extra={[[`learn ${l.name} through Hindi`, `${l.name} seekho Hindi se`], [`${l.name} alphabet ${l.script}`, `${l.name} letters (${l.script.split(' ')[0]})`]]} />

        <section className="mt-5">
          <h2 className="text-lg font-extrabold text-slate-900">Study the states where {l.name} is spoken</h2>
          <div className="mt-2 flex flex-wrap gap-2">
            {statesForLanguage(code).map((s) => <Link key={s.id} href={urlStates.state(s.id)} className="rounded-full bg-white px-4 py-2 font-semibold text-orange-700 shadow-sm hover:bg-orange-50">{s.name} →</Link>)}
          </div>
        </section>
      </div>
    </main>
  );
}
export default withSuspense(LanguagePage);
