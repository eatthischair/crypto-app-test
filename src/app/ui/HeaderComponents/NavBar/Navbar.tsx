'use client';
import { NavBarLinks } from './NavbarLinks';
import { SearchBar } from './SearchBar';
import { ThemeButton } from './ThemeButton';
import { CurrencySwitch } from './CurrencySwitch';
import { useAppDispatch } from '@/app/hooks';
import { exchangeRatesSwitch } from '@/app/features/exchangeRatesSlice';
import { useEffect, useState } from 'react';
import { getExchangeRates } from '@/app/api/getExchangeRates';
import { getCoinsList } from '@/app/api/getCoinsList';
export const NavBar = () => {
  const [coinsList, setCoinsList] = useState(null);

  const dispatch = useAppDispatch();
  // dispatch(exchangeRatesSwitch);

  useEffect(() => {
    async function fetchData() {
      try {
        // First fetch for exchange rates
        const exchangeRates = await getExchangeRates();
        const exchangeData = await exchangeRates;

        dispatch(exchangeRatesSwitch(exchangeData));

        // Second fetch for coins list
        const coins = await getCoinsList();
        const coinsListData = await coins;
        setCoinsList(coinsListData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    }
    fetchData();
  }, [dispatch]);

  return (
    <div className="w-full flex-shrink h-[20%] grid grid-cols-1 grid-rows-2 gap-3 p-2 items-center  sm:flex sm:flex-row sm:gap-3 sm:p-0 sm:h-[10%]">
      <div className="flex gap-4 sm:justify-start sm:flex-shrink">
        <NavBarLinks href="/" title={'Coins'} />
        <NavBarLinks href="/dashboard/portfolio" title={'Portfolio'} />
      </div>
      <div className="flex justify-between items-center gap-2 p-2 w-full sm:flex sm:items-center sm:justify-start sm:flex-grow sm:ml-[50%] sm:mr-5 sm:h-[90%] sm:gap-4">
        <SearchBar coinsList={coinsList} />
        <span className="flex justify-end gap-2 p-2 sm:gap-4">
          <CurrencySwitch />
          <ThemeButton />
        </span>
      </div>
    </div>
  );
};
