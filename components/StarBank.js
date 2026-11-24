'use client';
import { useEffect, useState } from 'react';
import { useProfile } from './Profile';

export default function StarBank() {
  const { profile, stars } = useProfile();
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    let alive = true;
    // small delay so new stars reach the server first
    const t = setTimeout(() => {
      fetch('/api/stars').then((r) => r.json()).then((d) => alive && setLeaders(d.leaders || [])).catch(() => {});
    }, 400);
    return () => { alive = false; clearTimeout(t); };
  }, [stars]);

  return (
    <section className="rounded-3xl bg-white p-5 shadow-pop border-4 border-yellow-300">
      <h3 className="text-2xl font-extrabold text-yellow-600">⭐ Star Bank</h3>
      <div className="mt-2 flex items-center gap-4">
        <div className="text-6xl font-black text-yellow-500 tabular-nums">{stars}</div>
        <div className="text-lg">
          <b>{profile?.name || 'Your'}</b>'s Stars!<br />
          <span className="text-slate-500">Every correct answer = +1 Star</span>
        </div>
      </div>
      <h4 className="mt-4 text-xl font-bold text-sky-600">🏆 Leaderboard</h4>
      {leaders.length === 0 ? (
        <p className="text-slate-500">No one yet - be the first! Take a test and win stars.</p>
      ) : (
        <ol className="mt-2 space-y-1">
          {leaders.map((l, i) => (
            <li key={`${l.name}-${l.class}-${l.city}`} className={`flex items-center justify-between rounded-xl px-3 py-2 ${l.name === profile?.name ? 'bg-pink-100 font-bold' : 'bg-sky-50'}`}>
              <span>{['🥇', '🥈', '🥉'][i] || `${i + 1}.`} {l.name} <span className="text-slate-500 text-sm">({/^\d+$/.test(l.class) ? `Class ${l.class}` : l.class}, {l.city})</span></span>
              <span className="font-bold tabular-nums">⭐ {l.stars}</span>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
