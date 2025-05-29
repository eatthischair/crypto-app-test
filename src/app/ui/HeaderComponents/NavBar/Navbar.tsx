import { NavBarLinks } from './NavbarLinks';
import { SearchBar } from './SearchBar';
import { ThemeButton } from './ThemeButton';
import { CurrencySwitch } from './CurrencySwitch';
import { useAppDispatch } from '@/app/hooks';
import { exchangeRatesSwitch } from '@/app/features/exchangeRatesSlice';
import { useEffect, useState } from 'react';

export const NavBar = () => {
  const [coinsList, setCoinsList] = useState(null);

  const dispatch = useAppDispatch();
  dispatch(exchangeRatesSwitch);

  useEffect(() => {
    async function fetchData() {
      try {
        // First fetch for exchange rates
        const exchangeResponse = await fetch(
          'https://api.coingecko.com/api/v3/exchange_rates',
          {
            method: 'GET',
            headers: {
              accept: 'application/json',
              'x-cg-demo-api-key': 'CG-tLCRhygcvpcYho3BrWGp8J7m',
            },
            next: { revalidate: 36000 },
          }
        );
        const exchangeData = await exchangeResponse.json();
        dispatch(exchangeRatesSwitch(exchangeData));

        // Second fetch for coins list
        const coins = await fetch(
          'https://api.coingecko.com/api/v3/coins/list',
          {
            method: 'GET',
            headers: {
              accept: 'application/json',
            },
            next: { revalidate: 36000 },
          }
        );
        const coinsListData = await coins.json();
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
