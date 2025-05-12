import { Progress } from '@/components/ui/progress';
import { LoadingSpinner } from '@/components/ui/loadingSpinner';
import { useSelector } from 'react-redux';
import { convert } from '../NavBar/convert';
import { formatNum } from '@/lib/utils';
export function DataBar({ data }) {
  // if (!data) return <LoadingSpinner />;

  const test = useSelector((state) => state.testReducer.test);

  // const { currentPrice, unit } = convert(coin.current_price, test);
  const totalVolume = convert(data.total_volume.btc, test).currentPrice;
  const marketCap = convert(data.total_market_cap.btc, test).currentPrice;

  console.log('data in databar', data);
  return (
    <span className="flex m-auto my-4 h-[10%] w-[60%] items-center justify-center gap-4 text-xs z-0">
      <div className="p-8">Coins {data.active_cryptocurrencies}</div>
      <div className="p-8">Exchange {data.markets} </div>
      <div className="p-8">{formatNum(marketCap)}</div>
      <div className="flex flex-grow flex-nowrap items-center gap-2">
        {formatNum(totalVolume)}
        <Progress className="w-[50%] m-0" value={Math.trunc(totalVolume)} />
      </div>
      <div className="flex flex-grow flex-nowrap items-center gap-2">
        {Math.trunc(data.market_cap_percentage.btc)}%
        <Progress
          className="w-[50%] m-0"
          value={Math.trunc(data.market_cap_percentage.btc)}
        />
      </div>
      <div className="flex flex-grow flex-nowrap items-center gap-2">
        {Math.trunc(data.market_cap_percentage.eth)}%{' '}
        <Progress className="w-[50%] m-0" value={8} />
      </div>
    </span>
  );
}
