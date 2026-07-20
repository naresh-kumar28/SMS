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

const assignmentStats = [
  { icon: 'assignment', label: 'Total Assignments', value: '156', change: '+24', helper: 'This month', tone: 'blue' },
  { icon: 'check_circle', label: 'Submitted', value: '128', change: '+18', helper: '82%', tone: 'emerald' },
  { icon: 'pending_actions', label: 'Pending', value: '28', change: '-6', helper: 'Due soon', tone: 'amber' },
  { icon: 'late', label: 'Overdue', value: '12', change: '-4', helper: 'Extended', tone: 'rose' },
  { icon: 'rate_review', label: 'Graded', value: '98', change: '+15', helper: 'Feedback', tone: 'purple' },
  { icon: 'timer', label: 'Avg Score', value: '74%', change: '+3%', helper: 'Class', tone: 'green' },
];

const assignments = [
  { id: 1, title: 'Linear Equations - Chapter 3', class: 'Class 10-A', subject: 'Mathematics', teacher: 'Mr. Amit Sharma', dueDate: '2024-01-28', postedDate: '2024-01-22', totalStudents: 45, submitted: 42, pending: 3, status: 'active', maxMarks: 20 },
  { id: 2, title: 'Chemical Reactions - Lab Report', class: 'Class 10-A', subject: 'Science', teacher: 'Ms. Priya Rao', dueDate: '2024-01-30', postedDate: '2024-01-23', totalStudents: 45, submitted: 38, pending: 7, status: 'active', maxMarks: 25 },
  { id: 3, title: 'Essay Writing - My Favorite Memory', class: 'Class 10-A', subject: 'English', teacher: 'Ms. Sarah James', dueDate: '2024-01-25', postedDate: '2024-01-20', totalStudents: 45, submitted: 45, pending: 0, status: 'closed', maxMarks: 15 },
  { id: 4, title: 'Physics Numerical Problems', class: 'Class 12-A', subject: 'Physics', teacher: 'Mr. Rohan Mehra', dueDate: '2024-02-01', postedDate: '2024-01-25', totalStudents: 38, submitted: 12, pending: 26, status: 'active', maxMarks: 30 },
  { id: 5, title: 'History Map Work', class: 'Class 9-A', subject: 'History', teacher: 'Mr. Vikram Singh', dueDate: '2024-01-27', postedDate: '2024-01-21', totalStudents: 42, submitted: 35, pending: 7, status: 'active', maxMarks: 10 },
  { id: 6, title: 'Programming - Array Basics', class: 'Class 11-A', subject: 'Computer', teacher: 'Ms. Anjali Gupta', dueDate: '2024-01-29', postedDate: '2024-01-24', totalStudents: 35, submitted: 18, pending: 17, status: 'active', maxMarks: 20 },
  { id: 7, title: 'Organic Chemistry Notes', class: 'Class 12-A', subject: 'Chemistry', teacher: 'Dr. Kunal Patel', dueDate: '2024-01-22', postedDate: '2024-01-18', totalStudents: 38, submitted: 38, pending: 0, status: 'closed', maxMarks: 15 },
  { id: 8, title: 'Grammar Exercises - Tenses', class: 'Class 9-B', subject: 'English', teacher: 'Ms. Sarah James', dueDate: '2024-01-26', postedDate: '2024-01-19', totalStudents: 40, submitted: 32, pending: 8, status: 'active', maxMarks: 10 },
  { id: 9, title: 'Geometry Proofs', class: 'Class 10-B', subject: 'Mathematics', teacher: 'Mr. Amit Sharma', dueDate: '2024-02-05', postedDate: '2024-01-28', totalStudents: 40, submitted: 8, pending: 32, status: 'active', maxMarks: 25 },
  { id: 10, title: 'Biology Diagram Lab', class: 'Class 11-B', subject: 'Biology', teacher: 'Ms. Meera Nair', dueDate: '2024-01-31', postedDate: '2024-01-26', totalStudents: 36, submitted: 14, pending: 22, status: 'active', maxMarks: 15 },
];

export default function Assignments() {
  const [searchTerm, setSearchTerm] = useState('');
  const [classFilter, setClassFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [subjectFilter, setSubjectFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredAssignments = useMemo(() => {
    return assignments.filter(assignment => {
      const matchesSearch = assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           assignment.teacher.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesClass = classFilter === 'all' || assignment.class === classFilter;
      const matchesStatus = statusFilter === 'all' || assignment.status === statusFilter;
      const matchesSubject = subjectFilter === 'all' || assignment.subject === subjectFilter;
      return matchesSearch && matchesClass && matchesStatus && matchesSubject;
    });
  }, [searchTerm, classFilter, statusFilter, subjectFilter]);

  const paginatedAssignments = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAssignments.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAssignments, currentPage, itemsPerPage]);

  const classOptions = [
    { value: 'all', label: 'All Classes' },
    { value: 'Class 10-A', label: 'Class 10-A' },
    { value: 'Class 10-B', label: 'Class 10-B' },
    { value: 'Class 9-A', label: 'Class 9-A' },
    { value: 'Class 9-B', label: 'Class 9-B' },
    { value: 'Class 11-A', label: 'Class 11-A' },
    { value: 'Class 11-B', label: 'Class 11-B' },
    { value: 'Class 12-A', label: 'Class 12-A' },
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'closed', label: 'Closed' },
  ];

  const subjectOptions = [
    { value: 'all', label: 'All Subjects' },
    { value: 'Mathematics', label: 'Mathematics' },
    { value: 'Science', label: 'Science' },
    { value: 'English', label: 'English' },
    { value: 'Physics', label: 'Physics' },
    { value: 'Chemistry', label: 'Chemistry' },
    { value: 'Biology', label: 'Biology' },
    { value: 'History', label: 'History' },
    { value: 'Computer', label: 'Computer' },
  ];

  const getStatusTone = (status) => {
    switch(status) {
      case 'active': return 'emerald';
      case 'closed': return 'slate';
      default: return 'slate';
    }
  };

  return (
    <DashboardPage
      eyebrow="Academic"
      title="Assignments"
      actions={
        <>
          <button className="px-5 py-2.5 bg-primary text-white rounded-xl text-xs font-bold hover:shadow-lg hover:shadow-primary/20 transition-all flex items-center gap-2">
            <AppIcon name="add" size={16} />
            Create Assignment
          </button>
          <button className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all flex items-center gap-2 shadow-sm">
            <AppIcon name="download" size={16} />
            Export
          </button>
        </>
      }
    >
      <MetricGrid>
        {assignmentStats.map((stat, index) => (
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

      <SectionCard title="All Assignments" description="Manage and track student assignments">
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <AppIcon name="search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search assignments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            <Dropdown value={classFilter} onChange={setClassFilter} options={classOptions} className="min-w-[140px]" />
            <Dropdown value={subjectFilter} onChange={setSubjectFilter} options={subjectOptions} className="min-w-[140px]" />
            <Dropdown value={statusFilter} onChange={setStatusFilter} options={statusOptions} className="min-w-[130px]" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Assignment</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Class</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Subject</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Teacher</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Due Date</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Submitted</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Marks</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Status</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginatedAssignments.length === 0 ? (
                <tr>
                  <td colSpan="9" className="py-8 text-center text-slate-500">
                    No assignments found.
                  </td>
                </tr>
              ) : (
                paginatedAssignments.map((assignment) => (
                  <tr key={assignment.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-3">
                      <p className="font-semibold text-sm text-slate-900">{assignment.title}</p>
                    </td>
                    <td className="py-3 px-3 text-sm text-slate-700">{assignment.class}</td>
                    <td className="py-3 px-3 text-sm text-slate-600">{assignment.subject}</td>
                    <td className="py-3 px-3 text-sm text-slate-600">{assignment.teacher}</td>
                    <td className="py-3 px-3 text-sm text-slate-600">{assignment.dueDate}</td>
                    <td className="py-3 px-3 text-sm">
                      <span className="text-emerald-600 font-medium">{assignment.submitted}</span>
                      <span className="text-slate-400">/{assignment.totalStudents}</span>
                    </td>
                    <td className="py-3 px-3 text-sm text-slate-600">{assignment.maxMarks}</td>
                    <td className="py-3 px-3">
                      <StatusBadge tone={getStatusTone(assignment.status)}>
                        {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
                      </StatusBadge>
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-1">
                        <button className="p-2 rounded hover:bg-slate-100 transition-colors" title="View Details"><AppIcon name="visibility" size={14} className="text-slate-600" /></button>
                        <button className="p-2 rounded hover:bg-slate-100 transition-colors" title="Edit"><AppIcon name="edit" size={14} className="text-slate-600" /></button>
                        <button className="p-2 rounded hover:bg-slate-100 transition-colors"><AppIcon name="more_vert" size={14} className="text-slate-600" /></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {filteredAssignments.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(filteredAssignments.length / itemsPerPage)}
            onPageChange={setCurrentPage}
            itemsPerPage={itemsPerPage}
            totalItems={filteredAssignments.length}
            className="mt-4"
          />
        )}
      </SectionCard>
    </DashboardPage>
  );
}