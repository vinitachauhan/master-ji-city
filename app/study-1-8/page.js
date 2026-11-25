'use client';
// Step 1: choose a class. Each class opens its subjects on a new page.
import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useProfile } from '@/components/Profile';
import StarBank from '@/components/StarBank';
import { withSuspense } from '@/components/study/common';
import { CLASSES_18, SUBJECTS_18, label18, url18 } from '@/lib/study18Nav.mjs';

const COLORS = ['bg-yellow-300', 'bg-pink-300', 'bg-sky-300', 'bg-green-300', 'bg-orange-300', 'bg-violet-300', 'bg-rose-300', 'bg-amber-300', 'bg-lime-300', 'bg-cyan-300', 'bg-fuchsia-300'];
const EMOJI = ['🧸', '🎈', '🖍️', '1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣'];

function Study18() {
  const { profile } = useProfile();
  const router = useRouter();
  const p = useSearchParams();

  // old links (/study-1-8?class=5&subject=Maths) open the new pages
  useEffect(() => {
    const cls = p.get('class'); const subject = p.get('subject');
    if (!CLASSES_18.includes(cls)) return;
    router.replace(SUBJECTS_18.some(([s]) => s === subject) ? url18.chapters(cls, subject) : url18.subjects(cls));
  }, [p, router]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-yellow-200 via-pink-100 to-sky-200 font-kid">
      <div className="mx-auto max-w-6xl px-4 py-6">
        <Link href="/" className="font-bold text-pink-600">← Home</Link>
        <h1 className="mt-2 text-4xl font-extrabold text-slate-900 sm:text-5xl">📚 Play School to Class 8</h1>
        <p className="text-xl font-bold text-pink-600">COMPLETE Study - Learn with fun! 🎈</p>
        <p className="mt-1 text-lg text-slate-700">Class → Subject → Chapter → Topic. Every step opens on its own page.</p>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_340px]">
          <section>
            <h2 className="text-2xl font-extrabold text-sky-700">1️⃣ Choose your Class</h2>
            <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
              {CLASSES_18.map((c, i) => (
                <Link key={c} href={url18.subjects(c)}
                  className={`relative rounded-3xl border-4 p-4 text-center shadow-pop transition hover:-translate-y-1 active:translate-y-1 ${COLORS[i]} ${profile?.class === c ? 'border-slate-900' : 'border-white'}`}>
                  {profile?.class === c && <span className="absolute right-2 top-2 rounded-full bg-slate-900 px-2 text-xs font-bold text-white">My class</span>}
                  <div className="text-4xl">{EMOJI[i]}</div>
                  <div className="text-2xl font-extrabold text-slate-900">{label18(c)}</div>
                  <div className="text-sm font-bold text-slate-700">{SUBJECTS_18.length} subjects →</div>
                </Link>
              ))}
            </div>
          </section>
          <aside className="space-y-6"><StarBank /></aside>
        </div>
      </div>
    </main>
  );
}
export default withSuspense(Study18);
