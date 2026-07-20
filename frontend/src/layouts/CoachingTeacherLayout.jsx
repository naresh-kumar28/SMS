import { useParams, Navigate } from 'react-router-dom';
import DashboardShell from '../components/layout/common/DashboardShell';
import CoachingTeacherSidebar from '../components/layout/coaching/teacher/CoachingTeacherSidebar';
import CoachingTeacherTopbar from '../components/layout/coaching/teacher/CoachingTeacherTopbar';
import {
  coachingTeacherNavItems,
  coachingTeacherSidebarContent,
} from './navigation/coachingTeacherNavigation';
import { useAuth } from '../hooks/api/useAuth';

export default function CoachingTeacherLayout() {
  const { teacherId: paramId } = useParams();
  const { user, logout, isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/auth/teacher/login" replace />;
  }

  const teacherId = paramId || user?.id;

  const teacher = {
    name: user?.first_name || user?.last_name 
      ? `${user.first_name || ''} ${user.last_name || ''}`.trim() 
      : 'Teacher',
    role: user?.subjects ? `${user.subjects} Teacher` : 'Teacher',
    avatar: user?.avatar || '',
  };

  const teacherHeader = {
    userName: teacher.name,
    userRole: teacher.role,
    userAvatar: teacher.avatar,
    searchPlaceholder: 'Search students, courses, assignments...',
    quickActions: [
      { icon: 'notifications', to: 'notices' },
      { icon: 'mail', to: 'messages' },
    ],
  };

  const teacherMainNavItems = [
    { label: 'Dashboard', icon: 'dashboard', to: 'dashboard' },
    { label: 'Courses', icon: 'school', to: 'courses' },
    { label: 'Students', icon: 'group', to: 'students' },
    { label: 'Marks', icon: 'grade', to: 'marks' },
  ];

  return (
    <DashboardShell
      topbar={<CoachingTeacherTopbar {...teacherHeader} />}
      sidebar={<CoachingTeacherSidebar {...coachingTeacherSidebarContent} navItems={coachingTeacherNavItems} userName={teacher.name} teacherId={teacherId} userRole={teacher.role} onLogout={logout} />}
      showBottomNav={true}
      context={{ user: teacher }}
      bottomNavItems={coachingTeacherNavItems}
      mainNavItems={teacherMainNavItems}
    />
  );
}