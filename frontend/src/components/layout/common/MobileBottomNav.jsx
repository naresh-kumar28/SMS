import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import AppIcon from '../../common/AppIcon';

export default function MobileBottomNav({ onOpenSidebar, navItems = [], mainNavItems = [] }) {
  const location = useLocation();
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  
  // Default main nav items - can be overridden by mainNavItems prop
  const defaultMainNavItems = [
    { label: 'Home', icon: 'home', to: 'dashboard' },
    { label: 'Courses', icon: 'school', to: 'courses' },
    { label: 'Assignment', icon: 'folder_open', to: 'assignments' },
    { label: 'Results', icon: 'grade', to: 'results' },
  ];
  
  // Use prop if provided, otherwise use defaults
  const bottomNavItems = mainNavItems.length > 0 
    ? [...mainNavItems, { label: 'Menu', icon: showMoreMenu ? 'close' : 'menu', action: 'toggleMenu' }]
    : [...defaultMainNavItems, { label: 'Menu', icon: showMoreMenu ? 'close' : 'menu', action: 'toggleMenu' }];

  const handleClick = (item) => {
    if (item.action === 'toggleMenu') {
      setShowMoreMenu(!showMoreMenu);
    } else if (item.action === 'openSidebar' && onOpenSidebar) {
      onOpenSidebar();
    }
  };

  const getCurrentPath = () => {
    const path = location.pathname;
    const parts = path.split('/');
    return parts[parts.length - 1] || 'dashboard';
  };

  const currentPage = getCurrentPath();
  const displayedItems = navItems.length > 0 ? navItems : [
    { label: 'Attendance', icon: 'monitoring', to: 'attendance' },
    { label: 'Notes', icon: 'description', to: 'notes' },
    { label: 'Schedule', icon: 'schedule', to: 'schedule' },
    { label: 'Payments', icon: 'payments', to: 'payments' },
    { label: 'Notices', icon: 'campaign', to: 'notices' },
    { label: 'Messages', icon: 'chat', to: 'messages' },
    { label: 'Profile', icon: 'person', to: 'profile' },
  ];

  return (
    <>
      <nav className="fixed bottom-4 left-4 right-4 md:hidden z-50">
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100/50 px-2 py-2">
          <div className="flex items-center justify-between gap-1">
            {bottomNavItems.map((item) => {
              const isActive = item.to ? location.pathname.includes(item.to) : false;
              
              if (item.to) {
                return (
                  <NavLink
                    key={item.label}
                    to={item.to}
                    className={`
                      flex flex-col items-center justify-center flex-1 py-2 px-1 rounded-xl transition-all duration-200
                      ${isActive 
                        ? 'text-primary ' 
                        : 'text-slate-400 hover:text-slate-600 '
                      }
                    `}
                  >
                    <div className="p-1.5 rounded-lg transition-all">
                      <AppIcon name={item.icon} size={20} />
                    </div>
                    <span className="text-[10px] font-medium mt-0.5">{item.label}</span>
                  </NavLink>
                );
              }
              
              return (
                <button
                  key={item.label}
                  onClick={() => handleClick(item)}
                  className={`
                    flex flex-col items-center justify-center flex-1 py-2 px-1 rounded-xl transition-all duration-200
                    ${showMoreMenu 
                      ? 'text-primary bg-primary/5' 
                      : 'text-slate-400 hover:text-slate-600'
                    }
                  `}
                >
                  <div className="p-1.5 rounded-lg transition-all">
                    <AppIcon name={item.icon} size={20} />
                  </div>
                  <span className="text-[10px] font-medium mt-0.5">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* More Menu Overlay */}
      {showMoreMenu && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div 
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowMoreMenu(false)}
          />
          <div className="absolute bottom-24 left-4 right-4 bg-white mb-10 rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
            <div className="p-4 border-b border-slate-100">
              <p className="text-sm font-bold text-slate-900">More Options</p>
              <p className="text-xs text-slate-500">Select a page to navigate</p>
            </div>
            <div className="max-h-[60vh] overflow-y-auto ">
              {displayedItems.map((item) => {
                const isActive = currentPage === item.to;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={() => setShowMoreMenu(false)}
                    className={`
                      flex items-center gap-3 px-4 py-3 border-b border-slate-50 transition-all
                      ${isActive 
                        ? 'bg-primary/5 text-primary' 
                        : 'text-slate-700 hover:bg-slate-50'
                      }
                    `}
                  >
                    <AppIcon name={item.icon} size={20} className={isActive ? 'text-primary' : 'text-slate-500'} />
                    <span className="text-sm font-medium">{item.label}</span>
                  </NavLink>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}