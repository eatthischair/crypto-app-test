'use client';
import { Repeat } from 'lucide-react';

import { ConvertCard } from '../ui/Converter/ConvertCard';
import { useState, useEffect } from 'react';
import { convert } from '../ui/Header/NavBar/convert';
import { LineChart } from './LineChart';
import { getCoinPriceHistory } from '../api/getCoinPriceHistory';
import { ConverterSwitch } from '../ui/Home/Converter/ConverterSwitch';

const Converter = () => {
  const [coin1CurPrice, setCoin1CurPrice] = useState(0);
  const [coin2CurPrice, setCoin2CurPrice] = useState(0);
  const [amtToConvert, setAmtToConvert] = useState(0);
  const [convertedAmt, setConvertedAmt] = useState(0);
  const [coin1Prices, setCoin1Prices] = useState('');
  const [coin2Prices, setCoin2Prices] = useState('');
  const [coin1Id, setCoin1Id] = useState('');
  const [coin2Id, setCoin2Id] = useState('');
  const [coin1Name, setCoin1Name] = useState('');
  const [coin2Name, setCoin2Name] = useState('');
  const [coin1Symbol, setCoin1Symbol] = useState('');
  const [coin2Symbol, setCoin2Symbol] = useState('');

  const [chartTitle, setChartTitle] = useState(
    ` ${coin1Name} (${coin1Symbol.toUpperCase()}) to $${coin2Name} (${coin2Symbol.toUpperCase()})`
  );

  useEffect(() => {
    setConvertedAmt(amtToConvert / coin2CurPrice);
  }, [amtToConvert]);

  useEffect(() => {
    const getData = async () => {
      if (coin1Id && coin2Id) {
        const prices1 = await getCoinPriceHistory(coin1Id, coin2Symbol);
        setCoin1Prices(prices1);
        const prices2 = await getCoinPriceHistory(coin2Id);
        setCoin2Prices(prices2);
        setChartTitle(
          ` ${coin1Name} (${coin1Symbol.toUpperCase()}) to $${coin2Name} (${coin2Symbol.toUpperCase()})`
        );
      }
    };
    getData();
  }, [coin1Id, coin2Id]);

  const handleSwitchCurrency = () => {
    const coinPlaceholder = {
      coin1CurPrice,
      coin1Prices,
      coin1Id,
      coin1Name,
      coin1Symbol,
    };
    setCoin1CurPrice(coin2CurPrice);
    setCoin2CurPrice(coinPlaceholder.coin1CurPrice);
    setCoin1Prices(coin2Prices);
    setCoin2Prices(coinPlaceholder.coin1Prices);
    setCoin1Id(coin2Id);
    setCoin2Id(coinPlaceholder.coin1Id);
    setCoin1Name(coin2Name);
    setCoin2Name(coinPlaceholder.coin1Name);
    setCoin1Symbol(coin2Symbol);
    setCoin2Symbol(coinPlaceholder.coin1Symbol);
    setChartTitle(` ${coin1Name} to $${coin2Name}`);
  };

  return (
    <>
      <div className="w-full max-w-full col-span-1 flex flex-shrink">
        <ConverterSwitch />
      </div>
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
          setAmtToConvert={setAmtToConvert}
          setCoin1Id={setCoin1Id}
          setCoin1Name={setCoin1Name}
          coin1Name={coin1Name}
          setCoin1Symbol={setCoin1Symbol}
        />
        <button
          onClick={handleSwitchCurrency}
          className="p-3 md:p-4 bg-indigo-800 dark:bg-white text-sm absolute rounded-full rotate-90 translate-x-1/2 top-1/2 right-1/2 -translate-y-1/2 dark:border-4 dark:border-gray-800 hover:opacity-75 active:opacity-50 text-white dark:text-indigo-800"
        >
          <Repeat size={24} />
        </button>
        <ConvertCard
          setCoin2CurPrice={setCoin2CurPrice}
          coin2CurPrice={coin2CurPrice}
          convertedAmt={convertedAmt}
          setCoin2Id={setCoin2Id}
          setCoin2Name={setCoin2Name}
          coin2Name={coin2Name}
          setCoin2Symbol={setCoin2Symbol}
        />
      </div>
      <LineChart
        coin1Prices={coin1Prices}
        coin2Prices={coin2Prices}
        chartTitle={chartTitle}
      />
    </>
  );
};

export default Converter;
