import { Navigate, Route } from 'react-router-dom';
import CoachingStudentLayout from '../layouts/CoachingStudentLayout';
import CoachingStudentDashboard from '../pages/coaching/student/Dashboard';
import CoachingStudentCourses from '../pages/coaching/student/Courses';
import CoachingStudentAttendance from '../pages/coaching/student/Attendance';
import CoachingStudentAssignments from '../pages/coaching/student/Assignments';
import CoachingStudentNotes from '../pages/coaching/student/Notes';
import CoachingStudentResults from '../pages/coaching/student/Results';
import CoachingStudentSchedule from '../pages/coaching/student/Schedule';
import CoachingStudentPayments from '../pages/coaching/student/Payments';
import CoachingStudentNotices from '../pages/coaching/student/Notices';
import CoachingStudentMessages from '../pages/coaching/student/Messages';
import CoachingStudentProfile from '../pages/coaching/student/Profile';
import ProtectedRoute from '../components/auth/ProtectedRoute';

const CoachingStudentRoutes = () => (
  <Route element={<ProtectedRoute role="student" allowedType="COACHING" requiredRole="STUDENT" />}>
    <Route path="/dashboard/coaching-student" element={<CoachingStudentLayout />}>
      <Route index element={<Navigate to="dashboard" replace />} />
      <Route path="dashboard" element={<CoachingStudentDashboard />} />
      <Route path="courses" element={<CoachingStudentCourses />} />
      <Route path="attendance" element={<CoachingStudentAttendance />} />
      <Route path="assignments" element={<CoachingStudentAssignments />} />
      <Route path="notes" element={<CoachingStudentNotes />} />
      <Route path="results" element={<CoachingStudentResults />} />
      <Route path="schedule" element={<CoachingStudentSchedule />} />
      <Route path="payments" element={<CoachingStudentPayments />} />
      <Route path="notices" element={<CoachingStudentNotices />} />
      <Route path="messages" element={<CoachingStudentMessages />} />
      <Route path="profile" element={<CoachingStudentProfile />} />
    </Route>
  </Route>
);

export default CoachingStudentRoutes;