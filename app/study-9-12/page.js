import Link from 'next/link';

const CARDS = [
  { href: '/study-9-12/study', emoji: '📘', title: 'A) COMPLETE Study', text: 'Class 9-12 · 14 Subjects · Notes, Formulas, Board Questions, Previous Year Pattern, 10 MCQ Test, Study Plan' },
  { href: '/study-9-12/best-subject', emoji: '📊', title: 'B) My Best Subject Test', text: '24 questions (Maths, Science, English, SST, Reasoning, Interest) · Bar graph result' },
  { href: '/study-9-12/stream', emoji: '🎯', title: 'C) Stream Selector', text: 'PCM / PCB / Commerce / Arts - Subjects, Fees, Jobs, Salary' },
];

export default function Study912Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <Link href="/" className="font-semibold text-blue-700">← Home</Link>
        <h1 className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-5xl">🧠 Class 9 to 12</h1>
        <p className="text-lg font-semibold text-green-700">COMPLETE Study + Best Subject Test + Stream Selector</p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {CARDS.map((c) => (
            <Link key={c.href} href={c.href} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-400 hover:shadow-lg">
              <div className="text-4xl">{c.emoji}</div>
              <h2 className="mt-3 text-xl font-bold text-blue-800">{c.title}</h2>
              <p className="mt-2 text-slate-600">{c.text}</p>
              <span className="mt-4 inline-block font-semibold text-green-700">Open →</span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
