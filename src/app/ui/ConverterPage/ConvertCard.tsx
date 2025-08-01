'use client';
import { ChevronDown } from 'lucide-react';
import { convert } from '../HeaderComponents/NavBar/convert';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LoadingSpinner } from '@/components/ui/loadingSpinner';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/app/hooks';
import { currencySwitch } from '@/app/features/currencySlice';
import { useState, useEffect } from 'react';
import currencies from '../../../data/exchangeRates.json';
import { getCoinById } from '@/app/api/getCoinById';

export const ConvertCard = ({}) => {
  const isFromCurrency = true;

  const dispatch = useAppDispatch();

  const [currency, setCurrency] = useState('usd');
  const [quantity, setQuantity] = useState(0);

  const stateCurrency = useSelector(
    (state: any) => state.currencyReducer.currency
  );
  const exchangeRates = useSelector(
    (state: any) => state.exchangeRatesReducer.exchangeRates
  );

  const exchangeRateObj = exchangeRates?.rates?.[currency];
  // const { currentPrice, unit } = convert(
  //   coin.market_data.current_price.usd,
  //   exchangeRateObj,
  //   exchangeRates.rates.usd
  // );

  useEffect(() => {
    const getData = async () => {
      console.log('useffect getdata', currency);
      // const coinData = await getCoinById(currency);
      // console.log('coindata', coinData);
    };
    getData();
  }, []);

  //get current price of both coins
  return (
    <div
      className={`text-indigo-900 dark:text-white bg-white rounded-md md:rounded-lg lg:rounded-xl xl:rounded-2xl p-3 md:flex-1 md:p-6 dark:bg-indigo-900/30`}
    >
      <p className="text-xs md:text-base font-light text-indigo-900 dark:text-gray-100">
        {isFromCurrency ? 'You sell' : 'You buy'}
      </p>
      <div className="flex justify-between items-center border-b md:border-b-2 border-b-indigo-800 dark:border-b-white py-4 md:py-6">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="flex">
              {currency || 'Select Currency'}
              <ChevronDown />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="sm:max-h-60 flex-col flex-shrink ml-16 dark:bg-indigo-950 border ">
            {Object.entries(currencies.rates).map(([cur, value]) => {
              return (
                <DropdownMenuItem
                  key={cur}
                  onClick={() => setCurrency(value.name)}
                >
                  {value.name || cur} ({cur.toUpperCase()})
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
        {isFromCurrency ? (
          <input
            type="number"
            className="bg-transparent outline-none text-right w-2/ hover:opacity-75 active:opacity-50"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        ) : (
          <p className="text-right w-2/5 lg:text-lg">
            {quantity || 'Quantity'}
          </p>
        )}
      </div>
    </div>
  );
};
