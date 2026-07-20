import { useState, useMemo } from 'react';
import AppIcon from '../../components/common/AppIcon';
import Dropdown from '../../components/common/Dropdown';
import Pagination from '../../components/common/Pagination';
import {
  DashboardPage,
  MetricCard,
  MetricGrid,
  SectionCard,
} from '../../components/common/DashboardPrimitives';

const activityStats = [
  { label: 'Total Activities', value: '342', change: '+28', helper: 'All time', tone: 'blue' },
  { label: 'Today', value: '47', change: '+12', helper: 'Activities today', tone: 'emerald' },
  { label: 'This Week', value: '186', change: '+45', helper: 'Weekly total', tone: 'purple' },
  { label: 'Pending', value: '23', change: '8 urgent', helper: 'Awaiting action', tone: 'amber' },
  { label: 'Completed', value: '298', change: '+34', helper: 'This month', tone: 'green' },
  { label: 'Issues', value: '8', change: '-2', helper: 'Need attention', tone: 'rose' },
];

const activities = [
  {
    id: 1,
    type: 'school_registration',
    title: 'New School Registration',
    description: 'Lincoln High School submitted registration documents',
    user: 'System',
    timestamp: '2024-03-15T10:30:00Z',
    status: 'pending',
    priority: 'medium'
  },
  {
    id: 2,
    type: 'payment_received',
    title: 'Payment Received',
    description: 'St. Mary\'s Academy paid quarterly subscription',
    user: 'Finance Bot',
    timestamp: '2024-03-15T09:45:00Z',
    status: 'completed',
    priority: 'low'
  },
  {
    id: 3,
    type: 'coaching_enrollment',
    title: 'Coaching Center Enrollment',
    description: 'Excel Academy enrolled 45 new students',
    user: 'Admin',
    timestamp: '2024-03-15T08:20:00Z',
    status: 'completed',
    priority: 'high'
  },
  {
    id: 4,
    type: 'support_ticket',
    title: 'Support Ticket Created',
    description: 'Technical issue reported by Oakwood Academy',
    user: 'Support System',
    timestamp: '2024-03-14T16:15:00Z',
    status: 'in_progress',
    priority: 'high'
  },
  {
    id: 5,
    type: 'document_upload',
    title: 'Document Verification',
    description: 'Riverside College uploaded academic certificates',
    user: 'Verification Bot',
    timestamp: '2024-03-14T14:30:00Z',
    status: 'pending',
    priority: 'medium'
  },
];

export default function Activity() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredActivities = useMemo(() => {
    return activities.filter(activity => {
      const matchesSearch = activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           activity.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           activity.user.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || activity.status === statusFilter;
      const matchesType = typeFilter === 'all' || activity.type === typeFilter;
      
      return matchesSearch && matchesStatus && matchesType;
    });
  }, [searchTerm, statusFilter, typeFilter]);

  const paginatedActivities = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredActivities.slice(startIndex, endIndex);
  }, [filteredActivities, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredActivities.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'completed', label: 'Completed' },
    { value: 'pending', label: 'Pending' },
    { value: 'in_progress', label: 'In Progress' },
  ];

  const typeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'school_registration', label: 'School Registration' },
    { value: 'payment_received', label: 'Payment Received' },
    { value: 'coaching_enrollment', label: 'Coaching Enrollment' },
    { value: 'support_ticket', label: 'Support Ticket' },
    { value: 'document_upload', label: 'Document Upload' },
  ];

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    if (hours < 48) return 'Yesterday';
    return date.toLocaleDateString();
  };

  const getTypeIcon = (type) => {
    const icons = {
      school_registration: 'school',
      payment_received: 'payments',
      coaching_enrollment: 'rocket_launch',
      support_ticket: 'support',
      document_upload: 'description'
    };
    return icons[type] || 'activity';
  };

  const getStatusColor = (status) => {
    const colors = {
      completed: 'text-emerald-600 bg-emerald-50',
      pending: 'text-amber-600 bg-amber-50',
      in_progress: 'text-blue-600 bg-blue-50'
    };
    return colors[status] || 'text-slate-600 bg-slate-50';
  };

  const getPriorityColor = (priority) => {
    const colors = {
      high: 'text-rose-600 bg-rose-50',
      medium: 'text-amber-600 bg-amber-50',
      low: 'text-emerald-600 bg-emerald-50'
    };
    return colors[priority] || 'text-slate-600 bg-slate-50';
  };

  return (
    <DashboardPage
      eyebrow="Activity Monitor"
      title="Platform Activity"
      actions={
        <>
          <button type="button" className="px-5 py-2.5 bg-primary text-white rounded-xl text-xs font-bold hover:shadow-lg hover:shadow-primary/20 transition-all flex items-center gap-2">
            <AppIcon name="refresh" size={16} />
            Refresh
          </button>
          <button type="button" className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-on-surface hover:bg-slate-50 transition-all flex items-center gap-2 shadow-sm">
            <AppIcon name="download" size={16} className="text-primary" />
            Export Log
          </button>
        </>
      }
    >
      <MetricGrid>
        {activityStats.map((stat, index) => {
          const icons = {
            'Total Activities': 'activity',
            'Today': 'today',
            'This Week': 'date_range',
            'Pending': 'pending',
            'Completed': 'task_alt',
            'Issues': 'warning'
          };
          return (
            <MetricCard
              key={index}
              icon={icons[stat.label] || 'activity'}
              label={stat.label}
              value={stat.value}
              change={stat.change}
              helper={stat.helper}
              tone={stat.tone}
            />
          );
        })}
      </MetricGrid>

      <SectionCard title="Recent Activities" description="Latest platform activities and system events">
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <AppIcon name="search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search activities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Dropdown
              value={statusFilter}
              onChange={setStatusFilter}
              options={statusOptions}
              className="min-w-35"
            />
            <Dropdown
              value={typeFilter}
              onChange={setTypeFilter}
              options={typeOptions}
              className="min-w-42"
            />
          </div>
        </div>
        <div className="space-y-3">
          {filteredActivities.length === 0 ? (
            <div className="py-8 text-center text-slate-500">
              No activities found matching your criteria.
            </div>
          ) : (
            paginatedActivities.map((activity) => (
              <div key={activity.id} className="border border-slate-100 rounded-xl p-4 hover:bg-slate-50 transition-colors">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                    <AppIcon name={getTypeIcon(activity.type)} size={16} className="text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <h4 className="font-semibold text-sm text-slate-900">{activity.title}</h4>
                        <p className="text-sm text-slate-600 mt-1">{activity.description}</p>
                      </div>
                      <span className="text-xs text-slate-400 whitespace-nowrap">
                        {formatTimestamp(activity.timestamp)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs text-slate-500">by {activity.user}</span>
                      <span className={`text-xs font-medium px-2 py-1 rounded-md ${getStatusColor(activity.status)}`}>
                        {activity.status}
                      </span>
                      <span className={`text-xs font-medium px-2 py-1 rounded-md ${getPriorityColor(activity.priority)}`}>
                        {activity.priority}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        
        {filteredActivities.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            itemsPerPage={itemsPerPage}
            totalItems={filteredActivities.length}
            className="mt-4"
          />
        )}
      </SectionCard>
    </DashboardPage>
  );
}
