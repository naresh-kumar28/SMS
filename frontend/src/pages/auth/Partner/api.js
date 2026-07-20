import login from '../../../api/auth/login';
import register from '../../../api/auth/register';
import logout from '../../../api/auth/logout';

export const partnerLogin = (credentials) => login(credentials);
export const partnerRegister = (userData) => register(userData);
export const partnerLogout = () => logout();

export default {
  login: partnerLogin,
  register: partnerRegister,
  logout: partnerLogout,
};