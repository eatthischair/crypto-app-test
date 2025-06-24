'use client';
import { NavBar } from './NavBar/Navbar';
import { DataBar } from './MarketData/DataBar';
import { useQuery } from '@tanstack/react-query';
import Skeleton from 'react-loading-skeleton';
import { getGlobalData } from '@/app/api/getGlobalData';
import { useState } from 'react';
export function HeaderComponents() {
  // const { isPending, error, data } = useQuery({
  //   queryKey: ['dataBar'],
  //   queryFn: async () => {
  //     const response = await fetch('https://api.coingecko.com/api/v3/global');
  //     return await response.json();
  //   },
  // });

  const [data, setData] = useState({});
  const fetchStuff = async () => {
    const data = await getGlobalData();
    setData(data);
  };
  fetchStuff();
  return (
    <>
      <NavBar />
      {!data ? <Skeleton /> : <DataBar data={data.data} />}
      {/* <DataBar data={data?.data} /> */}
    </>
  );
}
