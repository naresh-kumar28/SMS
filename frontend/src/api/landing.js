import api from './axios';

export const landingAPI = {
  getPricingPlans: () => api.get('/landing/pricing/'),
  getPricingPlan: (id) => api.get(`/landing/pricing/${id}/`),
  createPricingPlan: (data) => api.post('/landing/pricing/', data),
  updatePricingPlan: (id, data) => api.patch(`/landing/pricing/${id}/`, data),
  deletePricingPlan: (id) => api.delete(`/landing/pricing/${id}/`),
};

export default landingAPI;
