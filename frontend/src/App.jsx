import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import AppRoutes from './routes/AppRoute';
import AuthRoutes from './routes/AuthRoute';
import CoachingRoutes from './routes/CoachingRoute';
import CoachingTeacherRoutes from './routes/CoachingTeacherRoute';
import CoachingStudentRoutes from './routes/CoachingStudentRoute';
import ManagerRoutes from './routes/ManagerRoute';
import PartnerRoutes from './routes/PartnerRoute';
import SchoolRoutes from './routes/SchoolRoute';
import SchoolTeacherRoutes from './routes/SchoolTeacherRoute';
import SchoolStudentRoutes from './routes/SchoolStudentRoute';
import NotFound from './pages/NotFound';

function App() {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        {AppRoutes()}
        {AuthRoutes()}
        {ManagerRoutes()}
        {PartnerRoutes()}
        {SchoolRoutes()}
        {SchoolTeacherRoutes()}
        {SchoolStudentRoutes()}
        {CoachingRoutes()}
        {CoachingTeacherRoutes()}
        {CoachingStudentRoutes()}
        
        {/* 404 Catch-all */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;