'use client';
// Step 5: one topic of a chapter on its own page - /study-1-8/topic?class=5&subject=Maths&no=3&t=2
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import StarBank from '@/components/StarBank';
import PictureCards from '@/components/PictureCards';
import { speak } from '@/components/speech';
import TopicDiagram from '@/components/study/TopicDiagram';
import VideoLinks from '@/components/study/VideoLinks';
import { Crumbs, useJson, withSuspense } from '@/components/study/common';
import { label18, url18 } from '@/lib/study18Nav.mjs';

const PaintPad = dynamic(() => import('@/components/lab/PaintPad'), { ssr: false });
const labLevel = (cls) => (['Play School', 'Nursery', 'KG'].includes(cls) ? cls : Number(cls) <= 2 ? 'Class 1-2' : Number(cls) <= 5 ? 'Class 3-5' : 'Class 6-8');

function Topic18() {
  const p = useSearchParams();
  const cls = p.get('class') || ''; const subject = p.get('subject') || '';
  const no = Number(p.get('no') || 1); const t = Number(p.get('t') || 1);
  const data = useJson(cls && subject ? url18.api(cls, subject) : null);
  const chapters = data?.chapters;
  const ch = chapters?.find((c) => c.chapterNo === no);
  const topic = ch?.topics?.[t - 1];
  const total = ch?.topics?.length || 0;

  return (
    <main className="min-h-screen bg-gradient-to-b from-yellow-200 via-pink-100 to-sky-200 font-kid">
      <div className="mx-auto max-w-6xl px-4 py-6">
        <Crumbs items={[['🏠 Home', '/'], ['Classes', url18.classes()], [label18(cls), url18.subjects(cls)], [subject, url18.chapters(cls, subject)], [`Chapter ${no}`, url18.chapter(cls, subject, no)], [`Topic ${t}`]]} />
        {!chapters ? <p className="mt-6 text-xl">⏳ Loading...</p> : !topic ? (
          <p className="mt-6 text-xl">Topic not found. <Link href={url18.chapter(cls, subject, no)} className="font-bold text-pink-600">Open the chapter</Link></p>
        ) : (
          <div className="mt-4 grid gap-6 lg:grid-cols-[1fr_320px]">
            <section className="rounded-3xl border-4 border-sky-300 bg-white p-4 shadow-pop sm:p-6">
              <p className="text-lg font-bold text-sky-700">{label18(cls)} · {subject} · Chapter {no}: {ch.chapterName}</p>
              <p className="mt-1 inline-block rounded-full bg-pink-100 px-3 py-0.5 text-sm font-extrabold text-pink-700">Topic {t} of {total}</p>
              <h1 className="mt-1 text-3xl font-extrabold text-pink-600 sm:text-4xl">{topic.title}</h1>
              <div className="mt-4 rounded-2xl bg-yellow-100 p-5 text-xl leading-relaxed">
                <p className="whitespace-pre-line">{topic.text}</p>
                <button onClick={() => speak(`${topic.title}. ${topic.text}`)} className="mt-3 rounded-full bg-pink-500 px-4 py-2 text-base font-bold text-white">🔊 Listen to Master Ji</button>
              </div>
              <TopicDiagram theme="kid" topic={topic} topics={ch.topics} current={t} chapterName={ch.chapterName} chapterPictures={ch.pictures || []} hrefFor={(i) => url18.topic(cls, subject, no, i)} />
              <VideoLinks query={`${label18(cls)} ${subject} ${ch.chapterName}${topic.intro ? '' : ` ${topic.title}`}`} english={!['Hindi', 'Sanskrit'].includes(subject)} />
              {topic.intro && ch.pictures?.length > 0 && (
                <div className="mt-6"><PictureCards pictures={ch.pictures} lang={['Hindi', 'Sanskrit'].includes(subject) ? 'hi' : 'en'} resetKey={`${cls}-${subject}-${no}`} /></div>
              )}
              {topic.intro && subject === 'Drawing' && (
                <div className="mt-6">
                  <p className="mb-2 text-xl font-extrabold text-pink-600">✏️ Now draw it yourself here!</p>
                  <PaintPad key={`${cls}-${no}`} compact />
                </div>
              )}
              {subject === 'Computer' && (
                <Link href={`/computer-lab?level=${encodeURIComponent(labLevel(cls))}`}
                  className="mt-4 inline-block rounded-full bg-violet-600 px-5 py-2 text-lg font-extrabold text-white hover:bg-violet-700">🖥️ Practise it in the Computer Lab →</Link>
              )}
              <div className="mt-6 flex flex-wrap justify-between gap-2">
                {t > 1 ? <Link href={url18.topic(cls, subject, no, t - 1)} className="rounded-full bg-sky-100 px-5 py-2 text-lg font-extrabold text-sky-800">← Previous topic</Link> : <Link href={url18.chapter(cls, subject, no)} className="rounded-full bg-sky-100 px-5 py-2 text-lg font-extrabold text-sky-800">← All topics</Link>}
                {t < total ? (
                  <Link href={url18.topic(cls, subject, no, t + 1)} className="rounded-full bg-pink-500 px-5 py-2 text-lg font-extrabold text-white">Next topic →</Link>
                ) : (
                  <span className="flex flex-wrap gap-2">
                    <Link href={url18.chapter(cls, subject, no, 'questions')} className="rounded-full bg-amber-400 px-5 py-2 text-lg font-extrabold text-slate-900">❓ Practice Questions</Link>
                    <Link href={url18.chapter(cls, subject, no, 'test')} className="rounded-full bg-green-500 px-5 py-2 text-lg font-extrabold text-white">📝 Take the Test (+⭐)</Link>
                  </span>
                )}
              </div>
              {t === total && no < chapters.length && (
                <p className="mt-4 text-right"><Link href={url18.chapter(cls, subject, no + 1)} className="font-extrabold text-pink-600">Next chapter: {chapters.find((c) => c.chapterNo === no + 1)?.chapterName} →</Link></p>
              )}
            </section>
            <aside className="space-y-6">
              <div className="rounded-3xl border-4 border-white bg-white/90 p-4 shadow-pop">
                <p className="text-lg font-extrabold text-sky-700">📑 Topics in this chapter</p>
                <ol className="mt-2 space-y-1">
                  {ch.topics.map((x, i) => (
                    <li key={i}>
                      <Link href={url18.topic(cls, subject, no, i + 1)} className={`block rounded-xl px-3 py-1.5 font-bold ${i + 1 === t ? 'bg-pink-500 text-white' : 'hover:bg-yellow-100'}`}>{i + 1}. {x.title}</Link>
                    </li>
                  ))}
                </ol>
              </div>
              <StarBank />
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}
export default withSuspense(Topic18);
