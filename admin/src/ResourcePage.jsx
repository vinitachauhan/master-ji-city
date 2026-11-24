import { useCallback, useEffect, useMemo, useState } from 'react';
import { api, qs, fmtDate } from './api';
import { useAuth } from './auth';
import { Badge, Confirm, ErrorBox, Modal, PageHeader, Spinner, useToast } from './ui';
import Field from './Field';

// Generic list + search + filters + pagination + create / edit / delete for one resource.
// fixed = values this list is locked to (e.g. { class: '5', section: 'B' }) - used as filters and as defaults for new items
export default function ResourcePage({ resource, title, subtitle, embedded, fixed = {}, onChanged, emptyText }) {
  const { meta, can } = useAuth();
  const cfg = meta?.resources?.[resource];
  const toast = useToast();
  const [rows, setRows] = useState(null);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [q, setQ] = useState('');
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState({});
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(null); // {mode:'create'|'edit'|'view', item}
  const [deleting, setDeleting] = useState(null);
  const [busy, setBusy] = useState(false);
  const limit = 25;
  const fixedKey = JSON.stringify(fixed);
  const [refNames, setRefNames] = useState({});

  const canWrite = cfg && can(`${cfg.perm}:write`) && !cfg.readOnly;
  const load = useCallback(() => {
    if (!cfg) return;
    setError('');
    api(`/r/${resource}${qs({ q: query, page, limit, ...filters, ...JSON.parse(fixedKey) })}`)
      .then((d) => { setRows(d.rows); setTotal(d.total); })
      .catch((e) => setError(e.message));
  }, [cfg, resource, query, page, filters, fixedKey]);
  useEffect(() => { load(); }, [load]);
  // Show names instead of ids for linked items (e.g. teacher)
  useEffect(() => {
    if (!cfg) return;
    const refs = [...new Set(cfg.columns.map((c) => cfg.fields[c]).filter((d) => d?.type === 'ref').map((d) => d.ref))];
    refs.forEach((ref) => api(`/r/${ref}?limit=200`).then((d) => setRefNames((m) => ({ ...m, ...Object.fromEntries(d.rows.map((r) => [r.id, r.name])) }))).catch(() => {}));
  }, [cfg]);
  useEffect(() => { const t = setTimeout(() => { setQuery(q); setPage(1); }, 300); return () => clearTimeout(t); }, [q]);
  useEffect(() => { setPage(1); setFilters({}); setQ(''); setQuery(''); }, [resource]);

  if (!cfg) return <Spinner />;

  const openEdit = async (row, mode) => {
    try { const d = await api(`/r/${resource}/${row._key}`); setEditing({ mode, item: d.item }); } catch (e) { toast(e.message, 'error'); }
  };
  const save = async (item) => {
    setBusy(true);
    try {
      if (editing.mode === 'create') await api(`/r/${resource}`, { method: 'POST', body: item });
      else await api(`/r/${resource}/${editing.item._key}`, { method: 'PUT', body: item });
      toast(editing.mode === 'create' ? 'Created' : 'Saved');
      setEditing(null); load(); onChanged?.();
    } catch (e) { toast(e.message, 'error'); }
    setBusy(false);
  };
  const doDelete = async () => {
    setBusy(true);
    try { await api(`/r/${resource}/${deleting._key}`, { method: 'DELETE' }); toast('Deleted'); setDeleting(null); load(); onChanged?.(); } catch (e) { toast(e.message, 'error'); }
    setBusy(false);
  };

  const pages = Math.max(1, Math.ceil(total / limit));
  const display = (field, v) => {
    const def = cfg.fields[field] || {};
    if (def.type === 'boolean') return v ? <Badge tone="green">Yes</Badge> : <Badge>No</Badge>;
    if (def.type === 'date' || field === 'createdAt' || field === 'at') return fmtDate(v);
    if (def.type === 'questions') return `${(v || []).length} MCQ`;
    if (def.type === 'ref') return v ? (refNames[v] || '…') : <span className="text-slate-400">-</span>;
    if (Array.isArray(v)) return v.join(', ');
    if (v === undefined || v === null || v === '') return <span className="text-slate-400">-</span>;
    const s = String(v);
    return s.length > 70 ? `${s.slice(0, 70)}…` : s;
  };

  return (
    <div>
      {!embedded && <PageHeader title={title || cfg.label} subtitle={subtitle} actions={canWrite && !cfg.noCreate && <button className="btn" onClick={() => setEditing({ mode: 'create', item: {} })}>+ Add new</button>} />}
      {embedded && canWrite && !cfg.noCreate && <div className="mb-3 flex justify-end"><button className="btn" onClick={() => setEditing({ mode: 'create', item: {} })}>+ Add new</button></div>}

      <div className="card">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          {cfg.search && <input className="input max-w-xs" placeholder="Search..." value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search" />}
          {cfg.filters.filter((f) => !(f in fixed)).map((f) => {
            const def = cfg.fields[f];
            const values = def?.type === 'enum' ? def.values : def?.type === 'boolean' ? ['true', 'false'] : null;
            return values ? (
              <select key={f} className="input w-auto" value={filters[f] ?? ''} aria-label={def.label}
                onChange={(e) => { setFilters((x) => ({ ...x, [f]: e.target.value })); setPage(1); }}>
                <option value="">All - {def.label}</option>
                {values.map((v) => <option key={v} value={v}>{def.type === 'boolean' ? (v === 'true' ? 'Yes' : 'No') : v}</option>)}
              </select>
            ) : (
              <input key={f} className="input w-36" placeholder={def?.label || f} value={filters[f] ?? ''} aria-label={def?.label || f}
                onChange={(e) => { setFilters((x) => ({ ...x, [f]: e.target.value })); setPage(1); }} />
            );
          })}
          <span className="ml-auto text-sm text-slate-500">{total} item{total === 1 ? '' : 's'}</span>
        </div>
        <ErrorBox error={error} />
        {!rows ? <Spinner /> : rows.length === 0 ? <p className="py-8 text-center text-slate-500">{emptyText || 'Nothing here yet.'}</p> : (
          <div className="-mx-4 overflow-x-auto sm:mx-0">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500">
                  {cfg.columns.filter((c) => !(c in fixed)).map((c) => <th key={c} className="px-3 py-2 font-semibold">{cfg.fields[c]?.label || c}</th>)}
                  <th className="px-3 py-2" />
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {rows.map((r) => (
                  <tr key={r._key} className="hover:bg-slate-50">
                    {cfg.columns.filter((c) => !(c in fixed)).map((c) => <td key={c} className="px-3 py-2 align-top">{display(c, r[c])}</td>)}
                    <td className="whitespace-nowrap px-3 py-2 text-right">
                      <button className="mr-3 font-semibold text-indigo-700 hover:underline" onClick={() => openEdit(r, canWrite ? 'edit' : 'view')}>{canWrite ? 'Edit' : 'View'}</button>
                      {canWrite && !cfg.noDelete && <button className="font-semibold text-red-600 hover:underline" onClick={() => setDeleting(r)}>Delete</button>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {pages > 1 && (
          <div className="mt-4 flex items-center justify-between gap-2 text-sm">
            <button className="btn-ghost" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>← Previous</button>
            <span className="text-slate-500">Page {page} of {pages}</span>
            <button className="btn-ghost" disabled={page >= pages} onClick={() => setPage((p) => p + 1)}>Next →</button>
          </div>
        )}
      </div>

      {editing && <ItemForm cfg={cfg} mode={editing.mode} initial={editing.item} fixed={fixed} busy={busy} onSave={save} onClose={() => setEditing(null)} />}
      {deleting && <Confirm title="Delete this item?" busy={busy} onClose={() => setDeleting(null)} onConfirm={doDelete}
        message={`"${deleting.name || deleting.title || deleting.chapterName || deleting.unitName || deleting.question || deleting._key}" will be permanently deleted. This cannot be undone.`} />}
    </div>
  );
}

function ItemForm({ cfg, mode, initial, fixed = {}, busy, onSave, onClose }) {
  const [item, setItem] = useState(() => {
    if (mode !== 'create') return initial;
    const d = {};
    for (const [k, def] of Object.entries(cfg.fields)) if (def.default !== undefined) d[k] = def.default;
    return { ...d, ...fixed };
  });
  const readOnly = mode === 'view';
  const fields = useMemo(() => Object.entries(cfg.fields).filter(([k, def]) => !(mode === 'create' && def.readOnly)), [cfg, mode]);
  const isKeyLocked = (k, def) => (mode === 'create' && k in fixed) || (mode === 'edit' && (def.immutable || cfg.keyFields.includes(k)));
  const wide = fields.some(([, d]) => ['questions', 'text', 'stringArray'].includes(d.type));
  const submit = (e) => {
    e.preventDefault();
    const out = {};
    for (const [k, def] of fields) if (!def.readOnly && (!isKeyLocked(k, def) || (mode === 'create' && k in fixed))) out[k] = item[k];
    onSave(out);
  };
  return (
    <Modal wide={wide} title={`${mode === 'create' ? 'Add' : readOnly ? 'View' : 'Edit'} - ${cfg.label}`} onClose={onClose}
      footer={!readOnly && <><button className="btn-ghost" onClick={onClose} type="button">Cancel</button><button className="btn" form="item-form" disabled={busy}>{busy ? 'Saving...' : 'Save'}</button></>}>
      <form id="item-form" onSubmit={submit} className="grid gap-4 sm:grid-cols-2">
        {fields.map(([k, def]) => (
          <Field key={k} name={k} def={def} value={item[k]} disabled={readOnly || isKeyLocked(k, def)} onChange={(v) => setItem((x) => ({ ...x, [k]: v }))} />
        ))}
      </form>
    </Modal>
  );
}
