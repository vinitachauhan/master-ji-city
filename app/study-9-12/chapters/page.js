'use client';
// Class 9-12 Step 3: chapters of one subject - /study-9-12/chapters?class=10&subject=Science
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import BoloMaster from '@/components/BoloMaster';
import { Crumbs, useJson, withSuspense } from '@/components/study/common';
import { url912 } from '@/lib/study912Nav.mjs';

function Chapters912() {
  const p = useSearchParams();
  const cls = p.get('class') || ''; const subject = p.get('subject') || '';
  const data = useJson(cls && subject ? url912.api(cls, subject) : null);
  const chapters = data?.chapters || [];
  const plan = chapters[0]?.studyPlan;

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="bg-gradient-to-r from-blue-700 to-green-600 text-white">
        <div className="mx-auto max-w-6xl px-4 py-6">
          <Crumbs className="text-blue-100" items={[['🏠 Home', '/'], ['Class 9-12', url912.classes()], [`Class ${cls}`, url912.subjects(cls)], [subject]]} />
          <h1 className="mt-2 text-2xl font-extrabold sm:text-4xl">Class {cls} · {subject}</h1>
          <p className="text-blue-100">3. Choose a chapter - every chapter is split into topics</p>
        </div>
      </div>
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-6 lg:grid-cols-[1fr_300px]">
        <section>
          {!data ? <p className="text-slate-500">Loading...</p> : (
            <>
              <h2 className="text-xl font-extrabold text-slate-900">{chapters.length} chapters</h2>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {chapters.map((c) => (
                  <Link key={c.chapterNo} href={url912.chapter(cls, subject, c.chapterNo)}
                    className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-400">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-lg font-black text-white">{c.chapterNo}</span>
                    <span className="flex-1">
                      <span className="block font-bold text-slate-800">{c.chapterName}</span>
                      <span className="block text-xs text-slate-500">{c.topics?.length || 0} topics · board questions · 10 MCQ test</span>
                    </span>
                    <span className="text-blue-600">→</span>
                  </Link>
                ))}
                {chapters.length === 0 && <p>No chapters yet. <Link href={url912.subjects(cls)} className="font-bold text-blue-700">Choose another subject</Link></p>}
              </div>
              <div className="mt-6"><BoloMaster chapters={chapters.map((c) => ({ ...c, notes: [].concat(c.notes).join(' '), examples: c.formulas }))} theme="study" /></div>
            </>
          )}
        </section>
        <aside className="space-y-4">
          {plan && (
            <div className="rounded-2xl border border-green-200 bg-green-50 p-4">
              <h3 className="font-bold text-green-800">🗓️ Study Plan</h3>
              <p className="mt-1 text-sm font-semibold text-slate-700">How to study this subject?</p>
              <p className="mt-1 text-sm text-slate-700">{plan}</p>
              <p className="mt-2 text-xs text-slate-500">Tip: study 25 min + 5 min break (Pomodoro). Revise for 10 min before sleeping.</p>
            </div>
          )}
        </aside>
      </div>
    </main>
  );
}
export default withSuspense(Chapters912);
