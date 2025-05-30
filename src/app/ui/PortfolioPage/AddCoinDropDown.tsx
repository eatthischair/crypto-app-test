import { LoadingSpinner } from '@/components/ui/loadingSpinner';

export const AddCoinDropDown = ({
  isDropdownOpen,
  filteredCoins,
  searchTerm,
  setCoinName,
  setIsDropdownOpen,
}) => {
  const handleClick = (coinId) => {
    setCoinName(coinId);
    setIsDropdownOpen(false);
  };

  return (
    <>
      {isDropdownOpen && filteredCoins.length > 0 ? (
        <ul className="absolute z-100 bg-popover rounded-md shadow-lg max-h-60 overflow-auto ">
          {filteredCoins.map((coin) => (
            <li
              key={coin.id}
              className="px-4 py-2 cursor-pointer opacity-100 hover:bg-secondary"
              onClick={() => handleClick(coin.id)}
            >
              {coin.id}
            </li>
          ))}
        </ul>
      ) : (
        isDropdownOpen && (
          <ul className="absolute z-100 w-full bg-popover rounded-md shadow-lg max-h-60 overflow-auto mt-1 ">
            <LoadingSpinner />
          </ul>
        )
      )}
      {isDropdownOpen && filteredCoins.length === 0 && searchTerm && (
        <div className="absolute z-10 w-full bg-popver border rounded-md shadow-lg p-4 mt-1">
          No results found
        </div>
      )}
    </>
  );
};
