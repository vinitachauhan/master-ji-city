'use client';
import { useProfile } from './Profile';

export default function ProfileChip() {
  const { profile, stars, openEditor } = useProfile();
  if (!profile) return null;
  return (
    <button onClick={openEditor} className="flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5 text-sm font-semibold hover:bg-slate-200" title="Change profile">
      <span>👋 {profile.name}</span>
      <span className="rounded-full bg-yellow-300 px-2 text-slate-900 tabular-nums">⭐ {stars}</span>
    </button>
  );
}
