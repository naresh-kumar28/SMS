import { useState } from 'react';
import {
  DashboardPage,
  SectionCard,
} from '../../../components/common/DashboardPrimitives';
import AppIcon from '../../../components/common/AppIcon';

const notes = [
  { id: 1, title: 'Quadratic Equations - Complete Notes', subject: 'Mathematics', pages: 12, uploadedBy: 'Mr. Rajesh Kumar', uploadedAt: '2024-01-10', downloads: 156 },
  { id: 2, title: 'Chemical Reactions Summary', subject: 'Science', pages: 8, uploadedBy: 'Ms. Priya Sharma', uploadedAt: '2024-01-08', downloads: 98 },
  { id: 3, title: 'English Grammar - Tenses', subject: 'English', pages: 15, uploadedBy: 'Ms. Sneha Gupta', uploadedAt: '2024-01-05', downloads: 210 },
  { id: 4, title: 'Indian Geography - Rivers', subject: 'Geography', pages: 6, uploadedBy: 'Mr. Rahul Verma', uploadedAt: '2024-01-12', downloads: 45 },
  { id: 5, title: 'History - Medieval Period', subject: 'History', pages: 20, uploadedBy: 'Ms. Ananya Reddy', uploadedAt: '2024-01-03', downloads: 89 },
];

export default function StudentNotes() {
  const [filter, setFilter] = useState('all');

  const filteredNotes = notes.filter(n => 
    filter === 'all' || n.subject.toLowerCase() === filter
  );

  return (
    <DashboardPage
      eyebrow="Study Materials"
      title="Notes"
      description="Download study materials from your teachers"
    >
      <div className="flex gap-2 mb-6 flex-wrap">
        {['all', 'Mathematics', 'Science', 'English', 'Geography', 'History'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              filter === f 
                ? 'bg-primary text-white' 
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {f === 'all' ? 'All' : f}
          </button>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filteredNotes.map(note => (
          <div key={note.id} className="p-6 rounded-2xl border border-slate-200 bg-white hover:border-primary/30 hover:shadow-lg transition-all">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
                <AppIcon name="picture_as_pdf" size={24} className="text-red-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-slate-900 mb-1 line-clamp-2">{note.title}</h3>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span>{note.subject}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm text-slate-600 mb-4">
              <div className="flex items-center gap-1">
                <AppIcon name="description" size={14} />
                <span>{note.pages} pages</span>
              </div>
              <div className="flex items-center gap-1">
                <AppIcon name="person" size={14} />
                <span>{note.uploadedBy}</span>
              </div>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <span className="text-xs text-slate-500">Uploaded: {note.uploadedAt}</span>
              <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
                <AppIcon name="download" size={16} />
                Download
              </button>
            </div>
          </div>
        ))}
      </div>
    </DashboardPage>
  );
}