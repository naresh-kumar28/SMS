import { createContext, useContext } from 'react';

export const SkeletonContext = createContext({
  theme: 'light',
  animation: 'pulse',
});

export const useSkeleton = () => useContext(SkeletonContext);
