import api from '../axios';

/**
 * Logout — Cookie-Based
 * 
 * No need to send refresh token in body.
 * Server reads it from the HttpOnly cookie and clears all auth cookies.
 */
export const logout = () => {
  return api.post('/accounts/logout');
};

export default logout;