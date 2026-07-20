import api from './axios';

export const operationsAPI = {
  // Attendance
  getAttendance: (institutionId, date, studentId) => {
    let url = `/operations/attendances/?institution=${institutionId}`;
    if (date) url += `&date=${date}`;
    if (studentId) url += `&student=${studentId}`;
    return api.get(url);
  },
  markAttendance: (data) => api.post('/operations/attendances', data),
  updateAttendance: (id, data) => api.patch(`/operations/attendances/${id}`, data),
  
  // Fee Structure
  getFeeStructures: (institutionId) => 
    api.get(`/operations/fee-structures/?institution=${institutionId}`),
  getFeeStructure: (id) => api.get(`/operations/fee-structures/${id}`),
  createFeeStructure: (data) => api.post('/operations/fee-structures', data),
  updateFeeStructure: (id, data) => api.patch(`/operations/fee-structures/${id}`, data),
  deleteFeeStructure: (id) => api.delete(`/operations/fee-structures/${id}`),
  
  // Fee Payment
  getFeePayments: (institutionId, membershipId) => {
    let url = `/operations/fee-payments/?institution=${institutionId}`;
    if (membershipId) url += `&membership=${membershipId}`;
    return api.get(url);
  },
  getFeePayment: (id) => api.get(`/operations/fee-payments/${id}`),
  createFeePayment: (data) => api.post('/operations/fee-payments', data),
  
  // Notice
  getNotices: (institutionId, batchId) => {
    let url = '/operations/notices/';
    const params = new URLSearchParams();
    if (institutionId) params.append('institution', institutionId);
    if (batchId) params.append('for_batch', batchId);
    if (params.toString()) url += `?${params.toString()}`;
    return api.get(url);
  },
  getNotice: (id) => api.get(`/operations/notices/${id}`),
  createNotice: (data) => api.post('/operations/notices', data),
  updateNotice: (id, data) => api.patch(`/operations/notices/${id}`, data),
  deleteNotice: (id) => api.delete(`/operations/notices/${id}`),
  
  // Application (Student Registrations)
  getApplications: (institutionId, status) => {
    let url = `/operations/applications/?institution=${institutionId}`;
    if (status) url += `&status=${status}`;
    return api.get(url);
  },
  getApplication: (id) => api.get(`/operations/applications/${id}`),
  updateApplication: (id, data) => api.patch(`/operations/applications/${id}`, data),
};

export default operationsAPI;