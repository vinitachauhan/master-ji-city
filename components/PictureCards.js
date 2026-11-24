'use client';
import { useEffect, useState } from 'react';
import { speak } from './speech';

// "Look and say" picture game: the child sees the picture, says the name, then taps to check.
export default function PictureCards({ pictures, lang = 'en', resetKey }) {
  const [shown, setShown] = useState({});
  useEffect(() => setShown({}), [resetKey]);

  const t = lang === 'en'
    ? { title: '🖼️ Look and Say', hint: 'Look at the picture, say its name, then tap to check!', all: 'Show all names', hide: 'Hide names', tap: 'Tap to check' }
    : { title: '🖼️ चित्र देखो, नाम बोलो', hint: 'चित्र देखो, उसका नाम बोलो, फिर छूकर देखो कि सही है या नहीं!', all: 'सबके नाम दिखाओ', hide: 'नाम छिपाओ', tap: 'छूकर देखो' };
  const allShown = pictures.every((_, i) => shown[i]);

  const reveal = (i) => {
    setShown((s) => ({ ...s, [i]: true }));
    speak(pictures[i].name.replace(/\s*\(.*?\)\s*/g, ' ').trim());
  };

  return (
    <div className="mb-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="text-xl font-extrabold text-pink-600">{t.title}</p>
          <p className="text-base text-slate-600">{t.hint}</p>
        </div>
        <button onClick={() => setShown(allShown ? {} : Object.fromEntries(pictures.map((_, i) => [i, true])))}
          className="rounded-full bg-sky-100 px-4 py-2 text-base font-bold text-sky-800">{allShown ? t.hide : t.all}</button>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {pictures.map((p, i) => (
          <button key={i} onClick={() => reveal(i)} aria-label={shown[i] ? p.name : t.tap}
            className={`flex flex-col items-center justify-center rounded-3xl border-4 p-3 shadow-pop transition active:translate-y-1 ${shown[i] ? 'border-green-400 bg-green-50' : 'border-yellow-300 bg-white hover:bg-yellow-50'}`}>
            <span className="text-6xl leading-none sm:text-7xl" aria-hidden="true">{p.emoji}</span>
            <span className={`mt-2 min-h-[2rem] text-center text-lg font-extrabold ${shown[i] ? 'text-green-700' : 'text-slate-400'}`}>
              {shown[i] ? `${p.name} 🔊` : `❓ ${t.tap}`}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
