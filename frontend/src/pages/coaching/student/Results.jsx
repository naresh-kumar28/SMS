import {
  DashboardPage,
  SectionCard,
  StatusBadge,
  MetricCard,
  MetricGrid,
} from '../../../components/common/DashboardPrimitives';

const results = [
  { id: 1, exam: 'Unit Test 1', subject: 'Physics', marks: 92, maxMarks: 100, grade: 'A+' },
  { id: 2, exam: 'Unit Test 1', subject: 'Chemistry', marks: 88, maxMarks: 100, grade: 'A' },
  { id: 3, exam: 'Unit Test 1', subject: 'Mathematics', marks: 85, maxMarks: 100, grade: 'A' },
];

export default function CoachingStudentResults() {
  const totalMarks = results.reduce((sum, r) => sum + r.marks, 0);
  const percentage = Math.round(totalMarks / results.length);

  return (
    <DashboardPage
      eyebrow="Academic"
      title="Results"
      description="View your exam results"
    >
      <MetricGrid>
        <MetricCard icon="trending_up" label="Percentage" value={`${percentage}%`} change="+5%" helper="This exam" tone="emerald" />
        <MetricCard icon="emoji_events" label="Grade" value="A+" change="Excellent" helper="Overall" tone="emerald" />
      </MetricGrid>

      <SectionCard title="Subject-wise Performance" description="Unit Test 1">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-4 font-semibold text-slate-700">Subject</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-700">Marks</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-700">Grade</th>
              </tr>
            </thead>
            <tbody>
              {results.map(result => (
                <tr key={result.id} className="border-b border-slate-100">
                  <td className="py-3 px-4 font-medium text-slate-900">{result.subject}</td>
                  <td className="py-3 px-4 text-slate-600">{result.marks}/{result.maxMarks}</td>
                  <td className="py-3 px-4">
                    <StatusBadge tone="emerald">{result.grade}</StatusBadge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </DashboardPage>
  );
}