import React from 'react';
import { SkeletonButton } from '../patterns/SkeletonButton';
import { SkeletonList } from '../patterns/SkeletonList';

/**
 * Teachers list page skeleton
 */
export const TeachersSkeleton = React.memo(function TeachersSkeleton({
  theme = 'light',
  animation = 'pulse',
  className = '',
  ...props
}) {
  return (
    <div className={`space-y-4 ${className}`} {...props}>
      <div className="flex gap-2 mb-4">
        <SkeletonButton width={100} height={36} theme={theme} animation={animation} />
        <SkeletonButton width={100} height={36} theme="surface" animation={animation} />
      </div>
      <SkeletonList items={6} avatar={true} hasMeta={true} theme={theme} animation={animation} />
    </div>
  );
});

TeachersSkeleton.displayName = 'TeachersSkeleton';