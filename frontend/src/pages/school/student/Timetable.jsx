import { useState } from 'react';
import {
  DashboardPage,
  SectionCard,
} from '../../../components/common/DashboardPrimitives';
import AppIcon from '../../../components/common/AppIcon';

const timetable = [
  { day: 'Monday', periods: [
    { time: '9:00 - 10:00', subject: 'Mathematics', teacher: 'Mr. Rajesh Kumar', room: '101' },
    { time: '10:00 - 11:00', subject: 'Science', teacher: 'Ms. Priya Sharma', room: 'Lab 3' },
    { time: '11:00 - 11:30', subject: 'Break', teacher: '', room: '' },
    { time: '11:30 - 12:30', subject: 'English', teacher: 'Ms. Sneha Gupta', room: '205' },
    { time: '12:30 - 1:30', subject: 'History', teacher: 'Ms. Ananya Reddy', room: '302' },
  ]},
  { day: 'Tuesday', periods: [
    { time: '9:00 - 10:00', subject: 'Mathematics', teacher: 'Mr. Rajesh Kumar', room: '101' },
    { time: '10:00 - 11:00', subject: 'Geography', teacher: 'Mr. Rahul Verma', room: '304' },
    { time: '11:00 - 11:30', subject: 'Break', teacher: '', room: '' },
    { time: '11:30 - 12:30', subject: 'Science', teacher: 'Ms. Priya Sharma', room: 'Lab 3' },
    { time: '12:30 - 1:30', subject: 'English', teacher: 'Ms. Sneha Gupta', room: '205' },
  ]},
  { day: 'Wednesday', periods: [
    { time: '9:00 - 10:00', subject: 'English', teacher: 'Ms. Sneha Gupta', room: '205' },
    { time: '10:00 - 11:00', subject: 'Mathematics', teacher: 'Mr. Rajesh Kumar', room: '101' },
    { time: '11:00 - 11:30', subject: 'Break', teacher: '', room: '' },
    { time: '11:30 - 12:30', subject: 'History', teacher: 'Ms. Ananya Reddy', room: '302' },
    { time: '12:30 - 1:30', subject: 'Physical Ed.', teacher: 'Mr. Vikram', room: 'Ground' },
  ]},
  { day: 'Thursday', periods: [
    { time: '9:00 - 10:00', subject: 'Science', teacher: 'Ms. Priya Sharma', room: 'Lab 3' },
    { time: '10:00 - 11:00', subject: 'Mathematics', teacher: 'Mr. Rajesh Kumar', room: '101' },
    { time: '11:00 - 11:30', subject: 'Break', teacher: '', room: '' },
    { time: '11:30 - 12:30', subject: 'Geography', teacher: 'Mr. Rahul Verma', room: '304' },
    { time: '12:30 - 1:30', subject: 'English', teacher: 'Ms. Sneha Gupta', room: '205' },
  ]},
  { day: 'Friday', periods: [
    { time: '9:00 - 10:00', subject: 'History', teacher: 'Ms. Ananya Reddy', room: '302' },
    { time: '10:00 - 11:00', subject: 'English', teacher: 'Ms. Sneha Gupta', room: '205' },
    { time: '11:00 - 11:30', subject: 'Break', teacher: '', room: '' },
    { time: '11:30 - 12:30', subject: 'Mathematics', teacher: 'Mr. Rajesh Kumar', room: '101' },
    { time: '12:30 - 1:30', subject: 'Science', teacher: 'Ms. Priya Sharma', room: 'Lab 3' },
  ]},
];

export default function StudentTimetable() {
  const [selectedDay, setSelectedDay] = useState('Monday');
  const dayTimetable = timetable.find(t => t.day === selectedDay);

  return (
    <DashboardPage
      eyebrow="Academic"
      title="Timetable"
      description="Your weekly class schedule"
    >
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(day => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
              selectedDay === day 
                ? 'bg-primary text-white' 
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      <SectionCard title={selectedDay} description="Class Schedule">
        <div className="space-y-3">
          {dayTimetable?.periods.map((period, idx) => (
            <div 
              key={idx} 
              className={`flex items-center gap-4 p-4 rounded-2xl transition-all ${
                period.subject === 'Break' ? 'bg-amber-50' : 'bg-slate-50 hover:bg-slate-100'
              }`}
            >
              <div className={`w-20 h-12 rounded-xl flex items-center justify-center font-medium ${
                period.subject === 'Break' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'
              }`}>
                {period.time}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-slate-900">{period.subject}</p>
                {period.teacher && (
                  <p className="text-sm text-slate-600">{period.teacher}</p>
                )}
              </div>
              {period.room && (
                <div className="text-sm text-slate-500">
                  <AppIcon name="room" size={16} className="inline mr-1" />
                  {period.room}
                </div>
              )}
            </div>
          ))}
        </div>
      </SectionCard>
    </DashboardPage>
  );
}