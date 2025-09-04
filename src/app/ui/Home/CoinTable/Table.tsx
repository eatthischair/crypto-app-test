'use client';
import InfiniteScroll from 'react-infinite-scroll-component';
import { TableRow } from './TableRow';
import CoinTableSkeleton from './CoinTableSkeleton';
import Skeleton from 'react-loading-skeleton';
import { TableRowSkeleton } from '../HomeSkeleton/TableRowSkeleton';

export const Table = ({ coinsSorted, getData, hasMore }) => {
  return (
    <>
      <InfiniteScroll
        dataLength={coinsSorted?.length}
        next={getData}
        hasMore={hasMore}
        loader={<TableRowSkeleton />}
        scrollThreshold={1}
        endMessage={<p style={{ textAlign: 'center' }}>The end</p>}
        className="grid auto-cols-auto overscroll-none sm:p-0 p-3 gap-2 !overflow-visible touch-auto pb-16"
      >
        {coinsSorted.map((row, index) => {
          return <TableRow coin={row} index={index} key={row.id} />;
        })}
      </InfiniteScroll>
    </>
  );
};
