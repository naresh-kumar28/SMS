import React from 'react';
import { Skeleton } from '../base/Skeleton';

/**
 * Table skeleton - for data tables and lists
 * Flat structure, no nested divs
 */
export const SkeletonTable = React.memo(function SkeletonTable({
  rows = 5,
  cols = 3,
  hasHeader = true,
  theme = 'light',
  animation = 'pulse',
  className = '',
  ...props
}) {
  return (
    <div className={`overflow-hidden rounded-xl border border-slate-200/50 bg-white/30 backdrop-blur-sm ${className}`} {...props}>
      {hasHeader && (
        <div className="grid gap-2 p-4 border-b border-slate-200/50" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
          {Array.from({ length: cols }, (_, i) => (
            <Skeleton key={i} height={14} width="80%" theme={theme} animation={animation} variant="text" />
          ))}
        </div>
      )}
      <div className="p-4 space-y-3">
        {Array.from({ length: rows }, (_, i) => (
          <div key={i} className="grid gap-2" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
            {Array.from({ length: cols }, (_, j) => (
              <Skeleton key={j} height={12} theme={theme} animation={animation} variant="text" opacity={0.6 + (j % 3) * 0.15} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
});

SkeletonTable.displayName = 'SkeletonTable';