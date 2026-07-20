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
import { useApplications } from '../../hooks/api/useOperations';
import { useAuth } from '../../hooks/api/useAuth';

export default function Applications() {
  const { authState } = useAuth();
  const institutionId = authState?.roleInfo?.institution_id;
  
  const { data: appsData = [], isLoading } = useApplications(institutionId);

  const [searchTerm, setSearchTerm] = useState('');
  const [positionFilter, setPositionFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sourceFilter, setSourceFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const applications = useMemo(() => {
    return appsData.map(app => ({
      id: app.id,
      name: `${app.applicant?.user?.first_name} ${app.applicant?.user?.last_name}`.trim() || app.applicant?.user?.email,
      email: app.applicant?.user?.email,
      phone: app.applicant?.user?.phone_number || '-',
      position: 'Student', // Assuming these are student applications, or it could be teacher. We'll use 'Student' as default if not specified
      qualification: '-',
      experience: '-',
      appliedDate: new Date(app.created_at).toISOString().split('T')[0],
      status: app.status.toLowerCase(),
      source: 'Website', // Mock source
    }));
  }, [appsData]);

  const filteredApplications = useMemo(() => {
    return applications.filter(app => {
      const matchesSearch = app.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.position.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPosition = positionFilter === 'all' || app.position === positionFilter;
      const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
      const matchesSource = sourceFilter === 'all' || app.source === sourceFilter;
      return matchesSearch && matchesPosition && matchesStatus && matchesSource;
    });
  }, [applications, searchTerm, positionFilter, statusFilter, sourceFilter]);

  const paginatedApplications = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredApplications.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredApplications, currentPage, itemsPerPage]);

  const positionOptions = [
    { value: 'all', label: 'All Positions' },
    { value: 'Student', label: 'Student' },
    { value: 'Teacher', label: 'Teacher' },
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'pending', label: 'Pending' },
    { value: 'approved', label: 'Approved' },
    { value: 'rejected', label: 'Rejected' },
  ];

  const sourceOptions = [
    { value: 'all', label: 'All Sources' },
    { value: 'Website', label: 'Website' },
    { value: 'Referral', label: 'Referral' },
  ];

  const getStatusTone = (status) => {
    switch(status) {
      case 'pending': return 'amber';
      case 'approved': return 'emerald';
      case 'rejected': return 'rose';
      default: return 'slate';
    }
  };

  const applicationStats = [
    { icon: 'work', label: 'Total Applications', value: applications.length.toString(), change: '+0', helper: 'This month', tone: 'blue' },
    { icon: 'people', label: 'New Received', value: applications.filter(a => a.status === 'pending').length.toString(), change: '+0', helper: 'Pending review', tone: 'amber' },
    { icon: 'check_circle', label: 'Approved', value: applications.filter(a => a.status === 'approved').length.toString(), change: '+0', helper: 'Selected', tone: 'emerald' },
    { icon: 'cancel', label: 'Rejected', value: applications.filter(a => a.status === 'rejected').length.toString(), change: '+0', helper: 'Not selected', tone: 'rose' },
  ];

  return (
    <DashboardPage
      eyebrow="HR"
      title="Applications"
      actions={
        <>
          <button className="px-5 py-2.5 bg-primary text-white rounded-xl text-xs font-bold hover:shadow-lg hover:shadow-primary/20 transition-all flex items-center gap-2">
            <AppIcon name="add" size={16} />
            New Application
          </button>
          <button className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all flex items-center gap-2 shadow-sm">
            <AppIcon name="upload" size={16} />
            Import
          </button>
        </>
      }
    >
      <MetricGrid>
        {applicationStats.map((stat, index) => (
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

      <SectionCard title="Applications" description="Job and student applications">
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <AppIcon name="search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search applicants..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            <Dropdown value={positionFilter} onChange={setPositionFilter} options={positionOptions} className="min-w-[160px]" />
            <Dropdown value={statusFilter} onChange={setStatusFilter} options={statusOptions} className="min-w-[130px]" />
            <Dropdown value={sourceFilter} onChange={setSourceFilter} options={sourceOptions} className="min-w-[130px]" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Applicant</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Position</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Qualification</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Experience</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Applied</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Source</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Status</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr>
                  <td colSpan="8" className="py-8 text-center text-slate-500">
                    Loading applications...
                  </td>
                </tr>
              ) : paginatedApplications.length === 0 ? (
                <tr>
                  <td colSpan="8" className="py-8 text-center text-slate-500">
                    No applications found.
                  </td>
                </tr>
              ) : (
                paginatedApplications.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-3">
                      <p className="font-semibold text-sm text-slate-900">{app.name}</p>
                      <p className="text-xs text-slate-500">{app.email}</p>
                    </td>
                    <td className="py-3 px-3 text-sm text-slate-700">{app.position}</td>
                    <td className="py-3 px-3 text-sm text-slate-600">{app.qualification}</td>
                    <td className="py-3 px-3 text-sm text-slate-600">{app.experience}</td>
                    <td className="py-3 px-3 text-sm text-slate-600">{app.appliedDate}</td>
                    <td className="py-3 px-3 text-sm text-slate-600">{app.source}</td>
                    <td className="py-3 px-3">
                      <StatusBadge tone={getStatusTone(app.status)}>
                        {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                      </StatusBadge>
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-1">
                        <button className="p-2 rounded hover:bg-slate-100 transition-colors" title="View Profile"><AppIcon name="visibility" size={14} className="text-slate-600" /></button>
                        {app.status === 'pending' && (
                          <>
                            <button className="p-2 rounded hover:bg-emerald-100 transition-colors" title="Approve"><AppIcon name="check_circle" size={14} className="text-emerald-600" /></button>
                            <button className="p-2 rounded hover:bg-rose-100 transition-colors" title="Reject"><AppIcon name="cancel" size={14} className="text-rose-600" /></button>
                          </>
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

        {filteredApplications.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(filteredApplications.length / itemsPerPage)}
            onPageChange={setCurrentPage}
            itemsPerPage={itemsPerPage}
            totalItems={filteredApplications.length}
            className="mt-4"
          />
        )}
      </SectionCard>
    </DashboardPage>
  );
}