'use client';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import coinsList from '../../../../data/coinsList.json';
import Link from 'next/link';

export const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Filter coins based on search term
  const filteredCoins = coinsList.filter((coin) =>
    coin.id.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  // Handle input change
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    setIsDropdownOpen(e.target.value.length > 0);
  };

  return (
    <div className="relative w-full">
      <Input
        placeholder="Search..."
        className="flex w-full"
        value={searchTerm}
        onChange={handleInputChange}
        onFocus={() => setIsDropdownOpen(searchTerm.length > 0)}
        onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)} // Delay to allow click
      />
      {isDropdownOpen && filteredCoins.length > 0 && (
        <ul className="absolute z-100 w-full bg-popover rounded-md shadow-lg max-h-60 overflow-auto mt-1 ">
          {filteredCoins.map((coin) => (
            <Link href={`/coin/${coin.id}`} key={coin.id}>
              <li
                key={coin.id}
                className="px-4 py-2 cursor-pointer opacity-100 hover:bg-secondary"
              >
                {coin.id}
              </li>
            </Link>
          ))}
        </ul>
      )}
      {isDropdownOpen && filteredCoins.length === 0 && searchTerm && (
        <div className="absolute z-10 w-full bg-popver border rounded-md shadow-lg p-4 mt-1">
          No results found
        </div>
      )}
    </div>
  );
};
