import { createContext, useCallback, useContext, useEffect, useState } from 'react';

// ---------- toasts ----------
const ToastCtx = createContext(() => {});
export function ToastProvider({ children }) {
  const [items, setItems] = useState([]);
  const push = useCallback((message, type = 'success') => {
    const id = Math.random();
    setItems((t) => [...t, { id, message, type }]);
    setTimeout(() => setItems((t) => t.filter((x) => x.id !== id)), 4000);
  }, []);
  return (
    <ToastCtx.Provider value={push}>
      {children}
      <div className="fixed bottom-4 right-4 z-[60] flex w-[calc(100%-2rem)] max-w-sm flex-col gap-2" aria-live="polite">
        {items.map((t) => (
          <div key={t.id} className={`rounded-xl px-4 py-3 text-sm font-semibold text-white shadow-lg ${t.type === 'error' ? 'bg-red-600' : 'bg-slate-900'}`}>
            {t.type === 'error' ? '⚠ ' : '✔ '}{t.message}
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
}
export const useToast = () => useContext(ToastCtx);

// ---------- modal ----------
export function Modal({ title, onClose, children, footer, wide }) {
  useEffect(() => {
    const esc = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', esc);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', esc); document.body.style.overflow = ''; };
  }, [onClose]);
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/50 sm:items-center sm:p-4" onMouseDown={onClose} role="dialog" aria-modal="true" aria-label={title}>
      <div className={`flex max-h-[94vh] w-full flex-col rounded-t-2xl bg-white shadow-2xl sm:rounded-2xl ${wide ? 'max-w-4xl' : 'max-w-xl'}`} onMouseDown={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <h2 className="text-lg font-bold">{title}</h2>
          <button onClick={onClose} className="rounded-lg px-2 py-1 text-xl text-slate-500 hover:bg-slate-100" aria-label="Close">✕</button>
        </div>
        <div className="overflow-y-auto px-5 py-4">{children}</div>
        {footer && <div className="flex flex-wrap justify-end gap-2 border-t border-slate-200 px-5 py-3">{footer}</div>}
      </div>
    </div>
  );
}

export function Confirm({ title, message, confirmLabel = 'Delete', onConfirm, onClose, busy }) {
  return (
    <Modal title={title} onClose={onClose} footer={<>
      <button className="btn-ghost" onClick={onClose}>Cancel</button>
      <button className="btn-danger" onClick={onConfirm} disabled={busy}>{busy ? 'Working...' : confirmLabel}</button>
    </>}>
      <p className="text-slate-700">{message}</p>
    </Modal>
  );
}

// ---------- small pieces ----------
export function PageHeader({ title, subtitle, actions }) {
  return (
    <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900">{title}</h1>
        {subtitle && <p className="text-sm text-slate-500">{subtitle}</p>}
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
  );
}

const TONES = {
  green: 'bg-green-100 text-green-800', red: 'bg-red-100 text-red-700', amber: 'bg-amber-100 text-amber-800',
  blue: 'bg-blue-100 text-blue-800', slate: 'bg-slate-100 text-slate-700', indigo: 'bg-indigo-100 text-indigo-800',
};
export const Badge = ({ tone = 'slate', children }) => <span className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2 py-0.5 text-xs font-semibold ${TONES[tone]}`}>{children}</span>;

export function Stat({ label, value, sub, icon, tone = 'text-slate-900' }) {
  return (
    <div className="card">
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm font-medium text-slate-500">{label}</p>
        {icon && <span className="text-xl" aria-hidden="true">{icon}</span>}
      </div>
      <p className={`mt-1 text-3xl font-extrabold tabular-nums ${tone}`}>{value}</p>
      {sub && <p className="mt-1 text-xs text-slate-500">{sub}</p>}
    </div>
  );
}

export const Spinner = ({ label = 'Loading...' }) => <p className="py-8 text-center text-slate-500">⏳ {label}</p>;
export const ErrorBox = ({ error }) => (error ? <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">⚠ {error}</p> : null);

// Horizontal bar chart - one series, one hue, values labelled; tooltip via title
export function Bars({ data, unit = '', empty = 'No data yet' }) {
  if (!data?.length) return <p className="text-sm text-slate-500">{empty}</p>;
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <div className="space-y-[2px]" role="img" aria-label={data.map((d) => `${d.label}: ${d.value}${unit}`).join(', ')}>
      {data.map((d) => (
        <div key={d.label} className="grid grid-cols-[minmax(70px,140px)_1fr_auto] items-center gap-3 py-1" title={`${d.label}: ${d.value}${unit}`}>
          <span className="truncate text-sm text-slate-600">{d.label}</span>
          <div className="h-5 rounded-r bg-slate-100"><div className="h-5 rounded-r-[4px] bg-indigo-500" style={{ width: `${Math.max((d.value / max) * 100, d.value ? 2 : 0)}%` }} /></div>
          <span className="w-14 text-right text-sm font-semibold tabular-nums">{d.value}{unit}</span>
        </div>
      ))}
    </div>
  );
}

// Vertical columns for a short time series
export function Columns({ data }) {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <div>
      <div className="flex h-32 items-end gap-[2px]" role="img" aria-label={data.map((d) => `${d.label}: ${d.value}`).join(', ')}>
        {data.map((d) => (
          <div key={d.label} className="flex h-full flex-1 flex-col justify-end" title={`${d.label}: ${d.value}`}>
            <div className="rounded-t-[4px] bg-indigo-500" style={{ height: `${(d.value / max) * 100}%`, minHeight: d.value ? 3 : 0 }} />
          </div>
        ))}
      </div>
      <div className="mt-1 flex gap-[2px] text-[10px] text-slate-400">{data.map((d, i) => <span key={d.label} className="flex-1 text-center">{i % 2 === 0 ? d.label : ''}</span>)}</div>
    </div>
  );
}
