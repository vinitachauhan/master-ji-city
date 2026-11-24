'use client';
// Mini Excel - cells, formulas (=A1+B1, =SUM(A1:A5), AVERAGE, MIN, MAX, COUNT, IF), bold, sort, chart, CSV open/save.
// Formulas are worked out by a small safe parser (no eval).
import { useEffect, useMemo, useState } from 'react';
import { store, downloadFile } from './TextApps';

const COLS = 'ABCDEFGH'.split('');
const ROWS = 15;
const SAMPLE = { A1: 'Name', B1: 'Maths', C1: 'Science', D1: 'Total', A2: 'Ravi', B2: '78', C2: '85', D2: '=B2+C2', A3: 'Sita', B3: '92', C3: '88', D3: '=B3+C3', A4: 'Aman', B4: '65', C4: '70', D4: '=B4+C4', A6: 'Average', B6: '=AVERAGE(B2:B4)', C6: '=AVERAGE(C2:C4)', D6: '=MAX(D2:D4)' };

const cellsIn = (range) => {
  const m = range.match(/^([A-H])(\d+):([A-H])(\d+)$/); if (!m) return [range];
  const out = [];
  for (let c = COLS.indexOf(m[1]); c <= COLS.indexOf(m[3]); c++) for (let r = Number(m[2]); r <= Number(m[4]); r++) out.push(`${COLS[c]}${r}`);
  return out;
};

// tiny arithmetic parser: + - * / ( ) and comparisons for IF
function calc(expr) {
  let i = 0; const s = expr.replace(/\s+/g, '');
  const num = () => { const m = s.slice(i).match(/^\d+(\.\d+)?/); if (!m) throw new Error('bad'); i += m[0].length; return Number(m[0]); };
  const factor = () => {
    if (s[i] === '-') { i++; return -factor(); }
    if (s[i] === '(') { i++; const v = cmp(); if (s[i++] !== ')') throw new Error('bad'); return v; }
    return num();
  };
  const term = () => { let v = factor(); while (s[i] === '*' || s[i] === '/') { const op = s[i++]; const b = factor(); v = op === '*' ? v * b : v / b; } return v; };
  const expr2 = () => { let v = term(); while (s[i] === '+' || s[i] === '-') { const op = s[i++]; const b = term(); v = op === '+' ? v + b : v - b; } return v; };
  const cmp = () => {
    const a = expr2(); const m = s.slice(i).match(/^(>=|<=|<>|=|>|<)/);
    if (!m) return a; i += m[0].length; const b = expr2();
    return { '>=': a >= b, '<=': a <= b, '<>': a !== b, '=': a === b, '>': a > b, '<': a < b }[m[0]] ? 1 : 0;
  };
  const v = cmp(); if (i !== s.length) throw new Error('bad'); return v;
}

export default function MiniExcel() {
  const [cells, setCells] = useState({});
  const [bold, setBold] = useState({});
  const [sel, setSel] = useState('A1');
  const [chartCol, setChartCol] = useState('');
  useEffect(() => { try { const s = JSON.parse(store.get('lab:excel', '')); setCells(s.cells || SAMPLE); setBold(s.bold || { A1: 1, B1: 1, C1: 1, D1: 1 }); } catch { setCells(SAMPLE); setBold({ A1: 1, B1: 1, C1: 1, D1: 1 }); } }, []);
  useEffect(() => { store.set('lab:excel', JSON.stringify({ cells, bold })); }, [cells, bold]);

  const value = useMemo(() => {
    const cache = {};
    const get = (ref, seen = new Set()) => {
      if (ref in cache) return cache[ref];
      if (seen.has(ref)) return '#CYCLE!';
      const raw = cells[ref] ?? '';
      if (!String(raw).startsWith('=')) { const n = Number(raw); return (cache[ref] = raw !== '' && !Number.isNaN(n) ? n : raw); }
      const next = new Set(seen).add(ref);
      const nums = (arg) => arg.split(',').flatMap(cellsIn).map((r) => get(r, next)).filter((v) => typeof v === 'number');
      try {
        let f = raw.slice(1).toUpperCase();
        f = f.replace(/IF\(([^,]+),([^,]+),([^)]+)\)/g, (_, c, a, b) => `(${c})*(${a})+(1-(${c}))*(${b})`);
        f = f.replace(/(SUM|AVERAGE|MIN|MAX|COUNT)\(([^)]*)\)/g, (_, fn, arg) => {
          const v = nums(arg);
          const r = fn === 'SUM' ? v.reduce((a, b) => a + b, 0) : fn === 'AVERAGE' ? (v.length ? v.reduce((a, b) => a + b, 0) / v.length : 0)
            : fn === 'MIN' ? Math.min(...v) : fn === 'MAX' ? Math.max(...v) : v.length;
          return `(${r})`;
        });
        f = f.replace(/\b([A-H])(\d{1,2})\b/g, (m) => { const v = get(m, next); if (String(v).startsWith('#')) throw new Error(v); return typeof v === 'number' ? `(${v})` : '(0)'; });
        const out = calc(f);
        return (cache[ref] = Number.isFinite(out) ? Math.round(out * 100) / 100 : '#DIV/0!');
      } catch { return (cache[ref] = '#ERROR!'); }
    };
    return get;
  }, [cells]);

  const setCell = (ref, v) => setCells((c) => ({ ...c, [ref]: v }));
  const move = (e, ref) => {
    const c = COLS.indexOf(ref[0]); const r = Number(ref.slice(1));
    // Enter / arrows up-down move between rows, Tab moves right (left-right arrows stay inside the text)
    const go = { ArrowDown: [c, r + 1], Enter: [c, r + 1], ArrowUp: [c, r - 1], Tab: [e.shiftKey ? c - 1 : c + 1, r] }[e.key];
    if (!go) return;
    const [nc, nr] = go; if (nc < 0 || nc >= COLS.length || nr < 1 || nr > ROWS) return;
    e.preventDefault(); const next = `${COLS[nc]}${nr}`; setSel(next); document.getElementById(`cell-${next}`)?.focus();
  };
  const sortBy = (dir) => {
    const col = sel[0]; const header = 1;
    const rows = []; for (let r = header + 1; r <= ROWS; r++) { if (COLS.some((c) => cells[`${c}${r}`])) rows.push(Object.fromEntries(COLS.map((c) => [c, cells[`${c}${r}`]]))); }
    const v = (row) => { const n = Number(row[col]); return Number.isNaN(n) ? String(row[col] ?? '') : n; };
    rows.sort((a, b) => (v(a) > v(b) ? 1 : v(a) < v(b) ? -1 : 0) * dir);
    const next = Object.fromEntries(COLS.map((c) => [`${c}1`, cells[`${c}1`]]).filter(([, x]) => x !== undefined));
    rows.forEach((row, i) => COLS.forEach((c) => { if (row[c] !== undefined) next[`${c}${i + 2}`] = row[c]; }));
    setCells(next);
  };
  const csv = () => {
    let last = 0; for (let r = 1; r <= ROWS; r++) if (COLS.some((c) => cells[`${c}${r}`])) last = r;
    return Array.from({ length: last }, (_, i) => COLS.map((c) => { const v = String(value(`${c}${i + 1}`) ?? ''); return /[",\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v; }).join(',')).join('\n');
  };
  const openCsv = () => {
    const i = document.createElement('input'); i.type = 'file'; i.accept = '.csv,text/csv';
    i.onchange = () => i.files?.[0]?.text().then((t) => {
      const next = {}; t.split(/\r?\n/).slice(0, ROWS).forEach((line, r) => line.split(',').slice(0, COLS.length).forEach((v, c) => { if (v) next[`${COLS[c]}${r + 1}`] = v.replace(/^"|"$/g, ''); }));
      setCells(next);
    });
    i.click();
  };
  const chart = chartCol ? Array.from({ length: ROWS - 1 }, (_, i) => [String(value(`A${i + 2}`) || `Row ${i + 2}`), value(`${chartCol}${i + 2}`)]).filter(([, v]) => typeof v === 'number') : [];
  const max = Math.max(1, ...chart.map(([, v]) => v));

  return (
    <div className="overflow-hidden rounded-2xl border-2 border-slate-300 bg-white text-slate-900">
      <div className="bg-green-700 px-3 py-1.5 text-sm font-bold text-white">📊 Book1 - Excel</div>
      <div className="flex flex-wrap items-center gap-1.5 border-b border-slate-300 bg-slate-200 p-2 text-sm">
        <button onClick={() => setBold((b) => ({ ...b, [sel]: b[sel] ? 0 : 1 }))} className="rounded-md bg-white px-2 py-1 font-bold hover:bg-green-100">B</button>
        <button onClick={() => sortBy(1)} className="rounded-md bg-white px-2 py-1 font-bold hover:bg-green-100">⬆️ Sort A→Z</button>
        <button onClick={() => sortBy(-1)} className="rounded-md bg-white px-2 py-1 font-bold hover:bg-green-100">⬇️ Sort Z→A</button>
        <button onClick={() => setChartCol(chartCol ? '' : sel[0] === 'A' ? 'B' : sel[0])} className="rounded-md bg-white px-2 py-1 font-bold hover:bg-green-100">📈 {chartCol ? 'Hide chart' : `Chart column ${sel[0] === 'A' ? 'B' : sel[0]}`}</button>
        <button onClick={openCsv} className="rounded-md bg-white px-2 py-1 font-bold hover:bg-green-100">📂 Open CSV</button>
        <button onClick={() => downloadFile('book1.csv', csv(), 'text/csv')} className="rounded-md bg-green-500 px-2 py-1 font-bold text-white">💾 Save CSV</button>
        <button onClick={() => { if (confirm('Clear the whole sheet?')) { setCells({}); setBold({}); } }} className="rounded-md bg-white px-2 py-1 font-bold hover:bg-red-100">🗑️ Clear</button>
        <button onClick={() => { setCells(SAMPLE); setBold({ A1: 1, B1: 1, C1: 1, D1: 1 }); }} className="rounded-md bg-white px-2 py-1 font-bold hover:bg-green-100">📋 Sample marks</button>
      </div>
      <div className="flex items-center gap-2 border-b border-slate-300 px-2 py-1 text-sm">
        <span className="w-10 rounded bg-slate-100 px-1 text-center font-bold">{sel}</span>
        <span className="font-serif italic text-slate-500">fx</span>
        <input value={cells[sel] ?? ''} onChange={(e) => setCell(sel, e.target.value)} placeholder="Type a value or a formula like =SUM(B2:B4)" className="flex-1 rounded border border-slate-200 px-2 py-0.5 font-mono" />
      </div>
      <div className="max-h-96 overflow-auto">
        <table className="border-collapse text-sm">
          <thead><tr><th className="sticky top-0 z-10 w-10 border bg-slate-100" />{COLS.map((c) => <th key={c} className={`sticky top-0 z-10 min-w-24 border bg-slate-100 px-1 ${sel[0] === c ? 'bg-green-100' : ''}`}>{c}</th>)}</tr></thead>
          <tbody>
            {Array.from({ length: ROWS }, (_, r) => r + 1).map((r) => (
              <tr key={r}>
                <td className={`border bg-slate-100 text-center font-semibold ${Number(sel.slice(1)) === r ? 'bg-green-100' : ''}`}>{r}</td>
                {COLS.map((c) => {
                  const ref = `${c}${r}`; const editing = sel === ref; const v = value(ref);
                  return (
                    <td key={ref} className={`border p-0 ${editing ? 'outline outline-2 outline-green-600' : ''}`}>
                      <input id={`cell-${ref}`} value={editing ? (cells[ref] ?? '') : (v ?? '')} onFocus={() => setSel(ref)} onChange={(e) => setCell(ref, e.target.value)} onKeyDown={(e) => move(e, ref)}
                        className={`w-24 px-1 py-0.5 outline-none ${bold[ref] ? 'font-bold' : ''} ${typeof v === 'number' && !editing ? 'text-right' : ''} ${String(v).startsWith('#') ? 'text-red-600' : ''}`} />
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {chartCol && (
        <div className="border-t border-slate-200 p-3">
          <p className="text-sm font-bold">📈 Bar chart - column {chartCol} ({String(value(`${chartCol}1`) || '')})</p>
          {chart.length === 0 ? <p className="text-sm text-slate-500">No numbers in column {chartCol}.</p> : chart.map(([label, v]) => (
            <div key={label} className="mt-1 flex items-center gap-2 text-sm">
              <span className="w-20 truncate">{label}</span>
              <div className="h-5 rounded bg-green-500" style={{ width: `${(v / max) * 70}%` }} />
              <span className="font-semibold">{v}</span>
            </div>
          ))}
        </div>
      )}
      <p className="border-t border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-600">Formulas: =A1+B1 · =SUM(B2:B5) · =AVERAGE(B2:B5) · =MAX() · =MIN() · =COUNT() · =IF(B2&gt;=33,1,0)</p>
    </div>
  );
}
