'use client';
import { useEffect } from 'react';

// Full details of one job, shown as a pop-up sheet (full screen on phones).
export default function JobDetail({ job, allJobs = [], onClose, onOpen }) {
  useEffect(() => {
    if (!job) return;
    const esc = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', esc);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', esc); document.body.style.overflow = ''; };
  }, [job, onClose]);
  if (!job) return null;

  const related = job.related.map((id) => allJobs.find((j) => j.id === id)).filter(Boolean);
  const Section = ({ title, children, tone = 'bg-slate-50' }) => (
    <section className={`rounded-xl p-4 ${tone}`}><h3 className="font-bold text-slate-800">{title}</h3><div className="mt-1 text-slate-700">{children}</div></section>
  );
  const Chips = ({ items }) => <div className="mt-1 flex flex-wrap gap-2">{items.map((i) => <span key={i} className="rounded-full border border-slate-200 bg-white px-3 py-1 text-sm">{i}</span>)}</div>;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 sm:items-center sm:p-4" onClick={onClose} role="dialog" aria-modal="true" aria-label={job.name}>
      <div className="flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl" onClick={(e) => e.stopPropagation()}>
        <header className="flex items-start justify-between gap-3 bg-gradient-to-r from-blue-700 to-green-600 p-5 text-white">
          <div>
            <div className="text-5xl">{job.emoji}</div>
            <h2 className="mt-1 text-2xl font-extrabold sm:text-3xl">{job.name}</h2>
            <p className="text-sm text-blue-100">After Class 12: {job.streams.join(' / ')} · {job.sector}</p>
          </div>
          <button onClick={onClose} className="rounded-full bg-white/20 px-3 py-1.5 text-lg font-bold hover:bg-white/30" aria-label="Close">✕</button>
        </header>

        <div className="space-y-3 overflow-y-auto p-5">
          <Section title="🧑‍💼 What is this job?" tone="bg-blue-50"><p>{job.what}</p></Section>

          <Section title="🪜 How to become one - step by step">
            <ol className="mt-1 space-y-2">
              {job.path.map((s, i) => (
                <li key={i} className="flex gap-3"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">{i + 1}</span><span className="pt-0.5">{s}</span></li>
              ))}
            </ol>
          </Section>

          <div className="grid gap-3 sm:grid-cols-2">
            <Section title="📝 Entrance exams"><Chips items={job.exams} /></Section>
            <Section title="⏳ Duration and cost"><p><b>Time:</b> {job.duration}</p><p className="mt-1"><b>Cost:</b> {job.cost}</p></Section>
          </div>

          <Section title="💵 Salary (approximate)" tone="bg-green-50">
            <div className="mt-1 grid gap-2 sm:grid-cols-3">
              {[['Starting', job.salary.start], ['After 5-10 years', job.salary.mid], ['Top level', job.salary.top]].map(([k, v]) => (
                <div key={k} className="rounded-lg bg-white p-3"><p className="text-xs font-bold uppercase text-green-700">{k}</p><p className="font-semibold">{v}</p></div>
              ))}
            </div>
          </Section>

          <Section title="🛠️ Skills you need"><Chips items={job.skills} /></Section>

          <div className="grid gap-3 sm:grid-cols-2">
            <Section title="👍 Good things" tone="bg-green-50"><ul className="list-disc space-y-1 pl-5">{job.pros.map((p) => <li key={p}>{p}</li>)}</ul></Section>
            <Section title="⚠️ Challenges" tone="bg-amber-50"><ul className="list-disc space-y-1 pl-5">{job.cons.map((p) => <li key={p}>{p}</li>)}</ul></Section>
          </div>

          {related.length > 0 && (
            <Section title="🔗 Related jobs">
              <div className="mt-1 flex flex-wrap gap-2">
                {related.map((r) => (
                  <button key={r.id} onClick={() => onOpen(r)} className="rounded-full border-2 border-blue-200 bg-white px-3 py-1.5 text-sm font-semibold text-blue-800 hover:border-blue-500">{r.emoji} {r.name}</button>
                ))}
              </div>
            </Section>
          )}
          <p className="text-xs text-slate-500">Salaries, fees and exam details are approximate and change every year - always check the official website before applying.</p>
        </div>
      </div>
    </div>
  );
}
