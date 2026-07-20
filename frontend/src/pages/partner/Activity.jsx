import { useState } from 'react';
import AppIcon from '../../components/common/AppIcon';
import {
  DashboardPage,
  SectionCard,
} from '../../components/common/DashboardPrimitives';

const activities = [
  { id: 1, type: 'school', name: 'Delhi Public School', action: 'Student enrolled', details: 'New student Aditi Sharma added to Class 10-A', time: '2 hours ago', icon: 'person_add' },
  { id: 2, type: 'coaching', name: 'TechCoach Institute', action: 'Course started', details: 'Python Programming batch started with 25 students', time: '5 hours ago', icon: 'play' },
  { id: 3, type: 'payment', name: 'St. Mary\'s Academy', action: 'Payment received', details: 'Fee payment of ₹45,000 received', time: '1 day ago', icon: 'payments' },
  { id: 4, type: 'school', name: 'Ryan International', action: 'Teacher added', details: 'New teacher Mr. Rahul Verma joined Physics department', time: '1 day ago', icon: 'person_add' },
  { id: 5, type: 'coaching', name: 'Excel Coaching', action: 'Batch completed', details: 'JEE Crash Course batch completed - 18 students passed', time: '2 days ago', icon: 'check_circle' },
  { id: 6, type: 'school', name: 'Presidency School', action: 'School added', details: 'New school partnership activated', time: '3 days ago', icon: 'school' },
];

const typeColors = {
  school: { bg: 'bg-blue-100', icon: 'text-blue-600' },
  coaching: { bg: 'bg-purple-100', icon: 'text-purple-600' },
  payment: { bg: 'bg-emerald-100', icon: 'text-emerald-600' },
};

export default function PartnerActivity() {
  const [filter, setFilter] = useState('all');

  const filteredActivities = filter === 'all' 
    ? activities 
    : activities.filter(a => a.type === filter);

  return (
    <DashboardPage
      eyebrow="Partner Dashboard"
      title="Activity"
    >
      <SectionCard title="Recent Activity" description="All activities across your schools and coaching centers">
        <div className="mb-4 flex gap-2">
          {['all', 'school', 'coaching', 'payment'].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                filter === type
                  ? 'bg-primary text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
        <div className="space-y-3">
          {filteredActivities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-4 p-4 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${typeColors[activity.type]?.bg || 'bg-slate-100'}`}>
                <AppIcon name={activity.icon} size={20} className={typeColors[activity.type]?.icon || 'text-slate-600'} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-sm text-slate-900">{activity.action}</p>
                  <span className="text-xs text-slate-400">•</span>
                  <p className="text-xs text-slate-500">{activity.name}</p>
                </div>
                <p className="text-sm text-slate-600 mt-1">{activity.details}</p>
              </div>
              <p className="text-xs text-slate-400 whitespace-nowrap">{activity.time}</p>
            </div>
          ))}
        </div>
      </SectionCard>
    </DashboardPage>
  );
}