import { useQuery } from '@tanstack/react-query';
import operationsAPI from '../../api/operations';
import { QUERY_KEYS } from '../../query/queryKeys';

// --- Attendance ---
export const useAttendance = (institutionId, date, studentId) => useQuery({
  queryKey: [QUERY_KEYS.ATTENDANCE, institutionId, date, studentId],
  queryFn: () => operationsAPI.getAttendance(institutionId, date, studentId).then(res => res.data.results || res.data),
  enabled: !!institutionId,
});

// --- Notices ---
export const useNoticesList = (institutionId, batchId) => useQuery({
  queryKey: [QUERY_KEYS.NOTICES, institutionId, batchId],
  queryFn: () => operationsAPI.getNotices(institutionId, batchId).then(res => res.data.results || res.data),
  // If institutionId is null/undefined, the manager might still want to fetch all notices.
  // We'll let the API handle the null institutionId.
});

// --- Applications ---
export const useApplications = (institutionId, status) => useQuery({
  queryKey: ['applications', institutionId, status],
  queryFn: () => operationsAPI.getApplications(institutionId, status).then(res => res.data.results || res.data),
  enabled: !!institutionId,
});

// --- Fee Payments ---
export const useFeePayments = (institutionId, membershipId) => useQuery({
  queryKey: ['feePayments', institutionId, membershipId],
  queryFn: () => operationsAPI.getFeePayments(institutionId, membershipId).then(res => res.data.results || res.data),
  enabled: !!institutionId,
});

