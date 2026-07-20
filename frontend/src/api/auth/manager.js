import login from './login';
import register from './register';
import logout from './logout';
import { getProfile, updateProfile } from './profile';
import api from '../axios';

export const getUsers = async () => {
  const response = await api.get('/accounts/manager/users');
  return response.data;
};

export const managerAuthAPI = {
  login,
  register,
  logout,
  getProfile,
  updateProfile,
  getUsers,
};

export default managerAuthAPI;
