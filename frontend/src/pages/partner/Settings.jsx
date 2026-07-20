import { useState } from 'react';
import AppIcon from '../../components/common/AppIcon';
import {
  DashboardPage,
  SectionCard,
} from '../../components/common/DashboardPrimitives';
import toast from 'react-hot-toast';

export default function PartnerSettings() {
  const [notifications, setNotifications] = useState({
    email: true,
    sms: true,
    push: false,
  });

  return (
    <DashboardPage
      eyebrow="Partner Dashboard"
      title="Settings"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <SectionCard title="Account Settings" description="Manage your account preferences">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Business Name</label>
                <input
                  type="text"
                  defaultValue="Partner Organization"
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                <input
                  type="email"
                  defaultValue="partner@example.com"
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
                <input
                  type="tel"
                  defaultValue="+91 98765 43210"
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Website</label>
                <input
                  type="url"
                  defaultValue="https://example.com"
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
              <button
                onClick={() => toast.success('Account settings updated successfully')}
                className="px-5 py-2.5 bg-primary text-white rounded-xl text-xs font-bold hover:shadow-lg hover:shadow-primary/20 transition-all"
              >
                Save Changes
              </button>
            </div>
          </SectionCard>

          <SectionCard title="Notification Preferences" description="Choose how you want to be notified">
            <div className="space-y-4">
              {[
                { key: 'email', label: 'Email Notifications', desc: 'Receive updates via email' },
                { key: 'sms', label: 'SMS Notifications', desc: 'Receive alerts via SMS' },
                { key: 'push', label: 'Push Notifications', desc: 'Receive browser notifications' },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between p-4 rounded-xl border border-slate-200">
                  <div>
                    <p className="font-medium text-sm text-slate-900">{item.label}</p>
                    <p className="text-xs text-slate-500">{item.desc}</p>
                  </div>
                  <button
                    onClick={() => {
                      const newState = !notifications[item.key];
                      setNotifications({ ...notifications, [item.key]: newState });
                      toast.success(`${item.label} ${newState ? 'enabled' : 'disabled'}`);
                    }}
                    className={`w-12 h-6 rounded-full transition-colors ${notifications[item.key] ? 'bg-primary' : 'bg-slate-200'
                      }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${notifications[item.key] ? 'translate-x-6' : 'translate-x-0.5'
                      }`} />
                  </button>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>

        <div className="space-y-6">
          <SectionCard title="Security" description="Manage your security settings">
            <div className="space-y-4">
              <button
                onClick={() => toast.success('Password reset link sent to your email')}
                className="w-full p-4 rounded-xl border border-slate-200 text-left hover:border-primary/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <AppIcon name="lock" size={20} className="text-slate-600" />
                  <div>
                    <p className="font-medium text-sm text-slate-900">Change Password</p>
                    <p className="text-xs text-slate-500">Update your password</p>
                  </div>
                </div>
              </button>
              <button
                onClick={() => toast.success('Opening Two-Factor Authentication setup...')}
                className="w-full p-4 rounded-xl border border-slate-200 text-left hover:border-primary/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <AppIcon name="security" size={20} className="text-slate-600" />
                  <div>
                    <p className="font-medium text-sm text-slate-900">Two-Factor Auth</p>
                    <p className="text-xs text-slate-500">Add extra security</p>
                  </div>
                </div>
              </button>
            </div>
          </SectionCard>

          <SectionCard title="Danger Zone" description="Irreversible actions">
            <button
              onClick={() => toast.error('Account deletion requested. Please contact support for confirmation.')}
              className="w-full px-4 py-2.5 border border-red-200 text-red-600 rounded-xl text-xs font-bold hover:bg-red-50 transition-all"
            >
              Delete Account
            </button>
          </SectionCard>
        </div>
      </div>
    </DashboardPage>
  );
}