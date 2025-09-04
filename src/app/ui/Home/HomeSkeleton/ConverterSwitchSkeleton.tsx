import { Skeleton } from '@/components/ui/skeleton';

export const ConverterSwitchSkeleton = () => {
  return (
    <div className="sm:flex items-center self-start gap-1 my-4">
      <Skeleton className="h-15 w-68 rounded-md" />
      <Skeleton className="h-15 w-78 rounded-md" />
    </div>
  );
};
