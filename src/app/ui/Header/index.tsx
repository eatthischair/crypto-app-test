'use client';
import { NavBar } from './NavBar/Navbar';
import { DataBar } from './MarketData/DataBar';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '@/components/ui/skeleton';
import { getGlobalData } from '@/app/api/getGlobalData';
import { useState, useEffect } from 'react';
import { DataBarSkeleton } from './MarketData/DataBarSkeleton';

export function HeaderComponents() {
  const { isPending, error, data } = useQuery({
    queryKey: ['dataBar'],
    queryFn: async () => {
      const response = await fetch('https://api.coingecko.com/api/v3/global');
      return await response.json();
    },
  });

  return (
    <>
      {isPending ? <DataBarSkeleton /> : <DataBar data={data?.data} />}
      <NavBar />
    </>
  );
}
