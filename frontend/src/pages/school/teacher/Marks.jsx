import { useState } from 'react';
import {
  DashboardPage,
  SectionCard,
  StatusBadge,
} from '../../../components/common/DashboardPrimitives';
import AppIcon from '../../../components/common/AppIcon';
import Dropdown from '../../../components/common/Dropdown';

const mockStudentMarks = [
  { rollNo: '10A001', name: 'Rahul Sharma', marks: 92 },
  { rollNo: '10A002', name: 'Priya Patel', marks: 88 },
  { rollNo: '10A003', name: 'Amit Kumar', marks: 75 },
  { rollNo: '10A004', name: 'Sneha Gupta', marks: 95 },
  { rollNo: '10A005', name: 'Vikram Singh', marks: 68 },
];

export default function TeacherMarks() {
  const [selectedClass, setSelectedClass] = useState('Class 10-A');
  const [selectedExam, setSelectedExam] = useState('Unit Test 1');
  const [marks, setMarks] = useState(mockStudentMarks);

  const updateMarks = (rollNo, newMarks) => {
    setMarks(prev => prev.map(m => m.rollNo === rollNo ? { ...m, marks: newMarks } : m));
  };

  return (
    <DashboardPage
      eyebrow="Academic"
      title="Marks"
      description="Enter and manage student marks for exams"
    >
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <Dropdown
          label="Select Class"
          options={[
            { label: 'Class 10-A', value: 'Class 10-A' },
            { label: 'Class 10-B', value: 'Class 10-B' },
            { label: 'Class 9-A', value: 'Class 9-A' },
            { label: 'Class 9-B', value: 'Class 9-B' },
          ]}
          value={selectedClass}
          onChange={setSelectedClass}
        />
        <Dropdown
          label="Select Exam"
          options={[
            { label: 'Unit Test 1', value: 'Unit Test 1' },
            { label: 'Unit Test 2', value: 'Unit Test 2' },
            { label: 'Half Yearly', value: 'Half Yearly' },
            { label: 'Final Exam', value: 'Final Exam' },
          ]}
          value={selectedExam}
          onChange={setSelectedExam}
        />
      </div>

      <div className="grid gap-6 mb-6 md:grid-cols-3">
        <div className="p-6 rounded-2xl border border-slate-200 bg-white">
          <div className="flex items-center gap-3 mb-2">
            <AppIcon name="school" size={20} className="text-blue-600" />
            <span className="text-sm text-slate-600">Class</span>
          </div>
          <p className="text-xl font-bold text-slate-900">{selectedClass}</p>
        </div>
        <div className="p-6 rounded-2xl border border-emerald-200 bg-emerald-50">
          <div className="flex items-center gap-3 mb-2">
            <AppIcon name="trending_up" size={20} className="text-emerald-600" />
            <span className="text-sm text-emerald-700">Average Marks</span>
          </div>
          <p className="text-xl font-bold text-emerald-700">78.5</p>
        </div>
        <div className="p-6 rounded-2xl border border-purple-200 bg-purple-50">
          <div className="flex items-center gap-3 mb-2">
            <AppIcon name="emoji_events" size={20} className="text-purple-600" />
            <span className="text-sm text-purple-700">Highest Marks</span>
          </div>
          <p className="text-xl font-bold text-purple-700">98</p>
        </div>
      </div>

      <SectionCard title="Student Marks" description={`${selectedExam} - ${selectedClass}`}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-4 font-semibold text-slate-700">Roll No</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-700">Student Name</th>
                <th className="text-center py-3 px-4 font-semibold text-slate-700">Marks (out of 100)</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-700">Grade</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {marks.map(student => {
                const grade = student.marks >= 90 ? 'A+' : student.marks >= 80 ? 'A' : student.marks >= 70 ? 'B+' : student.marks >= 60 ? 'B' : 'C';
                const gradeTone = student.marks >= 90 ? 'emerald' : student.marks >= 80 ? 'blue' : student.marks >= 70 ? 'amber' : 'rose';
                return (
                  <tr key={student.rollNo} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-3 px-4 text-slate-600 font-mono">{student.rollNo}</td>
                    <td className="py-3 px-4 font-medium text-slate-900">{student.name}</td>
                    <td className="py-3 px-4 text-center">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={student.marks}
                        onChange={(e) => updateMarks(student.rollNo, parseInt(e.target.value) || 0)}
                        className="w-20 px-3 py-1.5 rounded-lg border border-slate-200 text-center font-medium focus:border-primary/30 focus:ring-2 focus:ring-primary/10"
                      />
                    </td>
                    <td className="py-3 px-4">
                      <StatusBadge tone={gradeTone}>{grade}</StatusBadge>
                    </td>
                    <td className="py-3 px-4">
                      <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-primary">
                        <AppIcon name="save" size={16} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button className="px-4 py-2.5 border border-slate-200 rounded-xl font-medium hover:bg-slate-50 transition-colors">
            Save Draft
          </button>
          <button className="px-4 py-2.5 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-colors">
            Publish Results
          </button>
        </div>
      </SectionCard>
    </DashboardPage>
  );
}