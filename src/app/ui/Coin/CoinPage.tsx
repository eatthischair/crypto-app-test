import { LineChart } from '../Home/Charts/LineChart';
import { BarChart } from '../Home/Charts/BarChart';
import { CoinTable } from '../Home/CoinTable/CoinTable';
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
