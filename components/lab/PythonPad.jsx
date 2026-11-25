'use client';
// Python Playground - runs real Python in the browser (Pyodide). Loaded only when this tab is opened (~10 MB, first time).
import { useEffect, useRef, useState } from 'react';
import { store, downloadFile } from './TextApps';

const PYODIDE_URL = 'https://cdn.jsdelivr.net/pyodide/v0.26.2/full/';

export const PY_TEMPLATES = {
  'Hello': 'print("Namaste India!")\nprint("My name is Ravi")\nprint(5 + 7)',
  'Input and sum': 'a = int(input("First number: "))\nb = int(input("Second number: "))\nprint("Sum =", a + b)',
  'Grade calculator': 'marks = int(input("Enter marks: "))\nif marks >= 90:\n    print("Grade A")\nelif marks >= 60:\n    print("Grade B")\nelif marks >= 33:\n    print("Pass")\nelse:\n    print("Fail")',
  'Times table': 'n = int(input("Table of: "))\nfor i in range(1, 11):\n    print(n, "x", i, "=", n * i)',
  'List and topper': 'marks = {"Ravi": 78, "Sita": 92, "Aman": 65}\nfor name, m in marks.items():\n    print(name, m)\ntopper = max(marks, key=marks.get)\nprint("Topper:", topper)\nprint("Average:", sum(marks.values()) / len(marks))',
  'Guessing game': 'import random\nsecret = random.randint(1, 10)\nfor chance in range(3):\n    guess = int(input("Guess 1-10: "))\n    if guess == secret:\n        print("Correct! 🎉")\n        break\n    print("Bigger" if guess < secret else "Smaller")\nelse:\n    print("The number was", secret)',
};

let pyodidePromise = null;
function loadPyodideOnce() {
  if (pyodidePromise) return pyodidePromise;
  pyodidePromise = new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = `${PYODIDE_URL}pyodide.js`;
    s.onload = () => window.loadPyodide({ indexURL: PYODIDE_URL }).then(resolve, reject);
    s.onerror = () => { pyodidePromise = null; reject(new Error('Could not load Python. Check your internet connection.')); };
    document.head.appendChild(s);
  });
  return pyodidePromise;
}

export default function PythonPad() {
  const [code, setCode] = useState('');
  const [out, setOut] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | ready | running | error
  const py = useRef(null);
  useEffect(() => { setCode(store.get('lab:python') || PY_TEMPLATES.Hello); }, []);
  useEffect(() => { if (code) store.set('lab:python', code); }, [code]);

  const run = async () => {
    setOut('');
    try {
      if (!py.current) { setStatus('loading'); py.current = await loadPyodideOnce(); }
      setStatus('running');
      let text = '';
      const write = (s) => { text += s + '\n'; setOut(text); };
      py.current.setStdout({ batched: write });
      py.current.setStderr({ batched: write });
      // input(): ask with a pop-up box and show it in the output like a real console
      py.current.setStdin({ stdin: () => { const v = window.prompt('Python input():') ?? ''; text += `> ${v}\n`; setOut(text); return v; } });
      await py.current.runPythonAsync(code);
      setStatus('ready');
    } catch (e) {
      const msg = String(e.message || e).split('\n').filter((l) => !l.includes('pyodide') && !l.startsWith('  File "/lib')).join('\n');
      setOut((o) => `${o}${msg}`);
      setStatus(py.current ? 'ready' : 'error');
    }
  };

  return (
    <div className="rounded-2xl border-2 border-slate-300 bg-white p-3 text-slate-900">
      <p className="font-bold">🐍 Python Playground <span className="text-sm font-normal text-slate-500">- real Python 3 runs in your browser</span></p>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {Object.keys(PY_TEMPLATES).map((k) => <button key={k} onClick={() => setCode(PY_TEMPLATES[k])} className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-bold hover:bg-yellow-200">{k}</button>)}
      </div>
      <div className="mt-3 grid gap-3 lg:grid-cols-2">
        <div>
          <textarea value={code} onChange={(e) => setCode(e.target.value)} spellCheck={false}
            onKeyDown={(e) => { if (e.key === 'Tab') { e.preventDefault(); const t = e.target; const s = t.selectionStart; setCode(code.slice(0, s) + '    ' + code.slice(t.selectionEnd)); requestAnimationFrame(() => { t.selectionStart = t.selectionEnd = s + 4; }); } }}
            className="h-72 w-full rounded-xl bg-slate-900 p-3 font-mono text-sm text-yellow-200 outline-none" />
          <div className="mt-2 flex flex-wrap gap-2">
            <button onClick={run} disabled={status === 'loading' || status === 'running'} className="rounded-lg bg-yellow-500 px-4 py-2 font-bold text-slate-900 disabled:opacity-60">
              {status === 'loading' ? '⏳ Loading Python (first time ~10 MB)...' : status === 'running' ? '⏳ Running...' : '▶️ Run'}
            </button>
            <button onClick={() => downloadFile('program.py', code)} className="rounded-lg bg-slate-200 px-4 py-2 font-bold">💾 Save .py</button>
          </div>
        </div>
        <pre className="h-80 overflow-auto whitespace-pre-wrap rounded-xl bg-black p-3 font-mono text-sm text-green-400">{out || 'Output will appear here. Click ▶️ Run.'}</pre>
      </div>
      <p className="mt-2 text-xs text-slate-500">Tip: use 4 spaces (or Tab) for indentation. input() opens a small box to type your answer.</p>
    </div>
  );
}
