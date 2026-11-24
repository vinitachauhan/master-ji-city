'use client';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

const Ctx = createContext(null);
const KEY = 'masterji_profile';
const STAR_KEY = 'masterji_stars';

const read = (k, fallback) => {
  try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : fallback; } catch { return fallback; }
};
const write = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} };

export function ProfileProvider({ children }) {
  const [profile, setProfileState] = useState(null);
  const [stars, setStars] = useState(0);
  const [ready, setReady] = useState(false);
  const [editing, setEditing] = useState(false);
  const pathname = usePathname() || '';
  const isAdmin = pathname.startsWith('/school');

  useEffect(() => {
    setProfileState(read(KEY, null));
    setStars(read(STAR_KEY, 0));
    setReady(true);
  }, []);

  const setProfile = (p) => { setProfileState(p); write(KEY, p); setEditing(false); };

  const addStars = useCallback((n = 1) => {
    setStars((s) => { const v = s + n; write(STAR_KEY, v); return v; });
    const p = read(KEY, null);
    if (p?.name) {
      fetch('/api/stars', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: p.name, class: p.class, city: p.city, add: n }),
      }).catch(() => {});
    }
  }, []);

  return (
    <Ctx.Provider value={{ profile, setProfile, stars, addStars, ready, openEditor: () => setEditing(true) }}>
      {children}
      {ready && !isAdmin && (!profile || editing) && <ProfileForm initial={profile} onSave={setProfile} onClose={profile ? () => setEditing(false) : null} />}
    </Ctx.Provider>
  );
}

export const useProfile = () => useContext(Ctx);

const CLASS_OPTIONS = ['Play School', 'Nursery', 'KG', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', 'College'];

function ProfileForm({ initial, onSave, onClose }) {
  const [name, setName] = useState(initial?.name || '');
  const [cls, setCls] = useState(initial?.class || '');
  const [city, setCity] = useState(initial?.city || '');
  const ok = name.trim() && cls && city.trim();
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 p-4">
      <form
        onSubmit={(e) => { e.preventDefault(); if (ok) onSave({ name: name.trim(), class: cls, city: city.trim() }); }}
        className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl text-slate-800"
      >
        <div className="text-4xl">🎓</div>
        <h2 className="mt-2 text-2xl font-bold">Namaste! Tell us your name</h2>
        <p className="text-slate-500">No login needed - just enter your Name, Class and City.</p>
        <label className="mt-4 block font-semibold">Name
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Vinita" className="mt-1 w-full rounded-xl border-2 border-slate-200 px-4 py-3 text-lg focus:border-sky-500 outline-none" />
        </label>
        <label className="mt-3 block font-semibold">Class
          <select value={cls} onChange={(e) => setCls(e.target.value)} className="mt-1 w-full rounded-xl border-2 border-slate-200 px-4 py-3 text-lg bg-white focus:border-sky-500 outline-none">
            <option value="">-- Select class --</option>
            {CLASS_OPTIONS.map((c) => <option key={c} value={c}>{/^\d+$/.test(c) ? `Class ${c}` : c}</option>)}
          </select>
        </label>
        <label className="mt-3 block font-semibold">City / Village
          <input value={city} onChange={(e) => setCity(e.target.value)} placeholder="e.g. Bulandshahr, Noida, Delhi" className="mt-1 w-full rounded-xl border-2 border-slate-200 px-4 py-3 text-lg focus:border-sky-500 outline-none" />
        </label>
        <div className="mt-5 flex gap-3">
          <button disabled={!ok} className="flex-1 rounded-2xl bg-sky-500 px-4 py-3 text-lg font-bold text-white disabled:opacity-40">Let's Start! 🚀</button>
          {onClose && <button type="button" onClick={onClose} className="rounded-2xl border-2 px-4 py-3 font-semibold">Close</button>}
        </div>
      </form>
    </div>
  );
}
