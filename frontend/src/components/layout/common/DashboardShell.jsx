import { useState, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { DashboardSkeleton } from '../../common/Skeleton';
import MobileBottomNav from './MobileBottomNav';

export default function DashboardShell({ topbar: Topbar, sidebar: Sidebar, showBottomNav = false, context = {}, bottomNavItems = [], mainNavItems = [] }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const openSidebar = () => setMobileMenuOpen(true);
  const closeSidebar = () => setMobileMenuOpen(false);

  return (
    <div className="bg-surface custom-scrollbar overflow-x-hidden">
      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={closeSidebar}
        />
      )}
      
      {/* Sidebar - fixed position, hidden on mobile when showBottomNav */}
      <div className={`
        fixed left-0 top-0 z-50
        transition-transform duration-300 ease-in-out
        h-screen
        ${showBottomNav 
          ? '-translate-x-full md:translate-x-0 md:block' 
          : mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0 md:block'
        }
      `}>
        {Sidebar}
      </div>
      
      <main className="ml-0 md:ml-64 min-h-screen">
        {/* Topbar - always visible */}
        <div className="fixed top-0 right-0 left-0 md:left-64 z-40">
          {Topbar}
        </div>
        
        <div className={`pt-20 md:pt-24 pb-28 md:pb-12 px-4 md:px-8 max-w-400 mx-auto bg-background/30 ${showBottomNav ? 'min-h-screen' : ''}`}>
          <Suspense fallback={<DashboardSkeleton />}>
            <Outlet context={context} />
          </Suspense>
        </div>
        {showBottomNav && <MobileBottomNav onOpenSidebar={openSidebar} navItems={bottomNavItems} mainNavItems={mainNavItems} />}
      </main>
    </div>
  );
}
