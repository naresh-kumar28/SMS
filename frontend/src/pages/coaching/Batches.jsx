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

const batchStats = [
  { icon: 'group', label: 'Total Batches', value: '12', change: '+2', helper: 'Active', tone: 'blue' },
  { icon: 'wb_sunny', label: 'Morning', value: '5', change: '+1', helper: 'Batches', tone: 'amber' },
  { icon: 'nights_stay', label: 'Evening', value: '4', change: '+1', helper: 'Batches', tone: 'purple' },
  { icon: 'event', label: 'Weekend', value: '3', change: '-', helper: 'Batches', tone: 'emerald' },
  { icon: 'group', label: 'Avg Students', value: '45', change: '+5', helper: 'Per batch', tone: 'rose' },
  { icon: 'schedule', label: 'Slots Left', value: '8', change: '-2', helper: 'Available', tone: 'slate' },
];

const batches = [
  { id: 1, name: 'NEET Morning A', course: 'NEET Foundation', timing: '6:00 AM - 9:00 AM', days: 'Mon-Sat', teacher: 'Dr. Amit Kumar', students: 48, maxStudents: 50, status: 'active', startDate: '2024-01-01' },
  { id: 2, name: 'NEET Morning B', course: 'NEET Foundation', timing: '9:00 AM - 12:00 PM', days: 'Mon-Sat', teacher: 'Ms. Sneha Gupta', students: 45, maxStudents: 50, status: 'active', startDate: '2024-01-01' },
  { id: 3, name: 'JEE Evening A', course: 'JEE Advanced', timing: '3:00 PM - 6:00 PM', days: 'Mon-Sat', teacher: 'Mr. Rahul Verma', students: 42, maxStudents: 45, status: 'active', startDate: '2024-01-01' },
  { id: 4, name: 'JEE Evening B', course: 'JEE Mains', timing: '6:00 PM - 9:00 PM', days: 'Mon-Sat', teacher: 'Mr. Rahul Verma', students: 38, maxStudents: 40, status: 'active', startDate: '2024-01-01' },
  { id: 5, name: 'Coding Weekend', course: 'Coding Bootcamp', timing: '10:00 AM - 4:00 PM', days: 'Sun', teacher: 'Ms. Ananya Reddy', students: 25, maxStudents: 30, status: 'active', startDate: '2024-01-14' },
  { id: 6, name: 'NEET Crash', course: 'NEET Crash Course', timing: '6:00 AM - 9:00 AM', days: 'Mon-Sat', teacher: 'Dr. Amit Kumar', students: 0, maxStudents: 50, status: 'inactive', startDate: '2024-02-01' },
];

export default function Batches() {
  const [searchTerm, setSearchTerm] = useState('');
  const [courseFilter, setCourseFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredBatches = useMemo(() => {
    return batches.filter(batch => {
      const matchesSearch = batch.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        batch.course.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCourse = courseFilter === 'all' || batch.course === courseFilter;
      const matchesStatus = statusFilter === 'all' || batch.status === statusFilter;
      return matchesSearch && matchesCourse && matchesStatus;
    });
  }, [searchTerm, courseFilter, statusFilter]);

  const paginatedBatches = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredBatches.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredBatches, currentPage]);

  const courseOptions = [
    { value: 'all', label: 'All Courses' },
    { value: 'NEET Foundation', label: 'NEET Foundation' },
    { value: 'JEE Advanced', label: 'JEE Advanced' },
    { value: 'JEE Mains', label: 'JEE Mains' },
    { value: 'Coding Bootcamp', label: 'Coding Bootcamp' },
    { value: 'NEET Crash Course', label: 'NEET Crash Course' },
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
  ];

  const getStatusTone = (status) => {
    switch(status) {
      case 'active': return 'emerald';
      case 'inactive': return 'slate';
      default: return 'slate';
    }
  };

  return (
    <DashboardPage
      eyebrow="Batch management"
      title="Batches"
      actions={
        <>
          <button className="px-5 py-2.5 bg-primary text-white rounded-xl text-xs font-bold hover:shadow-lg hover:shadow-primary/20 transition-all flex items-center gap-2">
            <AppIcon name="add" size={16} />
            Create Batch
          </button>
          <button className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all flex items-center gap-2 shadow-sm">
            <AppIcon name="schedule" size={16} />
            Schedule
          </button>
        </>
      }
    >
      <MetricGrid>
        {batchStats.map((stat, index) => (
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

      <SectionCard title="All Batches" description="Manage batch schedules and timings">
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <AppIcon name="search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search batches..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            <Dropdown value={courseFilter} onChange={setCourseFilter} options={courseOptions} className="min-w-[160px]" />
            <Dropdown value={statusFilter} onChange={setStatusFilter} options={statusOptions} className="min-w-[130px]" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Batch</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Course</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Timing</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Days</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Teacher</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Students</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Status</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Start Date</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginatedBatches.length === 0 ? (
                <tr>
                  <td colSpan="9" className="py-8 text-center text-slate-500">
                    No batches found.
                  </td>
                </tr>
              ) : (
                paginatedBatches.map((batch) => (
                  <tr key={batch.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-3">
                      <p className="font-semibold text-sm text-slate-900">{batch.name}</p>
                    </td>
                    <td className="py-3 px-3 text-sm text-slate-700">{batch.course}</td>
                    <td className="py-3 px-3 text-sm text-slate-600">{batch.timing}</td>
                    <td className="py-3 px-3 text-sm text-slate-600">{batch.days}</td>
                    <td className="py-3 px-3 text-sm text-slate-600">{batch.teacher}</td>
                    <td className="py-3 px-3 text-sm">
                      <span className="text-emerald-600 font-medium">{batch.students}</span>
                      <span className="text-slate-400">/{batch.maxStudents}</span>
                    </td>
                    <td className="py-3 px-3">
                      <StatusBadge tone={getStatusTone(batch.status)}>
                        {batch.status.charAt(0).toUpperCase() + batch.status.slice(1)}
                      </StatusBadge>
                    </td>
                    <td className="py-3 px-3 text-sm text-slate-600">{batch.startDate}</td>
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

        {filteredBatches.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(filteredBatches.length / itemsPerPage)}
            onPageChange={setCurrentPage}
            itemsPerPage={itemsPerPage}
            totalItems={filteredBatches.length}
            className="mt-4"
          />
        )}
      </SectionCard>
    </DashboardPage>
  );
}