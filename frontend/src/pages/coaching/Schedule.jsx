import { useState, useMemo } from 'react';
import AppIcon from '../../components/common/AppIcon';
import Dropdown from '../../components/common/Dropdown';
import {
  DashboardPage,
  MetricCard,
  MetricGrid,
  SectionCard,
  StatusBadge,
} from '../../components/common/DashboardPrimitives';

const scheduleStats = [
  { icon: 'event', label: 'Total Classes', value: '24', change: '+4', helper: 'This week', tone: 'blue' },
  { icon: 'check_circle', label: 'Completed', value: '18', change: '+2', helper: 'Today', tone: 'emerald' },
  { icon: 'schedule', label: 'Upcoming', value: '6', change: '+2', helper: 'Pending', tone: 'amber' },
  { icon: 'cancel', label: 'Cancelled', value: '0', change: '-', helper: 'No issues', tone: 'rose' },
  { icon: 'group', label: 'Avg Attendance', value: '92%', change: '+3%', helper: 'Classes', tone: 'purple' },
  { icon: 'timer', label: 'Total Hours', value: '48', change: '+8', helper: 'This week', tone: 'green' },
];

const schedules = [
  { id: 1, subject: 'Physics', batch: 'NEET Morning A', teacher: 'Dr. Amit Kumar', time: '6:00 AM - 7:30 AM', days: 'Mon, Wed, Fri', status: 'completed', date: '2024-01-25' },
  { id: 2, subject: 'Chemistry', batch: 'NEET Morning A', teacher: 'Ms. Priya Sharma', time: '7:30 AM - 9:00 AM', days: 'Mon, Wed, Fri', status: 'completed', date: '2024-01-25' },
  { id: 3, subject: 'Mathematics', batch: 'JEE Evening A', teacher: 'Mr. Rahul Verma', time: '3:00 PM - 4:30 PM', days: 'Mon, Tue, Wed', status: 'completed', date: '2024-01-25' },
  { id: 4, subject: 'Biology', batch: 'NEET Morning B', teacher: 'Ms. Sneha Gupta', time: '9:00 AM - 10:30 AM', days: 'Tue, Thu, Sat', status: 'upcoming', date: '2024-01-26' },
  { id: 5, subject: 'English', batch: 'JEE Evening B', teacher: 'Mr. Kunal Patel', time: '4:30 PM - 6:00 PM', days: 'Tue, Thu', status: 'upcoming', date: '2024-01-26' },
  { id: 6, subject: 'Computer', batch: 'Coding Weekend', teacher: 'Ms. Ananya Reddy', time: '10:00 AM - 4:00 PM', days: 'Sun', status: 'upcoming', date: '2024-01-28' },
];

export default function CoachingSchedule() {
  const [batchFilter, setBatchFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredSchedule = useMemo(() => {
    return schedules.filter(s => {
      const matchesBatch = batchFilter === 'all' || s.batch === batchFilter;
      const matchesStatus = statusFilter === 'all' || s.status === statusFilter;
      return matchesBatch && matchesStatus;
    });
  }, [batchFilter, statusFilter]);

  const batchOptions = [
    { value: 'all', label: 'All Batches' },
    { value: 'NEET Morning A', label: 'NEET Morning A' },
    { value: 'NEET Morning B', label: 'NEET Morning B' },
    { value: 'JEE Evening A', label: 'JEE Evening A' },
    { value: 'JEE Evening B', label: 'JEE Evening B' },
    { value: 'Coding Weekend', label: 'Coding Weekend' },
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'completed', label: 'Completed' },
    { value: 'upcoming', label: 'Upcoming' },
    { value: 'cancelled', label: 'Cancelled' },
  ];

  const getStatusTone = (status) => {
    switch(status) {
      case 'completed': return 'emerald';
      case 'upcoming': return 'amber';
      case 'cancelled': return 'rose';
      default: return 'slate';
    }
  };

  return (
    <DashboardPage
      eyebrow="Schedule management"
      title="Schedule"
      actions={
        <>
          <button className="px-5 py-2.5 bg-primary text-white rounded-xl text-xs font-bold hover:shadow-lg hover:shadow-primary/20 transition-all flex items-center gap-2">
            <AppIcon name="add" size={16} />
            Add Class
          </button>
          <button className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all flex items-center gap-2 shadow-sm">
            <AppIcon name="download" size={16} />
            Export
          </button>
        </>
      }
    >
      <MetricGrid>
        {scheduleStats.map((stat, index) => (
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

      <SectionCard title="Class Schedule" description="Weekly class timetable">
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="flex gap-2 flex-wrap">
            <Dropdown value={batchFilter} onChange={setBatchFilter} options={batchOptions} className="min-w-[150px]" />
            <Dropdown value={statusFilter} onChange={setStatusFilter} options={statusOptions} className="min-w-[130px]" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Subject</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Batch</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Teacher</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Time</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Days</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Date</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Status</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredSchedule.length === 0 ? (
                <tr>
                  <td colSpan="8" className="py-8 text-center text-slate-500">
                    No schedule found.
                  </td>
                </tr>
              ) : (
                filteredSchedule.map((schedule) => (
                  <tr key={schedule.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-3">
                      <p className="font-semibold text-sm text-slate-900">{schedule.subject}</p>
                    </td>
                    <td className="py-3 px-3 text-sm text-slate-700">{schedule.batch}</td>
                    <td className="py-3 px-3 text-sm text-slate-600">{schedule.teacher}</td>
                    <td className="py-3 px-3 text-sm text-slate-600">{schedule.time}</td>
                    <td className="py-3 px-3 text-sm text-slate-600">{schedule.days}</td>
                    <td className="py-3 px-3 text-sm text-slate-600">{schedule.date}</td>
                    <td className="py-3 px-3">
                      <StatusBadge tone={getStatusTone(schedule.status)}>
                        {schedule.status.charAt(0).toUpperCase() + schedule.status.slice(1)}
                      </StatusBadge>
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-1">
                        <button className="p-2 rounded hover:bg-slate-100 transition-colors"><AppIcon name="visibility" size={14} className="text-slate-600" /></button>
                        <button className="p-2 rounded hover:bg-slate-100 transition-colors"><AppIcon name="edit" size={14} className="text-slate-600" /></button>
                        <button className="p-2 rounded hover:bg-slate-100 transition-colors"><AppIcon name="more_vert" size={14} className="text-slate-600" /></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </DashboardPage>
  );
}