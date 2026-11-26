'use client';
// Loads the All Schools Directory. With MongoDB connected every change is saved on the server.
// Without MongoDB (built-in data) the Super Admin's changes are kept in this browser's LocalStorage,
// and the home page in the same browser shows that saved list too.
import { useCallback, useEffect, useState } from 'react';
import { getPin } from '@/components/school/ui';

const LOCAL_KEY = 'masterji_schools_directory';
const readLocal = () => { try { return JSON.parse(localStorage.getItem(LOCAL_KEY) || 'null'); } catch { return null; } };
const writeLocal = (rows) => { try { localStorage.setItem(LOCAL_KEY, JSON.stringify(rows)); } catch { /* private mode */ } };
const newId = () => (typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `local-${Date.now()}`);

async function call(method, body, query = '') {
  const res = await fetch(`/api/schools-directory${query}`, {
    method, headers: { 'x-admin-pin': getPin(), ...(body ? { 'Content-Type': 'application/json' } : {}) },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || `Request failed (${res.status})`);
  return data;
}

export function useDirectory({ admin = false } = {}) {
  const [state, setState] = useState({ loading: true, schools: [], source: '', error: '' });

  const load = useCallback(async () => {
    try {
      const d = await call('GET');
      const local = d.source === 'mongodb' ? null : readLocal();
      setState({ loading: false, schools: local || d.schools, source: d.source, admin: d.admin, saved: local ? 'local' : d.source, error: '' });
    } catch (e) { setState((s) => ({ ...s, loading: false, error: e.message })); }
  }, []);
  useEffect(() => { load(); }, [load]);

  const local = state.source && state.source !== 'mongodb';
  const saveLocal = (rows) => { writeLocal(rows); setState((s) => ({ ...s, schools: rows, saved: 'local' })); };

  // Super Admin actions
  const save = async (school) => {
    if (local) {
      const rows = school.id ? state.schools.map((x) => (x.id === school.id ? { ...x, ...school, demo: false } : x))
        : [...state.schools, { ...school, id: newId(), inSystem: false, demo: false }];
      return saveLocal(rows);
    }
    await call('POST', school); await load();
  };
  const addToSystem = async (id) => {
    if (local) return saveLocal(state.schools.map((x) => (x.id === id ? { ...x, inSystem: true, status: 'Active' } : x)));
    await call('PATCH', { id }); await load();
  };
  const del = async (id) => {
    if (local) return saveLocal(state.schools.filter((x) => x.id !== id));
    await call('DELETE', null, `?id=${encodeURIComponent(id)}`); await load();
  };

  return { ...state, reload: load, save: admin ? save : null, addToSystem: admin ? addToSystem : null, del: admin ? del : null };
}

export { DIRECTORY_CITIES as CITIES } from '@/lib/data/schoolsDirectory.mjs';
import { DIRECTORY_CITIES } from '@/lib/data/schoolsDirectory.mjs';
export const countByCity = (rows) => Object.fromEntries(DIRECTORY_CITIES.map((c) => [c, rows.filter((r) => r.city === c).length]));
