'use client';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

const KEY = 'masterji_dismissed_notices';
const read = () => { try { return JSON.parse(localStorage.getItem(KEY) || '[]'); } catch { return []; } };
const STYLES = {
  info: 'bg-sky-100 text-sky-900', success: 'bg-green-100 text-green-900',
  warning: 'bg-amber-100 text-amber-900', urgent: 'bg-red-600 text-white',
};

// Announcements from the Admin Panel. Shows nothing if there are none (or the API is unavailable).
export default function AnnouncementBar() {
  const [items, setItems] = useState([]);
  const [hidden, setHidden] = useState([]);
  const path = usePathname() || '';

  useEffect(() => {
    setHidden(read());
    fetch('/api/notifications').then((r) => r.json()).then((d) => setItems(d.notifications || [])).catch(() => {});
  }, []);

  if (path.startsWith('/school')) return null;
  const visible = items.filter((n) => !hidden.includes(n.id));
  if (!visible.length) return null;
  const dismiss = (id) => { const h = [...hidden, id]; setHidden(h); try { localStorage.setItem(KEY, JSON.stringify(h)); } catch {} };

  return (
    <div className="space-y-px">
      {visible.map((n) => (
        <div key={n.id} className={`flex items-start justify-between gap-3 px-4 py-2 text-sm ${STYLES[n.type] || STYLES.info}`} role="status">
          <p className="mx-auto max-w-6xl flex-1">
            📣 {n.title && <b>{n.title}: </b>}{n.message}
            {n.link && /^https?:\/\//.test(n.link) && <> <a href={n.link} target="_blank" rel="noopener noreferrer" className="font-semibold underline">More</a></>}
          </p>
          <button onClick={() => dismiss(n.id)} aria-label="Close announcement" className="px-1 font-bold opacity-70 hover:opacity-100">✕</button>
        </div>
      ))}
    </div>
  );
}
