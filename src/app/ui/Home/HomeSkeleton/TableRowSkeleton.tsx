import { Skeleton } from '@/components/ui/skeleton';

export const TableRowSkeleton = () => {
  return Array.from({ length: 50 }).map((_, i) => (
    <Skeleton key={i} className="h-24 w-full my-1" />
  ));
};
