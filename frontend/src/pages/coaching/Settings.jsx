import { useState } from 'react';
import AppIcon from '../../components/common/AppIcon';
import {
  DashboardPage,
  MetricCard,
  MetricGrid,
  SectionCard,
} from '../../components/common/DashboardPrimitives';

const tabs = [
  { id: 'profile', label: 'Profile' },
  { id: 'branding', label: 'Branding' },
  { id: 'notification', label: 'Notifications' },
  { id: 'payment', label: 'Payment' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'integrations', label: 'Integrations' },
];

export default function CoachingSettings() {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <DashboardPage
      eyebrow="Configuration"
      title="Settings"
      actions={
        <button className="px-5 py-2.5 bg-primary text-white rounded-xl text-xs font-bold hover:shadow-lg hover:shadow-primary/20 transition-all flex items-center gap-2">
          <AppIcon name="save" size={16} />
          Save Changes
        </button>
      }
    >
      <MetricGrid>
        <MetricCard icon="settings" label="Config modules" value="6" change="0 updated today" helper="System settings" />
        <MetricCard icon="security" label="Security rules" value="5" change="All enabled" helper="Privacy controls" tone="emerald" />
        <MetricCard icon="notifications" label="Active templates" value="8" change="Stable" helper="Email or SMS" tone="amber" />
        <MetricCard icon="payments" label="Payment gateway" value="2" change="Active" helper="Razorpay or UPI" tone="rose" />
      </MetricGrid>

      <SectionCard title="Settings" description="Manage your coaching profile and preferences">
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'bg-primary text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'profile' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Coaching Name</label>
                <input type="text" defaultValue="Apex Coaching Institute" className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                <input type="email" defaultValue="contact@apexcoaching.com" className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Phone</label>
                <input type="tel" defaultValue="+91 98765 43210" className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Address</label>
                <input type="text" defaultValue="123 Education Street, City - 123456" className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'branding' && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Logo</label>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-slate-100 rounded-xl flex items-center justify-center">
                  <AppIcon name="image" size={24} className="text-slate-400" />
                </div>
                <button className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50">Upload Logo</button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Primary Color</label>
              <input type="color" defaultValue="#6366f1" className="w-16 h-10 rounded-lg cursor-pointer" />
            </div>
          </div>
        )}

        {activeTab === 'notification' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
              <div>
                <p className="font-medium text-slate-900">Email Notifications</p>
                <p className="text-sm text-slate-500">Receive updates via email</p>
              </div>
              <button className="w-12 h-6 bg-primary rounded-full relative">
                <span className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
              </button>
            </div>
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
              <div>
                <p className="font-medium text-slate-900">SMS Notifications</p>
                <p className="text-sm text-slate-500">Receive updates via SMS</p>
              </div>
              <button className="w-12 h-6 bg-slate-300 rounded-full relative">
                <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full" />
              </button>
            </div>
          </div>
        )}

        {activeTab === 'payment' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Razorpay Key ID</label>
                <input type="text" placeholder="rzp_..." className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Razorpay Secret</label>
                <input type="password" placeholder="••••••••" className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'pricing' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
              <div>
                <p className="font-medium text-slate-900">Allow Free Trials</p>
                <p className="text-sm text-slate-500">Users can access limited content for free</p>
              </div>
              <button className="w-12 h-6 bg-primary rounded-full relative">
                <span className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
              </button>
            </div>
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
              <div>
                <p className="font-medium text-slate-900">Default Currency</p>
                <p className="text-sm text-slate-500">INR (₹)</p>
              </div>
              <select className="px-3 py-1 border border-slate-200 rounded-lg text-sm">
                <option>INR</option>
                <option>USD</option>
              </select>
            </div>
          </div>
        )}

        {activeTab === 'integrations' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
              <div className="flex items-center gap-3">
                <AppIcon name="youtube" size={24} className="text-rose-500" />
                <div>
                  <p className="font-medium text-slate-900">YouTube</p>
                  <p className="text-sm text-slate-500">Video lectures</p>
                </div>
              </div>
              <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">Connected</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
              <div className="flex items-center gap-3">
                <AppIcon name="cloud" size={24} className="text-blue-500" />
                <div>
                  <p className="font-medium text-slate-900">Google Drive</p>
                  <p className="text-sm text-slate-500">Content storage</p>
                </div>
              </div>
              <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">Connected</span>
            </div>
          </div>
        )}
      </SectionCard>
    </DashboardPage>
  );
}