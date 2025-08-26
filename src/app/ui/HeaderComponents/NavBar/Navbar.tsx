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
import Image from 'next/image';
import { House, Layers, RefreshCw } from 'lucide-react';
import { useTheme } from 'next-themes';

export const NavBar = () => {
  const [coinsList, setCoinsList] = useState(null);

  const dispatch = useAppDispatch();

  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true); // Set flag after client-side mount
  }, []);
  const logoClassName =
    mounted && theme === 'light' ? 'invert hue-rotate-180' : '';

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
    <div className="w-full max-w-[1400px] lg:m-auto min-h-[20%] grid grid-cols-1 gap-3 sm:grid-cols-[auto_auto_auto_1fr_2fr_auto_auto] sm:gap-4 sm:p-0 sm:min-h-[20%] sm:items-center ">
      <div className="col-start-1 hidden sm:flex gap-4 px-3 sm:justify-self-start">
        <Image
          src={'/images/logo.png'}
          width={220}
          height={60}
          alt="Company Logo"
          className={logoClassName}
        />
      </div>
      <div className="flex items-center justify-start p-3 sm:hidden">
        <Image
          src={'/images/logoMobile.png'}
          width={70}
          height={70}
          alt="Company Logo"
          className={logoClassName}
        />
      </div>
      <div className="hidden col-start-2 justify-self-start sm:flex items-center">
        <NavBarLinks href="/" title={'Coins'} icon={<House size={26} />} />
      </div>
      <div className="hidden sm:flex items-center col-start-3 justify-self-start">
        <NavBarLinks
          href="/dashboard/portfolio"
          title={'Portfolio'}
          icon={<Layers />}
        />
      </div>

      <div className="sm:col-start-5 sm:justify-self-end justify-self-start py-2 sm:py-0 sm:-ml-8 sm:w-[16em] h-full max-w-[40px] sm:max-w-[400px] -mr-8 sm:mr-0">
        <SearchBar coinsList={coinsList} />
      </div>
      <div className="col-start-6 justify-self-end flex items-center">
        <CurrencySwitch />
      </div>
      <div className="col-start-7 justify-self-end flex items-center">
        <ThemeButton />
      </div>

      <nav className="sm:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-[var(--background)] shadow-lg  opacity-100 z-10">
        <div className="flex justify-around items-center h-16 max-w-screen-lg mx-auto">
          <button className="flex-1 flex flex-col items-center justify-center text-sm font-medium text-gray-600 dark:text-white">
            <NavBarLinks href="/" title={'Coins'} icon={<House size={26} />} />
          </button>
          <button className="flex-1 flex flex-col items-center justify-center text-sm font-medium text-gray-600 dark:text-white">
            <NavBarLinks
              href="/dashboard/portfolio"
              title={'Portfolio'}
              icon={<Layers />}
            />
          </button>
          <button className="flex-1 flex flex-col items-center justify-center text-sm font-medium text-gray-600 dark:text-white">
            <NavBarLinks
              href="/converter"
              title={'Converter'}
              icon={<RefreshCw />}
            />
          </button>
        </div>
      </nav>
    </div>
  );
};
