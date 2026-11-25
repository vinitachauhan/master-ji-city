'use client';
// One college unit / recipe on its own page: /college-study/unit?course=..&sem=1&subject=..&unit=2
// Cooking recipes show English and Hindi side by side. Coding units link to the Computer Lab.
import { useEffect, useState } from 'react';
import Link from 'next/link';

const LAB_FOR = { Python: 'python', 'Web Design': 'code', React: 'code', DCA: 'excel', Tally: 'excel' };

export default function CollegeUnit() {
  const [q, setQ] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const read = () => {
      const p = new URLSearchParams(window.location.search);
      setQ({ course: p.get('course') || '', sem: Number(p.get('sem') || 1), subject: p.get('subject') || '', unit: Number(p.get('unit') || 1) });
    };
    read(); window.addEventListener('popstate', read);
    return () => window.removeEventListener('popstate', read);
  }, []);
  useEffect(() => {
    if (!q?.course || !q.subject) return;
    fetch(`/api/college-study?course=${encodeURIComponent(q.course)}&semester=${q.sem}&subject=${encodeURIComponent(q.subject)}`)
      .then((r) => r.json()).then(setData).catch(() => setData({ units: [] }));
  }, [q?.course, q?.sem, q?.subject]); // eslint-disable-line react-hooks/exhaustive-deps

  const go = (unit) => {
    const next = { ...q, unit };
    window.history.pushState(null, '', `/college-study/unit?${new URLSearchParams({ course: q.course, sem: String(q.sem), subject: q.subject, unit: String(unit) })}`);
    setQ(next); window.scrollTo(0, 0);
  };

  const units = data?.units || [];
  const u = units.find((x) => x.unitNo === q?.unit);
  const isCooking = q?.course === 'Cooking Classes';
  const lab = q?.course === 'Computer Courses' ? LAB_FOR[q.subject] : null;
  const back = q ? `/college-study?${new URLSearchParams({ course: q.course, sem: String(q.sem), subject: q.subject })}` : '/college-study';

  return (
    <main className="min-h-screen bg-navy-900 text-white">
      <div className="mx-auto max-w-6xl px-4 py-6">
        <Link href={back} className="text-sm font-semibold text-neon">← {q?.subject || 'Back'} - all {isCooking ? 'recipes' : 'units'}</Link>
        {!data ? <p className="mt-6 text-slate-300">Loading...</p> : !u ? (
          <p className="mt-6">Not found. <Link href="/college-study" className="font-bold text-neon">Open College Study</Link></p>
        ) : (
          <>
            <p className="mt-4 text-sm text-neon">{q.course}{isCooking ? '' : ` · Semester ${q.sem}`} · {data.subjectTitle} · {isCooking ? 'Recipe' : 'Unit'} {u.unitNo} of {units.length}</p>
            <h1 className="text-2xl font-extrabold sm:text-4xl">{u.unitName}</h1>

            <section className="mt-5 rounded-2xl bg-white p-5 text-slate-900 sm:p-6">
              {u.notesHi ? (
                <div className="grid gap-4 lg:grid-cols-2">
                  <div className="rounded-xl bg-orange-50 p-4">
                    <p className="mb-2 text-sm font-bold uppercase tracking-wide text-orange-700">🇬🇧 English</p>
                    <p className="whitespace-pre-line leading-relaxed">{u.notes}</p>
                  </div>
                  <div className="rounded-xl bg-green-50 p-4">
                    <p className="mb-2 text-sm font-bold uppercase tracking-wide text-green-700">🇮🇳 हिंदी</p>
                    <p className="whitespace-pre-line text-lg leading-relaxed">{u.notesHi}</p>
                  </div>
                </div>
              ) : (
                <div className={`whitespace-pre-line leading-relaxed ${lab ? 'rounded-xl bg-slate-900 p-4 font-mono text-sm text-green-200 sm:text-base' : ''}`}>{u.notes}</div>
              )}
              {q.course === 'Computer Courses' && q.subject === 'React' && (
                <Link href="/react-course" className="mr-2 mt-4 inline-block rounded-full bg-sky-600 px-5 py-2 font-bold text-white hover:bg-sky-700">⚛️ Learn step by step in the Complete React Course (live code + quiz + certificate) →</Link>
              )}
              {lab && (
                <Link href={`/computer-lab?tool=${lab}`} target="_blank" className="mt-4 inline-block rounded-full bg-green-600 px-5 py-2 font-bold text-white hover:bg-green-700">
                  ▶️ Type and run this code yourself in the Computer Lab ({lab === 'python' ? '🐍 Python' : lab === 'code' ? '🌐 HTML & JS' : '📊 Excel'}) ↗
                </Link>
              )}
            </section>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <section className="rounded-2xl bg-white p-5 text-slate-900">
                <h2 className="font-extrabold text-navy-700">{isCooking ? '💡 Tips & Safety' : '❗ Important Questions'}</h2>
                <ul className="mt-2 list-disc space-y-1 pl-5">{u.importantQuestions.map((x) => <li key={x}>{x}</li>)}</ul>
              </section>
              <section className="rounded-2xl bg-white p-5 text-slate-900">
                <h2 className="font-extrabold text-navy-700">{isCooking ? '🧑‍🍳 Practice' : q.course === 'Computer Courses' ? '🖱️ Practicals' : '🕘 Previous Year Pattern'}</h2>
                <ul className="mt-2 list-disc space-y-1 pl-5">{u.previousYearQuestions.map((x) => <li key={x}>{x}</li>)}</ul>
                {isCooking && <p className="mt-3 rounded-lg bg-amber-50 p-2 text-sm text-amber-800">Children cook only with an adult. Wash hands, tie hair, switch off the gas after cooking. / बच्चे बड़ों के साथ ही खाना बनाएँ। हाथ धोएँ, बाल बाँधें, काम के बाद गैस बंद करें।</p>}
              </section>
            </div>

            <div className="mt-5 flex flex-wrap justify-between gap-2">
              <button disabled={u.unitNo <= 1} onClick={() => go(u.unitNo - 1)} className="rounded-full bg-white/10 px-5 py-2 font-bold disabled:opacity-40">← Previous</button>
              <button disabled={u.unitNo >= units.length} onClick={() => go(u.unitNo + 1)} className="rounded-full bg-neon px-5 py-2 font-bold text-navy-900 disabled:opacity-40">Next {isCooking ? 'recipe' : 'unit'} →</button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
