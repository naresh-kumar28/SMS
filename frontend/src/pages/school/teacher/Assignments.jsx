import { useState } from 'react';
import {
  DashboardPage,
  SectionCard,
  StatusBadge,
} from '../../../components/common/DashboardPrimitives';
import AppIcon from '../../../components/common/AppIcon';
import Dropdown from '../../../components/common/Dropdown';

const mockAssignments = [
  { id: 1, title: 'Chapter 5 - Algebra Exercises', class: 'Class 10-A', subject: 'Mathematics', dueDate: '2024-01-20', submissions: 28, total: 42, status: 'active' },
  { id: 2, title: 'Linear Equations Worksheet', class: 'Class 10-B', subject: 'Mathematics', dueDate: '2024-01-18', submissions: 35, total: 38, status: 'active' },
  { id: 3, title: 'Geometry Proof Problems', class: 'Class 9-A', subject: 'Mathematics', dueDate: '2024-01-15', submissions: 45, total: 45, status: 'completed' },
  { id: 4, title: 'Number System Quiz', class: 'Class 9-B', subject: 'Mathematics', dueDate: '2024-01-22', submissions: 0, total: 40, status: 'draft' },
];

export default function TeacherAssignments() {
  const [selectedClass, setSelectedClass] = useState('all');

  const filteredAssignments = mockAssignments.filter(a => 
    selectedClass === 'all' || a.class === selectedClass
  );

  const getStatusTone = (status) => {
    switch (status) {
      case 'active': return 'emerald';
      case 'completed': return 'blue';
      case 'draft': return 'amber';
      default: return 'slate';
    }
  };

  return (
    <DashboardPage
      eyebrow="Academic"
      title="Assignments"
      description="Create and manage assignments for your classes"
    >
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div className="flex-1 min-w-[200px]">
          <div className="relative">
            <AppIcon name="search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search assignments..."
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

      <div className="space-y-4">
        {filteredAssignments.map(assignment => (
          <div key={assignment.id} className="p-6 rounded-2xl border border-slate-200 bg-white hover:border-primary/30 hover:shadow-lg transition-all">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">{assignment.title}</h3>
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <span>{assignment.class}</span>
                  <span className="text-slate-300">|</span>
                  <span>{assignment.subject}</span>
                </div>
              </div>
              <StatusBadge tone={getStatusTone(assignment.status)}>
                {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
              </StatusBadge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2 text-slate-600">
                  <AppIcon name="event" size={16} />
                  <span>Due: {assignment.dueDate}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <AppIcon name="folder_open" size={16} />
                  <span>{assignment.submissions}/{assignment.total} submissions</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-primary">
                  <AppIcon name="visibility" size={18} />
                </button>
                <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-primary">
                  <AppIcon name="edit" size={18} />
                </button>
              </div>
            </div>
            <div className="mt-4 h-2 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary rounded-full"
                style={{ width: `${(assignment.submissions / assignment.total) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </DashboardPage>
  );
}