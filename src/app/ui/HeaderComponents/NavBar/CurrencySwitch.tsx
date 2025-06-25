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
  // dispatch(currencySwitch);

  const [currency, setCurrency] = useState('usd');
  const stateCurrency = useSelector(
    (state: any) => state.currencyReducer.currency
  );
  const exchangeRates = useSelector(
    (state: any) => state.exchangeRatesReducer.exchangeRates
  );
  useEffect(() => {
    const localStorageCur = localStorage.getItem('currency');
    setCurrency(localStorageCur);
    dispatch(currencySwitch(localStorageCur));
  }, [stateCurrency, dispatch]);

  const handleCurrencyChange = (cur) => {
    dispatch(currencySwitch(cur));
    localStorage.setItem('currency', cur);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {/* {(currency || 'usd').toUpperCase()} */}
        {stateCurrency}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="sm:max-h-60">
        {Object.keys(currencies.rates).map((cur) => {
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
