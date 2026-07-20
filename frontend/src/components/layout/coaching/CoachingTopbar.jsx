import { NavLink } from 'react-router-dom';
import AppIcon from '../../common/AppIcon';
import BrandLogo from '../../common/BrandLogo';
import InitialsAvatar from '../../common/InitialsAvatar';

export default function CoachingTopbar({ 
  userName = 'User', 
  userRole = 'Admin',
  userAvatar = null,
  searchPlaceholder = 'Search...', 
  quickActions = [] 
}) {
  return (
    <header className="h-14 md:h-16 bg-white/70 backdrop-blur-xl flex items-center justify-between px-3 md:px-8 border-b border-slate-100 font-['Manrope'] tracking-tight">
      <div className="flex items-center flex-1 max-w-xl">
        {/* Mobile: Show branding */}
        <div className="md:hidden flex items-center gap-3">
          <BrandLogo panelName="Coaching" />
        </div>
        {/* Desktop: Show search bar */}
        <div className="hidden md:block relative w-full">
          <AppIcon name="search" size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-on-surface-variant" />
          <input
            className="w-full bg-slate-100 border-none rounded-md outline-none font-medium py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/20 text-slate-900 placeholder:text-slate-500"
            placeholder={searchPlaceholder}
            type="text"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-2 md:gap-6">
        {/* Quick actions - NavLinks */}
        <div className="flex items-center gap-1 md:gap-4 text-on-surface-variant">
          {quickActions.map((action, index) => (
            <NavLink 
              key={index} 
              to={action.to || '#'}
              className="p-1.5 md:p-2 rounded-full transition-all hover:bg-slate-100 text-on-surface-variant hover:text-primary"
            >
              <AppIcon name={action.icon} size={20} />
            </NavLink>
          ))}
        </div>
        
        <div className="h-6 md:h-8 w-px bg-slate-200 hidden md:block"></div>
        
        {/* Profile with NavLink */}
        <NavLink 
          to="profile" 
          className="flex items-center gap-2 md:gap-3 hover:bg-slate-100 rounded-xl py-1 px-1.5 transition-all"
        >
          <div className="text-right hidden md:block">
            <p className="text-xs font-bold text-on-surface capitalize">{userName}</p>
            <p className="text-[10px] text-on-surface-variant font-medium">{userRole}</p>
          </div>
          <InitialsAvatar
            src={userAvatar}
            name={userName}
            className="w-8 h-8 md:w-10 md:h-10 border-2 border-white shadow-sm text-sm"
          />
        </NavLink>
      </div>
    </header>
  );
}