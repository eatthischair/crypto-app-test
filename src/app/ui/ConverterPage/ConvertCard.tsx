import { ChevronDown } from 'lucide-react';
import { convert } from '../HeaderComponents/NavBar/convert';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/app/hooks';
import { useState } from 'react';
import currencies from '../../../data/exchangeRates.json';

export const ConvertCard = ({ setCoin1CurPrice, coin1CurPrice }) => {
  const isFromCurrency = true;

  const dispatch = useAppDispatch();

  const [currency, setCurrency] = useState(null);
  const [quantity, setQuantity] = useState(0);

  const stateCurrency = useSelector(
    (state: any) => state.currencyReducer.currency
  );
  const exchangeRates = useSelector(
    (state: any) => state.exchangeRatesReducer.exchangeRates
  );

  const exchangeRateObj = exchangeRates?.rates?.[currency];

  console.log('exchangerateobj', exchangeRates, exchangeRates.rates, currency);

  const handleClick = (cur, value) => {
    setCurrency(value.name);
    setCoin1CurPrice(value.value);
    console.log('handleclick', cur, value.value);
  };

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
                  onClick={() => handleClick(cur, value)}
                >
                  {value.name} ({cur.toUpperCase()})
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
      <div>
        {' '}
        1 {currency} = ${1 / coin1CurPrice}
      </div>
    </div>
  );
};
