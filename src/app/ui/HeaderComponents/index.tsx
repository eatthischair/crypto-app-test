'use client';
import { NavBar } from './NavBar/Navbar';
import { DataBar } from './MarketData/DataBar';
import { useQuery } from '@tanstack/react-query';
import Skeleton from 'react-loading-skeleton';
import { getGlobalData } from '@/app/api/getGlobalData';
import { useState, useEffect } from 'react';

export function HeaderComponents() {
  const { isPending, error, data } = useQuery({
    queryKey: ['dataBar'],
    queryFn: async () => {
      const response = await fetch('https://api.coingecko.com/api/v3/global');
      // console.log('running query boss', data, isPending, error);
      return await response.json();
    },
  });

  return (
    <>
      {isPending ? <Skeleton /> : <DataBar data={data?.data} />}
      <NavBar />
    </>
  );
}
