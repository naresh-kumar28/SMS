import { lazy } from 'react';
import { Navigate, Route } from 'react-router-dom';
import SchoolLayout from '../layouts/SchoolLayout';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import NotFound from '../pages/NotFound';

const Applications = lazy(() => import('../pages/school/Applications'));
const Assignments = lazy(() => import('../pages/school/Assignments'));
const Attendance = lazy(() => import('../pages/school/Attendance'));
const Classes = lazy(() => import('../pages/school/Classes'));
const Dashboard = lazy(() => import('../pages/school/Dashboard'));
const Fees = lazy(() => import('../pages/school/Fees'));
const Notices = lazy(() => import('../pages/school/Notices'));
const Notifications = lazy(() => import('../pages/school/Notifications'));
const Reports = lazy(() => import('../pages/school/Reports'));
const Results = lazy(() => import('../pages/school/Results'));
const Settings = lazy(() => import('../pages/school/Settings'));
const Students = lazy(() => import('../pages/school/Students'));
const Teachers = lazy(() => import('../pages/school/Teachers'));
const Profile = lazy(() => import('../pages/school/Profile'));

const SchoolRoutes = () => (
  <Route element={<ProtectedRoute allowedType="SCHOOL" />}>
    <Route path="/dashboard/school" element={<SchoolLayout />}>
      <Route index element={<Navigate to="overview" replace />} />
      <Route path="overview" element={<Dashboard />} />
      <Route path="students" element={<Students />} />
      <Route path="teachers" element={<Teachers />} />
      <Route path="classes" element={<Classes />} />
      <Route path="attendance" element={<Attendance />} />
      <Route path="notices" element={<Notices />} />
      <Route path="notifications" element={<Notifications />} />
      <Route path="assignments" element={<Assignments />} />
      <Route path="results" element={<Results />} />
      <Route path="fees" element={<Fees />} />
      <Route path="applications" element={<Applications />} />
      <Route path="reports" element={<Reports />} />
      <Route path="settings" element={<Settings />} />
      <Route path="profile" element={<Profile />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  </Route>
);

export default SchoolRoutes;