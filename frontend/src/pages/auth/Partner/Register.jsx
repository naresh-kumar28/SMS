import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { usePartnerAuth } from '../../../hooks/api/usePartnerAuth';
import { selectPartnerAuth } from '../../../redux/slice/partnerAuthSlice';
import AppIcon from '../../../components/common/AppIcon';
import SvgIcon from '../../../components/common/SvgIcons';
import toast from 'react-hot-toast';
import { getErrorMessage } from '../../../utils/errorHelpers';

export default function PartnerRegister() {
    const [formData, setFormData] = useState({
        companyName: '',
        contactName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        agreeTerms: false,
    });
    const [showPasswords, setShowPasswords] = useState(false);

    const navigate = useNavigate();
    const { isAuthenticated, user } = useSelector(selectPartnerAuth);
    const { register, isRegistering } = usePartnerAuth();

    useEffect(() => {
        if (!isAuthenticated || !user) return;

        if (user.is_partner) {
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

        if (formData.password !== formData.confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        if (formData.password.length < 6) {
            toast.error('Password must be at least 6 characters');
            return;
        }

        const { confirmPassword: _, agreeTerms: __, ...registerData } = formData;
        try {
            const response = await register(registerData);
            const userData = response.data.user;

            toast.success('Partner registered successfully!');

            if (userData.is_partner) {
                navigate('/dashboard/partner', { replace: true });
            }
        } catch (error) {
            toast.error(getErrorMessage(error, 'Registration failed'));
        }
    };

    return (
        <div className="space-y-6">
            <div className="text-center">
                <div className="w-14 h-14 rounded-xl bg-purple-100 flex items-center justify-center mx-auto mb-3">
                    <AppIcon name="partners" size={28} className="text-purple-600" />
                </div>
                <h1 className="text-2xl font-bold text-slate-900">Become a Partner</h1>
                <p className="text-sm text-slate-500 mt-1">Register to manage schools and coaching centers</p>
            </div>


            <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="space-y-3">
                    <div>
                        <label className="block text-xs font-medium text-slate-600 mb-1">Company/Organization Name</label>
                        <div className="relative">
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                                <AppIcon name="business" size={16} />
                            </div>
                            <input
                                type="text"
                                name="companyName"
                                value={formData.companyName}
                                onChange={handleChange}
                                className="w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                                placeholder="Your organization name"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs font-medium text-slate-600 mb-1">Contact Person</label>
                            <div className="relative">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                                    <AppIcon name="person" size={16} />
                                </div>
                                <input
                                    type="text"
                                    name="contactName"
                                    value={formData.contactName}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                                    placeholder="Full name"
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-slate-600 mb-1">Phone Number</label>
                            <div className="relative">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                                    <AppIcon name="phone" size={16} />
                                </div>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                                    placeholder="+91 98765 43210"
                                    required
                                />
                            </div>
                        </div>
                    </div>

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
                                className="w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                                placeholder="partner@example.com"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                                    className="w-full pl-10 pr-10 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                                    placeholder="Create password"
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
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                                    placeholder="Confirm password"
                                    required
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
                                    checked={formData.agreeTerms}
                                    onChange={() => setFormData({ ...formData, agreeTerms: !formData.agreeTerms })}
                                />
                                <div className={`w-5 h-5 rounded border-2 transition-all flex items-center justify-center ${formData.agreeTerms ? 'bg-purple-600 border-purple-600' : 'bg-white border-slate-300'}`}>
                                    {formData.agreeTerms && <span className="text-white text-sm font-bold pb-0.5">🗸</span>}
                                </div>
                            </div>
                            <span className="text-xs font-medium text-slate-500">
                                I agree to the <Link to="/terms" onClick={(e) => e.stopPropagation()} className="text-purple-600 font-medium hover:underline">Terms</Link> and <Link to="/privacy" onClick={(e) => e.stopPropagation()} className="text-purple-600 font-medium hover:underline">Privacy Policy</Link>
                            </span>
                        </label>
                    </div>

                </div>

                <button
                    type="submit"
                    disabled={isRegistering || !formData.agreeTerms}
                    className="w-full py-2.5 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm active:scale-[0.98]"
                >

                    {isRegistering ? (
                        <AppIcon name="sync" size={16} className="animate-spin" />
                    ) : (
                        <AppIcon name="person_add" size={16} />
                    )}
                    {isRegistering ? 'Creating account...' : 'Register as Partner'}
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
                Already have a partner account?{' '}
                <Link to="/auth/partner/login" className="text-purple-600 font-semibold hover:underline">Sign in</Link>
            </p>

        </div>
    );
}
