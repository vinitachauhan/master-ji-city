// Generic, validated CRUD for every resource in resources.js + activity logging.
import { find, insertOne, upsert, remove } from '../../lib/db.mjs';
import { RESOURCES_CONFIG } from './resources.js';
import { HttpError, newId, clientIp, hasPerm } from './core.js';

// ---------- activity log ----------
export async function logActivity(req, action, entity, entityKey, summary, actor) {
  const u = actor || req.user || {};
  try {
    await insertOne('activityLogs', {
      id: newId(), at: new Date(), actorId: u.id || null, actorName: u.name || u.email || 'system', actorRole: u.roleName || '',
      action, entity, entityKey: String(entityKey ?? ''), summary: String(summary || '').slice(0, 1000), ip: clientIp(req),
    });
  } catch (e) { console.warn('[admin] could not write activity log:', e.message); }
}

// ---------- composite keys travel as base64url(JSON) ----------
export const encodeKey = (cfg, doc) => Buffer.from(JSON.stringify(cfg.keyFields.map((f) => doc[f]))).toString('base64url');
export function decodeKey(cfg, key) {
  let vals;
  try { vals = JSON.parse(Buffer.from(String(key), 'base64url').toString('utf8')); } catch { throw new HttpError(400, 'Bad item key'); }
  if (!Array.isArray(vals) || vals.length !== cfg.keyFields.length) throw new HttpError(400, 'Bad item key');
  return Object.fromEntries(cfg.keyFields.map((f, i) => [f, vals[i]]));
}

// ---------- validation ----------
function cleanValue(name, def, v) {
  const bad = (msg) => { throw new HttpError(400, `${def.label || name}: ${msg}`); };
  if (v === undefined || v === null || v === '') {
    if (def.type === 'boolean') return false;
    if (def.type === 'stringArray' || def.type === 'questions') return [];
    return def.type === 'number' ? null : '';
  }
  switch (def.type) {
    case 'string': case 'text': case 'ref': {
      const s = String(v).trim();
      if (s.length > (def.max || 200)) bad(`must be at most ${def.max || 200} characters`);
      if (def.format === 'email' && s && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)) bad('is not a valid email');
      if (def.format === 'url' && s && !/^https?:\/\/[^\s]+$/i.test(s)) bad('must start with http:// or https://');
      return s;
    }
    case 'number': {
      const n = Number(v);
      if (!Number.isFinite(n)) bad('must be a number');
      if (def.min !== undefined && n < def.min) bad(`must be at least ${def.min}`);
      if (def.max !== undefined && n > def.max) bad(`must be at most ${def.max}`);
      return n;
    }
    case 'boolean': return v === true || v === 'true';
    case 'enum': if (!def.values.includes(v)) bad(`must be one of: ${def.values.join(', ')}`); return v;
    case 'date': {
      const d = new Date(v);
      if (Number.isNaN(d.getTime())) bad('is not a valid date');
      return /^\d{4}-\d{2}-\d{2}$/.test(String(v)) ? String(v) : d;
    }
    case 'stringArray': {
      const arr = (Array.isArray(v) ? v : String(v).split('\n')).map((s) => String(s).trim()).filter(Boolean);
      if (arr.length > 200) bad('has too many lines');
      return arr.map((s) => s.slice(0, 2000));
    }
    case 'options4': {
      if (!Array.isArray(v) || v.length !== 4) bad('needs exactly 4 options');
      const arr = v.map((s) => String(s ?? '').trim());
      if (arr.some((s) => !s)) bad('options cannot be empty');
      if (new Set(arr).size !== 4) bad('options must all be different');
      return arr.map((s) => s.slice(0, 300));
    }
    case 'questions': {
      if (!Array.isArray(v)) bad('must be a list');
      if (v.length > 50) bad('at most 50 questions');
      return v.map((q, i) => {
        const question = String(q?.question ?? '').trim();
        const options = Array.isArray(q?.options) ? q.options.map((s) => String(s ?? '').trim()) : [];
        const correctAnswer = String(q?.correctAnswer ?? '').trim();
        if (!question) bad(`question ${i + 1} is empty`);
        if (options.length !== 4 || options.some((s) => !s) || new Set(options).size !== 4) bad(`question ${i + 1} needs 4 different, non-empty options`);
        if (!options.includes(correctAnswer)) bad(`question ${i + 1}: the correct answer must be one of its options`);
        const out = { question: question.slice(0, 1000), options: options.map((s) => s.slice(0, 300)), correctAnswer };
        if (q.tag) out.tag = String(q.tag).slice(0, 40);
        return out;
      });
    }
    default: return v;
  }
}

export function validate(cfg, input, { partial }) {
  const out = {};
  for (const [name, def] of Object.entries(cfg.fields)) {
    if (def.readOnly) continue;
    const present = Object.prototype.hasOwnProperty.call(input, name);
    if (!present) {
      if (partial) continue;
      if (def.default !== undefined) { out[name] = def.default; continue; }
    }
    const v = cleanValue(name, def, present ? input[name] : undefined);
    const empty = v === '' || v === null || (Array.isArray(v) && v.length === 0);
    if (def.required && empty && (present || !partial)) throw new HttpError(400, `${def.label || name} is required`);
    if (present || !partial) out[name] = v;
  }
  return out;
}

// ---------- list helpers ----------
function sortRows(rows, sort) {
  if (!sort) return rows;
  const desc = sort.startsWith('-'); const key = sort.replace(/^-/, '');
  return [...rows].sort((a, b) => {
    const x = a[key] instanceof Date ? a[key].getTime() : a[key]; const y = b[key] instanceof Date ? b[key].getTime() : b[key];
    if (x === y) return 0;
    if (x === undefined || x === null) return 1;
    if (y === undefined || y === null) return -1;
    const c = typeof x === 'number' && typeof y === 'number' ? x - y : String(x).localeCompare(String(y), 'en', { numeric: true });
    return desc ? -c : c;
  });
}

export async function markEdited(cfg) {
  if (cfg.markEdited) await upsert('meta', { key: `adminEdited:${cfg.collection}` }, { at: new Date() });
}

// ---------- routes ----------
export function mountCrud(router, { requireAuth, requirePerm }) {
  const cfgFor = (req) => {
    const cfg = RESOURCES_CONFIG[req.params.resource];
    if (!cfg) throw new HttpError(404, 'Unknown section');
    return cfg;
  };
  const perm = (mode) => (req, res, next) => {
    try { const cfg = cfgFor(req); return requirePerm(`${cfg.perm}:${mode}`)(req, res, next); } catch (e) { next(e); }
  };

  router.get('/r/:resource', requireAuth, perm('read'), async (req, res) => {
    const cfg = cfgFor(req);
    const filter = {};
    for (const f of cfg.filters || []) {
      const v = req.query[f];
      if (v === undefined || v === '') continue;
      const def = cfg.fields[f];
      filter[f] = def?.type === 'number' ? Number(v) : def?.type === 'boolean' ? v === 'true' : String(v);
    }
    let rows = await find(cfg.collection, filter);
    const q = String(req.query.q || '').trim().toLowerCase();
    if (q) rows = rows.filter((r) => (cfg.search || []).some((f) => String(r[f] ?? '').toLowerCase().includes(q)));
    rows = sortRows(rows, String(req.query.sort || cfg.sort || ''));
    const total = rows.length;
    const limit = Math.min(Math.max(Number(req.query.limit) || 25, 1), 200);
    const page = Math.max(Number(req.query.page) || 1, 1);
    const pageRows = rows.slice((page - 1) * limit, page * limit).map((r) => ({ ...r, _key: encodeKey(cfg, r) }));
    res.json({ rows: pageRows, total, page, limit });
  });

  router.get('/r/:resource/:key', requireAuth, perm('read'), async (req, res) => {
    const cfg = cfgFor(req);
    const [doc] = await find(cfg.collection, decodeKey(cfg, req.params.key));
    if (!doc) throw new HttpError(404, 'Not found');
    res.json({ item: { ...doc, _key: encodeKey(cfg, doc) } });
  });

  router.post('/r/:resource', requireAuth, perm('write'), async (req, res) => {
    const cfg = cfgFor(req);
    if (cfg.readOnly || cfg.noCreate) throw new HttpError(405, 'Items cannot be created here');
    let doc = validate(cfg, req.body || {}, { partial: false });
    if (cfg.beforeCreate) doc = cfg.beforeCreate(doc);
    const problem = cfg.validate?.(doc);
    if (problem) throw new HttpError(400, problem);
    const keyFilter = Object.fromEntries(cfg.keyFields.map((f) => [f, doc[f]]));
    if (cfg.keyFields.some((f) => doc[f] === undefined || doc[f] === '' || doc[f] === null)) throw new HttpError(400, `${cfg.keyFields.join(', ')} required`);
    if ((await find(cfg.collection, keyFilter)).length) throw new HttpError(409, 'An item with the same key already exists');
    for (const f of cfg.unique || []) if ((await find(cfg.collection, { [f]: doc[f] })).length) throw new HttpError(409, `${cfg.fields[f]?.label || f} "${doc[f]}" already exists`);
    await insertOne(cfg.collection, { ...doc, createdAt: doc.createdAt || new Date(), createdBy: req.user.email });
    await markEdited(cfg);
    await logActivity(req, 'create', cfg.label, Object.values(keyFilter).join(' / '), doc.name || doc.title || doc.chapterName || doc.unitName || doc.question || '');
    res.status(201).json({ item: { ...doc, _key: encodeKey(cfg, doc) } });
  });

  router.put('/r/:resource/:key', requireAuth, perm('write'), async (req, res) => {
    const cfg = cfgFor(req);
    if (cfg.readOnly) throw new HttpError(405, 'This section is read-only');
    const keyFilter = decodeKey(cfg, req.params.key);
    const [existing] = await find(cfg.collection, keyFilter);
    if (!existing) throw new HttpError(404, 'Not found');
    const body = { ...(req.body || {}) };
    for (const [f, def] of Object.entries(cfg.fields)) if (def.immutable || cfg.keyFields.includes(f)) delete body[f];
    const changes = validate(cfg, body, { partial: true });
    const problem = cfg.validate?.({ ...existing, ...changes });
    if (problem) throw new HttpError(400, problem);
    await upsert(cfg.collection, keyFilter, { ...changes, updatedAt: new Date(), updatedBy: req.user.email }, { insert: false });
    await markEdited(cfg);
    await logActivity(req, 'update', cfg.label, Object.values(keyFilter).join(' / '), `Changed: ${Object.keys(changes).join(', ') || 'nothing'}`);
    const [doc] = await find(cfg.collection, keyFilter);
    res.json({ item: { ...doc, _key: encodeKey(cfg, doc) } });
  });

  router.delete('/r/:resource/:key', requireAuth, perm('write'), async (req, res) => {
    const cfg = cfgFor(req);
    if (cfg.noDelete) throw new HttpError(405, 'Items here cannot be deleted');
    const keyFilter = decodeKey(cfg, req.params.key);
    const [existing] = await find(cfg.collection, keyFilter);
    if (!existing) throw new HttpError(404, 'Not found');
    await remove(cfg.collection, keyFilter);
    if (cfg.cascade) for (const [col, f] of cfg.cascade(existing.id)) await remove(col, f);
    await markEdited(cfg);
    await logActivity(req, 'delete', cfg.label, Object.values(keyFilter).join(' / '), existing.name || existing.title || existing.chapterName || existing.question || '');
    res.json({ ok: true });
  });
}

export { hasPerm };
