import { useState } from 'react';
import {
  DashboardPage,
  StatusBadge,
} from '../../../components/common/DashboardPrimitives';
import AppIcon from '../../../components/common/AppIcon';
import Dropdown from '../../../components/common/Dropdown';
import { useNoticesList } from '../../../hooks/api/useOperations';
import { useAuth } from '../../../hooks/api/useAuth';

export default function TeacherNotices() {
  const { authState } = useAuth();
  const institutionId = authState?.roleInfo?.institution_id;
  const { data: noticesData = [], isLoading } = useNoticesList(institutionId);

  const [selectedClass, setSelectedClass] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const notices = noticesData.map(notice => ({
    id: notice.id,
    title: notice.title,
    content: notice.content,
    class: notice.for_batch ? `Batch ${notice.for_batch}` : 'All Classes',
    date: new Date(notice.created_at || new Date()).toISOString().split('T')[0],
    status: 'published',
    views: Math.floor(Math.random() * 100), // mock views
  }));

  const filteredNotices = notices.filter(n => {
    const matchesClass = selectedClass === 'all' || n.class.includes(selectedClass.replace('Class ', '')) || n.class === 'All Classes';
    const matchesSearch = n.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesClass && matchesSearch;
  });

  return (
    <DashboardPage
      eyebrow="Communication"
      title="Notices"
      description="Post and manage notices for your classes"
    >
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div className="flex-1 min-w-[200px]">
          <div className="relative">
            <AppIcon name="search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search notices..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-primary/30 focus:ring-2 focus:ring-primary/10 text-sm"
            />
          </div>
        </div>
        <Dropdown
          options={[
            { label: 'All Classes', value: 'all' },
            { label: 'Class 10-A', value: 'Class 10-A' },
            { label: 'Class 10-B', value: 'Class 10-B' },
            { label: 'Class 9-A', value: 'Class 9-A' },
            { label: 'Class 9-B', value: 'Class 9-B' },
          ]}
          value={selectedClass}
          onChange={setSelectedClass}
        />
      </div>

      <div className="space-y-4">
        {isLoading ? (
          <div className="p-8 text-center text-slate-500 bg-white rounded-2xl border border-slate-200">
            Loading notices...
          </div>
        ) : filteredNotices.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-2xl border border-slate-200">
            <AppIcon name="campaign" size={48} className="text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-900 mb-2">No Notices Found</h3>
            <p className="text-slate-500">You haven't posted any notices matching your filters.</p>
          </div>
        ) : (
          filteredNotices.map(notice => (
            <div key={notice.id} className="p-6 rounded-2xl border border-slate-200 bg-white hover:border-primary/30 hover:shadow-lg transition-all">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{notice.title}</h3>
                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <div className="flex items-center gap-1">
                      <AppIcon name="group" size={14} />
                      <span>{notice.class}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <AppIcon name="event" size={14} />
                      <span>{notice.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <AppIcon name="visibility" size={14} />
                      <span>{notice.views} views</span>
                    </div>
                  </div>
                </div>
                <StatusBadge tone={notice.status === 'published' ? 'emerald' : 'amber'}>
                  {notice.status}
                </StatusBadge>
              </div>
              <div className="flex items-center gap-2 pt-4 border-t border-slate-100">
                <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-primary">
                  <AppIcon name="visibility" size={18} />
                </button>
                <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-primary">
                  <AppIcon name="edit" size={18} />
                </button>
                {notice.status === 'draft' && (
                  <button className="p-2 rounded-lg hover:bg-emerald-50 text-slate-500 hover:text-emerald-600">
                    <AppIcon name="send" size={18} />
                  </button>
                )}
                <button className="p-2 rounded-lg hover:bg-rose-50 text-slate-400 hover:text-rose-600">
                  <AppIcon name="delete" size={18} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </DashboardPage>
  );
}