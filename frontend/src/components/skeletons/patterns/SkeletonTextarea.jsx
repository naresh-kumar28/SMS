import React from 'react';
import { Skeleton } from '../base/Skeleton';

export const SkeletonTextarea = React.memo(function SkeletonTextarea({
  labelWidth = '30%',
  rows = 2,
  theme = 'light',
  animation = 'pulse',
  className = '',
  ...props
}) {
  const height = rows === 2 ? 64 : rows === 3 ? 96 : 128;

  return (
    <div className={`space-y-1.5 ${className}`} {...props}>
      <Skeleton width={labelWidth} height={12} theme={theme} animation={animation} variant="text" />
      <Skeleton height={height} theme={theme} animation={animation} variant="rectangle" />
    </div>
  );
});

SkeletonTextarea.displayName = 'SkeletonTextarea';