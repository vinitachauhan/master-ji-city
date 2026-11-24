'use client';
import { useProfile } from './Profile';

export default function Greeting() {
  const { profile } = useProfile();
  if (!profile) return null;
  return (
    <p className="mt-4 inline-block rounded-full bg-white px-5 py-2 font-semibold text-slate-700 shadow-sm border border-slate-200">
      👋 {profile.name} ({/^\d+$/.test(profile.class) ? `Class ${profile.class}` : profile.class}, {profile.city}) - what do you want to study today?
    </p>
  );
}
