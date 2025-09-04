'use client';
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { SearchDropDown } from './SearchDropDown';
import { Search, X } from 'lucide-react';
import { getSearchResults } from '@/app/api/getSearchResults';
import { debounce } from 'lodash';

export const SearchBar = ({ coinsList }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    <div className="relative w-[40px] h-full focus:ring-0 focus:border-none p-3 px-8 border-[var(--background)] sm:ml-0 sm:w-full sm:py-1 sm:px-0 ">
      <div className="hidden absolute inset-y-0 left-0 -ml-10 sm:flex items-center justify-center pointer-events-none sm:left-12">
        <Search size={18} strokeWidth={2.5} />
      </div>
      <Input
        placeholder="Search..."
        className="hidden sm:flex h-full bg-[var(--card)] focus:ring-0 focus:border-white my-0 py-2 px-5 placeholder:opacity-0 -ml-2 sm:pl-12 sm:placeholder:opacity-100 !placeholder-inherit"
        value={searchTerm}
        onChange={handleInputChange}
        onFocus={() => setIsDropdownOpen(searchTerm.length > 0)}
        onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)}
      />
      {/* Mobile Modal Trigger - visible only on mobile */}
      <button
        className="flex items-center justify-center w-[45px] h-full bg-[var(--card)] sm:hidden -ml-8 py-3 rounded-sm"
        onClick={() => setIsModalOpen(true)}
      >
        <Search size={18} strokeWidth={2.5} className="-ml-0" />
      </button>

      {/* Mobile Search Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20 sm:hidden">
          <div className="bg-[var(--card)] w-full mx-4 rounded-lg p-4 max-w-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Search</h3>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setIsDropdownOpen(false);
                  setSearchTerm('');
                }}
                className="p-1"
              >
                <X size={20} />
              </button>
            </div>
            <Input
              placeholder="Search..."
              className="h-full bg-[var(--background)] focus:ring-0 focus:border-white my-0 py-2 px-3 w-full"
              value={searchTerm}
              onChange={handleInputChange}
              onFocus={() => setIsDropdownOpen(searchTerm.length > 0)}
            />
            {filteredCoins && (
              <SearchDropDown
                isDropdownOpen={isDropdownOpen}
                filteredCoins={filteredCoins}
                searchTerm={searchTerm}
                setIsModalOpen={setIsModalOpen}
              />
            )}
          </div>
        </div>
      )}
      <div className="hidden sm:flex">
        {filteredCoins && (
          <SearchDropDown
            isDropdownOpen={isDropdownOpen}
            filteredCoins={filteredCoins}
            searchTerm={searchTerm}
          />
        )}
      </div>
    </div>
  );
};
