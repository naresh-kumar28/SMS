import AppIcon from '../../components/common/AppIcon';
import {
  DashboardPage,
  MetricCard,
  MetricGrid,
  SectionCard,
  StatusBadge,
} from '../../components/common/DashboardPrimitives';

const notifications = [
  { channel: 'Email broadcast', audience: 'All school admins', status: 'Scheduled for 5:00 PM', tone: 'blue' },
  { channel: 'In-app banner', audience: 'Coaching dashboard users', status: 'Live now', tone: 'emerald' },
  { channel: 'Urgent outage SMS', audience: 'Internal team only', status: 'Template pending approval', tone: 'amber' },
];

export default function ManagerNotifications() {
  return (
    <DashboardPage
      eyebrow="Communication center"
      title="Notifications"
      actions={
        <>
          <button type="button" className="btn-primary">
            <AppIcon name="add" size={16} className="mr-2" />
            Create campaign
          </button>
          <button type="button" className="btn-secondary">
            <AppIcon name="folder" size={16} className="mr-2" />
            Browse templates
          </button>
        </>
      }
    >
      <MetricGrid>
        {[
          { icon: 'notifications', label: 'Campaigns', value: '14', change: '+5', helper: 'This week', tone: 'blue' },
          { icon: 'mail', label: 'Email Delivery', value: '98.4%', change: '+1.2%', helper: 'Success rate', tone: 'emerald' },
          { icon: 'help_center', label: 'Support', value: '6', change: '2', helper: 'Need approval', tone: 'amber' },
          { icon: 'security', label: 'Critical', value: '1', change: 'Active', helper: 'Escalation', tone: 'rose' },
          { icon: 'sms', label: 'SMS Sent', value: '2.3K', change: '+342', helper: 'Today', tone: 'purple' },
          { icon: 'push', label: 'Push', value: '89%', change: '+5%', helper: 'Open rate', tone: 'green' },
        ].map((stat, index) => (
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

      <SectionCard title="Channel activity" description="What is currently live or scheduled for your audiences">
        <div className="space-y-4">
          {notifications.map(item => (
            <div
              key={item.channel}
              className="grid gap-3 rounded-2xl border border-slate-100 bg-white/70 p-4 md:grid-cols-[1.1fr_1fr_1fr_auto]"
            >
              <div>
                <h4 className="font-semibold text-slate-900">{item.channel}</h4>
                <p className="text-sm text-slate-500">{item.audience}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm text-slate-600">{item.status}</p>
              </div>
              <div className="flex items-start md:justify-end">
                <StatusBadge tone={item.tone}>{item.tone === 'emerald' ? 'Healthy' : 'Watch'}</StatusBadge>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
    </DashboardPage>
  );
}
