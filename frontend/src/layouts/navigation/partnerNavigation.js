export const partnerNavItems = [
  { label: 'Dashboard', icon: 'dashboard', to: 'overview' },
  { label: 'My Schools', icon: 'school', to: 'schools' },
  { label: 'My Coaching', icon: 'rocket_launch', to: 'coaching' },
  { label: 'Pricing', icon: 'payments', to: 'pricing' },
  { label: 'Activity', icon: 'activity', to: 'activity' },
  { label: 'Notices', icon: 'campaign', to: 'notices' },
  { label: 'Messages', icon: 'mail', to: 'messages' },
  { label: 'Students', icon: 'group', to: 'students' },
  { label: 'Settings', icon: 'settings', to: 'settings' },
  { label: 'Profile', icon: 'person', to: 'profile' },
];

export const partnerHeader = {
  userName: 'Partner Admin',
  title: 'Skoolnet',
  userRole: 'Partner Portal',
  userAvatar: '',
  searchPlaceholder: 'Search schools, students, or coaching...',
  quickActions: [
    { icon: 'campaign', to: 'notices' },
    { icon: 'mail', to: 'messages' },
    { icon: 'settings', to: 'settings' },
  ],
};

export const partnerSidebarContent = {
  badge: 'Partner Portal',
  title: 'Skoolnet',
  description: '',
  upgradePlan: null,
};