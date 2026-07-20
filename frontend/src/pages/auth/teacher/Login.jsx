import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../../hooks/api/useAuth';
import { useInstitutionsList } from '../../../hooks/api/useInstitutions';
import toast from 'react-hot-toast';
import AppIcon from '../../../components/common/AppIcon';
import SvgIcon from '../../../components/common/SvgIcons';
import Dropdown from '../../../components/common/Dropdown';
import { getErrorMessage } from '../../../utils/errorHelpers';

export default function TeacherLogin() {
  const [institutionType, setInstitutionType] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    institution_id: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();
  const { login, isLoggingIn } = useAuth();

  // Fetch institutions using React Query hook
  const { data: institutionsData, isLoading: loadingInstitutions } = useInstitutionsList(
    institutionType ? { type: institutionType, page_size: 100, signup: 'true' } : null
  );

  const institutions = institutionsData?.results || institutionsData || [];

  const handleInstitutionTypeChange = (val) => {
    setInstitutionType(val);
    setFormData(prev => ({ ...prev, institution_id: '' }));
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!institutionType) {
      toast.error('Please select institution type');
      return;
    }

    if (!formData.institution_id) {
      toast.error('Please select an institution');
      return;
    }

    try {
      await login({
        ...formData,
        institution_id: formData.institution_id,
        institution_type: institutionType,
        role: 'TEACHER',
      });
      toast.success('Logged in successfully!');

      if (institutionType === 'COACHING') {
        navigate('/dashboard/coaching-teacher/dashboard');
      } else {
        navigate('/dashboard/school-teacher/dashboard');
      }
    } catch (error) {
      toast.error(getErrorMessage(error, 'Login failed. Please check your credentials.'));
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
          <AppIcon name="school" size={28} className="text-primary" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900">Teacher Login</h1>
        <p className="text-sm text-slate-500 mt-1">Sign in to your account</p>
      </div>

      <form className="space-y-3" onSubmit={handleSubmit}>
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">Institution Type</label>
          <Dropdown
            value={institutionType}
            onChange={handleInstitutionTypeChange}
            options={[
              { value: 'SCHOOL', label: 'School' },
              { value: 'COACHING', label: 'Coaching' }
            ]}
            placeholder="Select type..."
            className="w-full"
            leftIcon={<AppIcon name="category" size={16} />}
          />
        </div>


        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">Institution Name</label>
          <Dropdown
            value={formData.institution_id}
            onChange={(val) => handleChange('institution_id', val)}
            options={institutions.map(inst => ({ value: inst.id, label: inst.name }))}
            disabled={loadingInstitutions || !institutionType}
            placeholder={loadingInstitutions ? 'Loading...' : 'Select institution...'}
            className="w-full"
            leftIcon={<AppIcon name="business" size={16} />}
          />
        </div>


        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">Email Address</label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              <AppIcon name="mail" size={16} />
            </div>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className="w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              placeholder="email@example.com"
              required
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-xs font-medium text-slate-600">Password</label>
            <Link to="/auth/teacher/forgot-password" unsafe_link="true" className="text-xs font-medium text-primary hover:underline">
              Forgot?
            </Link>
          </div>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              <AppIcon name="lock" size={16} />
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={(e) => handleChange('password', e.target.value)}
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


        <button
          type="submit"
          disabled={isLoggingIn}
          className="w-full py-2.5 bg-primary text-white rounded-lg text-sm font-medium hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2"
        >
          <AppIcon name="login" size={16} />
          {isLoggingIn ? 'Signing in...' : 'Sign In'}
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
        <Link to="/auth/teacher/signup" className="text-primary font-semibold hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}
