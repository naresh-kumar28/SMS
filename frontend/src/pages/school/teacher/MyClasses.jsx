import { useState } from 'react';
import {
  DashboardPage,
  SectionCard,
  StatusBadge,
} from '../../../components/common/DashboardPrimitives';
import AppIcon from '../../../components/common/AppIcon';

const mockClasses = [
  { id: 1, name: 'Class 10-A', section: 'A', subject: 'Mathematics', students: 42, timing: '9:00 AM - 10:00 AM' },
  { id: 2, name: 'Class 10-B', section: 'B', subject: 'Mathematics', students: 38, timing: '10:00 AM - 11:00 AM' },
  { id: 3, name: 'Class 9-A', section: 'A', subject: 'Mathematics', students: 45, timing: '11:30 AM - 12:30 PM' },
  { id: 4, name: 'Class 9-B', section: 'B', subject: 'Mathematics', students: 40, timing: '2:00 PM - 3:00 PM' },
];

export default function TeacherMyClasses() {
  const [selectedClass, setSelectedClass] = useState(null);

  return (
    <DashboardPage
      eyebrow="Academic"
      title="My Classes"
      description="View and manage your assigned classes"
    >
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {mockClasses.map(cls => (
          <div
            key={cls.id}
            onClick={() => setSelectedClass(cls)}
            className="cursor-pointer p-6 rounded-2xl border border-slate-200 hover:border-primary/30 hover:shadow-lg transition-all bg-white"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                <AppIcon name="school" size={24} className="text-blue-600" />
              </div>
              <StatusBadge tone="emerald">Active</StatusBadge>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">{cls.name}</h3>
            <p className="text-sm text-slate-600 mb-3">{cls.subject}</p>
            <div className="flex items-center gap-4 text-xs text-slate-500">
              <div className="flex items-center gap-1">
                <AppIcon name="group" size={14} />
                <span>{cls.students} students</span>
              </div>
              <div className="flex items-center gap-1">
                <AppIcon name="schedule" size={14} />
                <span>{cls.timing}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedClass && (
        <SectionCard
          title={`Students in ${selectedClass.name}`}
          description={`${selectedClass.students} students enrolled`}
          className="mt-6"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">Roll No</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">Student Name</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">Attendance</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">Performance</th>
                </tr>
              </thead>
              <tbody>
                {[...Array(8)].map((_, i) => (
                  <tr key={i} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-3 px-4 text-slate-600">{i + 1}</td>
                    <td className="py-3 px-4 font-medium text-slate-900">Student {i + 1}</td>
                    <td className="py-3 px-4">
                      <StatusBadge tone="emerald">95%</StatusBadge>
                    </td>
                    <td className="py-3 px-4">
                      <StatusBadge tone="blue">Good</StatusBadge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>
      )}
    </DashboardPage>
  );
}