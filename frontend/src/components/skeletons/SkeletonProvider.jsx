import React from 'react';
import { SkeletonContext } from './SkeletonContext';

export function SkeletonProvider({ children, theme = 'light', animation = 'pulse' }) {
  return (
    <SkeletonContext.Provider value={{ theme, animation }}>
      {children}
    </SkeletonContext.Provider>
  );
}