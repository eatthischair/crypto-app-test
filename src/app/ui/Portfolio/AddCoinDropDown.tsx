import { getCoinById } from '@/app/api/getCoinById';
import { LoadingSpinner } from '@/components/ui/loadingSpinner';
import Image from 'next/image';

export const AddCoinDropDown = ({
  isDropdownOpen,
  filteredCoins,
  searchTerm,
  setCoinName,
  setIsDropdownOpen,
  setCoinImage,
}) => {
  const handleClick = (coinId) => {
    setCoinName(coinId);
    setIsDropdownOpen(false);
    getCoinImage(coinId);
  };

  const getCoinImage = async (coinId) => {
    const coinImg = await getCoinById(coinId);
    setCoinImage(coinImg?.image?.large);
  };

  return (
    <>
      {isDropdownOpen && filteredCoins.length > 0 ? (
        <ul className="absolute z-100 bg-popover rounded-md shadow-lg max-h-60 overflow-auto dark:bg-gradient-to-r from-[#131327] to-[#1a1934]">
          {filteredCoins.map((coin) => (
            <li
              key={coin.id}
              className="px-4 py-2 cursor-pointer opacity-100 hover:bg-[var(--hover)] flex flex-row gap-2 overflow-clip"
              onClick={() => handleClick(coin.id)}
            >
              <Image
                src={coin.thumb}
                alt="Coin thumbnail"
                width={30}
                height={30}
                className="aspect-square max-h-[2rem] max-w-[2rem]"
              />
              <div className=" flex place-self-center">
                {coin.id.charAt(0).toUpperCase() + coin.id.slice(1)}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        isDropdownOpen && (
          <ul className="absolute z-100 w-full bg-popover rounded-md shadow-lg max-h-60 overflow-auto mt-1 p-32 min-w-60 dark:bg-gradient-to-r from-[#131327] to-[#1a1934]">
            <LoadingSpinner />
          </ul>
        )
      )}
      {isDropdownOpen && filteredCoins.length === 0 && searchTerm && (
        <div className="absolute z-10 w-full bg-popover border rounded-md shadow-lg p-4 mt-1 dark:bg-gradient-to-r from-[#131327] to-[#1a1934]">
          No results found
        </div>
      )}
    </>
  );
};
