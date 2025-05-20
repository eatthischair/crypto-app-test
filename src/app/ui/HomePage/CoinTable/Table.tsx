import InfiniteScroll from 'react-infinite-scroll-component';
import { LoadingSpinner } from '@/components/ui/loadingSpinner';
import { TableRow } from './TableRow';

export const Table = ({ coinsSorted, getData, hasMore }) => {
  return (
    <div className="grid auto-cols-auto overscroll-none">
      <InfiniteScroll
        dataLength={coinsSorted?.length}
        next={getData}
        hasMore={hasMore}
        loader={<LoadingSpinner />}
        scrollThreshold={1}
      >
        {coinsSorted.map((row, index) => {
          return <TableRow coin={row} index={index} key={row.id} />;
        })}
      </InfiniteScroll>
    </div>
  );
};
