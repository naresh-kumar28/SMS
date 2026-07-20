import axios from 'axios';
import store from '../redux/store/store';
import { setCredentials } from '../redux/slice/authSlice';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
const API_VERSION = 'v1';
const API_BASE = `${BASE_URL}/api/${API_VERSION}`;

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
  // ─── COOKIE AUTH: Send HttpOnly cookies with every request ─────────
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    // List of public endpoints that don't need auth context
    const publicEndpoints = [
      '/accounts/login',
      '/accounts/register',
      '/accounts/signup',
      '/accounts/refresh',
      '/accounts/verify-email',
      '/accounts/password-reset',
      '/institutions',
    ];

    const isPublicEndpoint = publicEndpoints.some(endpoint => config.url.includes(endpoint));

    if (!isPublicEndpoint) {
      const state = store.getState();
      
      // Inject Institution ID header for multi-tenancy
      // Read from Redux state only (no more localStorage)
      const institutionId = state.auth?.institutionId || 
                            state.managerAuth?.roleInfo?.institution_id ||
                            state.partnerAuth?.roleInfo?.institution_id;
                            
      if (institutionId) {
        config.headers['X-Institution-ID'] = institutionId;
      }

      // Inject Panel Context header to help backend choose the right isolated cookie
      const path = window.location.pathname;
      let panel = null;
      if (path.includes('/manager')) panel = 'manager';
      else if (path.includes('/partner')) panel = 'partner';
      else if (path.includes('/school-teacher')) panel = 'school_teacher';
      else if (path.includes('/school-student')) panel = 'school_student';
      else if (path.includes('/school')) panel = 'school';
      else if (path.includes('/coaching-teacher')) panel = 'coaching_teacher';
      else if (path.includes('/coaching-student')) panel = 'coaching_student';
      else if (path.includes('/coaching')) panel = 'coaching';
      
      if (panel) {
        config.headers['X-Panel-Context'] = panel;
      } else {
        // Fallback to searching for any active panel cookie
        const panels = ['manager', 'partner', 'school', 'coaching', 'school_teacher', 'school_student', 'coaching_teacher', 'coaching_student'];
        const activePanel = panels.find(p => 
          document.cookie.split('; ').some(row => row.startsWith(`skoolnet_${p}_active=true`))
        );
        
        if (activePanel) {
          config.headers['X-Panel-Context'] = activePanel;
        }
      }

      // ─── NO MORE Authorization header injection ───────────────
      // Tokens are now sent automatically via HttpOnly cookies.
      // The browser handles cookie attachment with withCredentials: true.
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // Handle 401 Unauthorized — attempt cookie-based token refresh
    // skip refresh for 'auth/me' as it is the initial check
    if (error.response?.status === 401 && !originalRequest._retry && !originalRequest.url.includes('/accounts/auth/me')) {
      originalRequest._retry = true;

      
      try {
        // Cookie-based refresh: no body needed, server reads from HttpOnly cookie
        const response = await axios.post(
          `${API_BASE}/accounts/refresh`,
          {},
          { withCredentials: true }
        );
        
        const { user, role_info } = response.data;
        
        // Determine which Redux slice to update
        const state = store.getState();
        if (state.managerAuth?.isAuthenticated) {
          store.dispatch({ type: 'managerAuth/setCredentials', payload: { user, role_info } });
        } else if (state.partnerAuth?.isAuthenticated) {
          store.dispatch({ type: 'partnerAuth/setCredentials', payload: { user, role_info } });
        } else {
          store.dispatch(setCredentials({ user, role_info }));
        }
        
        // Retry the original request — new cookie is already set by the server
        return api(originalRequest);
      } catch {
        // Refresh failed — clear all Redux state and redirect to login
        store.dispatch({ type: 'auth/logout' });
        store.dispatch({ type: 'managerAuth/logout' });
        store.dispatch({ type: 'partnerAuth/logout' });

        if (window.location.pathname.startsWith('/dashboard')) {
          let redirectPath = '/auth/institution/login';
          if (window.location.pathname.includes('/manager')) redirectPath = '/auth/manager/login';
          else if (window.location.pathname.includes('/partner')) redirectPath = '/auth/partner/login';
          
          window.location.href = redirectPath;
        }
      }
    }
    
    return Promise.reject(error);
  }
);

export { BASE_URL, API_VERSION, API_BASE };
export default api;