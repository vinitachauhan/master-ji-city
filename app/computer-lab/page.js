'use client';
// Computer Lab - children learn by doing: Paint, Notepad, WordPad, Excel, Typing and Coding, with tasks for every level.
import { useEffect, useState } from 'react';
import Link from 'next/link';
import PaintPad from '@/components/lab/PaintPad';
import { Notepad, WordPad, store } from '@/components/lab/TextApps';
import MiniExcel from '@/components/lab/MiniExcel';
import { TypingTutor, CodePlayground } from '@/components/lab/CodeAndTyping';

const TOOLS = [
  ['paint', '🎨', 'Paint'], ['notepad', '🗒️', 'Notepad'], ['wordpad', '📝', 'WordPad'],
  ['excel', '📊', 'Excel'], ['typing', '⌨️', 'Typing'], ['code', '🌐', 'HTML & JS'],
];

// [tool, task]
const LEVELS = {
  'Play School': [['paint', 'Draw a big sun with the Circle tool and fill it yellow with the Bucket 🪣.'], ['paint', 'Draw 3 balloons of different colours.'], ['typing', 'Find and press the letters a, s, d, f on the keyboard.'], ['paint', 'Make dots with the Brush to draw rain.']],
  Nursery: [['paint', 'Draw a house: a square and a triangle roof. Fill colours.'], ['paint', 'Draw a tree with the Brush and save it with 💾 Save PNG.'], ['typing', 'Type your first name.'], ['notepad', 'Type the letters A to Z in Notepad.']],
  KG: [['paint', 'Draw a rainbow with 7 curved lines.'], ['typing', 'Do the "Small words" lesson: cat, bat, rat...'], ['notepad', 'Type the names of 5 fruits, one on each line (press Enter).'], ['paint', 'Use the Text tool 🔤 to write your name on a drawing.']],
  'Class 1-2': [['paint', 'Draw your school with the Rectangle and Circle tools.'], ['notepad', 'Type 5 sentences about yourself and Save as "me.txt".'], ['typing', 'Finish the "Letters A to Z" lesson with 90% accuracy.'], ['wordpad', 'Type "My Family" and make the heading Bold and Red.'], ['paint', 'Draw the Indian flag and fill the colours.']],
  'Class 3-5': [['wordpad', 'Write a leave application. Centre the heading, use Bold and a List.'], ['wordpad', 'Insert a picture 🖼️ and write 3 lines about it.'], ['excel', 'Make a table of 5 friends’ names and their marks.'], ['excel', 'Use =SUM(B2:B6) to find the total marks.'], ['notepad', 'Use 🕒 Time/Date to write a diary entry.'], ['typing', 'Reach 15 WPM in the "Sentences" lesson.']],
  'Class 6-8': [['excel', 'Make a marksheet: Total with =B2+C2 and Average with =AVERAGE().'], ['excel', 'Use =IF(D2>=100,1,0) to mark pass (1) or fail (0); sort by Total.'], ['excel', 'Make a 📈 chart of the marks column.'], ['wordpad', 'Make a poster: big heading, colours, highlight and a picture. Save for Word.'], ['code', 'Run "My first page" and change the name to yours.'], ['code', 'Change the CSS colours in "Colours and style".'], ['typing', 'Reach 25 WPM in the "Paragraph" lesson.']],
  'Class 9-12': [['excel', 'Make a monthly family budget: income, expenses, =SUM, savings = income - expenses.'], ['excel', 'Open a CSV file, sort it and save it again.'], ['code', 'Build a page with a table of your timetable.'], ['code', 'Change the calculator to also subtract, multiply and divide.'], ['code', 'Use a loop to print the table of any number typed by the user.'], ['wordpad', 'Write a formal letter with proper format and save it for Word.'], ['typing', 'Reach 35 WPM with 95% accuracy.']],
  College: [['excel', 'Make a GST bill: Item, Qty, Rate, Amount = Qty × Rate, GST = 18% of total.'], ['excel', 'Make a salary sheet with Basic, HRA (=B2*0.2) and Total; chart the totals.'], ['code', 'Make your own resume web page with CSS styles and save it as .html.'], ['code', 'Make a JavaScript quiz with 3 questions and a score.'], ['wordpad', 'Write your resume (bio-data) with headings and lists.'], ['notepad', 'Write HTML in Notepad, save it as page.html and open it in a browser.'], ['typing', 'Reach 40 WPM - needed for data entry and government typing tests.']],
};

const COURSES = [
  ['Computer subject (Play School - Class 12)', '/study-1-8', 'Chapter notes, examples and 10-question tests'],
  ['DCA - Diploma in Computer Applications', '/college-study?course=Computer%20Courses', 'Windows, Notepad, WordPad, Word, Excel, PowerPoint, Internet'],
  ['Tally Prime with GST', '/college-study?course=Computer%20Courses', 'Accounting software for shops and offices'],
  ['Web Design', '/college-study?course=Computer%20Courses', 'HTML, CSS, JavaScript - practise in the HTML & JS tab'],
  ['Python Programming', '/college-study?course=Computer%20Courses', 'Coding for Class 9 to college'],
  ['Drawing subject', '/study-1-8', 'Play School to Class 8 - draw here in Paint'],
];

export default function ComputerLab() {
  const [tool, setTool] = useState('paint');
  const [level, setLevel] = useState('Play School');
  const [done, setDone] = useState({});

  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    if (TOOLS.some(([k]) => k === q.get('tool'))) setTool(q.get('tool'));
    if (LEVELS[q.get('level')]) setLevel(q.get('level'));
    try { setDone(JSON.parse(store.get('lab:done', '{}'))); } catch { /* ignore */ }
  }, []);
  const toggle = (key) => { const next = { ...done, [key]: !done[key] }; setDone(next); store.set('lab:done', JSON.stringify(next)); };
  const tasks = LEVELS[level];
  const finished = tasks.filter((_, i) => done[`${level}|${i}`]).length;

  return (
    <main className="min-h-screen bg-gradient-to-b from-violet-200 via-sky-100 to-green-100">
      <div className="mx-auto max-w-6xl px-4 py-6">
        <Link href="/" className="font-bold text-violet-700">← Home</Link>
        <h1 className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-5xl">🖥️ Computer Lab - Learn by Doing</h1>
        <p className="text-lg font-semibold text-violet-700">Paint · Notepad · WordPad · Excel · Typing · Coding - Play School to College. Everything works right here, no software needed.</p>

        {/* Level and tasks */}
        <section className="mt-5 rounded-3xl border-2 border-white bg-white/80 p-4 shadow-sm">
          <h2 className="text-lg font-extrabold">1️⃣ Choose your level</h2>
          <div className="mt-2 flex flex-wrap gap-2">
            {Object.keys(LEVELS).map((l) => (
              <button key={l} onClick={() => setLevel(l)} className={`rounded-full px-4 py-2 font-bold ${level === l ? 'bg-violet-600 text-white' : 'bg-violet-100 hover:bg-violet-200'}`}>{l}</button>
            ))}
          </div>
          <h2 className="mt-4 text-lg font-extrabold">2️⃣ Do these tasks yourself ({finished}/{tasks.length} done {finished === tasks.length ? '🏆' : ''})</h2>
          <ul className="mt-2 grid gap-2 sm:grid-cols-2">
            {tasks.map(([t, text], i) => {
              const key = `${level}|${i}`; const tl = TOOLS.find(([k]) => k === t);
              return (
                <li key={key} className={`flex items-start gap-2 rounded-xl border p-3 ${done[key] ? 'border-green-300 bg-green-50' : 'border-slate-200 bg-white'}`}>
                  <input type="checkbox" checked={!!done[key]} onChange={() => toggle(key)} className="mt-1 h-5 w-5 accent-green-600" aria-label="Task done" />
                  <div className="flex-1">
                    <p className={done[key] ? 'text-slate-500 line-through' : ''}>{text}</p>
                    <button onClick={() => { setTool(t); document.getElementById('lab-tool')?.scrollIntoView({ behavior: 'smooth' }); }} className="mt-1 rounded-full bg-sky-100 px-3 py-0.5 text-sm font-bold text-sky-800 hover:bg-sky-200">{tl[1]} Open {tl[2]}</button>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>

        {/* Tool */}
        <section id="lab-tool" className="mt-5">
          <h2 className="text-lg font-extrabold">3️⃣ Practise</h2>
          <div className="no-scrollbar mt-2 flex gap-2 overflow-x-auto pb-1">
            {TOOLS.map(([k, e, t]) => (
              <button key={k} onClick={() => setTool(k)} className={`shrink-0 rounded-2xl px-4 py-2 text-lg font-extrabold shadow-sm ${tool === k ? 'bg-slate-900 text-white' : 'bg-white hover:bg-slate-100'}`}>{e} {t}</button>
            ))}
          </div>
          <div className="mt-3">
            {tool === 'paint' && <PaintPad />}
            {tool === 'notepad' && <Notepad />}
            {tool === 'wordpad' && <WordPad />}
            {tool === 'excel' && <MiniExcel />}
            {tool === 'typing' && <TypingTutor startLesson={['Play School', 'Nursery'].includes(level) ? 'Home row (a s d f j k l ;)' : level === 'KG' ? 'Small words' : level === 'Class 1-2' ? 'Letters A to Z' : level === 'Class 3-5' ? 'Sentences' : 'Paragraph'} />}
            {tool === 'code' && <CodePlayground />}
          </div>
          <p className="mt-2 text-sm text-slate-600">💾 Your work is kept in this browser automatically. Use Save to download it as a real file (.png, .txt, .html, .doc, .csv) - it opens in MS Paint, Notepad, Word and Excel too.</p>
        </section>

        {/* Other computer courses */}
        <section className="mt-6">
          <h2 className="text-lg font-extrabold">📚 More computer courses</h2>
          <div className="mt-2 grid gap-3 sm:grid-cols-3">
            {COURSES.map(([t, href, s]) => (
              <Link key={t} href={href} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-violet-400">
                <p className="font-extrabold">{t}</p><p className="text-sm text-slate-600">{s}</p>
              </Link>
            ))}
          </div>
          <p className="mt-3 text-sm text-slate-600">Free extra practice: Scratch (scratch.mit.edu) for block coding, and the free courses on DIKSHA and SWAYAM.</p>
        </section>
      </div>
    </main>
  );
}
