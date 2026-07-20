import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import AppIcon from '../../common/AppIcon';
import BrandLogo from '../../common/BrandLogo';

const isDev = import.meta.env.DEV;

const baseNavItems = [
  { label: 'Services', href: '/services', icon: 'category' },
  { label: 'Pricing', href: '/pricing', icon: 'payments' },
  { label: 'About', href: '/about', icon: 'info' },
  { label: 'Contact', href: '/contact', icon: 'mail' },
];

const navItems = isDev
  ? [...baseNavItems, { label: 'Internal URLs', href: '/temp-urls', icon: 'code' }]
  : baseNavItems;

export default function SiteNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Close menu when route changes
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <>
      <header className="fixed top-0 z-50 w-full border-b border-outline-variant/60 glass-panel">
        <nav className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-8 lg:gap-12">
            <BrandLogo />
          </div>

          <div className="hidden gap-8 md:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.href}
                className={({ isActive }) =>
                  isActive
                    ? 'border-b-2 border-primary font-headline text-sm font-bold text-primary transition-all'
                    : 'font-headline text-sm text-on-surface-variant transition-all hover:text-primary'
                }
                end={item.href === '/'}
                to={item.href}
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                className="rounded-xl p-2 text-on-surface-variant transition-all hover:bg-surface-container"
                type="button"
              >
                <AppIcon name="notifications" size={20} />
              </button>
              <Link
                to="/dashboard/manager/overview"
                className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary/10 bg-slate-100 transition-all hover:bg-slate-200 active:scale-95"
              >
                <AppIcon name="person" size={20} className="text-slate-500" />
              </Link>
            </div>

            <button
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface-container-high text-on-surface-variant transition-all hover:bg-surface-container md:hidden active:scale-95"
              onClick={() => setIsMenuOpen(true)}
              type="button"
              aria-label="Open menu"
            >
              <AppIcon name="menu" size={22} />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Drawer */}
      <div 
        className={`fixed inset-0 z-100 md:hidden transition-all duration-300 ${
          isMenuOpen ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300" 
          onClick={() => setIsMenuOpen(false)} 
        />
        
        {/* Sidebar */}
        <div 
          className={`absolute right-0 top-0 h-full w-[310px] bg-white shadow-2xl transition-transform duration-300 ease-out border-l border-slate-100 flex flex-col ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Drawer Header with BrandLogo */}
          <div className="flex h-20 items-center justify-between px-6 border-b border-slate-50 bg-slate-50/30">
            <BrandLogo onClick={() => setIsMenuOpen(false)} />
            <button 
              onClick={() => setIsMenuOpen(false)}
              className="p-2 rounded-xl hover:bg-slate-100 text-slate-400 transition-colors"
            >
              <AppIcon name="close" size={20} />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) =>
                  `flex items-center gap-4 rounded-xl px-4 py-3.5 font-headline text-base font-medium transition-all ${
                    isActive
                      ? 'bg-primary/5 text-primary'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`
                }
              >
                <AppIcon 
                  name={item.icon} 
                  size={20} 
                  className={location.pathname === item.href ? 'text-primary' : 'text-slate-400'} 
                />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </div>
          
          <div className="p-6 border-t border-slate-50">
             <Link 
               to="/dashboard/manager/overview"
               className="flex w-full items-center justify-center gap-3 rounded-xl bg-primary px-4 py-3.5 text-sm font-bold text-white shadow-lg shadow-primary/20 hover:opacity-90 transition-all active:scale-[0.98]"
             >
               <span>Go to Dashboard</span>
               <AppIcon name="arrow_forward" size={18} />
             </Link>
             <p className="mt-4 text-center text-[11px] text-slate-400 font-medium">
               © 2026 Skoolnet. All rights reserved.
             </p>
          </div>
        </div>
      </div>
    </>
  );
}
