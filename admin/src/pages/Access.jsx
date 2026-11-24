import { useCallback, useEffect, useState } from 'react';
import { api, fmtDate } from '../api';
import { useAuth } from '../auth';
import { Badge, Confirm, ErrorBox, Modal, PageHeader, Spinner, useToast } from '../ui';

// ======================= Admin users =======================
export function Users() {
  const { can, user: me } = useAuth();
  const toast = useToast();
  const [rows, setRows] = useState(null);
  const [roles, setRoles] = useState([]);
  const [error, setError] = useState('');
  const [form, setForm] = useState(null);
  const [del, setDel] = useState(null);
  const [busy, setBusy] = useState(false);
  const canWrite = can('users:write');

  const load = useCallback(() => {
    api('/users').then((d) => setRows(d.rows)).catch((e) => setError(e.message));
    api('/roles').then((d) => setRoles(d.rows)).catch(() => {});
  }, []);
  useEffect(load, [load]);

  const save = async (e) => {
    e.preventDefault(); setBusy(true);
    try {
      const body = { name: form.name, roleId: form.roleId, active: form.active, ...(form.password ? { password: form.password } : {}) };
      if (form.id) await api(`/users/${form.id}`, { method: 'PUT', body });
      else await api('/users', { method: 'POST', body: { ...body, email: form.email, password: form.password } });
      toast(form.id ? 'User updated' : 'User created - they must change the password on first login');
      setForm(null); load();
    } catch (err) { toast(err.message, 'error'); }
    setBusy(false);
  };
  const doDelete = async () => {
    setBusy(true);
    try { await api(`/users/${del.id}`, { method: 'DELETE' }); toast('User deleted'); setDel(null); load(); } catch (err) { toast(err.message, 'error'); }
    setBusy(false);
  };

  return (
    <div>
      <PageHeader title="Admin Users" subtitle="People who can sign in to this panel. Each person gets a role that decides what they can do."
        actions={canWrite && <button className="btn" onClick={() => setForm({ name: '', email: '', roleId: 'teacher', active: true, password: '' })}>+ Add admin user</button>} />
      <ErrorBox error={error} />
      {!rows ? <Spinner /> : (
        <div className="card -mx-4 overflow-x-auto sm:mx-0">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead><tr className="border-b text-xs uppercase tracking-wide text-slate-500">{['Name', 'Email', 'Role', 'Status', 'Last login', ''].map((h) => <th key={h} className="px-3 py-2">{h}</th>)}</tr></thead>
            <tbody className="divide-y divide-slate-100">
              {rows.map((u) => (
                <tr key={u.id}>
                  <td className="px-3 py-2 font-semibold">{u.name}{u.id === me.id && <span className="ml-2 text-xs text-slate-400">(you)</span>}</td>
                  <td className="px-3 py-2">{u.email}</td>
                  <td className="px-3 py-2"><Badge tone={u.roleId === 'super_admin' ? 'indigo' : 'slate'}>{u.roleName}</Badge></td>
                  <td className="px-3 py-2">{u.active ? <Badge tone="green">✔ Active</Badge> : <Badge tone="red">✖ Disabled</Badge>}{u.mustChangePassword && <span className="ml-1"><Badge tone="amber">Must change password</Badge></span>}</td>
                  <td className="px-3 py-2 text-slate-500">{fmtDate(u.lastLoginAt)}</td>
                  <td className="whitespace-nowrap px-3 py-2 text-right">
                    {canWrite && <button className="mr-3 font-semibold text-indigo-700" onClick={() => setForm({ ...u, password: '' })}>Edit</button>}
                    {canWrite && u.id !== me.id && <button className="font-semibold text-red-600" onClick={() => setDel(u)}>Delete</button>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {form && (
        <Modal title={form.id ? `Edit ${form.name}` : 'Add admin user'} onClose={() => setForm(null)}
          footer={<><button className="btn-ghost" onClick={() => setForm(null)}>Cancel</button><button className="btn" form="user-form" disabled={busy}>{busy ? 'Saving...' : 'Save'}</button></>}>
          <form id="user-form" onSubmit={save} className="grid gap-4">
            <div><label className="label" htmlFor="u-name">Name *</label><input id="u-name" className="input" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
            <div><label className="label" htmlFor="u-email">Email *</label><input id="u-email" className="input" type="email" required disabled={!!form.id} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
            <div><label className="label" htmlFor="u-role">Role *</label>
              <select id="u-role" className="input" value={form.roleId} onChange={(e) => setForm({ ...form, roleId: e.target.value })}>
                {roles.map((r) => <option key={r.id} value={r.id}>{r.name}</option>)}
              </select>
              <p className="mt-1 text-xs text-slate-500">{roles.find((r) => r.id === form.roleId)?.description}</p></div>
            <div><label className="label" htmlFor="u-pw">{form.id ? 'Reset password (leave empty to keep)' : 'Temporary password *'}</label>
              <input id="u-pw" className="input" type="password" autoComplete="new-password" required={!form.id} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
              <p className="mt-1 text-xs text-slate-500">8+ characters with letters and numbers. They will be asked to change it at first login.</p></div>
            <label className="inline-flex items-center gap-3"><input type="checkbox" className="h-5 w-5 accent-indigo-600" checked={form.active} disabled={form.id === me.id} onChange={(e) => setForm({ ...form, active: e.target.checked })} /> <span className="text-sm font-semibold">Active (can sign in)</span></label>
          </form>
        </Modal>
      )}
      {del && <Confirm title="Delete admin user?" message={`${del.name} (${del.email}) will no longer be able to sign in.`} busy={busy} onClose={() => setDel(null)} onConfirm={doDelete} />}
    </div>
  );
}

// ======================= Roles & permissions =======================
export function Roles() {
  const { can, meta } = useAuth();
  const toast = useToast();
  const [rows, setRows] = useState(null);
  const [error, setError] = useState('');
  const [form, setForm] = useState(null);
  const [del, setDel] = useState(null);
  const [busy, setBusy] = useState(false);
  const canWrite = can('roles:write');
  const load = useCallback(() => { api('/roles').then((d) => setRows(d.rows)).catch((e) => setError(e.message)); }, []);
  useEffect(load, [load]);

  const toggle = (perm) => setForm((f) => {
    const has = f.permissions.includes(perm);
    let p = has ? f.permissions.filter((x) => x !== perm) : [...f.permissions, perm];
    const [res, mode] = perm.split(':');
    if (!has && mode === 'write') p = [...new Set([...p, `${res}:read`])]; // write needs read
    if (has && mode === 'read') p = p.filter((x) => x !== `${res}:write`);
    return { ...f, permissions: p };
  });
  const save = async (e) => {
    e.preventDefault(); setBusy(true);
    try {
      const body = { name: form.name, description: form.description, permissions: form.permissions };
      if (form.id) await api(`/roles/${form.id}`, { method: 'PUT', body }); else await api('/roles', { method: 'POST', body });
      toast('Role saved'); setForm(null); load();
    } catch (err) { toast(err.message, 'error'); }
    setBusy(false);
  };
  const doDelete = async () => {
    setBusy(true);
    try { await api(`/roles/${del.id}`, { method: 'DELETE' }); toast('Role deleted'); setDel(null); load(); } catch (err) { toast(err.message, 'error'); }
    setBusy(false);
  };

  return (
    <div>
      <PageHeader title="Roles & Permissions" subtitle="Decide what each role can see (read) and change (write)."
        actions={canWrite && <button className="btn" onClick={() => setForm({ name: '', description: '', permissions: ['dashboard:read'] })}>+ New role</button>} />
      <ErrorBox error={error} />
      {!rows ? <Spinner /> : (
        <div className="grid gap-4 md:grid-cols-2">
          {rows.map((r) => (
            <div key={r.id} className="card">
              <div className="flex items-start justify-between gap-2">
                <div><h2 className="text-lg font-bold">{r.name} {r.system && <Badge tone="indigo">🔒 System</Badge>}</h2><p className="text-sm text-slate-500">{r.description}</p></div>
                <Badge>{r.userCount} user{r.userCount === 1 ? '' : 's'}</Badge>
              </div>
              <p className="mt-3 text-sm text-slate-600">{r.permissions.includes('*') ? 'Everything' : `${r.permissions.length} permissions`}</p>
              {canWrite && !r.system && (
                <div className="mt-3 flex gap-3 text-sm">
                  <button className="font-semibold text-indigo-700" onClick={() => setForm({ ...r })}>Edit permissions</button>
                  <button className="font-semibold text-red-600" onClick={() => setDel(r)}>Delete</button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      {form && (
        <Modal wide title={form.id ? `Edit role - ${form.name}` : 'New role'} onClose={() => setForm(null)}
          footer={<><button className="btn-ghost" onClick={() => setForm(null)}>Cancel</button><button className="btn" form="role-form" disabled={busy}>{busy ? 'Saving...' : 'Save role'}</button></>}>
          <form id="role-form" onSubmit={save}>
            <div className="grid gap-4 sm:grid-cols-2">
              <div><label className="label" htmlFor="r-name">Role name *</label><input id="r-name" className="input" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
              <div><label className="label" htmlFor="r-desc">Description</label><input id="r-desc" className="input" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
            </div>
            <div className="-mx-5 mt-4 overflow-x-auto sm:mx-0">
              <table className="w-full min-w-[420px] text-sm">
                <thead><tr className="border-b text-xs uppercase text-slate-500"><th className="px-3 py-2 text-left">Section</th><th className="px-3 py-2">Can see</th><th className="px-3 py-2">Can change</th></tr></thead>
                <tbody className="divide-y divide-slate-100">
                  {meta.sections.map(([res, label]) => (
                    <tr key={res}>
                      <td className="px-3 py-2 font-semibold">{label}</td>
                      {['read', 'write'].map((m) => (
                        <td key={m} className="px-3 py-2 text-center">
                          {res === 'dashboard' && m === 'write' || res === 'reports' && m === 'write' || res === 'logs' && m === 'write' ? <span className="text-slate-300">-</span> : (
                            <input type="checkbox" className="h-5 w-5 accent-indigo-600" aria-label={`${label} ${m}`} checked={form.permissions.includes(`${res}:${m}`)} onChange={() => toggle(`${res}:${m}`)} />
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </form>
        </Modal>
      )}
      {del && <Confirm title="Delete role?" message={`The role "${del.name}" will be deleted. Roles that still have users cannot be deleted.`} busy={busy} onClose={() => setDel(null)} onConfirm={doDelete} />}
    </div>
  );
}

// ======================= Website settings =======================
export function Settings() {
  const { can } = useAuth();
  const toast = useToast();
  const [s, setS] = useState(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const canWrite = can('settings:write');
  useEffect(() => { api('/settings').then((d) => setS(d.settings)).catch((e) => setError(e.message)); }, []);
  if (error) return <ErrorBox error={error} />;
  if (!s) return <Spinner />;
  const save = async (e) => {
    e.preventDefault(); setBusy(true);
    try { const d = await api('/settings', { method: 'PUT', body: s }); setS(d.settings); toast('Settings saved - the website uses them within a minute'); } catch (err) { toast(err.message, 'error'); }
    setBusy(false);
  };
  const text = (k, label, type = 'text') => (
    <div><label className="label" htmlFor={k}>{label}</label><input id={k} type={type} className="input" disabled={!canWrite} value={s[k] ?? ''} onChange={(e) => setS({ ...s, [k]: type === 'number' ? Number(e.target.value) : e.target.value })} /></div>
  );
  const toggle = (k, label, help) => (
    <label className="flex items-start gap-3 rounded-xl border border-slate-200 p-3">
      <input type="checkbox" className="mt-0.5 h-5 w-5 accent-indigo-600" disabled={!canWrite} checked={!!s[k]} onChange={(e) => setS({ ...s, [k]: e.target.checked })} />
      <span><span className="block font-semibold">{label}</span><span className="text-sm text-slate-500">{help}</span></span>
    </label>
  );
  return (
    <form onSubmit={save} className="max-w-3xl">
      <PageHeader title="Website Settings" subtitle="Central switches for the Master Ji website." actions={canWrite && <button className="btn" disabled={busy}>{busy ? 'Saving...' : 'Save settings'}</button>} />
      <div className="card grid gap-4 sm:grid-cols-2">
        <h2 className="text-lg font-bold sm:col-span-2">General</h2>
        {text('siteName', 'Site name')}{text('tagline', 'Tagline')}{text('contactEmail', 'Contact email', 'email')}{text('contactPhone', 'Contact phone')}
        <div className="sm:col-span-2">{text('address', 'Address')}</div>
      </div>
      <div className="card mt-4 grid gap-3">
        <h2 className="text-lg font-bold">Features</h2>
        {toggle('doubtSolverEnabled', '🤖 AI Doubt Solver', 'When off, students see a message that the doubt solver is closed.')}
        <div className="grid gap-4 sm:grid-cols-2">{text('doubtLimitPer10Min', 'Doubts allowed per visitor every 10 minutes', 'number')}{text('certificateStars', 'Stars needed for the Topper Certificate', 'number')}</div>
        {toggle('mockTestEnabled', '📝 Mock Test', 'When off, new mock tests cannot be started.')}
      </div>
      <div className="card mt-4">
        <h2 className="text-lg font-bold">Website banner</h2>
        <label className="label mt-2" htmlFor="maintenanceBanner">Message shown at the top of every website page (leave empty for none)</label>
        <input id="maintenanceBanner" className="input" disabled={!canWrite} value={s.maintenanceBanner || ''} onChange={(e) => setS({ ...s, maintenanceBanner: e.target.value })} placeholder="e.g. Exams start on 1 December - best of luck!" />
        <p className="mt-2 text-xs text-slate-500">For scheduled or multiple announcements, use Notifications.</p>
      </div>
    </form>
  );
}
