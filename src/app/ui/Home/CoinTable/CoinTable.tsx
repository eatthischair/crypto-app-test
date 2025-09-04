'use client';
import { CoinTableComponents } from './CoinTableComponents';
import { getCoinTableData } from '../../../api/getCoinTableData';
import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { TableRowSkeleton } from '../HomeSkeleton/TableRowSkeleton';
export function CoinTable() {
  const [coinTable, setCoinTable] = useState(null);

  useEffect(() => {
    async function updateTable() {
      const data = await getCoinTableData(1);
      setCoinTable(data);
    }
    updateTable();
  }, []);

  if (!coinTable) {
    return (
      <div className="gap-2">
        <Skeleton className="w-full h-12 my-2" />
        <TableRowSkeleton />
      </div>
    );
  }

  return <CoinTableComponents coinTable={coinTable} />;
}
