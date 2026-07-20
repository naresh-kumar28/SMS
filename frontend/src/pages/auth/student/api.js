import login from '../../../api/auth/login';
import register from '../../../api/auth/register';
import logout from '../../../api/auth/logout';

export const studentLogin = (credentials) => login(credentials);
export const studentRegister = (userData) => register(userData);
export const studentLogout = () => logout();

export default {
  login: studentLogin,
  register: studentRegister,
  logout: studentLogout,
};