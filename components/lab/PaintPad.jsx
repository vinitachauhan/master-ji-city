'use client';
// Paint - draw with pencil, brush, eraser, line, rectangle, circle, fill bucket and text. Works with mouse and touch.
import { useEffect, useRef, useState } from 'react';

const COLORS = ['#000000', '#ffffff', '#ef4444', '#f97316', '#facc15', '#22c55e', '#0ea5e9', '#2563eb', '#8b5cf6', '#ec4899', '#92400e', '#6b7280'];
const TOOLS = [['pencil', '✏️', 'Pencil'], ['brush', '🖌️', 'Brush'], ['eraser', '🧽', 'Eraser'], ['line', '📏', 'Line'], ['rect', '⬛', 'Rectangle'], ['circle', '⚪', 'Circle'], ['fill', '🪣', 'Fill'], ['text', '🔤', 'Text']];
const W = 960, H = 600;

function hexToRgb(hex) { const n = parseInt(hex.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; }

// Flood fill (fills an area of the same colour, like the Paint bucket)
function floodFill(ctx, x, y, hex) {
  const img = ctx.getImageData(0, 0, W, H); const d = img.data;
  const at = (px, py) => (py * W + px) * 4;
  const s = at(x, y); const target = [d[s], d[s + 1], d[s + 2], d[s + 3]];
  const [r, g, b] = hexToRgb(hex);
  if (target[0] === r && target[1] === g && target[2] === b && target[3] === 255) return;
  const same = (i) => Math.abs(d[i] - target[0]) < 40 && Math.abs(d[i + 1] - target[1]) < 40 && Math.abs(d[i + 2] - target[2]) < 40 && Math.abs(d[i + 3] - target[3]) < 40;
  const stack = [[x, y]];
  while (stack.length) {
    const [px, py0] = stack.pop(); let py = py0;
    while (py >= 0 && same(at(px, py))) py--;
    py++; let left = false, right = false;
    while (py < H && same(at(px, py))) {
      const i = at(px, py); d[i] = r; d[i + 1] = g; d[i + 2] = b; d[i + 3] = 255;
      if (px > 0) { if (same(at(px - 1, py))) { if (!left) { stack.push([px - 1, py]); left = true; } } else left = false; }
      if (px < W - 1) { if (same(at(px + 1, py))) { if (!right) { stack.push([px + 1, py]); right = true; } } else right = false; }
      py++;
    }
  }
  ctx.putImageData(img, 0, 0);
}

export default function PaintPad({ compact = false, title = 'Paint' }) {
  const canvas = useRef(null);
  const snap = useRef(null); // picture before a shape is drawn (for live preview)
  const start = useRef(null);
  const undo = useRef([]);
  const [tool, setTool] = useState('pencil');
  const [color, setColor] = useState('#2563eb');
  const [size, setSize] = useState(6);
  const [drawing, setDrawing] = useState(false);

  const ctx = () => canvas.current.getContext('2d', { willReadFrequently: true });
  const clear = () => { const c = ctx(); c.fillStyle = '#ffffff'; c.fillRect(0, 0, W, H); };
  useEffect(() => { clear(); }, []);

  const pos = (e) => {
    const r = canvas.current.getBoundingClientRect();
    return [Math.round(((e.clientX - r.left) / r.width) * W), Math.round(((e.clientY - r.top) / r.height) * H)];
  };
  const saveUndo = () => { undo.current.push(ctx().getImageData(0, 0, W, H)); if (undo.current.length > 25) undo.current.shift(); };

  const down = (e) => {
    e.preventDefault(); canvas.current.setPointerCapture?.(e.pointerId);
    const [x, y] = pos(e); const c = ctx(); saveUndo();
    if (tool === 'fill') { floodFill(c, Math.min(W - 1, Math.max(0, x)), Math.min(H - 1, Math.max(0, y)), color); return; }
    if (tool === 'text') {
      const t = window.prompt('Type your text:');
      if (t) { c.fillStyle = color; c.font = `bold ${size * 4 + 12}px sans-serif`; c.fillText(t, x, y); }
      return;
    }
    start.current = [x, y]; snap.current = c.getImageData(0, 0, W, H); setDrawing(true);
    c.lineCap = 'round'; c.lineJoin = 'round';
    c.beginPath(); c.moveTo(x, y);
  };
  const move = (e) => {
    if (!drawing) return;
    const [x, y] = pos(e); const c = ctx(); const [sx, sy] = start.current;
    c.strokeStyle = tool === 'eraser' ? '#ffffff' : color;
    c.lineWidth = tool === 'pencil' ? Math.max(1, size / 3) : tool === 'eraser' ? size * 3 : size;
    if (['pencil', 'brush', 'eraser'].includes(tool)) { c.lineTo(x, y); c.stroke(); return; }
    c.putImageData(snap.current, 0, 0); c.beginPath();
    if (tool === 'line') { c.moveTo(sx, sy); c.lineTo(x, y); }
    if (tool === 'rect') c.rect(sx, sy, x - sx, y - sy);
    if (tool === 'circle') c.ellipse((sx + x) / 2, (sy + y) / 2, Math.abs(x - sx) / 2, Math.abs(y - sy) / 2, 0, 0, Math.PI * 2);
    c.stroke();
  };
  const up = () => setDrawing(false);

  const doUndo = () => { const last = undo.current.pop(); if (last) ctx().putImageData(last, 0, 0); };
  const download = () => { const a = document.createElement('a'); a.download = 'my-drawing.png'; a.href = canvas.current.toDataURL('image/png'); a.click(); };

  return (
    <div className="rounded-2xl border-2 border-slate-300 bg-slate-100 p-2 text-slate-900 sm:p-3">
      {!compact && <p className="mb-2 font-bold">🎨 {title}</p>}
      <div className="flex flex-wrap items-center gap-1.5">
        {TOOLS.map(([k, e, t]) => (
          <button key={k} title={t} onClick={() => setTool(k)} className={`rounded-lg px-2 py-1 text-sm font-bold ${tool === k ? 'bg-sky-500 text-white' : 'bg-white hover:bg-sky-100'}`}>{e} <span className="hidden sm:inline">{t}</span></button>
        ))}
        <label className="ml-1 flex items-center gap-1 text-sm font-semibold">Size <input type="range" min="1" max="30" value={size} onChange={(e) => setSize(Number(e.target.value))} className="w-20" /></label>
        <button onClick={doUndo} className="rounded-lg bg-white px-2 py-1 text-sm font-bold hover:bg-amber-100">↩️ Undo</button>
        <button onClick={() => { saveUndo(); clear(); }} className="rounded-lg bg-white px-2 py-1 text-sm font-bold hover:bg-red-100">🗑️ Clear</button>
        <button onClick={download} className="rounded-lg bg-green-500 px-2 py-1 text-sm font-bold text-white hover:bg-green-600">💾 Save PNG</button>
      </div>
      <div className="mt-2 flex flex-wrap items-center gap-1">
        {COLORS.map((c) => (
          <button key={c} aria-label={`colour ${c}`} onClick={() => setColor(c)} style={{ background: c }}
            className={`h-7 w-7 rounded-full border-2 ${color === c ? 'border-slate-900 ring-2 ring-sky-400' : 'border-slate-300'}`} />
        ))}
        <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="h-7 w-10 cursor-pointer rounded" title="More colours" />
      </div>
      <canvas ref={canvas} width={W} height={H}
        onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerLeave={up}
        className="mt-2 w-full touch-none rounded-xl border border-slate-300 bg-white shadow-inner"
        style={{ cursor: tool === 'fill' ? 'cell' : 'crosshair', aspectRatio: `${W} / ${H}` }} />
    </div>
  );
}
