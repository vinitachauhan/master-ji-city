import { useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from './auth';
import { api } from './api';

export const NAV = [
  { group: 'Overview', items: [['/', '📊', 'Dashboard', 'dashboard'], ['/reports', '📈', 'Reports', 'reports']] },
  { group: 'People', items: [['/students', '🎒', 'Students', 'students'], ['/teachers', '👩‍🏫', 'Teachers & Staff', 'teachers'], ['/schools', '🏫', 'Schools', 'schools']] },
  { group: 'Academics', items: [['/sections', '🏷️', 'Classes & Sections', 'classes'], ['/subjects', '📚', 'Subjects', 'subjects'], ['/materials', '📒', 'Study Materials', 'materials'], ['/tests', '📝', 'Tests & Results', 'tests'], ['/doubts', '🤖', 'Doubts', 'doubts'], ['/certificates', '🏆', 'Certificates', 'certificates']] },
  { group: 'Communication', items: [['/notifications', '📣', 'Notifications', 'notifications']] },
  { group: 'Administration', items: [['/users', '👤', 'Admin Users', 'users'], ['/roles', '🔐', 'Roles & Permissions', 'roles'], ['/settings', '⚙️', 'Website Settings', 'settings'], ['/logs', '🧾', 'Activity Logs', 'logs']] },
];

export default function Layout() {
  const { user, logout, can, meta } = useAuth();
  const [open, setOpen] = useState(false);
  const [notices, setNotices] = useState([]);
  const loc = useLocation();
  useEffect(() => setOpen(false), [loc.pathname]);
  useEffect(() => { api('/my-notices').then((d) => setNotices(d.rows)).catch(() => {}); }, []);

  const sidebar = (
    <nav className="flex h-full flex-col gap-4 overflow-y-auto p-4" aria-label="Admin sections">
      {NAV.map((g) => {
        const items = g.items.filter(([, , , perm]) => can(`${perm}:read`));
        if (!items.length) return null;
        return (
          <div key={g.group}>
            <p className="mb-1 px-3 text-xs font-bold uppercase tracking-wider text-slate-400">{g.group}</p>
            {items.map(([to, icon, label]) => (
              <NavLink key={to} to={to} end={to === '/'}
                className={({ isActive }) => `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-semibold ${isActive ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}>
                <span aria-hidden="true">{icon}</span>{label}
              </NavLink>
            ))}
          </div>
        );
      })}
    </nav>
  );

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[260px_1fr]">
      <aside className="hidden bg-slate-900 lg:sticky lg:top-0 lg:block lg:h-screen">
        <div className="border-b border-slate-800 px-5 py-4 text-white"><p className="text-lg font-extrabold">🎓 Master Ji</p><p className="text-xs text-slate-400">Super Admin Panel</p></div>
        {sidebar}
      </aside>
      {open && (
        <div className="fixed inset-0 z-40 lg:hidden" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="absolute inset-0 bg-slate-900/60" onClick={() => setOpen(false)} />
          <aside className="absolute inset-y-0 left-0 w-72 bg-slate-900">
            <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4 text-white"><p className="text-lg font-extrabold">🎓 Master Ji</p><button onClick={() => setOpen(false)} aria-label="Close menu" className="text-2xl">✕</button></div>
            {sidebar}
          </aside>
        </div>
      )}
      <div className="min-w-0">
        <header className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur">
          <div className="flex items-center gap-2">
            <button className="btn-ghost lg:hidden" onClick={() => setOpen(true)} aria-label="Open menu">☰</button>
            {meta?.dataSource && meta.dataSource !== 'mongodb' && <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800" title="MongoDB is not connected">⚠ Not connected to MongoDB - changes are temporary</span>}
          </div>
          <div className="flex items-center gap-3">
            <a href={import.meta.env.VITE_WEBSITE_URL || 'http://localhost:3000'} target="_blank" rel="noreferrer" className="hidden text-sm font-semibold text-indigo-700 hover:underline sm:inline">Open website ↗</a>
            <div className="text-right leading-tight"><p className="text-sm font-bold">{user.name}</p><p className="text-xs text-slate-500">{user.roleName}</p></div>
            <NavLink to="/account" className="btn-ghost px-2" title="My account" aria-label="My account">👤</NavLink>
            <button className="btn-ghost" onClick={logout}>Log out</button>
          </div>
        </header>
        {notices.length > 0 && (
          <div className="space-y-1 px-4 pt-3">
            {notices.map((n) => <p key={n.id} className={`rounded-lg px-3 py-2 text-sm ${n.type === 'urgent' ? 'bg-red-100 text-red-800' : n.type === 'warning' ? 'bg-amber-100 text-amber-900' : 'bg-indigo-50 text-indigo-900'}`}><b>📣 {n.title}:</b> {n.message}</p>)}
          </div>
        )}
        <main className="mx-auto max-w-7xl px-4 py-6"><Outlet /></main>
      </div>
    </div>
  );
}
