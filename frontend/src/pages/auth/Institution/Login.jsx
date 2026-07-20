import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppIcon from '../../../components/common/AppIcon';
import SvgIcon from '../../../components/common/SvgIcons';
import toast from 'react-hot-toast';
import { useAuth } from '../../../hooks/api/useAuth';
import { getErrorMessage } from '../../../utils/errorHelpers';
import { useSelector } from 'react-redux';
import { selectAuth } from '../../../redux/slice/authSlice';
import institutionsAPI from '../../../api/institutions';
import Dropdown from '../../../components/common/Dropdown';

export default function InstitutionLogin() {
  const [institutionType, setInstitutionType] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [institutionId, setInstitutionId] = useState('');
  const [institutions, setInstitutions] = useState([]);
  const [isLoadingInstitutions, setIsLoadingInstitutions] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();
  const { login, isLoggingIn } = useAuth();
  const { isAuthenticated, roleInfo, user } = useSelector(selectAuth);

  // Fetch institutions whenever type changes
  useEffect(() => {
    const fetchInstitutions = async () => {
      if (!institutionType) {
        setInstitutions([]);
        return;
      }
      setIsLoadingInstitutions(true);
      try {
        const response = await institutionsAPI.getInstitutions({ 
          is_active: 'true', 
          type: institutionType,
          signup: 'true' // Use discovery mode
        });
        setInstitutions(response.data.results || response.data);
      } catch (error) {
        console.error('Failed to fetch institutions:', error);
      } finally {
        setIsLoadingInstitutions(false);
      }
    };
    fetchInstitutions();
    setInstitutionId(''); // Reset selection
  }, [institutionType]);

  useEffect(() => {
    if (!isAuthenticated || !roleInfo || !user) return;

    const { role, institution_type: type } = roleInfo;

    // ONLY auto-redirect if the user is an ADMIN (matching this login page)
    // Teachers and Students can still access this page to login as Admin
    if (role === 'ADMIN') {
      navigate(type === 'COACHING' ? '/dashboard/coaching/overview' : '/dashboard/school/overview');
    }
  }, [isAuthenticated, roleInfo, user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password || !institutionId || !institutionType) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      await login({
        email,
        password,
        institution_id: institutionId,
        institution_type: institutionType
      });
      toast.success(`${institutionType === 'SCHOOL' ? 'School' : 'Coaching'} logged in successfully!`);
    } catch (error) {
      toast.error(getErrorMessage(error, 'Login failed. Please check your credentials.'));
    }
  };

  return (
    <div className="space-y-5">
      <div className="text-center">
        <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
          <AppIcon name="school" size={28} className="text-primary" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900">Welcome back</h1>
        <p className="text-sm text-slate-500 mt-1">Sign in to your institution</p>
      </div>

      <form className="space-y-3" onSubmit={handleSubmit}>
        <div className="space-y-3">
          {/* Institution Type */}
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Institution Type</label>
            <Dropdown
              value={institutionType}
              onChange={setInstitutionType}
              options={[
                { value: 'SCHOOL', label: 'School' },
                { value: 'COACHING', label: 'Coaching' }
              ]}
              placeholder="Select type..."
              className="w-full"
              leftIcon={<AppIcon name="category" size={16} />}
            />
          </div>

          {/* Institution Selection */}
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Select Institution</label>
            <div className="relative">
              <Dropdown
                value={institutionId}
                onChange={setInstitutionId}
                options={institutions.map(inst => ({
                  value: inst.id,
                  label: inst.name
                }))}
                placeholder={institutionType ? (isLoadingInstitutions ? 'Loading...' : 'Select your institution') : 'Select type first'}
                className="w-full"
                leftIcon={<AppIcon name="business" size={16} />}
                disabled={isLoadingInstitutions || !institutionType}
              />
            </div>
          </div>


          {/* Email */}
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Email Address</label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                <AppIcon name="mail" size={16} />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                placeholder="your.email@institution.com"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-medium text-slate-600">Password</label>
              <Link to="/auth/institution/forgot-password" className="text-xs text-primary hover:underline">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                <AppIcon name="lock" size={16} />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

          {/* Remember Me */}
          <div className="flex justify-between pt-2">
            <div
              onClick={() => setRememberMe(!rememberMe)}
              className="flex items-center gap-3 cursor-pointer select-none"
            >
              <div className={`w-8 h-4.5 rounded-md transition-colors relative ${rememberMe ? 'bg-primary' : 'bg-slate-200'}`}>
                <div className={`absolute top-0.5 w-3.5 h-3.5 bg-white rounded-full transition-transform ${rememberMe ? 'translate-x-4' : 'translate-x-0.5'}`} />
              </div>
              <span className="text-xs text-slate-500 font-medium">
                {rememberMe ? 'Saved sessions' : 'Remember this device'}
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
        New institution?{' '}
        <Link to="/auth/institution/register" className="text-primary font-semibold hover:underline">Register here</Link>
      </p>
    </div>
  );
}