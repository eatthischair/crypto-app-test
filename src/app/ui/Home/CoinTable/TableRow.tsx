'use client';
import { CoinTableLineChart } from './CoinTableLineChart';
import { formatNum, formatPriceChange } from '../../../../lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { convert } from '../../Header/NavBar/convert';
import Skeleton from 'react-loading-skeleton';
import { useRef } from 'react';
import { tableRowProgressColors } from './tableRowProgressColors';
import { tableRowProgressColorsLightMode } from './tableRowProgressColorsLightMode';
import './tableRow.css';
import ProgressBar from '@ramonak/react-progress-bar';
import { useTheme } from 'next-themes';

export const TableRow = ({ coin, index }) => {
  const { theme } = useTheme();

  const colors =
    theme === 'dark' ? tableRowProgressColors : tableRowProgressColorsLightMode;

  const barContainerClassName =
    theme === 'dark'
      ? `rounded-sm tableRowProgressColors${[index % colors.length]}`
      : `rounded-sm tableRowProgressColorsLightMode${[index % colors.length]}`;
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

  const fillColor = colors[index % colors.length][0];

  const progressColor = `w-full bg-[${fillColor}]`;

  return (
    <div
      className="grid grid-cols-[40%_20%_40%] gap-2 p-2 truncate
    sm:grid-cols-[19%_6%_6%_6%_6%_16%_16%_20%] sm:gap-4 sm:p-4 sm:py-0 sm:my-0
    bg-[var(--card)] rounded-sm hover:bg-indigo-200 dark:hover:bg-indigo-600
     touch-auto"
    >
      <div className="grid grid-cols-[40%_60%] sm:grid-cols-[15%_85%] p-0 m-0 my-6 break-words whitespace-normal items-center ">
        <div className="px-1 flex items-center ">
          <Image
            src={coin.image}
            width="40"
            height="40"
            sizes="(max-width: 500px) 300vw, 300vw (max-width: 1200px) 50vw"
            alt="Coin Icon"
            className=""
          />
        </div>

        <Link
          href={`/coin/${coin.id}`}
          className="text-sm flex items-baseline flex-col sm:flex-row overflow-clip mx-1"
        >
          {/* mobile */}
          <span className="flex sm:hidden order-1 sm:order-2 ">
            {coin.symbol.toUpperCase()}
          </span>
          {/* desktop */}
          <span className="hidden sm:flex order-1 sm:order-2 text-sm text-gray-600 dark:text-gray-300">
            &nbsp;{coin.symbol.toUpperCase()}
          </span>
          <div className="text-xs text-gray-600 dark:text-gray-300 sm:text-inherit sm:text-base sm:dark:text-white order-2 sm:order-1 text-nowrap overflow-clip">
            {coin.name}
          </div>
        </Link>
      </div>
      <div className="flex items-center overflow-clip my-4">
        {unit}
        {formatNum(currentPrice)}
      </div>

      <div className="hidden sm:flex sm:items-center my-4">
        {formatPriceChange(coin.price_change_percentage_1h_in_currency)}
      </div>
      <div className="hidden sm:flex sm:items-center my-4">
        {formatPriceChange(coin.price_change_percentage_24h_in_currency)}
      </div>
      <div className="hidden sm:flex sm:items-center my-4">
        {formatPriceChange(coin.price_change_percentage_7d_in_currency)}
      </div>

      <div className="hidden sm:grid sm:grid-cols-2 sm:gap-0  text-sm">
        <div
          style={{ color: fillColor }}
          className="flex items-end justify-start"
        >
          {formatNum(totalVolume)}
        </div>
        <div className="flex items-end justify-end">
          <span
            style={{ color: colors[index % colors.length][1] }}
            className="text-lg"
          ></span>
          {formatNum(marketCap)}
        </div>
        <div className="col-span-2">
          <ProgressBar
            completed={progressVolumeMarketCap}
            maxCompleted={100}
            height={'6px'}
            bgColor={colors[index % colors.length][0]}
            customLabel=" "
            className={progressColor}
            barContainerClassName={barContainerClassName}
          />
        </div>
      </div>

      <div className="hidden sm:grid sm:grid-cols-2 text-sm ">
        <div
          style={{
            color: fillColor,
          }}
          className="flex items-end justify-start"
        >
          {formatNum(coin.circulating_supply)}
        </div>

        <div className="flex items-end justify-end">
          {formatNum(coin.total_supply)}
        </div>

        <div className="col-span-2">
          <ProgressBar
            completed={circulatingTotalSupply}
            maxCompleted={100}
            height={'6px'}
            bgColor={colors[index % colors.length][0]}
            customLabel=" "
            className={progressColor}
            barContainerClassName={barContainerClassName}
          />
        </div>
      </div>
      <div>
        <CoinTableLineChart
          coin={coin}
          fillColor={fillColor}
          gradientColor={colors[index % colors.length][1]}
        />
      </div>
    </div>
  );
};
