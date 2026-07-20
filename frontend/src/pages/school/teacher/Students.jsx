import { useState } from 'react';
import {
  DashboardPage,
  SectionCard,
  StatusBadge,
} from '../../../components/common/DashboardPrimitives';
import AppIcon from '../../../components/common/AppIcon';
import Dropdown from '../../../components/common/Dropdown';
import { useMemberships } from '../../../hooks/api/useInstitutions';
import { useAuth } from '../../../hooks/api/useAuth';

export default function SchoolTeacherStudents() {
  const { authState } = useAuth();
  const institutionId = authState?.roleInfo?.institution_id;
  const { data: studentsData = [], isLoading } = useMemberships(institutionId, 'STUDENT');

  const [selectedClass, setSelectedClass] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const students = studentsData.map((membership, index) => {
    const user = membership.user || {};
    return {
      id: membership.id,
      name: `${user.first_name || ''} ${user.last_name || ''}`.trim() || user.email,
      rollNo: user.email?.split('@')[0] || `STU${index + 1}`,
      class: 'Class 10-A', // Mocking class mapping
      attendance: Math.floor(Math.random() * (100 - 80 + 1) + 80), // Mock attendance
      performance: ['Excellent', 'Good', 'Average'][Math.floor(Math.random() * 3)], // Mock performance
    };
  });

  const filteredStudents = students.filter(student => {
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
          <div className="relative">
            <AppIcon name="search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name or roll number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-primary/30 focus:ring-2 focus:ring-primary/10 text-sm"
            />
          </div>
        </div>
        <Dropdown
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
              {isLoading ? (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-slate-500">
                    Loading students...
                  </td>
                </tr>
              ) : filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-slate-500">
                    No students found.
                  </td>
                </tr>
              ) : (
                filteredStudents.map(student => (
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
                ))
              )}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </DashboardPage>
  );
}