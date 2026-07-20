import { lazy } from 'react';
import { Navigate, Route } from 'react-router-dom';
import CoachingLayout from '../layouts/CoachingLayout';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import NotFound from '../pages/NotFound';

const Applications = lazy(() => import('../pages/coaching/Applications'));
const Attendance = lazy(() => import('../pages/coaching/Attendance'));
const Content = lazy(() => import('../pages/coaching/Content'));
const Courses = lazy(() => import('../pages/coaching/Courses'));
const Dashboard = lazy(() => import('../pages/coaching/Dashboard'));
const Notices = lazy(() => import('../pages/coaching/Notices'));
const Payments = lazy(() => import('../pages/coaching/Payments'));
const Profile = lazy(() => import('../pages/coaching/Profile'));
const Results = lazy(() => import('../pages/coaching/Results'));
const Schedule = lazy(() => import('../pages/coaching/Schedule'));
const Settings = lazy(() => import('../pages/coaching/Settings'));
const Students = lazy(() => import('../pages/coaching/Students'));
const Subscriptions = lazy(() => import('../pages/coaching/Subscriptions'));
const Teachers = lazy(() => import('../pages/coaching/Teachers'));
const Batches = lazy(() => import('../pages/coaching/Batches'));
const Reports = lazy(() => import('../pages/coaching/Reports'));

const CoachingRoutes = () => (
  <Route element={<ProtectedRoute allowedType="COACHING" />}>
    <Route path="/dashboard/coaching" element={<CoachingLayout />}>
      <Route index element={<Navigate to="overview" replace />} />
      <Route path="overview" element={<Dashboard />} />
      <Route path="profile" element={<Profile />} />
      <Route path="notices" element={<Notices />} />
      <Route path="students" element={<Students />} />
      <Route path="teachers" element={<Teachers />} />
      <Route path="courses" element={<Courses />} />
      <Route path="batches" element={<Batches />} />
      <Route path="attendance" element={<Attendance />} />
      <Route path="schedule" element={<Schedule />} />
      <Route path="content" element={<Content />} />
      <Route path="payments" element={<Payments />} />
      <Route path="subscriptions" element={<Subscriptions />} />
      <Route path="applications" element={<Applications />} />
      <Route path="results" element={<Results />} />
      <Route path="reports" element={<Reports />} />
      <Route path="settings" element={<Settings />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  </Route>
);

export default CoachingRoutes;