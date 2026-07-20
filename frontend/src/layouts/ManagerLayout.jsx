import { Navigate } from 'react-router-dom';
import DashboardShell from '../components/layout/common/DashboardShell';
import ManagerSidebar from '../components/layout/manager/ManagerSidebar';
import ManagerTopbar from '../components/layout/manager/ManagerTopbar';
import {
  managerHeader,
  managerNavItems,
  managerSidebarContent,
} from './navigation/managerNavigation';
import { useManagerAuth } from '../hooks/api/useManagerAuth';

export default function ManagerLayout() {
  const { user, logout, isAuthenticated } = useManagerAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/auth/manager/login" replace />;
  }
  
  const platformName = managerHeader.userRole || 'Platform';
  const adminName = user?.full_name || (user?.first_name || user?.last_name 
    ? `${user.first_name || ''} ${user.last_name || ''}`.trim() 
    : 'Admin');
  const adminRole = user?.is_superuser ? 'Platform Admin' : 'Manager';

  const adminMainNavItems = [
    { label: 'Dashboard', icon: 'dashboard', to: 'overview' },
    { label: 'Schools', icon: 'school', to: 'schools' },
    { label: 'Coaching', icon: 'rocket_launch', to: 'coaching' },
    { label: 'Partners', icon: 'group', to: 'partners' },
  ];

  return (
    <DashboardShell
      topbar={<ManagerTopbar {...managerHeader} userName={adminName} userRole={adminRole} />}
      sidebar={<ManagerSidebar {...managerSidebarContent} userName={adminName} userRole={adminRole} navItems={managerNavItems} upgradePlan={managerSidebarContent.upgradePlan} onLogout={logout} />}
      showBottomNav={true}
      context={{ platformName, adminName }}
      bottomNavItems={managerNavItems}
      mainNavItems={adminMainNavItems}
    />
  );
}