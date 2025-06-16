'use client';
import { NavBarLinks } from './NavbarLinks';
import { SearchBar } from './SearchBar';
import { ThemeButton } from './ThemeButton';
import { CurrencySwitch } from './CurrencySwitch';
import { useAppDispatch } from '@/app/hooks';
import { exchangeRatesSwitch } from '@/app/features/exchangeRatesSlice';
import { useEffect, useState } from 'react';
import { getExchangeRates } from '@/app/api/getExchangeRates';
import { getCoinsList } from '@/app/api/route';
export const NavBar = () => {
  const [coinsList, setCoinsList] = useState(null);

  const dispatch = useAppDispatch();
  dispatch(exchangeRatesSwitch);

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
    <div className="flex flex-row w-[100%] h-[10%] gap-3 items-center">
      <div className="flex gap-5 ml-5">
        <NavBarLinks href="/" title={'Coins'} />
        <NavBarLinks href="dashboard/portfolio" title={'Portfolio'} />
      </div>
      <div className="flex flex-grow ml-[50%] mr-5 h-[90%] items-center gap-4">
        <SearchBar coinsList={coinsList} />
        <CurrencySwitch />
        <ThemeButton />
      </div>
    </div>
  );
};
