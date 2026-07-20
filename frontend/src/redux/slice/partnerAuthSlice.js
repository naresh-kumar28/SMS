import { createSlice } from '@reduxjs/toolkit';

/**
 * Partner Auth Slice — Cookie-Based Architecture
 * 
 * No localStorage. Session rehydrated via /auth/me.
 */
const initialState = {
  user: null,
  roleInfo: null,
  isAuthenticated: false,
  isRehydrating: true,
};

const partnerAuthSlice = createSlice({
  name: 'partnerAuth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, role_info } = action.payload;
      state.user = user || state.user;
      state.roleInfo = role_info || state.roleInfo;
      state.isAuthenticated = true;
      state.isRehydrating = false;
    },
    clearCredentials: (state) => {
      state.user = null;
      state.roleInfo = null;
      state.isAuthenticated = false;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setRehydrating: (state, action) => {
      state.isRehydrating = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.roleInfo = null;
      state.isAuthenticated = false;
      state.isRehydrating = false;
    },
  },
});

export const {
  setCredentials,
  clearCredentials,
  setUser,
  setRehydrating,
  logout,
} = partnerAuthSlice.actions;

export default partnerAuthSlice.reducer;

export const selectPartnerAuth = (state) => state.partnerAuth;
