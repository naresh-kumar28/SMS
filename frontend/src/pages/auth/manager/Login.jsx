import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useManagerAuth } from '../../../hooks/api/useManagerAuth';
import { selectManagerAuth } from '../../../redux/slice/managerAuthSlice';
import AppIcon from '../../../components/common/AppIcon';
import SvgIcon from '../../../components/common/SvgIcons';
import toast from 'react-hot-toast';
import { getErrorMessage } from '../../../utils/errorHelpers';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector(selectManagerAuth);
  const { login, isLoggingIn } = useManagerAuth();

  useEffect(() => {
    if (!isAuthenticated || !user) return;

    // Role-based redirection
    if (user.is_superuser || user.is_manager) {
      navigate('/dashboard/manager', { replace: true });
    } else if (user.is_partner) {
      navigate('/dashboard/partner', { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(formData);
      const userData = response.data.user;

      toast.success('Manager Logged In Successfully!');

      // Navigate to correct dashboard immediately
      if (userData?.is_manager || userData?.is_superuser) {
        navigate('/dashboard/manager', { replace: true });
      } else {
        navigate('/dashboard/partner', { replace: true });
      }
    } catch (error) {
      toast.error(getErrorMessage(error, 'Manager Login failed'));
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
          <AppIcon name="school" size={28} className="text-primary" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900">Welcome back</h1>
        <p className="text-sm text-slate-500 mt-1">Sign in to continue to Skoolnet</p>
      </div>


      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Email Address</label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                <AppIcon name="mail" size={16} />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-medium text-slate-600">Password</label>
              <Link to="/auth/manager/forgot-password" className="text-xs font-medium text-primary hover:underline">
                Forgot?
              </Link>
            </div>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                <AppIcon name="lock" size={16} />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-10 pr-10 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                placeholder="Enter password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 outline-none cursor-pointer"
              >
                <AppIcon name={showPassword ? 'visibility_off' : 'visibility'} size={18} />
              </button>
            </div>
          </div>

          <div className="flex justify-between pt-2">
            <div
              onClick={() => setRememberMe(!rememberMe)}
              className="flex items-center gap-3 cursor-pointer select-none"
            >
              <div className={`w-8 h-4.5 rounded-md transition-colors relative ${rememberMe ? 'bg-primary' : 'bg-slate-200'}`}>
                <div className={`absolute top-0.5 w-3.5 h-3.5 bg-white rounded-full transition-transform ${rememberMe ? 'translate-x-4' : 'translate-x-0.5'}`} />
              </div>
              <span className="text-xs text-slate-500 font-medium">
                {rememberMe ? 'Saved sessions' : 'Remember me'}
              </span>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoggingIn}
          className="w-full py-2.5 bg-primary text-white rounded-lg text-sm font-medium hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isLoggingIn ? (
            <AppIcon name="sync" size={16} className="animate-spin" />
          ) : (
            <AppIcon name="login" size={16} />
          )}
          {isLoggingIn ? 'Signing in...' : 'Sign in to Dashboard'}
        </button>
      </form>

      <div className="flex items-center gap-3 py-1">
        <div className="flex-1 h-px bg-slate-100"></div>
        <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">Or continue with</span>
        <div className="flex-1 h-px bg-slate-100"></div>
      </div>

      <div className="grid grid-cols-1 gap-2">
        <button 
          type="button"
          className="w-full py-2.5 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center justify-center gap-3 bg-white"
        >
          <SvgIcon name="google" size={18} />
          <span>Continue with Google</span>
        </button>
      </div>

      <p className="text-center text-xs text-slate-500 pt-2">
        Don't have an account?{' '}
        <Link to="/auth/manager/signup" className="text-primary font-semibold hover:underline">
          Create one
        </Link>
      </p>
    </div>
  );
}