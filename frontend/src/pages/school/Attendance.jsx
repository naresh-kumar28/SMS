import { useState, useMemo } from 'react';
import AppIcon from '../../components/common/AppIcon';
import Dropdown from '../../components/common/Dropdown';
import Pagination from '../../components/common/Pagination';
import {
  DashboardPage,
  MetricCard,
  MetricGrid,
  SectionCard,
  StatusBadge,
} from '../../components/common/DashboardPrimitives';
import { useAttendance } from '../../hooks/api/useOperations';
import { useAuth } from '../../hooks/api/useAuth';

export default function AttendanceOverview() {
  const { authState } = useAuth();
  const institutionId = authState?.roleInfo?.institution_id;
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  
  const { data: attendanceData = [], isLoading } = useAttendance(institutionId, selectedDate);

  const [classFilter, setClassFilter] = useState('all');
  const [attendanceFilter, setAttendanceFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const students = useMemo(() => {
    return attendanceData.map(att => ({
      id: att.id,
      name: `${att.membership?.user?.first_name} ${att.membership?.user?.last_name}`.trim() || att.membership?.user?.email,
      rollNo: `RN${att.membership?.id.toString().padStart(3, '0')}`, // Mocked Roll No
      class: 'Class 10-A', // Ideally from membership -> enrollments -> batch
      status: att.status.toLowerCase(),
      time: new Date(att.marked_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      remarks: att.remarks || '',
    }));
  }, [attendanceData]);

  const filteredStudents = useMemo(() => {
    return students.filter(student => {
      const matchesClass = classFilter === 'all' || student.class === classFilter;
      const matchesAttendance = attendanceFilter === 'all' || student.status === attendanceFilter;
      return matchesClass && matchesAttendance;
    });
  }, [students, classFilter, attendanceFilter]);

  const paginatedStudents = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredStudents.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredStudents, currentPage, itemsPerPage]);

  const classOptions = [
    { value: 'all', label: 'All Classes' },
    { value: 'Class 10-A', label: 'Class 10-A' },
    { value: 'Class 10-B', label: 'Class 10-B' },
    { value: 'Class 9-A', label: 'Class 9-A' },
    { value: 'Class 9-B', label: 'Class 9-B' },
    { value: 'Class 11-A', label: 'Class 11-A' },
    { value: 'Class 12-A', label: 'Class 12-A' },
  ];

  const attendanceOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'present', label: 'Present' },
    { value: 'absent', label: 'Absent' },
    { value: 'late', label: 'Late' },
  ];

  const presentCount = students.filter(s => s.status === 'present').length;
  const absentCount = students.filter(s => s.status === 'absent').length;
  const lateCount = students.filter(s => s.status === 'late').length;

  const attendanceStats = [
    { icon: 'monitoring', label: "Today's Attendance", value: students.length > 0 ? `${Math.round((presentCount / students.length) * 100)}%` : '0%', change: '+0%', helper: 'Whole school', tone: 'blue' },
    { icon: 'group', label: 'Absent Today', value: absentCount.toString(), change: '0', helper: 'Needs follow-up', tone: 'amber' },
    { icon: 'warning', label: 'Late Arrivals', value: lateCount.toString(), change: '0', helper: 'Minor issues', tone: 'purple' },
  ];

  return (
    <DashboardPage
      eyebrow="Daily tracking"
      title="Attendance Management"
      actions={
        <>
          <button className="px-5 py-2.5 bg-primary text-white rounded-xl text-xs font-bold hover:shadow-lg hover:shadow-primary/20 transition-all flex items-center gap-2">
             <AppIcon name="check_circle" size={16} />
            Mark Attendance
          </button>
         <button className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all flex items-center gap-2 shadow-sm">
             <AppIcon name="download" size={16} />
            Export Report
          </button>
        </>
      }
    >
      <MetricGrid>
        {attendanceStats.map((stat, index) => (
          <MetricCard
            key={index}
            icon={stat.icon}
            label={stat.label}
            value={stat.value}
            change={stat.change}
            helper={stat.helper}
            tone={stat.tone}
          />
        ))}
      </MetricGrid>

      <SectionCard title="Mark Attendance" description="Select date and class to mark student attendance">
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="flex gap-2 flex-wrap">
            <div className="relative">
              <AppIcon name="event" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
            <Dropdown value={classFilter} onChange={setClassFilter} options={classOptions} className="min-w-[140px]" />
            <Dropdown value={attendanceFilter} onChange={setAttendanceFilter} options={attendanceOptions} className="min-w-[140px]" />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 md:gap-4 mb-4 md:mb-6">
          <div className="bg-emerald-50 rounded-xl p-3 md:p-4 text-center">
            <div className="text-xl md:text-2xl font-bold text-emerald-600">{presentCount}</div>
            <div className="text-xs md:text-sm text-emerald-700">Present</div>
          </div>
          <div className="bg-rose-50 rounded-xl p-3 md:p-4 text-center">
            <div className="text-xl md:text-2xl font-bold text-rose-600">{absentCount}</div>
            <div className="text-xs md:text-sm text-rose-700">Absent</div>
          </div>
          <div className="bg-amber-50 rounded-xl p-3 md:p-4 text-center">
            <div className="text-xl md:text-2xl font-bold text-amber-600">{lateCount}</div>
            <div className="text-xs md:text-sm text-amber-700">Late</div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Roll No</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Student Name</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase hidden md:table-cell">Class</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Status</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase hidden sm:table-cell">Time</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase hidden lg:table-cell">Remarks</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr>
                  <td colSpan="7" className="py-8 text-center text-slate-500">
                    Loading attendance...
                  </td>
                </tr>
              ) : paginatedStudents.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-8 text-center text-slate-500">
                    No students found.
                  </td>
                </tr>
              ) : (
                paginatedStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-3 text-sm font-medium text-slate-600">{student.rollNo}</td>
                    <td className="py-3 px-3 text-sm font-semibold text-slate-900">{student.name}</td>
                    <td className="py-3 px-3 text-sm text-slate-700 hidden md:table-cell">{student.class}</td>
                    <td className="py-3 px-3">
                      <StatusBadge tone={student.status === 'present' ? 'emerald' : student.status === 'absent' ? 'rose' : 'amber'}>
                        {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                      </StatusBadge>
                    </td>
                    <td className="py-3 px-3 text-sm text-slate-600 hidden sm:table-cell">{student.time}</td>
                    <td className="py-3 px-3 text-sm text-slate-500 hidden lg:table-cell">{student.remarks || '-'}</td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-1">
                        <button className="p-2 rounded hover:bg-emerald-100 text-emerald-600 transition-colors" title="Mark Present"><AppIcon name="check_circle" size={14} /></button>
                        <button className="p-2 rounded hover:bg-rose-100 text-rose-600 transition-colors" title="Mark Absent"><AppIcon name="cancel" size={14} /></button>
                        <button className="p-2 rounded hover:bg-slate-100 transition-colors"><AppIcon name="more_vert" size={14} className="text-slate-600" /></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {filteredStudents.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(filteredStudents.length / itemsPerPage)}
            onPageChange={setCurrentPage}
            itemsPerPage={itemsPerPage}
            totalItems={filteredStudents.length}
            className="mt-4"
          />
        )}
      </SectionCard>
    </DashboardPage>
  );
}
