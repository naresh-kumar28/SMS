import { lazy } from 'react';
import { Navigate, Route } from 'react-router-dom';
import StudentLayout from '../layouts/StudentLayout';

const SchoolStudentDashboard = lazy(() => import('../pages/school/student/Dashboard'));
const SchoolStudentProfile = lazy(() => import('../pages/school/student/Profile'));
const SchoolStudentAttendance = lazy(() => import('../pages/school/student/Attendance'));
const SchoolStudentAssignments = lazy(() => import('../pages/school/student/Assignments'));
const SchoolStudentNotes = lazy(() => import('../pages/school/student/Notes'));
const SchoolStudentResults = lazy(() => import('../pages/school/student/Results'));
const SchoolStudentTimetable = lazy(() => import('../pages/school/student/Timetable'));
const SchoolStudentFees = lazy(() => import('../pages/school/student/Payments'));
const SchoolStudentNotices = lazy(() => import('../pages/school/student/Notices'));
const SchoolStudentMessages = lazy(() => import('../pages/school/student/Messages'));

import ProtectedRoute from '../components/auth/ProtectedRoute';

const SchoolStudentRoutes = () => (
  <Route element={<ProtectedRoute role="student" allowedType="SCHOOL" requiredRole="STUDENT" />}>
    <Route path="/dashboard/school-student" element={<StudentLayout />}>
      <Route index element={<Navigate to="dashboard" replace />} />
      <Route path="dashboard" element={<SchoolStudentDashboard />} />
      <Route path="profile" element={<SchoolStudentProfile />} />
      <Route path="attendance" element={<SchoolStudentAttendance />} />
      <Route path="assignments" element={<SchoolStudentAssignments />} />
      <Route path="notes" element={<SchoolStudentNotes />} />
      <Route path="results" element={<SchoolStudentResults />} />
      <Route path="timetable" element={<SchoolStudentTimetable />} />
      <Route path="fees" element={<SchoolStudentFees />} />
      <Route path="notices" element={<SchoolStudentNotices />} />
      <Route path="messages" element={<SchoolStudentMessages />} />
    </Route>
  </Route>
);

export default SchoolStudentRoutes;