import { useState, useRef, useEffect } from 'react';
import AppIcon from './AppIcon';

export default function Dropdown({ 
  value, 
  onChange, 
  options, 
  placeholder = 'Select an option',
  className = '',
  disabled = false,
  leftIcon = null
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(option => option.value === value);
  const displayValue = selectedOption ? selectedOption.label : placeholder;

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleSelect = (option) => {
    onChange(option.value);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={handleToggle}
        disabled={disabled}
        className={`w-full ${leftIcon ? 'pl-10' : 'px-3'} py-2.5 text-sm text-left bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all flex items-center justify-between ${
          disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-slate-300'
        }`}
      >
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            {leftIcon}
          </div>
        )}
        <span className={value === '' ? 'text-slate-400' : 'text-slate-900'}>
          {displayValue}
        </span>
        <AppIcon 
          name="expand_more" 
          size={16} 
          className={`text-slate-400 mr-1 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>


      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg overflow-hidden">
          <div className="max-h-60 overflow-y-auto">
            {options.length > 0 ? (
              options.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleSelect(option)}
                  className={`w-full px-3 py-2 text-sm text-left hover:bg-slate-50 transition-colors flex items-center justify-between ${
                    option.value === value ? 'bg-primary/5 text-primary font-medium' : 'text-slate-900'
                  }`}
                >
                  <span>{option.label}</span>
                  {option.value === value && (
                    <AppIcon name="check" size={14} className="text-primary" />
                  )}
                </button>
              ))
            ) : (
              <div className="px-3 py-6 text-center">
                <p className="text-sm text-slate-400 font-medium">Not any thing to select</p>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
