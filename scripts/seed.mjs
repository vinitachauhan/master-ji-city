// npm run seed -> reloads the default study data into MongoDB (deletes the old default data first).
// Does NOT touch results, stars, School Management or Admin Panel collections,
// and skips study content that was edited in the Admin Panel (unless run with --force).
import { readFileSync, existsSync } from 'node:fs';
import { MongoClient } from 'mongodb';
import { buildSeed } from '../lib/seed.mjs';

if (existsSync('.env.local')) {
  for (const line of readFileSync('.env.local', 'utf8').split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
  }
}

const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017';
const dbName = process.env.MONGODB_DB || 'master_ji_city_complete';
const client = new MongoClient(uri, { serverSelectionTimeoutMS: 5000 });

try {
  await client.connect();
  const db = client.db(dbName);
  const force = process.argv.includes('--force');
  for (const [name, docs] of Object.entries(buildSeed())) {
    // Content edited in the Admin Panel is kept unless you pass --force
    const edited = await db.collection('meta').findOne({ key: `adminEdited:${name}` });
    if (edited && !force) {
      console.log(`⏭ ${name}: skipped - edited in the Admin Panel (use "npm run seed -- --force" to overwrite those edits)`);
      continue;
    }
    await db.collection(name).deleteMany({});
    await db.collection(name).insertMany(docs);
    if (edited) await db.collection('meta').deleteOne({ key: `adminEdited:${name}` });
    console.log(`✔ ${name}: ${docs.length} documents`);
  }
  console.log(`\nDatabase "${dbName}" ready!`);
} catch (err) {
  console.error('Could not connect to MongoDB:', err.message);
  process.exitCode = 1;
} finally {
  await client.close();
}
