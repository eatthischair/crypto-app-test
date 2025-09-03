import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

export const ConverterSwitchSkeleton = () => {
  return (
    <Skeleton className="py-0 px-18 hidden md:flex items-center rounded-md self-start gap-1 my-4 animate-pulse bg-gray-200 dark:bg-gray-700">
      <div className={`p-[1px] -ml-16 rounded-md bg-gray-200 dark:bg-gray-700`}>
        <Skeleton
          className={`py-6 px-30 rounded-md bg-gray-200 dark:bg-gray-700`}
        ></Skeleton>
      </div>

      <div className={`p-[1px] rounded-md`}>
        <div className={`py-3 px-8 rounded-md`}>
          <Skeleton className="px-24 py-6 bg-gray-200 dark:bg-gray-700"></Skeleton>
        </div>
      </div>
    </Skeleton>
  );
};
