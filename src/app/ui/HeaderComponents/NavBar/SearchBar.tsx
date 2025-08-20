'use client';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { SearchDropDown } from './SearchDropDown';
import { Search } from 'lucide-react';

export const SearchBar = ({ coinsList }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const filteredCoins = coinsList?.filter((coin) =>
    coin.id.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    setIsDropdownOpen(e.target.value.length > 0);
  };

  return (
    <div className="relative w-full h-full focus:ring-0 focus:border-none">
      <div className="absolute inset-y-0 left-4 flex items-center justify-center pointer-events-none">
        <Search size={18} strokeWidth={2.5} />
      </div>
      <Input
        placeholder="Search..."
        className="pl-12 w-full h-full bg-[var(--card)] focus:ring-0 focus:border-white"
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
