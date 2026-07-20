import {
  DashboardPage,
  SectionCard,
  StatusBadge,
  MetricCard,
  MetricGrid,
} from '../../../components/common/DashboardPrimitives';
import AppIcon from '../../../components/common/AppIcon';
import { useFeePayments } from '../../../hooks/api/useOperations';
import { useAuth } from '../../../hooks/api/useAuth';

export default function StudentFees() {
  const { authState } = useAuth();
  const institutionId = authState?.roleInfo?.institution_id;
  const membershipId = authState?.roleInfo?.id;

  const { data: paymentsData = [], isLoading } = useFeePayments(institutionId, membershipId);

  const feeRecords = paymentsData.map(payment => ({
    id: payment.id,
    title: payment.fee_structure_name || 'General Fee',
    amount: parseFloat(payment.amount),
    paid: parseFloat(payment.amount), // The payments API returns actual payments, so paid = amount
    dueDate: new Date(payment.payment_date || payment.created_at).toISOString().split('T')[0],
    status: payment.status || 'paid',
    month: new Date(payment.payment_date || payment.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
    transactionId: payment.transaction_id || 'N/A'
  }));

  const totalFee = feeRecords.reduce((sum, f) => sum + f.amount, 0);
  const totalPaid = feeRecords.reduce((sum, f) => sum + f.paid, 0);
  const totalPending = totalFee > totalPaid ? totalFee - totalPaid : 0; // Simple logic, usually fees and payments are separate structures, but for now we'll display what we have

  return (
    <DashboardPage
      eyebrow="Finance"
      title="Fees"
      description="View and pay your school fees"
    >
      <MetricGrid>
        <MetricCard icon="account_balance_wallet" label="Total Paid" value={`₹${totalPaid.toLocaleString()}`} change="Total" helper="This academic year" />
        <MetricCard icon="check_circle" label="Payments" value={feeRecords.length} change="Transactions" helper="This year" tone="emerald" />
        <MetricCard icon="schedule" label="Pending" value={`₹${totalPending.toLocaleString()}`} change="Due" helper="Next payment" tone="amber" />
      </MetricGrid>

      <SectionCard title="Fee History" description="All your fee transactions">
        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="p-8 text-center text-slate-500">
              Loading fee records...
            </div>
          ) : feeRecords.length === 0 ? (
            <div className="p-8 text-center text-slate-500">
              No fee records found.
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">Month</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">Particulars</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">Amount Paid</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">Payment Date</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">Transaction ID</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {feeRecords.map(fee => (
                  <tr key={fee.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-3 px-4 text-slate-600">{fee.month}</td>
                    <td className="py-3 px-4 font-medium text-slate-900">{fee.title}</td>
                    <td className="py-3 px-4 text-slate-600">₹{fee.amount.toLocaleString()}</td>
                    <td className="py-3 px-4 text-slate-600">{fee.dueDate}</td>
                    <td className="py-3 px-4 text-slate-600">{fee.transactionId}</td>
                    <td className="py-3 px-4">
                      <StatusBadge tone={fee.status.toLowerCase() === 'paid' || fee.status.toLowerCase() === 'completed' ? 'emerald' : fee.status.toLowerCase() === 'failed' ? 'rose' : 'amber'}>
                        {fee.status.charAt(0).toUpperCase() + fee.status.slice(1).toLowerCase()}
                      </StatusBadge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </SectionCard>

      {totalPending > 0 && (
        <SectionCard title="Pay Now" description="Clear your pending fees" className="mt-6">
          <div className="flex items-center justify-between p-4 rounded-2xl bg-amber-50 border border-amber-200">
            <div>
              <p className="font-semibold text-slate-900">Pending Amount</p>
              <p className="text-2xl font-bold text-amber-700">₹{totalPending.toLocaleString()}</p>
            </div>
            <button className="px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-colors">
              Pay Now
            </button>
          </div>
        </SectionCard>
      )}
    </DashboardPage>
  );
}