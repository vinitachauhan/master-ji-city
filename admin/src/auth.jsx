import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { api } from './api';

const AuthCtx = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(undefined); // undefined = loading, null = logged out
  const [meta, setMeta] = useState(null);

  const loadMeta = useCallback(() => api('/meta').then(setMeta).catch(() => {}), []);
  const refresh = useCallback(async () => {
    try { const d = await api('/auth/me'); setUser(d.user); if (!d.user.mustChangePassword) loadMeta(); } catch { setUser(null); }
  }, [loadMeta]);

  useEffect(() => { refresh(); }, [refresh]);
  useEffect(() => {
    const out = () => setUser(null);
    window.addEventListener('mj-admin-logout', out);
    return () => window.removeEventListener('mj-admin-logout', out);
  }, []);

  const login = async (email, password) => { const d = await api('/auth/login', { method: 'POST', body: { email, password } }); setUser(d.user); if (!d.user.mustChangePassword) loadMeta(); return d.user; };
  const logout = async () => { await api('/auth/logout', { method: 'POST', body: {} }).catch(() => {}); setUser(null); setMeta(null); };
  const can = (perm) => !!user && (user.permissions.includes('*') || user.permissions.includes(perm));

  return <AuthCtx.Provider value={{ user, meta, login, logout, refresh, can, loadMeta }}>{children}</AuthCtx.Provider>;
}
export const useAuth = () => useContext(AuthCtx);
