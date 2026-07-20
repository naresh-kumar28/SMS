import api from './axios';

export const academicsAPI = {
  // Academic Year
  getAcademicYears: (institutionId) => 
    api.get(`/academics/academic-years/?institution=${institutionId}`),
  getAcademicYear: (id) => api.get(`/academics/academic-years/${id}`),
  createAcademicYear: (data) => api.post('/academics/academic-years', data),
  updateAcademicYear: (id, data) => api.patch(`/academics/academic-years/${id}`, data),
  deleteAcademicYear: (id) => api.delete(`/academics/academic-years/${id}`),
  
  // Course
  getCourses: (institutionId) => 
    api.get(`/academics/courses/?institution=${institutionId}`),
  getCourse: (id) => api.get(`/academics/courses/${id}`),
  createCourse: (data) => api.post('/academics/courses', data),
  updateCourse: (id, data) => api.patch(`/academics/courses/${id}`, data),
  deleteCourse: (id) => api.delete(`/academics/courses/${id}`),
  
  // Batch
  getBatches: (institutionId, courseId) => {
    let url = `/academics/batches/?institution=${institutionId}`;
    if (courseId) url += `&course=${courseId}`;
    return api.get(url);
  },
  getBatch: (id) => api.get(`/academics/batches/${id}`),
  createBatch: (data) => api.post('/academics/batches', data),
  updateBatch: (id, data) => api.patch(`/academics/batches/${id}`, data),
  deleteBatch: (id) => api.delete(`/academics/batches/${id}`),
  
  // Enrollment
  getEnrollments: (institutionId, membershipId) => {
    let url = `/academics/enrollments/?institution=${institutionId}`;
    if (membershipId) url += `&membership=${membershipId}`;
    return api.get(url);
  },
  getEnrollment: (id) => api.get(`/academics/enrollments/${id}`),
  createEnrollment: (data) => api.post('/academics/enrollments', data),
  updateEnrollment: (id, data) => api.patch(`/academics/enrollments/${id}`, data),
  deleteEnrollment: (id) => api.delete(`/academics/enrollments/${id}`),
};

export default academicsAPI;