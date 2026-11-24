'use client';
// Notepad (plain text) and WordPad (formatted text) - type, format, open and save files.
import { useEffect, useRef, useState } from 'react';

export const store = {
  get: (k, d = '') => { try { return localStorage.getItem(k) ?? d; } catch { return d; } },
  set: (k, v) => { try { localStorage.setItem(k, v); } catch { /* private mode - fine */ } },
};
export function downloadFile(name, text, type = 'text/plain') {
  const url = URL.createObjectURL(new Blob([text], { type }));
  const a = document.createElement('a'); a.href = url; a.download = name; a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
function openFile(accept, cb) {
  const i = document.createElement('input'); i.type = 'file'; i.accept = accept;
  i.onchange = () => { const f = i.files?.[0]; if (f) f.text().then(cb); };
  i.click();
}

const Bar = ({ children }) => <div className="flex flex-wrap items-center gap-1.5 border-b border-slate-300 bg-slate-200 p-2">{children}</div>;
const Btn = ({ on, active, children, title }) => (
  <button title={title} onMouseDown={(e) => e.preventDefault()} onClick={on}
    className={`rounded-md px-2 py-1 text-sm font-bold ${active ? 'bg-sky-500 text-white' : 'bg-white hover:bg-sky-100'}`}>{children}</button>
);

export function Notepad() {
  const [text, setText] = useState('');
  const [wrap, setWrap] = useState(true);
  const [fontSize, setFontSize] = useState(16);
  const [name, setName] = useState('notes.txt');
  const ref = useRef(null);
  useEffect(() => { setText(store.get('lab:notepad')); }, []);
  useEffect(() => { store.set('lab:notepad', text); }, [text]);
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const lines = text.split('\n').length;
  const timeDate = () => {
    const el = ref.current; const stamp = new Date().toLocaleString();
    const s = el.selectionStart; setText(text.slice(0, s) + stamp + text.slice(el.selectionEnd));
  };
  return (
    <div className="overflow-hidden rounded-2xl border-2 border-slate-300 bg-white text-slate-900">
      <div className="bg-sky-700 px-3 py-1.5 text-sm font-bold text-white">🗒️ {name} - Notepad</div>
      <Bar>
        <Btn on={() => { if (!text || confirm('Start a new file? Unsaved text will be lost.')) { setText(''); setName('notes.txt'); } }}>📄 New</Btn>
        <Btn on={() => openFile('.txt,text/plain', (t) => setText(t))}>📂 Open</Btn>
        <Btn on={() => { const n = prompt('File name:', name) || name; const fn = n.endsWith('.txt') ? n : `${n}.txt`; setName(fn); downloadFile(fn, text); }}>💾 Save</Btn>
        <Btn on={timeDate} title="Insert time and date (F5 in real Notepad)">🕒 Time/Date</Btn>
        <Btn on={() => setWrap(!wrap)} active={wrap}>↩️ Word Wrap</Btn>
        <Btn on={() => setFontSize(Math.min(32, fontSize + 2))}>A+</Btn>
        <Btn on={() => setFontSize(Math.max(10, fontSize - 2))}>A-</Btn>
      </Bar>
      <textarea ref={ref} value={text} onChange={(e) => setText(e.target.value)} spellCheck={false} placeholder="Type here... Notepad saves plain text only (no bold, no colours)."
        className={`block h-80 w-full resize-y p-3 font-mono outline-none ${wrap ? '' : 'whitespace-pre overflow-x-auto'}`} style={{ fontSize }} wrap={wrap ? 'soft' : 'off'} />
      <div className="flex justify-between border-t border-slate-200 bg-slate-100 px-3 py-1 text-xs text-slate-600">
        <span>Lines: {lines} · Words: {words} · Characters: {text.length}</span><span>UTF-8 · Plain text</span>
      </div>
    </div>
  );
}

const FONTS = ['Arial', 'Times New Roman', 'Georgia', 'Courier New', 'Comic Sans MS', 'Verdana'];
export function WordPad() {
  const ed = useRef(null);
  const [name, setName] = useState('document.html');
  useEffect(() => { if (ed.current) ed.current.innerHTML = store.get('lab:wordpad', '<h2>My First Document</h2><p>Select text and press <b>B</b> to make it bold!</p>'); }, []);
  const save = () => store.set('lab:wordpad', ed.current?.innerHTML || '');
  const cmd = (c, v = null) => { ed.current.focus(); document.execCommand(c, false, v); save(); };
  const insertPicture = () => {
    const i = document.createElement('input'); i.type = 'file'; i.accept = 'image/*';
    i.onchange = () => { const f = i.files?.[0]; if (!f) return; const r = new FileReader(); r.onload = () => cmd('insertImage', r.result); r.readAsDataURL(f); };
    i.click();
  };
  const html = () => `<!doctype html><html><head><meta charset="utf-8"><title>${name}</title></head><body>${ed.current.innerHTML}</body></html>`;
  return (
    <div className="overflow-hidden rounded-2xl border-2 border-slate-300 bg-white text-slate-900">
      <div className="bg-indigo-700 px-3 py-1.5 text-sm font-bold text-white">📝 {name} - WordPad</div>
      <Bar>
        <Btn on={() => { if (confirm('Start a new document?')) { ed.current.innerHTML = '<p></p>'; save(); } }}>📄 New</Btn>
        <Btn on={() => openFile('.html,.htm,.txt', (t) => { ed.current.innerHTML = t.replace(/^[\s\S]*<body[^>]*>|<\/body>[\s\S]*$/gi, ''); save(); })}>📂 Open</Btn>
        <Btn on={() => { const n = prompt('File name:', name.replace(/\.html$/, '')) || 'document'; setName(`${n}.html`); downloadFile(`${n}.html`, html(), 'text/html'); }}>💾 Save</Btn>
        <Btn on={() => downloadFile(name.replace(/\.html$/, '.doc'), html(), 'application/msword')} title="Opens in MS Word">📘 Save for Word</Btn>
        <Btn on={() => window.print()}>🖨️ Print</Btn>
      </Bar>
      <Bar>
        <select onChange={(e) => cmd('fontName', e.target.value)} className="rounded-md border px-1 py-1 text-sm" defaultValue="Arial">{FONTS.map((f) => <option key={f}>{f}</option>)}</select>
        <select onChange={(e) => cmd('fontSize', e.target.value)} className="rounded-md border px-1 py-1 text-sm" defaultValue="3">
          {[['1', '8'], ['2', '10'], ['3', '12'], ['4', '14'], ['5', '18'], ['6', '24'], ['7', '36']].map(([v, t]) => <option key={v} value={v}>{t}</option>)}
        </select>
        <Btn on={() => cmd('bold')}><b>B</b></Btn>
        <Btn on={() => cmd('italic')}><i>I</i></Btn>
        <Btn on={() => cmd('underline')}><u>U</u></Btn>
        <Btn on={() => cmd('strikeThrough')}><s>S</s></Btn>
        <label className="flex items-center gap-1 rounded-md bg-white px-2 py-1 text-sm font-bold">🎨<input type="color" onChange={(e) => cmd('foreColor', e.target.value)} className="h-5 w-6" /></label>
        <label className="flex items-center gap-1 rounded-md bg-white px-2 py-1 text-sm font-bold">🖍️<input type="color" defaultValue="#fde047" onChange={(e) => cmd('hiliteColor', e.target.value)} className="h-5 w-6" /></label>
        <Btn on={() => cmd('justifyLeft')}>⬅️</Btn>
        <Btn on={() => cmd('justifyCenter')}>↔️</Btn>
        <Btn on={() => cmd('justifyRight')}>➡️</Btn>
        <Btn on={() => cmd('insertUnorderedList')}>• List</Btn>
        <Btn on={() => cmd('insertOrderedList')}>1. List</Btn>
        <Btn on={() => cmd('formatBlock', 'h2')}>Heading</Btn>
        <Btn on={() => cmd('formatBlock', 'p')}>Normal</Btn>
        <Btn on={insertPicture}>🖼️ Picture</Btn>
        <Btn on={() => cmd('undo')}>↩️</Btn>
        <Btn on={() => cmd('redo')}>↪️</Btn>
      </Bar>
      <div ref={ed} contentEditable suppressContentEditableWarning onInput={save}
        className="prose-sm h-80 overflow-y-auto p-4 outline-none [&_h2]:text-2xl [&_h2]:font-bold [&_img]:max-h-60 [&_ol]:list-decimal [&_ol]:pl-6 [&_ul]:list-disc [&_ul]:pl-6" />
    </div>
  );
}
