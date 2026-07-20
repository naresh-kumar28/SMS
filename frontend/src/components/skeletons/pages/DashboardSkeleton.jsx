import React from 'react';
import { Skeleton } from '../base/Skeleton';
import { SkeletonCard } from '../patterns/SkeletonCard';

/**
 * Dashboard skeleton - matches main dashboard layout
 * Premium look with metric cards and content sections
 */
export const DashboardSkeleton = React.memo(function DashboardSkeleton({
  theme = 'light',
  animation = 'pulse',
  className = '',
  ...props
}) {
  return (
    <div className={`space-y-8 ${className}`} {...props}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
        <div className="space-y-2">
          <Skeleton width={100} height={10} theme={theme} animation={animation} variant="text" />
          <Skeleton width={160} height={24} theme={theme} animation={animation} variant="text" />
          <Skeleton width={200} height={12} theme={theme} animation={animation} variant="text" />
        </div>
        <div className="flex gap-2">
          <Skeleton width={100} height={36} theme={theme} animation={animation} variant="rectangle" />
          <Skeleton width={100} height={36} theme={theme} animation={animation} variant="rectangle" />
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }, (_, i) => (
          <div key={i} className="border-l-4 border-slate-200/50 bg-white/50 backdrop-blur-sm rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <Skeleton variant="circle" width={14} height={14} theme={theme} animation={animation} />
              <Skeleton width={30} height={10} theme={theme} animation={animation} variant="text" />
            </div>
            <Skeleton width="50%" height={24} theme={theme} animation={animation} variant="text" className="mb-2" />
            <Skeleton width="70%" height={12} theme={theme} animation={animation} variant="text" />
          </div>
        ))}
      </div>

      {/* Content Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SkeletonCard width="100%" height={320} theme={theme} animation={animation} />
        <SkeletonCard width="100%" height={320} theme={theme} animation={animation} />
      </div>
    </div>
  );
});

DashboardSkeleton.displayName = 'DashboardSkeleton';