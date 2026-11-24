import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api, fmtDate, inr } from '../api';
import { useAuth } from '../auth';
import { Bars, Columns, ErrorBox, PageHeader, Spinner, Stat } from '../ui';

export function Dashboard() {
  const { user, can } = useAuth();
  const [d, setD] = useState(null);
  const [error, setError] = useState('');
  useEffect(() => { api('/dashboard').then(setD).catch((e) => setError(e.message)); }, []);
  if (error) return <ErrorBox error={error} />;
  if (!d) return <Spinner />;
  const c = d.counts;
  const tiles = [
    ['students', 'Students', c.students, '🎒', '/students'], ['teachers', 'Teachers', c.teachers, '👩‍🏫', '/teachers'],
    ['schools', 'Schools', c.schools, '🏫', '/schools'], ['materials', 'Chapters (Play-12)', c.chapters, '📒', '/materials'],
    ['materials', 'College units', c.collegeUnits, '🎓', '/materials'], ['doubts', 'Doubts to review', c.doubtsToReview, '🤖', '/doubts'],
    ['tests', 'Mock tests taken', c.mockTests, '📝', '/tests'], ['certificates', 'Certificates issued', c.certificates, '🏆', '/certificates'],
  ].filter(([perm]) => can(`${perm}:read`));
  const attPct = d.attendanceToday.marked ? Math.round((d.attendanceToday.present / d.attendanceToday.marked) * 100) : null;
  return (
    <div>
      <PageHeader title={`Namaste, ${user.name} 👋`} subtitle="Here is what is happening across Master Ji today." />
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {tiles.map(([, label, value, icon, to]) => <Link key={label} to={to} className="block transition hover:-translate-y-0.5"><Stat label={label} value={value} icon={icon} /></Link>)}
      </div>
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {can('students:read') && (
          <div className="card">
            <h2 className="font-bold">Student attendance today</h2>
            <p className="mt-2 text-4xl font-extrabold tabular-nums text-green-700">{attPct === null ? '-' : `${attPct}%`}</p>
            <p className="text-sm text-slate-500">{d.attendanceToday.marked ? `${d.attendanceToday.present} present of ${d.attendanceToday.marked} marked (${d.attendanceToday.total} students)` : 'Attendance has not been marked yet today (marked in the website’s School section).'}</p>
          </div>
        )}
        {can('doubts:read') && (
          <div className="card"><h2 className="mb-3 font-bold">Doubts asked - last 7 days</h2><Columns data={d.doubtsLast7.map((x) => ({ label: x.day.slice(5), value: x.count }))} /></div>
        )}
      </div>
      {d.recentActivity.length > 0 && (
        <div className="card mt-6">
          <div className="mb-2 flex items-center justify-between"><h2 className="font-bold">Recent activity</h2><Link to="/logs" className="text-sm font-semibold text-indigo-700">All logs →</Link></div>
          <ul className="divide-y divide-slate-100">
            {d.recentActivity.map((l) => (
              <li key={l.id} className="flex flex-wrap items-baseline justify-between gap-2 py-2 text-sm">
                <span><b>{l.actorName}</b> · {l.action.replace('_', ' ')} · {l.entity}{l.entityKey ? ` · ${l.entityKey}` : ''}{l.summary ? <span className="text-slate-500"> - {l.summary}</span> : null}</span>
                <span className="text-xs text-slate-400">{fmtDate(l.at)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export function Reports() {
  const [r, setR] = useState(null);
  const [error, setError] = useState('');
  useEffect(() => { api('/reports').then(setR).catch((e) => setError(e.message)); }, []);
  if (error) return <ErrorBox error={error} />;
  if (!r) return <Spinner />;
  const fee = r.feesThisMonth;
  return (
    <div>
      <PageHeader title="Reports" subtitle="Live numbers from the website and the school records." />
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Stat label={`Fees collected (${fee.month})`} value={inr(fee.collected)} sub={`of ${inr(fee.expected)} · ${fee.paidStudents}/${fee.students} students`} icon="💰" />
        <Stat label="Attendance (last 30 days)" value={`${r.attendance30.presentPercent}%`} sub={`${r.attendance30.records} student records`} icon="✅" />
        <Stat label="Mock tests" value={r.mockBySubject.reduce((t, s) => t + s.attempts, 0)} icon="📝" />
        <Stat label="Best Subject tests" value={r.streams.reduce((t, s) => t + s.value, 0)} icon="📊" />
      </div>
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="card"><h2 className="mb-3 font-bold">Mock test - average score by subject</h2><Bars unit="%" data={r.mockBySubject.map((s) => ({ label: `${s.subject} (${s.attempts})`, value: s.avgPercent }))} /></div>
        <div className="card"><h2 className="mb-3 font-bold">Mock tests by class</h2><Bars data={r.mockByClass} /></div>
        <div className="card"><h2 className="mb-3 font-bold">Recommended streams (Best Subject Test)</h2><Bars data={r.streams} /></div>
        <div className="card"><h2 className="mb-3 font-bold">Best subjects</h2><Bars data={r.bestSubjects} /></div>
        <div className="card"><h2 className="mb-3 font-bold">Doubts - last 14 days</h2><Columns data={r.doubtsLast14} /></div>
        <div className="card"><h2 className="mb-3 font-bold">Doubts answered by</h2><Bars data={r.doubtsBySource} /></div>
      </div>
      <div className="card mt-6">
        <h2 className="mb-3 font-bold">⭐ Star leaderboard (top 10)</h2>
        {r.topStars.length === 0 ? <p className="text-sm text-slate-500">No stars yet.</p> : (
          <ol className="divide-y divide-slate-100">{r.topStars.map((s, i) => (
            <li key={`${s.name}-${i}`} className="flex justify-between py-2 text-sm"><span>{i + 1}. <b>{s.name}</b> <span className="text-slate-500">({s.class}, {s.city})</span></span><span className="font-bold tabular-nums">⭐ {s.stars}</span></li>
          ))}</ol>
        )}
      </div>
    </div>
  );
}
