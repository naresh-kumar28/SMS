import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCredentials, setRehydrating } from '../../redux/slice/authSlice';
import { 
  setCredentials as setManagerCredentials, 
  setRehydrating as setManagerRehydrating 
} from '../../redux/slice/managerAuthSlice';
import { 
  setCredentials as setPartnerCredentials, 
  setRehydrating as setPartnerRehydrating 
} from '../../redux/slice/partnerAuthSlice';
import api from '../../api/axios';

/**
 * AuthProvider — Cookie-Based Session Rehydration
 * 
 * On app mount, calls GET /accounts/auth/me to check if HttpOnly cookies
 * contain a valid session. If yes, populates Redux with user data.
 * If no, marks all slices as "not rehydrating" (unauthenticated).
 * 
 * This replaces the old localStorage rehydration pattern.
 */
export default function AuthProvider({ children }) {
  const dispatch = useDispatch();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const rehydrateSession = async () => {
      try {
        const response = await api.get('/accounts/auth/me');
        
        // Handle explicit "not authenticated" 200 response
        if (response.data?.authenticated === false) {
          _markAllNotRehydrating();
          return;
        }

        const { user, role_info, panel } = response.data;

        if (user) {

          // Determine which slice to populate based on role/panel/user flags
          const panelValue = panel || _determinePanelFromRole(role_info, user);

          // Manager: superuser OR anyone with is_manager flag (includes partners registered via manager signup)
          if (panelValue === 'manager' || user?.is_superuser || (user?.is_manager && !role_info?.institution_id)) {
            dispatch(setManagerCredentials({ user, role_info }));
            // Also populate partnerAuth since managers are also partners
            if (user?.is_partner) {
              dispatch(setPartnerCredentials({ user, role_info }));
            } else {
              dispatch(setPartnerRehydrating(false));
            }
            dispatch(setRehydrating(false));
          } else if (panelValue === 'partner' || user?.is_partner) {
            dispatch(setPartnerCredentials({ user, role_info }));
            // Also populate managerAuth if user has manager access
            if (user?.is_manager || user?.is_superuser) {
              dispatch(setManagerCredentials({ user, role_info }));
            } else {
              dispatch(setManagerRehydrating(false));
            }
            dispatch(setRehydrating(false));
          } else {
            // Institution user (school/coaching/teacher/student)
            dispatch(setCredentials({ user, role_info }));
            dispatch(setManagerRehydrating(false));
            dispatch(setPartnerRehydrating(false));
          }
        } else {
          _markAllNotRehydrating();
        }
      } catch {
        // 401 or no cookies — user is not authenticated
        _markAllNotRehydrating();
      } finally {
        setIsReady(true);
      }
    };

    const _markAllNotRehydrating = () => {
      dispatch(setRehydrating(false));
      dispatch(setManagerRehydrating(false));
      dispatch(setPartnerRehydrating(false));
    };

    rehydrateSession();
  }, [dispatch]);

  // Don't render children until rehydration is complete
  // This prevents flash-of-unauthenticated-content
  if (!isReady) {
    return null; // or a global loading spinner
  }

  return children;
}

/**
 * Determine panel from role_info when panel cookie is not set.
 */
function _determinePanelFromRole(roleInfo, user) {
  if (!roleInfo) {
    if (user?.is_superuser) return 'manager';
    if (user?.is_manager) return 'manager';
    if (user?.is_partner) return 'partner';
    return 'unknown';
  }
  
  const role = roleInfo.role;
  const isManager = roleInfo.is_manager;
  
  if (role === 'SUPERUSER') return 'manager';
  // Partners registered via manager signup should go to manager panel
  if (role === 'PARTNER' && isManager) return 'manager';
  if (role === 'PARTNER') return 'partner';
  if (role === 'ADMIN') {
    return roleInfo.institution_type === 'SCHOOL' ? 'school' : 'coaching';
  }
  if (role === 'TEACHER') return roleInfo.institution_type === 'SCHOOL' ? 'school_teacher' : 'coaching_teacher';
  if (role === 'STUDENT') return roleInfo.institution_type === 'SCHOOL' ? 'school_student' : 'coaching_student';
  return 'unknown';
}
