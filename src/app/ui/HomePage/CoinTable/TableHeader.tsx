import { HeaderButton } from './HeaderButton';
export const TableHeader = ({ toggleState, filterCoins }) => {
  const colsArr = [
    'Name',
    'Price',
    '1h%',
    '24%',
    '7d%',
    '24h Volume / Market Cap',
    'Circulating / Total Supply',
    'Last 7d',
  ];
  return (
    <div className="hidden sm:grid sm:grid-cols-[25%_10%_6%_6%_6%_12%_12%_15%] sm:gap-4 sm:text-base sm:w-full sm:overscroll-x-none my-2">
      {colsArr.map((text, index) => {
        return (
          <HeaderButton
            text={text}
            key={text}
            index={index}
            toggleState={toggleState}
            filterCoins={filterCoins}
          />
        );
      })}
    </div>
  );
};
