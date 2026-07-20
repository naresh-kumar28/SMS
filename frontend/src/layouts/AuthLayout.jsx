import { Outlet, Link, useLocation } from 'react-router-dom';
import AppIcon from '../components/common/AppIcon';
import BrandLogo from '../components/common/BrandLogo';

export default function AuthLayout() {
  const location = useLocation();
  const path = location.pathname;

  const getPanelName = () => {
    if (path.includes('/auth/manager/')) return 'Manager Auth';
    if (path.includes('/auth/partner/')) return 'Partner Auth';
    if (path.includes('/auth/institution/')) return 'Institution Auth';
    if (path.includes('/auth/teacher/')) return 'Teacher Auth';
    if (path.includes('/auth/student/')) return 'Student Auth';
    return 'Authentication';
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 md:p-6 lg:p-8">
      {/* Main Container */}
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="flex min-h-[600px] lg:min-h-[700px]">
          {/* Left Side - Branding */}
          <div className="hidden lg:flex lg:w-[45%] bg-gradient-to-br from-primary via-blue-600 to-primary relative flex-col justify-between p-8 xl:p-10">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wOCI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjxjaXJjbGUgY3g9IjYwIiBjeT0iMzAiIHI9IjIiLz48Y2lyY2xlIGN4PSIxMCIgY3k9IjMwIiByPSIyIi8+PGNpcmNsZSBjeD0iOTAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
            
            {/* Brand - Top Left */}
            <div className="relative z-10">
              <BrandLogo variant="light" panelName={getPanelName()} />
            </div>

            {/* Content */}
            <div className="relative z-10 space-y-5">
              <div>
                <h2 className="text-2xl xl:text-3xl font-bold text-white leading-tight">
                  Manage your school<br />with complete control
                </h2>
                <p className="text-white/70 mt-3 text-sm">
                  The all-in-one platform for managing schools, coaching centers, and educational institutions.
                </p>
              </div>
              
              {/* Features */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-2 text-white/80 text-xs">
                  <AppIcon name="check_circle" size={14} />
                  <span>Student Management</span>
                </div>
                <div className="flex items-center gap-2 text-white/80 text-xs">
                  <AppIcon name="check_circle" size={14} />
                  <span>Fee Tracking</span>
                </div>
                <div className="flex items-center gap-2 text-white/80 text-xs">
                  <AppIcon name="check_circle" size={14} />
                  <span>Attendance</span>
                </div>
                <div className="flex items-center gap-2 text-white/80 text-xs">
                  <AppIcon name="check_circle" size={14} />
                  <span>Online Results</span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="relative z-10 text-white/50 text-xs">
              <p>&copy; 2024 Skoolnet. All rights reserved.</p>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="w-full lg:w-[55%] flex flex-col justify-center bg-white">
            {/* Mobile Logo */}
            <div className="lg:hidden p-6 pb-0">
              <BrandLogo panelName="Auth" />
            </div>

            {/* Form Container */}
            <div className="flex-1 flex items-center justify-center p-6 md:p-8">
              <div className="w-full max-w-sm lg:max-w-md space-y-8">
                <Outlet />
              </div>
            </div>

            {/* Mobile Footer */}
            <div className="lg:hidden text-center pb-4 text-xs text-slate-400">
              <p>&copy; 2024 Skoolnet. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}