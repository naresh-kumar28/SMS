/**
 * Button skeleton
 */
import React from 'react';
import { Skeleton } from '../base/Skeleton';

export const SkeletonButton = React.memo(function SkeletonButton({
  width = 120,
  height = 36,
  theme = 'light',
  animation = 'pulse',
  className = '',
  ...props
}) {
  return (
    <Skeleton
      width={width}
      height={height}
      theme={theme}
      animation={animation}
      className={`rounded-lg ${className}`}
      {...props}
    />
  );
});

SkeletonButton.displayName = 'SkeletonButton';