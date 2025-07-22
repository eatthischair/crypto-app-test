import { LineChart } from './Charts/LineChart';
import { BarChart } from './Charts/BarChart';
import { CoinTable } from './CoinTable/CoinTable';
import { LoadingSpinner } from '@/components/ui/loadingSpinner';
import { getChartData } from '@/app/api/getChartData';
import { Suspense } from 'react';
import { ConverterSwitch } from '../HomePage/Converter/ConverterSwitch';
import { CoinTableComponents } from './CoinTable/CoinTableComponents';
export async function HomePage() {
  const chartData = await getChartData('bitcoin');
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  });

  return (
    <>
      <div className="w-full col-span-1 flex flex-shrink">
        <ConverterSwitch />
      </div>
      <div className="w-full grid grid-cols-1 grid-rows-2 gap-6 p-4 sm:flex sm:h-3/5 sm:gap-8 sm:justify-center sm:flex-grow ">
        <div className="sm:h-3/5 w-full h-64">
          <LineChart pricesData={chartData} formattedDate={formattedDate} />
        </div>
        <div className="sm:h-3/5 w-full h-64">
          <BarChart pricesData={chartData} formattedDate={formattedDate} />
        </div>
      </div>
      <div>
        <Suspense fallback={<LoadingSpinner />}>
          <CoinTable />
        </Suspense>
      </div>
    </>
  );
}
