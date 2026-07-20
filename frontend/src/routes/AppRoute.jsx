import { lazy } from 'react';
import { Navigate, Route } from 'react-router-dom';

const About = lazy(() => import('../pages/landing/About'));
const Contact = lazy(() => import('../pages/landing/Contact'));
const Home = lazy(() => import('../pages/landing/Home'));
const Pricing = lazy(() => import('../pages/landing/Pricing'));
const Services = lazy(() => import('../pages/landing/Services'));
const TempUrls = lazy(() => import('../pages/dev/TempUrls'));

const AppRoutes = () => (
  <>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/services" element={<Services />} />
    <Route path="/pricing" element={<Pricing />} />
    <Route path="/contact" element={<Contact />} />
    {import.meta.env.DEV && <Route path="/temp-urls" element={<TempUrls />} />}
    <Route path="/dashboard" element={<Navigate to="/dashboard/manager" replace />} />
  </>
);

export default AppRoutes;
