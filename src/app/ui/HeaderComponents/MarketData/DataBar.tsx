import { Progress } from '@/components/ui/progress';
import { LoadingSpinner } from '@/components/ui/loadingSpinner';

export function DataBar({ data }) {
  if (!data) return <LoadingSpinner />;
  return (
    <span className="flex m-auto my-4 h-[10%] w-[60%] items-center justify-center gap-4 text-xs ">
      <div className="p-8">Coins {data.active_cryptocurrencies}</div>
      <div className="p-8">Exchange {data.markets} </div>
      <div className="p-8">$2.77T</div>
      <div className="flex flex-grow flex-nowrap items-center gap-2">
        $126.46B
        <Progress className="w-[50%] m-0" value={5} />
      </div>
      <div className="flex flex-grow flex-nowrap items-center gap-2">
        {Math.trunc(data.market_cap_percentage.btc)}%
        <Progress className="w-[50%] m-0" value={59} />
      </div>
      <div className="flex flex-grow flex-nowrap items-center gap-2">
        {Math.trunc(data.market_cap_percentage.eth)}%{' '}
        <Progress className="w-[50%] m-0" value={8} />
      </div>
    </span>
  );
}
