import {
  DashboardPage,
  SectionCard,
} from '../../../components/common/DashboardPrimitives';

const schedule = [
  { time: '9:00 - 10:00', subject: 'Physics', teacher: 'Dr. Amit Kumar', room: '101' },
  { time: '10:00 - 11:00', subject: 'Chemistry', teacher: 'Ms. Priya Sharma', room: 'Lab 3' },
  { time: '11:30 - 12:30', subject: 'Mathematics', teacher: 'Mr. Rahul Verma', room: '102' },
];

export default function CoachingStudentSchedule() {
  return (
    <DashboardPage
      eyebrow="Academic"
      title="Schedule"
      description="Your weekly class schedule"
    >
      <SectionCard title="Today's Classes" description="">
        <div className="space-y-3">
          {schedule.map((cls, idx) => (
            <div key={idx} className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50">
              <div className="w-20 h-12 rounded-xl bg-blue-100 flex items-center justify-center font-medium text-blue-700">
                {cls.time}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-slate-900">{cls.subject}</p>
                <p className="text-sm text-slate-600">{cls.teacher} | {cls.room}</p>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
    </DashboardPage>
  );
}