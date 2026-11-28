'use client';
// One topic of a state on its own page - /states/topic?s=kerala&t=4
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { speak } from '@/components/speech';
import TopicDiagram from '@/components/study/TopicDiagram';
import VideoLinks from '@/components/study/VideoLinks';
import { Crumbs, withSuspense } from '@/components/study/common';
import { stateById, stateTopics, urlStates } from '@/lib/statesStudy.mjs';

function StateTopic() {
  const p = useSearchParams();
  const s = stateById(p.get('s'));
  const t = Number(p.get('t')) || 1;
  const topics = s ? stateTopics(s) : [];
  const topic = topics[t - 1];
  if (!topic) return <main className="mx-auto max-w-6xl px-4 py-8">Topic not found. <Link href={urlStates.home()} className="font-bold text-orange-700">States of India</Link></main>;

  return (
    <main className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-green-50">
      <div className="bg-gradient-to-r from-orange-500 via-amber-400 to-green-600 text-white">
        <div className="mx-auto max-w-6xl px-4 py-5">
          <Crumbs className="text-white" items={[['🏠 Home', '/'], ['States of India', urlStates.home()], [s.name, urlStates.state(s.id)], [`Topic ${t}`]]} />
          <p className="mt-2 text-sm font-semibold text-white/80">{s.name} · Topic {t} of {topics.length}</p>
          <h1 className="text-2xl font-extrabold sm:text-4xl">{topic.title}</h1>
        </div>
      </div>
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-6 lg:grid-cols-[1fr_280px]">
        <section>
          <div className="rounded-2xl border-l-4 border-orange-500 bg-white p-5 text-lg leading-relaxed shadow-sm">
            <p className="whitespace-pre-line">{topic.text}</p>
            <button onClick={() => speak(`${topic.title}. ${topic.text}`)} className="mt-3 rounded-lg bg-orange-500 px-3 py-1.5 text-sm font-semibold text-white">🔊 Listen</button>
          </div>
          <TopicDiagram theme="study" topic={topic} topics={topics} current={t} chapterName={s.name} hrefFor={(n) => urlStates.topic(s.id, n)} />
          <VideoLinks query={`${s.name} ${topic.title === 'Introduction' ? 'state of India' : topic.title}`} />
          <div className="mt-4 flex flex-wrap justify-between gap-2">
            {t > 1 ? <Link href={urlStates.topic(s.id, t - 1)} className="rounded-lg bg-white px-4 py-2 font-semibold shadow-sm">← Previous topic</Link> : <Link href={urlStates.state(s.id)} className="rounded-lg bg-white px-4 py-2 font-semibold shadow-sm">← All topics</Link>}
            {t < topics.length
              ? <Link href={urlStates.topic(s.id, t + 1)} className="rounded-lg bg-orange-500 px-4 py-2 font-semibold text-white">Next topic →</Link>
              : <span className="flex flex-wrap gap-2">
                  <Link href={urlStates.state(s.id, 'language')} className="rounded-lg bg-green-600 px-4 py-2 font-semibold text-white">🗣️ Learn the Language</Link>
                  <Link href={urlStates.state(s.id, 'quiz')} className="rounded-lg bg-orange-500 px-4 py-2 font-semibold text-white">📝 Take the Quiz</Link>
                </span>}
          </div>
        </section>
        <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-4">
          <p className="font-bold">📑 {s.name}</p>
          <ol className="mt-2 space-y-1 text-sm">
            {topics.map((x, n) => <li key={n}><Link href={urlStates.topic(s.id, n + 1)} className={`block rounded-lg px-3 py-1.5 font-semibold ${n + 1 === t ? 'bg-orange-500 text-white' : 'hover:bg-orange-50'}`}>{n + 1}. {x.title}</Link></li>)}
          </ol>
        </aside>
      </div>
    </main>
  );
}
export default withSuspense(StateTopic);
