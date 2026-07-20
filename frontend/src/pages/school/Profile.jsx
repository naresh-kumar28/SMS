import { useState } from 'react';
import AppIcon from '../../components/common/AppIcon';
import Dropdown from '../../components/common/Dropdown';
import {
  DashboardPage,
  SectionCard,
} from '../../components/common/DashboardPrimitives';
import { useAuth } from '../../hooks/api/useAuth';
import { updateProfile } from '../../api/auth/profile';
import { ProfileSkeleton } from '../../components/common/Skeleton';

import toast from 'react-hot-toast';
import { formatUserRole } from '../../utils/authHelpers';

function ProfileForm({ user, roleInfo }) {
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.full_name || '',
    email: user.email || '',
    phone: user.phone || '',
    institutionName: user.institution?.name || '',
    type: user.institution?.type || '',
    address: user.institution?.address || '',
    city: user.institution?.city || '',
    state: user.institution?.state || '',
    since: user.created_at?.split('T')[0] || '',
  });

  const institutionTypes = [
    { value: 'SCHOOL', label: 'School' },
    { value: 'COACHING', label: 'Coaching Center' },
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      const nameParts = formData.name.trim().split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';

      const updateData = {
        first_name: firstName,
        last_name: lastName,
        phone: formData.phone,
        address: formData.address,
        institution_name: formData.institutionName,
        institution_type: formData.type,
        city: formData.city,
        state: formData.state
      };

      await updateProfile(updateData);
      setEditing(false);
      toast.success('Institutional profile updated successfully!');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to update profile. Please try again.');
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Column: Overview */}
      <SectionCard title="Overview" description="Your institutional identity" className="overflow-visible">
        <div className="text-left">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 shadow-sm shrink-0">
              <AppIcon name="school" size={32} className="text-primary" />
            </div>
            <div>
              <p className="text-lg font-bold text-slate-900 leading-tight">{formData.institutionName || 'Not Set'}</p>
              <p className="text-sm font-medium text-slate-700 capitalize">{formData.name || 'Not Set'}</p>
              <p className="text-sm text-primary font-bold capitalize mt-1">{formatUserRole(user, roleInfo)}</p>
            </div>
          </div>

          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
              <AppIcon name="email" size={18} className="text-slate-400" />
              <div>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Email</p>
                <p className="text-sm font-medium text-slate-700">{formData.email || 'Not Set'}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
              <AppIcon name="call" size={18} className="text-slate-400" />
              <div>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Phone</p>
                <p className="text-sm font-medium text-slate-700">{formData.phone || 'Not Set'}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
              <AppIcon name="location_on" size={18} className="text-slate-400" />
              <div>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Location</p>
                <p className="text-sm font-medium text-slate-700">
                  {(!formData.city && !formData.state) 
                    ? 'Not Set' 
                    : [formData.city, formData.state].filter(Boolean).join(', ')}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
              <AppIcon name="verified" size={18} className="text-emerald-500" />
              <div>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Status</p>
                <p className="text-xs font-bold text-emerald-600">Active & Verified</p>
              </div>
            </div>
          </div>

          <button className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all flex items-center justify-center gap-2 shadow-sm mb-3">
            <AppIcon name="photo_camera" size={16} />
            Update Logo
          </button>
        </div>
      </SectionCard>

      {/* Right Column: Information Forms */}
      <div className="lg:col-span-2 space-y-6">
        <SectionCard title="Administrator Details" description="Your personal contact information">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  disabled={!editing}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary disabled:bg-slate-50 capitalize"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Contact Email</label>
                <input
                  type="email"
                  value={formData.email}
                  disabled={true}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 text-slate-500 cursor-not-allowed"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  disabled={!editing}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary disabled:bg-slate-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Institution Type</label>
                <Dropdown
                  options={institutionTypes}
                  value={formData.type}
                  onChange={(value) => handleInputChange('type', value)}
                  disabled={true}
                  placeholder="Select Type"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Institution Name</label>
              <input
                type="text"
                value={formData.institutionName}
                onChange={(e) => handleInputChange('institutionName', e.target.value)}
                disabled={!editing}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary disabled:bg-slate-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Complete Address</label>
              <textarea
                value={formData.address || ''}
                onChange={(e) => handleInputChange('address', e.target.value)}
                disabled={!editing}
                rows={2}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary disabled:bg-slate-50"
                placeholder="Enter complete address"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">City</label>
                <input
                  type="text"
                  value={formData.city || ''}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  disabled={!editing}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary disabled:bg-slate-50"
                  placeholder="Enter city"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">State</label>
                <input
                  type="text"
                  value={formData.state || ''}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                  disabled={!editing}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary disabled:bg-slate-50"
                  placeholder="Enter state"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              {editing ? (
                <button
                  onClick={handleSave}
                  className="px-5 py-2.5 bg-primary text-white rounded-xl text-xs font-bold hover:shadow-lg hover:shadow-primary/20 transition-all flex items-center gap-2"
                >
                  <AppIcon name="save" size={16} />
                  Save Profile
                </button>
              ) : (
                <button
                  onClick={() => setEditing(true)}
                  className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all shadow-sm flex items-center gap-2"
                >
                  <AppIcon name="edit" size={16} />
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}

export default function SchoolProfile() {
  const { user, roleInfo, isLoadingProfile } = useAuth();

  if (isLoadingProfile || !user) {
    return (
      <DashboardPage eyebrow="Institution Dashboard" title="School Profile">
        <ProfileSkeleton />
      </DashboardPage>
    );
  }

  return (
    <DashboardPage
      eyebrow="Institution Dashboard"
      title="School Profile"
    >
      <ProfileForm user={user} roleInfo={roleInfo} key={user.id} />
      
      <SectionCard title="Security & Authentication" className="mt-6">
        <div className="flex flex-col sm:flex-row items-center justify-between p-4 rounded-xl border border-slate-100 bg-slate-50/50 gap-4">
          <div className="flex items-center gap-3 w-full">
            <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center shrink-0">
              <AppIcon name="lock" size={20} className="text-amber-600" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">Account Password</p>
              <p className="text-xs text-slate-500">Security managed via encryption</p>
            </div>
          </div>
          <button className="w-full sm:w-auto px-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50 flex text-nowrap items-center justify-center gap-2">
            <AppIcon name="key" size={14} />
            Reset Password
          </button>
        </div>
      </SectionCard>
    </DashboardPage>
  );
}
