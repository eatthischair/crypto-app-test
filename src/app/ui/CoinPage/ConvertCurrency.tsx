'use client';
import { IoMdSwap } from 'react-icons/io';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { formatPrice } from '@/lib/utils';

export const ConvertCurrency = ({ coin }) => {
  const [toggled, setToggled] = useState(false);
  const currentPrice = coin.market_data.current_price.usd;
  const [firstVal, setFirstVal] = useState(1);
  const [secondVal, setSecondVal] = useState(firstVal / currentPrice);
  const [symbolArr, setSymbolArr] = useState(['$', '₿']);

  const convert = (val) => {
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
    setSymbolArr(symbolArr.reverse());
  };

  return (
    <div className="flex flex-grow-1 justify-center items-center gap-12 p-8 text-lg h-[30%]">
      <div className="relative flex items-center bg-[var(--card)] rounded-sm max-w-[30%]">
        <span className="pl-4 ml-0 mr-0 pr-2">{symbolArr[0]}</span>
        <Input
          placeholder="1.00"
          className="w-full text-xl border-none"
          onChange={(e) => convert(e.target.value)}
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
