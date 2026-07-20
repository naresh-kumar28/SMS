import { Navigate, Route } from 'react-router-dom';
import CoachingTeacherLayout from '../layouts/CoachingTeacherLayout';
import CoachingTeacherDashboard from '../pages/coaching/teacher/Dashboard';
import CoachingTeacherCourses from '../pages/coaching/teacher/Courses';
import CoachingTeacherStudents from '../pages/coaching/teacher/Students';
import CoachingTeacherAttendance from '../pages/coaching/teacher/Attendance';
import CoachingTeacherAssignments from '../pages/coaching/teacher/Assignments';
import CoachingTeacherNotes from '../pages/coaching/teacher/Notes';
import CoachingTeacherMarks from '../pages/coaching/teacher/Marks';
import CoachingTeacherSchedule from '../pages/coaching/teacher/Schedule';
import CoachingTeacherNotices from '../pages/coaching/teacher/Notices';
import CoachingTeacherProfile from '../pages/coaching/teacher/Profile';

import ProtectedRoute from '../components/auth/ProtectedRoute';

const CoachingTeacherRoutes = () => (
  <Route element={<ProtectedRoute role="teacher" allowedType="COACHING" requiredRole="TEACHER" />}>
    <Route path="/dashboard/coaching-teacher" element={<CoachingTeacherLayout />}>
      <Route index element={<Navigate to="dashboard" replace />} />
      <Route path="dashboard" element={<CoachingTeacherDashboard />} />
      <Route path="courses" element={<CoachingTeacherCourses />} />
      <Route path="students" element={<CoachingTeacherStudents />} />
      <Route path="attendance" element={<CoachingTeacherAttendance />} />
      <Route path="assignments" element={<CoachingTeacherAssignments />} />
      <Route path="notes" element={<CoachingTeacherNotes />} />
      <Route path="marks" element={<CoachingTeacherMarks />} />
      <Route path="results" element={<CoachingTeacherMarks />} />
      <Route path="schedule" element={<CoachingTeacherSchedule />} />
      <Route path="notices" element={<CoachingTeacherNotices />} />
      <Route path="messages" element={<CoachingTeacherNotices />} />
      <Route path="profile" element={<CoachingTeacherProfile />} />
    </Route>
  </Route>
);

export default CoachingTeacherRoutes;