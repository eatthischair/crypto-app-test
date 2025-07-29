'use client';
import { LineChart } from './Charts/LineChart';
import { BarChart } from './Charts/BarChart';
import { CoinTable } from './CoinTable/CoinTable';
import { LoadingSpinner } from '@/components/ui/loadingSpinner';
import { getChartData } from '@/app/api/getChartData';
import { Suspense } from 'react';
import { ConverterSwitch } from '../HomePage/Converter/ConverterSwitch';
import { CoinTableComponents } from './CoinTable/CoinTableComponents';
import { getCoinTableData } from '@/app/api/getCoinTableData';
import { ChartButtons } from './ChartOptions/ChartButtons';
import { ChartTimeline } from './ChartOptions/ChartTimeline';
import { useState, useEffect } from 'react';

export function HomePage() {
  const [chartData, setChartData] = useState('');
  const [coinTableData, setCoinTableData] = useState('');
  const [coinName, setCoinName] = useState('bitcoin');
  const [days, setDays] = useState(30);

  useEffect(() => {
    const getData = async () => {
      const chartData = await getChartData('bitcoin');
      setChartData(chartData);
      const coinTableData = await getCoinTableData(1);
      setCoinTableData(coinTableData);
    };
    getData();
  }, []);

  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  });

  if (!coinTableData || !chartData) return null;

  const changeChart = async (coinName) => {
    const chartData = await getChartData(coinName, days);
    setChartData(chartData);
    setCoinName(coinName);
  };

  const setChartTimeline = async (days) => {
    const chartData = await getChartData(coinName, days);
    setChartData(chartData);
    setDays(days);
  };

  return (
    <>
      <div className="w-full col-span-1 flex flex-shrink">
        <ConverterSwitch />
      </div>
      <div className="">
        <ChartButtons
          coinTableData={coinTableData}
          changeChart={changeChart}
          coinName={coinName}
        />
      </div>
      <div className="w-full grid grid-cols-1 grid-rows-2 gap-6 p-4 sm:flex sm:h-3/5 sm:gap-8 sm:justify-center sm:flex-grow ">
        <div className="sm:h-3/5 w-full h-64">
          <LineChart
            pricesData={chartData}
            formattedDate={formattedDate}
            coinName={coinName}
          />
        </div>
        <div className="sm:h-3/5 w-full h-64">
          <BarChart pricesData={chartData} formattedDate={formattedDate} />
        </div>
      </div>
      <div
        className="w-[40%] m-2 grid-cols-5 bg-[#232337]
      flex justify-between p-1 rounded "
      >
        <ChartTimeline setChartTimeline={setChartTimeline} days={days} />
      </div>
      <div>
        <Suspense fallback={<LoadingSpinner />}>
          <CoinTable />
        </Suspense>
      </div>
    </>
  );
}
