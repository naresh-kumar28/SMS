import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AppIcon from '../../../components/common/AppIcon';
import SvgIcon from '../../../components/common/SvgIcons';
import Dropdown from '../../../components/common/Dropdown';
import toast from 'react-hot-toast';
import { useAuth } from '../../../hooks/api/useAuth';
import { getErrorMessage } from '../../../utils/errorHelpers';

export default function Register() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    institutionName: '',
    type: '',
    address: '',
    city: '',
    state: '',
    password: '',
    confirmPassword: '',
  });
  const [showPasswords, setShowPasswords] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const institutionTypes = [
    { value: 'SCHOOL', label: 'School' },
    { value: 'COACHING', label: 'Coaching' },
  ];

  const navigate = useNavigate();
  const { registerInstitution, isRegisteringInstitution } = useAuth();

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      const payload = {
        email: formData.email,
        password: formData.password,
        full_name: formData.fullName,
        phone: formData.phone,
        institution_name: formData.institutionName,
        institution_type: formData.type || 'SCHOOL',
        address: formData.address,
        city: formData.city,
        state: formData.state
      };

      await registerInstitution(payload);
      toast.success(`${formData.type === 'SCHOOL' ? 'School' : 'Coaching'} registered successfully!`);

      if (formData.type === 'COACHING') {
        navigate('/dashboard/coaching/overview');
      } else {
        navigate('/dashboard/school/overview');
      }
    } catch (err) {
      toast.error(getErrorMessage(err, 'Registration failed. Please try again.'));
    }
  };

  return (
    <div className="space-y-5">
      <div className="text-center">
        <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
          <AppIcon name="school" size={28} className="text-primary" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900">Register Institution</h1>
        <p className="text-sm text-slate-500 mt-1">Create your account and get started</p>
      </div>

      <form className="space-y-3" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Full Name */}
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Full Name</label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                <AppIcon name="person" size={16} />
              </div>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => handleChange('fullName', e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                placeholder="Your full name"
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Phone Number</label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                <AppIcon name="phone" size={16} />
              </div>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                placeholder="+91 98765 43210"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Email */}
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
              />
            </div>
          </div>

          {/* Type Dropdown */}
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Type</label>
            <Dropdown
              value={formData.type}
              onChange={(val) => handleChange('type', val)}
              options={institutionTypes}
              placeholder="Select type"
              className="w-full"
            />
          </div>
        </div>

        {/* Institution Name */}
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">Institution Name</label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              <AppIcon name="school" size={16} />
            </div>
            <input
              type="text"
              value={formData.institutionName}
              onChange={(e) => handleChange('institutionName', e.target.value)}
              className="w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              placeholder="Delhi Public School"
            />
          </div>
        </div>



        {/* Address */}
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">Address</label>
          <div className="relative">
            <div className="absolute left-3 top-3 text-slate-400">
              <AppIcon name="location_on" size={16} />
            </div>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => handleChange('address', e.target.value)}
              className="w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              placeholder="Street address"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* City */}
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">City</label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                <AppIcon name="location_on" size={16} />
              </div>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => handleChange('city', e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                placeholder="City"
              />
            </div>
          </div>

          {/* State */}
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">State</label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                <AppIcon name="location_on" size={16} />
              </div>
              <input
                type="text"
                value={formData.state}
                onChange={(e) => handleChange('state', e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                placeholder="State"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Password */}
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Password</label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                <AppIcon name="lock" size={16} />
              </div>
              <input
                type={showPasswords ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => handleChange('password', e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                placeholder="Min 8 characters"
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

          {/* Confirm Password */}
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Confirm Password</label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                <AppIcon name="lock" size={16} />
              </div>
              <input
                type={showPasswords ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={(e) => handleChange('confirmPassword', e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                placeholder="Confirm password"
              />
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


        {/* Submit */}
        <button
          type="submit"
          disabled={!agreeTerms || isRegisteringInstitution}
          className="w-full py-2.5 bg-primary text-white rounded-lg text-sm font-medium hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2 transition-all shadow-sm active:scale-[0.98]"
        >
          {isRegisteringInstitution ? (
            <AppIcon name="sync" size={16} className="animate-spin" />
          ) : (
            <AppIcon name="business" size={16} />
          )}
          {isRegisteringInstitution ? 'Registering...' : 'Register Institution'}
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
        <Link to="/auth/institution/login" className="text-primary font-semibold hover:underline">Sign in</Link>
      </p>

    </div>
  );
}