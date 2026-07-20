import { useState } from 'react';
import AppIcon from '../../components/common/AppIcon';
import {
  DashboardPage,
  SectionCard,
} from '../../components/common/DashboardPrimitives';
import toast from 'react-hot-toast';
import { useManagerAuth } from '../../hooks/api/useManagerAuth';
import { ProfileSkeleton } from '../../components/common/Skeleton';
import { formatUserRole } from '../../utils/authHelpers';
import { useSelector } from 'react-redux';
import { selectManagerAuth } from '../../redux/slice/managerAuthSlice';

function ProfileForm({ user, roleInfo }) {
  const { updateProfile, isUpdatingProfile } = useManagerAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profilePreview, setProfilePreview] = useState(user.profile_picture);
  const [logoPreview, setLogoPreview] = useState(user.partner?.logo);
  const [formData, setFormData] = useState({
    first_name: user.first_name || '',
    last_name: user.last_name || '',
    phone: user.phone || '',
    address: user.address || '',
    company_name: user.partner?.company_name || '',
    website: user.partner?.website || '',
    description: user.partner?.description || '',
    profile_picture: null,
    logo: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      const file = files[0];
      setFormData(prev => ({ ...prev, [name]: file }));

      const reader = new FileReader();
      reader.onloadend = () => {
        if (name === 'profile_picture') setProfilePreview(reader.result);
        if (name === 'logo') setLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      Object.keys(formData).forEach(key => {
        if (formData[key] !== null) {
          data.append(key, formData[key]);
        }
      });
      await updateProfile(data);
      setIsEditing(false);
    } catch {
      // Error handled by hook
    }
  };

  const managerInfo = {
    name: user?.first_name || user?.last_name
      ? `${user.first_name || ''} ${user.last_name || ''}`.trim()
      : 'Not Set',
    email: user?.email || 'Not Set',
    phone: user?.phone || 'Not Set',
    role: formatUserRole(user, roleInfo),
    company: user?.partner?.company_name || 'Not Set',
    website: user?.partner?.website || 'Not Set',
    joinDate: user?.created_at?.split('T')[0] || 'Not Set',
    lastLogin: user?.last_login?.split('T')[0] || 'Not Set',
    permissions: user?.is_superuser || roleInfo?.is_manager ? 'Full Access' : 'Not Set',
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Profile Header Section */}
      <div className="relative mb-12">
        <div className="min-h-[160px] md:min-h-[200px] w-full bg-slate-50 rounded-3xl relative border border-slate-200/60 p-6 md:p-10 flex items-center overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 0)', backgroundSize: '20px 20px' }} />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-8 w-full">
            <div className="relative group mx-auto md:mx-0">
              <div className="w-28 h-28 md:w-36 md:h-36 rounded-3xl bg-white p-1 shadow-sm overflow-hidden border border-slate-100 relative z-10">
                <div className="w-full h-full rounded-[1.4rem] overflow-hidden bg-slate-50 relative">
                  {profilePreview ? (
                    <img src={profilePreview} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <AppIcon name="person" size={48} className="text-slate-300" />
                    </div>
                  )}
                  {isEditing && (
                    <label className="absolute inset-0 bg-slate-900/40 backdrop-blur-[1px] flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer">
                      <input type="file" name="profile_picture" onChange={handleFileChange} className="hidden" accept="image/*" />
                      <AppIcon name="photo_camera" size={24} className="text-white mb-1" />
                      <span className="text-[10px] text-white font-medium uppercase tracking-widest">Update</span>
                    </label>
                  )}
                </div>
              </div>
              <div className="absolute inset-0 translate-y-2 bg-slate-200/40 blur-xl rounded-3xl z-0" />
            </div>

            <div className="flex-1 pb-2">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="text-center md:text-left">
                  <h3 className="text-3xl md:text-4xl font-medium text-slate-900 tracking-tight leading-none mb-3 text-nowrap capitalize">{managerInfo.name}</h3>
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                    <span className="px-3 py-1 bg-primary text-white text-[10px] font-medium rounded-lg uppercase tracking-wider shadow-sm">
                      {managerInfo.role}
                    </span>
                    <div className="flex items-center gap-1.5 text-slate-500 text-xs font-medium bg-white px-2.5 py-1.5 rounded-lg border border-slate-100 shadow-sm">
                      <AppIcon name="mail" size={14} className="text-slate-400" />
                      {managerInfo.email}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-center md:justify-end gap-3 w-full md:w-auto mt-4 md:mt-0">
                  {!isEditing ? (
                    <button
                      type="button"
                      onClick={() => setIsEditing(true)}
                      className="w-full md:w-auto px-6 py-2.5 text-nowrap bg-white text-slate-900 border border-slate-100 rounded-xl text-sm font-medium hover:bg-slate-50 transition-all flex items-center justify-center gap-2 shadow-sm"
                    >
                      <AppIcon name="edit" size={16} />
                      Edit Profile
                    </button>
                  ) : (
                    <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="w-full sm:w-auto px-4 py-2.5 bg-slate-100 text-slate-600 rounded-xl text-sm font-medium hover:bg-slate-200 transition-all"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isUpdatingProfile}
                        className="w-full sm:w-auto px-6 py-2.5 bg-primary text-white rounded-xl text-sm font-medium hover:opacity-90 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                      >
                        {isUpdatingProfile ? (
                          <AppIcon name="refresh" size={16} className="animate-spin" />
                        ) : (
                          <AppIcon name="save" size={16} />
                        )}
                        Save Changes
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="space-y-6">
          <SectionCard title="Organization Identity">
            <div className="space-y-6">
              <div className="flex flex-col items-center text-center p-6 bg-slate-50 rounded-3xl border border-slate-100 relative group">
                <div className="w-24 h-24 rounded-2xl bg-white shadow-sm flex items-center justify-center p-2 mb-4 border border-slate-100">
                  {logoPreview ? (
                    <img src={logoPreview} alt="Logo" className="w-full h-full object-contain" />
                  ) : (
                    <AppIcon name="business" size={40} className="text-slate-300" />
                  )}
                </div>
                {isEditing && (
                  <label className="absolute top-4 right-4 w-8 h-8 bg-white text-primary rounded-full shadow-md flex items-center justify-center cursor-pointer hover:bg-slate-50 transition-colors">
                    <input type="file" name="logo" onChange={handleFileChange} className="hidden" accept="image/*" />
                    <AppIcon name="upload" size={16} />
                  </label>
                )}
                <h4 className="text-lg font-medium text-slate-900 tracking-tight">{managerInfo.company}</h4>
                <p className="text-xs text-slate-500 font-medium uppercase tracking-widest mt-1">Primary Organization</p>
              </div>

              <div className="space-y-4 px-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center">
                    <AppIcon name="language" size={16} className="text-indigo-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Website</p>
                    {isEditing ? (
                      <input
                        type="text"
                        name="website"
                        value={formData.website}
                        onChange={handleInputChange}
                        className="w-full text-xs font-medium text-slate-900 border-b border-indigo-200 focus:border-indigo-500 outline-none bg-transparent"
                      />
                    ) : (
                      <a href={managerInfo.website} target="_blank" rel="noreferrer" className="text-sm font-medium text-slate-900 hover:text-primary transition-colors truncate block">
                        {managerInfo.website}
                      </a>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
                    <AppIcon name="calendar_today" size={16} className="text-emerald-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Partner Since</p>
                    <p className="text-sm font-medium text-slate-900">{managerInfo.joinDate}</p>
                  </div>
                </div>
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Performance Status">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10">
                <p className="text-[10px] text-primary font-medium uppercase tracking-widest mb-1">Status</p>
                <p className="text-lg font-medium text-slate-900 leading-none">Active</p>
              </div>
              <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100">
                <p className="text-[10px] text-amber-600 font-medium uppercase tracking-widest mb-1">Tier</p>
                <p className="text-lg font-medium text-slate-900 leading-none">Premium</p>
              </div>
            </div>
          </SectionCard>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <SectionCard title="Contact & Personal Information">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <div>
                <label className="text-[10px] text-slate-400 font-medium uppercase tracking-widest block mb-1">First Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleInputChange}
                    className="w-full text-base font-medium text-slate-900 border-b-2 border-slate-100 focus:border-primary outline-none bg-transparent py-1 transition-colors"
                  />
                ) : (
                  <p className="text-base font-medium text-slate-900">{user?.first_name || 'Not Set'}</p>
                )}
              </div>
              <div>
                <label className="text-[10px] text-slate-400 font-medium uppercase tracking-widest block mb-1">Last Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleInputChange}
                    className="w-full text-base font-medium text-slate-900 border-b-2 border-slate-100 focus:border-primary outline-none bg-transparent py-1 transition-colors"
                  />
                ) : (
                  <p className="text-base font-medium text-slate-900">{user?.last_name || 'Not Set'}</p>
                )}
              </div>
              <div>
                <label className="text-[10px] text-slate-400 font-medium uppercase tracking-widest block mb-1">Phone Number</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full text-base font-medium text-slate-900 border-b-2 border-slate-100 focus:border-primary outline-none bg-transparent py-1 transition-colors"
                  />
                ) : (
                  <p className="text-base font-medium text-slate-900">{managerInfo.phone}</p>
                )}
              </div>
              <div>
                <label className="text-[10px] text-slate-400 font-medium uppercase tracking-widest block mb-1">Office Address</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full text-base font-medium text-slate-900 border-b-2 border-slate-100 focus:border-primary outline-none bg-transparent py-1 transition-colors"
                  />
                ) : (
                  <p className="text-base font-medium text-slate-900">{user?.address || 'Not Set'}</p>
                )}
              </div>
              <div className="md:col-span-2">
                <label className="text-[10px] text-slate-400 font-medium uppercase tracking-widest block mb-1">Company / Organization Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="company_name"
                    value={formData.company_name}
                    onChange={handleInputChange}
                    className="w-full text-base font-medium text-slate-900 border-b-2 border-slate-100 focus:border-primary outline-none bg-transparent py-1 transition-colors"
                  />
                ) : (
                  <p className="text-base font-medium text-slate-900">{managerInfo.company}</p>
                )}
              </div>
              <div className="md:col-span-2">
                <label className="text-[10px] text-slate-400 font-medium uppercase tracking-widest block mb-1">Organization Bio</label>
                {isEditing ? (
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full text-sm font-medium text-slate-900 border-2 border-slate-100 rounded-2xl p-4 mt-2 focus:border-primary outline-none bg-white transition-all shadow-inner"
                    placeholder="Tell us about your organization..."
                  />
                ) : (
                  <p className="text-sm font-medium text-slate-600 mt-2 bg-slate-50 p-4 rounded-2xl border border-slate-100 italic leading-relaxed">
                    {user?.partner?.description || 'Not Set'}
                  </p>
                )}
              </div>
            </div>
          </SectionCard>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SectionCard title="Security & Access">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <AppIcon name="security" size={18} className="text-blue-600" />
                    <span className="text-sm font-medium text-slate-700">Role level</span>
                  </div>
                  <span className="text-sm font-medium text-slate-900 uppercase tracking-tighter">{managerInfo.permissions}</span>
                </div>
                <button
                  type="button"
                  onClick={() => toast.success('Redirecting to security settings...')}
                  className="w-full py-3 bg-white border-2 border-slate-100 rounded-xl text-sm font-medium text-slate-900 hover:border-primary hover:text-primary transition-all flex items-center justify-center gap-2"
                >
                  <AppIcon name="lock" size={16} />
                  Manage Security
                </button>
              </div>
            </SectionCard>

            <SectionCard title="Activity">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <AppIcon name="login" size={18} className="text-emerald-600" />
                    <span className="text-sm font-medium text-slate-700">Last login</span>
                  </div>
                  <span className="text-sm font-medium text-slate-900">{managerInfo.lastLogin}</span>
                </div>
                <button
                  type="button"
                  onClick={() => toast.success('Fetching activity logs...')}
                  className="w-full py-3 bg-white border-2 border-slate-100 rounded-xl text-sm font-medium text-slate-900 hover:border-primary hover:text-primary transition-all flex items-center justify-center gap-2"
                >
                  <AppIcon name="history" size={16} />
                  View History
                </button>
              </div>
            </SectionCard>
          </div>
        </div>
      </div>
    </form>
  );
}

export default function ManagerProfile() {
  const { user, isLoadingProfile } = useManagerAuth();
  const { roleInfo } = useSelector(selectManagerAuth);

  if (isLoadingProfile || !user) {
    return (
      <DashboardPage eyebrow="Admin profile" title="My Profile">
        <ProfileSkeleton />
      </DashboardPage>
    );
  }

  return (
    <DashboardPage
      eyebrow="Admin profile"
      title="My Profile"
    >
      <ProfileForm user={user} roleInfo={roleInfo} key={user.id} />
    </DashboardPage>
  );
}