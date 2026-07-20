import { lazy } from 'react';
import { Navigate, Route } from 'react-router-dom';
import TeacherLayout from '../layouts/TeacherLayout';

import ProtectedRoute from '../components/auth/ProtectedRoute';

const SchoolTeacherDashboard = lazy(() => import('../pages/school/teacher/Dashboard'));
const SchoolTeacherClasses = lazy(() => import('../pages/school/teacher/Classes'));
const SchoolTeacherStudents = lazy(() => import('../pages/school/teacher/Students'));
const SchoolTeacherAttendance = lazy(() => import('../pages/school/teacher/Attendance'));
const SchoolTeacherAssignments = lazy(() => import('../pages/school/teacher/Assignments'));
const SchoolTeacherNotes = lazy(() => import('../pages/school/teacher/Notes'));
const SchoolTeacherMarks = lazy(() => import('../pages/school/teacher/Marks'));
const SchoolTeacherNotices = lazy(() => import('../pages/school/teacher/Notices'));
const SchoolTeacherMessages = lazy(() => import('../pages/school/teacher/Messages'));
const SchoolTeacherProfile = lazy(() => import('../pages/school/teacher/Profile'));

const SchoolTeacherRoutes = () => (
  <Route element={<ProtectedRoute role="teacher" allowedType="SCHOOL" requiredRole="TEACHER" />}>
    <Route path="/dashboard/school-teacher" element={<TeacherLayout />}>
      <Route index element={<Navigate to="dashboard" replace />} />
      <Route path="dashboard" element={<SchoolTeacherDashboard />} />
      <Route path="my-classes" element={<SchoolTeacherClasses />} />
      <Route path="my-students" element={<SchoolTeacherStudents />} />
      <Route path="attendance" element={<SchoolTeacherAttendance />} />
      <Route path="assignments" element={<SchoolTeacherAssignments />} />
      <Route path="notes" element={<SchoolTeacherNotes />} />
      <Route path="marks" element={<SchoolTeacherMarks />} />
      <Route path="notices" element={<SchoolTeacherNotices />} />
      <Route path="messages" element={<SchoolTeacherMessages />} />
      <Route path="profile" element={<SchoolTeacherProfile />} />
    </Route>
  </Route>
);

export default SchoolTeacherRoutes;