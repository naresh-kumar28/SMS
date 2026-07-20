import React from 'react';
import { SkeletonAvatar } from '../primitives/SkeletonAvatar';
import { Skeleton } from '../base/Skeleton';

/**
 * List skeleton - for item lists (students, teachers, etc.)
 * Minimal DOM, flat structure
 */
export const SkeletonList = React.memo(function SkeletonList({
  items = 5,
  avatar = false,
  hasMeta = false,
  theme = 'light',
  animation = 'pulse',
  className = '',
  ...props
}) {
  return (
    <div className={`space-y-3 ${className}`} {...props}>
      {Array.from({ length: items }, (_, i) => (
        <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-white/50 border border-slate-200/50">
          {avatar && <SkeletonAvatar size={36} theme={theme} animation={animation} />}
          <div className="space-y-1.5 flex-1">
            <Skeleton width="50%" height={14} theme={theme} animation={animation} variant="text" />
            {hasMeta && (
              <Skeleton width="35%" height={10} theme={theme} animation={animation} variant="text" opacity={0.6} />
            )}
          </div>
        </div>
      ))}
    </div>
  );
});

SkeletonList.displayName = 'SkeletonList';

/**
 * Single list item skeleton (icon + text)
 */
export const SkeletonListItem = React.memo(function SkeletonListItem({
  avatar = false,
  avatarSize = 40,
  hasMeta = false,
  theme = 'light',
  animation = 'pulse',
  className = '',
  ...props
}) {
  return (
    <div className={`flex items-center gap-3 p-3 rounded-lg bg-white/50 border border-slate-200/50 ${className}`} {...props}>
      {avatar && <SkeletonAvatar size={avatarSize} theme={theme} animation={animation} />}
      <div className="space-y-1.5 flex-1">
        <Skeleton width="60%" height={14} theme={theme} animation={animation} variant="text" />
        {hasMeta && (
          <Skeleton width="40%" height={10} theme={theme} animation={animation} variant="text" opacity={0.6} />
        )}
      </div>
    </div>
  );
});

SkeletonListItem.displayName = 'SkeletonListItem';