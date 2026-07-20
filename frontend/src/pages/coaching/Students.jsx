import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
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

const studentStats = [
  { icon: 'group', label: 'Total Students', value: '1,284', change: '+72', helper: 'This session', tone: 'blue' },
  { icon: 'school', label: 'Active Courses', value: '8', change: '+2', helper: 'Running', tone: 'emerald' },
  { icon: 'payments', label: 'Paid', value: '1,156', change: '+89', helper: '90%', tone: 'rose' },
  { icon: 'trending_up', label: 'New This Month', value: '54', change: '+12', helper: 'Enrollments', tone: 'amber' },
  { icon: 'group', label: 'Free Users', value: '128', change: '-10', helper: 'Trial', tone: 'purple' },
  { icon: 'block', label: 'Blocked', value: '8', change: '-2', helper: 'Accounts', tone: 'slate' },
];

const students = [
  { id: 1, name: 'Aarav Sharma', phone: '+91 98765 43210', email: 'aarav@email.com', course: 'NEET Foundation', batch: 'Morning', status: 'active', payment: 'paid', joinedDate: '2024-01-15', slug: 'aarav-sharma' },
  { id: 2, name: 'Priya Singh', phone: '+91 98765 43211', email: 'priya@email.com', course: 'JEE Advanced', batch: 'Evening', status: 'active', payment: 'paid', joinedDate: '2024-01-16', slug: 'priya-singh' },
  { id: 3, name: 'Rahul Verma', phone: '+91 98765 43212', email: 'rahul@email.com', course: 'Coding Bootcamp', batch: 'Weekend', status: 'active', payment: 'pending', joinedDate: '2024-01-10', slug: 'rahul-verma' },
  { id: 4, name: 'Sneha Gupta', phone: '+91 98765 43213', email: 'sneha@email.com', course: 'NEET Foundation', batch: 'Morning', status: 'active', payment: 'paid', joinedDate: '2024-01-12', slug: 'sneha-gupta' },
  { id: 5, name: 'Kunal Patel', phone: '+91 98765 43214', email: 'kunal@email.com', course: 'JEE Mains', batch: 'Evening', status: 'inactive', payment: 'failed', joinedDate: '2023-12-15', slug: 'kunal-patel' },
  { id: 6, name: 'Ananya Reddy', phone: '+91 98765 43215', email: 'ananya@email.com', course: 'NEET Foundation', batch: 'Morning', status: 'active', payment: 'paid', joinedDate: '2024-01-18', slug: 'ananya-reddy' },
  { id: 7, name: 'Vikram Joshi', phone: '+91 98765 43216', email: 'vikram@email.com', course: 'JEE Advanced', batch: 'Evening', status: 'active', payment: 'paid', joinedDate: '2024-01-20', slug: 'vikram-joshi' },
  { id: 8, name: 'Meera Nair', phone: '+91 98765 43217', email: 'meera@email.com', course: 'Coding Bootcamp', batch: 'Weekend', status: 'active', payment: 'free', joinedDate: '2024-01-22', slug: 'meera-nair' },
  { id: 9, name: 'Dev Sharma', phone: '+91 98765 43218', email: 'dev@email.com', course: 'NEET Foundation', batch: 'Morning', status: 'active', payment: 'paid', joinedDate: '2024-01-25', slug: 'dev-sharma' },
  { id: 10, name: 'Neha Kapoor', phone: '+91 98765 43219', email: 'neha@email.com', course: 'JEE Mains', batch: 'Evening', status: 'inactive', payment: 'pending', joinedDate: '2023-11-08', slug: 'neha-kapoor' },
];

export default function CoachingStudents() {
  const [searchTerm, setSearchTerm] = useState('');
  const [courseFilter, setCourseFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [paymentFilter, setPaymentFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredStudents = useMemo(() => {
    return students.filter(student => {
      const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           student.phone.includes(searchTerm);
      const matchesCourse = courseFilter === 'all' || student.course === courseFilter;
      const matchesStatus = statusFilter === 'all' || student.status === statusFilter;
      const matchesPayment = paymentFilter === 'all' || student.payment === paymentFilter;
      return matchesSearch && matchesCourse && matchesStatus && matchesPayment;
    });
  }, [searchTerm, courseFilter, statusFilter, paymentFilter]);

  const paginatedStudents = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredStudents.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredStudents, currentPage]);

  const courseOptions = [
    { value: 'all', label: 'All Courses' },
    { value: 'NEET Foundation', label: 'NEET Foundation' },
    { value: 'JEE Advanced', label: 'JEE Advanced' },
    { value: 'JEE Mains', label: 'JEE Mains' },
    { value: 'Coding Bootcamp', label: 'Coding Bootcamp' },
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
  ];

  const paymentOptions = [
    { value: 'all', label: 'All Payment' },
    { value: 'paid', label: 'Paid' },
    { value: 'pending', label: 'Pending' },
    { value: 'failed', label: 'Failed' },
    { value: 'free', label: 'Free' },
  ];

  const getStatusTone = (status) => {
    switch(status) {
      case 'active': return 'emerald';
      case 'inactive': return 'slate';
      default: return 'slate';
    }
  };

  const getPaymentTone = (payment) => {
    switch(payment) {
      case 'paid': return 'emerald';
      case 'pending': return 'amber';
      case 'failed': return 'rose';
      case 'free': return 'blue';
      default: return 'slate';
    }
  };

  return (
    <DashboardPage
      eyebrow="Student management"
      title="Students"
      actions={
        <>
          <button className="px-5 py-2.5 bg-primary text-white rounded-xl text-xs font-bold hover:shadow-lg hover:shadow-primary/20 transition-all flex items-center gap-2">
            <AppIcon name="add" size={16} />
            Add Student
          </button>
          <button className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all flex items-center gap-2 shadow-sm">
            <AppIcon name="upload" size={16} />
            Import CSV
          </button>
        </>
      }
    >
      <MetricGrid>
        {studentStats.map((stat, index) => (
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

      <SectionCard title="All Students" description="Manage students and their enrollments">
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <AppIcon name="search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            <Dropdown value={courseFilter} onChange={setCourseFilter} options={courseOptions} className="min-w-[150px]" />
            <Dropdown value={statusFilter} onChange={setStatusFilter} options={statusOptions} className="min-w-[130px]" />
            <Dropdown value={paymentFilter} onChange={setPaymentFilter} options={paymentOptions} className="min-w-[130px]" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Student</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Contact</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Course</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Batch</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Payment</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Status</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Joined</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginatedStudents.length === 0 ? (
                <tr>
                  <td colSpan="8" className="py-8 text-center text-slate-500">
                    No students found.
                  </td>
                </tr>
              ) : (
                paginatedStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-3">
                      <p className="font-semibold text-sm text-slate-900">{student.name}</p>
                    </td>
                    <td className="py-3 px-3">
                      <p className="text-sm text-slate-700">{student.phone}</p>
                      <p className="text-xs text-slate-500">{student.email}</p>
                    </td>
                    <td className="py-3 px-3 text-sm text-slate-700">{student.course}</td>
                    <td className="py-3 px-3 text-sm text-slate-600">{student.batch}</td>
                    <td className="py-3 px-3">
                      <StatusBadge tone={getPaymentTone(student.payment)}>
                        {student.payment.charAt(0).toUpperCase() + student.payment.slice(1)}
                      </StatusBadge>
                    </td>
                    <td className="py-3 px-3">
                      <StatusBadge tone={getStatusTone(student.status)}>
                        {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                      </StatusBadge>
                    </td>
                    <td className="py-3 px-3 text-sm text-slate-600">{student.joinedDate}</td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-1">
                        <Link 
                          to={`/dashboard/coaching/student/${student.slug}/dashboard`}
                          target="_blank"
                          className="p-2 rounded hover:bg-slate-100 transition-colors text-blue-600 hover:text-blue-700"
                          title="View Dashboard (New Tab)"
                        >
                          <AppIcon name="open_in_new" size={14} />
                        </Link>
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