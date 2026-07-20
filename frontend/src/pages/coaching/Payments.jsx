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

const paymentStats = [
  { icon: 'payments', label: 'Total Revenue', value: '₹4.2L', change: '+₹0.8L', helper: 'This month', tone: 'emerald' },
  { icon: 'trending_up', label: 'This Month', value: '₹1.2L', change: '+₹0.3L', helper: 'Collections', tone: 'blue' },
  { icon: 'pending', label: 'Pending', value: '₹45K', change: '-₹12K', helper: 'Due', tone: 'amber' },
  { icon: 'error', label: 'Failed', value: '₹12K', change: '-₹5K', helper: 'Bounced', tone: 'rose' },
  { icon: 'receipt', label: 'Transactions', value: '156', change: '+24', helper: 'This month', tone: 'purple' },
  { icon: 'group', label: 'Paid Students', value: '1,156', change: '+89', helper: '90%', tone: 'green' },
];

const payments = [
  { id: 1, invoiceNo: 'INV-2024-001', studentName: 'Aarav Sharma', course: 'NEET Foundation', amount: 25000, paid: 25000, mode: 'Online', status: 'paid', date: '2024-01-25' },
  { id: 2, invoiceNo: 'INV-2024-002', studentName: 'Priya Singh', course: 'JEE Advanced', amount: 35000, paid: 35000, mode: 'UPI', status: 'paid', date: '2024-01-24' },
  { id: 3, invoiceNo: 'INV-2024-003', studentName: 'Rahul Verma', course: 'Coding Bootcamp', amount: 15000, paid: 0, mode: '-', status: 'pending', date: '2024-01-23' },
  { id: 4, invoiceNo: 'INV-2024-004', studentName: 'Sneha Gupta', course: 'NEET Foundation', amount: 25000, paid: 25000, mode: 'Bank Transfer', status: 'paid', date: '2024-01-22' },
  { id: 5, invoiceNo: 'INV-2024-005', studentName: 'Kunal Patel', course: 'JEE Mains', amount: 20000, paid: 20000, mode: 'Cash', status: 'paid', date: '2024-01-21' },
  { id: 6, invoiceNo: 'INV-2024-006', studentName: 'Ananya Reddy', course: 'NEET Foundation', amount: 25000, paid: 0, mode: '-', status: 'failed', date: '2024-01-20' },
];

export default function Payments() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredPayments = useMemo(() => {
    return payments.filter(payment => {
      const matchesSearch = payment.studentName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        payment.invoiceNo.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || payment.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter]);

  const paginatedPayments = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredPayments.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredPayments, currentPage]);

  const statusOptions = [
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
      eyebrow="Finance"
      title="Payments"
      actions={
        <>
          <button className="px-5 py-2.5 bg-primary text-white rounded-xl text-xs font-bold hover:shadow-lg hover:shadow-primary/20 transition-all flex items-center gap-2">
            <AppIcon name="add" size={16} />
            Create Invoice
          </button>
          <button className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all flex items-center gap-2 shadow-sm">
            <AppIcon name="download" size={16} />
            Export
          </button>
        </>
      }
    >
      <MetricGrid>
        {paymentStats.map((stat, index) => (
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

      <SectionCard title="Payment History" description="All payment transactions">
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <AppIcon name="search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search payments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            <Dropdown value={statusFilter} onChange={setStatusFilter} options={statusOptions} className="min-w-[130px]" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Invoice</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Student</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Course</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Amount</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Paid</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Mode</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Date</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Status</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginatedPayments.length === 0 ? (
                <tr>
                  <td colSpan="9" className="py-8 text-center text-slate-500">
                    No payments found.
                  </td>
                </tr>
              ) : (
                paginatedPayments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-3 text-sm font-medium text-slate-600">{payment.invoiceNo}</td>
                    <td className="py-3 px-3">
                      <p className="font-semibold text-sm text-slate-900">{payment.studentName}</p>
                    </td>
                    <td className="py-3 px-3 text-sm text-slate-700">{payment.course}</td>
                    <td className="py-3 px-3 text-sm font-medium text-slate-900">{formatCurrency(payment.amount)}</td>
                    <td className="py-3 px-3 text-sm text-slate-600">{formatCurrency(payment.paid)}</td>
                    <td className="py-3 px-3 text-sm text-slate-600">{payment.mode}</td>
                    <td className="py-3 px-3 text-sm text-slate-600">{payment.date}</td>
                    <td className="py-3 px-3">
                      <StatusBadge tone={getStatusTone(payment.status)}>
                        {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                      </StatusBadge>
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-1">
                        <button className="p-2 rounded hover:bg-slate-100 transition-colors"><AppIcon name="visibility" size={14} className="text-slate-600" /></button>
                        <button className="p-2 rounded hover:bg-slate-100 transition-colors"><AppIcon name="receipt" size={14} className="text-slate-600" /></button>
                        <button className="p-2 rounded hover:bg-slate-100 transition-colors"><AppIcon name="more_vert" size={14} className="text-slate-600" /></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {filteredPayments.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(filteredPayments.length / itemsPerPage)}
            onPageChange={setCurrentPage}
            itemsPerPage={itemsPerPage}
            totalItems={filteredPayments.length}
            className="mt-4"
          />
        )}
      </SectionCard>
    </DashboardPage>
  );
}