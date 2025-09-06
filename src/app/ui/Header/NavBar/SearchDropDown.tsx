import { LoadingSpinner } from '@/components/ui/loadingSpinner';
import Image from 'next/image';
import Link from 'next/link';

export const SearchDropDown = ({
  isDropdownOpen,
  filteredCoins,
  searchTerm,
  setIsModalOpen,
}) => {
  return (
    <div className="w-full min-w-full relatve sm:flex sm:justify-start bg-card dark:bg-gradient-to-r from-[#131327] to-[#1a1934]">
      {isDropdownOpen && filteredCoins.length > 0 ? (
        <ul
          className="absolute min-w-full top-full left-0 right-8 z-100 bg-card dark:bg-gradient-to-r from-[#131327] to-[#131327]
 rounded-md shadow-lg max-h-60 overflow-auto mt-1 sm:absolute sm:right-0 sm:max-w-full"
        >
          {filteredCoins.map((coin) => (
            <Link
              href={`/coin/${coin.id}`}
              key={coin.id}
              onClick={() => setIsModalOpen(false)}
            >
              <li
                key={coin.id}
                className="px-4 py-2 cursor-pointer opacity-100 hover:bg-secondary flex flex-row gap-2 overflow-hidden text-nowrap "
              >
                <Image
                  src={coin.thumb}
                  alt="Coin thumbnail"
                  width={20}
                  height={20}
                  className="aspect-square max-h-[1.2rem] min-h-[1.2rem] max-w-[1.2rem] min-w-[1.2rem]w-auto h-auto "
                />
                {coin.id.charAt(0).toUpperCase() + coin.id.slice(1)}
              </li>
            </Link>
          ))}
        </ul>
      ) : (
        isDropdownOpen && (
          <ul
            className="absolute top-full left-0 right-0 z-100 dark:bg-popover rounded-md shadow-lg max-h-60 overflow-auto mt-1 min-w-60 p-32
          bg-card dark:bg-gradient-to-r from-[#131327] to-[#131327]"
          >
            <LoadingSpinner />
            <ul></ul>
          </ul>
        )
      )}
      {isDropdownOpen && filteredCoins.length === 0 && searchTerm && (
        <ul
          className="absolute top-full left-0 right-0 z-10 bg-popover rounded-md shadow-lg p-4 mt-1 min-w-60 opacity-100
        bg-card dark:bg-gradient-to-r from-[#131327] to-[#131327]"
        >
          No results found
        </ul>
      )}
    </div>
  );
};
