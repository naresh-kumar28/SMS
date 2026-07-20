import login from '../../../api/auth/login';
import register from '../../../api/auth/register';
import logout from '../../../api/auth/logout';

export const institutionLogin = (credentials) => login(credentials);
export const institutionRegister = (userData) => register(userData);
export const institutionLogout = () => logout();

export default {
  login: institutionLogin,
  register: institutionRegister,
  logout: institutionLogout,
};