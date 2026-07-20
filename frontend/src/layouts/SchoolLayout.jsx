import { Navigate } from 'react-router-dom';
import DashboardShell from '../components/layout/common/DashboardShell';
import SchoolSidebar from '../components/layout/school/SchoolSidebar';
import SchoolTopbar from '../components/layout/school/SchoolTopbar';
import {
  schoolHeader,
  schoolNavItems,
  schoolSidebarContent,
} from './navigation/schoolNavigation';
import { useAuth } from '../hooks/api/useAuth';

export default function SchoolLayout() {
  const { user, logout, isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/auth/institution/login" replace />;
  }
  
  const schoolName = user?.institution_name || schoolHeader.userRole || 'School';
  const adminName = user?.full_name || (user?.first_name || user?.last_name 
    ? `${user.first_name || ''} ${user.last_name || ''}`.trim() 
    : 'Admin');
  const adminRole = 'School Administrator';

  const adminMainNavItems = [
    { label: 'Overview', icon: 'dashboard', to: 'overview' },
    { label: 'Students', icon: 'group', to: 'students' },
    { label: 'Teachers', icon: 'how_to_reg', to: 'teachers' },
    { label: 'Classes', icon: 'school', to: 'classes' },
  ];

  return (
    <DashboardShell
      topbar={<SchoolTopbar {...schoolHeader} userName={adminName} userRole={adminRole} />}
      sidebar={<SchoolSidebar {...schoolSidebarContent} userName={adminName} userRole={adminRole} navItems={schoolNavItems} onLogout={logout} />}
      showBottomNav={true}
      context={{ schoolName, adminName }}
      bottomNavItems={schoolNavItems}
      mainNavItems={adminMainNavItems}
    />
  );
}