import { useParams, Navigate } from 'react-router-dom';
import DashboardShell from '../components/layout/common/DashboardShell';
import TeacherSidebar from '../components/layout/school/teacher/SchoolTeacherSidebar';
import TeacherTopbar from '../components/layout/school/teacher/SchoolTeacherTopbar';
import {
  teacherNavItems,
  teacherSidebarContent,
} from './navigation/teacherNavigation';
import { useAuth } from '../hooks/api/useAuth';

export default function TeacherLayout() {
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
    role: user?.department ? `${user.department} Teacher` : 'Teacher',
    avatar: user?.avatar || '',
  };

  const teacherHeader = {
    userName: teacher.name,
    userRole: teacher.role,
    userAvatar: teacher.avatar,
    searchPlaceholder: 'Search students, classes, or subjects...',
    quickActions: [
      { icon: 'notifications', to: 'notices' },
      { icon: 'mail', to: 'messages' },
    ],
  };

  const teacherMainNavItems = [
    { label: 'Dashboard', icon: 'dashboard', to: 'dashboard' },
    { label: 'My Classes', icon: 'school', to: 'my-classes' },
    { label: 'Students', icon: 'group', to: 'my-students' },
    { label: 'Attendance', icon: 'monitoring', to: 'attendance' },
  ];

  return (
    <DashboardShell
      topbar={<TeacherTopbar {...teacherHeader} />}
      sidebar={<TeacherSidebar {...teacherSidebarContent} navItems={teacherNavItems} userName={teacher.name} teacherId={teacherId} userRole={teacher.role} onLogout={logout} />}
      showBottomNav={true}
      context={{ user: teacher, teacherName: teacher.name }}
      bottomNavItems={teacherNavItems}
      mainNavItems={teacherMainNavItems}
    />
  );
}