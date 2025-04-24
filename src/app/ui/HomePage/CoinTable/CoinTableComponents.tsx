'use client';
import { useState } from 'react';
import queryString from 'query-string';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Table } from './Table';
import { TableHeader } from './TableHeader';
import {
  convertStateToURLParams,
  convertURLParamsToState,
  sortCoins,
} from './coinTableUtils';

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
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=${
          page + 1
        }&sparkline=true&price_change_percentage=1h%2C24h%2C7d`
      );
      const newData = await response.json();
      if (newData.length === 0) {
        setHasMore(false);
      } else if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      } else {
        setCoinsSorted((prevItems) =>
          sortCoins([...prevItems, ...newData], toggleState)
        );
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error fetching data: in getData', error);
    }
  };

  return (
    <div className="overflow-y-auto">
      <div className="grid">
        <TableHeader toggleState={toggleState} filterCoins={filterCoins} />
      </div>
      <Table coinsSorted={coinsSorted} getData={getData} hasMore={hasMore} />
    </div>
  );
};
