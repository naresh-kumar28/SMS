import { useState, useRef, useEffect } from 'react';
import AppIcon from './AppIcon';

export default function ActionMenu({ 
  actions = [], 
  icon = "more_vert", 
  iconSize = 16,
  buttonClass = "p-1.5 md:p-1 rounded hover:bg-slate-100 transition-colors cursor-pointer",
  iconClass = "text-slate-600",
  dropdownClass = "w-48 right-0",
  zIndex = "z-50"
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className={`${buttonClass} ${isOpen ? 'bg-slate-100' : ''}`}
      >
        <AppIcon name={icon} size={iconSize} className={iconClass} />
      </button>

      {isOpen && (
        <div 
          className={`absolute ${dropdownClass} top-full mt-1 bg-white rounded-lg shadow-lg border border-slate-100 py-1 ${zIndex} animate-in fade-in zoom-in-95 duration-100 whitespace-nowrap min-w-max`}
        >
          {actions.map((action, index) => {
            if (action.divider) {
              return <div key={`divider-${index}`} className="h-px bg-slate-100 my-1"></div>;
            }

            return (
              <button 
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                  if (action.onClick) action.onClick();
                }}
                className={`w-full text-left px-4 py-2 text-sm flex items-center gap-2 transition-colors cursor-pointer ${
                  action.isDestructive 
                    ? 'text-rose-600 hover:bg-rose-50 font-medium' 
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {action.icon && (
                  <AppIcon 
                    name={action.icon} 
                    size={16} 
                    className={action.isDestructive ? "text-rose-500" : "text-slate-400"} 
                  />
                )}
                {action.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
