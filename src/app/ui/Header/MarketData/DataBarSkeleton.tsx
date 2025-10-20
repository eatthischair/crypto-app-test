import { Skeleton } from '@/components/ui/skeleton';

export function DataBarSkeleton() {
  return (
    <>
      <Skeleton className="max-w-screen min-w-[200vh] flex my-4 items-center justify-center gap-2 border-y sm:py-0 sm:gap-12 text-xs z-0 dark:bg-[var(--card)] sm:-mt-12 sm:-ml-25 max-h-[50px] h-[3rem] sm:h-full rounded-none">
        <div className="p-2 py-0 sm:p-8 hidden sm:flex gap-2 items-center">
          <Skeleton className="rounded-full w-4 h-5" />
          <Skeleton className="h-5 w-12" />
        </div>
        <div className="p-2 sm:p-0 hidden sm:flex gap-2 items-center">
          <Skeleton className="w-4 h-5" />
          <Skeleton className="h-5 w-16" />
        </div>
        <div className="p-2 sm:p-0 hidden sm:flex gap-2 items-center">
          <Skeleton className="w-4 h-5" />
          <Skeleton className="h-5 w-20" />
        </div>
        <div className="flex flex-nowrap items-center gap-2">
          <Skeleton className="h-5 w-12" />
          <Skeleton className="h-5 w-16" />
        </div>
        <div className="flex flex-nowrap items-center gap-2">
          <Skeleton className="h-5 w-[75px] sm:w-[125px] rounded-md" />
        </div>
        <div className="flex flex-nowrap items-center gap-2">
          <Skeleton className="h-5 w-[75px] sm:w-[125px] rounded-sm" />
        </div>
      </Skeleton>
    </>
  );
}
