export const teacherNavItems = [
  { label: 'Dashboard', icon: 'dashboard', to: 'dashboard' },
  { label: 'My Classes', icon: 'school', to: 'my-classes' },
  { label: 'My Students', icon: 'group', to: 'my-students' },
  { label: 'Attendance', icon: 'monitoring', to: 'attendance' },
  { label: 'Assignments', icon: 'folder_open', to: 'assignments' },
  { label: 'Notes', icon: 'description', to: 'notes' },
  { label: 'Marks', icon: 'grade', to: 'marks' },
  { label: 'Notices', icon: 'campaign', to: 'notices' },
  { label: 'Messages', icon: 'chat', to: 'messages' },
  { label: 'Profile', icon: 'person', to: 'profile' },
];

export const teacherHeader = {
  userName: 'Teacher Name',
  userRole: 'Teacher',
  userAvatar: '',
  searchPlaceholder: 'Search students, classes, or subjects...',
  quickActions: [
    { icon: 'notifications' },
    { icon: 'mail' },
  ],
};

export const teacherSidebarContent = {
  badge: 'Teacher Panel',
  title: 'Skoolnet',
  description: '',
  backLink: '/dashboard/school',
};