import toast from 'react-hot-toast';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import loginAPI, { loginSchool, loginCoaching } from '../../api/auth/login';
import registerAPI, { registerInstitution as registerInstitutionAPI } from '../../api/auth/register';
import signupAPI, { 
  signupSchoolTeacher, 
  signupCoachingTeacher, 
  signupSchoolStudent, 
  signupCoachingStudent 
} from '../../api/auth/signup';
import logoutAPI from '../../api/auth/logout';
import { getProfile, updateProfile as updateProfileAPI } from '../../api/auth/profile';
import { setCredentials, logout as logoutAction, setUser, selectAuth } from '../../redux/slice/authSlice';
import { QUERY_KEYS } from '../../query/queryKeys';

export const useAuth = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { user: reduxUser, roleInfo, isAuthenticated } = useSelector(selectAuth);

  // Get current user profile — enabled when authenticated (via cookie rehydration)
  const meQuery = useQuery({
    queryKey: [QUERY_KEYS.ME],
    queryFn: async () => {
      const response = await getProfile();
      return response.data;
    },
    enabled: isAuthenticated,
  });

  // Sync session state with Redux when profile is fetched
  useEffect(() => {
    if (meQuery.data && JSON.stringify(meQuery.data) !== JSON.stringify(reduxUser)) {
      dispatch(setUser(meQuery.data));
    }
  }, [meQuery.data, reduxUser, dispatch]);

  // Login Mutation
  const loginMutation = useMutation({
    mutationFn: (credentials) => {
      if (credentials.institution_type === 'COACHING') {
        return loginCoaching(credentials);
      }
      if (credentials.institution_type === 'SCHOOL') {
        return loginSchool(credentials);
      }
      return loginAPI(credentials);
    },
    onSuccess: (response) => {
      const data = response.data;
      // Tokens are now in HttpOnly cookies — only store user/role in Redux
      dispatch(setCredentials(data));
      if (data.user) {
        queryClient.setQueryData([QUERY_KEYS.ME], data.user);
      }
    },
  });

  // Register Mutation
  const registerMutation = useMutation({
    mutationFn: (userData) => registerAPI(userData),
    onSuccess: (response) => {
      const data = response.data;
      if (data.user) {
        dispatch(setUser(data.user));
        queryClient.setQueryData([QUERY_KEYS.ME], data.user);
      }
    },
  });

  // Register Institution Mutation
  const instRegisterMutation = useMutation({
    mutationFn: (userData) => registerInstitutionAPI(userData),
    onSuccess: (response) => {
      const data = response.data;
      dispatch(setCredentials(data));
      queryClient.setQueryData([QUERY_KEYS.ME], data.user);
    },
  });

  // Signup Mutation
  const signupMutation = useMutation({
    mutationFn: (userData) => {
      // Role-specific signup routing
      if (userData.role === 'teacher') {
        const institutionType = userData.institution_type || userData.institutionType;
        return institutionType === 'COACHING' 
          ? signupCoachingTeacher(userData) 
          : signupSchoolTeacher(userData);
      }
      if (userData.role === 'student') {
        const institutionType = userData.institution_type || userData.institutionType;
        return institutionType === 'COACHING' 
          ? signupCoachingStudent(userData) 
          : signupSchoolStudent(userData);
      }
      return signupAPI(userData);
    },
    onSuccess: (response) => {
      const data = response.data;
      dispatch(setCredentials(data));
      queryClient.setQueryData([QUERY_KEYS.ME], data.user);
    },
  });

  // Update Profile Mutation
  const updateProfileMutation = useMutation({
    mutationFn: (data) => updateProfileAPI(data),
    onSuccess: (response) => {
      const updatedUser = response.data.user || response.data;
      dispatch(setUser(updatedUser));
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ME] });
      toast.success('Profile updated successfully!');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to update profile');
    }
  });

  // Logout Mutation
  const logoutMutation = useMutation({
    mutationFn: () => logoutAPI(),
    onSettled: () => {
      dispatch(logoutAction());
      queryClient.clear();
    },
  });

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
    } catch (error) {
      // Ignore errors like 401 Unauthorized to ensure local session clear:
      console.warn('Logout API error, forcing local session clear:', error.message);
    }
  };

  return {
    user: meQuery.data || reduxUser,
    roleInfo,
    isAuthenticated,
    isLoadingProfile: meQuery.isLoading,
    login: loginMutation.mutateAsync,
    isLoggingIn: loginMutation.isPending,
    loginError: loginMutation.error,
    register: registerMutation.mutateAsync,
    isRegistering: registerMutation.isPending,
    registerError: registerMutation.error,
    registerInstitution: instRegisterMutation.mutateAsync,
    isRegisteringInstitution: instRegisterMutation.isPending,
    registerInstitutionError: instRegisterMutation.error,
    signup: signupMutation.mutateAsync,
    isSigningUp: signupMutation.isPending,
    signupError: signupMutation.error,
    updateProfile: updateProfileMutation.mutateAsync,
    isUpdatingProfile: updateProfileMutation.isPending,
    logout: handleLogout,
    isLoggingOut: logoutMutation.isPending,
  };
};
