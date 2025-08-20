'use client';
import { useEffect, useState } from 'react';
import queryString from 'query-string';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Table } from './Table';
import { TableHeader } from './TableHeader';
import {
  convertStateToURLParams,
  convertURLParamsToState,
  sortCoins,
} from './coinTableUtils';
import { getCoins } from '@/app/api/getCoins';
import { getCoinTableData } from '@/app/api/getCoinTableData';
export const CoinTableComponents = ({ coinTable }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const sort = searchParams.get('sort');
  const sortBy = searchParams.get('sortBy');

  const [toggleState, setToggleState] = useState(
    convertURLParamsToState(sort, sortBy)
  );
  const [coinsSorted, setCoinsSorted] = useState(
    sortCoins(coinTable, toggleState)
  );

  const filterCoins = (newToggleState) => {
    setToggleState(newToggleState);
    setCoinsSorted((prevCoins) => sortCoins(prevCoins, newToggleState));
    const params = convertStateToURLParams(newToggleState);
    router.push(pathname + '?' + queryString.stringify(params), {
      scroll: false,
    });
  };

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const getData = async () => {
    const newData = await getCoins(page);
    if (newData.length === 0) {
      setHasMore(false);
    } else {
      const arr = [...coinsSorted, ...newData];
      console.log('ALLCOINS', arr);
      const seen = new Set();
      const unique = arr.filter((item) => {
        const key = item.id; // Use the property that defines uniqueness
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });

      setCoinsSorted(sortCoins(unique, toggleState));
      setPage((prevPage) => prevPage + 1);
    }
  };

  if (!coinTable) return;
  return (
    <div className="overflow-y-auto sm:w-full">
      <div className="grid">
        <TableHeader toggleState={toggleState} filterCoins={filterCoins} />
      </div>
      <Table coinsSorted={coinsSorted} getData={getData} hasMore={hasMore} />
    </div>
  );
};
