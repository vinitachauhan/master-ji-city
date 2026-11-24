'use client';
import { useState } from 'react';

// Horizontal bar chart - ek hi series (subject %), best subject gehra rang + "⭐ Best" label.
export default function BarChart({ data, best, note }) {
  const [hover, setHover] = useState(null);
  return (
    <figure className="w-full">
      <div className="space-y-[2px]" role="img" aria-label={`Subject scores: ${data.map((d) => `${d.label} ${d.value}%`).join(', ')}`}>
        {data.map((d) => {
          const isBest = d.label === best;
          return (
            <div key={d.label}
              className="group relative grid grid-cols-[88px_1fr_52px] sm:grid-cols-[120px_1fr_56px] items-center gap-3 py-2"
              onMouseEnter={() => setHover(d.label)} onMouseLeave={() => setHover(null)}
              onTouchStart={() => setHover(d.label)}>
              <span className={`truncate text-sm sm:text-base ${isBest ? 'font-bold text-slate-900' : 'text-slate-600'}`}>{d.label}</span>
              <div className="relative h-7 rounded-r-[4px] bg-slate-100">
                <div
                  className={`h-full rounded-r-[4px] transition-[width] duration-700 ${isBest ? 'bg-blue-700' : 'bg-blue-300'}`}
                  style={{ width: `${Math.max(d.value, 1)}%` }}
                />
                {hover === d.label && (
                  <div className="absolute -top-9 left-2 z-10 whitespace-nowrap rounded-lg bg-slate-900 px-2 py-1 text-xs text-white shadow">
                    {d.label}: {d.value}%{d.hint ? ` · ${d.hint}` : ''}
                  </div>
                )}
              </div>
              <span className="text-right font-bold tabular-nums text-slate-800">{d.value}%{isBest && <span className="block text-[11px] font-semibold text-blue-700">⭐ Best</span>}</span>
            </div>
          );
        })}
      </div>
      {note && <figcaption className="mt-2 text-xs text-slate-500">{note}</figcaption>}
      <table className="sr-only">
        <caption>Subject wise score</caption>
        <tbody>{data.map((d) => <tr key={d.label}><th>{d.label}</th><td>{d.value}%</td></tr>)}</tbody>
      </table>
    </figure>
  );
}
