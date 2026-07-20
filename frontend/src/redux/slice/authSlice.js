import { createSlice } from '@reduxjs/toolkit';

/**
 * Auth Slice — Cookie-Based Architecture
 * 
 * Tokens are stored in HttpOnly cookies (not accessible via JS).
 * This slice only holds UI state: user data, role info, and auth status.
 * Session is rehydrated via GET /accounts/auth/me on app load.
 */
const initialState = {
  user: null,
  roleInfo: null,
  institutionId: null,
  panel: null,
  isAuthenticated: false,
  isRehydrating: true, // true until /auth/me resolves
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, role_info } = action.payload;
      state.user = user || state.user;
      state.roleInfo = role_info || state.roleInfo;
      state.institutionId = role_info?.institution_id || state.institutionId;
      state.isAuthenticated = true;
      state.isRehydrating = false;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setPanel: (state, action) => {
      state.panel = action.payload;
    },
    setRehydrating: (state, action) => {
      state.isRehydrating = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.roleInfo = null;
      state.institutionId = null;
      state.panel = null;
      state.isAuthenticated = false;
      state.isRehydrating = false;
    },
  },
});

export const { setCredentials, setUser, setPanel, setRehydrating, logout } = authSlice.actions;

export const selectAuth = (state) => state.auth;
export const selectInstitutionId = (state) => state.auth.institutionId;

export default authSlice.reducer;
