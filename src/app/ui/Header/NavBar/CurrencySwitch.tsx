'use client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import currencies from '../../../../data/exchangeRates.json';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/app/hooks';
import { currencySwitch } from '@/app/features/currencySlice';
import { useState, useEffect } from 'react';

export const CurrencySwitch = () => {
  const dispatch = useAppDispatch();

  const [currency, setCurrency] = useState('usd');
  const stateCurrency = useSelector(
    (state: any) => state.currencyReducer.currency
  );
  const exchangeRates = useSelector(
    (state: any) => state.exchangeRatesReducer.exchangeRates
  );

  //initialize localstorage
  useEffect(() => {
    const localStorageCur = localStorage.getItem('currency');
    if (!localStorageCur) {
      localStorage.setItem('currency', 'usd');
      dispatch(currencySwitch('usd'));
    }
  }, []);

  useEffect(() => {
    const localStorageCur = localStorage.getItem('currency') || 'usd';
    setCurrency(localStorageCur);
    dispatch(currencySwitch(localStorageCur));
  }, [stateCurrency, dispatch]);

  const handleCurrencyChange = (cur) => {
    dispatch(currencySwitch(cur));
    localStorage.setItem('currency', cur);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="border rounded-md p-2 sm:p-3 cursor-pointer hover:bg-[var(--hover)] ">
        {(currency || 'usd').toUpperCase()}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-h-60 border w-full " align="start">
        {Object.keys(currencies.rates)
          .sort()
          .map((cur) => {
            return (
              <DropdownMenuItem
                key={cur}
                onClick={() => handleCurrencyChange(cur)}
              >
                {cur.toUpperCase()}
              </DropdownMenuItem>
            );
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
