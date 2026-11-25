'use client';
// Typing Tutor (speed + accuracy) and HTML / CSS / JavaScript Playground (live preview in a sandbox).
import { useEffect, useRef, useState } from 'react';
import { store, downloadFile } from './TextApps';

export const TYPING_LESSONS = {
  'Home row (a s d f j k l ;)': ['asdf jkl;', 'aa ss dd ff jj kk ll', 'dad sad fad lad', 'ask a lad; a sad dad'],
  'Letters A to Z': ['abcdefghijklmnopqrstuvwxyz', 'the quick brown fox jumps over the lazy dog'],
  'Small words': ['cat bat rat hat mat', 'sun fun run bun gun', 'cow hen dog pig goat'],
  Sentences: ['India is my country.', 'I go to school every day.', 'Save water, save life.', 'The farmer grows wheat in the field.'],
  Paragraph: ['Computers help us in study, banking, hospitals and farming. We should use them safely and never share our passwords or OTP with anyone.'],
  Numbers: ['1234567890', '25 + 17 = 42', 'Roll No. 15, Class 6, Section B'],
};

export function TypingTutor({ startLesson = 'Home row (a s d f j k l ;)' }) {
  const [lesson, setLesson] = useState(startLesson);
  const [idx, setIdx] = useState(0);
  const [typed, setTyped] = useState('');
  const [startAt, setStartAt] = useState(0);
  const [best, setBest] = useState(0);
  const ref = useRef(null);
  useEffect(() => { setBest(Number(store.get('lab:typingBest', '0')) || 0); }, []);
  useEffect(() => { setLesson(startLesson); }, [startLesson]);
  useEffect(() => { setIdx(0); setTyped(''); setStartAt(0); }, [lesson]);
  const target = TYPING_LESSONS[lesson][idx % TYPING_LESSONS[lesson].length];
  const correct = [...typed].filter((ch, i) => ch === target[i]).length;
  const accuracy = typed.length ? Math.round((correct / typed.length) * 100) : 100;
  const minutes = startAt ? (Date.now() - startAt) / 60000 : 0;
  const wpm = minutes > 0 ? Math.round(correct / 5 / minutes) : 0;
  const done = typed.length >= target.length;
  const onType = (v) => {
    if (!startAt) setStartAt(Date.now());
    setTyped(v.slice(0, target.length));
    if (v.length >= target.length && wpm > best) { setBest(wpm); store.set('lab:typingBest', String(wpm)); }
  };
  return (
    <div className="rounded-2xl border-2 border-slate-300 bg-white p-4 text-slate-900">
      <p className="font-bold">⌨️ Typing Tutor</p>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {Object.keys(TYPING_LESSONS).map((k) => <button key={k} onClick={() => setLesson(k)} className={`rounded-full px-3 py-1 text-sm font-bold ${lesson === k ? 'bg-amber-500 text-white' : 'bg-amber-100'}`}>{k}</button>)}
      </div>
      <p className="mt-3 rounded-xl bg-slate-900 p-4 font-mono text-xl leading-relaxed tracking-wide sm:text-2xl" onClick={() => ref.current?.focus()}>
        {[...target].map((ch, i) => (
          <span key={i} className={i < typed.length ? (typed[i] === ch ? 'text-green-400' : 'rounded bg-red-500 text-white') : i === typed.length ? 'border-b-2 border-amber-400 text-white' : 'text-slate-400'}>{ch}</span>
        ))}
      </p>
      <input ref={ref} value={typed} onChange={(e) => onType(e.target.value)} autoCapitalize="off" autoCorrect="off" spellCheck={false}
        placeholder="Click here and start typing the text above..." className="mt-3 w-full rounded-xl border-2 border-amber-300 px-3 py-2 font-mono text-lg outline-none focus:border-amber-500" />
      <div className="mt-3 flex flex-wrap items-center gap-3 text-sm font-bold">
        <span className="rounded-full bg-green-100 px-3 py-1">🎯 Accuracy {accuracy}%</span>
        <span className="rounded-full bg-sky-100 px-3 py-1">⚡ Speed {wpm} WPM</span>
        <span className="rounded-full bg-amber-100 px-3 py-1">🏆 Best {best} WPM</span>
        {done && <button onClick={() => { setIdx(idx + 1); setTyped(''); setStartAt(0); }} className="rounded-full bg-amber-500 px-4 py-1 text-white">Next ➡️</button>}
        <button onClick={() => { setTyped(''); setStartAt(0); }} className="rounded-full bg-slate-200 px-3 py-1">🔄 Restart</button>
      </div>
      <p className="mt-2 text-xs text-slate-500">Tip: keep your fingers on the home row - left hand on A S D F, right hand on J K L ;. The bumps on F and J help you find them without looking.</p>
    </div>
  );
}

export const CODE_TEMPLATES = {
  'My first page': '<h1>Hello, I am a coder!</h1>\n<p>My name is <b>Ravi</b> and I study in Class 6.</p>\n<p style=\"font-size:48px\">🇮🇳</p>',
  'Colours and style (CSS)': '<style>\n  body { background: #fef9c3; font-family: sans-serif; }\n  h1 { color: #2563eb; text-align: center; }\n  .card { background: white; padding: 16px; border-radius: 12px; }\n</style>\n<h1>My City</h1>\n<div class="card">Noida has metro trains, parks and schools.</div>',
  'Lists and table': '<h2>My Timetable</h2>\n<table border="1" cellpadding="6">\n  <tr><th>Day</th><th>Subject</th></tr>\n  <tr><td>Monday</td><td>Maths</td></tr>\n  <tr><td>Tuesday</td><td>Science</td></tr>\n</table>\n<h3>Fruits I like</h3>\n<ul><li>Mango</li><li>Banana</li></ul>',
  'Button and JavaScript': '<h2>Click counter</h2>\n<button onclick="add()">Click me!</button>\n<p id="out">Clicks: 0</p>\n<script>\n  let n = 0;\n  function add() { n++; document.getElementById("out").textContent = "Clicks: " + n; }\n</script>',
  'Simple calculator': '<input id="a" type="number" value="5"> +\n<input id="b" type="number" value="7">\n<button onclick="calc()">=</button>\n<b id="r"></b>\n<script>\n  function calc() {\n    const a = Number(document.getElementById("a").value);\n    const b = Number(document.getElementById("b").value);\n    document.getElementById("r").textContent = a + b;\n  }\n</script>',
  'Times table (loop)': '<h2>Table of 7</h2>\n<div id="t"></div>\n<script>\n  let html = "";\n  for (let i = 1; i <= 10; i++) html += "7 × " + i + " = " + (7 * i) + "<br>";\n  document.getElementById("t").innerHTML = html;\n</script>',
  // React in the browser: React + ReactDOM + Babel (for JSX) load from a CDN (needs internet)
  'React counter': '<div id="root"></div>\n<script src="https://unpkg.com/react@18.3.1/umd/react.development.js"></script>\n<script src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.development.js"></script>\n<script src="https://unpkg.com/@babel/standalone@7.24.7/babel.min.js"></script>\n<script type="text/babel">\n  function Counter() {\n    const [count, setCount] = React.useState(0);\n    return (\n      <div style={{ fontFamily: "sans-serif" }}>\n        <h2>React Counter</h2>\n        <p>Count: {count}</p>\n        <button onClick={() => setCount(count + 1)}>+1</button>\n        <button onClick={() => setCount(0)}>Reset</button>\n      </div>\n    );\n  }\n  ReactDOM.createRoot(document.getElementById("root")).render(<Counter />);\n</script>',
  'React to-do list': '<div id="root"></div>\n<script src="https://unpkg.com/react@18.3.1/umd/react.development.js"></script>\n<script src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.development.js"></script>\n<script src="https://unpkg.com/@babel/standalone@7.24.7/babel.min.js"></script>\n<script type="text/babel">\n  function Todo() {\n    const [task, setTask] = React.useState("");\n    const [list, setList] = React.useState(["Learn JSX", "Learn useState"]);\n    const add = () => { if (task) { setList([...list, task]); setTask(""); } };\n    return (\n      <div style={{ fontFamily: "sans-serif" }}>\n        <h2>My To-Do List</h2>\n        <input value={task} onChange={(e) => setTask(e.target.value)} placeholder="New task" />\n        <button onClick={add}>Add</button>\n        <ul>{list.map((t, i) => (\n          <li key={i}>{t} <button onClick={() => setList(list.filter((_, j) => j !== i))}>❌</button></li>\n        ))}</ul>\n      </div>\n    );\n  }\n  ReactDOM.createRoot(document.getElementById("root")).render(<Todo />);\n</script>',
};

export function CodePlayground({ startTemplate = 'My first page' }) {
  const [code, setCode] = useState('');
  const [shown, setShown] = useState('');
  useEffect(() => { const saved = store.get('lab:code'); const c = saved || CODE_TEMPLATES[startTemplate]; setCode(c); setShown(c); }, [startTemplate]);
  useEffect(() => { store.set('lab:code', code); }, [code]);
  const load = (k) => { setCode(CODE_TEMPLATES[k]); setShown(CODE_TEMPLATES[k]); };
  return (
    <div className="rounded-2xl border-2 border-slate-300 bg-white p-3 text-slate-900">
      <p className="font-bold">🌐 HTML · CSS · JavaScript Playground</p>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {Object.keys(CODE_TEMPLATES).map((k) => <button key={k} onClick={() => load(k)} className="rounded-full bg-violet-100 px-3 py-1 text-sm font-bold hover:bg-violet-200">{k}</button>)}
      </div>
      <div className="mt-3 grid gap-3 lg:grid-cols-2">
        <div>
          <textarea value={code} onChange={(e) => setCode(e.target.value)} spellCheck={false}
            onKeyDown={(e) => { if (e.key === 'Tab') { e.preventDefault(); const t = e.target; const s = t.selectionStart; setCode(code.slice(0, s) + '  ' + code.slice(t.selectionEnd)); requestAnimationFrame(() => { t.selectionStart = t.selectionEnd = s + 2; }); } }}
            className="h-72 w-full rounded-xl bg-slate-900 p-3 font-mono text-sm text-green-300 outline-none" />
          <div className="mt-2 flex gap-2">
            <button onClick={() => setShown(code)} className="rounded-lg bg-violet-600 px-4 py-2 font-bold text-white">▶️ Run</button>
            <button onClick={() => downloadFile('my-page.html', `<!doctype html><html><head><meta charset="utf-8"></head><body>\n${code}\n</body></html>`, 'text/html')} className="rounded-lg bg-slate-200 px-4 py-2 font-bold">💾 Save .html</button>
          </div>
        </div>
        {/* sandbox without allow-same-origin: the code cannot touch this website, cookies or storage */}
        <iframe title="Output" sandbox="allow-scripts allow-modals" srcDoc={`<!doctype html><html><head><meta charset="utf-8"></head><body>${shown}</body></html>`} className="h-80 w-full rounded-xl border-2 border-slate-200 bg-white" />
      </div>
    </div>
  );
}
