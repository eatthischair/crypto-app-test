'use client';
import { Repeat } from 'lucide-react';

import { ConvertCard } from '../ui/ConverterPage/ConvertCard';
import { useState } from 'react';

const Converter = () => {
  const [coin1CurPrice, setCoin1CurPrice] = useState(0);
  const [coin2CurPrice, setCoin2CurPrice] = useState(0);

  return (
    <>
      <div className="text-start my-5 self-start">
        <h1 className="dark:text-white text-lg mb-1">
          Online Currency Converter
        </h1>
        <p className="text-gray-800 dark:text-gray-400 font-light text-sm">
          {new Date().toLocaleString()}
        </p>
      </div>
      <div className="flex flex-col md:flex-row gap-5 md:gap-8 relative">
        <ConvertCard
          setCoin1CurPrice={setCoin1CurPrice}
          coin1CurPrice={coin1CurPrice}
        />
        <button
          // onClick={handleSwitchCurrency}
          className="p-3 md:p-4 bg-indigo-800 dark:bg-white text-sm absolute rounded-full rotate-90 translate-x-1/2 top-1/2 right-1/2 -translate-y-1/2 dark:border-4 dark:border-gray-800 hover:opacity-75 active:opacity-50 text-white dark:text-indigo-800"
        >
          <Repeat size={24} />
        </button>
        <ConvertCard />
      </div>
    </>
  );
};

export default Converter;
