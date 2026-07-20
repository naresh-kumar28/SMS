
import {
  DashboardPage,
  SectionCard,
  StatusBadge,
} from '../../../components/common/DashboardPrimitives';
import AppIcon from '../../../components/common/AppIcon';

const assignments = [
  { id: 1, title: 'Kinematics Problems', subject: 'Physics', dueDate: '2024-01-20', status: 'pending' },
  { id: 2, title: 'Chemical Equations', subject: 'Chemistry', dueDate: '2024-01-18', status: 'submitted' },
  { id: 3, title: 'Algebra Exercise', subject: 'Mathematics', dueDate: '2024-01-15', status: 'submitted' },
];

export default function CoachingStudentAssignments() {
  return (
    <DashboardPage
      eyebrow="Academic"
      title="Assignments"
      description="View and submit your assignments"
    >
      <div className="space-y-4">
        {assignments.map(assignment => (
          <div key={assignment.id} className="p-6 rounded-2xl border border-slate-200 bg-white">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">{assignment.title}</h3>
                <p className="text-sm text-slate-600">{assignment.subject}</p>
              </div>
              <StatusBadge tone={assignment.status === 'submitted' ? 'emerald' : 'amber'}>
                {assignment.status === 'submitted' ? 'Submitted' : 'Pending'}
              </StatusBadge>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <AppIcon name="event" size={14} />
                <span>Due: {assignment.dueDate}</span>
              </div>
              {assignment.status === 'pending' ? (
                <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium">
                  Submit Now
                </button>
              ) : (
                <button className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium">
                  View
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </DashboardPage>
  );
}