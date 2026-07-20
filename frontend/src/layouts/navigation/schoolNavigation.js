export const schoolNavItems = [
  { label: 'Overview', icon: 'dashboard', to: 'overview' },
  { label: 'Students', icon: 'group', to: 'students' },
  { label: 'Teachers', icon: 'how_to_reg', to: 'teachers' },
  { label: 'Classes', icon: 'school', to: 'classes' },
  { label: 'Attendance', icon: 'monitoring', to: 'attendance' },
  { label: 'Notices', icon: 'campaign', to: 'notices' },
  { label: 'Assignments', icon: 'folder_open', to: 'assignments' },
  { label: 'Results', icon: 'assignment', to: 'results' },
  { label: 'Fees', icon: 'payments', to: 'fees' },
  { label: 'Applications', icon: 'work', to: 'applications' },
  { label: 'Reports', icon: 'analytics', to: 'reports' },
  { label: 'Settings', icon: 'settings', to: 'settings' },
  { label: 'Profile', icon: 'person', to: 'profile' },
];

export const schoolHeader = {
  userName: 'Principal Sharma',
  title: 'Skoolnet',
  userRole: 'Delhi Public School',
  userAvatar: '',
  searchPlaceholder: 'Search students, teachers, or classes...',
  quickActions: [
    { icon: 'campaign', to: 'notices' },
    { icon: 'add', to: 'students' },
    { icon: 'settings', to: 'settings' },
  ],
};

export const schoolSidebarContent = {
  badge: 'School Control',
  title: 'Skoolnet',
  description: '',
};