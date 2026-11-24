import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from './auth';
import Layout from './Layout';
import ResourcePage from './ResourcePage';
import { Spinner } from './ui';
import { Login, ChangePassword, Account } from './pages/Auth';
import { Dashboard, Reports } from './pages/Dashboard';
import { Users, Roles, Settings } from './pages/Access';
import { Materials, Tests } from './pages/Tabs';

function Guard({ perm, children }) {
  const { can } = useAuth();
  if (!can(perm)) return <div className="card text-center"><p className="text-4xl">🔒</p><p className="mt-2 font-semibold">You do not have access to this section.</p><p className="text-sm text-slate-500">Ask a Super Admin to give your role permission.</p></div>;
  return children;
}

const resourceRoutes = [
  ['students', 'students', 'Students', 'All students (the website’s School section uses the same list).'],
  ['teachers', 'teachers', 'Teachers & Staff', 'Teachers, staff and managers with their salaries.'],
  ['schools', 'schools', 'Schools', 'Schools and branches using Master Ji.'],
  ['classes', 'classes', 'Classes', 'Classes and their sections.'],
  ['subjects', 'subjects', 'Subjects', 'Subjects offered at each level.'],
  ['doubts', 'doubts', 'Doubts', 'Questions students asked the AI Doubt Solver. Review and correct answers here.'],
  ['certificates', 'certificates', 'Certificates', 'Topper certificates. Delete to revoke; add to issue one manually.'],
  ['notifications', 'notifications', 'Notifications', 'Announcements for the website banner and / or this admin panel.'],
  ['logs', 'logs', 'Activity Logs', 'Every sign-in and every change made in this panel.'],
];

export default function App() {
  const { user, meta } = useAuth();
  if (user === undefined) return <Spinner />;
  if (!user) return <Routes><Route path="*" element={<Login />} /></Routes>;
  if (user.mustChangePassword) return <Routes><Route path="*" element={<ChangePassword />} /></Routes>;
  if (!meta) return <Spinner />;
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Guard perm="dashboard:read"><Dashboard /></Guard>} />
        <Route path="reports" element={<Guard perm="reports:read"><Reports /></Guard>} />
        <Route path="users" element={<Guard perm="users:read"><Users /></Guard>} />
        <Route path="roles" element={<Guard perm="roles:read"><Roles /></Guard>} />
        <Route path="settings" element={<Guard perm="settings:read"><Settings /></Guard>} />
        <Route path="materials" element={<Guard perm="materials:read"><Materials /></Guard>} />
        <Route path="tests" element={<Guard perm="tests:read"><Tests /></Guard>} />
        {resourceRoutes.map(([path, res, title, subtitle]) => (
          <Route key={path} path={path} element={<Guard perm={`${meta.resources[res].perm}:read`}><ResourcePage resource={res} title={title} subtitle={subtitle} /></Guard>} />
        ))}
        <Route path="account" element={<Account />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
