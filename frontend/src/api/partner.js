import api from './axios';

export const partnerAPI = {
  getDashboardMetrics: async () => {
    const response = await api.get('/accounts/partner/dashboard-metrics');
    return response.data;
  },
  getStudents: async (params = {}) => {
    const response = await api.get('/accounts/partner/students', { params });
    return response.data;
  },
};

export default partnerAPI;
