import api from '../axios';

export const signup = (data) => api.post('/accounts/signup', data);

// Teacher Signup
export const signupSchoolTeacher = (data) => api.post('/accounts/auth/school/register/teacher', data);
export const signupCoachingTeacher = (data) => api.post('/accounts/auth/coaching/register/teacher', data);

// Student Signup
export const signupSchoolStudent = (data) => api.post('/accounts/auth/school/register/student', data);
export const signupCoachingStudent = (data) => api.post('/accounts/auth/coaching/register/student', data);

export default signup;
