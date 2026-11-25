'use client';
import { useEffect, useState } from 'react';

// Chapter test - one question at a time. Answer → see right / wrong → Next. Summary at the end.
// theme: 'kid' (Play School - Class 8) | 'study' (Class 9 - 12)
export default function Quiz({ questions, onCorrect, onFinish, theme = 'study', resetKey }) {
  const [current, setCurrent] = useState(0);
  const [picked, setPicked] = useState({});
  const [finished, setFinished] = useState(false);
  const restart = () => { setCurrent(0); setPicked({}); setFinished(false); };
  useEffect(restart, [resetKey]);

  const kid = theme === 'kid';
  const total = questions.length;
  const score = questions.filter((q, i) => picked[i] === q.correctAnswer).length;
  if (!total) return null;

  const choose = (opt) => {
    if (picked[current] !== undefined) return;
    setPicked((p) => ({ ...p, [current]: opt }));
    if (opt === questions[current].correctAnswer) onCorrect?.();
  };
  const next = () => {
    if (current + 1 < total) return setCurrent((c) => c + 1);
    setFinished(true); onFinish?.(score, total);
  };

  // ---------- Summary ----------
  if (finished) {
    return (
      <div className="space-y-4">
        <div className={`rounded-3xl p-6 text-center ${kid ? 'bg-pink-100' : 'bg-gradient-to-r from-blue-600 to-green-600 text-white'}`}>
          <div className="text-5xl">{score === total ? '🏆' : score >= total * 0.6 ? '🎉' : '💪'}</div>
          <div className="mt-2 text-5xl font-black tabular-nums">{score} / {total}</div>
          <div className="mt-1 text-lg font-semibold">
            {score === total ? 'Amazing! All correct!' : score >= total * 0.6 ? 'Very good! A little more practice.' : 'No problem - read the notes again and try once more.'}
          </div>
          {kid && <div className="mt-1 text-lg font-bold text-pink-700">+{score} ⭐ stars</div>}
          <button onClick={restart} className={`mt-4 rounded-2xl px-6 py-3 text-lg font-bold ${kid ? 'bg-pink-500 text-white' : 'bg-white text-blue-700'}`}>🔁 Retake Test</button>
        </div>
        <ol className="space-y-2">
          {questions.map((q, i) => {
            const ok = picked[i] === q.correctAnswer;
            return (
              <li key={i} className={`rounded-xl border-l-4 p-3 ${ok ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'}`}>
                <p className="font-semibold">{ok ? '✅' : '❌'} {i + 1}. {q.question}</p>
                {!ok && <p className="text-sm">Your answer: {picked[i] ?? '-'} · Correct: <b className="text-green-700">{q.correctAnswer}</b></p>}
              </li>
            );
          })}
        </ol>
      </div>
    );
  }

  // ---------- One question ----------
  const q = questions[current];
  const chosen = picked[current];
  const answered = chosen !== undefined;
  const isRight = chosen === q.correctAnswer;
  const picture = q.question.match(/^(\p{Extended_Pictographic}[\p{Extended_Pictographic}‍️]*)\s+(.*)$/u);

  return (
    <div className={kid ? 'rounded-3xl border-4 border-sky-200 bg-white p-4 sm:p-5' : 'rounded-2xl border border-slate-200 bg-white p-4 sm:p-5'}>
      {/* progress */}
      <div className="flex items-center justify-between gap-3 text-sm font-bold text-slate-600">
        <span>Question {current + 1} of {total}</span>
        <span className="tabular-nums">✅ {score}</span>
      </div>
      <div className="mt-2 flex gap-1" aria-hidden="true">
        {questions.map((qq, i) => (
          <span key={i} className={`h-2 flex-1 rounded-full ${i < current || (i === current && answered)
            ? (picked[i] === qq.correctAnswer ? 'bg-green-500' : 'bg-red-400')
            : i === current ? (kid ? 'bg-pink-300' : 'bg-blue-300') : 'bg-slate-200'}`} />
        ))}
      </div>

      {/* question */}
      <div className="mt-4">
        {q.tag && <span className="mb-2 inline-block rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-500">{q.tag}</span>}
        {picture ? (
          <div className="text-center">
            <div className="text-8xl leading-none" aria-hidden="true">{picture[1]}</div>
            <p className={`mt-3 ${kid ? 'text-2xl font-extrabold' : 'text-lg font-bold'}`}>{picture[2]}</p>
          </div>
        ) : (
          <p className={`whitespace-pre-line ${kid ? 'text-xl font-bold sm:text-2xl' : 'text-lg font-semibold'}`}>{q.question}</p>
        )}
      </div>

      {/* options */}
      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        {q.options.map((opt) => {
          const correctOpt = opt === q.correctAnswer;
          let cls = kid ? 'bg-yellow-50 border-yellow-300 hover:bg-yellow-100' : 'bg-slate-50 border-slate-200 hover:bg-blue-50';
          if (answered) {
            if (correctOpt) cls = 'bg-green-100 border-green-500 text-green-900';
            else if (opt === chosen) cls = 'bg-red-100 border-red-500 text-red-900';
            else cls = 'bg-slate-50 border-slate-200 opacity-60';
          }
          return (
            <button key={opt} onClick={() => choose(opt)} disabled={answered}
              className={`rounded-xl border-2 px-4 py-3 text-left ${kid ? 'text-lg font-semibold' : ''} ${cls}`}>
              {answered && correctOpt && '✅ '}{answered && opt === chosen && !correctOpt && '❌ '}{opt}
            </button>
          );
        })}
      </div>

      {/* feedback + next */}
      {answered && (
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <p className={`text-lg font-bold ${isRight ? 'text-green-600' : 'text-red-600'}`}>
            {isRight ? (kid ? 'Correct! +1 ⭐ Star' : 'Correct! ✔') : `Wrong. Correct answer: ${q.correctAnswer}`}
          </p>
          <button onClick={next} autoFocus
            className={`rounded-2xl px-6 py-3 text-lg font-extrabold text-white ${kid ? 'bg-pink-500 hover:bg-pink-600' : 'bg-blue-600 hover:bg-blue-700'}`}>
            {current + 1 < total ? 'Next →' : 'See Result 🏁'}
          </button>
        </div>
      )}
    </div>
  );
}
