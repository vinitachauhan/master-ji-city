'use client';
// "See it as a diagram" box shown on every topic page:
//  1. pictures of the things the topic talks about (and the chapter's own picture cards)
//  2. City vs Village diagram when the topic compares the two
//  3. a flowchart for "A → B → C" chains and numbered steps, and ready concept diagrams (food chain, water cycle ...)
//  4. a topic map: the chapter in the middle and all its topics around it (current one highlighted, click to open)
import { useRouter } from 'next/navigation';
import { conceptFor, picturesFor } from '@/lib/topicPictures.mjs';

const THEMES = {
  kid: { box: 'rounded-3xl border-4 border-violet-200 bg-violet-50 p-4 sm:p-5', head: 'text-xl font-extrabold text-violet-700', tile: 'border-4 border-white bg-white shadow-pop', step: 'bg-white border-4 border-sky-200', centre: '#ec4899', node: '#fef9c3', nodeOn: '#0ea5e9', line: '#c4b5fd', ink: '#0f172a' },
  study: { box: 'rounded-2xl border border-indigo-200 bg-indigo-50 p-4 sm:p-5', head: 'text-lg font-extrabold text-indigo-800', tile: 'border border-slate-200 bg-white shadow-sm', step: 'bg-white border-2 border-blue-200', centre: '#2563eb', node: '#ffffff', nodeOn: '#16a34a', line: '#a5b4fc', ink: '#0f172a' },
  dark: { box: 'rounded-2xl border border-white/15 bg-navy-800 p-4 sm:p-5 text-white', head: 'text-lg font-extrabold text-neon', tile: 'border border-white/15 bg-white text-slate-900', step: 'bg-white text-slate-900 border-2 border-neon/60', centre: '#0f172a', node: '#ffffff', nodeOn: '#22d3ee', line: '#64748b', ink: '#0f172a' },
};
const T = {
  en: { title: '🖼️ See it as a Diagram', pics: 'Pictures', city: '🏙️ City', village: '🏡 Village', flow: 'Step by step', map: 'Topic map - where this topic fits in the chapter (click a topic)' },
  hi: { title: '🖼️ चित्र और आरेख से समझिए', pics: 'चित्र', city: '🏙️ शहर', village: '🏡 गाँव', flow: 'क्रम से समझिए', map: 'पाठ का नक्शा - यह विषय पाठ में कहाँ है (किसी विषय पर क्लिक कीजिए)' },
};

// "City: ... Village: ..." or "शहर में: ... गाँव में: ..."
function cityVillage(text) {
  const m = String(text).match(/(?:^|[\s.।])(City|In a city|शहर में|नगरे)\s*:\s*([\s\S]*?)\s*(?:Village|In a village|गाँव में|ग्रामे)\s*:\s*([\s\S]*)$/i);
  return m ? { city: m[2].trim(), village: m[3].trim() } : null;
}
// "Grass → deer → tiger" (2 or more arrows) or 3+ numbered lines
function flowSteps(text) {
  const parts = String(text).split(/(?<=[.।;])\s+|\n/);
  const chain = parts.find((p) => (p.match(/→/g) || []).length >= 2);
  if (chain) return chain.split('→').map((s, i) => (i === 0 ? s.replace(/^.*:\s*/, '') : s).replace(/[.।;]+$/, '').trim()).filter(Boolean);
  const nums = String(text).split('\n').filter((l) => /^\s*\d+\.\s+/.test(l)).map((l) => l.replace(/^\s*\d+\.\s+/, '').trim());
  return nums.length >= 3 ? nums : null;
}
const cut = (s, n) => (s.length > n ? `${s.slice(0, n - 1)}…` : s);
function wrap(s, n) {
  const words = String(s).split(/\s+/); const lines = [''];
  for (const w of words) { if ((lines[lines.length - 1] + ' ' + w).trim().length > n && lines[lines.length - 1]) lines.push(w); else lines[lines.length - 1] = `${lines[lines.length - 1]} ${w}`.trim(); }
  return lines.slice(0, 2).map((l, i, a) => (i === 1 && words.join(' ').length > a.join(' ').length ? cut(l, n) : l));
}

function TopicMap({ chapterName, topics, current, hrefFor, c }) {
  const router = useRouter();
  const n = topics.length;
  const W = 680, H = n > 6 ? 360 : 300, cx = W / 2, cy = H / 2, rx = 245, ry = H / 2 - 42;
  const nodes = topics.map((t, i) => {
    const a = -Math.PI / 2 + (2 * Math.PI * i) / n;
    return { x: cx + rx * Math.cos(a), y: cy + ry * Math.sin(a), t, i };
  });
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="mt-2 w-full" role="img" aria-label={`${chapterName}: ${topics.map((t) => t.title).join(', ')}`}>
      {nodes.map((p) => <line key={`l${p.i}`} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke={c.line} strokeWidth="3" strokeDasharray={p.i + 1 === current ? '0' : '6 5'} />)}
      <rect x={cx - 95} y={cy - 30} width="190" height="60" rx="16" fill={c.centre} />
      {wrap(chapterName, 22).map((l, k, a) => (
        <text key={k} x={cx} y={cy + (k - (a.length - 1) / 2) * 20 + 6} textAnchor="middle" fontSize="16" fontWeight="800" fill="#fff">{l}</text>
      ))}
      {nodes.map((p) => {
        const on = p.i + 1 === current;
        return (
          <g key={p.i} onClick={() => router.push(hrefFor(p.i + 1))} style={{ cursor: 'pointer' }}>
            <rect x={p.x - 80} y={p.y - 22} width="160" height="44" rx="12" fill={on ? c.nodeOn : c.node} stroke={on ? c.nodeOn : c.line} strokeWidth="2.5" />
            <circle cx={p.x - 62} cy={p.y} r="12" fill={on ? '#fff' : c.centre} />
            <text x={p.x - 62} y={p.y + 5} textAnchor="middle" fontSize="13" fontWeight="800" fill={on ? c.nodeOn : '#fff'}>{p.i + 1}</text>
            <text x={p.x - 44} y={p.y + 5} textAnchor="start" fontSize="13" fontWeight="700" fill={on ? '#fff' : c.ink}>{cut(p.t.title, 15)}</text>
          </g>
        );
      })}
    </svg>
  );
}

export default function TopicDiagram({ topic, topics, current, chapterName, hrefFor, chapterPictures = [], theme = 'kid' }) {
  const c = THEMES[theme];
  const text = `${topic.title}. ${topic.text}`;
  const t = /[ऀ-ॿ]/.test(text) ? T.hi : T.en;
  // chapter pictures named in this topic first, then pictures found from the words
  const named = chapterPictures.filter((p) => text.includes(p.name.split(/\s+-\s+/).pop().replace(/\s*\(.*\)$/, '')));
  let pics = [...named];
  for (const p of picturesFor(topic.text, 10)) if (!pics.some((x) => x.emoji === p.emoji)) pics.push(p);
  if (!pics.length) pics = chapterPictures.slice(0, 6);
  // nothing in this topic's words: use pictures from the whole chapter
  if (!pics.length) pics = picturesFor(`${chapterName}. ${topics.map((x) => `${x.title}. ${x.text}`).join(' ')}`, 10).filter((p) => !/^(City|Village|शहर|गाँव)$/.test(p.name));
  pics = pics.slice(0, 8);
  const concept = conceptFor(text, chapterName);
  const cv = cityVillage(topic.text);
  const steps = flowSteps(topic.text);

  return (
    <section className={`mt-5 ${c.box}`}>
      <p className={c.head}>{t.title}</p>

      {pics.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {pics.map((p, i) => (
            <div key={i} className={`flex w-24 flex-col items-center rounded-2xl p-2 text-center sm:w-28 ${c.tile}`}>
              <span className="text-5xl leading-none" aria-hidden="true">{p.emoji}</span>
              <span className="mt-1 text-sm font-bold leading-tight">{p.name}</span>
            </div>
          ))}
        </div>
      )}

      {concept && (
        <div className="mt-4">
          <p className="text-sm font-bold uppercase tracking-wide opacity-70">📊 {concept.title}</p>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            {concept.steps.map(([e, l], i) => (
              <span key={i} className="flex items-center gap-2">
                <span className={`flex w-28 flex-col items-center rounded-2xl p-2 text-center ${c.tile}`}>
                  <span className="text-4xl leading-none" aria-hidden="true">{e}</span>
                  <span className="mt-1 text-sm font-bold leading-tight">{l}</span>
                </span>
                {i < concept.steps.length - 1 && <span className="text-2xl font-black opacity-60">→</span>}
              </span>
            ))}
          </div>
        </div>
      )}

      {cv && (
        <div className="mt-4 grid items-stretch gap-3 sm:grid-cols-[1fr_auto_1fr]">
          <div className={`rounded-2xl p-3 ${c.tile}`}><p className="font-extrabold text-sky-700">{t.city}</p><p className="mt-1">{cv.city}</p></div>
          <div className="flex items-center justify-center text-2xl font-black text-slate-400">⇄</div>
          <div className={`rounded-2xl p-3 ${c.tile}`}><p className="font-extrabold text-green-700">{t.village}</p><p className="mt-1">{cv.village}</p></div>
        </div>
      )}

      {steps && (
        <div className="mt-4">
          <p className="text-sm font-bold uppercase tracking-wide opacity-70">{t.flow}</p>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            {steps.map((s, i) => (
              <span key={i} className="flex items-center gap-2">
                <span className={`rounded-xl px-3 py-2 text-base font-bold ${c.step}`}><b className="mr-1 opacity-60">{i + 1}.</b>{s}</span>
                {i < steps.length - 1 && <span className="text-2xl font-black opacity-60">→</span>}
              </span>
            ))}
          </div>
        </div>
      )}

      {topics.length > 1 && (
        <div className="mt-4">
          <p className="text-sm font-bold opacity-70">{t.map}</p>
          <TopicMap chapterName={chapterName} topics={topics} current={current} hrefFor={hrefFor} c={c} />
        </div>
      )}
    </section>
  );
}
