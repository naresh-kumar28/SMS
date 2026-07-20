import {
  DashboardPage,
  SectionCard,
  StatusBadge,
  MetricCard,
  MetricGrid,
} from '../../../components/common/DashboardPrimitives';
import AppIcon from '../../../components/common/AppIcon';
import { useAttendance } from '../../../hooks/api/useOperations';
import { useAuth } from '../../../hooks/api/useAuth';
import { useMemo } from 'react';

export default function StudentAttendance() {
  const { authState } = useAuth();
  const institutionId = authState?.roleInfo?.institution_id;
  const studentId = authState?.roleInfo?.id; // The membership ID for the student

  const { data: attendanceData = [], isLoading } = useAttendance(institutionId, null, studentId);

  const attendanceRecords = useMemo(() => {
    return attendanceData.map(record => ({
      date: record.date,
      day: new Date(record.date).toLocaleDateString('en-US', { weekday: 'long' }),
      status: record.status.toLowerCase(),
      subject: record.batch_name || 'General Class',
    }));
  }, [attendanceData]);

  const totalDays = attendanceRecords.length;
  const presentDays = attendanceRecords.filter(r => r.status === 'present').length;
  const absentDays = attendanceRecords.filter(r => r.status === 'absent').length;
  const lateDays = attendanceRecords.filter(r => r.status === 'late').length;
  const attendancePercentage = totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 0;

  return (
    <DashboardPage
      eyebrow="Academic"
      title="Attendance"
      description="View your attendance records"
    >
      <MetricGrid>
        <MetricCard icon="calendar_today" label="Total Days" value={totalDays} change="This month" helper="School days" />
        <MetricCard icon="check_circle" label="Present" value={presentDays} change="Recorded" helper="Total present" tone="emerald" />
        <MetricCard icon="cancel" label="Absent" value={absentDays} change="Recorded" helper="Total absent" tone="rose" />
        <MetricCard icon="schedule" label="Late" value={lateDays} change="Recorded" helper="Total late" tone="amber" />
        <MetricCard icon="trending_up" label="Attendance" value={`${attendancePercentage}%`} change="Overall" helper="Current rate" tone="emerald" />
      </MetricGrid>

      <SectionCard title="Attendance History" description="Your recent attendance records">
        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="p-8 text-center text-slate-500">
              Loading attendance records...
            </div>
          ) : attendanceRecords.length === 0 ? (
            <div className="p-8 text-center text-slate-500">
              No attendance records found.
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">Date</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">Day</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">Subject / Batch</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {attendanceRecords.map((record, idx) => (
                  <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-3 px-4 text-slate-600">{record.date}</td>
                    <td className="py-3 px-4 text-slate-600">{record.day}</td>
                    <td className="py-3 px-4 font-medium text-slate-900">{record.subject}</td>
                    <td className="py-3 px-4">
                      <StatusBadge 
                        tone={record.status === 'present' ? 'emerald' : record.status === 'absent' ? 'rose' : 'amber'}
                      >
                        {record.status === 'present' ? 'Present' : record.status === 'absent' ? 'Absent' : 'Late'}
                      </StatusBadge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </SectionCard>
    </DashboardPage>
  );
}