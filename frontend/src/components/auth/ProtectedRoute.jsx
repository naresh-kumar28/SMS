import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAuth } from '../../redux/slice/authSlice';
import { selectManagerAuth } from '../../redux/slice/managerAuthSlice';
import { selectPartnerAuth } from '../../redux/slice/partnerAuthSlice';
import { DashboardSkeleton } from '../common/Skeleton';

export default function ProtectedRoute({ role, allowedType, requiredRole }) {
  const auth = useSelector(selectAuth);
  const managerAuth = useSelector(selectManagerAuth);
  const partnerAuth = useSelector(selectPartnerAuth);
  const location = useLocation();

  // 1. Determine which auth slice to use
  //    For 'manager' role, check BOTH managerAuth and partnerAuth since
  //    manager registration creates partners (is_manager=true, not necessarily is_superuser)
  let currentAuth = auth;
  if (role === 'manager') {
    // Manager panel: prefer managerAuth, but also accept partnerAuth 
    // since registered managers start as partners
    currentAuth = managerAuth.isAuthenticated ? managerAuth : partnerAuth;
  } else if (role === 'partner') {
    currentAuth = partnerAuth.isAuthenticated ? partnerAuth : managerAuth;
  }

  const { isAuthenticated, isRehydrating, user, roleInfo } = currentAuth;

  // 1.5 Wait for session rehydration from cookies
  if (isRehydrating) {
    return <DashboardSkeleton />;
  }

  // Also check if ANY slice is still rehydrating (cross-slice awareness)
  if (managerAuth.isRehydrating || partnerAuth.isRehydrating || auth.isRehydrating) {
    return <DashboardSkeleton />;
  }

  // 2. Handle Authentication State
  if (!isAuthenticated) {
    const loginPath = role === 'manager' 
      ? '/auth/manager/login' 
      : role === 'partner'
        ? '/auth/partner/login'
        : role === 'teacher'
          ? '/auth/teacher/login'
          : role === 'student'
            ? '/auth/student/login'
            : '/auth/institution/login';
    
    return <Navigate to={loginPath} state={{ from: location }} replace />;
  }

  // 3. Wait for User and RoleInfo (if needed)
  const isInstitutionRoute = !!(allowedType || requiredRole);
  if (!user || (isInstitutionRoute && !roleInfo)) {
    return <DashboardSkeleton />;
  }

  // 4. Check specific institution type if required
  if (allowedType && roleInfo) {
    if (roleInfo.institution_type !== allowedType) {
      const correctDashboard = roleInfo.institution_type === 'COACHING' 
        ? '/dashboard/coaching' 
        : '/dashboard/school';
      
      return <Navigate to={correctDashboard} replace />;
    }
  }

  // 5. Check membership role if required
  if (requiredRole && roleInfo) {
    if (roleInfo.role !== requiredRole) {
      const fallbackPath = roleInfo.institution_type === 'COACHING' 
        ? '/dashboard/coaching/overview' 
        : '/dashboard/school/overview';
      return <Navigate to={fallbackPath} replace />;
    }
  }

  // 6. Enforce Panel Access
  if (role === 'manager') {
    // ONLY superusers or managers allowed in Manager Panel
    if (!user?.is_superuser && !user?.is_manager) {
      return <Navigate to="/auth/manager/login" replace />;
    }
  }

  if (role === 'partner') {
    // Superusers, Managers, and Partners allowed in Partner Panel
    if (!user?.is_superuser && !user?.is_manager && !user?.is_partner) {
      return <Navigate to="/auth/partner/login" replace />;
    }
  }

  return <Outlet />;
}
