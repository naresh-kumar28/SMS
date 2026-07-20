import { useState } from 'react';
import {
  DashboardPage,
  SectionCard,
  StatusBadge,
} from '../../../components/common/DashboardPrimitives';
import AppIcon from '../../../components/common/AppIcon';
import Dropdown from '../../../components/common/Dropdown';

const mockStudents = [
  { id: 1, name: 'Rahul Sharma', rollNo: '10A001', class: 'Class 10-A', attendance: 96, performance: 'Excellent' },
  { id: 2, name: 'Priya Patel', rollNo: '10A002', class: 'Class 10-A', attendance: 94, performance: 'Good' },
  { id: 3, name: 'Amit Kumar', rollNo: '10A003', class: 'Class 10-A', attendance: 88, performance: 'Average' },
  { id: 4, name: 'Sneha Gupta', rollNo: '10B001', class: 'Class 10-B', attendance: 92, performance: 'Good' },
  { id: 5, name: 'Vikram Singh', rollNo: '9A001', class: 'Class 9-A', attendance: 90, performance: 'Good' },
  { id: 6, name: 'Anjali Reddy', rollNo: '9A002', class: 'Class 9-A', attendance: 98, performance: 'Excellent' },
  { id: 7, name: 'Raj Malhotra', rollNo: '9B001', class: 'Class 9-B', attendance: 85, performance: 'Average' },
  { id: 8, name: 'Meera Joshi', rollNo: '9B002', class: 'Class 9-B', attendance: 91, performance: 'Good' },
];

export default function TeacherMyStudents() {
  const [selectedClass, setSelectedClass] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredStudents = mockStudents.filter(student => {
    const matchesClass = selectedClass === 'all' || student.class === selectedClass;
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.rollNo.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesClass && matchesSearch;
  });

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
      description="View students assigned to your classes"
    >
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex-1 min-w-[200px]">
          <input
            type="text"
            placeholder="Search by name or roll number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-primary/30 focus:ring-2 focus:ring-primary/10 text-sm"
          />
        </div>
        <Dropdown
          label="Filter by Class"
          options={[
            { label: 'All Classes', value: 'all' },
            { label: 'Class 10-A', value: 'Class 10-A' },
            { label: 'Class 10-B', value: 'Class 10-B' },
            { label: 'Class 9-A', value: 'Class 9-A' },
            { label: 'Class 9-B', value: 'Class 9-B' },
          ]}
          value={selectedClass}
          onChange={setSelectedClass}
        />
      </div>

      <SectionCard title="" description="">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-4 font-semibold text-slate-700">Roll No</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-700">Student Name</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-700">Class</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-700">Attendance</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-700">Performance</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map(student => (
                <tr key={student.id} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="py-3 px-4 text-slate-600 font-mono">{student.rollNo}</td>
                  <td className="py-3 px-4 font-medium text-slate-900">{student.name}</td>
                  <td className="py-3 px-4 text-slate-600">{student.class}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-500 rounded-full"
                          style={{ width: `${student.attendance}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-slate-600">{student.attendance}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <StatusBadge tone={getPerformanceTone(student.performance)}>
                      {student.performance}
                    </StatusBadge>
                  </td>
                  <td className="py-3 px-4">
                    <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-primary">
                      <AppIcon name="visibility" size={18} />
                    </button>
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