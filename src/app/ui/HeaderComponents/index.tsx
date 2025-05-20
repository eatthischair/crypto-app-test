import { NavBar } from './NavBar/Navbar';
import { DataBar } from './MarketData/DataBar';
import { fetcher } from '@/app/api/route';
import { LoadingSpinner } from '@/components/ui/loadingSpinner';
import useSWR from 'swr';

export function HeaderComponents() {
  const { data, error, isLoading } = useSWR(
    'https://api.coingecko.com/api/v3/global',
    fetcher,
    { refreshInterval: 3600000 }
  );

  return (
    <>
      <NavBar />
      {isLoading || error ? <LoadingSpinner /> : <DataBar data={data.data} />}
    </>
  );
}
