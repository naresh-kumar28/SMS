import api from '../axios';

export const register = (userData) => api.post('/accounts/register', userData);
export const registerInstitution = (userData) => api.post('/accounts/register/institution', userData);

export default register;