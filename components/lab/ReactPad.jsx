'use client';
// React Playground - write a component called App and run it live.
// React, ReactDOM and Babel (for JSX) load from a CDN inside a sandboxed frame (no access to this website).
import { useEffect, useState } from 'react';
import { store, downloadFile } from './TextApps';

const CDN = [
  'https://unpkg.com/react@18.3.1/umd/react.development.js',
  'https://unpkg.com/react-dom@18.3.1/umd/react-dom.development.js',
  'https://unpkg.com/@babel/standalone@7.24.7/babel.min.js',
];
const HOOKS = 'const { useState, useEffect, useRef, useMemo, useCallback, useReducer, useContext, createContext, Fragment } = React;';

export const REACT_STARTER = 'function App() {\n  const [count, setCount] = useState(0);\n  return (\n    <div style={{ fontFamily: "sans-serif" }}>\n      <h2>Hello React ⚛️</h2>\n      <button onClick={() => setCount(count + 1)}>Clicked {count} times</button>\n    </div>\n  );\n}';

// Build the page that runs the code. import / export lines are removed (React and hooks are already available).
export function reactDoc(code) {
  const clean = code.replace(/^\s*import\s.*$/gm, '').replace(/export\s+default\s+/g, '');
  const render = /createRoot\s*\(/.test(clean) ? '' : '\nReactDOM.createRoot(document.getElementById("root")).render(<App />);';
  const src = JSON.stringify(`${HOOKS}\n${clean}${render}`).replace(/<\//g, '<\\/');
  return `<!doctype html><html><head><meta charset="utf-8"><style>body{font-family:sans-serif;margin:12px}</style></head><body>
<pre id="err" style="color:#dc2626;white-space:pre-wrap;font:13px monospace;margin:0"></pre><div id="root"></div>
<script>window.onerror=function(m){document.getElementById('err').textContent='❌ '+m;};</script>
${CDN.map((u) => `<script src="${u}"></script>`).join('\n')}
<script>
if (!window.React || !window.Babel) { document.getElementById('err').textContent = '❌ Could not load React. Check your internet connection.'; }
else { try { var out = Babel.transform(${src}, { presets: ['react'] }).code; var s = document.createElement('script'); s.textContent = out; document.body.appendChild(s); }
catch (e) { document.getElementById('err').textContent = '❌ ' + e.message; } }
</script></body></html>`;
}

// initialCode: a lesson's example. storageKey: where the learner's edits are kept (per lesson).
export default function ReactPad({ initialCode, storageKey = 'lab:react', compact = false }) {
  const [code, setCode] = useState('');
  const [doc, setDoc] = useState('');
  useEffect(() => {
    const saved = store.get(storageKey);
    const c = saved || initialCode || REACT_STARTER;
    setCode(c); setDoc(reactDoc(c));
  }, [initialCode, storageKey]);
  const change = (v) => { setCode(v); store.set(storageKey, v); };
  const reset = () => { const c = initialCode || REACT_STARTER; change(c); setDoc(reactDoc(c)); };

  return (
    <div className="rounded-2xl border-2 border-slate-300 bg-white p-3 text-slate-900">
      {!compact && <p className="font-bold">⚛️ React Playground <span className="text-sm font-normal text-slate-500">- write a component called App and press Run</span></p>}
      <div className="mt-2 grid gap-3 lg:grid-cols-2">
        <div>
          <textarea value={code} onChange={(e) => change(e.target.value)} spellCheck={false}
            onKeyDown={(e) => {
              if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') { e.preventDefault(); setDoc(reactDoc(code)); }
              if (e.key === 'Tab') { e.preventDefault(); const t = e.target; const s = t.selectionStart; change(code.slice(0, s) + '  ' + code.slice(t.selectionEnd)); requestAnimationFrame(() => { t.selectionStart = t.selectionEnd = s + 2; }); }
            }}
            className="h-80 w-full rounded-xl bg-slate-900 p-3 font-mono text-sm text-sky-200 outline-none" />
          <div className="mt-2 flex flex-wrap gap-2">
            <button onClick={() => setDoc(reactDoc(code))} className="rounded-lg bg-sky-500 px-4 py-2 font-bold text-white">▶️ Run <span className="text-xs font-normal">(Ctrl+Enter)</span></button>
            <button onClick={reset} className="rounded-lg bg-slate-200 px-4 py-2 font-bold">↩️ Reset example</button>
            <button onClick={() => downloadFile('App.jsx', code)} className="rounded-lg bg-slate-200 px-4 py-2 font-bold">💾 Save App.jsx</button>
          </div>
        </div>
        {/* no allow-same-origin: the code cannot read this website, its cookies or storage */}
        <iframe title="React output" sandbox="allow-scripts allow-modals" srcDoc={doc} className="h-96 w-full rounded-xl border-2 border-slate-200 bg-white" />
      </div>
      <p className="mt-2 text-xs text-slate-500">useState, useEffect, useRef, useMemo, useCallback, useReducer, useContext and createContext are ready to use. import lines are ignored here. Needs internet the first time.</p>
    </div>
  );
}
