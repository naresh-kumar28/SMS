import React, { useState } from 'react';
import { Skeleton, SkeletonText, SkeletonHeading, SkeletonAvatar, SkeletonMedia, SkeletonInput, SkeletonButton, SkeletonList, SkeletonTable, SkeletonCard, SkeletonMetricCard, SkeletonSectionCard, SkeletonSelect } from '../../components/common/Skeleton';
import { SectionCard } from '../../components/common/DashboardPrimitives';
import AppIcon from '../../components/common/AppIcon';

export default function SkeletonShowcase() {
  const [activeAnimation, setActiveAnimation] = useState('pulse');
  const [activeTheme, setActiveTheme] = useState('slate');

  const animations = [
    { key: 'pulse', label: 'Pulse', desc: 'Gentle opacity pulse' },
    { key: 'shimmer', label: 'Shimmer', desc: 'Light sweep effect' },
    { key: 'wave', label: 'Wave', desc: 'Smooth wave motion' },
    { key: 'glow', label: 'Glow', desc: 'Soft glow transition' },
  ];

  const themes = [
    { key: 'slate', label: 'Slate', desc: 'Default slate-200' },
    { key: 'primary', label: 'Primary', desc: 'Brand primary tint' },
    { key: 'secondary', label: 'Secondary', desc: 'Muted secondary' },
    { key: 'accent', label: 'Accent', desc: 'Amber accent tint' },
    { key: 'surface', label: 'Surface', desc: 'Surface container' },
  ];

  const variants = [
    { key: 'text', label: 'Text', desc: 'Standard text block' },
    { key: 'circle', label: 'Circle', desc: 'Circular shape' },
    { key: 'rectangle', label: 'Rectangle', desc: 'Rounded rectangle' },
    { key: 'rounded', label: 'Rounded', desc: 'Standard rounded' },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-10">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-on-surface">Skeleton Loader Showcase</h1>
        <p className="text-on-surface-variant">Interactive examples of all skeleton variants and configurations.</p>
      </div>

      {/* Controls */}
      <SectionCard title="Animation & Theme Controls">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-bold text-on-surface mb-3">Animation Type</h3>
            <div className="flex flex-wrap gap-2">
              {animations.map((anim) => (
                <button
                  key={anim.key}
                  onClick={() => setActiveAnimation(anim.key)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    activeAnimation === anim.key
                      ? 'bg-primary text-white shadow-lg shadow-primary/20'
                      : 'bg-surface-container hover:bg-surface-container-high text-on-surface-variant'
                  }`}
                >
                  {anim.label}
                </button>
              ))}
            </div>
            <p className="text-xs text-on-surface-variant mt-2">{animations.find(a => a.key === activeAnimation)?.desc}</p>
          </div>
          <div>
            <h3 className="text-sm font-bold text-on-surface mb-3">Color Theme</h3>
            <div className="flex flex-wrap gap-2">
              {themes.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setActiveTheme(t.key)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    activeTheme === t.key
                      ? 'bg-primary text-white shadow-lg shadow-primary/20'
                      : 'bg-surface-container hover:bg-surface-container-high text-on-surface-variant'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <p className="text-xs text-on-surface-variant mt-2">{themes.find(t => t.key === activeTheme)?.desc}</p>
          </div>
        </div>
      </SectionCard>

      {/* Basic Variants */}
      <SectionCard title="Basic Shape Variants">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {variants.map((v) => (
            <div key={v.key} className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/20 text-center space-y-3">
              <div className="flex justify-center">
                <Skeleton
                  variant={v.key}
                  width={v.key === 'circle' ? 48 : v.key === 'text' ? 120 : 64}
                  height={v.key === 'circle' ? 48 : v.key === 'text' ? 16 : 48}
                  theme={activeTheme}
                  animation={activeAnimation}
                />
              </div>
              <p className="text-sm font-medium text-on-surface">{v.label}</p>
              <p className="text-xs text-on-surface-variant">{v.desc}</p>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Size Variations */}
      <SectionCard title="Size Variations">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Skeleton width={80} height={80} theme={activeTheme} animation={activeAnimation} variant="circle" />
            <Skeleton width={120} height={24} theme={activeTheme} animation={activeAnimation} />
          </div>
          <div className="flex items-center gap-4">
            <Skeleton width={48} height={48} theme={activeTheme} animation={activeAnimation} variant="circle" />
            <Skeleton width={200} height={20} theme={activeTheme} animation={activeAnimation} />
          </div>
          <div className="flex items-center gap-4">
            <Skeleton width={32} height={32} theme={activeTheme} animation={activeAnimation} variant="circle" />
            <Skeleton width={150} height={16} theme={activeTheme} animation={activeAnimation} />
          </div>
        </div>
      </SectionCard>

      {/* Text Variations */}
      <SectionCard title="Text Block Variations">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-on-surface">Variable Width Lines</h4>
            <SkeletonText lines={4} theme={activeTheme} animation={activeAnimation} />
          </div>
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-on-surface">Heading Levels</h4>
            <SkeletonHeading level={1} theme={activeTheme} width="300px" animation={activeAnimation} />
            <SkeletonHeading level={2} theme={activeTheme} width="240px" animation={activeAnimation} />
            <SkeletonHeading level={3} theme={activeTheme} width="180px" animation={activeAnimation} />
            <SkeletonHeading level={4} theme={activeTheme} width="140px" animation={activeAnimation} />
          </div>
        </div>
      </SectionCard>

      {/* Form Fields */}
      <SectionCard title="Form Field Skeleton Variants">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <SkeletonInput labelWidth="80px" theme={activeTheme} animation={activeAnimation} />
            <SkeletonSelect labelWidth="100px" theme={activeTheme} animation={activeAnimation} />
            <SkeletonTextarea labelWidth="120px" rows={3} theme={activeTheme} animation={activeAnimation} />
          </div>
          <div className="flex gap-3 items-end">
            <SkeletonButton width={120} theme={activeTheme} animation={activeAnimation} />
            <SkeletonButton width={140} theme="primary" animation={activeAnimation} />
            <SkeletonIconButton size={48} theme={activeTheme} animation={activeAnimation} />
          </div>
        </div>
      </SectionCard>

      {/* Media & Avatar */}
      <SectionCard title="Media Components">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-bold text-on-surface mb-3">Image / Media Skeleton</h4>
            <SkeletonMedia
              width="100%"
              height={200}
              ratio="16/9"
              theme={activeTheme}
              animation={activeAnimation}
              rounded="lg"
            />
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-on-surface mb-3">Avatar Group</h4>
            <div className="flex items-center gap-2">
              <SkeletonAvatar size={40} theme={activeTheme} animation={activeAnimation} />
              <SkeletonAvatar size={40} theme={activeTheme} animation={activeAnimation} />
              <SkeletonAvatar size={40} theme={activeTheme} animation={activeAnimation} />
            </div>
          </div>
        </div>
      </SectionCard>

      {/* List Skeleton */}
      <SectionCard title="List Skeleton">
        <div className="space-y-4">
          <div className="flex gap-2">
            <SkeletonButton width={80} theme="primary" animation={activeAnimation} />
            <SkeletonButton width={80} theme="surface" animation={activeAnimation} />
          </div>
          <SkeletonList items={4} avatar={true} hasMeta={true} theme={activeTheme} animation={activeAnimation} />
        </div>
      </SectionCard>

      {/* Table Skeleton */}
      <SectionCard title="Table Skeleton">
        <SkeletonTable rows={5} cols={4} hasHeader={true} theme={activeTheme} animation={activeAnimation} />
      </SectionCard>

      {/* Cards */}
      <SectionCard title="Card Variants">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SkeletonCard
            width="100%"
            height={200}
            rounded="lg"
            hasHeader={true}
            theme={activeTheme}
            animation={activeAnimation}
          />
          <SkeletonMetricCard theme="primary" />
          <SkeletonSectionCard title={true} description={true} />
        </div>
      </SectionCard>

      {/* Profile Page Template */}
      <SectionCard title="Profile Page Template">
        <div className="max-w-3xl mx-auto">
          <ProfileSkeleton />
        </div>
      </SectionCard>

      {/* Dashboard Template */}
      <SectionCard title="Dashboard Template">
        <DashboardSkeleton />
      </SectionCard>

      {/* Custom Gradient Example */}
      <SectionCard title="Custom Gradient Skeleton">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Skeleton
            width="100%"
            height={100}
            gradient={true}
            animation="shimmer"
            rounded="xl"
          />
          <Skeleton
            width="100%"
            height={100}
            gradientFrom="#0052FF"
            gradientTo="#00D4AA"
            animation="shimmer"
            rounded="xl"
          />
          <Skeleton
            width="100%"
            height={100}
            gradientFrom="#FF0080"
            gradientTo="#7928CA"
            animation="shimmer"
            rounded="xl"
          />
        </div>
      </SectionCard>
    </div>
  );
}