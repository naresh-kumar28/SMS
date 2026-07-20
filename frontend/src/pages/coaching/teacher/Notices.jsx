
import {
  DashboardPage,
  SectionCard,
} from '../../../components/common/DashboardPrimitives';
import AppIcon from '../../../components/common/AppIcon';

const notices = [
  { id: 1, title: 'Physics Exam Schedule', date: '2024-01-15', views: 156 },
  { id: 2, title: 'Holiday Notice - Republic Day', date: '2024-01-20', views: 320 },
  { id: 3, title: 'Staff Meeting Tomorrow', date: '2024-01-18', views: 45 },
];

export default function CoachingTeacherNotices() {
  return (
    <DashboardPage
      eyebrow="Communication"
      title="Notices"
      description="Post and manage notices"
    >
      <div className="space-y-4">
        {notices.map(notice => (
          <div key={notice.id} className="p-6 rounded-2xl border border-slate-200 bg-white">
            <h3 className="text-lg font-bold text-slate-900 mb-2">{notice.title}</h3>
            <div className="flex items-center gap-4 text-sm text-slate-600">
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
        ))}
      </div>
    </DashboardPage>
  );
}