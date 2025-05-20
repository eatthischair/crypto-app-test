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
export const CurrencySwitch = () => {
  const dispatch = useAppDispatch();
  const savedCurrency = localStorage?.getItem('currency');

  const stateCurrency = useSelector((state) => state.currencyReducer.currency);
  const currency = savedCurrency || stateCurrency;

  dispatch(currencySwitch);

  const handleCurrencyChange = (cur) => {
    dispatch(currencySwitch(cur));
    localStorage.setItem('currency', cur);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{currency.toUpperCase()}</DropdownMenuTrigger>
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
