import login from '../../../api/auth/login';
import register from '../../../api/auth/register';
import logout from '../../../api/auth/logout';

export const managerLogin = (credentials) => login(credentials);
export const managerRegister = (userData) => register(userData);
export const managerLogout = () => logout();

export default {
  login: managerLogin,
  register: managerRegister,
  logout: managerLogout,
};