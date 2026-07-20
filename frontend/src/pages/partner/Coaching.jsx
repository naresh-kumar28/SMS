import { useState, useMemo } from 'react';
import AppIcon from '../../components/common/AppIcon';
import Dropdown from '../../components/common/Dropdown';
import Pagination from '../../components/common/Pagination';
import {
  DashboardPage,
  MetricCard,
  MetricGrid,
  SectionCard,
} from '../../components/common/DashboardPrimitives';

import { useInstitutionsList } from '../../hooks/api/useInstitutions';

const coachingStats = [
  { label: 'Total Coaching', value: '3', change: '+1', helper: 'Active centers', tone: 'purple' },
  { label: 'Total Students', value: '415', change: '+45', helper: 'Enrolled', tone: 'emerald' },
  { label: 'Active Centers', value: '3', change: '0', helper: 'This month', tone: 'green' },
  { label: 'Monthly Revenue', value: '₹2.1L', change: '+15%', helper: 'From coaching', tone: 'amber' },
];

export default function PartnerCoaching() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { data: coachingData = [], isLoading } = useInstitutionsList({ type: 'COACHING' });

  const filteredCoaching = useMemo(() => {
    return coachingData.filter(center => {
      const name = center.name || '';
      const address = center.address || '';
      const matchesSearch = name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           address.toLowerCase().includes(searchTerm.toLowerCase());
                           
      const isApproved = center.is_approved ? 'active' : 'pending';
      const matchesStatus = statusFilter === 'all' || isApproved === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }, [coachingData, searchTerm, statusFilter]);

  const paginatedCoaching = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredCoaching.slice(startIndex, endIndex);
  }, [filteredCoaching, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredCoaching.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'pending', label: 'Pending' },
  ];

  return (
    <DashboardPage
      eyebrow="Partner Management"
      title="My Coaching Centers"
      actions={
        <>
          <button type="button" className="px-5 py-2.5 bg-primary text-white rounded-xl text-xs font-bold hover:shadow-lg hover:shadow-primary/20 transition-all flex items-center gap-2">
            <AppIcon name="add" size={16} />
            Add Coaching
          </button>
        </>
      }
    >
      <MetricGrid>
        {coachingStats.map((stat, index) => {
          const icons = {
            'Total Coaching': 'rocket_launch',
            'Total Students': 'group',
            'Active Centers': 'check_circle',
            'Monthly Revenue': 'payments',
          };
          return (
            <MetricCard
              key={index}
              icon={icons[stat.label] || 'analytics'}
              label={stat.label}
              value={stat.value}
              change={stat.change}
              helper={stat.helper}
              tone={stat.tone}
            />
          );
        })}
      </MetricGrid>

      <SectionCard title="My Coaching Centers" description="Coaching centers managed under your partnership">
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
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-2 px-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">Coaching Center</th>
                <th className="text-left py-2 px-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">Students</th>
                <th className="text-left py-2 px-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">Courses</th>
                <th className="text-left py-2 px-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">Revenue</th>
                <th className="text-left py-2 px-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">Joined</th>
                <th className="text-left py-2 px-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">Status</th>
                <th className="text-left py-2 pl-7 pr-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCoaching.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-8 text-center text-slate-500">
                    No coaching centers found.
                  </td>
                </tr>
              ) : (
                paginatedCoaching.map((center) => (
                  <tr key={center.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-3">
                      <div>
                        <p className="font-semibold text-sm text-slate-900">{center.name || 'Not Set'}</p>
                        <p className="text-xs text-slate-500">{center.address || 'Not Set'}</p>
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <p className="font-medium text-sm text-slate-900">{center.students || 0}</p>
                    </td>
                    <td className="py-3 px-3">
                      <p className="text-sm text-slate-600">{center.courses || 0}</p>
                    </td>
                    <td className="py-3 px-3">
                      <p className="font-semibold text-sm text-slate-900">{center.revenue || 'N/A'}</p>
                    </td>
                    <td className="py-3 px-3">
                      <p className="text-sm text-slate-600">
                        {center.created_at ? new Date(center.created_at).toLocaleDateString() : 'N/A'}
                      </p>
                    </td>
                    <td className="py-3 px-3">
                      <div className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium ${
                        center.is_approved ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        <div className={`w-2 h-2 rounded-full ${
                          center.is_approved ? 'bg-emerald-500' : 'bg-amber-500'
                        }`} />
                        <span className="capitalize">{center.is_approved ? 'active' : 'pending'}</span>
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-1">
                        <button className="p-2 rounded hover:bg-slate-100 transition-colors">
                          <AppIcon name="visibility" size={14} className="text-slate-600" />
                        </button>
                        <button className="p-2 rounded hover:bg-slate-100 transition-colors">
                          <AppIcon name="edit" size={14} className="text-slate-600" />
                        </button>
                        <button className="p-2 rounded hover:bg-slate-100 transition-colors">
                          <AppIcon name="more_vert" size={14} className="text-slate-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {filteredCoaching.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            itemsPerPage={itemsPerPage}
            totalItems={filteredCoaching.length}
            className="mt-4"
          />
        )}
      </SectionCard>
    </DashboardPage>
  );
}