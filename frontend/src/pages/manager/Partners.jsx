import { useState, useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import AppIcon from '../../components/common/AppIcon';
import Dropdown from '../../components/common/Dropdown';
import Pagination from '../../components/common/Pagination';
import { usePartnersList } from '../../hooks/api/usePartners';
import InitialsAvatar from '../../components/common/InitialsAvatar';
import ActionMenu from '../../components/common/ActionMenu';
import { DashboardSkeleton } from '../../components/common/Skeleton';
import {
  DashboardPage,
  MetricCard,
  MetricGrid,
  SectionCard,
} from '../../components/common/DashboardPrimitives';

const partnerStats = [
  { label: 'Total Partners', value: '127', change: '+8', helper: 'Active partners', tone: 'blue' },
  { label: 'Revenue Share', value: '₹24.3L', change: '+22%', helper: 'This month', tone: 'purple' },
  { label: 'New Leads', value: '43', change: '+12', helper: 'This week', tone: 'emerald' },
  { label: 'Contracts', value: '89', change: '5 expiring', helper: 'Active agreements', tone: 'amber' },
  { label: 'Satisfaction', value: '4.6', change: '+0.3', helper: 'Average rating', tone: 'green' },
  { label: 'Support', value: '15', change: '-3', helper: 'Open tickets', tone: 'rose' },
];

const partners = [
  {
    id: 1,
    name: 'Partner 1 - Tech Solutions',
    contact: 'David Kumar',
    email: 'david@techsolutions.com',
    phone: '+91 98765 43210',
    type: 'Technology',
    status: 'online',
    joinDate: '2023-01-15',
    revenue: '₹3.2L',
    rating: 4.8,
    lastActive: '2024-03-15',
    schools: 5,
    students: 1250
  },
  {
    id: 2,
    name: 'Partner 2 - Education First',
    contact: 'Sarah Williams',
    email: 'sarah@educationfirst.com',
    phone: '+91 98765 43211',
    type: 'Education',
    status: 'online',
    joinDate: '2023-03-22',
    revenue: '₹2.8L',
    rating: 4.5,
    lastActive: '2024-03-14',
    schools: 3,
    students: 820
  },
  {
    id: 3,
    name: 'Partner 3 - Global Education Hub',
    contact: 'Michael Chen',
    email: 'michael@gehub.com',
    phone: '+91 98765 43212',
    type: 'Strategic Partner',
    status: 'online',
    joinDate: '2024-01-05',
    revenue: '₹1.5L',
    rating: 4.2,
    lastActive: '2024-03-10',
    schools: 2,
    students: 450
  },
  {
    id: 4,
    name: 'Partner 4 - Apex Learning',
    contact: 'John Smith',
    email: 'john@apexlearning.com',
    phone: '+91 98765 43213',
    type: 'Education',
    status: 'offline',
    joinDate: '2023-08-12',
    revenue: '₹1.2L',
    rating: 4.0,
    lastActive: '2024-03-08',
    schools: 2,
    students: 380
  },
  {
    id: 5,
    name: 'Partner 5 - Smart Classes',
    contact: 'Emily Davis',
    email: 'emily@smartclasses.com',
    phone: '+91 98765 43214',
    type: 'Education',
    status: 'online',
    joinDate: '2024-02-20',
    revenue: '₹85K',
    rating: 4.7,
    lastActive: '2024-03-14',
    schools: 1,
    students: 180
  },
];

export default function Partners() {
  const { data: partnersData, isLoading } = usePartnersList();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredPartners = useMemo(() => {
    if (!partnersData) return [];
    return partnersData.filter(partner => {
      const matchesSearch = partner.company_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           partner.owner?.email?.toLowerCase().includes(searchTerm.toLowerCase());
      const status = partner.is_verified ? 'verified' : 'unverified';
      const matchesStatus = statusFilter === 'all' || status === statusFilter;
      // Ignoring type for now since we don't have it on backend
      
      return matchesSearch && matchesStatus;
    });
  }, [partnersData, searchTerm, statusFilter, typeFilter]);

  const paginatedPartners = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredPartners.slice(startIndex, endIndex);
  }, [filteredPartners, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredPartners.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'verified', label: 'Verified' },
    { value: 'unverified', label: 'Unverified' },
  ];

  const typeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'Technology', label: 'Technology' },
    { value: 'Education', label: 'Education' },
    { value: 'Finance', label: 'Finance' },
    { value: 'Consulting', label: 'Consulting' },
  ];

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <DashboardPage
      eyebrow="Partner Management"
      title="Partners Overview"
      actions={
        <>
          <button type="button" className="px-5 py-2.5 bg-primary text-white rounded-xl text-xs font-bold hover:shadow-lg hover:shadow-primary/20 transition-all flex items-center gap-2">
            <AppIcon name="add" size={16} />
            Add Partner
          </button>
          <button type="button" className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-on-surface hover:bg-slate-50 transition-all flex items-center gap-2 shadow-sm">
            <AppIcon name="download" size={16} className="text-primary" />
            Export Data
          </button>
        </>
      }
    >
      <MetricGrid>
        {partnerStats.map((stat, index) => {
          const icons = {
            'Total Partners': 'group',
            'Revenue Share': 'payments',
            'New Leads': 'trending_up',
            'Contracts': 'description',
            'Satisfaction': 'star',
            'Support': 'support'
          };
          return (
            <MetricCard
              key={index}
              icon={icons[stat.label] || 'group'}
              label={stat.label}
              value={stat.value}
              change={stat.change}
              helper={stat.helper}
              tone={stat.tone}
            />
          );
        })}
      </MetricGrid>

      <SectionCard title="Quick Access" description="Click on a partner to access their dashboard">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {partnersData?.slice(0, 5).map((partner) => (
            <NavLink
              key={partner.id}
              to={`/dashboard/partner/overview?partner=${partner.id}`}
              className="p-4 rounded-xl border border-slate-200 hover:border-primary hover:shadow-lg transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                {partner.logo ? (
                  <img src={partner.logo} alt={partner.company_name} className="w-full h-full object-cover rounded-xl" />
                ) : (
                  <AppIcon name="handshake" size={24} className="text-primary" />
                )}
              </div>
              <h3 className="font-semibold text-sm text-slate-900 mb-1 truncate">{partner.company_name}</h3>
              <div className="flex items-center gap-3 text-xs text-slate-500 mb-2">
                <span className="flex items-center gap-1">
                  <AppIcon name="school" size={12} />
                  -- schools
                </span>
                <span className="flex items-center gap-1">
                  <AppIcon name="group" size={12} />
                  --
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-medium ${
                  partner.is_verified ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                }`}>
                  <div className={`w-1.5 h-1.5 rounded-full ${
                    partner.is_verified ? 'bg-emerald-500' : 'bg-amber-500'
                  }`} />
                  {partner.is_verified ? 'Verified' : 'Unverified'}
                </span>
                <span className="text-xs text-primary font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  Open <AppIcon name="arrow_forward" size={12} />
                </span>
              </div>
            </NavLink>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="All Partners" description="Complete list of business partners with their details">
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <AppIcon name="search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search partners..."
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
              value={typeFilter}
              onChange={setTypeFilter}
              options={typeOptions}
              className="min-w-35"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-2 px-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">Partner</th>
                <th className="text-left py-2 px-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">Plan</th>
                <th className="text-left py-2 px-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">Students</th>
                <th className="text-left py-2 px-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">Revenue</th>
                <th className="text-left py-2 px-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">Status</th>
                <th className="text-left py-2 px-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">Contact</th>
                <th className="text-left py-2 pl-7 pr-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredPartners.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-8 text-center text-slate-500">
                    No partners found matching your criteria.
                  </td>
                </tr>
              ) : (
                paginatedPartners.map((partner) => (
                  <tr key={partner.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-3">
                        {partner.logo ? (
                          <img src={partner.logo} alt={partner.company_name} className="w-10 h-10 object-cover rounded-xl" />
                        ) : (
                          <InitialsAvatar name={partner.company_name} size={40} />
                        )}
                        <div>
                          <p className="font-semibold text-sm text-slate-900">{partner.company_name}</p>
                          <p className="text-xs text-slate-500 truncate max-w-[200px]">{partner.website || 'No website'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <div className="inline-flex items-center gap-1.5 rounded bg-blue-50 text-blue-700 px-2 py-1 text-xs font-medium">
                        <AppIcon name="diamond" size={14} />
                        {partner.tier}
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-1.5">
                        <AppIcon name="group" size={14} className="text-purple-500" />
                        <p className="font-medium text-sm text-slate-900">--</p>
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <p className="font-semibold text-sm text-slate-900">--</p>
                    </td>
                    <td className="py-3 px-3">
                      <div className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium ${
                        partner.is_verified ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        <div className={`w-2 h-2 rounded-full ${
                          partner.is_verified ? 'bg-emerald-500' : 'bg-amber-500'
                        }`} />
                        <span className="capitalize">{partner.is_verified ? 'Verified' : 'Unverified'}</span>
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <div>
                        <p className="font-medium text-sm text-slate-900">{partner.owner?.full_name || 'N/A'}</p>
                        <p className="text-xs text-slate-500 truncate max-w-[150px]">{partner.owner?.email || 'N/A'}</p>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <ActionMenu
                        actions={[
                          { label: 'View Dashboard', icon: 'dashboard', onClick: () => {} },
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
        
        {filteredPartners.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            itemsPerPage={itemsPerPage}
            totalItems={filteredPartners.length}
            className="mt-4"
          />
        )}
      </SectionCard>
    </DashboardPage>
  );
}
