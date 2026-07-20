import {
  DashboardPage,
  SectionCard,
} from '../../../components/common/DashboardPrimitives';
import AppIcon from '../../../components/common/AppIcon';

const courses = [
  { id: 1, name: 'NEET Physics', teacher: 'Dr. Amit Kumar', progress: 75, duration: '3 months' },
  { id: 2, name: 'NEET Chemistry', teacher: 'Ms. Priya Sharma', progress: 60, duration: '3 months' },
];

export default function CoachingStudentCourses() {
  return (
    <DashboardPage
      eyebrow="Academic"
      title="My Courses"
      description="View your enrolled courses"
    >
      <div className="grid gap-6 md:grid-cols-2">
        {courses.map(course => (
          <div key={course.id} className="p-6 rounded-2xl border border-slate-200 bg-white">
            <h3 className="text-lg font-bold text-slate-900 mb-2">{course.name}</h3>
            <p className="text-sm text-slate-600 mb-4">Teacher: {course.teacher}</p>
            <div className="mb-2">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-600">Progress</span>
                <span className="font-medium">{course.progress}%</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full">
                <div className="h-full bg-primary rounded-full" style={{ width: `${course.progress}%` }}></div>
              </div>
            </div>
            <p className="text-xs text-slate-500">Duration: {course.duration}</p>
          </div>
        ))}
      </div>
    </DashboardPage>
  );
}