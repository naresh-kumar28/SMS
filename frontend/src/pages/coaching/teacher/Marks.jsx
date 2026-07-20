
import {
  DashboardPage,
  SectionCard,
  StatusBadge,
  MetricCard,
  MetricGrid,
} from '../../../components/common/DashboardPrimitives';

const marksData = [
  { exam: 'Unit Test 1', course: 'NEET Physics - Class 11', avgMarks: 78, highest: 98, students: 45 },
  { exam: 'Unit Test 1', course: 'NEET Physics - Class 12', avgMarks: 75, highest: 95, students: 42 },
];

export default function CoachingTeacherMarks() {
  return (
    <DashboardPage
      eyebrow="Academic"
      title="Marks"
      description="Enter and manage student marks"
    >
      <MetricGrid>
        <MetricCard icon="school" label="Total Exams" value="2" change="This month" helper="Conducted" />
        <MetricCard icon="trending_up" label="Avg Marks" value="76.5%" change="+2%" helper="All courses" tone="emerald" />
        <MetricCard icon="emoji_events" label="Highest" value="98" change="Physics" helper="Class 11" tone="blue" />
      </MetricGrid>

      <SectionCard title="Exam Results" description="Recent exam performance">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-4 font-semibold text-slate-700">Exam</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-700">Course</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-700">Avg Marks</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-700">Highest</th>
              </tr>
            </thead>
            <tbody>
              {marksData.map((data, idx) => (
                <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="py-3 px-4 font-medium text-slate-900">{data.exam}</td>
                  <td className="py-3 px-4 text-slate-600">{data.course}</td>
                  <td className="py-3 px-4 text-slate-600">{data.avgMarks}%</td>
                  <td className="py-3 px-4 text-slate-600">{data.highest}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </DashboardPage>
  );
}