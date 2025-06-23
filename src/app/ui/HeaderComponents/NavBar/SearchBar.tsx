'use client';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { SearchDropDown } from './SearchDropDown';

export const SearchBar = ({ coinsList }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Filter coins based on search term
  const filteredCoins = coinsList?.filter((coin) =>
    coin.id.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  // Handle input change
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    setIsDropdownOpen(e.target.value.length > 0);
  };

  return (
    <div className="sm:relative w-full sm:w-full ">
      <Input
        placeholder="Search..."
        className="flex w-full"
        value={searchTerm}
        onChange={handleInputChange}
        onFocus={() => setIsDropdownOpen(searchTerm.length > 0)}
        onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)} // Delay to allow click
      />
      {filteredCoins && (
        <SearchDropDown
          isDropdownOpen={isDropdownOpen}
          filteredCoins={filteredCoins}
          searchTerm={searchTerm}
        />
      )}
    </div>
  );
};
