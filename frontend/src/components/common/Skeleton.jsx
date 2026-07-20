// Legacy Skeleton exports - re-exporting from new optimized skeleton system
// New implementation: src/components/skeletons/

export { Skeleton } from '../skeletons/base/Skeleton';
export { SkeletonText } from '../skeletons/primitives/SkeletonText';
export { SkeletonCircle as SkeletonAvatar, SkeletonAvatar as SkeletonAvatarNew } from '../skeletons/primitives/SkeletonAvatar';
export { SkeletonInput } from '../skeletons/patterns/SkeletonInput';
export { SkeletonTextarea } from '../skeletons/patterns/SkeletonTextarea';
export { SkeletonButton } from '../skeletons/patterns/SkeletonButton';
export { SkeletonListItem } from '../skeletons/patterns/SkeletonList';
export { SkeletonList } from '../skeletons/patterns/SkeletonList';
export { SkeletonTable } from '../skeletons/patterns/SkeletonTable';
export { SkeletonCard } from '../skeletons/patterns/SkeletonCard';
export { SkeletonBox } from '../skeletons/primitives/SkeletonBox';
export { SkeletonMetricCard } from '../skeletons/patterns/SkeletonCard';
export { SkeletonSectionCard } from '../skeletons/patterns/SkeletonCard';
export { ProfileSkeleton } from '../skeletons/pages/ProfileSkeleton';
export { DashboardSkeleton } from '../skeletons/pages/DashboardSkeleton';
export { TeachersSkeleton } from '../skeletons/pages/TeachersSkeleton';
export { StudentsTableSkeleton } from '../skeletons/pages/StudentsTableSkeleton';

// Additional exports available from src/components/skeletons/index.js:
// - SkeletonProvider, useSkeleton (for theming)
// - All primitives and patterns
// - Page-level templates