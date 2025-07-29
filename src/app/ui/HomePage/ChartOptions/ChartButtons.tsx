'use client';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { formatPriceChange, formatPrice, formatNum } from '@/lib/utils';
import { useSelector } from 'react-redux';
import { convert } from '@/app/ui/HeaderComponents/NavBar/convert';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

export const ChartButtons = ({ coinTableData, changeChart, coinName }) => {
  const currency = useSelector((state: any) => state.currencyReducer.currency);
  const exchangeRates = useSelector(
    (state: any) => state.exchangeRatesReducer.exchangeRates
  );

  const coins = coinTableData.slice(0, 50);

  return (
    <div className="h-[10vh] px-4  ">
      <Carousel>
        <CarouselContent>
          {coins.map((coin) => (
            <CarouselItem
              key={coin.name}
              className={`grid grid-cols-[20%_80%] rounded-sm mx-1 h-full bg-[var(--background)] hover:bg-indigo-600 basis-1/5 ${
                coinName == coin.id.toLowerCase()
                  ? 'bg-gradient-to-b from-indigo-700 to-indigo-800 text-white shadow-indigo-500 shadow-[0_0_1px] border'
                  : 'bg-[#191926]'
              }`}
              onClick={() => changeChart(coin.id.toLowerCase())}
            >
              <Image src={coin.image} width={30} height={30} alt="" />
              <div className="grid grid-rows-2 w-full py-2 ">
                <div className="flex justify-start overflow-ellipsis text-nowrap">
                  {coin.name} ({coin.symbol.toUpperCase()})
                </div>
                <div className="grid grid-cols-2 justify-self-start font-xs py-0">
                  <div className="font-thin m-0 p-0 justify-self-start">
                    {formatNum(coin.current_price)} {currency.toUpperCase()}
                  </div>
                  <div className="justify-self-end">
                    {formatPriceChange(coin.ath_change_percentage)}
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};
