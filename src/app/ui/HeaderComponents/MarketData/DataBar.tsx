'use client';
import { Progress } from '@/components/ui/progress';
import { LoadingSpinner } from '@/components/ui/loadingSpinner';
import { useSelector } from 'react-redux';
import { convert } from '../NavBar/convert';
import { formatNum } from '@/lib/utils';
import Skeleton from 'react-loading-skeleton';
import Image from 'next/image';

export function DataBar({ data }) {
  const currency = useSelector((state: any) => state.currencyReducer.currency);
  const exchangeRates = useSelector(
    (state: any) => state.exchangeRatesReducer.exchangeRates
  );

  if (
    !currency ||
    !exchangeRates ||
    !exchangeRates.rates ||
    !exchangeRates.rates[currency] ||
    !exchangeRates.rates.usd
  ) {
    return (
      <div className="w-screen h-screen">
        <Skeleton count={20} />
      </div>
    );
  }
  const exchangeRateObj = exchangeRates?.rates?.[currency];

  const totalVolume = convert(
    data.total_volume.btc,
    exchangeRateObj,
    exchangeRates.rates.usd
  ).currentPrice;
  const marketCap = convert(
    data.total_market_cap.btc,
    exchangeRateObj,
    exchangeRates.rates.usd
  ).currentPrice;

  return (
    <span className="max-w-[90%] flex m-auto my-4 h-[10%] sm:w-[60%] items-center justify-center gap-4 text-xs z-0 ">
      <div className="p-2 sm:p-8">Coins {data.active_cryptocurrencies}</div>
      <div className="p-2 sm:p-8">Exchange {data.markets} </div>
      <div className="p-2 sm:p-8">{formatNum(marketCap)}</div>
      <div className="flex flex-grow flex-nowrap items-center gap-2">
        {formatNum(totalVolume)}
        <Progress className="w-[50%] m-0" value={Math.trunc(totalVolume)} />
      </div>
      <div className="flex flex-grow flex-nowrap items-center gap-2">
        <Image src="/icons/bitcoin.svg" width={20} height={20} alt="btc logo" />
        {Math.trunc(data.market_cap_percentage.btc)}%
        <Progress
          className="w-[50%] m-0"
          value={Math.trunc(data.market_cap_percentage.btc)}
        />
      </div>
      <div className="flex flex-grow flex-nowrap items-center gap-2">
        <Image
          src="/icons/ethereum.svg"
          width={20}
          height={20}
          alt="eth logo"
        />
        {Math.trunc(data.market_cap_percentage.eth)}%{' '}
        <Progress className="w-[50%] m-0" value={8} />
      </div>
    </span>
  );
}
