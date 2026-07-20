import React from 'react';
import { Skeleton } from '../base/Skeleton';

/**
 * Circular avatar skeleton
 */
export const SkeletonAvatar = React.memo(function SkeletonAvatar({
  size = 40,
  theme = 'light',
  animation = 'pulse',
  border = true,
  className = '',
  ...props
}) {
  return (
    <Skeleton
      variant="circle"
      width={size}
      height={size}
      theme={theme}
      animation={animation}
      border={border ? 'thin' : 'none'}
      className={className}
      {...props}
    />
  );
});

SkeletonAvatar.displayName = 'SkeletonAvatar';

// Backwards compatibility export
export const SkeletonCircle = SkeletonAvatar;