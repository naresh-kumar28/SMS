
import {
  DashboardPage,
  SectionCard,
} from '../../../components/common/DashboardPrimitives';
import AppIcon from '../../../components/common/AppIcon';

const notes = [
  { id: 1, title: 'Kinematics - Complete Notes', course: 'NEET Physics - Class 11', pages: 12, uploadedAt: '2024-01-10', downloads: 156 },
  { id: 2, title: 'Laws of Motion - Summary', course: 'NEET Physics - Class 12', pages: 8, uploadedAt: '2024-01-08', downloads: 98 },
  { id: 3, title: 'Work and Energy - Notes', course: 'JEE Physics - Class 12', pages: 15, uploadedAt: '2024-01-05', downloads: 210 },
];

export default function CoachingTeacherNotes() {
  return (
    <DashboardPage
      eyebrow="Study Materials"
      title="Notes"
      description="Upload and manage study materials"
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {notes.map(note => (
          <div key={note.id} className="p-6 rounded-2xl border border-slate-200 bg-white hover:border-primary/30 hover:shadow-lg transition-all">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
                <AppIcon name="picture_as_pdf" size={24} className="text-red-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-slate-900 mb-1">{note.title}</h3>
                <p className="text-xs text-slate-500">{note.course}</p>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm text-slate-600 mb-4">
              <span>{note.pages} pages</span>
              <span>{note.downloads} downloads</span>
            </div>
            <div className="pt-4 border-t border-slate-100 flex gap-2">
              <button className="flex-1 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium">
                Edit
              </button>
              <button className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </DashboardPage>
  );
}