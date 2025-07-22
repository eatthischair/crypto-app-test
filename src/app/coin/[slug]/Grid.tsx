'use client';
import { LinksRow } from '../../ui/CoinPage/LinksRow';
import { ConvertCurrency } from '../../ui/CoinPage/ConvertCurrency';
import { BottomChart } from '@/app/ui/CoinPage/BottomChart';
import { CoinData } from '@/app/ui/CoinPage/CoinData';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import Skeleton from 'react-loading-skeleton';
import { FaCaretDown, FaCaretUp } from 'react-icons/fa';

export const Grid = ({ coin, allPrices }) => {
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
      <div className="w-full h-full">
        <Skeleton count={20} />
      </div>
    );
  }

  const exchangeRateObj = exchangeRates?.rates?.[currency];

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-3 sm:grid-rows-[80%_20%] sm:h-[40vh] sm:gap-8 sm:p-8">
        <div className="flex flex-col justify-center items-center p-4 bg-[var(--card)] rounded-sm sm:flex sm:flex-col sm:justify-center sm:items-center sm:p-4 sm:place-content-center">
          <Image
            height="80"
            width="80"
            src={coin.image?.large}
            alt="Coin symbol"
            className="w-20 h-20 sm:w-[100px] sm:h-[100px]"
          />
          <div className="w-full flex justify-center m-0 p-2 gap-0 text-center sm:w-36 sm:place-content-center">
            {coin.name}({coin.symbol.toUpperCase()})
          </div>
        </div>
        <CoinData coin={coin} />
        <a
          href={coin.links.homepage}
          target="_blank"
          rel="noopener noreferrer"
          className="flex justify-center items-center truncate overflow-hidden text-ellipsis bg-[var(--card)] rounded-sm px-4 py-2 sm:flex sm:place-content-center sm:flex-nowrap"
        >
          {coin.links.homepage}
        </a>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-4 p-4 sm:grid-cols-3 sm:h-[40vh] sm:gap-4 sm:p-8">
        <div className="sm:col-span-2 overflow-ellipsis overflow-y-auto p-4 bg-[var(--background)] rounded-sm sm:p-8">
          {coin.description.en}
        </div>

        <LinksRow coin={coin} />
      </div>
      <ConvertCurrency
        coin={coin}
        exchangeRateObj={exchangeRateObj}
        exchangeRateUsd={exchangeRates.rates.usd}
        currency={currency}
      />
      {allPrices && allPrices.prices ? (
        <BottomChart allPrices={allPrices.prices} />
      ) : (
        <div className="flex justify-center items-center h-[40vh] w-full">
          Chart data Not Available
        </div>
      )}
    </div>
  );
};
