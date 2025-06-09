import { NavBar } from './NavBar/Navbar';
import { DataBar } from './MarketData/DataBar';
import { fetcher } from '@/app/api/route';
import { LoadingSpinner } from '@/components/ui/loadingSpinner';
import useSWR from 'swr';
import { useQuery } from '@tanstack/react-query';
import Skeleton from 'react-loading-skeleton';
// import { DataBarSkeleton } from './MarketData/DataBarSkeleton';

export function HeaderComponents() {
  // const { data, error, isLoading } = useSWR(
  //   'https://api.coingecko.com/api/v3/global',
  //   fetcher,
  //   { refreshInterval: 3600000 }
  // );

  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['dataBar'],
    queryFn: async () => {
      const response = await fetch('https://api.coingecko.com/api/v3/global');
      return await response.json();
    },
  });

  return (
    <>
      <NavBar />
      {isPending || error ? <Skeleton /> : <DataBar data={data.data} />}
    </>
  );
}
