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

const contentStats = [
  { icon: 'folder', label: 'Total Content', value: '245', change: '+32', helper: 'Items', tone: 'blue' },
  { icon: 'picture_as_pdf', label: 'PDF Notes', value: '156', change: '+18', helper: 'Documents', tone: 'rose' },
  { icon: 'play_circle', label: 'Videos', value: '89', change: '+14', helper: 'Lectures', tone: 'amber' },
  { icon: 'lock', label: 'Premium', value: '78', change: '+8', helper: 'Locked', tone: 'purple' },
  { icon: 'public', label: 'Free', value: '167', change: '+24', helper: 'Open', tone: 'emerald' },
  { icon: 'visibility', label: 'Views', value: '12.5K', change: '+2.1K', helper: 'Total', tone: 'slate' },
];

const contents = [
  { id: 1, title: 'Physics Ch-1: Mechanics', type: 'PDF', course: 'NEET Foundation', size: '2.5 MB', views: 1250, typeContent: 'paid', status: 'active', date: '2024-01-20' },
  { id: 2, title: 'Chemistry Ch-2: Organic', type: 'PDF', course: 'NEET Foundation', size: '1.8 MB', views: 980, typeContent: 'paid', status: 'active', date: '2024-01-18' },
  { id: 3, title: 'Math Lecture 1', type: 'Video', course: 'JEE Advanced', size: '450 MB', views: 856, typeContent: 'paid', status: 'active', date: '2024-01-15' },
  { id: 4, title: 'Biology Ch-1: Cell', type: 'PDF', course: 'NEET Foundation', size: '3.2 MB', views: 720, typeContent: 'free', status: 'active', date: '2024-01-12' },
  { id: 5, title: 'English Grammar', type: 'Video', course: 'General', size: '180 MB', views: 540, typeContent: 'free', status: 'active', date: '2024-01-10' },
  { id: 6, title: 'Physics Ch-2: Waves', type: 'PDF', course: 'JEE Mains', size: '2.1 MB', views: 420, typeContent: 'paid', status: 'active', date: '2024-01-08' },
];

export default function Content() {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [contentFilter, setContentFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredContent = useMemo(() => {
    return contents.filter(content => {
      const matchesSearch = content.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = typeFilter === 'all' || content.type === typeFilter;
      const matchesContent = contentFilter === 'all' || content.typeContent === contentFilter;
      return matchesSearch && matchesType && matchesContent;
    });
  }, [searchTerm, typeFilter, contentFilter]);

  const paginatedContent = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredContent.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredContent, currentPage]);

  const typeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'PDF', label: 'PDF' },
    { value: 'Video', label: 'Video' },
  ];

  const contentOptions = [
    { value: 'all', label: 'All Content' },
    { value: 'paid', label: 'Premium' },
    { value: 'free', label: 'Free' },
  ];

  const getContentTone = (typeContent) => {
    switch(typeContent) {
      case 'paid': return 'rose';
      case 'free': return 'emerald';
      default: return 'slate';
    }
  };

  return (
    <DashboardPage
      eyebrow="Content library"
      title="Content"
      actions={
        <>
          <button className="px-5 py-2.5 bg-primary text-white rounded-xl text-xs font-bold hover:shadow-lg hover:shadow-primary/20 transition-all flex items-center gap-2">
            <AppIcon name="upload" size={16} />
            Upload Content
          </button>
          <button className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all flex items-center gap-2 shadow-sm">
            <AppIcon name="folder" size={16} />
            Manage Folders
          </button>
        </>
      }
    >
      <MetricGrid>
        {contentStats.map((stat, index) => (
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

      <SectionCard title="All Content" description="Manage study materials and video lectures">
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <AppIcon name="search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            <Dropdown value={typeFilter} onChange={setTypeFilter} options={typeOptions} className="min-w-[120px]" />
            <Dropdown value={contentFilter} onChange={setContentFilter} options={contentOptions} className="min-w-[120px]" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Title</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Type</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Course</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Size</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Views</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Access</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Date</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginatedContent.length === 0 ? (
                <tr>
                  <td colSpan="8" className="py-8 text-center text-slate-500">
                    No content found.
                  </td>
                </tr>
              ) : (
                paginatedContent.map((content) => (
                  <tr key={content.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-3">
                        <AppIcon name={content.type === 'PDF' ? 'picture_as_pdf' : 'play_circle'} size={20} className="text-rose-500" />
                        <p className="font-semibold text-sm text-slate-900">{content.title}</p>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-sm text-slate-600">{content.type}</td>
                    <td className="py-3 px-3 text-sm text-slate-700">{content.course}</td>
                    <td className="py-3 px-3 text-sm text-slate-600">{content.size}</td>
                    <td className="py-3 px-3 text-sm text-slate-600">{content.views.toLocaleString()}</td>
                    <td className="py-3 px-3">
                      <StatusBadge tone={getContentTone(content.typeContent)}>
                        {content.typeContent.charAt(0).toUpperCase() + content.typeContent.slice(1)}
                      </StatusBadge>
                    </td>
                    <td className="py-3 px-3 text-sm text-slate-600">{content.date}</td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-1">
                        <button className="p-2 rounded hover:bg-slate-100 transition-colors"><AppIcon name="visibility" size={14} className="text-slate-600" /></button>
                        <button className="p-2 rounded hover:bg-slate-100 transition-colors"><AppIcon name="edit" size={14} className="text-slate-600" /></button>
                        <button className="p-2 rounded hover:bg-slate-100 transition-colors"><AppIcon name="lock" size={14} className="text-slate-600" /></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {filteredContent.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(filteredContent.length / itemsPerPage)}
            onPageChange={setCurrentPage}
            itemsPerPage={itemsPerPage}
            totalItems={filteredContent.length}
            className="mt-4"
          />
        )}
      </SectionCard>
    </DashboardPage>
  );
}