import api from './axios';

export const getSchoolDashboardMetrics = () => {
  return api.get('/accounts/school/dashboard-metrics');
};
