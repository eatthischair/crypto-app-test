'use client';
import { CoinTableComponents } from './CoinTableComponents';
import { getCoinTableData } from '../../../api/getCoinTableData';
import { LoadingSpinner } from '@/components/ui/loadingSpinner';
import { Suspense } from 'react';
import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
export function CoinTable() {
  const [coinTable, setCoinTable] = useState(null);

  useEffect(() => {
    async function updateTable() {
      const data = await getCoinTableData(1);
      setCoinTable(data);
    }
    updateTable();
  }, []);

  if (!coinTable) return <Skeleton count={50} />;
  return <CoinTableComponents coinTable={coinTable} />;
}
