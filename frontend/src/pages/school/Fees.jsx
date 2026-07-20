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
import { useFeePayments } from '../../hooks/api/useOperations';
import { useAuth } from '../../hooks/api/useAuth';

export default function Fees() {
  const { authState } = useAuth();
  const institutionId = authState?.roleInfo?.institution_id;
  
  const { data: feePaymentsData = [], isLoading } = useFeePayments(institutionId);

  const [searchTerm, setSearchTerm] = useState('');
  const [classFilter, setClassFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [feeTypeFilter, setFeeTypeFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fees = useMemo(() => {
    return feePaymentsData.map(fp => ({
      id: fp.id,
      invoiceNo: fp.invoice_number || `INV-${fp.id}`,
      studentName: `${fp.membership?.user?.first_name} ${fp.membership?.user?.last_name}`.trim() || fp.membership?.user?.email,
      class: 'Class 10-A', // Ideally from membership -> enrollments
      father: '-',
      feeType: fp.fee_structure?.name || 'Tuition Fee',
      amount: parseFloat(fp.amount_due) || 0,
      paid: parseFloat(fp.amount_paid) || 0,
      dueDate: new Date(fp.due_date).toISOString().split('T')[0],
      paidDate: fp.paid_date ? new Date(fp.paid_date).toISOString().split('T')[0] : '-',
      status: fp.status.toLowerCase(),
      paymentMode: fp.payment_mode || '-',
    }));
  }, [feePaymentsData]);

  const filteredFees = useMemo(() => {
    return fees.filter(fee => {
      const matchesSearch = fee.studentName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         fee.invoiceNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         fee.father.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesClass = classFilter === 'all' || fee.class === classFilter;
      const matchesStatus = statusFilter === 'all' || fee.status === statusFilter;
      const matchesFeeType = feeTypeFilter === 'all' || fee.feeType === feeTypeFilter;
      return matchesSearch && matchesClass && matchesStatus && matchesFeeType;
    });
  }, [fees, searchTerm, classFilter, statusFilter, feeTypeFilter]);

  const paginatedFees = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredFees.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredFees, currentPage, itemsPerPage]);

  const classOptions = [
    { value: 'all', label: 'All Classes' },
    { value: 'Class 10-A', label: 'Class 10-A' },
    { value: 'Class 10-B', label: 'Class 10-B' },
    { value: 'Class 9-A', label: 'Class 9-A' },
    { value: 'Class 9-B', label: 'Class 9-B' },
    { value: 'Class 11-A', label: 'Class 11-A' },
    { value: 'Class 12-A', label: 'Class 12-A' },
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'paid', label: 'Paid' },
    { value: 'pending', label: 'Pending' },
    { value: 'overdue', label: 'Overdue' },
  ];

  const feeTypeOptions = [
    { value: 'all', label: 'All Fee Types' },
    { value: 'Tuition Fee', label: 'Tuition Fee' },
    { value: 'Transport Fee', label: 'Transport Fee' },
    { value: 'Annual Fee', label: 'Annual Fee' },
  ];

  const getStatusTone = (status) => {
    switch(status) {
      case 'paid': return 'emerald';
      case 'pending': return 'amber';
      case 'overdue': return 'rose';
      default: return 'slate';
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
  };

  const totalCollected = fees.reduce((sum, f) => sum + f.paid, 0);
  const totalOutstanding = fees.reduce((sum, f) => sum + Math.max(0, f.amount - f.paid), 0);

  const feeStats = [
    { icon: 'payments', label: 'Total Fee Collected', value: formatCurrency(totalCollected), change: '+₹0', helper: 'This month', tone: 'emerald' },
    { icon: 'receipt_long', label: 'Total Outstanding', value: formatCurrency(totalOutstanding), change: '-₹0', helper: 'Pending', tone: 'rose' },
    { icon: 'group', label: 'Students Paid', value: fees.filter(f => f.status === 'paid').length.toString(), change: '+0', helper: 'Paid', tone: 'blue' },
    { icon: 'warning', label: 'Overdue', value: fees.filter(f => f.status === 'overdue').length.toString(), change: '-0', helper: 'Cases', tone: 'amber' },
  ];

  return (
    <DashboardPage
      eyebrow="Finance"
      title="Fee Management"
      actions={
        <>
          <button className="px-5 py-2.5 bg-primary text-white rounded-xl text-xs font-bold hover:shadow-lg hover:shadow-primary/20 transition-all flex items-center gap-2">
            <AppIcon name="add" size={16} />
            Create Invoice
          </button>
          <button className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all flex items-center gap-2 shadow-sm">
            <AppIcon name="download" size={16} />
            Export Report
          </button>
        </>
      }
    >
      <MetricGrid>
        {feeStats.map((stat, index) => (
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

      <SectionCard title="Fee Records" description="Student fee payments and outstanding balances">
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <AppIcon name="search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search by student, invoice..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            <Dropdown value={classFilter} onChange={setClassFilter} options={classOptions} className="min-w-[140px]" />
            <Dropdown value={statusFilter} onChange={setStatusFilter} options={statusOptions} className="min-w-[130px]" />
            <Dropdown value={feeTypeFilter} onChange={setFeeTypeFilter} options={feeTypeOptions} className="min-w-[140px]" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Invoice</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Student</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Class</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Fee Type</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Amount</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Paid</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Due Date</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Status</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr>
                  <td colSpan="9" className="py-8 text-center text-slate-500">
                    Loading fee payments...
                  </td>
                </tr>
              ) : paginatedFees.length === 0 ? (
                <tr>
                  <td colSpan="9" className="py-8 text-center text-slate-500">
                    No fees found.
                  </td>
                </tr>
              ) : (
                paginatedFees.map((fee) => (
                  <tr key={fee.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-3 text-sm font-medium text-slate-600">{fee.invoiceNo}</td>
                    <td className="py-3 px-3">
                      <p className="font-semibold text-sm text-slate-900">{fee.studentName}</p>
                      <p className="text-xs text-slate-500">{fee.father}</p>
                    </td>
                    <td className="py-3 px-3 text-sm text-slate-700">{fee.class}</td>
                    <td className="py-3 px-3 text-sm text-slate-600">{fee.feeType}</td>
                    <td className="py-3 px-3 text-sm font-medium text-slate-900">{formatCurrency(fee.amount)}</td>
                    <td className="py-3 px-3 text-sm text-slate-600">{formatCurrency(fee.paid)}</td>
                    <td className="py-3 px-3 text-sm text-slate-600">{fee.dueDate}</td>
                    <td className="py-3 px-3">
                      <StatusBadge tone={getStatusTone(fee.status)}>
                        {fee.status.charAt(0).toUpperCase() + fee.status.slice(1)}
                      </StatusBadge>
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-1">
                        <button className="p-2 rounded hover:bg-slate-100 transition-colors" title="View"><AppIcon name="visibility" size={14} className="text-slate-600" /></button>
                        <button className="p-2 rounded hover:bg-slate-100 transition-colors" title="Edit"><AppIcon name="edit" size={14} className="text-slate-600" /></button>
                        {fee.status !== 'paid' && (
                          <button className="p-2 rounded hover:bg-emerald-100 transition-colors" title="Record Payment"><AppIcon name="payments" size={14} className="text-emerald-600" /></button>
                        )}
                        <button className="p-2 rounded hover:bg-slate-100 transition-colors"><AppIcon name="more_vert" size={14} className="text-slate-600" /></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {filteredFees.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(filteredFees.length / itemsPerPage)}
            onPageChange={setCurrentPage}
            itemsPerPage={itemsPerPage}
            totalItems={filteredFees.length}
            className="mt-4"
          />
        )}
      </SectionCard>
    </DashboardPage>
  );
}