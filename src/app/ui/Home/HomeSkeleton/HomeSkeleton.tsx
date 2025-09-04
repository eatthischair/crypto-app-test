import { ChartButtonsSkeleton } from './ChartButtonsSkeleton';
import { ConverterSwitchSkeleton } from './ConverterSwitchSkeleton';
import { CompareButtonSkeleton } from './CompareButtonSkeleton';
import { ChartSkeletons } from './ChartSkeletons';
import { ChartTimelineSkeleton } from './ChartTimelineSkeleton';
import { CoinTableSkeleton } from './CoinTableSkeleton';

export const HomeSkeleton = () => {
  return (
    <>
      <div className="w-full max-w-full col-span-1 flex flex-shrink ">
        <ConverterSwitchSkeleton />
      </div>
      <div className="">
        <CompareButtonSkeleton />
      </div>
      <div className="">
        <ChartButtonsSkeleton />
      </div>
      <div className="max-w-full grid grid-cols-1 grid-rows-2 gap-2 sm:gap-2 py-4 sm:flex sm:px-0 ">
        <ChartSkeletons />
      </div>
      <div className="grid-cols-5 flex justify-between rounded">
        <ChartTimelineSkeleton />
      </div>
      <div>
        <CoinTableSkeleton />
      </div>
    </>
  );
};
