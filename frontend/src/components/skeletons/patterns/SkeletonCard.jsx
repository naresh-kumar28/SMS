import React from 'react';
import { Skeleton } from '../base/Skeleton';

/**
 * Basic card skeleton
 */
export const SkeletonCard = React.memo(function SkeletonCard({
  width = '100%',
  height = 200,
  rounded = 'lg',
  theme = 'light',
  animation = 'pulse',
  className = '',
  ...props
}) {
  const roundedClasses = {
    none: '',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
  };

  return (
    <div
      className={`border border-slate-200/50 bg-white/50 backdrop-blur-sm ${roundedClasses[rounded]} ${className}`}
      style={{ width }}
      {...props}
    >
      <div className="p-4">
        <Skeleton width="100%" height={height} theme={theme} animation={animation} rounded={rounded} />
      </div>
    </div>
  );
});

SkeletonCard.displayName = 'SkeletonCard';

/**
 * Metric card skeleton (matches DashboardPrimitives MetricCard)
 */
export const SkeletonMetricCard = React.memo(function SkeletonMetricCard({
  theme = 'blue',
  className = '',
  ...props
}) {
  const themeColors = {
    blue: 'from-blue-100/60 to-cyan-100/60',
    emerald: 'from-emerald-100/60 to-teal-100/60',
    amber: 'from-amber-100/60 to-orange-100/60',
    rose: 'from-rose-100/60 to-pink-100/60',
  };

  const textColors = {
    blue: 'text-blue-600',
    emerald: 'text-emerald-600',
    amber: 'text-amber-600',
    rose: 'text-rose-600',
  };

  return (
    <div className={`border-l-4 ${textColors[theme]} bg-gradient-to-br ${themeColors[theme]} rounded-lg shadow-sm p-4 animate-pulse ${className}`} {...props}>
      <div className="flex items-center justify-between mb-2">
        <Skeleton variant="circle" width={16} height={16} theme="surface" />
        <Skeleton width={30} height={12} theme="surface" />
      </div>
      <Skeleton width="50%" height={24} theme="slate" className="mb-2" />
      <Skeleton width="70%" height={16} theme="surface" />
      <Skeleton width="40%" height={10} theme="surface" className="mt-1" />
    </div>
  );
});

SkeletonMetricCard.displayName = 'SkeletonMetricCard';

/**
 * Section card skeleton (matches DashboardPrimitives SectionCard)
 */
export const SkeletonSectionCard = React.memo(function SkeletonSectionCard({
  title = true,
  description = false,
  children,
  className = '',
  ...props
}) {
  return (
    <div className={`border border-slate-200/50 bg-white/50 backdrop-blur-sm rounded-3xl p-8 ${className}`} {...props}>
      {title && (
        <div className="mb-6">
          <Skeleton width="150px" height={20} theme="slate" />
        </div>
      )}
      {description && (
        <div className="mb-4">
          <Skeleton width="200px" height={12} theme="slate" />
        </div>
      )}
      {children}
    </div>
  );
});

SkeletonSectionCard.displayName = 'SkeletonSectionCard';