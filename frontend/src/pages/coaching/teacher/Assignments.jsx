
import {
  DashboardPage,
  SectionCard,
  StatusBadge,
} from '../../../components/common/DashboardPrimitives';
import AppIcon from '../../../components/common/AppIcon';

const assignments = [
  { id: 1, title: 'Chapter 5 - Kinematics Problems', course: 'NEET Physics - Class 11', dueDate: '2024-01-20', submissions: 28, total: 45, status: 'active' },
  { id: 2, title: 'Wave Motion - Numerical Problems', course: 'NEET Physics - Class 12', dueDate: '2024-01-18', submissions: 35, total: 42, status: 'active' },
  { id: 3, title: "Newton's Laws - Exercise", course: 'JEE Physics - Class 12', dueDate: '2024-01-15', submissions: 38, total: 38, status: 'completed' },
];

export default function CoachingTeacherAssignments() {
  return (
    <DashboardPage
      eyebrow="Academic"
      title="Assignments"
      description="Create and manage assignments"
    >
      <div className="space-y-4">
        {assignments.map(assignment => (
          <div key={assignment.id} className="p-6 rounded-2xl border border-slate-200 bg-white hover:border-primary/30 hover:shadow-lg transition-all">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">{assignment.title}</h3>
                <p className="text-sm text-slate-600">{assignment.course}</p>
              </div>
              <StatusBadge tone={assignment.status === 'active' ? 'emerald' : 'blue'}>
                {assignment.status}
              </StatusBadge>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <div className="flex items-center gap-4 text-sm text-slate-600">
                <div className="flex items-center gap-1">
                  <AppIcon name="event" size={14} />
                  <span>Due: {assignment.dueDate}</span>
                </div>
                <div className="flex items-center gap-1">
                  <AppIcon name="folder_open" size={14} />
                  <span>{assignment.submissions}/{assignment.total}</span>
                </div>
              </div>
              <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium">
                View
              </button>
            </div>
          </div>
        ))}
      </div>
    </DashboardPage>
  );
}