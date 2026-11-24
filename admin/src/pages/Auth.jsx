import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth';
import { api } from '../api';
import { ErrorBox, PageHeader, useToast } from '../ui';

export function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const submit = async (e) => {
    e.preventDefault(); setBusy(true); setError('');
    try { const u = await login(email, password); nav(u.mustChangePassword ? '/change-password' : '/', { replace: true }); } catch (err) { setError(err.message); }
    setBusy(false);
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 px-4">
      <form onSubmit={submit} className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
        <p className="text-4xl">🎓</p>
        <h1 className="mt-2 text-2xl font-extrabold">Master Ji Admin</h1>
        <p className="text-sm text-slate-500">Sign in to manage the website, schools and content.</p>
        <label className="label mt-5" htmlFor="email">Email</label>
        <input id="email" className="input" type="email" autoComplete="username" required value={email} onChange={(e) => setEmail(e.target.value)} />
        <label className="label mt-3" htmlFor="password">Password</label>
        <input id="password" className="input" type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} />
        <div className="mt-3"><ErrorBox error={error} /></div>
        <button className="btn mt-4 w-full py-3" disabled={busy}>{busy ? 'Signing in...' : 'Sign in'}</button>
      </form>
    </div>
  );
}

function PasswordForm({ onDone, forced }) {
  const toast = useToast();
  const [f, setF] = useState({ currentPassword: '', newPassword: '', confirm: '' });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const submit = async (e) => {
    e.preventDefault(); setError('');
    if (f.newPassword !== f.confirm) { setError('The new passwords do not match'); return; }
    setBusy(true);
    try { await api('/auth/change-password', { method: 'POST', body: { currentPassword: f.currentPassword, newPassword: f.newPassword } }); toast('Password changed'); onDone(); } catch (err) { setError(err.message); }
    setBusy(false);
  };
  const input = (k, label, ac) => (
    <div className="mt-3"><label className="label" htmlFor={k}>{label}</label>
      <input id={k} className="input" type="password" autoComplete={ac} required value={f[k]} onChange={(e) => setF({ ...f, [k]: e.target.value })} /></div>
  );
  return (
    <form onSubmit={submit}>
      {forced && <p className="rounded-lg bg-amber-50 p-3 text-sm text-amber-900">For security, please set your own password before continuing.</p>}
      {input('currentPassword', 'Current password', 'current-password')}
      {input('newPassword', 'New password (8+ characters, letters and numbers)', 'new-password')}
      {input('confirm', 'Confirm new password', 'new-password')}
      <div className="mt-3"><ErrorBox error={error} /></div>
      <button className="btn mt-4" disabled={busy}>{busy ? 'Saving...' : 'Change password'}</button>
    </form>
  );
}

export function ChangePassword() {
  const { refresh, logout } = useAuth();
  const nav = useNavigate();
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <h1 className="text-2xl font-extrabold">🔐 Set a new password</h1>
        <PasswordForm forced onDone={async () => { await refresh(); nav('/', { replace: true }); }} />
        <button className="mt-4 text-sm text-slate-500 underline" onClick={logout}>Log out</button>
      </div>
    </div>
  );
}

export function Account() {
  const { user } = useAuth();
  return (
    <div className="max-w-xl">
      <PageHeader title="My account" subtitle={`${user.name} · ${user.email} · ${user.roleName}`} />
      <div className="card"><h2 className="text-lg font-bold">Change password</h2><PasswordForm onDone={() => {}} /></div>
    </div>
  );
}
