import { Skeleton } from '@/components/ui/skeleton';

export const ChartSkeletons = () => {
  return (
    <div className="min-w-full grid grid-cols-1 grid-rows-2 gap-2 sm:gap-2 py-4 sm:flex sm:px-0">
      {/* LineChart Skeleton */}
      <div className="sm:flex-1 sm:min-w-1/2">
        <Skeleton className="min-h-[400px] min-w-[400px] w-full rounded-md text-h"></Skeleton>
      </div>

      {/* BarChart Skeleton */}
      <div className="sm:flex-1 sm:min-w-1/2 w-full">
        <Skeleton className="min-h-[400px] min-w-[400px]  w-full rounded-md text-h"></Skeleton>
      </div>
    </div>
  );
};
