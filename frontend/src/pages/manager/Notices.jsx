import { useState } from 'react';
import AppIcon from '../../components/common/AppIcon';
import {
  DashboardPage,
  SectionCard,
  StatusBadge,
} from '../../components/common/DashboardPrimitives';
import { useNoticesList } from '../../hooks/api/useOperations';
import { DashboardSkeleton } from '../../components/common/Skeleton';

const initialNotices = [
  { id: 1, title: 'System Maintenance Scheduled', message: 'Platform maintenance scheduled for April 15, 2026 from 2:00 AM to 6:00 AM IST.', type: 'important', read: false, date: '2026-04-13' },
  { id: 2, title: 'New Feature Release', message: 'Analytics dashboard v2.0 is now live with enhanced reporting capabilities.', type: 'feature', read: true, date: '2026-04-12' },
  { id: 3, title: 'Security Update', message: 'Please update your password if you haven\'t changed it in the last 90 days.', type: 'alert', read: false, date: '2026-04-11' },
  { id: 4, title: 'Policy Change', message: 'UpdatedTerms of Service effective from May 1, 2026.', type: 'info', read: true, date: '2026-04-10' },
  { id: 5, title: 'New Partner Onboarded', message: 'Delhi Public School has joined as a premium partner.', type: 'success', read: true, date: '2026-04-09' },
];

export default function ManagerNotices() {
  const { data: noticesData, isLoading } = useNoticesList();
  // For UI testing we can keep a local state of read notices, but in real app
  // this should be tracked per user via an API call.
  const [readNotices, setReadNotices] = useState(new Set());
  
  const markAsRead = (id) => {
    setReadNotices(prev => {
      const newSet = new Set(prev);
      newSet.add(id);
      return newSet;
    });
  };

  const notices = noticesData || [];
  
  const unreadCount = notices.filter(n => !readNotices.has(n.id)).length;

  if (isLoading) {
    return <DashboardSkeleton />;
  }
  
  return (
    <DashboardPage
      eyebrow="Communication"
      title="Notices"
      actions={
        <>
          <button className="px-5 py-2.5 bg-primary text-white rounded-xl text-xs font-bold hover:shadow-lg hover:shadow-primary/20 transition-all flex items-center gap-2">
            <AppIcon name="add" size={16} />
            New Notice
          </button>
        </>
      }
    >
      <SectionCard title="All Notices" description={`${unreadCount} unread notifications`}>
        <div className="space-y-3">
          {notices.length === 0 ? (
            <div className="text-center py-8 text-slate-500">
              No notices found.
            </div>
          ) : notices.map((notice) => {
            const isRead = readNotices.has(notice.id);
            return (
            <div 
              key={notice.id}
              onClick={() => markAsRead(notice.id)}
              className={`
                flex items-start gap-4 p-4 rounded-xl border transition-all cursor-pointer
                ${isRead 
                  ? 'bg-white border-slate-100 hover:bg-slate-50' 
                  : 'bg-blue-50 border-blue-200 hover:bg-blue-100'
                }
              `}
            >
              <div className={`
                w-10 h-10 rounded-lg flex items-center justify-center shrink-0
                ${notice.type === 'important' ? 'bg-amber-100' : 
                  notice.type === 'alert' ? 'bg-rose-100' :
                  notice.type === 'success' ? 'bg-emerald-100' :
                  notice.type === 'feature' ? 'bg-purple-100' : 'bg-slate-100'}
              `}>
                <AppIcon 
                  name={notice.type === 'important' ? 'warning' : 
                    notice.type === 'alert' ? 'error' :
                    notice.type === 'success' ? 'check_circle' :
                    notice.type === 'feature' ? 'stars' : 'info'}
                  size={20}
                  className={notice.type === 'important' ? 'text-amber-600' : 
                    notice.type === 'alert' ? 'text-rose-600' :
                    notice.type === 'success' ? 'text-emerald-600' :
                    notice.type === 'feature' ? 'text-purple-600' : 'text-slate-600'}
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-slate-900">{notice.title}</h4>
                  {!isRead && <div className="w-2 h-2 bg-blue-500 rounded-full" />}
                </div>
                <p className="text-sm text-slate-600 mt-1">{notice.content}</p>
                <div className="flex items-center gap-2 mt-2">
                  <p className="text-xs text-slate-400">
                    {new Date(notice.published_at).toLocaleDateString()}
                  </p>
                  {notice.institution && (
                    <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                      {notice.institution.name}
                    </span>
                  )}
                </div>
              </div>
              {!isRead && (
                <button className="p-2 hover:bg-white rounded-lg transition-all">
                  <AppIcon name="check" size={16} className="text-blue-600" />
                </button>
              )}
            </div>
            );
          })}
        </div>
      </SectionCard>
    </DashboardPage>
  );
}