import { useOutletContext } from 'react-router-dom';
import AppIcon from '../../../components/common/AppIcon';
import {
  DashboardPage,
  MetricCard,
  MetricGrid,
  SectionCard,
  StatusBadge,
} from '../../../components/common/DashboardPrimitives';

export default function CoachingTeacherDashboard() {
  const { user } = useOutletContext();
  const userName = user?.name?.split(' ').slice(1).join(' ') || user?.name || 'Teacher';
  
  return (
    <DashboardPage
      eyebrow="Teacher dashboard"
      title={<span>Welcome back, <span className="capitalize">{userName}</span></span>}
      description="Here's what's happening with your courses and students today."
    >
      <div className="space-y-6">
        {/* Top Metrics Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard 
            icon="school" 
            label="My Courses" 
            value="3" 
            change="Active" 
            helper="Current Semester" 
            className="bg-primary shadow-sm shadow-primary/20"
            variant="glass"
          />
          <MetricCard 
            icon="group" 
            label="Total Students" 
            value="280" 
            change="+24" 
            helper="Enrolled" 
            tone="emerald" 
          />
          <MetricCard 
            icon="monitoring" 
            label="Attendance" 
            value="94%" 
            change="+2%" 
            helper="Weekly Avg" 
            tone="amber" 
          />
          <MetricCard 
            icon="folder_open" 
            label="Pending" 
            value="5" 
            change="Assignments" 
            helper="To Grade" 
            tone="rose" 
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Schedule Section */}
          <div className="lg:col-span-2">
            <SectionCard 
              title="Today's Schedule" 
              description="Your upcoming classes for the day"
              icon="event"
            >
              <div className="space-y-3">
                {[
                  { time: '09:00 AM', title: 'NEET Physics - Class 11', batch: 'Morning | Batch A', students: 45, status: 'Completed', tone: 'emerald', icon: 'check_circle' },
                  { time: '11:00 AM', title: 'JEE Physics - Class 12', batch: 'Afternoon | Batch B', students: 38, status: 'Live Now', tone: 'rose', icon: 'activity' },
                  { time: '02:00 PM', title: 'NEET Physics - Class 12', batch: 'Evening | Batch C', students: 42, status: 'Upcoming', tone: 'blue', icon: 'schedule' },
                ].map((session, idx) => (
                  <div key={idx} className="group flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-transparent hover:border-slate-200 hover:bg-white hover:shadow-md transition-all duration-300">
                    <div className={`w-14 h-14 rounded-xl flex flex-col items-center justify-center font-bold text-[10px] shadow-sm ${
                      session.status === 'Live Now' ? 'bg-rose-500 text-white animate-pulse' : 'bg-white text-slate-900 border border-slate-100'
                    }`}>
                      <span>{session.time.split(' ')[0]}</span>
                      <span className="opacity-70">{session.time.split(' ')[1]}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <p className="font-bold text-slate-900">{session.title}</p>
                        {session.status === 'Live Now' && (
                          <span className="flex h-2 w-2 rounded-full bg-rose-500 animate-ping"></span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 font-medium">{session.batch} • {session.students} students</p>
                    </div>
                    <StatusBadge tone={session.tone}>
                      <div className="flex items-center gap-1.5">
                        <AppIcon name={session.icon} size={12} />
                        {session.status}
                      </div>
                    </StatusBadge>
                  </div>
                ))}
              </div>
            </SectionCard>
          </div>

          {/* Activity Section */}
          <div className="lg:col-span-1">
            <SectionCard title="Recent Activity" description="Latest updates" icon="history">
              <div className="space-y-4">
                {[
                  { title: 'Assignment submitted', desc: '32 students from Class 11-A', time: '2h ago', icon: 'upload', tone: 'blue' },
                  { title: 'Attendance marked', desc: 'Class 12-B attendance complete', time: '4h ago', icon: 'check_circle', tone: 'emerald' },
                  { title: 'New Note Uploaded', desc: 'Chapter 5: Electromagnetism', time: 'Yesterday', icon: 'description', tone: 'amber' },
                  { title: 'Quiz Results Out', desc: 'Average score: 78%', time: '2 days ago', icon: 'grade', tone: 'purple' },
                ].map((activity, idx) => (
                  <div key={idx} className="flex gap-4 group">
                    <div className="relative flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform bg-${activity.tone}-50 text-${activity.tone}-600`}>
                        <AppIcon name={activity.icon} size={16} />
                      </div>
                      {idx !== 3 && <div className="w-px h-full bg-slate-100 mt-2"></div>}
                    </div>
                    <div className="pb-6">
                      <p className="text-sm font-bold text-slate-900 leading-tight">{activity.title}</p>
                      <p className="text-xs text-slate-500 mt-1">{activity.desc}</p>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mt-2 inline-block">{activity.time}</span>
                    </div>
                  </div>
                ))}
                <button className="w-full py-2.5 text-xs font-bold text-slate-500 hover:text-primary hover:bg-primary/5 rounded-xl transition-all border border-slate-100 mt-2">
                  View All Activity
                </button>
              </div>
            </SectionCard>
          </div>
        </div>
      </div>
    </DashboardPage>
  );
}