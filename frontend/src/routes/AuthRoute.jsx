import { lazy } from 'react';
import { Route } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';

// Auth pages
const Login = lazy(() => import('../pages/auth/manager/Login'));
const ManagerSignup = lazy(() => import('../pages/auth/manager/Signup'));
const InstitutionLogin = lazy(() => import('../pages/auth/Institution/Login'));
const InstitutionRegister = lazy(() => import('../pages/auth/Institution/Register'));

// Role-based signup/login (unified for School/Caching)
const TeacherSignup = lazy(() => import('../pages/auth/teacher/Signup'));
const TeacherLogin = lazy(() => import('../pages/auth/teacher/Login'));
const StudentSignup = lazy(() => import('../pages/auth/student/Signup'));
const StudentLogin = lazy(() => import('../pages/auth/student/Login'));

// Partner
const PartnerLogin = lazy(() => import('../pages/auth/Partner/Login'));
const PartnerRegister = lazy(() => import('../pages/auth/Partner/Register'));

const AuthRoutes = () => (
  <Route path="/auth" element={<AuthLayout />}>
    {/* Manager (Platform Admin) */}
    <Route path="manager/login" element={<Login />} />
    <Route path="manager/signup" element={<ManagerSignup />} />
    
    {/* Partner */}
    <Route path="partner/login" element={<PartnerLogin />} />
    <Route path="partner/register" element={<PartnerRegister />} />
    
    {/* Institution (School/Coaching Owner) */}
    <Route path="institution/login" element={<InstitutionLogin />} />
    <Route path="institution/register" element={<InstitutionRegister />} />
    
    {/* Student (School/Caching) - Type selected on page */}
    <Route path="student/signup" element={<StudentSignup />} />
    <Route path="student/login" element={<StudentLogin />} />
    
    {/* Teacher (School/Caching) - Type selected on page */}
    <Route path="teacher/signup" element={<TeacherSignup />} />
    <Route path="teacher/login" element={<TeacherLogin />} />
  </Route>
);

export default AuthRoutes;