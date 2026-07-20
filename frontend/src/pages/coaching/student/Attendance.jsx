import {
  DashboardPage,
  SectionCard,
  StatusBadge,
  MetricCard,
  MetricGrid,
} from '../../../components/common/DashboardPrimitives';

const attendanceData = [
  { date: '2024-01-15', subject: 'Physics', status: 'present' },
  { date: '2024-01-15', subject: 'Chemistry', status: 'present' },
  { date: '2024-01-14', subject: 'Physics', status: 'present' },
  { date: '2024-01-14', subject: 'Chemistry', status: 'absent' },
];

export default function CoachingStudentAttendance() {
  const present = attendanceData.filter(a => a.status === 'present').length;
  const total = attendanceData.length;
  const percentage = Math.round((present / total) * 100);

  return (
    <DashboardPage
      eyebrow="Academic"
      title="Attendance"
      description="View your attendance records"
    >
      <MetricGrid>
        <MetricCard icon="calendar_today" label="Total Classes" value={total} change="This week" helper="Classes held" />
        <MetricCard icon="check_circle" label="Present" value={present} change="+1" helper="This week" tone="emerald" />
        <MetricCard icon="trending_up" label="Attendance" value={`${percentage}%`} change="+2%" helper="This month" tone="emerald" />
      </MetricGrid>

      <SectionCard title="Attendance History" description="Recent attendance">
        <div className="space-y-3">
          {attendanceData.map((record, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 rounded-xl bg-slate-50">
              <div>
                <p className="font-medium text-slate-900">{record.subject}</p>
                <p className="text-xs text-slate-500">{record.date}</p>
              </div>
              <StatusBadge tone={record.status === 'present' ? 'emerald' : 'rose'}>
                {record.status === 'present' ? 'Present' : 'Absent'}
              </StatusBadge>
            </div>
          ))}
        </div>
      </SectionCard>
    </DashboardPage>
  );
}