import { useState } from 'react';
import {
  DashboardPage,
  SectionCard,
  StatusBadge,
} from '../../../components/common/DashboardPrimitives';
import AppIcon from '../../../components/common/AppIcon';
import Dropdown from '../../../components/common/Dropdown';

const mockNotes = [
  { id: 1, title: 'Quadratic Equations - Complete Notes', class: 'Class 10-A', subject: 'Mathematics', pages: 12, uploadedAt: '2024-01-10', downloads: 156, status: 'published' },
  { id: 2, title: 'Chapter 3 - Linear Equations', class: 'Class 10-B', subject: 'Mathematics', pages: 8, uploadedAt: '2024-01-08', downloads: 98, status: 'published' },
  { id: 3, title: 'Number System - Class 9', class: 'Class 9-A', subject: 'Mathematics', pages: 15, uploadedAt: '2024-01-05', downloads: 210, status: 'published' },
  { id: 4, title: 'Geometry - theorems summary', class: 'Class 9-B', subject: 'Mathematics', pages: 6, uploadedAt: '2024-01-12', downloads: 45, status: 'draft' },
];

export default function TeacherNotes() {
  const [selectedClass, setSelectedClass] = useState('all');

  const filteredNotes = mockNotes.filter(n => 
    selectedClass === 'all' || n.class === selectedClass
  );

  return (
    <DashboardPage
      eyebrow="Study Materials"
      title="Notes"
      description="Upload and manage study materials for your classes"
    >
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div className="flex-1 min-w-[200px]">
          <div className="relative">
            <AppIcon name="search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search notes..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-primary/30 focus:ring-2 focus:ring-primary/10 text-sm"
            />
          </div>
        </div>
        <Dropdown
          options={[
            { label: 'All Classes', value: 'all' },
            { label: 'Class 10-A', value: 'Class 10-A' },
            { label: 'Class 10-B', value: 'Class 10-B' },
            { label: 'Class 9-A', value: 'Class 9-A' },
            { label: 'Class 9-B', value: 'Class 9-B' },
          ]}
          value={selectedClass}
          onChange={setSelectedClass}
        />
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
                  <span>{note.class}</span>
                  <span className="text-slate-300">•</span>
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
                <AppIcon name="download" size={14} />
                <span>{note.downloads} downloads</span>
              </div>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <span className="text-xs text-slate-500">Uploaded: {note.uploadedAt}</span>
              <div className="flex items-center gap-2">
                <StatusBadge tone={note.status === 'published' ? 'emerald' : 'amber'}>
                  {note.status}
                </StatusBadge>
                <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-primary">
                  <AppIcon name="edit" size={16} />
                </button>
                <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-rose-600">
                  <AppIcon name="delete" size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </DashboardPage>
  );
}