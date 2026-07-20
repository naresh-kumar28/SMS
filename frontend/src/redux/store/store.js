import { configureStore } from '@reduxjs/toolkit';
import managerAuthReducer from '../slice/managerAuthSlice';
import partnerAuthReducer from '../slice/partnerAuthSlice';
import authReducer from '../slice/authSlice';

export const store = configureStore({
  reducer: {
    managerAuth: managerAuthReducer,
    partnerAuth: partnerAuthReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;