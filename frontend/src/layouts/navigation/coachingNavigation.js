export const coachingNavItems = [
  { label: 'Overview', icon: 'dashboard', to: 'overview' },
  { label: 'Profile', icon: 'person', to: 'profile' },
  { label: 'Notices', icon: 'campaign', to: 'notices' },
  { label: 'Students', icon: 'group', to: 'students' },
  { label: 'Teachers', icon: 'school', to: 'teachers' },
  { label: 'Courses', icon: 'menu_book', to: 'courses' },
  { label: 'Batches', icon: 'schedule', to: 'batches' },
  { label: 'Attendance', icon: 'monitoring', to: 'attendance' },
  { label: 'Schedule', icon: 'event', to: 'schedule' },
  { label: 'Content', icon: 'folder', to: 'content' },
  { label: 'Payments', icon: 'payments', to: 'payments' },
  { label: 'Subscriptions', icon: 'card_membership', to: 'subscriptions' },
  { label: 'Applications', icon: 'work', to: 'applications' },
  { label: 'Results', icon: 'assignment', to: 'results' },
  { label: 'Reports', icon: 'analytics', to: 'reports' },
  { label: 'Settings', icon: 'settings', to: 'settings' },
];

export const coachingHeader = {
  userName: 'Center Admin',
  title: 'Skoolnet',
  userRole: 'Apex Coaching Center',
  userAvatar: null,
  searchPlaceholder: 'Search students, courses, or payments...',
  quickActions: [
    { icon: 'notifications', to: 'notices' },
    { icon: 'add', to: 'students' },
    { icon: 'settings', to: 'settings' },
  ],
};

export const coachingSidebarContent = {
  badge: 'Coaching Ops',
  title: 'Skoolnet',
  description: '',
};