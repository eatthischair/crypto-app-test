import { TableRow } from './TableRow';
import { TableHeader } from './TableHeader';
import coinTable from '../../data/coinTable.json';
export const CoinTable = () => {
  return (
    <div className="">
      <div className="grid auto-cols-auto">
        <TableHeader />
      </div>
      <div className="grid auto-cols-auto overflow-y-auto overscroll-y-none h-[80vh]">
        {coinTable.map((row, index) => {
          return <TableRow coin={row} index={index} key={index} />;
        })}
      </div>
    </div>
  );
};
