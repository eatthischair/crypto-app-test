import { Progress } from '@/components/ui/progress';
import { CoinTableLineChart } from './CoinTableLineChart';
import { formatNum, formatPriceChange } from '../../../../lib/utils';
import Image from 'next/image';
import Link from 'next/link';

import { useSelector } from 'react-redux';
import { convert } from '../../HeaderComponents/NavBar/convert';
export const TableRow = ({ coin, index, ref }) => {
  const progressVolumeMarketCap = (coin.total_volume / coin.market_cap) * 100;
  const circulatingTotalSupply =
    (coin.circulating_supply / coin.total_supply) * 100;

  const currency = useSelector((state) => state.currencyReducer.currency);
  const { currentPrice, unit } = convert(coin.current_price, currency);
  const totalVolume = convert(coin.total_volume, currency).currentPrice;
  const marketCap = convert(coin.market_cap, currency).currentPrice;

  return (
    <div
      ref={ref}
      className="grid grid-cols-[5%_20%_10%_6%_6%_6%_12%_12%_15%] gap-4 p-4 truncate h-[15vh]
      hover:bg-[var(--card)] transition-all duration-1000 ease-in-out rounded-lg hover:border-[var(--primary)] hover:border"
    >
      <div>{index + 1}</div>
      <div className="grid grid-cols-[15%_85%] p-0 m-0 break-words whitespace-normal ">
        <Image src={coin.image} width="30" height="30" alt="Coin Icon" />
        <Link href={`/coin/${coin.id}`}>
          {coin.name}({coin.symbol.toUpperCase()})
        </Link>
      </div>
      <div>
        {unit} {formatNum(currentPrice)}
      </div>

      <div>
        {formatPriceChange(coin.price_change_percentage_1h_in_currency)}
      </div>
      <div>
        {formatPriceChange(coin.price_change_percentage_24h_in_currency)}
      </div>
      <div>
        {formatPriceChange(coin.price_change_percentage_7d_in_currency)}
      </div>

      <div className="grid grid-cols-2 grid-rows-[25%_75%] m-0 p-0">
        <div className="m-0 p-0">{formatNum(totalVolume)}</div>
        <div className="m-0 p-0"></div>
        <div className="m-0 p-0">{formatNum(marketCap)}</div>
        <div className="col-span-3 m-0 p-0 py-1">
          <Progress value={progressVolumeMarketCap} />
        </div>
      </div>

      <div className="grid grid-cols-2 grid-rows-[25%_75%] gap-0 m-0 p-0 align-items-center">
        <div className="m-0 p-0">{formatNum(coin.circulating_supply)}</div>
        <div></div>
        <div className="m-0 p-0">{formatNum(coin.total_supply)}</div>

        <div className="col-span-3 gap-0 h-full py-1">
          <Progress value={circulatingTotalSupply} />
        </div>
      </div>
      <div>
        <CoinTableLineChart coin={coin} />
      </div>
    </div>
  );
};
