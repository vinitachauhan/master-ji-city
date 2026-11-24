// Website settings managed from the Admin Panel (collection "settings", key "site").
// Always falls back to these defaults, so the website works even if no settings were ever saved.
import { find } from './db.mjs';

export const DEFAULT_SETTINGS = {
  siteName: 'Master Ji - City', tagline: 'Play School to College - COMPLETE Study', contactEmail: '', contactPhone: '', address: '',
  doubtSolverEnabled: true, doubtLimitPer10Min: 8, mockTestEnabled: true, certificateStars: 100, maintenanceBanner: '',
};

let cache = { at: 0, value: DEFAULT_SETTINGS };
export async function getSettings() {
  if (Date.now() - cache.at < 30_000) return cache.value;
  try {
    const [s] = await find('settings', { key: 'site' });
    cache = { at: Date.now(), value: { ...DEFAULT_SETTINGS, ...(s || {}) } };
  } catch {
    cache = { at: Date.now(), value: DEFAULT_SETTINGS };
  }
  return cache.value;
}
