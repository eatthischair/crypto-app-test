'use client';
import Skeleton from 'react-loading-skeleton';

const CoinTableSkeleton = () => {
  const skeletonHeight = 70;
  return (
    <div>
      <Skeleton height={skeletonHeight} />
      <Skeleton height={skeletonHeight} />
      <Skeleton height={skeletonHeight} />
      <Skeleton height={skeletonHeight} />
      <Skeleton height={skeletonHeight} />
      <Skeleton height={skeletonHeight} />
      <Skeleton height={skeletonHeight} />
      <Skeleton height={skeletonHeight} />
    </div>
  );
};

export default CoinTableSkeleton;
