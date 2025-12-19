"use client";

import dynamic from 'next/dynamic';
import React, { Suspense } from 'react';

// Loading placeholder
function LoadingState() {
  return (
    <div className="h-[calc(100vh-4rem)] w-full flex items-center justify-center">
      <div className="animate-pulse text-[var(--text-tertiary)]">Loading playground...</div>
    </div>
  );
}

// Error/Not found placeholder
function NotFoundState({ slug }: { slug: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h2 className="text-2xl font-bold mb-2 text-[var(--text-primary)]">Component Not Found</h2>
      <p className="text-[var(--text-secondary)]">
        The interactive component for <code className="bg-[var(--glass-1-fill)] px-1 py-0.5 rounded">{slug}</code> could not be loaded.
      </p>
    </div>
  );
}

// Dynamically import components - each wrapped to handle its own loading
const AnimationPlayground = dynamic(
  () => import('@/projects/animation-playground').then((mod) => mod.AnimationPlayground),
  { ssr: false, loading: LoadingState }
);

// Registry of project components
const projectRegistry: Record<string, React.ComponentType> = {
  'animation-playground': AnimationPlayground,
};

// Individual project wrapper components that don't have conditional hooks
function AnimationPlaygroundPage() {
  return (
    <Suspense fallback={<LoadingState />}>
      <AnimationPlayground />
    </Suspense>
  );
}

// Map slugs to their stable wrapper components
const stableComponents: Record<string, React.ComponentType> = {
  'animation-playground': AnimationPlaygroundPage,
};

export function ProjectClient({ slug }: { slug: string }) {
  // Always render - no conditional returns before this
  const StableComponent = stableComponents[slug];
  
  // If no component exists for this slug, show not found
  // This is safe because NotFoundState has no hooks
  if (!StableComponent) {
    return <NotFoundState slug={slug} />;
  }

  return <StableComponent />;
}
