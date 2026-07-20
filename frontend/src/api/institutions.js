import api from './axios';

export const institutionsAPI = {
  // Partner
  getPartners: () => api.get('/institutions/partners'),
  getPartner: (id) => api.get(`/institutions/partners/${id}`),
  createPartner: (data) => api.post('/institutions/partners', data),
  updatePartner: (id, data) => api.patch(`/institutions/partners/${id}`, data),
  
  // Institution
  getInstitutions: (params) => api.get('/institutions', { params }),
  getInstitution: (id) => api.get(`/institutions/${id}`),
  createInstitution: (data) => api.post('/institutions', data),
  updateInstitution: (id, data) => api.patch(`/institutions/${id}`, data),
  deleteInstitution: (id) => api.delete(`/institutions/${id}`),
  
  // Membership
  getMemberships: (params) => api.get('/institutions/memberships/', { params }),
  getMembership: (id) => api.get(`/institutions/memberships/${id}`),
  addMembership: (data) => api.post('/institutions/memberships', data),
  updateMembership: (id, data) => api.patch(`/institutions/memberships/${id}`, data),
  removeMembership: (id) => api.delete(`/institutions/memberships/${id}`),
};

export default institutionsAPI;