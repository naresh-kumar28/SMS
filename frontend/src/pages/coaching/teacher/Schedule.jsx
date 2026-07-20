
import {
  DashboardPage,
  SectionCard,
} from '../../../components/common/DashboardPrimitives';

const schedule = [
  { time: '9:00 - 10:00', course: 'NEET Physics - Class 11', batch: 'Morning', room: 'Room 101' },
  { time: '10:00 - 11:00', course: 'NEET Physics - Class 12', batch: 'Morning', room: 'Room 102' },
  { time: '11:30 - 12:30', course: 'JEE Physics - Class 12', batch: 'Evening', room: 'Room 103' },
  { time: '2:00 - 3:00', course: 'NEET Physics - Class 11', batch: 'Morning', room: 'Room 101' },
];

export default function CoachingTeacherSchedule() {
  return (
    <DashboardPage
      eyebrow="Academic"
      title="Schedule"
      description="Your weekly class schedule"
    >
      <SectionCard title="Today's Classes" description="">
        <div className="space-y-3">
          {schedule.map((cls, idx) => (
            <div key={idx} className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 hover:bg-slate-100">
              <div className="w-20 h-12 rounded-xl bg-blue-100 flex items-center justify-center font-medium text-blue-700">
                {cls.time}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-slate-900">{cls.course}</p>
                <p className="text-sm text-slate-600">{cls.batch} | {cls.room}</p>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
    </DashboardPage>
  );
}