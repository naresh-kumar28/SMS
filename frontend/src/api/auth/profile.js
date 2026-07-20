import api from '../axios';

export const getProfile = () => api.get('/accounts/me');

export const updateProfile = (data) => api.patch('/accounts/me', data);

export const changePassword = (data) => api.post('/accounts/password', data);

export default { getProfile, updateProfile, changePassword };