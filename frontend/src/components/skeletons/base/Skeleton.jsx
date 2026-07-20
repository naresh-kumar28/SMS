import React from 'react';

/**
 * Base Skeleton Component - Performance Optimized
 * Single reusable component with minimal DOM and no unnecessary re-renders
 */
export const Skeleton = React.memo(function Skeleton({
  className = '',
  width,
  height,
  variant = 'text',
  theme = 'light',
  animation = 'pulse',
  style,
  ...props
}) {
  // Variant classes - minimal DOM footprint
  const variantClasses = {
    text: 'h-3.5 rounded',
    circle: 'rounded-full',
    rectangle: 'rounded-lg',
  };

  // Theme classes - dark/light optimized
  const themeClasses = {
    light: 'bg-slate-200/70',
    dark: 'bg-slate-700/50',
  };

  // Animation classes - CSS-only, GPU-friendly
  const animationClasses = {
    pulse: 'animate-pulse',
    shimmer: 'animate-shimmer',
  };

  // Build computed style
  const computedStyle = {
    ...(width && { width: typeof width === 'number' ? `${width}px` : width }),
    ...(height && { height: typeof height === 'number' ? `${height}px` : height }),
    ...style,
  };

  return (
    <div
      className={`
        ${variantClasses[variant]}
        ${themeClasses[theme]}
        ${animationClasses[animation]}
        ${className}
      `}
      style={computedStyle}
      aria-busy="true"
      aria-label="Loading content"
      {...props}
    />
  );
});

Skeleton.displayName = 'Skeleton';