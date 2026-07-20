
import AppIcon from '../../components/common/AppIcon';
import { usePartnerAuth } from '../../hooks/api/usePartnerAuth';
import { DashboardSkeleton } from '../../components/common/Skeleton';
import {
  DashboardPage,
  MetricCard,
  MetricGrid,
  SectionCard,
} from '../../components/common/DashboardPrimitives';

import { usePartnerDashboardMetrics } from '../../hooks/api/usePartners';

export default function PartnerDashboard() {
  const { isLoadingProfile } = usePartnerAuth();
  const { data: dashboardData, isLoading: isLoadingMetrics } = usePartnerDashboardMetrics();

  if (isLoadingProfile || isLoadingMetrics) {
    return <DashboardSkeleton />;
  }

  const metrics = dashboardData?.metrics || [];
  const activities = dashboardData?.recent_activities || [];

  return (
    <DashboardPage
      eyebrow="Partner Dashboard"
      title="Overview"
      actions={
        <>
          <button type="button" className="px-5 py-2.5 bg-primary text-white rounded-xl text-xs font-bold hover:shadow-lg hover:shadow-primary/20 transition-all flex items-center gap-2">
            <AppIcon name="add" size={16} />
            Add School
          </button>
          <button type="button" className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-on-surface hover:bg-slate-50 transition-all flex items-center gap-2 shadow-sm">
            <AppIcon name="add" size={16} className="text-primary" />
            Add Coaching
          </button>
        </>
      }
    >
      <MetricGrid>
        {metrics.map((stat, index) => (
          <MetricCard
            key={index}
            icon={stat.icon || 'analytics'}
            label={stat.label}
            value={stat.value}
            change={stat.change}
            helper={stat.helper}
            tone={stat.tone}
          />
        ))}
      </MetricGrid>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SectionCard title="Recent Activity" description="Latest updates from your schools and coaching centers">
          <div className="space-y-4">
            {activities.length > 0 ? (
              activities.map((activity) => (
                <div key={activity.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    activity.type === 'school' ? 'bg-blue-100' : 'bg-purple-100'
                  }`}>
                    <AppIcon 
                      name={activity.type === 'school' ? 'school' : 'rocket_launch'} 
                      size={20} 
                      className={activity.type === 'school' ? 'text-blue-600' : 'text-purple-600'} 
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm text-slate-900">{activity.name}</p>
                    <p className="text-xs text-slate-500">{activity.action}</p>
                  </div>
                  <p className="text-xs text-slate-400">{activity.time}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-500 text-center py-4">No recent activity</p>
            )}
          </div>
        </SectionCard>

        <SectionCard title="Quick Actions" description="Manage your entities">
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 rounded-xl border border-slate-200 hover:border-primary hover:bg-primary/5 transition-all text-left">
              <AppIcon name="school" size={24} className="text-primary mb-2" />
              <p className="font-semibold text-sm">Manage Schools</p>
              <p className="text-xs text-slate-500">View & edit your schools</p>
            </button>
            <button className="p-4 rounded-xl border border-slate-200 hover:border-primary hover:bg-primary/5 transition-all text-left">
              <AppIcon name="rocket_launch" size={24} className="text-purple-600 mb-2" />
              <p className="font-semibold text-sm">Manage Coaching</p>
              <p className="text-xs text-slate-500">View & edit your centers</p>
            </button>
            <button className="p-4 rounded-xl border border-slate-200 hover:border-primary hover:bg-primary/5 transition-all text-left">
              <AppIcon name="payments" size={24} className="text-amber-600 mb-2" />
              <p className="font-semibold text-sm">Pricing Plans</p>
              <p className="text-xs text-slate-500">Set pricing for schools</p>
            </button>
            <button className="p-4 rounded-xl border border-slate-200 hover:border-primary hover:bg-primary/5 transition-all text-left">
              <AppIcon name="group" size={24} className="text-emerald-600 mb-2" />
              <p className="font-semibold text-sm">All Students</p>
              <p className="text-xs text-slate-500">View enrolled students</p>
            </button>
          </div>
        </SectionCard>
      </div>
    </DashboardPage>
  );
}