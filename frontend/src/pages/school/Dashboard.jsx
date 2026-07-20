import { useOutletContext } from 'react-router-dom';
import {
  DashboardPage,
  MetricCard,
  MetricGrid,
  SectionCard,
} from '../../components/common/DashboardPrimitives';
import { useAuth } from '../../hooks/api/useAuth';
import { DashboardSkeleton } from '../../components/common/Skeleton';
import { useSchoolDashboardMetrics } from '../../hooks/api/useSchool';
import AppIcon from '../../components/common/AppIcon';

export default function SchoolOverview() {
  const { schoolName } = useOutletContext();
  const { isLoadingProfile } = useAuth();
  const { data: dashboardData, isLoading: isLoadingMetrics } = useSchoolDashboardMetrics();

  if (isLoadingProfile || isLoadingMetrics) {
    return (
      <DashboardPage eyebrow="School dashboard" title="Overview">
        <DashboardSkeleton />
      </DashboardPage>
    );
  }
  
  const metrics = dashboardData?.metrics || [];
  const activities = dashboardData?.recent_activities || [];

  return (
    <DashboardPage
      eyebrow="School dashboard"
      title={`${schoolName || 'Overview'}`}
    >
      <MetricGrid>
        {metrics.map((stat, i) => (
          <MetricCard
            key={i}
            icon={stat.icon}
            label={stat.label}
            value={stat.value}
            change={stat.change}
            helper={stat.helper}
            tone={stat.tone}
          />
        ))}
      </MetricGrid>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SectionCard title="Recent Activity" description="Latest updates from your school">
          <div className="space-y-4">
            {activities.length > 0 ? (
              activities.map((activity) => (
                <div key={activity.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    activity.type === 'system' ? 'bg-blue-100' : 'bg-purple-100'
                  }`}>
                    <AppIcon 
                      name={activity.type === 'system' ? 'settings' : 'notifications'} 
                      size={20} 
                      className={activity.type === 'system' ? 'text-blue-600' : 'text-purple-600'} 
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
              <div className="text-center py-8">
                <p className="text-sm text-slate-500">No recent activity</p>
              </div>
            )}
          </div>
        </SectionCard>

        <SectionCard title="Operational health" description="A simple pulse across school functions">
          <div className="space-y-4 text-sm text-slate-600">
            <p className="rounded-2xl bg-slate-50 p-4">Admissions desk is clearing requests within the same day.</p>
            <p className="rounded-2xl bg-slate-50 p-4">Teacher roster is fully staffed for the current timetable.</p>
            <p className="rounded-2xl bg-slate-50 p-4">Attendance sync is healthy across all sections.</p>
          </div>
        </SectionCard>
      </div>
    </DashboardPage>
  );
}
