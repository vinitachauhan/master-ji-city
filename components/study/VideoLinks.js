'use client';
// "Learn by watching videos" - opens a YouTube search for this exact topic (in Hindi and in English),
// so students always get real, current videos (we never hard-code video links that may break).
const yt = (q) => `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}&sp=EgIQAQ%253D%253D`;

export default function VideoLinks({ query, hindi = true, english = true, extra = [], theme = 'light' }) {
  const box = theme === 'dark' ? 'border-white/15 bg-navy-800 text-white' : 'border-red-200 bg-red-50 text-slate-900';
  const links = [
    ...(hindi ? [[`${query} in Hindi`, 'हिंदी में वीडियो']] : []),
    ...(english ? [[`${query} explained`, 'Videos in English']] : []),
    ...extra,
  ];
  return (
    <section className={`mt-5 rounded-2xl border p-4 ${box}`}>
      <p className="text-lg font-extrabold">📺 Video dekh kar seekho</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {links.map(([q, label]) => (
          <a key={q} href={yt(q)} target="_blank" rel="noopener noreferrer" className="rounded-full bg-red-600 px-4 py-2 text-sm font-bold text-white hover:bg-red-700">▶ {label} ↗</a>
        ))}
      </div>
      <p className="mt-2 text-xs opacity-70">Opens YouTube search for this topic. Children: watch with a parent or teacher.</p>
    </section>
  );
}
