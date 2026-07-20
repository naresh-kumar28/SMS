import { Link, useNavigate, useLocation } from 'react-router-dom';
import AppIcon from '../components/common/AppIcon';

export default function NotFound() {
  const navigate = useNavigate();
  const location = useLocation();

  const getPanelInfo = () => {
    const path = location.pathname;
    if (path.includes('/dashboard/partner')) return { name: 'Partner Panel', path: '/dashboard/partner/overview' };
    if (path.includes('/dashboard/school')) return { name: 'School Panel', path: '/dashboard/school/overview' };
    if (path.includes('/dashboard/coaching')) return { name: 'Coaching Panel', path: '/dashboard/coaching/overview' };
    if (path.includes('/dashboard/manager')) return { name: 'Manager Panel', path: '/dashboard/manager/overview' };
    if (path.includes('/dashboard/teacher')) return { name: 'Teacher Panel', path: '/dashboard/teacher/overview' };
    if (path.includes('/dashboard/student')) return { name: 'Student Panel', path: '/dashboard/student/overview' };
    return { name: 'Home', path: '/' };
  };

  const panel = getPanelInfo();

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center">
        {/* Animated Icon */}
        <div className="relative mb-8">
          <div className="w-24 h-24 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto animate-bounce">
            <AppIcon name="search" size={48} className="text-purple-600" />
          </div>
          
        </div>

        {/* Text Content */}
        <h1 className="text-4xl font-extrabold text-slate-900 mb-2 tracking-tight">
          Page Not Found
        </h1>
        <p className="text-slate-500 mb-8 leading-relaxed font-medium">
          The requested URL was not found on this server. <br/>
          <span className="text-sm font-normal opacity-75">Please verify the link or navigate back to safety.</span>
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl font-medium hover:bg-slate-50 transition-all flex items-center justify-center gap-2 shadow-sm"
          >
            <AppIcon name="arrow_back" size={18} />
            Go Back
          </button>
          <Link
            to={panel.path}
            className="px-6 py-3 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20"
          >
            <AppIcon name="dashboard" size={18} />
            Go to {panel.name}
          </Link>
        </div>

        {/* Support Section */}
        <div className="mt-12 pt-8 border-t border-slate-200">
          <p className="text-xs text-slate-400">
            Need help? <Link to="/contact" className="text-purple-600 hover:underline">Contact our support team</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
