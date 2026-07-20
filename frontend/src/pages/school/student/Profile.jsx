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

function ProfileForm({ user, roleInfo }) {
  const [isEditing, setIsEditing] = useState(false);
  const { updateProfile, isUpdatingProfile } = useAuth();
  
  const inst = user.institution || {};
  const [formData, setFormData] = useState({
    name: user.full_name || (user.first_name ? `${user.first_name} ${user.last_name}`.trim() : user.username) || '',
    email: user.email || '',
    phone: user.phone || '',
    dob: inst.dob || '',
    gender: inst.gender || '',
    bloodGroup: inst.blood_group || '',
    class: inst.class_name || '',
    section: inst.section_name || '',
    rollNo: inst.roll_number || '',
    fatherName: inst.father_name || '',
    motherName: inst.mother_name || '',
    fatherPhone: inst.parent_phone || '',
    emergencyPhone: inst.emergency_contact || '',
    address: user.address || '',
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
        gender: formData.gender,
        blood_group: formData.bloodGroup,
        father_name: formData.fatherName,
        mother_name: formData.motherName,
        parent_phone: formData.fatherPhone,
        emergency_contact: formData.emergencyPhone,
        roll_number: formData.rollNo,
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
    gender: formData.gender || 'Not Set',
    bloodGroup: formData.bloodGroup || 'Not Set',
    class: formData.class || 'Not Set',
    section: formData.section || 'Not Set',
    rollNo: formData.rollNo || 'Not Set',
    fatherName: formData.fatherName || 'Not Set',
    motherName: formData.motherName || 'Not Set',
    fatherPhone: formData.fatherPhone || 'Not Set',
    emergencyPhone: formData.emergencyPhone || 'Not Set',
    admissionDate: user?.date_joined?.split('T')[0] || 'Not Set',
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
            {studentData.class} • Section {studentData.section}
          </p>
          
          <div className="flex justify-center mb-6">
            <StatusBadge tone={studentData.status === 'Active' ? 'emerald' : 'rose'}>{studentData.status}</StatusBadge>
          </div>

          <div className="space-y-3 text-left border-t border-slate-100 pt-6">
            <div className="group flex items-center gap-3 p-2.5 rounded-xl bg-slate-50/50 border border-transparent hover:border-slate-200 transition-all">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 group-hover:text-primary transition-colors">
                <AppIcon name="badge" size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Roll Number</p>
                <p className="text-xs font-medium text-slate-700">{studentData.rollNo}</p>
              </div>
            </div>

            <div className="group flex items-center gap-3 p-2.5 rounded-xl bg-slate-50/50 border border-transparent hover:border-slate-200 transition-all">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 group-hover:text-primary transition-colors">
                <AppIcon name="phone" size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Contact</p>
                <p className="text-xs font-medium text-slate-700">{studentData.phone}</p>
              </div>
            </div>

            <div className="group flex items-center gap-3 p-2.5 rounded-xl bg-slate-50/50 border border-transparent hover:border-slate-200 transition-all">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 group-hover:text-primary transition-colors">
                <AppIcon name="calendar_today" size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Admission Date</p>
                <p className="text-xs font-medium text-slate-700">{studentData.admissionDate}</p>
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
              <label className="block text-xs font-medium text-slate-500 mb-1">Gender</label>
              <select
                value={formData.gender}
                onChange={(e) => handleInputChange('gender', e.target.value)}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-900 focus:outline-none focus:ring-1 focus:ring-primary disabled:bg-slate-50 disabled:border-transparent transition-all"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Blood Group</label>
              <input 
                type="text"
                value={formData.bloodGroup}
                onChange={(e) => handleInputChange('bloodGroup', e.target.value)}
                disabled={!isEditing}
                placeholder="e.g. B+"
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
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-900 focus:outline-none focus:ring-1 focus:ring-primary disabled:bg-slate-50 disabled:border-transparent transition-all resize-none"
              />
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Academic Information" description="">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Class</label>
              <input 
                type="text"
                value={formData.class}
                disabled={true}
                className="w-full px-3 py-2 border border-transparent bg-slate-50 rounded-lg text-sm font-medium text-slate-500 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Section</label>
              <input 
                type="text"
                value={formData.section}
                disabled={true}
                className="w-full px-3 py-2 border border-transparent bg-slate-50 rounded-lg text-sm font-medium text-slate-500 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Roll Number</label>
              <input 
                type="text"
                value={formData.rollNo}
                disabled={true}
                className="w-full px-3 py-2 border border-transparent bg-slate-50 rounded-lg text-sm font-medium text-slate-500 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Admission Date</label>
              <p className="px-3 py-2 text-sm font-medium text-slate-500 bg-slate-50 rounded-lg">
                {studentData.admissionDate}
              </p>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Parent Information" description="">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Father's Name</label>
              <input 
                type="text"
                value={formData.fatherName}
                onChange={(e) => handleInputChange('fatherName', e.target.value)}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-900 focus:outline-none focus:ring-1 focus:ring-primary disabled:bg-slate-50 disabled:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Mother's Name</label>
              <input 
                type="text"
                value={formData.motherName}
                onChange={(e) => handleInputChange('motherName', e.target.value)}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-900 focus:outline-none focus:ring-1 focus:ring-primary disabled:bg-slate-50 disabled:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Father's Phone</label>
              <input 
                type="tel"
                value={formData.fatherPhone}
                onChange={(e) => handleInputChange('fatherPhone', e.target.value)}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-900 focus:outline-none focus:ring-1 focus:ring-primary disabled:bg-slate-50 disabled:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Emergency Contact</label>
              <input 
                type="tel"
                value={formData.emergencyPhone}
                onChange={(e) => handleInputChange('emergencyPhone', e.target.value)}
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

export default function StudentProfile() {
  const { user, roleInfo, isLoadingProfile } = useAuth();

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
      <ProfileForm user={user} roleInfo={roleInfo} key={user.id} />
    </DashboardPage>
  );
}