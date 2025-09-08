import { Skeleton } from '@/components/ui/skeleton';
export const CompareButtonSkeleton = () => {
  return (
    <div className="grid grid-cols-2 my-2 h-full py-2 mb-6 sm:mb-0">
      {/* Left side - Text skeleton */}
      <div className="mt-2 pt-4">
        <Skeleton className="hidden sm:block sm:h-4 w-58"></Skeleton>
      </div>

      {/* Right side - Button skeleton */}
      <Skeleton className="sm:p-3 rounded-xs justify-self-end h-8 sm:h-11 w-42"></Skeleton>
    </div>
  );
};
