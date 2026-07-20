import api from './axios';

export const managerAPI = {
  getDashboardMetrics: () => api.get('/accounts/manager/dashboard-metrics'),
};
