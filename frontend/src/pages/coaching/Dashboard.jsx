import { useState, useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
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

const dashboardStats = [
  { icon: 'group', label: 'Total Students', value: '1,284', change: '+72', helper: 'This month', tone: 'blue' },
  { icon: 'school', label: 'Active Courses', value: '8', change: '+2', helper: 'Running', tone: 'emerald' },
  { icon: 'payments', label: 'Revenue', value: '₹4.2L', change: '+₹0.8L', helper: 'This month', tone: 'rose' },
  { icon: 'trending_up', label: 'Enrollments', value: '54', change: '+12', helper: 'New', tone: 'amber' },
  { icon: 'group', label: 'Teachers', value: '24', change: '+3', helper: 'Active', tone: 'purple' },
  { icon: 'star', label: 'Avg Rating', value: '4.5', change: '+0.2', helper: 'Reviews', tone: 'green' },
];

const recentEnrollments = [
  { id: 1, studentName: 'Aarav Sharma', course: 'NEET Foundation', batch: 'Morning', amount: 25000, status: 'paid', date: '2024-01-25' },
  { id: 2, studentName: 'Priya Singh', course: 'JEE Advanced', batch: 'Evening', amount: 35000, status: 'paid', date: '2024-01-24' },
  { id: 3, studentName: 'Rahul Verma', course: 'Coding Bootcamp', batch: 'Weekend', amount: 15000, status: 'pending', date: '2024-01-23' },
  { id: 4, studentName: 'Sneha Gupta', course: 'NEET Foundation', batch: 'Morning', amount: 25000, status: 'paid', date: '2024-01-22' },
  { id: 5, studentName: 'Kunal Patel', course: 'JEE Mains', batch: 'Evening', amount: 20000, status: 'failed', date: '2024-01-21' },
];

export default function CoachingDashboard() {
  const { coachingName } = useOutletContext();
  const [filter, setFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredEnrollments = useMemo(() => {
    return recentEnrollments.filter(e => filter === 'all' || e.status === filter);
  }, [filter]);

  const paginatedEnrollments = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredEnrollments.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredEnrollments, currentPage]);

  const filterOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'paid', label: 'Paid' },
    { value: 'pending', label: 'Pending' },
    { value: 'failed', label: 'Failed' },
  ];

  const getStatusTone = (status) => {
    switch(status) {
      case 'paid': return 'emerald';
      case 'pending': return 'amber';
      case 'failed': return 'rose';
      default: return 'slate';
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
  };

  return (
    <DashboardPage
      eyebrow="Coaching dashboard"
      title={coachingName || 'Overview'}
    >
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
        {dashboardStats.map((stat, index) => (
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
      </div>

      <SectionCard title="Recent Enrollments" description="Latest student enrollments and payments">
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="flex gap-2 flex-wrap">
            <Dropdown value={filter} onChange={setFilter} options={filterOptions} className="min-w-[130px]" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Student</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Course</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Batch</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Amount</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Date</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginatedEnrollments.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-slate-500">
                    No enrollments found.
                  </td>
                </tr>
              ) : (
                paginatedEnrollments.map((enrollment) => (
                  <tr key={enrollment.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-3">
                      <p className="font-semibold text-sm text-slate-900">{enrollment.studentName}</p>
                    </td>
                    <td className="py-3 px-3 text-sm text-slate-700">{enrollment.course}</td>
                    <td className="py-3 px-3 text-sm text-slate-600">{enrollment.batch}</td>
                    <td className="py-3 px-3 text-sm font-medium text-slate-900">{formatCurrency(enrollment.amount)}</td>
                    <td className="py-3 px-3 text-sm text-slate-600">{enrollment.date}</td>
                    <td className="py-3 px-3">
                      <StatusBadge tone={getStatusTone(enrollment.status)}>
                        {enrollment.status.charAt(0).toUpperCase() + enrollment.status.slice(1)}
                      </StatusBadge>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {filteredEnrollments.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(filteredEnrollments.length / itemsPerPage)}
            onPageChange={setCurrentPage}
            itemsPerPage={itemsPerPage}
            totalItems={filteredEnrollments.length}
            className="mt-4"
          />
        )}
      </SectionCard>
    </DashboardPage>
  );
}