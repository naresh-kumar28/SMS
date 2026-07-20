import { useQuery } from '@tanstack/react-query';
import landingAPI from '../../api/landing';
import { QUERY_KEYS } from '../../query/queryKeys';

export const usePricingPlans = () => useQuery({
  queryKey: [QUERY_KEYS.LANDING_PRICING],
  queryFn: () => landingAPI.getPricingPlans().then(res => res.data.results || res.data),
});
