import { CoinTableComponents } from './CoinTableComponents';
import { getCoinTableData } from '../../../api/getCoinTableData';
import { LoadingSpinner } from '@/components/ui/loadingSpinner';
import { Suspense } from 'react';
export async function CoinTable() {
  const coinTable = await getCoinTableData(1);
  if (!coinTable) return <LoadingSpinner />;
  return (
    <Suspense>
      <CoinTableComponents coinTable={coinTable} />
    </Suspense>
  );
}
