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

const notificationStats = [
  { icon: 'notifications', label: 'Total Sent', value: '1,284', change: '+234', helper: 'This month', tone: 'blue' },
  { icon: 'check_circle', label: 'Delivered', value: '1,156', change: '90%', helper: 'Success rate', tone: 'emerald' },
  { icon: 'sms', label: 'SMS', value: '890', change: '+180', helper: 'Messages', tone: 'rose' },
  { icon: 'email', label: 'Email', value: '394', change: '+54', helper: 'Sent', tone: 'amber' },
  { icon: 'app_shortcut', label: 'Push', value: '156', change: '+42', helper: 'Notifications', tone: 'purple' },
  { icon: 'error', label: 'Failed', value: '12', change: '-8', helper: 'Bounced', tone: 'slate' },
];

const notifications = [
  { id: 1, title: 'Attendance Alert - Your child is absent', type: 'SMS', recipient: 'Parent', recipientCount: 45, sentDate: '2024-01-25 09:15', status: 'delivered', sender: 'System' },
  { id: 2, title: 'Exam Result Published', type: 'Email', recipient: 'Parent', recipientCount: 890, sentDate: '2024-01-24 14:30', status: 'delivered', sender: 'Academic' },
  { id: 3, title: 'Fee Payment Reminder', type: 'SMS', recipient: 'Parent', recipientCount: 156, sentDate: '2024-01-23 10:00', status: 'delivered', sender: 'Finance' },
  { id: 4, title: 'Holiday Notice', type: 'Push', recipient: 'All', recipientCount: 1200, sentDate: '2024-01-22 16:45', status: 'delivered', sender: 'Admin' },
  { id: 5, title: 'Assignment Submitted Alert', type: 'SMS', recipient: 'Teacher', recipientCount: 86, sentDate: '2024-01-21 11:20', status: 'delivered', sender: 'System' },
  { id: 6, title: 'Parent Meeting Reminder', type: 'Email', recipient: 'Parent', recipientCount: 320, sentDate: '2024-01-20 09:00', status: 'delivered', sender: 'Admin' },
  { id: 7, title: 'Fee Receipt Generated', type: 'SMS', recipient: 'Parent', recipientCount: 28, sentDate: '2024-01-19 15:30', status: 'failed', sender: 'Finance' },
  { id: 8, title: 'Transport Update', type: 'Push', recipient: 'Transport Users', recipientCount: 180, sentDate: '2024-01-18 07:00', status: 'delivered', sender: 'Transport' },
  { id: 9, title: 'Library Book Due', type: 'Email', recipient: 'Student', recipientCount: 45, sentDate: '2024-01-17 12:00', status: 'delivered', sender: 'Library' },
  { id: 10, title: 'Emergency Notice', type: 'Push', recipient: 'All', recipientCount: 1200, sentDate: '2024-01-16 08:30', status: 'pending', sender: 'Admin' },
];

export default function Notifications() {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredNotifications = useMemo(() => {
    return notifications.filter(notification => {
      const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           notification.sender.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = typeFilter === 'all' || notification.type === typeFilter;
      const matchesStatus = statusFilter === 'all' || notification.status === statusFilter;
      return matchesSearch && matchesType && matchesStatus;
    });
  }, [searchTerm, typeFilter, statusFilter]);

  const paginatedNotifications = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredNotifications.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredNotifications, currentPage, itemsPerPage]);

  const typeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'SMS', label: 'SMS' },
    { value: 'Email', label: 'Email' },
    { value: 'Push', label: 'Push' },
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'delivered', label: 'Delivered' },
    { value: 'pending', label: 'Pending' },
    { value: 'failed', label: 'Failed' },
  ];

  const getStatusTone = (status) => {
    switch(status) {
      case 'delivered': return 'emerald';
      case 'pending': return 'amber';
      case 'failed': return 'rose';
      default: return 'slate';
    }
  };

  const getTypeTone = (type) => {
    switch(type) {
      case 'SMS': return 'rose';
      case 'Email': return 'amber';
      case 'Push': return 'purple';
      default: return 'slate';
    }
  };

  return (
    <DashboardPage
      eyebrow="Communication"
      title="Push Notifications"
      actions={
        <>
          <button className="px-5 py-2.5 bg-primary text-white rounded-xl text-xs font-bold hover:shadow-lg hover:shadow-primary/20 transition-all flex items-center gap-2">
            <AppIcon name="send" size={16} />
            Send Notification
          </button>
          <button className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all flex items-center gap-2 shadow-sm">
            <AppIcon name="history" size={16} />
            History
          </button>
        </>
      }
    >
      <MetricGrid>
        {notificationStats.map((stat, index) => (
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

      <SectionCard title="Notification History" description="All sent and scheduled notifications">
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <AppIcon name="search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search notifications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            <Dropdown value={typeFilter} onChange={setTypeFilter} options={typeOptions} className="min-w-[130px]" />
            <Dropdown value={statusFilter} onChange={setStatusFilter} options={statusOptions} className="min-w-[130px]" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Notification</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Type</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Recipient</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Count</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Sent</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Status</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Sender</th>
                <th className="text-left py-2.5 px-3 text-xs font-semibold text-slate-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginatedNotifications.length === 0 ? (
                <tr>
                  <td colSpan="8" className="py-8 text-center text-slate-500">
                    No notifications found.
                  </td>
                </tr>
              ) : (
                paginatedNotifications.map((notification) => (
                  <tr key={notification.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-3">
                      <p className="font-semibold text-sm text-slate-900">{notification.title}</p>
                    </td>
                    <td className="py-3 px-3">
                      <StatusBadge tone={getTypeTone(notification.type)}>
                        {notification.type}
                      </StatusBadge>
                    </td>
                    <td className="py-3 px-3 text-sm text-slate-700">{notification.recipient}</td>
                    <td className="py-3 px-3 text-sm text-slate-600">{notification.recipientCount.toLocaleString()}</td>
                    <td className="py-3 px-3 text-sm text-slate-600">{notification.sentDate}</td>
                    <td className="py-3 px-3">
                      <StatusBadge tone={getStatusTone(notification.status)}>
                        {notification.status.charAt(0).toUpperCase() + notification.status.slice(1)}
                      </StatusBadge>
                    </td>
                    <td className="py-3 px-3 text-sm text-slate-600">{notification.sender}</td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-1">
                        <button className="p-2 rounded hover:bg-slate-100 transition-colors"><AppIcon name="visibility" size={14} className="text-slate-600" /></button>
                        <button className="p-2 rounded hover:bg-slate-100 transition-colors"><AppIcon name="refresh" size={14} className="text-slate-600" /></button>
                        <button className="p-2 rounded hover:bg-slate-100 transition-colors"><AppIcon name="more_vert" size={14} className="text-slate-600" /></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {filteredNotifications.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(filteredNotifications.length / itemsPerPage)}
            onPageChange={setCurrentPage}
            itemsPerPage={itemsPerPage}
            totalItems={filteredNotifications.length}
            className="mt-4"
          />
        )}
      </SectionCard>
    </DashboardPage>
  );
}