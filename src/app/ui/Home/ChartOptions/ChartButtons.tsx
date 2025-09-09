'use client';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { formatPriceChange, formatPrice, formatNum } from '@/lib/utils';
import { useSelector } from 'react-redux';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { useState } from 'react';

export const ChartButtons = ({
  coinTableData,
  changeChart,
  coinName,
  compareToggled,
  changeChartForCompare,
  secondChartCoinName,
}) => {
  const [loading, isLoading] = useState(true);

  const currency = useSelector((state: any) => state.currencyReducer.currency);
  const exchangeRates = useSelector(
    (state: any) => state.exchangeRatesReducer.exchangeRates
  );

  const coins = coinTableData.slice(0, 50);

  const formatCurrency = (number, decimals = 4) => {
    return number.toFixed(decimals);
  };

  const toggleStateAction = (coinName) => {
    if (compareToggled) {
      changeChartForCompare(coinName);
    } else {
      changeChart(coinName);
    }
  };

  return (
    <>
      <Carousel
        opts={{
          align: 'start',
          dragFree: true,
        }}
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {coins.map((coin, index) => (
            <CarouselItem
              key={coin.name}
              className={`pl-2 md:pl-4 basis-auto min-w-0 flex-shrink-0 `}
            >
              <div
                className={`flex flex-row sm:grid sm:grid-cols-[20%_80%] rounded-xs max-h-[15vh] h-full bg-[var(--background)] hover:bg-[var(--hover)] text-nowrap overflow-hidden items-center justify-evenly
                  pl-4 pr-4 cursor-pointer whitespace-nowrap
                   ${
                     coinName == coin.id.toLowerCase() ||
                     secondChartCoinName == coin.id.toLowerCase()
                       ? 'bg-gradient-to-b from-indigo-700 to-indigo-800 text-white shadow-indigo-500 shadow-[0_0_1px] border'
                       : 'bg-[var(--card)]'
                   }
           `}
                onClick={() => toggleStateAction(coin.id.toLowerCase())}
              >
                <Image
                  src={coin.image}
                  width={30}
                  height={30}
                  alt=""
                  className="hidden sm:flex sm:py-4 py-2 flex-shrink-0 mr-2"
                />
                <Image
                  src={coin.image}
                  width={24}
                  height={24}
                  alt=""
                  className="sm:hidden py-2 flex-shrink-0"
                />

                <div className="flex items-center sm:grid sm:grid-rows-2 sm:py-2 sm:m-0 sm:p-0 sm:place-self-center text-sm sm:text-base align-middle min-w-0">
                  <div className="justify-start overflow-clip text-nowrap hidden sm:flex min-w-0">
                    <span className="truncate">{coin.name}</span>
                    <div className="justify-items-center text-md flex self-center flex-shrink-0">
                      &nbsp;({coin.symbol.toUpperCase()})
                    </div>
                  </div>

                  <div className="sm:hidden visible px-2 mb-0 flex text-lg">
                    {coin.symbol.toUpperCase()}
                  </div>
                  <div className="grid-cols-2 justify-self-start font-xs py-0 hidden sm:grid w-full">
                    <div className="font-thin m-0 p-0 justify-self-start overflow-clip min-w-0">
                      <span className="truncate">
                        {formatNum(formatCurrency(coin.current_price))}{' '}
                        {currency.toUpperCase()}
                      </span>
                    </div>
                    <div className="justify-self-end text-sm flex !items-bottom flex-shrink-0">
                      {formatPriceChange(coin.ath_change_percentage)}
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </>
  );
};
