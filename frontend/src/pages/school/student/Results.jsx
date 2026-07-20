import { useState } from 'react';
import {
  DashboardPage,
  SectionCard,
  StatusBadge,
  MetricCard,
  MetricGrid,
} from '../../../components/common/DashboardPrimitives';

const examResults = [
  { id: 1, exam: 'Unit Test 1', subject: 'Mathematics', maxMarks: 100, marks: 92, grade: 'A+', percentile: 95 },
  { id: 2, exam: 'Unit Test 1', subject: 'Science', maxMarks: 100, marks: 88, grade: 'A', percentile: 90 },
  { id: 3, exam: 'Unit Test 1', subject: 'English', maxMarks: 100, marks: 85, grade: 'A', percentile: 88 },
  { id: 4, exam: 'Unit Test 1', subject: 'History', maxMarks: 100, marks: 90, grade: 'A+', percentile: 92 },
  { id: 5, exam: 'Unit Test 1', subject: 'Geography', maxMarks: 100, marks: 87, grade: 'A', percentile: 89 },
  { id: 6, exam: 'Half Yearly', subject: 'Mathematics', maxMarks: 100, marks: 88, grade: 'A', percentile: 91 },
  { id: 7, exam: 'Half Yearly', subject: 'Science', maxMarks: 100, marks: 85, grade: 'A', percentile: 87 },
  { id: 8, exam: 'Half Yearly', subject: 'English', maxMarks: 100, marks: 82, grade: 'A-', percentile: 84 },
];

export default function StudentResults() {
  const [selectedExam, setSelectedExam] = useState('Unit Test 1');

  const filteredResults = examResults.filter(r => r.exam === selectedExam);
  const totalMarks = filteredResults.reduce((sum, r) => sum + r.marks, 0);
  const percentage = Math.round(totalMarks / filteredResults.length);

  return (
    <DashboardPage
      eyebrow="Academic"
      title="Results"
      description="View your exam results and performance"
    >
      <div className="flex gap-2 mb-6">
        {['Unit Test 1', 'Half Yearly', 'Unit Test 2', 'Final Exam'].map(exam => (
          <button
            key={exam}
            onClick={() => setSelectedExam(exam)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              selectedExam === exam 
                ? 'bg-primary text-white' 
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {exam}
          </button>
        ))}
      </div>

      <MetricGrid>
        <MetricCard icon="school" label="Total Marks" value={`${totalMarks}/${filteredResults.length * 100}`} change="Across all subjects" helper="This exam" />
        <MetricCard icon="trending_up" label="Percentage" value={`${percentage}%`} change="+5%" helper="Compared to last exam" tone="emerald" />
        <MetricCard icon="emoji_events" label="Grade" value="A" change="Excellent" helper="Overall grade" tone="emerald" />
      </MetricGrid>

      <SectionCard title="Subject-wise Performance" description={selectedExam}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-4 font-semibold text-slate-700">Subject</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-700">Marks</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-700">Grade</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-700">Percentile</th>
              </tr>
            </thead>
            <tbody>
              {filteredResults.map(result => (
                <tr key={result.id} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="py-3 px-4 font-medium text-slate-900">{result.subject}</td>
                  <td className="py-3 px-4 text-slate-600">
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full"
                          style={{ width: `${(result.marks / result.maxMarks) * 100}%` }}
                        ></div>
                      </div>
                      <span>{result.marks}/{result.maxMarks}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <StatusBadge tone={result.grade.startsWith('A') ? 'emerald' : 'amber'}>
                      {result.grade}
                    </StatusBadge>
                  </td>
                  <td className="py-3 px-4 text-slate-600">{result.percentile}th</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </DashboardPage>
  );
}