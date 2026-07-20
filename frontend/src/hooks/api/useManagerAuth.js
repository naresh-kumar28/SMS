import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useCallback } from 'react';
import { managerAuthAPI } from '../../api/auth/manager';
import { setCredentials, logout as logoutAction, setUser, selectManagerAuth } from '../../redux/slice/managerAuthSlice';
import { setCredentials as setPartnerCredentials } from '../../redux/slice/partnerAuthSlice';
import { QUERY_KEYS } from '../../query/queryKeys';
import toast from 'react-hot-toast';

export const useManagerAuth = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { user: reduxUser, isAuthenticated } = useSelector(selectManagerAuth);

  // Sync session state across slices if user has dual roles
  const syncSlices = useCallback((data) => {
    const { user, role_info } = data;
    dispatch(setCredentials(data));
    if (user?.is_partner) {
      dispatch(setPartnerCredentials({ user, role_info }));
    }
  }, [dispatch]);

  // Get current user profile — enabled by cookie-based auth
  const meQuery = useQuery({
    queryKey: [QUERY_KEYS.ME],
    queryFn: async () => {
      const response = await managerAuthAPI.getProfile();
      return response.data;
    },
    enabled: isAuthenticated,
  });

  // Sync session state with Redux when profile is fetched
  useEffect(() => {
    if (meQuery.data && JSON.stringify(meQuery.data) !== JSON.stringify(reduxUser)) {
      syncSlices({ user: meQuery.data, role_info: null });
    }
  }, [meQuery.data, reduxUser, syncSlices]);

  // Login Mutation
  const loginMutation = useMutation({
    mutationFn: (credentials) => managerAuthAPI.login({ 
      ...credentials, 
      role: 'manager',
      TYPE: 'MANAGER',
      panel: 'manager' 
    }),
    onSuccess: (response) => {
      const data = response.data;
      syncSlices(data);
      if (data.user) {
        queryClient.setQueryData([QUERY_KEYS.ME], data.user);
      }
    },
    onError: () => {
      // Errors are handled by the component using mutateAsync and try/catch
    },
  });

  // Register Mutation
  const registerMutation = useMutation({
    mutationFn: (userData) => managerAuthAPI.register({
      ...userData,
      role: 'manager',
      TYPE: 'MANAGER',
      panel: 'manager',
    }),
    onSuccess: (response) => {
      const data = response.data;
      syncSlices(data);
      if (data.user) {
        queryClient.setQueryData([QUERY_KEYS.ME], data.user);
      }
    },
    onError: () => {
      // Errors are handled by the component using mutateAsync and try/catch
    },
  });

  // Logout Mutation
  const logoutMutation = useMutation({
    mutationFn: () => managerAuthAPI.logout(),
    onSettled: () => {
      dispatch(logoutAction());
      queryClient.clear(); // Wipe entire cache on logout for security
    },
  });

  // Update Profile Mutation
  const updateProfileMutation = useMutation({
    mutationFn: (data) => managerAuthAPI.updateProfile(data),
    onSuccess: (response) => {
      const data = response.data;
      dispatch(setUser(data));
      queryClient.setQueryData([QUERY_KEYS.ME], data);
      toast.success('Profile updated successfully');
    },
    onError: () => {
      // Errors are handled by the component
    },
  });

  return {
    user: meQuery.data || reduxUser,
    isLoadingProfile: meQuery.isLoading,
    isAuthenticated,
    login: loginMutation.mutateAsync,
    isLoggingIn: loginMutation.isPending,
    loginError: loginMutation.error,
    register: registerMutation.mutateAsync,
    isRegistering: registerMutation.isPending,
    registerError: registerMutation.error,
    updateProfile: updateProfileMutation.mutateAsync,
    isUpdatingProfile: updateProfileMutation.isPending,
    logout: logoutMutation.mutateAsync,
    isLoggingOut: logoutMutation.isPending,
  };
};
