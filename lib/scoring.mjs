// Best Subject Test ka result nikalna
const SUBJECTS = ['Maths', 'Science', 'English', 'SST', 'Reasoning'];
const STREAM_OF_SUBJECT = { Maths: 'PCM', Science: 'PCB', English: 'Arts', SST: 'Arts', Reasoning: 'PCM', Accounts: 'Commerce' };

export function scoreAptitude(questions, answers) {
  const correct = Object.fromEntries(SUBJECTS.map((s) => [s, 0]));
  const total = Object.fromEntries(SUBJECTS.map((s) => [s, 0]));
  const interest = { PCM: 0, PCB: 0, Commerce: 0, Arts: 0 };

  for (const q of questions) {
    const ans = answers[q.qid];
    if (q.subject === 'Interest') {
      const i = q.options.indexOf(ans);
      if (i >= 0) interest[q.optionStreams[i]] += 1;
      continue;
    }
    if (!(q.subject in total)) continue;
    total[q.subject] += 1;
    if (ans === q.correctAnswer) correct[q.subject] += 1;
  }

  const pct = (s) => (total[s] ? Math.round((correct[s] / total[s]) * 100) : 0);
  const scores = Object.fromEntries(SUBJECTS.map((s) => [s, pct(s)]));
  // There is no separate Accounts test - estimate it from Maths + Reasoning (numbers + logic)
  scores.Accounts = Math.round((scores.Maths + scores.Reasoning) / 2);

  const ranked = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const bestSubject = ranked[0][0];

  // Stream score = subject strength + interest
  const streamScore = {
    PCM: scores.Maths * 0.5 + scores.Science * 0.25 + scores.Reasoning * 0.25,
    PCB: scores.Science * 0.6 + scores.English * 0.2 + scores.Reasoning * 0.2,
    Commerce: scores.Maths * 0.4 + scores.Reasoning * 0.3 + scores.English * 0.3,
    Arts: scores.SST * 0.5 + scores.English * 0.5,
  };
  for (const s in streamScore) streamScore[s] = Math.round(streamScore[s] + interest[s] * 10);
  const recommendedStream = Object.entries(streamScore).sort((a, b) => b[1] - a[1])[0][0];

  return {
    mathsScore: scores.Maths,
    scienceScore: scores.Science,
    englishScore: scores.English,
    sstScore: scores.SST,
    reasoningScore: scores.Reasoning,
    accountsScore: scores.Accounts,
    scores,
    bestSubject,
    secondSubject: ranked[1][0],
    interest,
    streamScore,
    recommendedStream,
    bestSubjectStream: STREAM_OF_SUBJECT[bestSubject],
  };
}
