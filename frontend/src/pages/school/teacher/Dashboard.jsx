import { useOutletContext } from 'react-router-dom';
import {
  DashboardPage,
  MetricCard,
  MetricGrid,
  SectionCard,
  StatusBadge,
} from '../../../components/common/DashboardPrimitives';

export default function TeacherDashboard() {
  const { user } = useOutletContext();
  const userName = user?.name?.split(' ').slice(0, 2).join(' ') || 'Teacher';
  
  return (
    <DashboardPage
      eyebrow="Teacher dashboard"
      title={<span>Hi <span className="capitalize">{userName}</span></span>}
    >
      <MetricGrid>
        <MetricCard icon="school" label="My Classes" value="4" change="2 Sections" helper="Assigned by admin" />
        <MetricCard icon="group" label="Total Students" value="186" change="+12 this month" helper="Across all classes" tone="emerald" />
        <MetricCard icon="monitoring" label="Attendance" value="94.2%" change="+0.8%" helper="Today's average" tone="amber" />
        <MetricCard icon="folder_open" label="Pending" value="3" change="Assignments" helper="Due this week" tone="rose" />
      </MetricGrid>

      <div className="grid gap-4 md:gap-6 xl:grid-cols-2">
        <SectionCard title="Today's Schedule" description="Your classes for today">
          <div className="space-y-3 md:space-y-4">
            <div className="flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-xl md:rounded-2xl bg-slate-50">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-blue-100 flex items-center justify-center">
                <span className="text-blue-600 font-bold text-sm md:text-base">9:00</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-slate-900 text-sm md:text-base">Class 10-A</p>
                <p className="text-xs md:text-sm text-slate-600">Mathematics</p>
              </div>
              <StatusBadge tone="emerald">Completed</StatusBadge>
            </div>
            <div className="flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-xl md:rounded-2xl bg-slate-50">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-amber-100 flex items-center justify-center">
                <span className="text-amber-600 font-bold text-sm md:text-base">11:00</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-slate-900 text-sm md:text-base">Class 9-B</p>
                <p className="text-xs md:text-sm text-slate-600">Mathematics</p>
              </div>
              <StatusBadge tone="amber">Upcoming</StatusBadge>
            </div>
            <div className="flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-xl md:rounded-2xl bg-slate-50">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-purple-100 flex items-center justify-center">
                <span className="text-purple-600 font-bold text-sm md:text-base">2:00</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-slate-900 text-sm md:text-base">Class 10-B</p>
                <p className="text-xs md:text-sm text-slate-600">Mathematics</p>
              </div>
              <StatusBadge tone="blue">Scheduled</StatusBadge>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Recent Activities" description="Latest updates from your classes">
          <div className="space-y-3 md:space-y-4 text-sm text-slate-600">
            <div className="flex items-start gap-2 md:gap-3 p-2 md:p-3 rounded-lg md:rounded-xl hover:bg-slate-50">
              <div className="w-2 h-2 mt-1 md:mt-2 rounded-full bg-emerald-500"></div>
              <div>
                <p className="font-medium text-slate-900 text-sm">Assignment submitted</p>
                <p className="text-xs">15 students submitted Math homework for Class 10-A</p>
                <p className="text-xs text-slate-400 mt-1">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-start gap-2 md:gap-3 p-2 md:p-3 rounded-lg md:rounded-xl hover:bg-slate-50">
              <div className="w-2 h-2 mt-1 md:mt-2 rounded-full bg-blue-500"></div>
              <div>
                <p className="font-medium text-slate-900 text-sm">Attendance marked</p>
                <p className="text-xs">Daily attendance completed for all classes</p>
                <p className="text-xs text-slate-400 mt-1">4 hours ago</p>
              </div>
            </div>
            <div className="flex items-start gap-2 md:gap-3 p-2 md:p-3 rounded-lg md:rounded-xl hover:bg-slate-50">
              <div className="w-2 h-2 mt-1 md:mt-2 rounded-full bg-amber-500"></div>
              <div>
                <p className="font-medium text-slate-900 text-sm">Notice posted</p>
                <p className="text-xs">Math exam notice shared with Class 10-A & B</p>
                <p className="text-xs text-slate-400 mt-1">Yesterday</p>
              </div>
            </div>
          </div>
        </SectionCard>
      </div>
    </DashboardPage>
  );
}