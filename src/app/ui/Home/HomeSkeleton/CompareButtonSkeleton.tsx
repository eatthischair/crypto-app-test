import { Skeleton } from '@/components/ui/skeleton';
export const CompareButtonSkeleton = () => {
  return (
    <div className="grid grid-cols-2 my-2 h-full py-2">
      {/* Left side - Text skeleton */}
      <div className="mt-2 pt-4">
        <Skeleton className="h-3 sm:h-4 w-58"></Skeleton>
      </div>

      {/* Right side - Button skeleton */}
      <Skeleton className="sm:p-3 rounded-xs justify-self-end h-11 w-42"></Skeleton>
    </div>
  );
};
