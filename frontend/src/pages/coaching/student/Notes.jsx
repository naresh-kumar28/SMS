import {
  DashboardPage,
  SectionCard,
} from '../../../components/common/DashboardPrimitives';
import AppIcon from '../../../components/common/AppIcon';

const notes = [
  { id: 1, title: 'Kinematics - Complete Notes', subject: 'Physics', pages: 12, teacher: 'Dr. Amit Kumar' },
  { id: 2, title: 'Chemical Reactions', subject: 'Chemistry', pages: 8, teacher: 'Ms. Priya Sharma' },
];

export default function CoachingStudentNotes() {
  return (
    <DashboardPage
      eyebrow="Study Materials"
      title="Notes"
      description="Download study materials"
    >
      <div className="grid gap-4 md:grid-cols-2">
        {notes.map(note => (
          <div key={note.id} className="p-6 rounded-2xl border border-slate-200 bg-white">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
                <AppIcon name="picture_as_pdf" size={24} className="text-red-600" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">{note.title}</h3>
                <p className="text-xs text-slate-500">{note.subject} | {note.teacher}</p>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600">{note.pages} pages</span>
              <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium">
                Download
              </button>
            </div>
          </div>
        ))}
      </div>
    </DashboardPage>
  );
}