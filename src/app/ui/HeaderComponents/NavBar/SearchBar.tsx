'use client';
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { SearchDropDown } from './SearchDropDown';
import { Search } from 'lucide-react';
import { getSearchResults } from '@/app/api/getSearchResults';
import { debounce } from 'lodash';

export const SearchBar = ({ coinsList }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [filteredCoins, setFilteredCoins] = useState('');

  useEffect(() => {
    const getCoins = async () => {
      const results = await getSearchResults(searchTerm);
      setFilteredCoins(results.coins);
    };
    const debouncedGetCoins = debounce(getCoins, 300);
    debouncedGetCoins();

    return () => {
      debouncedGetCoins.cancel();
    };
  }, [searchTerm]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    setIsDropdownOpen(e.target.value.length > 0);
  };

  return (
    <div className="relative sm:ml-0 w-[40px] sm:w-full h-full focus:ring-0 focus:border-none sm:py-1 p-3 border px-8 sm:px-0 border-[var(--background)] ">
      <div className="absolute inset-y-0  left-2 sm:left-4 flex items-center justify-center pointer-events-none">
        <Search size={18} strokeWidth={2.5} />
      </div>
      <Input
        placeholder="Search..."
        className="sm:pl-12 h-full bg-[var(--card)] focus:ring-0 focus:border-white placeholder:opacity-0 sm:placeholder:opacity-100 my-0 py-2 -ml-8 px-5"
        value={searchTerm}
        onChange={handleInputChange}
        onFocus={() => setIsDropdownOpen(searchTerm.length > 0)}
        onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)}
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
