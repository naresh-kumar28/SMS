import { useState } from 'react';
import AppIcon from '../../components/common/AppIcon';
import {
  DashboardPage,
  MetricCard,
  MetricGrid,
  SectionCard,
  StatusBadge,
} from '../../components/common/DashboardPrimitives';

const mockMessages = [
  { id: 1, name: 'John Doe', email: 'john.doe@school.com', subject: 'Demo Request for School Management', message: 'Hi, I would like to schedule a demo for our school with 500 students. Can you help?', status: 'new', date: '2024-01-15' },
  { id: 2, name: 'Sarah Smith', email: 'sarah@academy.com', subject: 'Pricing Inquiry', message: 'What is the pricing for a coaching institute with 3 branches?', status: 'read', date: '2024-01-14' },
  { id: 3, name: 'Mike Johnson', email: 'mike@college.edu', subject: 'Technical Support', message: 'We are facing issues with attendance sync. Can someone help?', status: 'pending', date: '2024-01-13' },
  { id: 4, name: 'Emily Brown', email: 'emily@primary.edu', subject: 'Feature Request', message: 'It would be great to have a mobile app for parents.', status: 'new', date: '2024-01-12' },
  { id: 5, name: 'David Wilson', email: 'david@high.edu', subject: 'Integration Help', message: 'Can Skoolnet integrate with our existing ERP system?', status: 'read', date: '2024-01-11' },
];

const statusConfig = {
  new: { label: 'New', tone: 'blue' },
  read: { label: 'Read', tone: 'emerald' },
  pending: { label: 'Pending', tone: 'amber' },
  resolved: { label: 'Resolved', tone: 'green' },
};

export default function ManagerContact() {
  const [messages] = useState(mockMessages);
  const [filter, setFilter] = useState('all');
  const [selectedMessage, setSelectedMessage] = useState(null);

  const filteredMessages = filter === 'all' ? messages : messages.filter(m => m.status === filter);

  const getStatusConfig = (status) => statusConfig[status] || statusConfig.new;

  return (
    <DashboardPage
      eyebrow="Customer messages"
      title="Contact Messages"
      actions={
        <>
          <button type="button" className="btn-primary">
            <AppIcon name="mail" size={16} className="mr-2" />
            Send Reply
          </button>
        </>
      }
    >
      <MetricGrid>
        <MetricCard
          icon="inbox"
          label="Total Messages"
          value={messages.length}
          change="+12"
          helper="This month"
          tone="blue"
        />
        <MetricCard
          icon="mark_email_unread"
          label="Unread"
          value={messages.filter(m => m.status === 'new').length}
          change="+5"
          helper="New"
          tone="amber"
        />
        <MetricCard
          icon="schedule"
          label="Pending"
          value={messages.filter(m => m.status === 'pending').length}
          change="2"
          helper="Awaiting reply"
          tone="rose"
        />
        <MetricCard
          icon="check_circle"
          label="Resolved"
          value={messages.filter(m => m.status === 'resolved').length}
          change="+8"
          helper="This week"
          tone="green"
        />
      </MetricGrid>

      <SectionCard 
        title="Messages" 
        description="All customer messages from the contact form"
      >
        <div className="flex gap-2 mb-4">
          {['all', 'new', 'read', 'pending'].map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                filter === status
                  ? 'btn-primary text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {status === 'all' ? 'All' : status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {filteredMessages.map(message => (
            <div
              key={message.id}
              onClick={() => setSelectedMessage(message)}
              className={`grid gap-3 rounded-2xl border bg-white/70 p-4 cursor-pointer transition-all hover:shadow-md ${
                selectedMessage?.id === message.id
                  ? 'border-primary ring-2 ring-primary/20'
                  : 'border-slate-100'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-bold text-primary">{message.name.charAt(0)}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">{message.name}</h4>
                    <p className="text-sm text-slate-500">{message.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <StatusBadge tone={getStatusConfig(message.status).tone}>
                    {getStatusConfig(message.status).label}
                  </StatusBadge>
                  <span className="text-xs text-slate-400">{message.date}</span>
                </div>
              </div>
              <div>
                <h5 className="font-medium text-slate-900">{message.subject}</h5>
                <p className="text-sm text-slate-500 line-clamp-1">{message.message}</p>
              </div>
            </div>
          ))}
        </div>

        {filteredMessages.length === 0 && (
          <div className="text-center py-12">
            <AppIcon name="inbox" size={40} className="text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500">No messages found</p>
          </div>
        )}
      </SectionCard>

      {selectedMessage && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[100] -m-4" onClick={() => setSelectedMessage(null)}>
          <div className="bg-white rounded-2xl p-6 max-w-xl w-full mx-4 max-h-[85vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-lg font-bold text-primary">{selectedMessage.name.charAt(0)}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">{selectedMessage.name}</h3>
                  <p className="text-sm text-slate-500">{selectedMessage.email}</p>
                </div>
              </div>
              <button onClick={() => setSelectedMessage(null)} className="p-2 hover:bg-slate-100 rounded-lg">
                <AppIcon name="close" size={20} className="text-slate-400" />
              </button>
            </div>
            
            <div className="mb-4">
              <StatusBadge tone={getStatusConfig(selectedMessage.status).tone}>
                {getStatusConfig(selectedMessage.status).label}
              </StatusBadge>
              <span className="text-xs text-slate-400 ml-2">{selectedMessage.date}</span>
            </div>

            <h4 className="font-semibold text-slate-900 mb-2">{selectedMessage.subject}</h4>
            <p className="text-slate-600 whitespace-pre-wrap">{selectedMessage.message}</p>

            <div className="flex gap-3 mt-6">
              <button className="flex-1 btn-primary">
                <AppIcon name="send" size={16} className="mr-2" />
                Reply
              </button>
              <button className="btn-secondary">
                <AppIcon name="check" size={16} className="mr-2" />
                Mark Resolved
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardPage>
  );
}