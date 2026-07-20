import { useState } from 'react';
import {
  DashboardPage,
  SectionCard,
  StatusBadge,
} from '../../components/common/DashboardPrimitives';
import AppIcon from '../../components/common/AppIcon';

const notices = [
  { id: 1, title: 'Exam Schedule Released', message: 'NEET Foundation Unit Test 3 schedule has been released. Check your dashboard for details.', date: '2024-01-25', type: 'important', read: false },
  { id: 2, title: 'New Course Added', message: 'JEE Advanced Crash Course has been launched. Enroll now!', date: '2024-01-24', type: 'info', read: false },
  { id: 3, title: 'Fee Payment Reminder', message: 'Last date for fee payment is approaching. Pay before 31st January to avoid late fees.', date: '2024-01-23', type: 'warning', read: true },
  { id: 4, title: 'Holiday Notice', message: 'Coaching will remain closed on 26th January for Republic Day.', date: '2024-01-22', type: 'info', read: true },
  { id: 5, title: 'Result Published', message: 'Unit Test 2 results have been published. Check your results section.', date: '2024-01-20', type: 'success', read: true },
];

export default function CoachingNotices() {
  const [noticesList, setNoticesList] = useState(notices);

  const markAsRead = (id) => {
    setNoticesList(noticesList.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };


  const getIcon = (type) => {
    switch(type) {
      case 'important': return 'info';
      case 'warning': return 'warning';
      case 'success': return 'check_circle';
      default: return 'notifications';
    }
  };

  const unreadCount = noticesList.filter(n => !n.read).length;

  return (
    <DashboardPage
      eyebrow="Notifications"
      title={`Notices & Announcements ${unreadCount > 0 ? `(${unreadCount} New)` : ''}`}
    >
      <SectionCard title={`All Notices (${noticesList.length})`} description="Latest updates from your coaching">
        <div className="space-y-3">
          {noticesList.map((notice) => (
            <div 
              key={notice.id}
              onClick={() => markAsRead(notice.id)}
              className={`flex gap-3 p-4 rounded-xl border transition-all cursor-pointer ${
                notice.read 
                  ? 'border-slate-100 bg-white' 
                  : 'border-blue-200 bg-blue-50'
              }`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                notice.read ? 'bg-slate-100' : 'bg-blue-100'
              }`}>
                <AppIcon 
                  name={getIcon(notice.type)} 
                  size={18} 
                  className={notice.read ? 'text-slate-500' : 'text-blue-600'} 
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <p className={`font-semibold text-sm ${notice.read ? 'text-slate-700' : 'text-slate-900'}`}>
                    {notice.title}
                  </p>
                  <p className="text-xs text-slate-500">{notice.date}</p>
                </div>
                <p className="text-sm text-slate-600">{notice.message}</p>
              </div>
              {!notice.read && (
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
              )}
            </div>
          ))}
        </div>
      </SectionCard>
    </DashboardPage>
  );
}