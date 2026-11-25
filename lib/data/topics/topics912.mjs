// Textbook topics for Class 9 - 12, by class and chapter name: [topic title, explanation].
import { mergeByClass } from './topics18.mjs';
import { TOPICS_9_10 } from './sci910.mjs';
import { TOPICS_11_12 } from './sci1112.mjs';

export const TOPICS_912 = mergeByClass(TOPICS_9_10, TOPICS_11_12);
