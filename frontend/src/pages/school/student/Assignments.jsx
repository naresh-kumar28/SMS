import { useState } from 'react';
import {
  DashboardPage,
  SectionCard,
  StatusBadge,
} from '../../../components/common/DashboardPrimitives';
import AppIcon from '../../../components/common/AppIcon';

const assignments = [
  { id: 1, title: 'Quadratic Equations - Exercise 5.1', subject: 'Mathematics', dueDate: '2024-01-20', status: 'pending', description: 'Solve all questions from exercise 5.1, page 45-47' },
  { id: 2, title: 'Chemical Reactions - Chapter 3', subject: 'Science', dueDate: '2024-01-18', status: 'submitted', description: 'Write balanced equations for all reactions in Chapter 3' },
  { id: 3, title: 'Essay: My Future Goal', subject: 'English', dueDate: '2024-01-22', status: 'pending', description: 'Write 500 words essay on your future goal' },
  { id: 4, title: 'Map Work: Indian Rivers', subject: 'Geography', dueDate: '2024-01-15', status: 'submitted', description: 'Mark all major rivers of India on outline map' },
  { id: 5, title: 'History: Revolt of 1857', subject: 'History', dueDate: '2024-01-12', status: 'submitted', description: 'Write short notes on 5 leaders of 1857 revolt' },
];

export default function StudentAssignments() {
  const [filter, setFilter] = useState('all');

  const filteredAssignments = assignments.filter(a => 
    filter === 'all' || a.status === filter
  );

  return (
    <DashboardPage
      eyebrow="Academic"
      title="Assignments"
      description="View and submit your assignments"
    >
      <div className="flex gap-2 mb-6">
        {['all', 'pending', 'submitted'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              filter === f 
                ? 'bg-primary text-white' 
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filteredAssignments.map(assignment => (
          <div key={assignment.id} className="p-6 rounded-2xl border border-slate-200 bg-white hover:border-primary/30 hover:shadow-lg transition-all">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">{assignment.title}</h3>
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <span>{assignment.subject}</span>
                </div>
              </div>
              <StatusBadge tone={assignment.status === 'submitted' ? 'emerald' : 'amber'}>
                {assignment.status === 'submitted' ? 'Submitted' : 'Pending'}
              </StatusBadge>
            </div>
            <p className="text-sm text-slate-600 mb-4">{assignment.description}</p>
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <AppIcon name="event" size={16} />
                <span>Due: {assignment.dueDate}</span>
              </div>
              {assignment.status === 'pending' ? (
                <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
                  Submit Now
                </button>
              ) : (
                <button className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">
                  View Submission
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </DashboardPage>
  );
}