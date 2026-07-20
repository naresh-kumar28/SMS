import { Navigate } from 'react-router-dom';
import DashboardShell from '../components/layout/common/DashboardShell';
import PartnerSidebar from '../components/layout/partner/PartnerSidebar';
import PartnerTopbar from '../components/layout/partner/PartnerTopbar';
import {
  partnerHeader,
  partnerNavItems,
  partnerSidebarContent,
} from './navigation/partnerNavigation';
import { usePartnerAuth } from '../hooks/api/usePartnerAuth';
import { useSelector } from 'react-redux';
import { selectPartnerAuth } from '../redux/slice/partnerAuthSlice';

export default function PartnerLayout() {
  const { user, logout } = usePartnerAuth();
  const { token, isAuthenticated } = useSelector(selectPartnerAuth);

  if (!token && !isAuthenticated) {
    return <Navigate to="/auth/partner/login" replace />;
  }

  const platformName = partnerHeader.userRole || 'Partner';
  const partnerName = user?.full_name ;
  const partnerRole = 'Organization Partner';

  const partnerMainNavItems = [
    { label: 'Dashboard', icon: 'dashboard', to: 'overview' },
    { label: 'Schools', icon: 'school', to: 'schools' },
    { label: 'Coaching', icon: 'rocket_launch', to: 'coaching' },
    { label: 'Pricing', icon: 'payments', to: 'pricing' },
  ];

  return (
    <DashboardShell
      topbar={<PartnerTopbar {...partnerHeader} userName={partnerName} userRole={partnerRole} />}
      sidebar={<PartnerSidebar {...partnerSidebarContent} userName={partnerName} userRole={partnerRole} navItems={partnerNavItems} onLogout={logout} />}
      showBottomNav={true}
      context={{ platformName, partnerName }}
      bottomNavItems={partnerNavItems}
      mainNavItems={partnerMainNavItems}
    />
  );
}
