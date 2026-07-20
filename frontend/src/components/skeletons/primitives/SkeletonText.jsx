import React from 'react';
import { Skeleton } from '../base/Skeleton';

/**
 * Multi-line text skeleton
 * Minimal re-renders, no deep nesting
 */
export const SkeletonText = React.memo(function SkeletonText({
  lines = 3,
  lastLineWidth = '60%',
  theme = 'light',
  animation = 'pulse',
  className = '',
  ...props
}) {
  return (
    <div className={`space-y-2.5 ${className}`} {...props}>
      {Array.from({ length: lines }, (_, i) => (
        <Skeleton
          key={i}
          variant="text"
          theme={theme}
          animation={animation}
          width={i === lines - 1 ? lastLineWidth : '100%'}
        />
      ))}
    </div>
  );
});

SkeletonText.displayName = 'SkeletonText';