import { useQuery } from '@tanstack/react-query';
import { getSchoolDashboardMetrics } from '../../api/school';

export const useSchoolDashboardMetrics = () => {
  return useQuery({
    queryKey: ['schoolDashboardMetrics'],
    queryFn: async () => {
      const response = await getSchoolDashboardMetrics();
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
