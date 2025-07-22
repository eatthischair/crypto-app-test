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
import { House, Layers } from 'lucide-react';

export const NavBar = () => {
  const [coinsList, setCoinsList] = useState(null);

  const dispatch = useAppDispatch();

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
    <div className="w-full min-h-[20%] grid grid-cols-1 gap-3 p-2 sm:grid-cols-[auto_auto_auto_1fr_2fr_auto_auto] sm:gap-4 sm:p-0 sm:min-h-[20%] sm:items-center">
      <div className="col-start-1 flex gap-4 px-3 sm:justify-self-start">
        <Image
          src={'/images/logo.png'}
          width={220}
          height={60}
          alt="Company Logo"
        />
      </div>
      <div className="col-start-2 justify-self-start">
        <NavBarLinks href="/" title={'Coins'} icon={<House size={26} />} />
      </div>
      <div className="col-start-3 justify-self-start">
        <NavBarLinks
          href="/dashboard/portfolio"
          title={'Portfolio'}
          icon={<Layers />}
        />
      </div>

      <div className="col-start-5 justify-self-end w-full h-full">
        <SearchBar coinsList={coinsList} />
      </div>
      <div className="col-start-6 justify-self-end">
        <CurrencySwitch />
      </div>
      <div className="col-start-7 justify-self-end">
        <ThemeButton />
      </div>
    </div>
  );
};
