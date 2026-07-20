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
import { useNoticesList } from '../../hooks/api/useOperations';
import { useAuth } from '../../hooks/api/useAuth';

export default function Notices() {
  const { authState } = useAuth();
  const institutionId = authState?.roleInfo?.institution_id;
  
  const { data: noticesData = [], isLoading } = useNoticesList(institutionId);

  const [searchTerm, setSearchTerm] = useState('');
  const [audienceFilter, setAudienceFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const notices = useMemo(() => {
    return noticesData.map(notice => ({
      id: notice.id,
      title: notice.title,
      audience: notice.for_batch ? `Batch: ${notice.for_batch.name}` : 'All',
      postedBy: notice.published_by ? `${notice.published_by.user.first_name} ${notice.published_by.user.last_name}`.trim() || notice.published_by.user.email : 'System',
      date: new Date(notice.published_at).toISOString().split('T')[0],
      status: (notice.expires_at && new Date(notice.expires_at) < new Date()) ? 'expired' : 'published',
      priority: 'medium', // Priority not in Notice model
      views: 0, // Views not in Notice model
    }));
  }, [noticesData]);

  const filteredNotices = useMemo(() => {
    return notices.filter(notice => {
      const matchesSearch = notice.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           notice.postedBy.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesAudience = audienceFilter === 'all' || notice.audience === audienceFilter;
      const matchesStatus = statusFilter === 'all' || notice.status === statusFilter;
      const matchesPriority = priorityFilter === 'all' || notice.priority === priorityFilter;
      return matchesSearch && matchesAudience && matchesStatus && matchesPriority;
    });
  }, [notices, searchTerm, audienceFilter, statusFilter, priorityFilter]);

  const paginatedNotices = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredNotices.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredNotices, currentPage, itemsPerPage]);

  const audienceOptions = [
    { value: 'all', label: 'All Audience' },
    { value: 'All', label: 'All' },
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'published', label: 'Published' },
    { value: 'expired', label: 'Expired' },
  ];

  const priorityOptions = [
    { value: 'all', label: 'All Priority' },
    { value: 'high', label: 'High' },
    { value: 'medium', label: 'Medium' },
    { value: 'low', label: 'Low' },
  ];

  const getStatusTone = (status) => {
    switch(status) {
      case 'published': return 'emerald';
      case 'expired': return 'slate';
      default: return 'slate';
    }
  };

  const getPriorityTone = (priority) => {
    switch(priority) {
      case 'high': return 'rose';
      case 'medium': return 'amber';
      case 'low': return 'slate';
      default: return 'slate';
    }
  };

  const noticeStats = [
    { icon: 'campaign', label: 'Total Notices', value: notices.length.toString(), change: '+0', helper: 'This month', tone: 'blue' },
    { icon: 'publish', label: 'Published', value: notices.filter(n => n.status === 'published').length.toString(), change: '+0', helper: 'Active', tone: 'emerald' },
    { icon: 'schedule', label: 'Expired', value: notices.filter(n => n.status === 'expired').length.toString(), change: '0', helper: 'Past', tone: 'slate' },
  ];

  return (
    <DashboardPage
      eyebrow="Announcements"
      title="Notices & Announcements"
      actions={
        <>
          <button className="px-5 py-2.5 bg-primary text-white rounded-xl text-xs font-bold hover:shadow-lg hover:shadow-primary/20 transition-all flex items-center gap-2">
            <AppIcon name="add" size={16} />
            Create Notice
          </button>
          <button className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all flex items-center gap-2 shadow-sm">
            <AppIcon name="download" size={16} />
            Export
          </button>
        </>
      }
    >
      <MetricGrid>
        {noticeStats.map((stat, index) => (
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

      <SectionCard title="All Notices" description="School notices and announcements">
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <AppIcon name="search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search notices..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            <Dropdown value={audienceFilter} onChange={setAudienceFilter} options={audienceOptions} className="min-w-[140px]" />
            <Dropdown value={statusFilter} onChange={setStatusFilter} options={statusOptions} className="min-w-[130px]" />
            <Dropdown value={priorityFilter} onChange={setPriorityFilter} options={priorityOptions} className="min-w-[130px]" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Title</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Audience</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Posted By</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Date</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Priority</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Status</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Views</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr>
                  <td colSpan="8" className="py-8 text-center text-slate-500">
                    Loading notices...
                  </td>
                </tr>
              ) : paginatedNotices.length === 0 ? (
                <tr>
                  <td colSpan="8" className="py-8 text-center text-slate-500">
                    No notices found.
                  </td>
                </tr>
              ) : (
                paginatedNotices.map((notice) => (
                  <tr key={notice.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-3">
                      <p className="font-semibold text-sm text-slate-900">{notice.title}</p>
                    </td>
                    <td className="py-3 px-3 text-sm text-slate-700">{notice.audience}</td>
                    <td className="py-3 px-3 text-sm text-slate-600">{notice.postedBy}</td>
                    <td className="py-3 px-3 text-sm text-slate-600">{notice.date}</td>
                    <td className="py-3 px-3">
                      <StatusBadge tone={getPriorityTone(notice.priority)}>
                        {notice.priority.charAt(0).toUpperCase() + notice.priority.slice(1)}
                      </StatusBadge>
                    </td>
                    <td className="py-3 px-3">
                      <StatusBadge tone={getStatusTone(notice.status)}>
                        {notice.status.charAt(0).toUpperCase() + notice.status.slice(1)}
                      </StatusBadge>
                    </td>
                    <td className="py-3 px-3 text-sm text-slate-600">{notice.views.toLocaleString()}</td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-1">
                        <button className="p-2 rounded hover:bg-slate-100 transition-colors"><AppIcon name="visibility" size={14} className="text-slate-600" /></button>
                        <button className="p-2 rounded hover:bg-slate-100 transition-colors"><AppIcon name="edit" size={14} className="text-slate-600" /></button>
                        <button className="p-2 rounded hover:bg-slate-100 transition-colors"><AppIcon name="more_vert" size={14} className="text-slate-600" /></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {filteredNotices.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(filteredNotices.length / itemsPerPage)}
            onPageChange={setCurrentPage}
            itemsPerPage={itemsPerPage}
            totalItems={filteredNotices.length}
            className="mt-4"
          />
        )}
      </SectionCard>
    </DashboardPage>
  );
}