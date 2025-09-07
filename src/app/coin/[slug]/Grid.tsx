'use client';
import { LinksRow } from '../../ui/Coin/LinksRow';
import { ConvertCurrency } from '../../ui/Coin/ConvertCurrency';
import { BottomChart } from '@/app/ui/Coin/BottomChart';
import { CoinData } from '@/app/ui/Coin/CoinData';
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
      <div className="h-full w-full">
        <Skeleton count={20} />
      </div>
    );
  }

  console.log('coin descrip', coin.description);

  const exchangeRateObj = exchangeRates?.rates?.[currency];

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-3 sm:grid-rows-2 sm:gap-8">
        <div className="flex flex-col items-center justify-center rounded-sm bg-card p-4 sm:flex sm:flex-col sm:place-content-center sm:items-center sm:justify-center">
          <Image
            height="80"
            width="80"
            src={coin.image?.large}
            alt="Coin symbol"
            className="h-20 w-20 sm:h-[100px] sm:w-[100px]"
          />
          <div className="m-0 flex w-full justify-center gap-0 p-2 text-center sm:place-content-center">
            {coin.name}({coin.symbol.toUpperCase()})
          </div>
        </div>
        <CoinData coin={coin} />
        <a
          href={coin.links.homepage}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-card flex items-center justify-center truncate overflow-hidden rounded-sm px-4 py-2 text-ellipsis sm:flex sm:flex-nowrap sm:place-content-center"
        >
          {coin.links.homepage}
        </a>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-4 p-4 sm:grid-cols-3 sm:gap-8 border">
        <div className="overflow-y-auto rounded-sm bg-[var(--background)] p-4 overflow-ellipsis sm:col-span-2">
          {coin.description.en || 'Description Not Available'}
        </div>
        <div className="sm:col-span-1">
          <LinksRow coin={coin} />
        </div>
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
        <div className="flex items-center justify-center">
          Chart data Not Available
        </div>
      )}
    </div>
  );
};
