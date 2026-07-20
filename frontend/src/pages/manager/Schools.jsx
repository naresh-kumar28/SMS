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

const schoolStats = [
  { label: 'Total Schools', value: '84', change: '+6', helper: 'Active institutions', tone: 'blue' },
  { label: 'Total Students', value: '5.2K', change: '+234', helper: 'Enrolled students', tone: 'emerald' },
  { label: 'Revenue', value: '₹8.7L', change: '+15%', helper: 'This month', tone: 'purple' },
  { label: 'Pending', value: '12', change: '4', helper: 'Verifications', tone: 'amber' },
  { label: 'Active', value: '67', change: '+3', helper: 'Subscriptions', tone: 'green' },
  { label: 'Tickets', value: '23', change: '-2', helper: 'Support', tone: 'rose' },
];

const schools = [
  {
    id: 1,
    name: 'Lincoln High School',
    principal: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@lincolnhigh.edu',
    phone: '+91 98765 43210',
    address: '123 Education Blvd, Delhi, 110001',
    students: 1245,
    teachers: 67,
    status: 'active',
    joinDate: '2023-01-15',
    subscription: 'Premium',
    lastPayment: '2024-03-01'
  },
  {
    id: 2,
    name: 'St. Mary\'s Academy',
    principal: 'Rev. Michael Chen',
    email: 'michael.chen@stmarys.edu',
    phone: '+91 98765 43211',
    address: '456 Cathedral Rd, Mumbai, 400001',
    students: 892,
    teachers: 45,
    status: 'active',
    joinDate: '2023-02-20',
    subscription: 'Enterprise',
    lastPayment: '2024-03-05'
  },
  {
    id: 3,
    name: 'Riverside College',
    principal: 'Prof. Amit Patel',
    email: 'amit.patel@riverside.edu',
    phone: '+91 98765 43212',
    address: '789 River Bank, Bangalore, 560001',
    students: 1567,
    teachers: 89,
    status: 'pending',
    joinDate: '2024-01-05',
    subscription: 'Basic',
    lastPayment: '2024-01-05'
  },
  {
    id: 4,
    name: 'Oakwood Academy',
    principal: 'Ms. Priya Sharma',
    email: 'priya.sharma@oakwood.edu',
    phone: '+91 98765 43213',
    address: '321 Oak Street, Chennai, 600001',
    students: 734,
    teachers: 38,
    status: 'active',
    joinDate: '2023-03-10',
    subscription: 'Premium',
    lastPayment: '2024-02-28'
  },
  {
    id: 5,
    name: 'Bright Future School',
    principal: 'Dr. Rajesh Kumar',
    email: 'rajesh.kumar@brightfuture.edu',
    phone: '+91 98765 43214',
    address: '654 Sunshine Ave, Kolkata, 700001',
    students: 1102,
    teachers: 56,
    status: 'active',
    joinDate: '2023-04-12',
    subscription: 'Premium',
    lastPayment: '2024-03-03'
  },
];

export default function Schools() {
  const { data: schoolsData, isLoading } = useInstitutionsList({ type: 'SCHOOL' });
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [subscriptionFilter, setSubscriptionFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredSchools = useMemo(() => {
    if (!schoolsData) return [];
    return schoolsData.filter(school => {
      const matchesSearch = school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (school.email && school.email.toLowerCase().includes(searchTerm.toLowerCase()));
      const status = school.is_active ? 'active' : 'pending';
      const matchesStatus = statusFilter === 'all' || status === statusFilter;
      // We don't have subscription on backend yet, so ignoring subscriptionFilter for now
      
      return matchesSearch && matchesStatus;
    });
  }, [schoolsData, searchTerm, statusFilter, subscriptionFilter]);

  const paginatedSchools = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredSchools.slice(startIndex, endIndex);
  }, [filteredSchools, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredSchools.length / itemsPerPage);

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
      eyebrow="School Management"
      title="Schools Overview"
      actions={
        <>
          <button type="button" className="px-5 py-2.5 bg-primary text-white rounded-xl text-xs font-bold hover:shadow-lg hover:shadow-primary/20 transition-all flex items-center gap-2">
            <AppIcon name="add" size={16} />
            Add School
          </button>
          <button type="button" className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-on-surface hover:bg-slate-50 transition-all flex items-center gap-2 shadow-sm">
            <AppIcon name="download" size={16} className="text-primary" />
            Export Data
          </button>
        </>
      }
    >
      <MetricGrid>
        {schoolStats.map((stat, index) => {
          const icons = {
            'Total Schools': 'school',
            'Total Students': 'groups',
            'Revenue': 'payments',
            'Pending': 'pending',
            'Active': 'verified_user',
            'Tickets': 'support'
          };
          return (
            <MetricCard
              key={index}
              icon={icons[stat.label] || 'school'}
              label={stat.label}
              value={stat.value}
              change={stat.change}
              helper={stat.helper}
              tone={stat.tone}
            />
          );
        })}
      </MetricGrid>

      <SectionCard title="All Schools" description="Complete list of registered schools with their details">
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <AppIcon name="search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search schools..."
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
                <th className="text-left py-2 px-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">School</th>
                <th className="text-left py-2 px-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">Principal & Contact</th>
                <th className="text-left py-2 px-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">Students</th>
                <th className="text-left py-2 px-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">Plan & Status</th>
                <th className="text-left py-2 pl-7 pr-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredSchools.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-slate-500">
                    No schools found matching your criteria.
                  </td>
                </tr>
              ) : (
                paginatedSchools.map((school, index) => (
                  <tr key={school.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-3 text-center text-sm text-slate-600">
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-3">
                        <InitialsAvatar name={school.name} size={36} />
                        <div>
                          <p className="font-semibold text-sm text-slate-900">{school.name}</p>
                          <p className="text-xs text-slate-500 truncate max-w-[200px]">{school.address || 'No address provided'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <div>
                        <p className="font-medium text-sm text-slate-900">{school.partner?.company_name || 'No Partner'}</p>
                        <p className="text-xs text-slate-500 truncate max-w-50">{school.email || 'N/A'}</p>
                        <p className="text-xs text-slate-900">{school.phone || 'N/A'}</p>
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <div>
                        <p className="font-semibold text-sm text-slate-900">--</p>
                        <p className="text-xs text-slate-500">-- teachers</p>
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex flex-col gap-2">
                        <div className={`inline-flex items-center capitalize gap-1 rounded-md px-2 py-1 text-xs font-medium whitespace-nowrap ${
                          school.subscription === 'Enterprise' ? 'bg-purple-50 text-purple-700 border border-purple-200' :
                          school.subscription === 'Premium' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                          'bg-gray-50 text-gray-700 border border-gray-200'
                        }`}>
                          <AppIcon name={
                            school.subscription === 'Enterprise' ? 'star' :
                            school.subscription === 'Premium' ? 'diamond' :
                            'payments'
                          } size={10} />
                          {school.subscription}
                        </div>
                        <div className={`inline-flex items-center capitalize gap-1 rounded-md px-2 py-1 text-xs font-medium whitespace-nowrap ${
                          school.is_active ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                          'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}>
                          <AppIcon name={
                            school.is_active ? 'check_circle' : 'pending'
                          } size={10} />
                          {school.is_active ? 'Active' : 'Pending'}
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
        
        {filteredSchools.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            itemsPerPage={itemsPerPage}
            totalItems={filteredSchools.length}
            className="mt-4"
          />
        )}
      </SectionCard>
    </DashboardPage>
  );
}
