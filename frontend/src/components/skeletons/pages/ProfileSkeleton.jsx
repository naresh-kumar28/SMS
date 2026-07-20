import React from 'react';
import { Skeleton } from '../base/Skeleton';
import { SkeletonAvatar } from '../primitives/SkeletonAvatar';
import { SkeletonInput } from '../patterns/SkeletonInput';
import { SkeletonSectionCard } from '../patterns/SkeletonCard';

/**
 * Profile page skeleton - Precision matched to Manager Profile UI
 */
export const ProfileSkeleton = React.memo(function ProfileSkeleton({
  theme = 'light',
  animation = 'pulse',
  className = '',
  ...props
}) {
  return (
    <div className={`space-y-8 ${className}`} {...props}>
      {/* Page Header Skeleton */}
      <div className="space-y-2">
        <Skeleton width={120} height={12} theme={theme} animation={animation} variant="text" />
        <Skeleton width={200} height={32} theme={theme} animation={animation} variant="text" />
      </div>

      {/* Header Banner Skeleton */}
      <div className="min-h-[200px] w-full bg-slate-50 border border-slate-200/60 rounded-3xl p-10 flex items-center relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-8 w-full">
          {/* Avatar Skeleton */}
          <div className="relative shrink-0 group">
            <div className="w-36 h-36 rounded-3xl bg-white/20 p-1 shadow-sm overflow-hidden border border-slate-100 relative z-10">
               <SkeletonAvatar size="100%" theme={theme} animation={animation} className="rounded-[1.4rem]" />
            </div>
            <div className="absolute inset-0 translate-y-2 bg-slate-200/40 blur-xl rounded-3xl z-0" />
          </div>

          {/* Info Summary Skeleton */}
          <div className="flex-1 space-y-4">
            <div className="space-y-2">
              <Skeleton width="40%" height={40} theme={theme} animation={animation} variant="text" />
              <div className="flex gap-3">
                <Skeleton width="80px" height={24} theme={theme} animation={animation} variant="rectangle" className="rounded-lg" />
                <Skeleton width="180px" height={24} theme={theme} animation={animation} variant="rectangle" className="rounded-lg border border-slate-100" />
              </div>
            </div>
          </div>

          {/* Edit Button Skeleton */}
          <div className="hidden md:block">
            <Skeleton width={140} height={44} theme={theme} animation={animation} variant="rectangle" className="rounded-xl shadow-sm" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Organization & Status */}
        <div className="space-y-6">
          <SkeletonSectionCard title="Organization Identity">
            <div className="space-y-6">
              <div className="flex flex-col items-center text-center p-6 bg-slate-50 rounded-3xl border border-slate-100 space-y-4">
                <Skeleton width={96} height={96} theme={theme} animation={animation} variant="rectangle" className="rounded-2xl" />
                <div className="space-y-2 flex flex-col items-center w-full">
                   <Skeleton width="60%" height={20} theme={theme} animation={animation} variant="text" />
                   <Skeleton width="40%" height={12} theme={theme} animation={animation} variant="text" />
                </div>
              </div>

              <div className="space-y-4 px-2">
                {[1, 2].map((i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Skeleton variant="circle" width={32} height={32} className="rounded-lg" />
                    <div className="flex-1 space-y-1">
                      <Skeleton width="30%" height={10} variant="text" />
                      <Skeleton width="70%" height={16} variant="text" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </SkeletonSectionCard>

          <SkeletonSectionCard title="Performance Status">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
                <Skeleton width="40%" height={10} variant="text" />
                <Skeleton width="70%" height={24} variant="text" />
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
                <Skeleton width="40%" height={10} variant="text" />
                <Skeleton width="70%" height={24} variant="text" />
              </div>
            </div>
          </SkeletonSectionCard>
        </div>

        {/* Right Column: Details & Additional Cards */}
        <div className="lg:col-span-2 space-y-6">
          <SkeletonSectionCard title="Contact & Personal Information">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="space-y-2">
                   <Skeleton width="30%" height={10} variant="text" />
                   <Skeleton width="90%" height={32} variant="rectangle" className="rounded-lg" />
                </div>
              ))}
              <div className="md:col-span-2 space-y-2">
                 <Skeleton width="20%" height={10} variant="text" />
                 <Skeleton width="100%" height={32} variant="rectangle" className="rounded-lg" />
              </div>
              <div className="md:col-span-2 space-y-2">
                 <Skeleton width="20%" height={10} variant="text" />
                 <Skeleton width="100%" height={100} variant="rectangle" className="rounded-2xl" />
              </div>
            </div>
          </SkeletonSectionCard>

          {/* Security & Activity Grid Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {[1, 2].map((i) => (
               <SkeletonSectionCard key={i} title={i === 1 ? "Security & Access" : "Activity"}>
                 <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                       <div className="flex items-center gap-3">
                          <Skeleton variant="circle" width={18} height={18} />
                          <Skeleton width="60px" height={14} variant="text" />
                       </div>
                       <Skeleton width="80px" height={14} variant="text" />
                    </div>
                    <Skeleton width="100%" height={44} variant="rectangle" className="rounded-xl" />
                 </div>
               </SkeletonSectionCard>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
});

ProfileSkeleton.displayName = 'ProfileSkeleton';