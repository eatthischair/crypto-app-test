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
import { Trash } from 'lucide-react';

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

  const deleteCoin = () => {
    const newCoinsData = coinsData.filter((item) => item !== coin);
    setCoinsData(newCoinsData);
  };

  return (
    <div className="w-full shadow-lg rounded-lg overflow-hidden bg-[var(--card)] sm:grid sm:grid-cols-[20%_80%] sm:gap-4 sm:p-0 mb-12 relative items-center">
      {/* Image and Name Section */}
      {/* <div className="flex flex-col items-center justify-start h-[20vh]  aspect-square p-2 sm:p-0 mt-4 sm:mt-8">
        <img
          src={data?.image}
          alt="Coin Icon"
          className="w-1/4 aspect-square lg:w-[256px] h-auto object-cover sm:pt-0"
        />
        <div className="mt-2 text-left  ">
          {coin.coinName} ({coin.symbol.toUpperCase()})
        </div>
      </div> */}
      <div className="flex flex-col items-center justify-center h-[20vh] p-2 sm:p-0 mt-4 ">
        <img
          src={data?.image}
          alt="Coin Icon"
          className="max-h-[50%] aspect-square lg:max-h-[128px] h-auto object-cover sm:pt-0"
        />
        <div className="mt-2 text-center">
          {coin.coinName} ({coin.symbol.toUpperCase()})
        </div>
      </div>

      {/* Grid for Data and EditCoin */}
      <div className="grid grid-cols-3 p-8 m-2 items-stretch sm:grid-cols-4 sm:grid-rows-[auto_repeat(2,_1fr)] relative">
        <div className="absolute top-2 right-4 flex gap-2 items-center sm:static sm:col-span-4 sm:flex sm:justify-end sm:items-start sm:p-2 sm:gap-4">
          <EditCoin
            coin={coin}
            coinsData={coinsData}
            coinsList={coinsList}
            setCoinsData={setCoinsData}
            updateCoins={updateCoins}
          />
          <Trash
            className="text-gray-500 hover:text-blue-500 cursor-pointer"
            size={20}
            onClick={deleteCoin}
          />
        </div>

        {/* Current Price */}
        <div className="text-left m-2 p-2 flex flex-col h-full">
          <h3 className="sm:text-base text-sm font-semibold pb-2">
            Current Price
          </h3>
          <span className="sm:text-lg text-[#00c9be] font-bold md:-pt-12r">
            {unit} {formatNum(currentPrice)}
          </span>
        </div>

        {/* Price Change 24h */}
        <div className="text-left m-2 p-2 flex flex-col  h-full">
          <h3 className="sm:text-base text-sm font-semibold pb-2">
            Price Change 24h
          </h3>
          <span className="sm:text-lg text-base font-bold">
            {formatPriceChange(data.priceChangeToday) || (
              <div className="font-normal text-base">Data Not Available</div>
            )}
          </span>
        </div>

        {/* Market Cap vs Volume (Web Only) */}
        <div className="hidden sm:grid sm:text-left m-2 p-2 flex-col justify-between h-full ">
          <h3 className="sm:text-base text-sm font-semibold ">
            Market Cap vs Volume
          </h3>
          <span className="mt-auto  md:mt-0">
            {data.market_cap && data.total_volume ? (
              <div className="grid grid-cols-[20%_80%]">
                <div>
                  {capVsVolume}
                  {'%'}
                </div>
                <ProgressBar
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

        {/* Circ Supply vs Max Supply (Web Only) */}
        <div className="hidden sm:grid sm:text-left m-2 p-2 flex-col justify-between h-full">
          <h3 className="sm:text-base text-sm font-semibold">
            Circ Supply vs Max Supply
          </h3>
          <span className="mt-auto md:mt-0">
            {data.market_cap && data.total_volume ? (
              <div className="grid grid-cols-[20%_80%] ">
                <div>
                  {circVsMax}
                  {'%'}
                </div>
                <ProgressBar
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

        {/* Coin Amount */}
        <div className="text-left m-2 p-2 flex flex-col  h-full">
          <h3 className="sm:text-base text-sm font-semibold pb-2">
            Coin Amount
          </h3>
          <span className="sm:text-lg text-[#00c9be] font-bold">
            {coin.purchasedAmt}
          </span>
        </div>

        {/* Amount Value */}
        <div className="text-left m-2 p-2 flex flex-col h-full">
          <h3 className="sm:text-base text-sm font-semibold pb-2">
            Amount Value
          </h3>
          <span className="sm:text-lg text-[#00c9be] font-bold">
            {unit} {amtValue}
          </span>
        </div>

        {/* Amount Price Change since Purchase */}
        <div className="text-left m-2 p-2 flex flex-col h-full">
          <h3 className="sm:text-base text-sm font-semibold pb-2">
            Amount Price Change since Purchase
          </h3>
          <span className="sm:text-lg text-base font-bold">
            {formatPriceChange(amtChangeSincePurchase - 1)}
          </span>
        </div>

        {/* Purchase Date */}
        <div className="text-left m-2 p-2 flex flex-col h-full">
          <h3 className="sm:text-base text-sm font-semibold pb-2">
            Purchase Date
          </h3>
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
