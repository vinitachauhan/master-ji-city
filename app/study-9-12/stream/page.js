'use client';
import { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import JobDetail from '@/components/JobDetail';

const BEST_TO_STREAM = { Maths: 'PCM', Reasoning: 'PCM', Science: 'PCB', Accounts: 'Commerce', English: 'Arts', SST: 'Arts' };
const WHY = {
  PCM: 'Your Maths and logic are strong. PCM uses Maths every day and opens doors to Engineering, Computers and the NDA.',
  PCB: 'You enjoy Science and understanding living things (the body, plants). PCB leads to careers as a Doctor, Nurse, Pharmacist or Lab Technician.',
  Commerce: 'You are good with numbers and logic. Commerce leads to Banking, CA and Business.',
  Arts: 'You have a good command of language and understanding of society. Arts leads to Teaching, IAS, Police and Law.',
};

function StreamInner() {
  const params = useSearchParams();
  const [streams, setStreams] = useState([]);
  const [best, setBest] = useState(params.get('best') || '');
  const [open, setOpen] = useState(params.get('stream') || '');
  const [colleges, setColleges] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [job, setJob] = useState(null);

  useEffect(() => { fetch('/api/streams').then((r) => r.json()).then((d) => setStreams(d.streams || [])); }, []);
  useEffect(() => { fetch('/api/jobs').then((r) => r.json()).then((d) => setJobs(d.jobs || [])); }, []);
  const jobFor = (label) => {
    const l = label.toLowerCase();
    return jobs.find((j) => j.name.toLowerCase() === l || j.aliases.some((a) => a.toLowerCase() === l)) || null;
  };
  const picked = params.get('stream') || BEST_TO_STREAM[best] || '';
  useEffect(() => { if (picked) setOpen(picked); }, [picked]);
  useEffect(() => {
    if (!open) return;
    fetch(`/api/colleges?stream=${open}`).then((r) => r.json()).then((d) => setColleges(d.colleges || []));
  }, [open]);

  const current = streams.find((s) => s.streamName === open);

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="bg-gradient-to-r from-blue-700 to-green-600 text-white">
        <div className="mx-auto max-w-6xl px-4 py-6">
          <Link href="/study-9-12" className="text-sm font-semibold text-blue-100">← Class 9-12</Link>
          <h1 className="mt-1 text-2xl font-extrabold sm:text-4xl">🎯 Class 11-12 Stream Selector</h1>
          <p className="text-blue-100">PCM / PCB / Commerce / Arts - COMPLETE Details</p>
          <div className="mt-4">
            <p className="font-semibold">What was your Best Subject in the test?</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {Object.keys(BEST_TO_STREAM).map((b) => (
                <button key={b} onClick={() => { setBest(b); setOpen(BEST_TO_STREAM[b]); }} className={`rounded-full px-4 py-2 font-bold ${best === b ? 'bg-white text-blue-800' : 'bg-white/15 hover:bg-white/25'}`}>{b}</button>
              ))}
              <Link href="/study-9-12/best-subject" className="rounded-full border border-white/60 px-4 py-2 font-semibold">Haven't taken the test? Take it now →</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-6">
        {current && BEST_TO_STREAM[best] === current.streamName && (
          <div className="mb-6 rounded-2xl border-2 border-green-500 bg-green-50 p-5">
            <p className="text-2xl font-extrabold text-green-800">✅ {current.title} Is Best For You, Because...</p>
            <p className="mt-1 text-lg text-slate-700">{WHY[current.streamName]}</p>
          </div>
        )}

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {streams.map((s) => (
            <button key={s.streamName} onClick={() => setOpen(s.streamName)}
              className={`rounded-2xl border-2 bg-white p-5 text-left transition hover:shadow-lg ${open === s.streamName ? 'border-blue-600 ring-4 ring-blue-100' : 'border-slate-200'}`}>
              <div className="text-4xl">{s.emoji}</div>
              <h2 className="mt-2 text-xl font-extrabold text-blue-800">{s.title}</h2>
              {BEST_TO_STREAM[best] === s.streamName && <span className="mt-1 inline-block rounded-full bg-green-600 px-2 py-0.5 text-xs font-bold text-white">⭐ Best for you</span>}
              <p className="mt-2 text-sm text-slate-600"><b>Subjects:</b> {s.subjects.join(', ')}</p>
              <p className="mt-1 text-sm text-slate-600"><b>Best for:</b> {s.bestFor.slice(0, 3).join(', ')}</p>
            </button>
          ))}
        </div>

        {current && (
          <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
            <h2 className="text-2xl font-extrabold text-slate-900">{current.emoji} {current.title} - COMPLETE Details</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <Info title="📚 Subjects" items={current.subjects} />
              <JobChips title="🎯 Best For" items={current.bestFor} jobFor={jobFor} onOpen={setJob} />
              <JobChips title="💼 Jobs" items={current.jobs} jobFor={jobFor} onOpen={setJob} />
              <Info title="📝 Entrance Exams" items={current.exams} />
              <div className="rounded-xl bg-blue-50 p-4"><h3 className="font-bold text-blue-800">💰 Fees</h3><p className="mt-1 text-slate-700">{current.fees}</p></div>
              <div className="rounded-xl bg-green-50 p-4"><h3 className="font-bold text-green-800">💵 Salary</h3><p className="mt-1 text-slate-700">{current.salary}</p></div>
            </div>

            <h3 className="mt-6 text-xl font-bold text-blue-800">💼 All jobs after {current.title} ({jobs.filter((j) => j.streams.includes(current.streamName)).length})</h3>
            <p className="text-sm text-slate-500">Tap any job to see how to become one, exams, cost, salary, skills, good points and challenges.</p>
            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {jobs.filter((j) => j.streams.includes(current.streamName)).sort((x, y) => (x.streams[0] === current.streamName ? 0 : 1) - (y.streams[0] === current.streamName ? 0 : 1)).map((j) => (
                <button key={j.id} onClick={() => setJob(j)} className="flex items-start gap-3 rounded-xl border-2 border-slate-200 bg-white p-4 text-left transition hover:border-blue-500 hover:shadow-md">
                  <span className="text-3xl">{j.emoji}</span>
                  <span>
                    <span className="block font-bold text-slate-900">{j.name}</span>
                    <span className="block text-sm text-green-700">Starts: {j.salary.start}</span>
                    <span className="mt-1 block text-xs font-semibold text-blue-700">See full details →</span>
                  </span>
                </button>
              ))}
            </div>

            <h3 className="mt-6 text-xl font-bold text-blue-800">Courses after Class 12 ({current.streamName})</h3>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              {colleges.map((c) => (
                <div key={c.courseName} className="rounded-xl border border-slate-200 p-4">
                  <p className="font-bold">{c.courseName} <span className="font-normal text-slate-500">· {c.duration}</span></p>
                  <p className="text-sm text-slate-600">Fees: {c.fees}</p>
                  <p className="text-sm text-slate-600">Salary: {c.salary}</p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {c.jobs.map((name) => { const jj = jobFor(name); return jj
                      ? <button key={name} onClick={() => setJob(jj)} className="rounded-full bg-blue-50 px-2 py-0.5 text-xs font-semibold text-blue-800 hover:bg-blue-100">{name} ›</button>
                      : <span key={name} className="rounded-full bg-slate-100 px-2 py-0.5 text-xs">{name}</span>; })}
                  </div>
                </div>
              ))}
            </div>
            <Link href="/college-study/guide" className="mt-4 inline-block font-semibold text-green-700">See colleges (Delhi / Noida / Bulandshahr) →</Link>
          </section>
        )}
      </div>
      <JobDetail job={job} allJobs={jobs} onClose={() => setJob(null)} onOpen={setJob} />
    </main>
  );
}

// Job names as buttons - tap to open the job's full details
function JobChips({ title, items, jobFor, onOpen }) {
  return (
    <div className="rounded-xl bg-slate-50 p-4">
      <h3 className="font-bold text-slate-800">{title} <span className="text-xs font-normal text-slate-500">(tap a job for details)</span></h3>
      <div className="mt-2 flex flex-wrap gap-2">
        {items.map((i) => {
          const j = jobFor(i);
          return j ? (
            <button key={i} onClick={() => onOpen(j)} className="rounded-full border-2 border-blue-200 bg-white px-3 py-1 text-sm font-semibold text-blue-800 transition hover:border-blue-500 hover:bg-blue-50">{j.emoji} {i} ›</button>
          ) : <span key={i} className="rounded-full border border-slate-200 bg-white px-3 py-1 text-sm">{i}</span>;
        })}
      </div>
    </div>
  );
}

function Info({ title, items }) {
  return (
    <div className="rounded-xl bg-slate-50 p-4">
      <h3 className="font-bold text-slate-800">{title}</h3>
      <div className="mt-2 flex flex-wrap gap-2">{items.map((i) => <span key={i} className="rounded-full bg-white px-3 py-1 text-sm border border-slate-200">{i}</span>)}</div>
    </div>
  );
}

export default function StreamPage() {
  return <Suspense fallback={<p className="p-6">Loading...</p>}><StreamInner /></Suspense>;
}
