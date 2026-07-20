import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import academicsAPI from '../../api/academics';
import { QUERY_KEYS } from '../../query/queryKeys';

export const useAcademics = () => {
  const queryClient = useQueryClient();

  // --- Academic Years ---
  const useAcademicYears = (institutionId) => useQuery({
    queryKey: [QUERY_KEYS.ACADEMIC_YEARS, institutionId],
    queryFn: () => academicsAPI.getAcademicYears(institutionId).then(res => res.data.results || res.data),
    enabled: !!institutionId,
  });

  const createAcademicYear = useMutation({
    mutationFn: (data) => academicsAPI.createAcademicYear(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ACADEMIC_YEARS] });
    },
  });

  // --- Courses ---
  const useCourses = (institutionId) => useQuery({
    queryKey: [QUERY_KEYS.COURSES, institutionId],
    queryFn: () => academicsAPI.getCourses(institutionId).then(res => res.data.results || res.data),
    enabled: !!institutionId,
  });

  const createCourse = useMutation({
    mutationFn: (data) => academicsAPI.createCourse(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.COURSES] });
    },
  });

  // --- Batches ---
  const useBatches = (institutionId, courseId) => useQuery({
    queryKey: [QUERY_KEYS.BATCHES, institutionId, courseId],
    queryFn: () => academicsAPI.getBatches(institutionId, courseId).then(res => res.data.results || res.data),
    enabled: !!institutionId,
  });

  const createBatch = useMutation({
    mutationFn: (data) => academicsAPI.createBatch(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.BATCHES] });
    },
  });

  // --- Enrollments ---
  const useEnrollments = (institutionId, membershipId) => useQuery({
    queryKey: [QUERY_KEYS.ENROLLMENTS, institutionId, membershipId],
    queryFn: () => academicsAPI.getEnrollments(institutionId, membershipId).then(res => res.data.results || res.data),
    enabled: !!institutionId,
  });

  return {
    useAcademicYears,
    createAcademicYear,
    useCourses,
    createCourse,
    useBatches,
    createBatch,
    useEnrollments,
  };
};
