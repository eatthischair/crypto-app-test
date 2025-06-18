import { LineChart } from './Charts/LineChart';
import { BarChart } from './Charts/BarChart';
import { CoinTable } from './CoinTable/CoinTable';
import { LoadingSpinner } from '@/components/ui/loadingSpinner';
import { GetChartData } from '@/app/api/route';
export async function HomePage() {
  const chartData = await GetChartData('bitcoin');
  if (!chartData) return <LoadingSpinner />;

  return (
    <>
      <h2 className="flex w-full gap-8 p-4 justify-center flex-grow">
        Your Overview
      </h2>
      {/* <div className="flex w-full h-3/5 gap-8 p-4 justify-center flex-grow">
        <LineChart pricesData={chartData} />
        <BarChart pricesData={chartData} />
      </div> */}

      {/* <div className="w-full grid grid-cols-1 grid-rows-2 gap-6 p-4 sm:flex sm:gap-8 sm:h-3/5 sm:justify-center">
        <div className="w-full h-64 sm:h-auto">
          <LineChart pricesData={chartData} />
        </div>
        <div className="w-full h-64 sm:h-auto">
          <BarChart pricesData={chartData} />
        </div>
      </div> */}

      <div className="w-full grid grid-cols-1 grid-rows-2 gap-6 p-4 sm:flex sm:h-3/5 sm:gap-8 sm:justify-center sm:flex-grow border-2 border-red-200">
        <div className="w-full h-64">
          <LineChart pricesData={chartData} />
        </div>
        <div className="w-full h-64">
          <BarChart pricesData={chartData} />
        </div>
      </div>
      <div>
        <CoinTable />
      </div>
    </>
  );
}
