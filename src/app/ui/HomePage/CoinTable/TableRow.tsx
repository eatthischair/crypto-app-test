'use client';
import { CoinTableLineChart } from './CoinTableLineChart';
import { formatNum, formatPriceChange } from '../../../../lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { convert } from '../../HeaderComponents/NavBar/convert';
import Skeleton from 'react-loading-skeleton';
import { useRef } from 'react';
import { LoadingSpinner } from '@/components/ui/loadingSpinner';
import { tableRowProgressColors } from '../CoinTable/tableRowProgressColors';
import clsx from 'clsx';
import './tableRow.css';
import ProgressBar from '@ramonak/react-progress-bar';
import { title } from 'process';

export const TableRow = ({ coin, index }) => {
  console.log('index', index, index % 8, tableRowProgressColors[index % 8][1]);
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
    return (
      <div className="w-full h-full">
        <Skeleton count={20} />
      </div>
    );
  }
  const exchangeRateObj = exchangeRates?.rates?.[currency];

  const progressVolumeMarketCap = Math.ceil(
    (coin.total_volume / coin.market_cap) * 100
  );
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

  const fillColor =
    tableRowProgressColors[index % tableRowProgressColors.length][0];

  const progressColor = `w-full bg-[${fillColor}]`;

  return (
    <div
      className="grid grid-cols-[40%_20%_40%] gap-2 p-2 m-1 truncate h-[15vh] border
    sm:grid-cols-[25%_10%_6%_6%_6%_12%_12%_15%] sm:gap-4 sm:p-4 sm:h-[15vh] sm:py-0 sm:my-0
    bg-[#191926] rounded-lg hover:border
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
        <div
          style={{
            color: fillColor,
            margin: 0,
            padding: 0,
            paddingTop: '1.5rem',
          }}
        >
          {formatNum(totalVolume)}
        </div>
        <div className="m-0 p-0"></div>
        <div className="m-0 p-0 pt-6">{formatNum(marketCap)}</div>
        <div className="col-span-3 m-0 p-0 py-1 sm:flex sm:items-center">
          <ProgressBar
            completed={progressVolumeMarketCap}
            maxCompleted={100}
            height={'6px'}
            bgColor={tableRowProgressColors[index % 8][0]}
            customLabel=" "
            className={progressColor}
            barContainerClassName={`rounded-sm
              tableRowProgressColors${[index % 8]}`}
          />
        </div>
      </div>

      <div className="hidden sm:grid sm:grid-cols-2 sm:grid-rows-[25%_75%] sm:gap-0 sm:m-0 sm:p-0 sm:align-items-center">
        <div
          style={{
            color: fillColor,
            margin: 0,
            padding: 0,
            paddingTop: '1.5rem',
          }}
        >
          {formatNum(coin.circulating_supply)}
        </div>
        <div></div>
        <div className="m-0 p-0 pt-6">{formatNum(coin.total_supply)}</div>

        <div className="col-span-3 gap-0 h-full py-1 sm:flex sm:items-center">
          <ProgressBar
            completed={circulatingTotalSupply}
            maxCompleted={100}
            height={'6px'}
            bgColor={tableRowProgressColors[index % 8][0]}
            customLabel=" "
            className={progressColor}
            barContainerClassName={`rounded-sm
              tableRowProgressColors${[index % 8]}`}
          />
        </div>
      </div>
      <div>
        <CoinTableLineChart coin={coin} fillColor={fillColor} />
      </div>
    </div>
  );
};
