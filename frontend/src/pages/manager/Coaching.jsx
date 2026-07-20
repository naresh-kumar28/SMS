import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import AppIcon from '../../components/common/AppIcon';
import Dropdown from '../../components/common/Dropdown';
import Pagination from '../../components/common/Pagination';
import { useInstitutionsList } from '../../hooks/api/useInstitutions';
import InitialsAvatar from '../../components/common/InitialsAvatar';
import ActionMenu from '../../components/common/ActionMenu';
import { DashboardSkeleton } from '../../components/common/Skeleton';
import {
  DashboardPage,
  MetricCard,
  MetricGrid,
  SectionCard,
} from '../../components/common/DashboardPrimitives';

const coachingStats = [
  { label: 'Active Centers', value: '39', change: '+3', helper: 'Operating', tone: 'blue' },
  { label: 'Total Students', value: '2.8K', change: '+156', helper: 'Enrolled', tone: 'emerald' },
  { label: 'Revenue', value: '₹4.2L', change: '+12%', helper: 'This month', tone: 'purple' },
  { label: 'Pending', value: '47', change: '12', helper: 'Payments', tone: 'amber' },
  { label: 'Active Batches', value: '124', change: '+8', helper: 'Running', tone: 'rose' },
  { label: 'Completion', value: '87%', change: '+3%', helper: 'Rate', tone: 'green' },
];

const coachingCenters = [
  {
    id: 1,
    name: 'Excel Academy',
    owner: 'Rajesh Kumar',
    email: 'rajesh@excelacademy.com',
    phone: '+91 98765 43210',
    address: '123 Main St, Delhi, 110001',
    students: 245,
    batches: 8,
    status: 'active',
    joinDate: '2023-01-15',
    subscription: 'Premium',
    lastPayment: '2024-03-01'
  },
  {
    id: 2,
    name: 'Bright Future Coaching',
    owner: 'Priya Sharma',
    email: 'priya@brightfuture.com',
    phone: '+91 98765 43211',
    address: '456 Park Ave, Mumbai, 400001',
    students: 189,
    batches: 6,
    status: 'active',
    joinDate: '2023-02-20',
    subscription: 'Enterprise',
    lastPayment: '2024-03-05'
  },
  {
    id: 3,
    name: 'Premier Institute',
    owner: 'Amit Patel',
    email: 'amit@premierinstitute.com',
    phone: '+91 98765 43212',
    address: '789 Cross Rd, Bangalore, 560001',
    students: 312,
    batches: 10,
    status: 'active',
    joinDate: '2023-03-10',
    subscription: 'Premium',
    lastPayment: '2024-02-28'
  },
  {
    id: 4,
    name: 'Success Point',
    owner: 'Neha Gupta',
    email: 'neha@successpoint.com',
    phone: '+91 98765 43213',
    address: '321 High St, Chennai, 600001',
    students: 156,
    batches: 5,
    status: 'pending',
    joinDate: '2024-01-05',
    subscription: 'Basic',
    lastPayment: '2024-01-05'
  },
  {
    id: 5,
    name: 'Target Achievers',
    owner: 'Vikram Singh',
    email: 'vikram@targetachievers.com',
    phone: '+91 98765 43214',
    address: '654 Market St, Kolkata, 700001',
    students: 278,
    batches: 9,
    status: 'active',
    joinDate: '2023-04-12',
    subscription: 'Premium',
    lastPayment: '2024-03-03'
  },
];

export default function Coaching() {
  const { data: coachingData, isLoading } = useInstitutionsList({ type: 'COACHING' });
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [subscriptionFilter, setSubscriptionFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredCenters = useMemo(() => {
    if (!coachingData) return [];
    return coachingData.filter(center => {
      const matchesSearch = center.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (center.email && center.email.toLowerCase().includes(searchTerm.toLowerCase()));
      const status = center.is_active ? 'active' : 'pending';
      const matchesStatus = statusFilter === 'all' || status === statusFilter;
      // Ignoring subscription filter for now as we don't have it on backend yet
      
      return matchesSearch && matchesStatus;
    });
  }, [coachingData, searchTerm, statusFilter, subscriptionFilter]);

  const paginatedCenters = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredCenters.slice(startIndex, endIndex);
  }, [filteredCenters, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredCenters.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'pending', label: 'Pending' },
  ];

  const subscriptionOptions = [
    { value: 'all', label: 'All Plans' },
    { value: 'Enterprise', label: 'Enterprise' },
    { value: 'Premium', label: 'Premium' },
    { value: 'Basic', label: 'Basic' },
  ];

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <DashboardPage
      eyebrow="Coaching Management"
      title="Coaching Centers"
      actions={
        <>
          <button type="button" className="px-5 text-nowrap py-2.5 bg-primary text-white rounded-xl text-xs font-bold hover:shadow-lg hover:shadow-primary/20 transition-all flex items-center gap-2">
            <AppIcon name="add" size={16} />
            Add Center
          </button>
          <button type="button" className="px-5 text-nowrap py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-on-surface hover:bg-slate-50 transition-all flex items-center gap-2 shadow-sm">
            <AppIcon name="download" size={16} className="text-primary" />
            Export Data
          </button>
        </>
      }
    >
      <MetricGrid>
        {coachingStats.map((stat, index) => {
          const icons = {
            'Active Centers': 'rocket_launch',
            'Total Students': 'group',
            'Revenue': 'payments',
            'Pending': 'pending',
            'Active Batches': 'event',
            'Completion': 'task_alt'
          };
          return (
            <MetricCard
              key={index}
              icon={icons[stat.label] || 'rocket_launch'}
              label={stat.label}
              value={stat.value}
              change={stat.change}
              helper={stat.helper}
              tone={stat.tone}
            />
          );
        })}
      </MetricGrid>

      <SectionCard title="All Coaching Centers" description="Complete list of registered coaching centers with their details">
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <AppIcon name="search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search coaching centers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Dropdown
              value={statusFilter}
              onChange={setStatusFilter}
              options={statusOptions}
              className="min-w-30"
            />
            <Dropdown
              value={subscriptionFilter}
              onChange={setSubscriptionFilter}
              options={subscriptionOptions}
              className="min-w-35"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-center py-2 px-3 text-xs font-semibold text-slate-600 uppercase tracking-wider w-12">#</th>
                <th className="text-left py-2 px-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">Center</th>
                <th className="text-left py-2 px-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">Owner & Contact</th>
                <th className="text-left py-2 px-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">Students</th>
                <th className="text-left py-2 px-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">Plan & Status</th>
                <th className="text-left py-2 pl-7 pr-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCenters.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-slate-500">
                    No coaching centers found matching your criteria.
                  </td>
                </tr>
              ) : (
                paginatedCenters.map((center, index) => (
                  <tr key={center.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-3 text-center text-sm text-slate-600">
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-3">
                        <InitialsAvatar name={center.name} size={36} />
                        <div>
                          <p className="font-semibold text-sm text-slate-900">{center.name}</p>
                          <p className="text-xs text-slate-500 truncate max-w-[200px]">{center.address || 'No address provided'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <div>
                        <p className="font-medium text-sm text-slate-900">{center.partner?.company_name || 'No Partner'}</p>
                        <p className="text-xs text-slate-500 truncate max-w-50">{center.email || 'N/A'}</p>
                        <p className="text-xs text-slate-900">{center.phone || 'N/A'}</p>
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <div>
                        <p className="font-semibold text-sm text-slate-900">--</p>
                        <p className="text-xs text-slate-500">-- batches</p>
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex flex-col gap-2">
                        <div className={`inline-flex items-center capitalize gap-1 rounded-md px-2 py-1 text-xs font-medium whitespace-nowrap ${
                          center.subscription === 'Enterprise' ? 'bg-purple-50 text-purple-700 border border-purple-200' :
                          center.subscription === 'Premium' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                          'bg-gray-50 text-gray-700 border border-gray-200'
                        }`}>
                          <AppIcon name={
                            center.subscription === 'Enterprise' ? 'star' :
                            center.subscription === 'Premium' ? 'diamond' :
                            'payments'
                          } size={10} />
                          {center.subscription}
                        </div>
                        <div className={`inline-flex items-center capitalize gap-1 rounded-md px-2 py-1 text-xs font-medium whitespace-nowrap ${
                          center.is_active ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                          'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}>
                          <AppIcon name={
                            center.is_active ? 'check_circle' : 'pending'
                          } size={10} />
                          {center.is_active ? 'Active' : 'Pending'}
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <ActionMenu
                        actions={[
                          { label: 'View Profile', icon: 'visibility', onClick: () => {} },
                          { label: 'Edit', icon: 'edit', onClick: () => {} },
                          { label: 'Deactivate', icon: 'block', onClick: () => {}, danger: true },
                        ]}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {filteredCenters.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            itemsPerPage={itemsPerPage}
            totalItems={filteredCenters.length}
            className="mt-4"
          />
        )}
      </SectionCard>
    </DashboardPage>
  );
}
