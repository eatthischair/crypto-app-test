import { Progress } from '@/components/ui/progress';
import { CoinTableLineChart } from './CoinTableLineChart';
import { FaCaretDown } from 'react-icons/fa';
import { FaCaretUp } from 'react-icons/fa';
import { Image } from 'next/image';
export const TableRow = ({ coin, index }) => {
  const progressVolumeMarketCap = (coin.total_volume / coin.market_cap) * 100;
  const circulatingTotalSupply =
    (coin.circulating_supply / coin.total_supply) * 100;

  const formatNum = (num) => {
    return new Intl.NumberFormat('en', {
      notation: 'compact',
      maximumSignificantDigits: 3,
    }).format(num);
  };

  const formatPriceChange = (num) => {
    const isPositive = Math.sign(num);
    const formatted = isPositive === 1 ? <FaCaretUp /> : <FaCaretDown />;
    const color = isPositive === 1 ? 'text-green-500' : 'text-red-500';
    num = isPositive === 1 ? num : num.split('-');

    const classNameString = `flex items-center gap-1 ${color}`;
    return (
      <div className={classNameString}>
        {formatted}
        {num}%
      </div>
    );
  };
  return (
    <div className="grid grid-cols-[5%_20%_10%_5%_5%_5%_12%_12%_15%] gap-4 p-4 truncate h-[15vh]">
      <div>{index}</div>
      <div className="grid grid-cols-[15%_85%] p-0 m-0 break-words whitespace-normal ">
        <img className="m-0 p-0" src={coin.image} width="30" />
        <div className="m-0 p-0">
          {coin.name}({coin.symbol.toUpperCase()})
        </div>
      </div>
      <div>${coin.current_price}</div>
      <div>
        {formatPriceChange(
          coin.price_change_percentage_1h_in_currency.toFixed(2)
        )}
      </div>
      <div>
        {formatPriceChange(
          coin.price_change_percentage_24h_in_currency.toFixed(2)
        )}
      </div>
      <div>
        {formatPriceChange(
          coin.price_change_percentage_7d_in_currency.toFixed(2)
        )}
      </div>

      <div className="grid grid-cols-2 grid-rows-[25%_75%] m-0 p-0">
        <div className="m-0 p-0">{formatNum(coin.total_volume)}</div>
        <div className="m-0 p-0"></div>
        <div className="m-0 p-0">{formatNum(coin.market_cap)}</div>

        <div className="col-span-3 m-0 p-0">
          <Progress value={progressVolumeMarketCap} />
        </div>
      </div>

      <div className="grid grid-cols-2 grid-rows-[25%_75%] gap-0 m-0 p-0">
        <div className="m-0 p-0">{formatNum(coin.circulating_supply)}</div>
        <div></div>
        <div className="m-0 p-0">{formatNum(coin.total_supply)}</div>

        <div className="col-span-3 gap-0 h-full">
          <Progress value={circulatingTotalSupply} />
        </div>
      </div>

      <CoinTableLineChart coin={coin} />
    </div>
  );
};
