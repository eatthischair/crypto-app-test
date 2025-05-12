'use client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import currencies from '../../../../data/exchangeRates.json';

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { testSwitch } from '@/app/features/testSlice';
export const CurrencySwitch = () => {
  const dispatch = useAppDispatch();

  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const test = useSelector((state) => state.testReducer.test);

  dispatch(testSwitch);

  const handleCurrencyChange = (cur) => {
    dispatch(testSwitch(cur));
    //persist in local storage?
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{test.toUpperCase()}</DropdownMenuTrigger>
      <DropdownMenuContent className="max-h-60">
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
