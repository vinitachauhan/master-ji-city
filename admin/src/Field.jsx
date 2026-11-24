import { useEffect, useState } from 'react';
import { api } from './api';

// Renders one form field from the server's field definition.
export default function Field({ name, def, value, onChange, disabled }) {
  const id = `f-${name}`;
  const common = { id, disabled: disabled || def.readOnly, className: 'input' };
  let control;
  switch (def.type) {
    case 'text':
      control = <textarea {...common} rows={name === 'notes' || name === 'answer' ? 8 : 4} value={value ?? ''} onChange={(e) => onChange(e.target.value)} maxLength={def.max} />;
      break;
    case 'number':
      control = <input {...common} type="number" value={value ?? ''} min={def.min} max={def.max} onChange={(e) => onChange(e.target.value === '' ? '' : Number(e.target.value))} />;
      break;
    case 'boolean':
      control = (
        <label className="inline-flex cursor-pointer items-center gap-3">
          <input type="checkbox" className="h-5 w-5 accent-indigo-600" checked={!!value} disabled={common.disabled} onChange={(e) => onChange(e.target.checked)} id={id} />
          <span className="text-sm text-slate-600">{value ? 'Yes' : 'No'}</span>
        </label>
      );
      break;
    case 'enum':
      control = (
        <select {...common} value={value ?? ''} onChange={(e) => onChange(e.target.value)}>
          <option value="">- Select -</option>
          {def.values.map((v) => <option key={v} value={v}>{v}</option>)}
        </select>
      );
      break;
    case 'date':
      control = <input {...common} type="date" value={value ? String(value).slice(0, 10) : ''} onChange={(e) => onChange(e.target.value)} />;
      break;
    case 'stringArray':
      control = <textarea {...common} rows={Math.min(12, Math.max(4, (value || []).length + 1))} value={(value || []).join('\n')} onChange={(e) => onChange(e.target.value.split('\n'))} />;
      break;
    case 'options4':
      control = (
        <div className="grid gap-2 sm:grid-cols-2">
          {[0, 1, 2, 3].map((i) => (
            <input key={i} className="input" disabled={common.disabled} placeholder={`Option ${'ABCD'[i]}`} value={(value || [])[i] ?? ''}
              onChange={(e) => { const v = [...(value || ['', '', '', ''])]; v[i] = e.target.value; onChange(v); }} />
          ))}
        </div>
      );
      break;
    case 'questions':
      control = <QuestionsEditor value={value || []} onChange={onChange} disabled={common.disabled} />;
      break;
    case 'ref':
      control = <RefSelect {...common} refName={def.ref} value={value ?? ''} onChange={onChange} />;
      break;
    default:
      control = <input {...common} type={def.format === 'email' ? 'email' : 'text'} value={value ?? ''} maxLength={def.max} onChange={(e) => onChange(e.target.value)} />;
  }
  return (
    <div className={['text', 'stringArray', 'questions', 'options4'].includes(def.type) ? 'sm:col-span-2' : ''}>
      <label htmlFor={id} className="label">{def.label}{def.required && <span className="text-red-600"> *</span>}</label>
      {control}
      {def.help && <p className="mt-1 text-xs text-slate-500">{def.help}</p>}
    </div>
  );
}

// Dropdown of items from another section (e.g. a school or a class teacher)
function RefSelect({ refName, value, onChange, ...rest }) {
  const [rows, setRows] = useState([]);
  useEffect(() => { api(`/r/${refName}?limit=200`).then((d) => setRows(d.rows)).catch(() => setRows([])); }, [refName]);
  return (
    <select {...rest} value={value} onChange={(e) => onChange(e.target.value)}>
      <option value="">- None -</option>
      {rows.map((r) => <option key={r.id} value={r.id}>{r.name}</option>)}
    </select>
  );
}

// MCQ editor: question, 4 options, pick the correct one
function QuestionsEditor({ value, onChange, disabled }) {
  const update = (i, patch) => onChange(value.map((q, j) => (j === i ? { ...q, ...patch } : q)));
  const move = (i, d) => { const v = [...value]; const [x] = v.splice(i, 1); v.splice(i + d, 0, x); onChange(v); };
  return (
    <div className="space-y-3">
      {value.map((q, i) => (
        <div key={i} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
          <div className="mb-2 flex items-center justify-between gap-2">
            <span className="text-sm font-bold text-slate-700">Question {i + 1}{q.tag ? <span className="ml-2 text-xs font-normal text-slate-500">({q.tag})</span> : null}</span>
            {!disabled && (
              <div className="flex gap-1">
                <button type="button" className="btn-ghost px-2 py-1" onClick={() => move(i, -1)} disabled={i === 0} aria-label="Move up">↑</button>
                <button type="button" className="btn-ghost px-2 py-1" onClick={() => move(i, 1)} disabled={i === value.length - 1} aria-label="Move down">↓</button>
                <button type="button" className="btn-ghost px-2 py-1 text-red-600" onClick={() => onChange(value.filter((_, j) => j !== i))}>Remove</button>
              </div>
            )}
          </div>
          <textarea className="input" rows={2} disabled={disabled} value={q.question} onChange={(e) => update(i, { question: e.target.value })} placeholder="Question" />
          <div className="mt-2 grid gap-2 sm:grid-cols-2">
            {[0, 1, 2, 3].map((k) => {
              const opt = q.options?.[k] ?? '';
              const isCorrect = opt !== '' && opt === q.correctAnswer;
              return (
                <div key={k} className={`flex items-center gap-2 rounded-lg border-2 bg-white px-2 ${isCorrect ? 'border-green-500' : 'border-transparent'}`}>
                  <input type="radio" name={`correct-${i}`} className="h-4 w-4 accent-green-600" disabled={disabled} checked={isCorrect}
                    onChange={() => update(i, { correctAnswer: opt })} aria-label={`Mark option ${'ABCD'[k]} correct`} />
                  <input className="w-full border-0 bg-transparent py-2 text-sm focus:outline-none" disabled={disabled} value={opt} placeholder={`Option ${'ABCD'[k]}`}
                    onChange={(e) => { const opts = [...(q.options || ['', '', '', ''])]; const wasCorrect = opts[k] === q.correctAnswer; opts[k] = e.target.value; update(i, { options: opts, ...(wasCorrect ? { correctAnswer: e.target.value } : {}) }); }} />
                </div>
              );
            })}
          </div>
          <p className="mt-1 text-xs text-slate-500">Select the circle next to the correct answer.</p>
        </div>
      ))}
      {!disabled && <button type="button" className="btn-ghost" onClick={() => onChange([...value, { question: '', options: ['', '', '', ''], correctAnswer: '' }])}>+ Add question</button>}
    </div>
  );
}
