import { Skeleton } from '@/components/ui/skeleton';

export const ChartTimelineSkeleton = () => {
  return (
    <Skeleton className="p-1 rounded-xs w-91 ">
      {Array.from({ length: 6 }).map((_, index) => (
        <Skeleton
          key={index}
          className="flex-grow rounded-sm  m-1 p-4 inline-block"
        ></Skeleton>
      ))}
    </Skeleton>
  );
};
