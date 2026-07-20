import login from '../../../api/auth/login';
import register from '../../../api/auth/register';
import logout from '../../../api/auth/logout';

export const teacherLogin = (credentials) => login(credentials);
export const teacherRegister = (userData) => register(userData);
export const teacherLogout = () => logout();

export default {
  login: teacherLogin,
  register: teacherRegister,
  logout: teacherLogout,
};