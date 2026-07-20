import React from 'react';
import AppIcon from './AppIcon';

const SettingsNavigation = ({ 
  categories, 
  activeCategory, 
  onCategoryChange,
  title = "Settings Configuration",
  buttonText,
  className = ""
}) => {
  const getButtonText = (category) => {
    if (buttonText) {
      return buttonText(category);
    }
    return category.title;
  }

  return (
    <div className={`lg:col-span-1 border-b border-slate-200 ${className}`}>
      <h3 className="text-lg font-semibold text-slate-900 mb-4">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {categories.map((category, index) => (
          <button
            key={index}
            onClick={() => onCategoryChange(category)}
            className={`px-3 py-2.5 transition-all duration-200 flex items-center gap-2 rounded-t-md ${
              activeCategory.title === category.title
                ? 'text-primary bg-primary/5'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <AppIcon name={category.icon} size={14} />
            <span className="font-medium text-sm">
              {getButtonText(category)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SettingsNavigation;
