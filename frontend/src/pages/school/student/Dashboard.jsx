import { useOutletContext } from 'react-router-dom';
import {
  DashboardPage,
  MetricCard,
  MetricGrid,
  SectionCard,
  StatusBadge,
} from '../../../components/common/DashboardPrimitives';
import AppIcon from '../../../components/common/AppIcon';

export default function StudentDashboard() {
  const { user } = useOutletContext();
  const userName = user?.name?.split(' ')[0] || 'Student';
  
  return (
    <DashboardPage
      eyebrow="Student dashboard"
      title={<span>Hi <span className="capitalize">{userName}</span></span>}
    >
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="w-full lg:w-1/3">
          <MetricCard icon="school" label="My Class" value="10-A" change="Section A" helper="Current class" className="bg-primary/5 border-primary/20" />
        </div>
        
        <div className="flex-1">
          <MetricGrid>
            <MetricCard icon="monitoring" label="Attendance" value="96%" change="+2%" helper="This month" tone="emerald" />
            <MetricCard icon="folder_open" label="Pending" value="3" change="Assignments" helper="Due this week" tone="amber" />
            <MetricCard icon="payments" label="Fee Status" value="Paid" change="Jan 2024" helper="Up to date" tone="emerald" />
          </MetricGrid>
        </div>
      </div>

      <div className="grid gap-4 md:gap-6 xl:grid-cols-2">
        <SectionCard title="Today's Schedule" description="Your classes for today">
          <div className="space-y-3 md:space-y-4">
            <div className="flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-xl md:rounded-2xl bg-slate-50">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-blue-100 flex items-center justify-center">
                <span className="text-blue-600 font-bold text-sm md:text-base">9:00</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-slate-900 text-sm md:text-base">Mathematics</p>
                <p className="text-xs md:text-sm text-slate-600">Room 101 | Mr. Rajesh Kumar</p>
              </div>
              <StatusBadge tone="emerald">Completed</StatusBadge>
            </div>
            <div className="flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-xl md:rounded-2xl bg-slate-50">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-amber-100 flex items-center justify-center">
                <span className="text-amber-600 font-bold text-sm md:text-base">11:00</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-slate-900 text-sm md:text-base">Science</p>
                <p className="text-xs md:text-sm text-slate-600">Lab 3 | Ms. Priya Sharma</p>
              </div>
              <StatusBadge tone="amber">Upcoming</StatusBadge>
            </div>
            <div className="flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-xl md:rounded-2xl bg-slate-50">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-purple-100 flex items-center justify-center">
                <span className="text-purple-600 font-bold text-sm md:text-base">2:00</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-slate-900 text-sm md:text-base">English</p>
                <p className="text-xs md:text-sm text-slate-600">Room 205 | Ms. Sneha Gupta</p>
              </div>
              <StatusBadge tone="blue">Scheduled</StatusBadge>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Recent Updates" description="Latest from your school">
          <div className="space-y-3 md:space-y-4 text-sm text-slate-600">
            <div className="flex items-start gap-2 md:gap-3 p-2 md:p-3 rounded-lg md:rounded-xl hover:bg-slate-50">
              <div className="w-2 h-2 mt-1 md:mt-2 rounded-full bg-amber-500"></div>
              <div>
                <p className="font-medium text-slate-900 text-sm">Assignment Due Tomorrow</p>
                <p className="text-xs">Mathematics Chapter 5 - Quadratic Equations</p>
                <p className="text-xs text-slate-400 mt-1">Due: Tomorrow, 9:00 AM</p>
              </div>
            </div>
            <div className="flex items-start gap-2 md:gap-3 p-2 md:p-3 rounded-lg md:rounded-xl hover:bg-slate-50">
              <div className="w-2 h-2 mt-1 md:mt-2 rounded-full bg-emerald-500"></div>
              <div>
                <p className="font-medium text-slate-900 text-sm">Result Published</p>
                <p className="text-xs">Unit Test 2 - Science | Score: 92/100</p>
                <p className="text-xs text-slate-400 mt-1">Released: 2 days ago</p>
              </div>
            </div>
            <div className="flex items-start gap-2 md:gap-3 p-2 md:p-3 rounded-lg md:rounded-xl hover:bg-slate-50">
              <div className="w-2 h-2 mt-1 md:mt-2 rounded-full bg-blue-500"></div>
              <div>
                <p className="font-medium text-slate-900 text-sm">Notice Posted</p>
                <p className="text-xs">Parent-Teacher Meeting - Saturday</p>
                <p className="text-xs text-slate-400 mt-1">3 days ago</p>
              </div>
            </div>
          </div>
        </SectionCard>
      </div>
    </DashboardPage>
  );
}