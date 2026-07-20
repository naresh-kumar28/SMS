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

const courseStats = [
  { icon: 'school', label: 'Total Courses', value: '8', change: '+2', helper: 'This month', tone: 'blue' },
  { icon: 'play_circle', label: 'Active', value: '6', change: '+1', helper: 'Running', tone: 'emerald' },
  { icon: 'close', label: 'Inactive', value: '2', change: '-', helper: 'Archived', tone: 'slate' },
  { icon: 'group', label: 'Total Students', value: '1,284', change: '+72', helper: 'Enrolled', tone: 'rose' },
  { icon: 'payments', label: 'Revenue', value: '₹4.2L', change: '+₹0.8L', helper: 'This course', tone: 'amber' },
  { icon: 'star', label: 'Avg Rating', value: '4.5', change: '+0.2', helper: 'Reviews', tone: 'purple' },
];

const courses = [
  { id: 1, name: 'NEET Foundation', category: 'Medical', duration: '1 year', fee: 25000, students: 450, batches: 3, status: 'active', type: 'paid', rating: 4.7, teacher: 'Dr. Amit Kumar' },
  { id: 2, name: 'JEE Advanced', category: 'Engineering', duration: '1 year', fee: 35000, students: 320, batches: 2, status: 'active', type: 'paid', rating: 4.6, teacher: 'Mr. Rahul Verma' },
  { id: 3, name: 'JEE Mains', category: 'Engineering', duration: '6 months', fee: 20000, students: 280, batches: 2, status: 'active', type: 'paid', rating: 4.5, teacher: 'Mr. Rahul Verma' },
  { id: 4, name: 'Coding Bootcamp', category: 'Programming', duration: '3 months', fee: 15000, students: 180, batches: 2, status: 'active', type: 'paid', rating: 4.8, teacher: 'Ms. Ananya Reddy' },
  { id: 5, name: 'English Speaking', category: 'Language', duration: '2 months', fee: 5000, students: 54, batches: 1, status: 'active', type: 'free', rating: 4.3, teacher: 'Mr. Kunal Patel' },
  { id: 6, name: 'NEET Crash Course', category: 'Medical', duration: '2 months', fee: 12000, students: 0, batches: 0, status: 'inactive', type: 'paid', rating: 0, teacher: 'Dr. Amit Kumar' },
];

export default function Courses() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredCourses = useMemo(() => {
    return courses.filter(course => {
      const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        course.teacher.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || course.category === categoryFilter;
      const matchesStatus = statusFilter === 'all' || course.status === statusFilter;
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [searchTerm, categoryFilter, statusFilter]);

  const paginatedCourses = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredCourses.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredCourses, currentPage]);

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'Medical', label: 'Medical' },
    { value: 'Engineering', label: 'Engineering' },
    { value: 'Programming', label: 'Programming' },
    { value: 'Language', label: 'Language' },
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

  const getTypeTone = (type) => {
    switch(type) {
      case 'paid': return 'rose';
      case 'free': return 'blue';
      default: return 'slate';
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
  };

  return (
    <DashboardPage
      eyebrow="Course management"
      title="Courses"
      actions={
        <>
          <button className="px-5 py-2.5 bg-primary text-white rounded-xl text-xs font-bold hover:shadow-lg hover:shadow-primary/20 transition-all flex items-center gap-2">
            <AppIcon name="add" size={16} />
            Create Course
          </button>
          <button className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all flex items-center gap-2 shadow-sm">
            <AppIcon name="download" size={16} />
            Export
          </button>
        </>
      }
    >
      <MetricGrid>
        {courseStats.map((stat, index) => (
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

      <SectionCard title="All Courses" description="Manage courses and curriculum">
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <AppIcon name="search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            <Dropdown value={categoryFilter} onChange={setCategoryFilter} options={categoryOptions} className="min-w-[140px]" />
            <Dropdown value={statusFilter} onChange={setStatusFilter} options={statusOptions} className="min-w-[130px]" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Course</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Category</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Duration</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Fee</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Type</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Students</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Batches</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Teacher</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Status</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginatedCourses.length === 0 ? (
                <tr>
                  <td colSpan="10" className="py-8 text-center text-slate-500">
                    No courses found.
                  </td>
                </tr>
              ) : (
                paginatedCourses.map((course) => (
                  <tr key={course.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-3">
                      <p className="font-semibold text-sm text-slate-900">{course.name}</p>
                      <div className="flex items-center gap-1 mt-0.5">
                        <AppIcon name="star" size={12} className="text-amber-500" />
                        <span className="text-xs text-slate-600">{course.rating}</span>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-sm text-slate-700">{course.category}</td>
                    <td className="py-3 px-3 text-sm text-slate-600">{course.duration}</td>
                    <td className="py-3 px-3 text-sm font-medium text-slate-900">{formatCurrency(course.fee)}</td>
                    <td className="py-3 px-3">
                      <StatusBadge tone={getTypeTone(course.type)}>
                        {course.type.charAt(0).toUpperCase() + course.type.slice(1)}
                      </StatusBadge>
                    </td>
                    <td className="py-3 px-3 text-sm text-slate-700">{course.students}</td>
                    <td className="py-3 px-3 text-sm text-slate-600">{course.batches}</td>
                    <td className="py-3 px-3 text-sm text-slate-600">{course.teacher}</td>
                    <td className="py-3 px-3">
                      <StatusBadge tone={getStatusTone(course.status)}>
                        {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
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

        {filteredCourses.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(filteredCourses.length / itemsPerPage)}
            onPageChange={setCurrentPage}
            itemsPerPage={itemsPerPage}
            totalItems={filteredCourses.length}
            className="mt-4"
          />
        )}
      </SectionCard>
    </DashboardPage>
  );
}