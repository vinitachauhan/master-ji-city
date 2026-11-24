// MongoDB connection + auto seed. If MongoDB is not reachable, the app runs on built-in (in-memory) data.
import { MongoClient } from 'mongodb';
import { buildSeed } from './seed.mjs';
import { buildSchoolDemo, SCHOOL_COLLECTIONS } from './schoolDemo.mjs';

const URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017';
const DB_NAME = process.env.MONGODB_DB || 'master_ji_city_complete';
const RETRY_MS = 30_000;

const state = globalThis.__masterJi || (globalThis.__masterJi = { db: null, connecting: null, failedAt: 0, mem: null, warned: false });

async function ensureSeed(db) {
  const seed = buildSeed();
  for (const [name, docs] of Object.entries(seed)) {
    const col = db.collection(name);
    if ((await col.estimatedDocumentCount()) === 0 && docs.length) await col.insertMany(docs);
  }
  const meta = db.collection('meta');
  // New chapters / units added to the built-in content are inserted into an existing database too.
  // Only missing ones are added (by key) - existing and Admin-edited records are never changed.
  // Runs once per content size, so a chapter deleted in the Admin Panel does not keep coming back.
  const TOP_UP = { study_1_8: ['class', 'subject', 'chapterNo'], study_9_12: ['class', 'subject', 'chapterNo'], collegeStudy: ['course', 'semester', 'subject', 'unitNo'] };
  for (const [name, fields] of Object.entries(TOP_UP)) {
    const docs = seed[name] || [];
    const marker = `contentTopUp:${name}:${docs.length}`;
    if (!docs.length || (await meta.findOne({ key: marker }))) continue;
    const keyOf = (d) => fields.map((f) => d[f]).join('|');
    const have = new Set((await db.collection(name).find({}, { projection: Object.fromEntries(fields.map((f) => [f, 1])) }).toArray()).map(keyOf));
    const missing = docs.filter((d) => !have.has(keyOf(d)));
    if (missing.length) await db.collection(name).insertMany(missing);
    await meta.insertOne({ key: marker, added: missing.length, at: new Date() });
  }
  // School demo data is added only once (a marker in `meta` stops it coming back after a reset).
  if (!(await meta.findOne({ key: 'schoolDemoSeeded' }))) {
    for (const [name, docs] of Object.entries(buildSchoolDemo())) {
      if (docs.length && (await db.collection(name).estimatedDocumentCount()) === 0) await db.collection(name).insertMany(docs);
    }
    await meta.insertOne({ key: 'schoolDemoSeeded', at: new Date() });
  }
  await Promise.all([
    db.collection('study_1_8').createIndex({ class: 1, subject: 1, chapterNo: 1 }),
    db.collection('study_9_12').createIndex({ class: 1, subject: 1, chapterNo: 1 }),
    db.collection('collegeStudy').createIndex({ course: 1, semester: 1, subject: 1, unitNo: 1 }),
    db.collection('colleges').createIndex({ stream: 1 }),
    db.collection('stars').createIndex({ stars: -1 }),
    db.collection('results').createIndex({ createdAt: -1 }),
    db.collection('attendance').createIndex({ date: 1, personType: 1, personId: 1 }, { unique: true }),
    db.collection('salaryPayments').createIndex({ staffId: 1, month: 1 }, { unique: true }),
    db.collection('feePayments').createIndex({ studentId: 1, month: 1 }, { unique: true }),
    db.collection('activityPayments').createIndex({ activityId: 1, studentId: 1 }, { unique: true }),
    db.collection('students').createIndex({ id: 1 }, { unique: true }),
    db.collection('staff').createIndex({ id: 1 }, { unique: true }),
  ]);
}

export async function getDb() {
  if (state.db) return state.db;
  if (Date.now() - state.failedAt < RETRY_MS) return null;
  if (!state.connecting) {
    state.connecting = (async () => {
      try {
        const client = new MongoClient(URI, { serverSelectionTimeoutMS: 2500 });
        await client.connect();
        const db = client.db(DB_NAME);
        await ensureSeed(db);
        state.db = db;
        return db;
      } catch (err) {
        state.failedAt = Date.now();
        if (!state.warned) {
          console.warn(`[Master Ji] MongoDB not reachable (${err.message}). Running on built-in data.`);
          state.warned = true;
        }
        return null;
      } finally {
        state.connecting = null;
      }
    })();
  }
  return state.connecting;
}

// Built-in mode. Study content is rebuilt whenever this module reloads (so edits to the data files show up
// after a dev hot-reload or restart); data people create (results, stars, school records...) lives in
// globalThis so it survives hot reloads.
let seedCache = null;
function col(name) {
  if (!seedCache) seedCache = buildSeed();
  if (name in seedCache) return seedCache[name];
  if (!state.userMem) {
    state.userMem = { results: [], stars: [], ...buildSchoolDemo() };
    for (const c of SCHOOL_COLLECTIONS) state.userMem[c] ||= [];
  }
  return (state.userMem[name] ||= []);
}

const matchValue = (val, cond) => {
  if (cond && typeof cond === 'object' && !Array.isArray(cond) && !(cond instanceof Date)) {
    if ('$gte' in cond && !(val >= cond.$gte)) return false;
    if ('$lte' in cond && !(val <= cond.$lte)) return false;
    if ('$in' in cond && !cond.$in.includes(val)) return false;
    if ('$exists' in cond && (val !== undefined) !== cond.$exists) return false;
    if ('$ne' in cond && val === cond.$ne) return false;
    return true;
  }
  return val === cond;
};
const matches = (doc, filter) => Object.entries(filter).every(([k, v]) => matchValue(doc[k], v));

export async function find(name, filter = {}, { sort, limit, projection } = {}) {
  const db = await getDb();
  if (db) {
    let cur = db.collection(name).find(filter, { projection: { _id: 0, ...(projection || {}) } });
    if (sort) cur = cur.sort(sort);
    if (limit) cur = cur.limit(limit);
    return cur.toArray();
  }
  let rows = col(name).filter((d) => matches(d, filter));
  if (sort) {
    const [[key, dir]] = Object.entries(sort);
    rows = [...rows].sort((a, b) => (a[key] > b[key] ? dir : a[key] < b[key] ? -dir : 0));
  }
  if (limit) rows = rows.slice(0, limit);
  if (projection) {
    const hide = Object.keys(projection).filter((k) => projection[k] === 0);
    rows = rows.map((d) => { const c = { ...d }; hide.forEach((k) => delete c[k]); return c; });
  }
  return rows.map(({ _id, ...rest }) => rest);
}

export async function insertOne(name, doc) {
  const db = await getDb();
  if (db) { await db.collection(name).insertOne({ ...doc }); return; }
  col(name).push({ ...doc });
}

// Update the first matching document; insert it if missing and upsert=true.
export async function upsert(name, filter, set, { insert = true } = {}) {
  const db = await getDb();
  if (db) {
    const r = await db.collection(name).updateOne(filter, { $set: set }, { upsert: insert });
    return r.matchedCount > 0 || r.upsertedCount > 0;
  }
  const rows = col(name);
  const row = rows.find((r) => matches(r, filter));
  if (row) { Object.assign(row, set); return true; }
  if (insert) { rows.push({ ...filter, ...set }); return true; }
  return false;
}

export async function remove(name, filter) {
  const db = await getDb();
  if (db) return (await db.collection(name).deleteMany(filter)).deletedCount;
  const rows = col(name);
  const keep = rows.filter((r) => !matches(r, filter));
  const n = rows.length - keep.length;
  rows.splice(0, rows.length, ...keep);
  return n;
}

export async function addStars({ name, cls, city, add }) {
  const key = { name, class: cls, city };
  const db = await getDb();
  if (db) {
    await db.collection('stars').updateOne(key, { $inc: { stars: add }, $set: { updatedAt: new Date() } }, { upsert: true });
    return;
  }
  const rows = col('stars');
  const row = rows.find((r) => matches(r, key));
  if (row) row.stars += add; else rows.push({ ...key, stars: add, updatedAt: new Date() });
}

export async function source() {
  return (await getDb()) ? 'mongodb' : 'built-in';
}
