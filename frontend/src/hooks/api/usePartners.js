import { useQuery } from '@tanstack/react-query';
import api from '../../api/axios';
import { QUERY_KEYS } from '../../query/queryKeys';

/**
 * Hook to fetch all registered partner organizations.
 * Primarily used for public-facing dropdowns (e.g., Login/Signup).
 */
export const usePartnersList = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.PARTNERS_LIST],
    queryFn: async () => {
      const response = await api.get('/accounts/partners');
      return response.data.results || response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes cache
  });
};

/**
 * Hook to fetch partner dashboard metrics.
 */
export const usePartnerDashboardMetrics = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.PARTNER_DASHBOARD_METRICS],
    queryFn: async () => {
      const response = await api.get('/accounts/partner/dashboard-metrics');
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
  });
};

/**
 * Hook to fetch students enrolled in partner's institutions.
 */
export const usePartnerStudents = (params = {}) => {
  return useQuery({
    queryKey: [QUERY_KEYS.PARTNER_STUDENTS, params],
    queryFn: async () => {
      const response = await api.get('/accounts/partner/students', { params });
      return response.data.results || response.data;
    },
    staleTime: 5 * 60 * 1000,
  });
};
