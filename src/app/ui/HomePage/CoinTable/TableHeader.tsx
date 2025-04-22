import { HeaderButton } from './HeaderButton';
export const TableHeader = ({ toggleState, filterCoins }) => {
  const colsArr = [
    '#',
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
    <div className="grid grid-cols-[5%_20%_10%_6%_6%_6%_12%_12%_15%] gap-4">
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
