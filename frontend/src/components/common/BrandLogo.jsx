import { Link } from 'react-router-dom';
import AppIcon from './AppIcon';

// BrandLogo Component

export default function BrandLogo({
  panelName,
  to = "/",
  className = "",
  showLabel = true,
  variant = "default" // "default" or "light"
}) {
  const isLight = variant === "light";

  return (
    <Link
      className={`flex items-center gap-2.5 group select-none ${className}`}
      to={to}
    >
      {/* Logo Icon */}
      <div className={`flex h-9 w-9 items-center justify-center rounded-xl shadow-lg transition-all group-hover:scale-105 active:scale-95 ${
        isLight 
          ? 'bg-white/20 backdrop-blur text-white shadow-white/10' 
          : 'bg-primary text-white shadow-primary/20 group-hover:shadow-primary/30'
      }`}>
        <AppIcon name="school" size={20} />
      </div>

      {/* Brand Text & Panel Label */}
      {(showLabel || panelName) && (
        <div className="flex flex-col justify-center leading-none">
          {showLabel && (
            <span className={`font-headline text-xl font-extrabold tracking-tighter ${
              isLight ? 'text-white' : 'text-primary'
            }`}>
              Skoolnet
            </span>
          )}
          {panelName && (
            <span className={`font-headline text-[10px] font-bold uppercase tracking-[0.2em] ${
              isLight ? 'text-white/60' : 'text-on-surface-variant/50'
            } ${showLabel ? 'mt-0.5' : ''}`}>
              {panelName}
            </span>
          )}
        </div>
      )}
    </Link>
  );
}
