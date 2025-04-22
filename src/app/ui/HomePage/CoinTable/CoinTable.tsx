import { CoinTableComponents } from './CoinTableComponents';
import { getCoinTableData } from '../../../api/route';
import { LoadingSpinner } from '@/components/ui/loadingSpinner';
export async function CoinTable() {
  const coinTable = await getCoinTableData(1);
  if (!coinTable) return <LoadingSpinner />;
  return <CoinTableComponents coinTable={coinTable} />;
}
