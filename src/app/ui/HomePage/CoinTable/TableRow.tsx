'use client';
import { Progress } from '@/components/ui/progress';
import { CoinTableLineChart } from './CoinTableLineChart';
import { formatNum, formatPriceChange } from '../../../../lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { convert } from '../../HeaderComponents/NavBar/convert';
import Skeleton from 'react-loading-skeleton';
import { useRef } from 'react';
import { LoadingSpinner } from '@/components/ui/loadingSpinner';
export const TableRow = ({ coin, index }) => {
  const currency = useSelector((state: any) => state.currencyReducer.currency);
  const exchangeRates = useSelector(
    (state: any) => state.exchangeRatesReducer.exchangeRates
  );
  const ref = useRef(null);
  if (
    !currency ||
    !exchangeRates ||
    !exchangeRates.rates ||
    !exchangeRates.rates[currency] ||
    !exchangeRates.rates.usd
  ) {
    return <LoadingSpinner />;
  }
  const exchangeRateObj = exchangeRates?.rates?.[currency];

  const progressVolumeMarketCap = (coin.total_volume / coin.market_cap) * 100;
  const circulatingTotalSupply =
    (coin.circulating_supply / coin.total_supply) * 100;

  const { currentPrice, unit } = convert(
    coin.current_price,
    exchangeRateObj,
    exchangeRates.rates.usd
  );
  const totalVolume = convert(
    coin.total_volume,
    exchangeRateObj,
    exchangeRates.rates.usd
  ).currentPrice;
  const marketCap = convert(
    coin.market_cap,
    exchangeRateObj,
    exchangeRates.rates.usd
  ).currentPrice;

  return (
    <div
      className="grid grid-cols-[40%_20%_40%] gap-2 p-2 truncate h-[15vh] border
    sm:grid-cols-[25%_10%_6%_6%_6%_12%_12%_15%] sm:gap-4 sm:p-4 sm:h-[15vh]
    hover:bg-[var(--card)] transition-all duration-1000 ease-in-out rounded-lg hover:border-[var(--primary)] hover:border
    text-sm sm:text-base"
    >
      <div className="grid grid-cols-[40%_60%] sm:grid-cols-[15%_85%] p-0 m-0 break-words whitespace-normal items-center">
        <div className="p-1">
          <Image
            src={coin.image}
            width="40"
            height="40"
            sizes="(max-width: 500px) 300vw, 300vw (max-width: 1200px) 50vw"
            alt="Coin Icon"
          />
        </div>
        <Link href={`/coin/${coin.id}`}>
          {coin.name}
          {'\n'}({coin.symbol.toUpperCase()})
        </Link>
      </div>
      <div className="flex items-center">
        {unit} {formatNum(currentPrice)}
      </div>

      <div className="hidden sm:flex sm:items-center">
        {formatPriceChange(coin.price_change_percentage_1h_in_currency)}
      </div>
      <div className="hidden sm:flex sm:items-center ">
        {formatPriceChange(coin.price_change_percentage_24h_in_currency)}
      </div>
      <div className="hidden sm:flex sm:items-center">
        {formatPriceChange(coin.price_change_percentage_7d_in_currency)}
      </div>

      <div className="hidden sm:grid sm:grid-cols-2 sm:grid-rows-[25%_75%] sm:m-0 sm:p-0">
        <div className="m-0 p-0 pt-6">{formatNum(totalVolume)}</div>
        <div className="m-0 p-0"></div>
        <div className="m-0 p-0 pt-6">{formatNum(marketCap)}</div>
        <div className="col-span-3 m-0 p-0 py-1 sm:flex sm:items-center">
          <Progress value={progressVolumeMarketCap} />
        </div>
      </div>

      <div className="hidden sm:grid sm:grid-cols-2 sm:grid-rows-[25%_75%] sm:gap-0 sm:m-0 sm:p-0 sm:align-items-center">
        <div className="m-0 p-0 pt-6">{formatNum(coin.circulating_supply)}</div>
        <div></div>
        <div className="m-0 p-0 pt-6">{formatNum(coin.total_supply)}</div>

        <div className="col-span-3 gap-0 h-full py-1 sm:flex sm:items-center">
          <Progress value={circulatingTotalSupply} />
        </div>
      </div>
      <div>
        <CoinTableLineChart coin={coin} />
      </div>
    </div>
  );
};
