import { useState } from 'react';
import ResourcePage from '../ResourcePage';
import { PageHeader } from '../ui';

function TabbedResources({ title, subtitle, tabs, note }) {
  const [tab, setTab] = useState(tabs[0][0]);
  return (
    <div>
      <PageHeader title={title} subtitle={subtitle} />
      {note && <p className="mb-4 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">{note}</p>}
      <div className="mb-4 flex flex-wrap gap-1 rounded-xl bg-white p-1 shadow-sm" role="tablist">
        {tabs.map(([k, label]) => (
          <button key={k} role="tab" aria-selected={tab === k} onClick={() => setTab(k)}
            className={`rounded-lg px-4 py-2 text-sm font-semibold ${tab === k ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-100'}`}>{label}</button>
        ))}
      </div>
      <ResourcePage key={tab} resource={tab} embedded />
    </div>
  );
}

export const Materials = () => (
  <TabbedResources title="Study Materials" subtitle="Chapters, notes, examples, practice questions and chapter tests shown on the website."
    note="Changes here appear on the website straight away. Each chapter test is edited inside its chapter (Test questions)."
    tabs={[['materials18', '📒 Play School - Class 8'], ['materials912', '📘 Class 9 - 12'], ['materialsCollege', '🎓 College']]} />
);

export const Tests = () => (
  <TabbedResources title="Tests & Results" subtitle="Best Subject Test questions and every test result students have saved."
    note="Chapter tests and mock test questions come from the chapters - edit them in Study Materials."
    tabs={[['aptitude', '🧠 Best Subject Test questions'], ['mockResults', '📝 Mock Test results'], ['results', '📊 Best Subject results']]} />
);
