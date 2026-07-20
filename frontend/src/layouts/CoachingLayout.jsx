import { Navigate } from 'react-router-dom';
import DashboardShell from '../components/layout/common/DashboardShell';
import CoachingSidebar from '../components/layout/coaching/CoachingSidebar';
import CoachingTopbar from '../components/layout/coaching/CoachingTopbar';
import {
  coachingHeader,
  coachingNavItems,
  coachingSidebarContent,
} from './navigation/coachingNavigation';
import { useAuth } from '../hooks/api/useAuth';

export default function CoachingLayout() {
  const { user, logout, isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/auth/institution/login" replace />;
  }
  
  const coachingName = user?.institution_name || coachingHeader.userRole || 'Coaching';
  const adminName = user?.full_name || (user?.first_name || user?.last_name 
    ? `${user.first_name || ''} ${user.last_name || ''}`.trim() 
    : 'Admin');
  const adminRole = 'Coaching Administrator';

  const adminMainNavItems = [
    { label: 'Overview', icon: 'dashboard', to: 'overview' },
    { label: 'Students', icon: 'group', to: 'students' },
    { label: 'Teachers', icon: 'school', to: 'teachers' },
    { label: 'Courses', icon: 'menu_book', to: 'courses' },
  ];

  return (
    <DashboardShell
      topbar={<CoachingTopbar {...coachingHeader} userName={adminName} userRole={adminRole} />}
      sidebar={<CoachingSidebar {...coachingSidebarContent} userName={adminName} userRole={adminRole} navItems={coachingNavItems} onLogout={logout} />}
      showBottomNav={true}
      bottomNavItems={coachingNavItems}
      mainNavItems={adminMainNavItems}
      context={{ coachingName }}
    />
  );
}