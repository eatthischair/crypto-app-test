import InfiniteScroll from 'react-infinite-scroll-component';
import { TableRow } from './TableRow';
import CoinTableSkeleton from './CoinTableSkeleton';

export const Table = ({ coinsSorted, getData, hasMore }) => {
  return (
    <>
      <div>{JSON.stringify(coinsSorted)}</div>
      <InfiniteScroll
        dataLength={coinsSorted?.length}
        next={getData}
        hasMore={hasMore}
        loader={<CoinTableSkeleton />}
        scrollThreshold={1}
        endMessage={<p style={{ textAlign: 'center' }}>The end</p>}
        className="grid auto-cols-auto overscroll-none sm:p-0 p-2"
      >
        {coinsSorted.map((row, index) => {
          return <TableRow coin={row} index={index} key={row.id} />;
        })}
      </InfiniteScroll>
    </>
  );
};
