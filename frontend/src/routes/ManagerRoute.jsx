import { lazy, Suspense } from 'react';
import { Navigate, Route } from 'react-router-dom';
import ManagerLayout from '../layouts/ManagerLayout';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import { ProfileSkeleton } from '../components/common/Skeleton';
import NotFound from '../pages/NotFound';

const Activity = lazy(() => import('../pages/manager/Activity'));
const Coaching = lazy(() => import('../pages/manager/Coaching'));
const Contact = lazy(() => import('../pages/manager/Contact'));
const Dashboard = lazy(() => import('../pages/manager/Dashboard'));
const GlobalPricing = lazy(() => import('../pages/manager/GlobalPricing'));
const Notices = lazy(() => import('../pages/manager/Notices'));
const Partners = lazy(() => import('../pages/manager/Partners'));
const Pricing = lazy(() => import('../pages/manager/Pricing'));
const Profile = lazy(() => import('../pages/manager/Profile'));
const Settings = lazy(() => import('../pages/manager/Settings'));
const Schools = lazy(() => import('../pages/manager/Schools'));
const Users = lazy(() => import('../pages/manager/Users'));

const ManagerRoutes = () => (
  <Route element={<ProtectedRoute role="manager" />}>
    <Route path="/dashboard/manager" element={<ManagerLayout />}>
      <Route index element={<Navigate to="overview" replace />} />
      <Route path="overview" element={<Dashboard />} />
      <Route path="schools" element={<Schools />} />
      <Route path="coaching" element={<Coaching />} />
      <Route path="partners" element={<Partners />} />
      <Route path="pricing" element={<Pricing />} />
      <Route path="global-pricing" element={<GlobalPricing />} />
      <Route path="activity" element={<Activity />} />
      <Route path="notices" element={<Notices />} />
      <Route path="messages" element={<Contact />} />
      <Route path="users" element={<Users />} />
      <Route path="settings" element={<Settings />} />
      <Route 
        path="profile" 
        element={
          <Suspense fallback={<ProfileSkeleton />}>
            <Profile />
          </Suspense>
        } 
      />
      <Route path="*" element={<NotFound />} />
    </Route>
  </Route>
);

export default ManagerRoutes;
