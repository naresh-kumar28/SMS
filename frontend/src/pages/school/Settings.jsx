import {
  DashboardPage,
  MetricCard,
  MetricGrid,
  SectionCard,
} from '../../components/common/DashboardPrimitives';
import { useAuth } from '../../hooks/api/useAuth';
import { DashboardSkeleton } from '../../components/common/Skeleton';

export default function SchoolSettings() {
  const { isLoadingProfile } = useAuth();

  if (isLoadingProfile) {
    return (
      <DashboardPage eyebrow="School controls" title="Settings">
        <DashboardSkeleton />
      </DashboardPage>
    );
  }
  return (
    <DashboardPage
      eyebrow="School controls"
      title="Settings"
      description="Manage the academic calendar, communication preferences, and school-level rules that keep operations smooth."
    >
      <MetricGrid>
        <MetricCard icon="settings" label="Config modules" value="8" change="2 updated today" helper="School-level controls" />
        <MetricCard icon="security" label="Parent access rules" value="5" change="All enabled" helper="Security and privacy" tone="emerald" />
        <MetricCard icon="notifications" label="Notice templates" value="14" change="3 drafts open" helper="Broadcast settings" tone="amber" />
        <MetricCard icon="school" label="Academic terms" value="3" change="Current year set" helper="Calendar structure" tone="rose" />
      </MetricGrid>

      <SectionCard title="Configuration notes" description="The most important settings areas to review">
        <div className="space-y-4 text-sm text-slate-600">
          <p className="rounded-2xl bg-slate-50 p-4">Academic calendar rules are aligned to the current session and board timeline.</p>
          <p className="rounded-2xl bg-slate-50 p-4">Parent notification defaults are set for instant delivery on attendance changes.</p>
          <p className="rounded-2xl bg-slate-50 p-4">Document permissions are restricted to admissions and academic office roles.</p>
        </div>
      </SectionCard>
    </DashboardPage>
  );
}
