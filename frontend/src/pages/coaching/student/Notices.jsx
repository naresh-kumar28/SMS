import {
  DashboardPage,
  SectionCard,
} from '../../../components/common/DashboardPrimitives';
import AppIcon from '../../../components/common/AppIcon';

const notices = [
  { id: 1, title: 'Exam Schedule - Unit Test 2', date: '2024-01-15', category: 'Academic' },
  { id: 2, title: 'Holiday Notice - Republic Day', date: '2024-01-20', category: 'Holiday' },
];

export default function CoachingStudentNotices() {
  return (
    <DashboardPage
      eyebrow="Communication"
      title="Notices"
      description="Stay updated with announcements"
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
              <span className="px-2 py-1 bg-slate-100 rounded text-xs">{notice.category}</span>
            </div>
          </div>
        ))}
      </div>
    </DashboardPage>
  );
}