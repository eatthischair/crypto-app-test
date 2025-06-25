'use client';
import { NavBar } from './NavBar/Navbar';
import { DataBar } from './MarketData/DataBar';
import { useQuery } from '@tanstack/react-query';
import Skeleton from 'react-loading-skeleton';
import { getGlobalData } from '@/app/api/getGlobalData';
import { useState, useEffect } from 'react';
export function HeaderComponents() {
  // const [data, setData] = useState({});

  const { isPending, error, data } = useQuery({
    queryKey: ['dataBar'],
    queryFn: async () => {
      const response = await fetch('https://api.coingecko.com/api/v3/global');
      return await response.json();
      // return getGlobalData();
    },
  });

  // useEffect(() => {
  //   const fetchStuff = async () => {
  //     const data = await getGlobalData();
  //     setData(data);
  //   };
  //   fetchStuff(); // ✅ run once on mount
  // }, []); // ✅ empty dependency array = run only once

  // console.log('DATA');
  return (
    <>
      <NavBar />
      {/* {!data ? <Skeleton /> : <DataBar data={data?.data} />} */}
      {/* <DataBar data={data.data} /> */}
    </>
  );
}
