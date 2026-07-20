import { useOutletContext } from 'react-router-dom';
import {
  DashboardPage,
  MetricCard,
  MetricGrid,
  SectionCard,
  StatusBadge,
} from '../../../components/common/DashboardPrimitives';

export default function CoachingStudentDashboard() {
  const { user } = useOutletContext();
  const userName = user.name || 'Student';
  
  return (
    <DashboardPage
      eyebrow="Student dashboard"
      title={`Hi, ${userName}`}
    >
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="w-full lg:w-1/3">
          <MetricCard icon="school" label="My Course" value="NEET Foundation" change="Active" helper="Current course" className="bg-primary/5 border-primary/20" />
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
                <p className="font-semibold text-slate-900 text-sm md:text-base">Physics</p>
                <p className="text-xs md:text-sm text-slate-600">Dr. Amit Kumar | Room 101</p>
              </div>
              <StatusBadge tone="emerald">Completed</StatusBadge>
            </div>
            <div className="flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-xl md:rounded-2xl bg-slate-50">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-amber-100 flex items-center justify-center">
                <span className="text-amber-600 font-bold text-sm md:text-base">11:00</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-slate-900 text-sm md:text-base">Chemistry</p>
                <p className="text-xs md:text-sm text-slate-600">Ms. Priya Sharma | Lab 3</p>
              </div>
              <StatusBadge tone="amber">Upcoming</StatusBadge>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Recent Updates" description="Latest from your course">
          <div className="space-y-3 md:space-y-4 text-sm text-slate-600">
            <div className="flex items-start gap-2 md:gap-3 p-2 md:p-3 rounded-lg md:rounded-xl hover:bg-slate-50">
              <div className="w-2 h-2 mt-1 md:mt-2 rounded-full bg-amber-500"></div>
              <div>
                <p className="font-medium text-slate-900 text-sm">Assignment Due Tomorrow</p>
                <p className="text-xs">Physics Chapter 5 - Kinematics</p>
              </div>
            </div>
            <div className="flex items-start gap-2 md:gap-3 p-2 md:p-3 rounded-lg md:rounded-xl hover:bg-slate-50">
              <div className="w-2 h-2 mt-1 md:mt-2 rounded-full bg-emerald-500"></div>
              <div>
                <p className="font-medium text-slate-900 text-sm">Result Published</p>
                <p className="text-xs">Unit Test 1 | Score: 92/100</p>
              </div>
            </div>
          </div>
        </SectionCard>
      </div>
    </DashboardPage>
  );
}