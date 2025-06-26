'use client';
import { CoinTableComponents } from './CoinTableComponents';
import { getCoinTableData } from '../../../api/getCoinTableData';
import { LoadingSpinner } from '@/components/ui/loadingSpinner';
import { Suspense } from 'react';
import { useEffect, useState } from 'react';
export function CoinTable() {
  const [coinTable, setCoinTable] = useState(null);

  useEffect(() => {
    async function updateTable() {
      const data = await getCoinTableData(1);
      setCoinTable(data);
    }
    updateTable();
  }, []);

  if (!coinTable) return <LoadingSpinner />;
  return <CoinTableComponents coinTable={coinTable} />;
}
