// Fetch wrapper: cookies are sent automatically; the custom header protects against CSRF.
export class ApiError extends Error { constructor(status, message) { super(message); this.status = status; } }

export async function api(path, { method = 'GET', body } = {}) {
  const res = await fetch(`/api${path}`, {
    method,
    credentials: 'same-origin',
    headers: { 'x-requested-with': 'masterji-admin', ...(body !== undefined ? { 'Content-Type': 'application/json' } : {}) },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    if (res.status === 401 && !path.startsWith('/auth/')) window.dispatchEvent(new Event('mj-admin-logout'));
    throw new ApiError(res.status, data.error || `Request failed (${res.status})`);
  }
  return data;
}

export const qs = (o) => {
  const p = new URLSearchParams();
  Object.entries(o).forEach(([k, v]) => { if (v !== undefined && v !== null && v !== '') p.set(k, v); });
  const s = p.toString();
  return s ? `?${s}` : '';
};

export const fmtDate = (v) => {
  if (!v) return '-';
  const d = new Date(v);
  if (Number.isNaN(d.getTime())) return String(v);
  return /^\d{4}-\d{2}-\d{2}$/.test(String(v)) ? d.toLocaleDateString('en-IN') : d.toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });
};
export const inr = (n) => `₹${Number(n || 0).toLocaleString('en-IN')}`;
