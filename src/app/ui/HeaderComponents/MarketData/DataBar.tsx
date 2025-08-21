'use client';
import { Progress } from '@/components/ui/progress';
import ProgressBar from '@ramonak/react-progress-bar';

import { LoadingSpinner } from '@/components/ui/loadingSpinner';
import { useSelector } from 'react-redux';
import { convert } from '../NavBar/convert';
import { formatNum } from '@/lib/utils';
import Skeleton from 'react-loading-skeleton';
import Image from 'next/image';
import { Zap, SendToBack, ChevronUp } from 'lucide-react';

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
    !exchangeRates.rates.usd ||
    !data ||
    !data.total_volume
  ) {
    return (
      <div className="w-screen h-screen">
        <Skeleton count={1} />
      </div>
    );
  }
  const exchangeRateObj = exchangeRates?.rates?.[currency];

  const totalVolume = convert(
    data.total_volume.usd,
    exchangeRateObj,
    exchangeRates.rates.usd
  ).currentPrice;
  const marketCap = convert(
    data.total_market_cap.usd,
    exchangeRateObj,
    exchangeRates.rates.usd
  ).currentPrice;

  return (
    <span className="max-w-screen w-screen flex my-4 items-center justify-center gap-12 text-xs z-0 dark:bg-[var(--card)] -mt-12 -ml-12 ">
      <div className="p-2 py-0 sm:p-8 flex gap-2 items-center">
        <Zap
          fill="#000"
          color="#000"
          size={18}
          className="rounded-full bg-white  w-4 h-4 p-1 "
        />
        Coins {data.active_cryptocurrencies}
      </div>
      <div className="p-2 sm:p-0 flex gap-2 items-center">
        <SendToBack fill="#fff" size={16} />
        Exchange {data.markets}{' '}
      </div>
      <div className="p-2 sm:p-0 flex gap-2 items-center">
        <ChevronUp className="text-cyan-500" size={16} />
        {formatNum(marketCap)}
      </div>
      <div className="flex flex-nowrap items-center gap-2">
        Volume {formatNum(totalVolume)}
      </div>
      <div className="flex flex-nowrap items-center gap-2 ">
        <Image src="/icons/bitcoin.svg" width={20} height={20} alt="btc logo" />
        {Math.trunc(data.market_cap_percentage.btc)}%
        <ProgressBar
          isLabelVisible={false}
          completed={Math.trunc(data.market_cap_percentage.btc)}
          maxCompleted={100}
          height="7px"
          barContainerClassName="bg-gray-300/80  ml-2 rounded-md w-[100px]"
          bgColor={'#ff8d00'}
        />
      </div>
      <div className="flex flex-nowrap items-center gap-2 ">
        <Image
          src="/icons/ethereum.svg"
          width={20}
          height={20}
          alt="eth logo"
        />
        {Math.trunc(data.market_cap_percentage.eth)}%
        <ProgressBar
          customLabel=""
          isLabelVisible={false}
          completed={Math.trunc(data.market_cap_percentage.eth)}
          maxCompleted={100}
          height="7px"
          barContainerClassName="bg-gray-300/80 ml-2 text-sm rounded-sm w-[100px]"
          bgColor={'#7d9eff'}
        />
      </div>
    </span>
  );
}
