import { lazy, Suspense } from 'react';
import { Navigate, Route } from 'react-router-dom';
import PartnerLayout from '../layouts/PartnerLayout';
import { ProfileSkeleton } from '../components/common/Skeleton';
import NotFound from '../pages/NotFound';

const PartnerDashboard = lazy(() => import('../pages/partner/Dashboard'));
const PartnerSchools = lazy(() => import('../pages/partner/Schools'));
const PartnerCoaching = lazy(() => import('../pages/partner/Coaching'));
const PartnerPricing = lazy(() => import('../pages/partner/Pricing'));
const PartnerActivity = lazy(() => import('../pages/partner/Activity'));
const PartnerNotices = lazy(() => import('../pages/partner/Notices'));
const PartnerMessages = lazy(() => import('../pages/partner/Messages'));
const PartnerStudents = lazy(() => import('../pages/partner/Students'));
const PartnerSettings = lazy(() => import('../pages/partner/Settings'));
const PartnerProfile = lazy(() => import('../pages/partner/Profile'));

import ProtectedRoute from '../components/auth/ProtectedRoute';

const PartnerRoutes = () => (
  <Route element={<ProtectedRoute role="partner" />}>
    <Route path="/dashboard/partner" element={<PartnerLayout />}>
    <Route index element={<Navigate to="overview" replace />} />
    <Route path="overview" element={<PartnerDashboard />} />
    <Route path="schools" element={<PartnerSchools />} />
    <Route path="coaching" element={<PartnerCoaching />} />
    <Route path="pricing" element={<PartnerPricing />} />
    <Route path="activity" element={<PartnerActivity />} />
    <Route path="notices" element={<PartnerNotices />} />
    <Route path="messages" element={<PartnerMessages />} />
    <Route path="students" element={<PartnerStudents />} />
    <Route path="settings" element={<PartnerSettings />} />
    <Route 
      path="profile" 
      element={
        <Suspense fallback={<ProfileSkeleton />}>
          <PartnerProfile />
        </Suspense>
      } 
    />
    <Route path="*" element={<NotFound />} />
    </Route>
  </Route>
);

export default PartnerRoutes;
