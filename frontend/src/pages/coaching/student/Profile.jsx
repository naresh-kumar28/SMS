import { useState } from 'react';
import {
  DashboardPage,
  SectionCard,
  StatusBadge,
} from '../../../components/common/DashboardPrimitives';
import AppIcon from '../../../components/common/AppIcon';
import { useAuth } from '../../../hooks/api/useAuth';
import toast from 'react-hot-toast';
import { formatUserRole } from '../../../utils/authHelpers';

function ProfileForm({ user, roleInfo, updateProfile, isUpdatingProfile }) {
  const [isEditing, setIsEditing] = useState(false);
  const inst = user.institution || {};
  const [formData, setFormData] = useState({
    name: user.full_name || user.username || '',
    email: user.email || '',
    phone: user.phone || '',
    address: user.address || '',
    dob: inst.dob || '',
    course: inst.course_name || '',
    batch: inst.batch_name || '',
    fatherName: inst.father_name || '',
    parentPhone: inst.parent_phone || '',
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      const updateData = {
        full_name: formData.name,
        phone: formData.phone,
        address: formData.address,
        dob: formData.dob,
        father_name: formData.fatherName,
        parent_phone: formData.parentPhone,
        course_name: formData.course,
        batch_name: formData.batch,
      };

      await updateProfile(updateData);
      setIsEditing(false);
    } catch (error) {
      toast.error(error.message || 'Failed to update profile');
    }
  };

  const studentData = {
    name: formData.name || user?.full_name || user?.username || 'Not Set',
    email: formData.email || user?.email || 'Not Set',
    phone: formData.phone || user?.phone || 'Not Set',
    address: formData.address || user?.address || 'Not Set',
    dob: formData.dob || 'Not Set',
    course: formData.course || 'Not Set',
    batch: formData.batch || 'Not Set',
    parentName: formData.parentName || 'Not Set',
    parentPhone: formData.parentPhone || 'Not Set',
    joinDate: user?.date_joined?.split('T')[0] || 'Not Set',
    status: user?.is_active ? 'Active' : 'Inactive',
  };

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* Sidebar Column */}
      <SectionCard title="Student Overview" description="" className="lg:col-span-1">
        <div className="text-center">
          <div className="w-32 h-32 mx-auto rounded-2xl bg-slate-100 flex items-center justify-center mb-4 border-2 border-slate-50 shadow-inner">
            <AppIcon name="person" size={64} className="text-slate-300" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-1 capitalize truncate">{studentData.name}</h3>
          <p className="text-sm font-semibold text-primary mb-1 bg-primary/5 py-1 px-3 rounded-full inline-block">
             {formatUserRole(user, roleInfo)}
          </p>
          <p className="text-xs text-slate-500 mb-3 font-medium">
            {studentData.course} • Batch {studentData.batch}
          </p>
          
          <div className="flex justify-center mb-6">
            <StatusBadge tone={studentData.status === 'Active' ? 'emerald' : 'rose'}>{studentData.status}</StatusBadge>
          </div>

          <div className="space-y-3 text-left border-t border-slate-100 pt-6">
            <div className="group flex items-center gap-3 p-2.5 rounded-xl bg-slate-50/50 border border-transparent hover:border-slate-200 transition-all">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 group-hover:text-primary transition-colors">
                <AppIcon name="mail" size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Official Email</p>
                <p className="text-xs font-medium text-slate-700 truncate">{studentData.email}</p>
              </div>
            </div>

            <div className="group flex items-center gap-3 p-2.5 rounded-xl bg-slate-50/50 border border-transparent hover:border-slate-200 transition-all">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 group-hover:text-primary transition-colors">
                <AppIcon name="phone" size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Contact Number</p>
                <p className="text-xs font-medium text-slate-700">{studentData.phone}</p>
              </div>
            </div>

            <div className="group flex items-center gap-3 p-2.5 rounded-xl bg-slate-50/50 border border-transparent hover:border-slate-200 transition-all">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 group-hover:text-primary transition-colors">
                <AppIcon name="calendar_today" size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Enrolled On</p>
                <p className="text-xs font-medium text-slate-700">{studentData.joinDate}</p>
              </div>
            </div>
          </div>

          <button className="mt-8 w-full px-4 py-2.5 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
            <AppIcon name="photo_camera" size={14} />
            Update Photo
          </button>
        </div>
      </SectionCard>

      {/* Main Content Column */}
      <div className="lg:col-span-2 space-y-6">
        <SectionCard title="Personal Information" description="">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Full Name</label>
              <input 
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                disabled={!isEditing}
                placeholder="Student name"
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-900 focus:outline-none focus:ring-1 focus:ring-primary disabled:bg-slate-50 disabled:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Date of Birth</label>
              <input 
                type="date"
                value={formData.dob}
                onChange={(e) => handleInputChange('dob', e.target.value)}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-900 focus:outline-none focus:ring-1 focus:ring-primary disabled:bg-slate-50 disabled:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Phone</label>
              <input 
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                disabled={!isEditing}
                placeholder="Phone number"
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-900 focus:outline-none focus:ring-1 focus:ring-primary disabled:bg-slate-50 disabled:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Email</label>
              <input 
                type="email"
                value={formData.email}
                disabled={true}
                className="w-full px-3 py-2 border border-transparent bg-slate-50 rounded-lg text-sm font-medium text-slate-500 cursor-not-allowed"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-slate-500 mb-1">Address</label>
              <textarea 
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                disabled={!isEditing}
                rows={2}
                placeholder="Residential address"
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-900 focus:outline-none focus:ring-1 focus:ring-primary disabled:bg-slate-50 disabled:border-transparent transition-all resize-none"
              />
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Academic Information" description="">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Course Enrolled</label>
              <input 
                type="text"
                value={formData.course}
                disabled={true}
                className="w-full px-3 py-2 border border-transparent bg-slate-50 rounded-lg text-sm font-medium text-slate-500 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Batch Group</label>
              <input 
                type="text"
                value={formData.batch}
                disabled={true}
                className="w-full px-3 py-2 border border-transparent bg-slate-50 rounded-lg text-sm font-medium text-slate-500 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Registration Date</label>
              <p className="px-3 py-2 text-sm font-medium text-slate-500 bg-slate-50 rounded-lg">
                {studentData.joinDate}
              </p>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Parent Information" description="">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Parent's Name</label>
              <input 
                type="text"
                value={formData.fatherName}
                onChange={(e) => handleInputChange('fatherName', e.target.value)}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-900 focus:outline-none focus:ring-1 focus:ring-primary disabled:bg-slate-50 disabled:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Parent's Phone</label>
              <input 
                type="tel"
                value={formData.parentPhone}
                onChange={(e) => handleInputChange('parentPhone', e.target.value)}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-900 focus:outline-none focus:ring-1 focus:ring-primary disabled:bg-slate-50 disabled:border-transparent transition-all"
              />
            </div>
          </div>
        </SectionCard>

        <div className="flex justify-end gap-3">
          {isEditing ? (
            <>
              <button
                onClick={() => setIsEditing(false)}
                className="px-6 py-2.5 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={isUpdatingProfile}
                className="px-6 py-2.5 bg-primary text-white rounded-xl text-sm font-bold hover:shadow-lg hover:shadow-primary/20 transition-all disabled:opacity-50 flex items-center gap-2"
              >
                {isUpdatingProfile ? (
                  <>
                    <AppIcon name="sync" size={16} className="animate-spin" />
                    Saving...
                  </>
                ) : (
                  'Save Changes'
                )}
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-xl text-sm font-bold hover:shadow-lg hover:shadow-primary/20 transition-all"
            >
              <AppIcon name="edit" size={18} />
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function CoachingStudentProfile() {
  const { user, roleInfo, isLoadingProfile, updateProfile, isUpdatingProfile } = useAuth();

  if (isLoadingProfile || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <AppIcon name="sync" size={32} className="animate-spin text-primary" />
      </div>
    );
  }

  return (
    <DashboardPage
      eyebrow="Account"
      title="My Profile"
      description="View and manage your student profile information"
    >
      <ProfileForm 
        user={user} 
        roleInfo={roleInfo} 
        updateProfile={updateProfile} 
        isUpdatingProfile={isUpdatingProfile} 
        key={user.id} 
      />
    </DashboardPage>
  );
}