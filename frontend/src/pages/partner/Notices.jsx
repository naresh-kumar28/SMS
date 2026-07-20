
import AppIcon from '../../components/common/AppIcon';
import {
  DashboardPage,
  SectionCard,
} from '../../components/common/DashboardPrimitives';

import { useNoticesList } from '../../hooks/api/useOperations';

const priorityColors = {
  high: 'bg-red-100 text-red-700',
  medium: 'bg-amber-100 text-amber-700',
  low: 'bg-slate-100 text-slate-700',
};

export default function PartnerNotices() {
  const { data: noticesData = [], isLoading } = useNoticesList();

  return (
    <DashboardPage
      eyebrow="Partner Dashboard"
      title="Notices"
      actions={
        <button type="button" className="px-5 py-2.5 bg-primary text-white rounded-xl text-xs font-bold hover:shadow-lg hover:shadow-primary/20 transition-all flex items-center gap-2">
          <AppIcon name="add" size={16} />
          Create Notice
        </button>
      }
    >
      <SectionCard title="Notices" description="Important announcements and updates">
        <div className="space-y-4">
          {isLoading ? (
            <p className="text-sm text-slate-500 py-4">Loading notices...</p>
          ) : noticesData.length === 0 ? (
            <p className="text-sm text-slate-500 py-4">No notices found.</p>
          ) : (
            noticesData.map((notice) => (
              <div key={notice.id} className="p-4 rounded-xl border border-slate-200 hover:border-primary/30 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-sm text-slate-900">{notice.title}</h3>
                  <div className="flex items-center gap-2">
                    {notice.priority && (
                      <span className={`px-2 py-0.5 text-xs font-medium rounded-md ${priorityColors[notice.priority] || priorityColors.medium}`}>
                        {notice.priority}
                      </span>
                    )}
                    {notice.target_audience && (
                      <span className="px-2 py-0.5 text-xs font-medium rounded-md bg-blue-100 text-blue-700 capitalize">
                        {notice.target_audience.toLowerCase()}
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-sm text-slate-600 mb-3">{notice.content}</p>
                <p className="text-xs text-slate-400">
                  {new Date(notice.created_at || notice.date).toLocaleDateString()}
                </p>
              </div>
            ))
          )}
        </div>
      </SectionCard>
    </DashboardPage>
  );
}