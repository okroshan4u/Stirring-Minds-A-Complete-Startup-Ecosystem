'use client';

import { cn } from '@/lib/api';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
}

export default function Skeleton({
  className,
  variant = 'rectangular',
}: SkeletonProps) {
  const variants = {
    text: 'h-4 rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-xl',
  };

  return (
    <div
      className={cn(
        'bg-gradient-to-r from-neutral-200 via-neutral-100 to-neutral-200',
        'animate-shimmer bg-[length:200%_100%]',
        variants[variant],
        className
      )}
    />
  );
}

// Skeleton card for deal loading states
export function SkeletonDealCard() {
  return (
    <div className="bg-white rounded-2xl border border-neutral-200 p-6 space-y-4">
      <div className="flex items-start justify-between">
        <div className="space-y-3 flex-1">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
        <Skeleton variant="circular" className="h-16 w-16" />
      </div>
      <div className="flex gap-2">
        <Skeleton className="h-6 w-20" />
        <Skeleton className="h-6 w-24" />
      </div>
      <div className="flex items-center justify-between pt-4 border-t border-neutral-200">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-10 w-28" />
      </div>
    </div>
  );
}