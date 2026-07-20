import { useState } from 'react';
import {
  DashboardPage,
  StatusBadge,
} from '../../../components/common/DashboardPrimitives';
import AppIcon from '../../../components/common/AppIcon';
import { useNoticesList } from '../../../hooks/api/useOperations';
import { useAuth } from '../../../hooks/api/useAuth';

export default function StudentNotices() {
  const { authState } = useAuth();
  const institutionId = authState?.roleInfo?.institution_id;
  const batchId = authState?.roleInfo?.batch;

  const { data: noticesData = [], isLoading } = useNoticesList(institutionId, batchId);

  const [filter, setFilter] = useState('all');

  const notices = noticesData.map(notice => ({
    id: notice.id,
    title: notice.title,
    date: new Date(notice.created_at || new Date()).toISOString().split('T')[0],
    category: notice.notice_type || 'General',
    priority: notice.priority || 'normal',
    description: notice.content,
    attachment: notice.attachment,
  }));

  const filteredNotices = notices.filter(n => 
    filter === 'all' || n.category === filter
  );

  const categories = ['all', ...new Set(notices.map(n => n.category))];

  return (
    <DashboardPage
      eyebrow="Communication"
      title="Notices"
      description="Stay updated with school announcements"
    >
      <div className="flex gap-2 mb-6 flex-wrap">
        {categories.map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              filter === f 
                ? 'bg-primary text-white' 
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {f === 'all' ? 'All' : f}
          </button>
        ))}
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
            <p className="text-slate-500">There are no notices to display.</p>
          </div>
        ) : (
          filteredNotices.map(notice => (
            <div key={notice.id} className="p-6 rounded-2xl border border-slate-200 bg-white hover:border-primary/30 hover:shadow-lg transition-all">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">{notice.title}</h3>
                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <div className="flex items-center gap-1">
                      <AppIcon name="event" size={14} />
                      <span>{notice.date}</span>
                    </div>
                    <StatusBadge tone={notice.category === 'Event' ? 'blue' : notice.category === 'Holiday' ? 'emerald' : 'purple'}>
                      {notice.category}
                    </StatusBadge>
                  </div>
                </div>
                {notice.priority === 'high' && (
                  <StatusBadge tone="rose">Important</StatusBadge>
                )}
              </div>
              <p className="text-sm text-slate-600 mb-4">{notice.description}</p>
              {notice.attachment && (
                <div className="flex items-center gap-2 pt-4 border-t border-slate-100">
                  <a href={notice.attachment} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">
                    <AppIcon name="download" size={16} />
                    Download Attachment
                  </a>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </DashboardPage>
  );
}