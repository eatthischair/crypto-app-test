'use client';
import { IoMdSwap } from 'react-icons/io';
import { Input } from '@/components/ui/input';
import { useState, useMemo } from 'react';
import { formatPrice } from '@/lib/utils';
import { convert } from '../Header/NavBar/convert';
export const ConvertCurrency = ({
  coin,
  exchangeRateObj,
  exchangeRateUsd,
  currency,
}) => {
  const [toggled, setToggled] = useState(false);
  const [firstVal, setFirstVal] = useState(1);

  const currentPrice = convert(
    coin.market_data.current_price.usd,
    exchangeRateObj,
    exchangeRateUsd
  ).currentPrice;

  const [secondVal, setSecondVal] = useState(firstVal / currentPrice);

  const symbolArr = useMemo(() => {
    if (!toggled) {
      return [currency.toUpperCase(), coin.symbol.toUpperCase()];
    } else {
      return [coin.symbol.toUpperCase(), currency.toUpperCase()];
    }
  }, [currency, coin.symbol, toggled]);

  const convertCurToCrypto = (val) => {
    setFirstVal(val);
    let outputVal;
    if (!toggled) {
      outputVal = val / currentPrice;
    } else {
      outputVal = val * currentPrice;
    }
    setSecondVal(outputVal);
  };

  const switchVals = () => {
    const placeholder = firstVal;
    setFirstVal(secondVal);
    setSecondVal(placeholder);
    setToggled(!toggled);
  };

  return (
    <div className="grid grid-cols-1 grid-rows-3 gap-4 p-4 text-base h-auto sm:flex sm:flex-grow-1 sm:justify-center sm:items-center sm:gap-12 sm:p-8 sm:text-lg sm:h-[30%]">
      <div className="relative flex items-center bg-[var(--card)] rounded-sm py-2 h-full sm:max-w-[30%]">
        <span className="pl-4 ml-0 mr-0 pr-2">{symbolArr[0]}</span>
        <Input
          placeholder="1.00"
          className="w-full text-sm border-none sm:text-xl"
          onChange={(e) => convertCurToCrypto(e.target.value)}
          value={firstVal}
        />
      </div>
      <div
        className="flex sm:bg-none justify-center h-full"
        onClick={switchVals}
      >
        <IoMdSwap size={24} className="place-self-center cursor-pointer" />
      </div>
      <div className="relative flex items-center bg-[var(--card)] rounded-sm py-2 h-full sm:max-w-[30%]">
        <span className="pl-4 ml-0 mr-0 pr-2">{symbolArr[1]}</span>
        <Input
          disabled
          className="w-full text-sm border-none disabled:opacity-100 sm:text-xl"
          value={formatPrice(secondVal.toFixed(3))}
        />
      </div>
    </div>
  );
};
