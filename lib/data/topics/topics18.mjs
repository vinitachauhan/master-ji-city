// Textbook topics for Class 1-8, by class and chapter name: [topic title, explanation].
// Written as "Topic title:: explanation" in the subject files.
import { MATHS_TOPICS } from './maths18.mjs';
import { SCIENCE_TOPICS } from './science18.mjs';
import { SST_TOPICS } from './sst18.mjs';

export const toPairs = (lines) => lines.map((l) => { const i = l.indexOf(':: '); return [l.slice(0, i).trim(), l.slice(i + 3).trim()]; });
export function mergeByClass(...groups) {
  const out = {};
  for (const g of groups) for (const [cls, chapters] of Object.entries(g)) {
    out[cls] = out[cls] || {};
    for (const [name, lines] of Object.entries(chapters)) out[cls][name] = toPairs(lines);
  }
  return out;
}
export const TOPICS_18 = mergeByClass(MATHS_TOPICS, SCIENCE_TOPICS, SST_TOPICS);
