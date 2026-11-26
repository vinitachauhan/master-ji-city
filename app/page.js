import Link from 'next/link';
import Greeting from '@/components/Greeting';
import SchoolFinder from '@/components/schools/SchoolFinder';

const BUTTONS = [
  { href: '/study-1-8', emoji: '📚', title: 'Play School to Class 8', sub: 'COMPLETE Study', hint: 'Notes, Examples, Tests, Stars ⭐', cls: 'from-yellow-300 via-pink-300 to-sky-300 text-slate-900' },
  { href: '/study-9-12', emoji: '🧠', title: 'Class 9 to 12', sub: 'COMPLETE Study + Best Subject Test', hint: 'Board notes, formulas, past-paper questions, 10 MCQ', cls: 'from-blue-600 to-green-500 text-white' },
  { href: '/study-9-12/stream', emoji: '🎯', title: 'Class 11-12 Stream Selector', sub: 'PCM / PCB / Commerce / Arts', hint: 'Which stream is best for you?', cls: 'from-emerald-500 to-teal-600 text-white' },
  { href: '/college-study', emoji: '🎓', title: 'College COMPLETE Study', sub: 'Any Subject', hint: '20 courses: B.Tech, MBBS, BCA, Nursing, ITI, Computer Courses, Cooking...', cls: 'from-navy-900 to-navy-700 text-white ring-2 ring-neon/60' },
];

export default function Home() {
  return (
    <main className="mx-auto max-w-6xl px-4 pb-12">
      <section className="py-10 text-center sm:py-14">
        <div className="text-6xl sm:text-7xl">🎓</div>
        <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-900 sm:text-6xl">Namaste! I am Master Ji 🎓</h1>
        <p className="mx-auto mt-3 max-w-2xl text-lg font-semibold text-slate-600 sm:text-2xl">
          Play School to College - COMPLETE Study - All in One Place
        </p>
        <p className="mt-1 text-slate-500">Simple language · For students in cities and villages · Free</p>
        <Greeting />
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        {BUTTONS.map((b, i) => (
          <Link key={b.href} href={b.href}
            className={`group relative overflow-hidden rounded-3xl bg-gradient-to-br p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-2xl sm:p-8 ${b.cls}`}>
            <div className="absolute right-4 top-3 text-6xl font-black opacity-20">{i + 1}</div>
            <div className="text-5xl sm:text-6xl">{b.emoji}</div>
            <h2 className="mt-3 text-2xl font-extrabold sm:text-3xl">{b.title}</h2>
            <p className="text-lg font-bold opacity-90">{b.sub}</p>
            <p className="mt-2 opacity-80">{b.hint}</p>
            <span className="mt-4 inline-block rounded-full bg-white/90 px-4 py-2 font-bold text-slate-900 group-hover:bg-white">Start →</span>
          </Link>
        ))}
      </section>

      <section className="mt-4 grid gap-4 sm:grid-cols-3">
        {[
          ['/doubt', '🤖', 'AI Doubt Solver', 'Type or photo your question - step by step answer in Hindi + English', 'from-pink-400 to-yellow-300 text-slate-900'],
          ['/mock-test', '📝', 'Mock Test (9th-12th)', '20 MCQ · 30 min timer · Score, Rank, Right / Wrong', 'from-blue-600 to-green-500 text-white'],
          ['/certificate', '🏆', 'Topper Certificate', 'Collect ⭐ stars - download or print your certificate', 'from-amber-300 via-pink-300 to-sky-300 text-slate-900'],
        ].map(([href, e, t, s, cls]) => (
          <Link key={href} href={href} className={`rounded-3xl bg-gradient-to-br p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-2xl ${cls}`}>
            <div className="text-5xl">{e}</div>
            <h2 className="mt-2 text-2xl font-extrabold">{t}</h2>
            <p className="mt-1 opacity-90">{s}</p>
            <span className="mt-3 inline-block rounded-full bg-white/90 px-4 py-2 font-bold text-slate-900">Open →</span>
          </Link>
        ))}
      </section>

      <section className="mt-4 grid gap-4 sm:grid-cols-2">
        {[
          ['/computer-course', '💻', 'Complete Computer Course', '16 modules: basics, MS Office, Internet, Tally, HTML, Python, AI + certificate', 'from-slate-900 to-indigo-700 text-white'],
          ['/react-course', '⚛️', 'Complete React Course', '15 modules: JSX, hooks, APIs, Router, Redux, Next.js, projects - live code + certificate', 'from-sky-600 to-cyan-400 text-white'],
          ['/computer-lab', '🖥️', 'Computer Lab', 'Do it yourself: Paint, Notepad, WordPad, Excel, Typing, HTML, Python', 'from-violet-500 to-sky-500 text-white'],
          ['/study-1-8', '🎨', 'Drawing Classes', 'Play School to Class 8 - step-by-step drawing + draw on screen', 'from-rose-300 via-orange-200 to-yellow-200 text-slate-900'],
          ['/college-study?course=Cooking%20Classes', '🍳', 'Cooking Classes', 'Breakfast, North & South Indian, snacks, sweets, baking, Chinese, kids tiffin', 'from-orange-500 to-red-500 text-white'],
        ].map(([href, e, t, s, cls]) => (
          <Link key={t} href={href} className={`rounded-3xl bg-gradient-to-br p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-2xl ${cls}`}>
            <div className="text-5xl">{e}</div>
            <h2 className="mt-2 text-2xl font-extrabold">{t}</h2>
            <p className="mt-1 opacity-90">{s}</p>
            <span className="mt-3 inline-block rounded-full bg-white/90 px-4 py-2 font-bold text-slate-900">Open →</span>
          </Link>
        ))}
      </section>

      <SchoolFinder />

      <Link href="/school" className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-indigo-200 bg-white p-6 shadow-sm transition hover:border-indigo-500 hover:shadow-lg">
        <div>
          <p className="text-3xl">🏫</p>
          <h2 className="text-2xl font-extrabold text-slate-900">School Management</h2>
          <p className="text-slate-600">Attendance (students, teachers, staff, managers) · Parent meetings · Salary · Fees · Activity payments</p>
        </div>
        <span className="rounded-full bg-indigo-600 px-4 py-2 font-bold text-white">Admin login →</span>
      </Link>

      <section className="mt-10 grid gap-4 text-center sm:grid-cols-4">
        {[['📖', '1500+ Chapters', 'Play School to Class 12'], ['🎤', 'Bolo Master', 'Ask with your voice'], ['📊', 'Best Subject Test', 'Bar graph result'], ['🏫', 'College Guide', 'Delhi · Noida · Bulandshahr']].map(([e, t, s]) => (
          <div key={t} className="rounded-2xl bg-white p-5 shadow-sm border border-slate-200">
            <div className="text-3xl">{e}</div>
            <div className="mt-1 font-bold">{t}</div>
            <div className="text-sm text-slate-500">{s}</div>
          </div>
        ))}
      </section>
    </main>
  );
}
