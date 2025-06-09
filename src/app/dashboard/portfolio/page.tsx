import { getCoinsList } from '@/app/api/route';
import Page2 from './page2';
import { LoadingSpinner } from '@/components/ui/loadingSpinner';
import Skeleton from 'react-loading-skeleton';

export default async function Page() {
  const coinslist = await getCoinsList();
  if (!coinslist) return <Skeleton />;

  return (
    <>
      <section className="p-12 flex flex-col gap-4 relative">
        <div className="block md:flex justify-between items-center">
          <h1 className="text-2xl">Your Portfolio</h1>
          <p className="text-sm text-gray-500 ">
            Monitor your investments and oversee your portfolio. Click on a coin
            to modify its details.
          </p>
        </div>
      </section>
      <Page2 coinsList={coinslist} />
    </>
  );
}
