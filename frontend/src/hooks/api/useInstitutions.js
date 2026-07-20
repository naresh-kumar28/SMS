import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import institutionsAPI from '../../api/institutions';
import { QUERY_KEYS } from '../../query/queryKeys';

// --- Institutions ---
export const useInstitutionsList = (params) => useQuery({
  queryKey: [QUERY_KEYS.INSTITUTIONS, params],
  queryFn: () => institutionsAPI.getInstitutions(params).then(res => res.data.results || res.data),
});

export const useInstitutionDetail = (id) => useQuery({
  queryKey: [QUERY_KEYS.INSTITUTION_DETAIL, id],
  queryFn: () => institutionsAPI.getInstitution(id).then(res => res.data),
  enabled: !!id,
});

export const useCreateInstitution = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => institutionsAPI.createInstitution(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.INSTITUTIONS] });
    },
  });
};

export const useUpdateInstitution = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => institutionsAPI.updateInstitution(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.INSTITUTIONS] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.INSTITUTION_DETAIL, id] });
    },
  });
};

// --- Memberships ---
export const useMemberships = (institutionId, role) => useQuery({
  queryKey: [QUERY_KEYS.ENROLLMENTS, institutionId, 'memberships', role],
  queryFn: () => institutionsAPI.getMemberships({ institution: institutionId, role }).then(res => res.data.results || res.data),
  enabled: !!institutionId,
});
