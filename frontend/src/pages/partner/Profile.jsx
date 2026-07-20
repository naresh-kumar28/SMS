import { useState } from 'react';
import AppIcon from '../../components/common/AppIcon';
import {
  DashboardPage,
  SectionCard,
} from '../../components/common/DashboardPrimitives';
import { usePartnerAuth } from '../../hooks/api/usePartnerAuth';
import { updateProfile } from '../../api/auth/profile';
import { ProfileSkeleton } from '../../components/common/Skeleton';
import toast from 'react-hot-toast';
import { formatUserRole } from '../../utils/authHelpers';

function ProfileForm({ user, roleInfo }) {
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.full_name || user.username || '',
    company: user.partner?.company_name || '',
    email: user.email || '',
    phone: user.phone || '',
    address: user.address || '',
    website: user.partner?.website || '',
    id: user.partner?.id ? `PRT-${user.partner.id.substring(0, 8).toUpperCase()}` : '',
    since: user.created_at?.split('T')[0] || '',
    status: user.is_active ? 'Active' : 'Inactive',
    tier: user.partner?.tier || 'Silver',
    isVerified: user.partner?.is_verified || false,
  });

  const partnerInfo = {
    name: formData.name || 'Not Set',
    company: formData.company || 'Not Set',
    email: formData.email || 'Not Set',
    phone: formData.phone || 'Not Set',
    address: formData.address || 'Not Set',
    website: formData.website || 'Not Set',
    id: formData.id || 'Not Set',
    since: formData.since || 'Not Set',
    status: formData.status || 'Inactive',
    tier: formData.tier || 'Silver',
    isVerified: formData.isVerified
  };

  const handleInputChange = (e, field) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
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
        company_name: formData.company,
        website: formData.website
      };

      const response = await updateProfile(updateData);
      
      if (response.data) {
        setFormData(prev => ({
          ...prev,
          name: response.data.full_name || response.data.username || '',
          company: response.data.partner?.company_name || '',
          phone: response.data.phone || '',
          address: response.data.address || '',
          website: response.data.partner?.website || '',
        }));
        setEditing(false);
        toast.success('Profile updated successfully!');
      }
    } catch {
      toast.error('Failed to update profile. Please try again.');
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <SectionCard title="Profile Overview" description="Your core identity">
        <div className="text-left">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 shadow-sm shrink-0">
              <AppIcon name="person" size={32} className="text-primary" />
            </div>
            <div>
              <p className="text-lg font-bold text-slate-900 capitalize leading-tight">{partnerInfo.name}</p>
              <p className="text-xs text-primary font-bold capitalize mt-1 mb-1">{formatUserRole(user, roleInfo)}</p>
              <p className="text-sm text-slate-500 font-bold capitalize">{partnerInfo.company}</p>
            </div>
          </div>

          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
              <AppIcon name="mail" size={18} className="text-slate-400" />
              <div className="overflow-hidden">
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Email Address</p>
                <p className="text-sm font-medium text-slate-700 truncate">{partnerInfo.email || 'Not Set'}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
              <AppIcon name="phone" size={18} className="text-slate-400" />
              <div>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Phone Number</p>
                <p className="text-sm font-medium text-slate-700">{partnerInfo.phone}</p>
              </div>
            </div>
            {partnerInfo.website !== 'Not Set' && (
              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <AppIcon name="language" size={18} className="text-slate-400" />
                <div className="overflow-hidden">
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Website</p>
                  <p className="text-sm font-medium text-slate-700 truncate">{partnerInfo.website}</p>
                </div>
              </div>
            )}
          </div>

          <button className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all flex items-center justify-center gap-2 shadow-sm">
            <AppIcon name="photo_camera" size={16} />
            Change Photo
          </button>
        </div>
      </SectionCard>

      <div className="lg:col-span-2 space-y-6">
        <SectionCard title="Personal Information" description="Your profile details">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange(e, 'name')}
                  disabled={!editing}
                  placeholder="Enter full name"
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary disabled:bg-slate-50 capitalize"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Company Name</label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => handleInputChange(e, 'company')}
                  disabled={!editing}
                  placeholder="Enter company name"
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary disabled:bg-slate-50 capitalize"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  disabled={true}
                  placeholder="Enter email address"
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary disabled:bg-slate-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange(e, 'phone')}
                  disabled={!editing}
                  placeholder="Enter phone number"
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary disabled:bg-slate-50"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Address</label>
              <textarea
                value={formData.address}
                onChange={(e) => handleInputChange(e, 'address')}
                disabled={!editing}
                rows={2}
                placeholder="Enter shop/office address"
                className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary disabled:bg-slate-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Website</label>
              <input
                type="url"
                value={formData.website}
                onChange={(e) => handleInputChange(e, 'website')}
                disabled={!editing}
                placeholder="https://example.com"
                className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary disabled:bg-slate-50"
              />
            </div>
            <div className="flex gap-3">
              {editing ? (
                <button
                  onClick={handleSave}
                  className="px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-bold hover:shadow-lg hover:shadow-primary/20 transition-all flex items-center gap-2"
                >
                  <AppIcon name="save" size={16} />
                  Save Changes
                </button>
              ) : (
                <button
                  onClick={() => setEditing(true)}
                  className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all shadow-sm flex items-center gap-2"
                >
                  <AppIcon name="edit" size={16} />
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Partnership Details" description="Your partnership information">
          <div className="space-y-4">
            <div className="grid grid-cols-2 xl:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-50">
                <p className="text-xs text-slate-500 mb-1">Partner ID</p>
                <p className="font-semibold text-slate-900">{partnerInfo.id}</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50">
                <p className="text-xs text-slate-500 mb-1">Partner Since</p>
                <p className="font-semibold text-slate-900">{partnerInfo.since}</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50">
                <p className="text-xs text-slate-500 mb-1">Partner Type</p>
                <p className="font-semibold text-slate-900">Education Partner</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50">
                <p className="text-xs text-slate-500 mb-1">Status</p>
                <span className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium ${partnerInfo.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                  {partnerInfo.status}
                </span>
              </div>
              <div className="p-4 rounded-xl bg-slate-50">
                <p className="text-xs text-slate-500 mb-1">Partner Tier</p>
                <span className="inline-flex items-center gap-1 rounded-md bg-blue-100 px-2 py-1 text-xs font-bold text-blue-700 uppercase tracking-wider">
                  {partnerInfo.tier}
                </span>
              </div>
              <div className="p-4 rounded-xl bg-slate-50">
                <p className="text-xs text-slate-500 mb-1">Verification</p>
                <div className="flex items-center gap-1.5">
                  {partnerInfo.isVerified ? (
                    <div className="flex items-center gap-1 text-emerald-600">
                      <AppIcon name="verified" size={14} />
                      <span className="text-xs font-bold">Verified Partner</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-amber-600">
                      <AppIcon name="info" size={14} />
                      <span className="text-xs font-bold">Pending Review</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}

export default function PartnerProfile() {
  const { user, roleInfo, isLoadingProfile } = usePartnerAuth();

  if (isLoadingProfile && !user) {
    return (
      <DashboardPage eyebrow="Partner Dashboard" title="Profile">
        <ProfileSkeleton />
      </DashboardPage>
    );
  }

  return (
    <DashboardPage
      eyebrow="Partner Dashboard"
      title="Profile"
    >
      <ProfileForm user={user} roleInfo={roleInfo} key={user.id} />
    </DashboardPage>
  );
}