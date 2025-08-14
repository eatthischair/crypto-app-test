'use client';
import React from 'react';
import { formatPriceChange } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';
import ProgressBar from '@ramonak/react-progress-bar';

import { useSelector } from 'react-redux';
import { convert } from '../HeaderComponents/NavBar/convert';
import { formatNum } from '@/lib/utils';
import { LoadingSpinner } from '@/components/ui/loadingSpinner';
import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { LuPencil } from 'react-icons/lu';
import { EditCoin } from './EditCoin';
export const CoinCard = ({
  coin,
  data,
  editCoin,
  coinsData,
  coinsList,
  setCoinsData,
  updateCoins,
}) => {
  const currency = useSelector((state: any) => state.currencyReducer.currency);
  const exchangeRates = useSelector(
    (state: any) => state.exchangeRatesReducer.exchangeRates
  );
  const exchangeRateObj = exchangeRates?.rates?.[currency];

  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (currency && exchangeRates && exchangeRates.rates) {
      setReady(true);
    }
  }, [currency, exchangeRates]);

  if (!ready) {
    return <Skeleton count={5} />;
  }

  const amtChangeSincePurchase = coin.currentPriceToday / coin.current_price;

  const { currentPrice, unit } = convert(
    data.currentPriceToday,
    exchangeRateObj,
    exchangeRates.rates.usd
  );

  const amtValue = formatNum(
    convert(data.currentPriceToday, exchangeRateObj, exchangeRates.rates.usd)
      .currentPrice * coin.purchasedAmt
  );

  const capVsVolume = Math.min(
    Math.ceil((data.total_volume / data.market_cap) * 100),
    100
  );
  const circVsMax = Math.min(
    Math.ceil((data.circulating_supply / data.max_supply) * 100),
    100
  );

  return (
    <div
      className="h-full sm:w-full shadow-lg rounded-lg overflow-hidden sm:grid sm:grid-cols-[20%_80%]
    sm:gap-4 sm:p-12 mb-12
    bg-[var(--card)]"
    >
      <div className="flex flex-col items-center justify-start h-[20vh] sm:h-1/2 sm:w-1/2 w-full aspect-square p-2 sm:p-0 mt-4 sm:mt-8">
        <img
          src={data?.image}
          alt="Coin Icon"
          className="w-1/4 sm:w-full h-auto sm:h-full object-cover sm:pt-0"
        />
        <div className="mt-2 text-left">
          {coin.coinName} ({coin.symbol.toUpperCase()})
        </div>
      </div>

      <div className="grid grid-cols-3 p-2 m-2 items-stretch sm:grid-cols-4 sm:grid-rows-[auto_repeat(2,_1fr)] relative">
        <div className="col-span-2 sm:col-span-4 flex justify-end items-start p-2">
          <EditCoin
            coin={coin}
            coinsData={coinsData}
            coinsList={coinsList}
            setCoinsData={setCoinsData}
            updateCoins={updateCoins}
          />
        </div>
        <div className="text-left m-2 p-2 flex flex-col justify-between h-full ">
          <h3 className="sm:text-base text-sm font-semibold ">Current Price</h3>
          <span className="sm:text-lg  text-[#00c9be] font-bold">
            {unit} {formatNum(currentPrice)}
          </span>
        </div>
        <div className="text-left m-2 p-2 flex flex-col justify-between h-full">
          <h3 className="sm:text-base text-sm font-semibold">
            Price Change 24h
          </h3>
          <span className="sm:text-lg text-base font-bold">
            {formatPriceChange(data.priceChangeToday) || (
              <div className="font-normal text-base">Data Not Available</div>
            )}
          </span>
        </div>

        <div className="hidden sm:grid sm:text-left m-2 p-2 flex flex-col justify-between h-full">
          <h3 className="sm:text-base text-sm font-semibold">
            Market Cap vs Volume
          </h3>
          <span className="mt-auto ">
            {data.market_cap && data.total_volume ? (
              <div className="grid grid-cols-[20%_80%]">
                <div>
                  {capVsVolume}
                  {'%'}
                </div>
                <ProgressBar
                  // label={Math.trunc(data.market_cap_percentage.btc)'%'}
                  isLabelVisible={false}
                  completed={capVsVolume}
                  maxCompleted={100}
                  height="7px"
                  barContainerClassName="bg-gray-300/80 w-[90%] rounded-md mt-2"
                  bgColor={'#00c9be'}
                />
              </div>
            ) : (
              <div className="mt-auto">Data Not Available</div>
            )}
          </span>
        </div>

        <div className="hidden sm:grid sm:text-left m-2 p-2 flex flex-col justify-between h-full ">
          <h3 className="sm:text-base text-sm font-semibold">
            Circ Supply vs Max Supply
          </h3>
          <span className="mt-auto">
            {data.market_cap && data.total_volume ? (
              <div className="grid grid-cols-[20%_80%]">
                <div>
                  {circVsMax}
                  {'%'}
                </div>
                <ProgressBar
                  // label={Math.trunc(data.market_cap_percentage.btc)'%'}
                  isLabelVisible={false}
                  completed={circVsMax}
                  maxCompleted={100}
                  height="7px"
                  barContainerClassName="bg-gray-300/80 w-[90%] ml-2 rounded-md mt-2"
                  bgColor={'#00c9be'}
                />
              </div>
            ) : (
              <div className="mt-auto">Data Not Available</div>
            )}
          </span>
        </div>

        <div className="text-left m-2 p-2 flex flex-col justify-between h-full">
          <h3 className="sm:text-base text-sm font-semibold">Coin Amount</h3>
          <span className="sm:text-lg text-[#00c9be] font-bold">
            {coin.purchasedAmt}
          </span>
        </div>

        <div className="text-left m-2 p-2 flex flex-col justify-between h-full">
          <h3 className="sm:text-base text-sm font-semibold">Amount Value</h3>
          <span className="sm:text-lg text-[#00c9be] font-bold">
            {unit} {amtValue}
          </span>
        </div>

        <div className="text-left m-2 p-2 flex flex-col justify-between h-full">
          <h3 className="sm:text-base text-sm font-semibold">
            Amount Price Change since Purchase
          </h3>
          <span className="sm:text-lg text-base font-bold">
            {formatPriceChange(amtChangeSincePurchase - 1)}
          </span>
        </div>

        <div className="text-left m-2 p-2 flex flex-col justify-between h-full">
          <h3 className="sm:text-base text-sm font-semibold">Purchase Date</h3>
          <span className="sm:text-lg text-[#00c9be] font-bold">
            {new Date(coin.purchasedDate).toLocaleDateString('en-US', {
              month: 'short',
              day: '2-digit',
              year: 'numeric',
            })}
          </span>
        </div>
      </div>
    </div>
  );
};
