import React from 'react';
import { Skeleton } from '../base/Skeleton';

/**
 * Box/Rectangle skeleton - for cards, media, image placeholders
 * Minimal DOM, GPU-friendly
 */
export const SkeletonBox = React.memo(function SkeletonBox({
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
    sm: 'rounded',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
    full: 'rounded-full',
  };

  return (
    <Skeleton
      variant="rectangle"
      width={width}
      height={height}
      theme={theme}
      animation={animation}
      className={`${roundedClasses[rounded]} ${className}`}
      {...props}
    />
  );
});

SkeletonBox.displayName = 'SkeletonBox';