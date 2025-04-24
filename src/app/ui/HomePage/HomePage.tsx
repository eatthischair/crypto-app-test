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
      <div className="flex w-full h-3/5 gap-8 p-4 justify-center flex-grow">
        <LineChart pricesData={chartData} />
        <BarChart pricesData={chartData} />
      </div>
      <div>
        <CoinTable />
      </div>
    </>
  );
}
