import {
  DashboardPage,
  SectionCard,
} from '../../../components/common/DashboardPrimitives';

export default function CoachingStudentMessages() {
  return (
    <DashboardPage
      eyebrow="Communication"
      title="Messages"
      description="Communicate with your teachers"
    >
      <SectionCard title="Conversations" description="">
        <p className="text-slate-500 text-center py-8">No messages yet</p>
      </SectionCard>
    </DashboardPage>
  );
}