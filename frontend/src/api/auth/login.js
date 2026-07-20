import api from '../axios';

export const login = (credentials) => {
    // If panel is not in credentials, we could add it here if needed, 
    // but better to pass it from the hook.
    return api.post('/accounts/login', credentials);
};
export const loginSchool = (credentials) => api.post('/accounts/auth/school/login', credentials);
export const loginCoaching = (credentials) => api.post('/accounts/auth/coaching/login', credentials);

export default login;