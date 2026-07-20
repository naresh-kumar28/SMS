import { useParams, Navigate } from 'react-router-dom';
import DashboardShell from '../components/layout/common/DashboardShell';
import StudentSidebar from '../components/layout/school/student/SchoolStudentSidebar';
import StudentTopbar from '../components/layout/school/student/SchoolStudentTopbar';
import {
  studentNavItems,
  studentSidebarContent,
} from './navigation/studentNavigation';
import { useAuth } from '../hooks/api/useAuth';

export default function StudentLayout() {
  const { studentId } = useParams();
  const { user, logout, isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/auth/student/login" replace />;
  }

  const student = {
    name: user?.first_name || user?.last_name 
      ? `${user.first_name || ''} ${user.last_name || ''}`.trim() 
      : 'Student',
    role: user?.student_profile?.class_name || 'Student',
    avatar: user?.avatar || '',
  };

  const studentHeader = {
    userName: student.name,
    userRole: student.role,
    userAvatar: student.avatar,
    searchPlaceholder: 'Search assignments, notes, results...',
    quickActions: [
      { icon: 'notifications', to: 'notices' },
      { icon: 'mail', to: 'messages' },
    ],
  };

  const studentMainNavItems = [
    { label: 'Home', icon: 'dashboard', to: '/dashboard/school-student/dashboard' },
    { label: 'Profile', icon: 'person', to: '/dashboard/school-student/profile' },
    { label: 'Attendance', icon: 'monitoring', to: '/dashboard/school-student/attendance' },
    { label: 'Results', icon: 'grade', to: '/dashboard/school-student/results' },
  ];

  return (
    <DashboardShell
      topbar={<StudentTopbar {...studentHeader} />}
      sidebar={<StudentSidebar {...studentSidebarContent} navItems={studentNavItems} userName={student.name} studentId={studentId} userRole={student.role} onLogout={logout} />}
      showBottomNav={true}
      context={{ user: student }}
      bottomNavItems={studentNavItems}
      mainNavItems={studentMainNavItems}
    />
  );
}