import { useState } from 'react';
import AppIcon from '../../components/common/AppIcon';
import {
  DashboardPage,
  SectionCard,
} from '../../components/common/DashboardPrimitives';

const messages = [
  { id: 1, from: 'Delhi Public School', subject: 'Regarding fee structure', preview: 'We would like to discuss the new fee structure...', time: '2 hours ago', unread: true },
  { id: 2, from: 'TechCoach Institute', subject: 'New teacher onboarding', preview: 'Please approve the new teacher request...', time: '1 day ago', unread: true },
  { id: 3, from: 'St. Mary\'s Academy', subject: 'Thank you!', preview: 'Thank you for the excellent support...', time: '3 days ago', unread: false },
];

export default function PartnerMessages() {
  const [selected, setSelected] = useState(messages[0]);

  return (
    <DashboardPage
      eyebrow="Partner Dashboard"
      title="Messages"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <SectionCard title="Inbox" description="Your messages">
          <div className="space-y-2">
            {messages.map((msg) => (
              <button
                key={msg.id}
                onClick={() => setSelected(msg)}
                className={`w-full p-3 rounded-xl text-left transition-colors ${
                  selected.id === msg.id
                    ? 'bg-primary/5 border border-primary/20'
                    : 'border border-transparent hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <p className="font-semibold text-sm text-slate-900">{msg.from}</p>
                  {msg.unread && <div className="w-2 h-2 bg-primary rounded-full" />}
                </div>
                <p className="text-xs font-medium text-slate-700 truncate">{msg.subject}</p>
                <p className="text-xs text-slate-400 mt-1">{msg.time}</p>
              </button>
            ))}
          </div>
        </SectionCard>

        <div className="lg:col-span-2">
          <SectionCard title="Message" description={selected.from}>
            <div className="h-full">
              <div className="mb-4 pb-4 border-b border-slate-200">
                <h3 className="font-semibold text-lg text-slate-900">{selected.subject}</h3>
                <p className="text-sm text-slate-500">From: {selected.from}</p>
              </div>
              <div className="mb-6">
                <p className="text-sm text-slate-700 leading-relaxed">
                  {selected.preview} We appreciate your partnership and look forward to continuing our collaboration. 
                  Please let us know if you need any additional information or have any questions.
                </p>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium">
                  Reply
                </button>
                <button className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium">
                  Forward
                </button>
              </div>
            </div>
          </SectionCard>
        </div>
      </div>
    </DashboardPage>
  );
}