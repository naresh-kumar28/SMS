import { useState } from 'react';
import {
  DashboardPage,
  SectionCard,
  StatusBadge,
} from '../../../components/common/DashboardPrimitives';
import AppIcon from '../../../components/common/AppIcon';

const students = [
  { id: 1, name: 'Aarav Sharma', rollNo: 'NEET001', course: 'NEET Physics', attendance: 96, performance: 'Excellent' },
  { id: 2, name: 'Priya Singh', rollNo: 'NEET002', course: 'NEET Physics', attendance: 94, performance: 'Good' },
  { id: 3, name: 'Rahul Verma', rollNo: 'NEET003', course: 'NEET Physics', attendance: 88, performance: 'Average' },
  { id: 4, name: 'Sneha Gupta', rollNo: 'NEET004', course: 'NEET Physics', attendance: 92, performance: 'Good' },
  { id: 5, name: 'Kunal Patel', rollNo: 'NEET005', course: 'NEET Physics', attendance: 90, performance: 'Good' },
];

export default function CoachingTeacherStudents() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.rollNo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getPerformanceTone = (performance) => {
    switch (performance) {
      case 'Excellent': return 'emerald';
      case 'Good': return 'blue';
      case 'Average': return 'amber';
      default: return 'slate';
    }
  };

  return (
    <DashboardPage
      eyebrow="Students"
      title="My Students"
      description="View students in your courses"
    >
      <div className="mb-6">
        <div className="relative max-w-md">
          <AppIcon name="search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name or roll number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm"
          />
        </div>
      </div>

      <SectionCard title="" description="">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-4 font-semibold text-slate-700">Roll No</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-700">Student Name</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-700">Course</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-700">Attendance</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-700">Performance</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map(student => (
                <tr key={student.id} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="py-3 px-4 text-slate-600 font-mono">{student.rollNo}</td>
                  <td className="py-3 px-4 font-medium text-slate-900">{student.name}</td>
                  <td className="py-3 px-4 text-slate-600">{student.course}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${student.attendance}%` }}></div>
                      </div>
                      <span className="text-xs text-slate-600">{student.attendance}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <StatusBadge tone={getPerformanceTone(student.performance)}>{student.performance}</StatusBadge>
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