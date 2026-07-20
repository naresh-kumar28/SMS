import { useQuery } from '@tanstack/react-query';
import { managerAPI } from '../../api/manager';
import { QUERY_KEYS } from '../../query/queryKeys';

export const useDashboardMetrics = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.MANAGER_DASHBOARD],
    queryFn: async () => {
      const response = await managerAPI.getDashboardMetrics();
      return response.data;
    },
  });
};
