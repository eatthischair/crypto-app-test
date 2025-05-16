'use client';
import { IoMdSwap } from 'react-icons/io';
import { Input } from '@/components/ui/input';
import { useState, useMemo } from 'react';
import { formatPrice } from '@/lib/utils';
import { useSelector } from 'react-redux';
import { convert } from '../HeaderComponents/NavBar/convert';

export const ConvertCurrency = ({ coin }) => {
  const [toggled, setToggled] = useState(false);
  const [firstVal, setFirstVal] = useState(1);

  const currency = useSelector((state) => state.currencyReducer.currency);
  console.log('currencyee', currency);
  const currentPrice = convert(
    coin.market_data.current_price.usd,
    currency
  ).currentPrice;
  const [secondVal, setSecondVal] = useState(firstVal * currentPrice);

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
    <div className="flex flex-grow-1 justify-center items-center gap-12 p-8 text-lg h-[30%]">
      <div className="relative flex items-center bg-[var(--card)] rounded-sm max-w-[30%]">
        <span className="pl-4 ml-0 mr-0 pr-2">{symbolArr[0]}</span>
        <Input
          placeholder="1.00"
          className="w-full text-xl border-none"
          onChange={(e) => convertCurToCrypto(e.target.value)}
          value={firstVal}
        />
      </div>
      <div onClick={switchVals}>
        <IoMdSwap size={24} />
      </div>
      <div className="relative flex items-center bg-[var(--card)] rounded-sm max-w-[30%] ">
        <span className="pl-4 ml-0 mr-0 pr-2">{symbolArr[1]}</span>
        <Input
          disabled
          className="w-full text-xl border-none disabled:opacity-100"
          value={formatPrice(secondVal)}
        />
      </div>
    </div>
  );
};
