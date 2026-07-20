import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useCallback } from 'react';
import loginAPI from '../../api/auth/login';
import registerAPI from '../../api/auth/register';
import logoutAPI from '../../api/auth/logout';
import { getProfile } from '../../api/auth/profile';
import { setCredentials, logout as logoutAction, selectPartnerAuth } from '../../redux/slice/partnerAuthSlice';
import { setCredentials as setManagerCredentials } from '../../redux/slice/managerAuthSlice';
import { QUERY_KEYS } from '../../query/queryKeys';

export const usePartnerAuth = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { user: reduxUser, roleInfo, isAuthenticated } = useSelector(selectPartnerAuth);

  // Sync session state across slices if user has dual roles
  const syncSlices = useCallback((data) => {
    const { user, role_info } = data;
    if (user?.is_manager || user?.is_superuser) {
      dispatch(setManagerCredentials({ user, role_info }));
    }
    dispatch(setCredentials(data));
  }, [dispatch]);

  // Get current user profile — enabled by cookie-based auth
  const meQuery = useQuery({
    queryKey: [QUERY_KEYS.ME, 'partner'],
    queryFn: async () => {
      const response = await getProfile();
      return response.data;
    },
    enabled: isAuthenticated,
  });

  // Sync session state with Redux when profile is fetched
  useEffect(() => {
    if (meQuery.data && JSON.stringify(meQuery.data) !== JSON.stringify(reduxUser)) {
      syncSlices({ user: meQuery.data, role_info: roleInfo });
    }
  }, [meQuery.data, reduxUser, roleInfo, syncSlices]);

  // Login Mutation
  const loginMutation = useMutation({
    mutationFn: (credentials) => loginAPI({ 
      ...credentials, 
      role: 'partner',
      TYPE: 'PARTNER',
      panel: 'partner' 
    }),
    onSuccess: (response) => {
      const data = response.data;
      syncSlices(data);
      if (data.user) {
        queryClient.setQueryData([QUERY_KEYS.ME, 'partner'], data.user);
      }
    },
  });

  // Register Mutation
  const registerMutation = useMutation({
    mutationFn: (userData) => registerAPI({
      ...userData,
      role: 'partner',
      TYPE: 'PARTNER',
      panel: 'partner',
    }),
    onSuccess: (response) => {
      const data = response.data;
      syncSlices(data);
      if (data.user) {
        queryClient.setQueryData([QUERY_KEYS.ME, 'partner'], data.user);
      }
    },
  });

  // Logout Mutation
  const logoutMutation = useMutation({
    mutationFn: () => logoutAPI(),
    onSettled: () => {
      dispatch(logoutAction());
      queryClient.clear();
    },
  });

  return {
    user: meQuery.data || reduxUser,
    roleInfo,
    isLoadingProfile: meQuery.isLoading,
    login: loginMutation.mutateAsync,
    isLoggingIn: loginMutation.isPending,
    loginError: loginMutation.error,
    register: registerMutation.mutateAsync,
    isRegistering: registerMutation.isPending,
    registerError: registerMutation.error,
    logout: logoutMutation.mutateAsync,
    isLoggingOut: logoutMutation.isPending,
  };
};
