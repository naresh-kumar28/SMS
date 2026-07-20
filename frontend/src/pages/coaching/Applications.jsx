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

const applicationStats = [
  { icon: 'work', label: 'Total Applications', value: '156', change: '+24', helper: 'This month', tone: 'blue' },
  { icon: 'people', label: 'New Received', value: '28', change: '+8', helper: 'Pending review', tone: 'amber' },
  { icon: 'check_circle', label: 'Shortlisted', value: '42', change: '+5', helper: 'Selected', tone: 'emerald' },
  { icon: 'cancel', label: 'Rejected', value: '68', change: '+12', helper: 'Not selected', tone: 'rose' },
  { icon: 'pending', label: 'In Process', value: '18', change: '-2', helper: 'Interview', tone: 'purple' },
  { icon: 'verified', label: 'Hired', value: '12', change: '+3', helper: 'Offer accepted', tone: 'green' },
];

const applications = [
  { id: 1, name: 'Dr. Amit Kumar', email: 'amit.kumar@email.com', phone: '+91 98765 43210', position: 'Physics Teacher', qualification: 'M.Sc Physics, B.Ed', experience: '5 years', appliedDate: '2024-01-20', status: 'shortlisted', source: 'Website' },
  { id: 2, name: 'Ms. Priya Sharma', email: 'priya.sharma@email.com', phone: '+91 98765 43211', position: 'Chemistry Teacher', qualification: 'M.Sc Chemistry, B.Ed', experience: '3 years', appliedDate: '2024-01-19', status: 'new', source: 'Referral' },
  { id: 3, name: 'Mr. Rahul Verma', email: 'rahul.verma@email.com', phone: '+91 98765 43212', position: 'Mathematics Teacher', qualification: 'M.Sc Maths, B.Ed', experience: '7 years', appliedDate: '2024-01-18', status: 'interview', source: 'LinkedIn' },
  { id: 4, name: 'Ms. Sneha Gupta', email: 'sneha.gupta@email.com', phone: '+91 98765 43213', position: 'Computer Teacher', qualification: 'M.Tech CS, B.Ed', experience: '2 years', appliedDate: '2024-01-17', status: 'shortlisted', source: 'Website' },
  { id: 5, name: 'Mr. Kunal Patel', email: 'kunal.patel@email.com', phone: '+91 98765 43214', position: 'English Teacher', qualification: 'MA English, B.Ed', experience: '4 years', appliedDate: '2024-01-16', status: 'rejected', source: 'Job Portal' },
];

export default function CoachingApplications() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredApplications = useMemo(() => {
    return applications.filter(app => {
      const matchesSearch = app.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         app.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter]);

  const paginatedApplications = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredApplications.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredApplications, currentPage]);

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'new', label: 'New' },
    { value: 'shortlisted', label: 'Shortlisted' },
    { value: 'interview', label: 'Interview' },
    { value: 'rejected', label: 'Rejected' },
    { value: 'hired', label: 'Hired' },
  ];

  const getStatusTone = (status) => {
    switch(status) {
      case 'new': return 'blue';
      case 'shortlisted': return 'emerald';
      case 'interview': return 'amber';
      case 'rejected': return 'rose';
      case 'hired': return 'green';
      default: return 'slate';
    }
  };

  return (
    <DashboardPage
      eyebrow="HR"
      title="Applications"
      actions={
        <>
          <button className="px-5 py-2.5 bg-primary text-white rounded-xl text-xs font-bold hover:shadow-lg hover:shadow-primary/20 transition-all flex items-center gap-2">
            <AppIcon name="work" size={16} />
            Post Job
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

      <SectionCard title="Applications" description="Teacher job applications and hiring pipeline">
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
            <Dropdown value={statusFilter} onChange={setStatusFilter} options={statusOptions} className="min-w-[130px]" />
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
              {paginatedApplications.length === 0 ? (
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
                        <button className="p-2 rounded hover:bg-slate-100 transition-colors"><AppIcon name="visibility" size={14} className="text-slate-600" /></button>
                        {app.status === 'new' && (
                          <button className="p-2 rounded hover:bg-emerald-100 transition-colors"><AppIcon name="check_circle" size={14} className="text-emerald-600" /></button>
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