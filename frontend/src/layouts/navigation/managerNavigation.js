export const managerNavItems = [
  { label: 'Dashboard', icon: 'dashboard', to: 'overview' },
  { label: 'Schools', icon: 'school', to: 'schools' },
  { label: 'Coaching', icon: 'rocket_launch', to: 'coaching' },
  { label: 'Partners', icon: 'group', to: 'partners' },
  { label: 'Pricing', icon: 'payments', to: 'pricing' },
  { label: 'Global Pricing', icon: 'edit', to: 'global-pricing' },
  { label: 'Activity', icon: 'activity', to: 'activity' },
  { label: 'Notices', icon: 'campaign', to: 'notices' },
  { label: 'Messages', icon: 'mail', to: 'messages' },
  { label: 'Users', icon: 'group', to: 'users' },
  { label: 'Settings', icon: 'settings', to: 'settings' },
  { label: 'Profile', icon: 'person', to: 'profile' },
];

export const managerHeader = {
  userName: 'Alexander Pierce',
  title: 'Skoolnet',
  userRole: 'Platform Manager',
  userAvatar: '',
  searchPlaceholder: 'Search records, schools, or partners...',
  quickActions: [
    { icon: 'campaign', to: 'notices' },
    { icon: 'mail', to: 'messages' },
    { icon: 'settings', to: 'settings' },
  ],
};

export const managerSidebarContent = {
  badge: 'Manager Portal',
  title: 'Skoolnet',
  description: '',
  upgradePlan: {
    title: 'Enterprise Plan',
    buttonText: 'Upgrade Plan'
  }
};