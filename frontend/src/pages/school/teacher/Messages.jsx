import { useState } from 'react';
import {
  DashboardPage,
  SectionCard,
} from '../../../components/common/DashboardPrimitives';
import AppIcon from '../../../components/common/AppIcon';

const mockConversations = [
  { id: 1, name: 'Priya Patel (Parent)', avatar: '', lastMessage: 'Thank you for the update on my child\'s progress.', time: '2 min ago', unread: 2 },
  { id: 2, name: 'Amit Kumar (Parent)', avatar: '', lastMessage: 'When is the next parent-teacher meeting?', time: '1 hour ago', unread: 0 },
  { id: 3, name: 'School Admin', avatar: '', lastMessage: 'Please submit the attendance report by 4 PM.', time: '3 hours ago', unread: 1 },
  { id: 4, name: 'Sneha Gupta (Parent)', avatar: '', lastMessage: 'Can I get the math notes for Chapter 5?', time: 'Yesterday', unread: 0 },
];

const mockMessages = [
  { id: 1, sender: 'parent', text: 'Hello, I wanted to check my child\'s progress in Mathematics.', time: '10:30 AM' },
  { id: 2, sender: 'teacher', text: 'Hello! Your child is performing well. They scored 92 in the last unit test.', time: '10:35 AM' },
  { id: 3, sender: 'parent', text: 'That\'s great to hear! Is there anything they need to improve on?', time: '10:40 AM' },
  { id: 4, sender: 'teacher', text: 'They are good at problem-solving but can work on time management during exams. Keep up the good work!', time: '10:45 AM' },
  { id: 5, sender: 'parent', text: 'Thank you for the update on my child\'s progress.', time: '10:50 AM' },
];

export default function TeacherMessages() {
  const [selectedChat, setSelectedChat] = useState(mockConversations[0]);
  const [newMessage, setNewMessage] = useState('');

  const sendMessage = () => {
    if (newMessage.trim()) {
      setNewMessage('');
    }
  };

  return (
    <DashboardPage
      eyebrow="Communication"
      title="Messages"
      description="Communicate with parents and school admin"
    >
      <div className="grid gap-6 lg:grid-cols-3 h-[calc(100vh-220px)]">
        <SectionCard title="Conversations" description="" className="lg:col-span-1 overflow-hidden">
          <div className="space-y-2 -mx-2">
            {mockConversations.map(conv => (
              <div
                key={conv.id}
                onClick={() => setSelectedChat(conv)}
                className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${
                  selectedChat.id === conv.id ? 'bg-primary/5 border border-primary/20' : 'hover:bg-slate-50'
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center">
                  <AppIcon name="person" size={20} className="text-slate-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-slate-900 truncate">{conv.name}</p>
                    <span className="text-xs text-slate-400">{conv.time}</span>
                  </div>
                  <p className="text-sm text-slate-500 truncate">{conv.lastMessage}</p>
                </div>
                {conv.unread > 0 && (
                  <div className="w-5 h-5 rounded-full bg-primary text-white text-xs flex items-center justify-center">
                    {conv.unread}
                  </div>
                )}
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="" description="" className="lg:col-span-2 flex flex-col overflow-hidden">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-100 mb-4">
            <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center">
              <AppIcon name="person" size={20} className="text-slate-500" />
            </div>
            <div>
              <p className="font-medium text-slate-900">{selectedChat.name}</p>
              <p className="text-xs text-slate-500">Active now</p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto space-y-4 mb-4">
            {mockMessages.map(msg => (
              <div key={msg.id} className={`flex ${msg.sender === 'teacher' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[70%] p-3 rounded-2xl ${
                  msg.sender === 'teacher' ? 'bg-primary text-white' : 'bg-slate-100 text-slate-900'
                }`}>
                  <p className="text-sm">{msg.text}</p>
                  <p className={`text-xs mt-1 ${msg.sender === 'teacher' ? 'text-white/70' : 'text-slate-400'}`}>
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
            <button className="p-2 rounded-full hover:bg-slate-100 text-slate-500">
              <AppIcon name="attach_file" size={20} />
            </button>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 focus:border-primary/30 focus:ring-2 focus:ring-primary/10 text-sm"
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button 
              onClick={sendMessage}
              className="p-2.5 rounded-xl bg-primary text-white hover:bg-primary/90 transition-colors"
            >
              <AppIcon name="send" size={20} />
            </button>
          </div>
        </SectionCard>
      </div>
    </DashboardPage>
  );
}