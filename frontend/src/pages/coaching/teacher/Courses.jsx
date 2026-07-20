
import {
  DashboardPage,
  SectionCard,
  StatusBadge,
} from '../../../components/common/DashboardPrimitives';
import AppIcon from '../../../components/common/AppIcon';

const courses = [
  { id: 1, name: 'NEET Physics - Class 11', students: 45, batches: 'Morning', status: 'active' },
  { id: 2, name: 'NEET Physics - Class 12', students: 42, batches: 'Morning', status: 'active' },
  { id: 3, name: 'JEE Physics - Class 12', students: 38, batches: 'Evening', status: 'active' },
];

export default function CoachingTeacherCourses() {
  return (
    <DashboardPage
      eyebrow="Academic"
      title="My Courses"
      description="View your assigned courses"
    >
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {courses.map(course => (
          <div key={course.id} className="p-6 rounded-2xl border border-slate-200 bg-white hover:border-primary/30 hover:shadow-lg transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                <AppIcon name="school" size={24} className="text-blue-600" />
              </div>
              <StatusBadge tone="emerald">{course.status}</StatusBadge>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">{course.name}</h3>
            <div className="flex items-center justify-between text-sm text-slate-600">
              <div className="flex items-center gap-1">
                <AppIcon name="group" size={14} />
                <span>{course.students} students</span>
              </div>
              <div className="flex items-center gap-1">
                <AppIcon name="schedule" size={14} />
                <span>{course.batches}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </DashboardPage>
  );
}