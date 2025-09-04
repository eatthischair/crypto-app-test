'use client';
import { Skeleton } from '@/components/ui/skeleton';

export const ChartButtonsSkeleton = () => {
  return (
    <div className="flex basis-1/6 gap-2">
      {/* Desktop - 6 simple skeletons */}
      {Array.from({ length: 6 }).map((_, index) => (
        <Skeleton key={index} className={'h-18 w-64'}></Skeleton>
      ))}
    </div>
  );
};
