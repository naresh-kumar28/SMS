import React from 'react';
import { SkeletonTable } from '../patterns/SkeletonTable';

/**
 * Students table page skeleton
 */
export const StudentsTableSkeleton = React.memo(function StudentsTableSkeleton({
  theme = 'light',
  animation = 'pulse',
  className = '',
  ...props
}) {
  return (
    <SkeletonTable
      rows={8}
      cols={5}
      hasHeader={true}
      theme={theme}
      animation={animation}
      className={className}
      {...props}
    />
  );
});

StudentsTableSkeleton.displayName = 'StudentsTableSkeleton';