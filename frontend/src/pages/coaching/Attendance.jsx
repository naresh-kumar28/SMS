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

const attendanceStats = [
  { icon: 'monitoring', label: 'Today Attendance', value: '94.8%', change: '+1.1%', helper: 'Whole center', tone: 'blue' },
  { icon: 'group', label: 'Absent Today', value: '67', change: '-9', helper: 'Needs follow-up', tone: 'amber' },
  { icon: 'how_to_reg', label: 'Teachers Present', value: '22/24', change: '2 on leave', tone: 'emerald' },
  { icon: 'event', label: 'On Time', value: '89%', change: '+3%', helper: 'Arrivals', tone: 'green' },
  { icon: 'warning', label: 'Late Arrivals', value: '11', change: '-4', helper: 'Minor issues', tone: 'purple' },
  { icon: 'notifications', label: 'Parent Alerts', value: '31', change: 'Sent', helper: 'Before noon', tone: 'rose' },
];

const students = [
  { id: 1, name: 'Aarav Sharma', batch: 'NEET Morning A', status: 'present', time: '07:55 AM', remarks: '' },
  { id: 2, name: 'Priya Singh', batch: 'NEET Morning A', status: 'present', time: '07:58 AM', remarks: '' },
  { id: 3, name: 'Rahul Verma', batch: 'JEE Evening A', status: 'absent', time: '-', remarks: 'Uninformed' },
  { id: 4, name: 'Sneha Gupta', batch: 'NEET Morning A', status: 'present', time: '08:02 AM', remarks: 'Late' },
  { id: 5, name: 'Kunal Patel', batch: 'JEE Evening A', status: 'present', time: '07:52 AM', remarks: '' },
  { id: 6, name: 'Ananya Reddy', batch: 'NEET Morning B', status: 'absent', time: '-', remarks: 'Medical leave' },
  { id: 7, name: 'Vikram Joshi', batch: 'Coding Weekend', status: 'present', time: '10:00 AM', remarks: '' },
  { id: 8, name: 'Meera Nair', batch: 'NEET Morning A', status: 'present', time: '07:45 AM', remarks: '' },
  { id: 9, name: 'Dev Sharma', batch: 'JEE Evening B', status: 'late', time: '10:15 AM', remarks: '15 min late' },
  { id: 10, name: 'Neha Kapoor', batch: 'NEET Morning B', status: 'present', time: '08:50 AM', remarks: '' },
];

export default function CoachingAttendance() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [batchFilter, setBatchFilter] = useState('all');
  const [attendanceFilter, setAttendanceFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredStudents = useMemo(() => {
    return students.filter(student => {
      const matchesBatch = batchFilter === 'all' || student.batch === batchFilter;
      const matchesAttendance = attendanceFilter === 'all' || student.status === attendanceFilter;
      return matchesBatch && matchesAttendance;
    });
  }, [batchFilter, attendanceFilter]);

  const paginatedStudents = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredStudents.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredStudents, currentPage]);

  const batchOptions = [
    { value: 'all', label: 'All Batches' },
    { value: 'NEET Morning A', label: 'NEET Morning A' },
    { value: 'NEET Morning B', label: 'NEET Morning B' },
    { value: 'JEE Evening A', label: 'JEE Evening A' },
    { value: 'JEE Evening B', label: 'JEE Evening B' },
    { value: 'Coding Weekend', label: 'Coding Weekend' },
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

  return (
    <DashboardPage
      eyebrow="Daily tracking"
      title="Attendance"
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

      <SectionCard title="Mark Attendance" description="Select date and batch to mark student attendance">
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
            <Dropdown value={batchFilter} onChange={setBatchFilter} options={batchOptions} className="min-w-[150px]" />
            <Dropdown value={attendanceFilter} onChange={setAttendanceFilter} options={attendanceOptions} className="min-w-[130px]" />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-emerald-50 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-emerald-600">{presentCount}</div>
            <div className="text-sm text-emerald-700">Present</div>
          </div>
          <div className="bg-rose-50 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-rose-600">{absentCount}</div>
            <div className="text-sm text-rose-700">Absent</div>
          </div>
          <div className="bg-amber-50 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-amber-600">{lateCount}</div>
            <div className="text-sm text-amber-700">Late</div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Student Name</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Batch</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Status</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Time</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Remarks</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginatedStudents.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-slate-500">
                    No students found.
                  </td>
                </tr>
              ) : (
                paginatedStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-3 text-sm font-semibold text-slate-900">{student.name}</td>
                    <td className="py-3 px-3 text-sm text-slate-700">{student.batch}</td>
                    <td className="py-3 px-3">
                      <StatusBadge tone={student.status === 'present' ? 'emerald' : student.status === 'absent' ? 'rose' : 'amber'}>
                        {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                      </StatusBadge>
                    </td>
                    <td className="py-3 px-3 text-sm text-slate-600">{student.time}</td>
                    <td className="py-3 px-3 text-sm text-slate-500">{student.remarks || '-'}</td>
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