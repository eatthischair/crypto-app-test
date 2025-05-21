import { NavBarLinks } from './NavbarLinks';
import { SearchBar } from './SearchBar';
import { ThemeButton } from './ThemeButton';
import { CurrencySwitch } from './CurrencySwitch';
import { useAppDispatch } from '@/app/hooks';
import { exchangeRatesSwitch } from '@/app/features/exchangeRatesSlice';
import { useEffect } from 'react';

export const NavBar = () => {
  const dispatch = useAppDispatch();
  dispatch(exchangeRatesSwitch);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/exchange_rates',
          {
            method: 'GET',
            headers: {
              accept: 'application/json',
              'x-cg-demo-api-key': 'CG-tLCRhygcvpcYho3BrWGp8J7m	',
            },
            next: { revalidate: 3600 },
          }
        );
        const data = await response.json();
        dispatch(exchangeRatesSwitch(data));
      } catch (error) {
        console.error('Failed to fetch exchange data:', error);
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
        <SearchBar />
        <CurrencySwitch />
        <ThemeButton />
      </div>
    </div>
  );
};
