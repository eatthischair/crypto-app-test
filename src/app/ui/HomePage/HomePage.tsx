import { LineChart } from '../Charts/LineChart';
import { BarChart } from '../Charts/BarChart';
import { CoinTable } from '../CoinTable/CoinTable';
export const HomePage = () => {
  return (
    <>
      <h2 className="flex w-full gap-8 p-4 justify-center flex-grow">
        Your Overview
      </h2>
      <div className="flex w-full h-3/5 gap-8 p-4 justify-center flex-grow">
        <LineChart />
        <BarChart />
      </div>
      <div>
        <CoinTable />
      </div>
    </>
  );
};
