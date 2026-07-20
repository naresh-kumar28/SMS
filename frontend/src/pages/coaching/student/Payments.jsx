import {
  DashboardPage,
  SectionCard,
  StatusBadge,
  MetricCard,
  MetricGrid,
} from '../../../components/common/DashboardPrimitives';

const fees = [
  { id: 1, title: 'Course Fee', amount: 25000, paid: 25000, dueDate: '2024-01-15', status: 'paid' },
  { id: 2, title: 'Exam Fee', amount: 2000, paid: 2000, dueDate: '2024-01-20', status: 'paid' },
];

export default function CoachingStudentPayments() {
  const total = fees.reduce((sum, f) => sum + f.amount, 0);
  const paid = fees.reduce((sum, f) => sum + f.paid, 0);

  return (
    <DashboardPage
      eyebrow="Finance"
      title="Payments"
      description="View your payment history"
    >
      <MetricGrid>
        <MetricCard icon="account_balance_wallet" label="Total Fee" value={`₹${total.toLocaleString()}`} change="Annual" helper="This year" />
        <MetricCard icon="check_circle" label="Paid" value={`₹${paid.toLocaleString()}`} change="Paid" helper="This year" tone="emerald" />
        <MetricCard icon="schedule" label="Pending" value="₹0" change="None" helper="All clear" tone="emerald" />
      </MetricGrid>

      <SectionCard title="Payment History" description="">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-4 font-semibold text-slate-700">Particulars</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-700">Amount</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-700">Due Date</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {fees.map(fee => (
                <tr key={fee.id} className="border-b border-slate-100">
                  <td className="py-3 px-4 font-medium text-slate-900">{fee.title}</td>
                  <td className="py-3 px-4 text-slate-600">₹{fee.amount.toLocaleString()}</td>
                  <td className="py-3 px-4 text-slate-600">{fee.dueDate}</td>
                  <td className="py-3 px-4">
                    <StatusBadge tone="emerald">{fee.status}</StatusBadge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </DashboardPage>
  );
}