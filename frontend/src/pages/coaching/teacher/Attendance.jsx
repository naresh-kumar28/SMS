import {
  DashboardPage,
  SectionCard,
  StatusBadge,
  MetricCard,
  MetricGrid,
} from '../../../components/common/DashboardPrimitives';

const attendanceData = [
  { date: '2024-01-15', course: 'NEET Physics - Class 11', total: 45, present: 43, absent: 2 },
  { date: '2024-01-15', course: 'NEET Physics - Class 12', total: 42, present: 40, absent: 2 },
  { date: '2024-01-14', course: 'JEE Physics - Class 12', total: 38, present: 36, absent: 2 },
];

export default function CoachingTeacherAttendance() {
  return (
    <DashboardPage
      eyebrow="Academic"
      title="Attendance"
      description="Mark and view attendance for your courses"
    >
      <MetricGrid>
        <MetricCard icon="group" label="Total Students" value="125" change="All courses" helper="This month" />
        <MetricCard icon="check_circle" label="Present" value="94%" change="+2%" helper="Average" tone="emerald" />
        <MetricCard icon="cancel" label="Absent" value="6%" change="-1%" helper="Average" tone="rose" />
      </MetricGrid>

      <SectionCard title="Attendance History" description="Recent attendance records">
        <div className="space-y-3">
          {attendanceData.map((record, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 rounded-xl bg-slate-50">
              <div>
                <p className="font-medium text-slate-900">{record.course}</p>
                <p className="text-xs text-slate-500">{record.date}</p>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <StatusBadge tone="emerald">{record.present} Present</StatusBadge>
                <StatusBadge tone="rose">{record.absent} Absent</StatusBadge>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
    </DashboardPage>
  );
}