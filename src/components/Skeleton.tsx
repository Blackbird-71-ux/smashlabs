'use client';

interface SkeletonProps {
  className?: string
}

export function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse bg-gray-200 rounded ${className}`}
      role="status"
      aria-label="Loading"
    />
  )
}

export function TextSkeleton({ className = '' }: SkeletonProps) {
  return <Skeleton className={`h-4 w-3/4 ${className}`} />;
}

export function ImageSkeleton({ className = '' }: SkeletonProps) {
  return <Skeleton className={`aspect-video w-full ${className}`} />;
}

export function CardSkeleton({ className = '' }: SkeletonProps) {
  return (
    <div className={`space-y-4 ${className}`}>
      <ImageSkeleton />
      <div className="space-y-2">
        <TextSkeleton />
        <TextSkeleton className="w-1/2" />
      </div>
    </div>
  );
}

export function GridSkeleton({ count = 3, className = '' }: SkeletonProps & { count?: number }) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-${count} gap-6 ${className}`}>
      {Array.from({ length: count }).map((_, index) => (
        <CardSkeleton key={index} />
      ))}
    </div>
  );
} 