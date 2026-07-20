import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useManagerAuth } from '../../../hooks/api/useManagerAuth';
import { selectManagerAuth } from '../../../redux/slice/managerAuthSlice';
import AppIcon from '../../../components/common/AppIcon';
import SvgIcon from '../../../components/common/SvgIcons';
import toast from 'react-hot-toast';
import { getErrorMessage } from '../../../utils/errorHelpers';

export default function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password_confirm: '',
    first_name: '',
    last_name: '',
    phone: '',
  });
  const [showPasswords, setShowPasswords] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector(selectManagerAuth);
  const { register, isRegistering } = useManagerAuth();

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

    if (formData.password !== formData.password_confirm) {
      toast.error('Passwords do not match');
      return;
    }

    if (formData.password.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }

    if (!agreeTerms) {
      toast.error('Please agree to the terms and conditions');
      return;
    }

    const { password_confirm: _, ...registerData } = formData;
    try {
      const response = await register(registerData);
      const userData = response.data.user;

      toast.success('Manager Registered Successfully!');

      // Navigate to correct dashboard immediately
      if (userData?.is_manager || userData?.is_superuser) {
        navigate('/dashboard/manager', { replace: true });
      } else {
        navigate('/dashboard/partner', { replace: true });
      }
    } catch (error) {
      toast.error(getErrorMessage(error, 'Manager Registration Failed'));
    }
  };

  return (
    <div className="space-y-5">
      <div className="text-center">
        <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
          <AppIcon name="school" size={28} className="text-primary" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900">Create account</h1>
        <p className="text-sm text-slate-500 mt-1">Start managing your school today</p>
      </div>


      <form className="space-y-3" onSubmit={handleSubmit}>
        <div className="space-y-2.5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">First Name</label>
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                placeholder="First name"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Last Name</label>
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                placeholder="Last name"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Username</label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                <AppIcon name="person" size={16} />
              </div>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                placeholder="Choose a username"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Email</label>
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
                placeholder="email@example.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Phone (Optional)</label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                <AppIcon name="phone" size={16} />
              </div>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                placeholder="Enter phone number"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Password</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  <AppIcon name="lock" size={16} />
                </div>
                <input
                  type={showPasswords ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-10 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  placeholder="Min 8 characters"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPasswords(!showPasswords)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 outline-none cursor-pointer"
                >
                  <AppIcon name={showPasswords ? 'visibility_off' : 'visibility'} size={18} />
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Confirm Password</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  <AppIcon name="lock" size={16} />
                </div>
                <input
                  type={showPasswords ? 'text' : 'password'}
                  name="password_confirm"
                  value={formData.password_confirm}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  placeholder="Confirm password"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center pt-2">
          <label className="flex items-center gap-3 cursor-pointer select-none group">
            <div className="relative">
              <input
                type="checkbox"
                className="sr-only"
                checked={agreeTerms}
                onChange={() => setAgreeTerms(!agreeTerms)}
              />
              <div className={`w-5 h-5 rounded border-2 transition-all flex items-center justify-center ${agreeTerms ? 'bg-primary border-primary' : 'bg-white border-slate-300'}`}>
                {agreeTerms && <span className="text-white text-sm font-bold pb-0.5">🗸</span>}
              </div>
            </div>
            <span className="text-xs font-medium text-slate-500">
              I agree to the <Link to="/terms" onClick={(e) => e.stopPropagation()} className="text-primary font-medium hover:underline">Terms</Link> and <Link to="/privacy" onClick={(e) => e.stopPropagation()} className="text-primary font-medium hover:underline">Privacy Policy</Link>
            </span>
          </label>
        </div>

        <button 
          type="submit" 
          disabled={isRegistering || !agreeTerms} 
          className="w-full py-2.5 bg-primary text-white rounded-lg text-sm font-medium hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2 transition-all shadow-sm active:scale-[0.98]"
        >
          {isRegistering ? (
            <AppIcon name="sync" size={16} className="animate-spin" />
          ) : (
            <AppIcon name="person_add" size={16} />
          )}
          {isRegistering ? 'Creating account...' : 'Create account'}
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
        Already have an account?{' '}
        <Link to="/auth/manager/login" className="text-primary font-semibold hover:underline">Sign in</Link>
      </p>

    </div>
  );
}