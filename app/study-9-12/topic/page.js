'use client';
// Class 9-12 Step 5: one topic on its own page - /study-9-12/topic?class=10&subject=Science&no=2&t=3
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { speak } from '@/components/speech';
import { Crumbs, useJson, withSuspense } from '@/components/study/common';
import { url912 } from '@/lib/study912Nav.mjs';

function Topic912() {
  const p = useSearchParams();
  const cls = p.get('class') || ''; const subject = p.get('subject') || '';
  const no = Number(p.get('no') || 1); const t = Number(p.get('t') || 1);
  const data = useJson(cls && subject ? url912.api(cls, subject) : null);
  const chapters = data?.chapters;
  const ch = chapters?.find((c) => c.chapterNo === no);
  const topic = ch?.topics?.[t - 1];
  const total = ch?.topics?.length || 0;

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="bg-gradient-to-r from-blue-700 to-green-600 text-white">
        <div className="mx-auto max-w-6xl px-4 py-5">
          <Crumbs className="text-blue-100" items={[['🏠 Home', '/'], ['Class 9-12', url912.classes()], [`Class ${cls}`, url912.subjects(cls)], [subject, url912.chapters(cls, subject)], [`Chapter ${no}`, url912.chapter(cls, subject, no)], [`Topic ${t}`]]} />
          {topic && <>
            <p className="mt-2 text-sm font-semibold text-green-200">Chapter {no}: {ch.chapterName} · Topic {t} of {total}</p>
            <h1 className="text-2xl font-extrabold sm:text-4xl">{topic.title}</h1>
          </>}
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-4 py-6">
        {!chapters ? <p className="text-slate-500">Loading...</p> : !topic ? (
          <p>Topic not found. <Link href={url912.chapter(cls, subject, no)} className="font-bold text-blue-700">Open the chapter</Link></p>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
            <section>
              <div className="rounded-2xl border-l-4 border-blue-500 bg-white p-5 text-lg leading-relaxed shadow-sm">
                <p className="whitespace-pre-line">{topic.text}</p>
                <button onClick={() => speak(`${topic.title}. ${topic.text}`)} className="mt-3 rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-semibold text-white">🔊 Listen</button>
              </div>
              <div className="mt-4 flex flex-wrap justify-between gap-2">
                {t > 1 ? <Link href={url912.topic(cls, subject, no, t - 1)} className="rounded-lg bg-white px-4 py-2 font-semibold shadow-sm">← Previous topic</Link> : <Link href={url912.chapter(cls, subject, no)} className="rounded-lg bg-white px-4 py-2 font-semibold shadow-sm">← All topics</Link>}
                {t < total ? (
                  <Link href={url912.topic(cls, subject, no, t + 1)} className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white">Next topic →</Link>
                ) : (
                  <span className="flex flex-wrap gap-2">
                    <Link href={url912.chapter(cls, subject, no, 'imp')} className="rounded-lg bg-amber-400 px-4 py-2 font-semibold text-slate-900">❗ Board Questions</Link>
                    <Link href={url912.chapter(cls, subject, no, 'test')} className="rounded-lg bg-green-600 px-4 py-2 font-semibold text-white">📝 10 MCQ Test</Link>
                  </span>
                )}
              </div>
              {t === total && no < chapters.length && (
                <p className="mt-4 text-right"><Link href={url912.chapter(cls, subject, no + 1)} className="font-bold text-blue-700">Next chapter: {chapters.find((c) => c.chapterNo === no + 1)?.chapterName} →</Link></p>
              )}
            </section>
            <aside className="rounded-2xl border border-slate-200 bg-white p-4">
              <p className="font-bold text-slate-900">📑 Topics in this chapter</p>
              <ol className="mt-2 space-y-1 text-sm">
                {ch.topics.map((x, i) => (
                  <li key={i}><Link href={url912.topic(cls, subject, no, i + 1)} className={`block rounded-lg px-3 py-1.5 font-semibold ${i + 1 === t ? 'bg-blue-600 text-white' : 'hover:bg-blue-50'}`}>{i + 1}. {x.title}</Link></li>
                ))}
              </ol>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}
export default withSuspense(Topic912);
