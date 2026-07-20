import React from 'react';
import { Skeleton } from '../base/Skeleton';

export const SkeletonInput = React.memo(function SkeletonInput({
  labelWidth = '30%',
  height = 38,
  theme = 'light',
  animation = 'pulse',
  className = '',
  ...props
}) {
  return (
    <div className={`space-y-1.5 ${className}`} {...props}>
      <Skeleton width={labelWidth} height={12} theme={theme} animation={animation} variant="text" />
      <Skeleton height={height} theme={theme} animation={animation} variant="rectangle" />
    </div>
  );
});

SkeletonInput.displayName = 'SkeletonInput';