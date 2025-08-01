import { LineChart } from '../HomePage/Charts/LineChart';
import { BarChart } from '../HomePage/Charts/BarChart';
import { CoinTable } from '../HomePage/CoinTable/CoinTable';
export default async function CoinPage({}: {}) {
  return (
    <>
      <div className="flex w-full h-3/5 gap-8 p-4 justify-center flex-grow">
        <LineChart />
        <BarChart />
      </div>
      <div>
        <CoinTable />
      </div>
    </>
  );
}
