import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AddCoinDropDown } from './AddCoinDropDown';
import { useState } from 'react';
import Image from 'next/image';
import { useEffect } from 'react';
import { getSearchResults } from '@/app/api/getSearchResults';
import { debounce } from 'lodash';

export const AddCoinButton = ({
  setCoinsData,
  coinsList,
  coinsData,
  updateCoins,
}) => {
  const [coinName, setCoinName] = useState('');
  const [purchasedAmt, setPurchasedAmt] = useState(0);
  const [purchasedDate, setPurchasedDate] = useState('');
  const [coinImage, setCoinImage] = useState('');
  const today = new Date().toISOString().split('T')[0];

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [filteredCoins, setFilteredCoins] = useState('');
  const handleInput = (searchTerm) => {
    setCoinName(searchTerm);
    setIsDropdownOpen(searchTerm.length > 0);
  };

  useEffect(() => {
    const getCoins = async () => {
      const results = await getSearchResults(coinName);
      setFilteredCoins(results.coins);
    };
    const debouncedGetCoins = debounce(getCoins, 300);
    debouncedGetCoins();

    return () => {
      debouncedGetCoins.cancel();
    };
  }, [coinName]);

  const saveCoin = async () => {
    const coinData = { coinName, purchasedAmt, purchasedDate };
    setCoinName('');
    const apiData = await fetchCoinData(coinName);
    const mergedObj = {
      ...coinData,
      ...apiData,
    };
    localStorage.setItem('coins', JSON.stringify([...coinsData, mergedObj]));
    setCoinsData([...coinsData, mergedObj]);
    updateCoins();
    setCoinImage('');
  };

  const fetchCoinData = async (coinName) => {
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinName}&per_page=1&page=1&sparkline=false&price_change_percentage=24h`;
    try {
      const coinData = await fetch(url, {
        next: { revalidate: 3600 },
      });
      const coinResponse = await coinData.json();
      return coinResponse[0];
    } catch (error) {
      console.error('Error fetching data: in getData', error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="bg-[var(--card)] hover:bg-[var(--hover)]"
          variant="outline"
        >
          Add Coin
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full rounded-sm bg-white dark:bg-card">
        <DialogHeader>
          <DialogTitle>Add Coin</DialogTitle>
          <DialogDescription className="text-inherit">
            Search for a coin to add
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-[40%_60%] w-full bg-card dark:bg">
          {coinImage ? (
            <Image
              src={coinImage}
              width={400}
              height={400}
              alt="Selected Coin Logo"
              className="p-4"
            />
          ) : (
            <div className="w-full"></div>
          )}
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <div className="relative col-span-4">
                <Input
                  id="name"
                  onChange={(e) => handleInput(e.target.value)}
                  value={coinName}
                  className="col-span-4 rounded-xs placeholder:text-inherit/90"
                  placeholder="Select Coin"
                />
                {coinName && (
                  <AddCoinDropDown
                    filteredCoins={filteredCoins}
                    isDropdownOpen={isDropdownOpen}
                    setIsDropdownOpen={setIsDropdownOpen}
                    searchTerm={coinName}
                    setCoinName={setCoinName}
                    setCoinImage={setCoinImage}
                  />
                )}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Input
                id="amt"
                type="number"
                className="col-span-4 rounded-xs placeholder:text-inherit/90"
                onChange={(e) => setPurchasedAmt(e.target.value)}
                placeholder="Purchased Amt"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Input
                id="date"
                type="date"
                className="col-span-4 rounded-xs"
                onChange={(e) => setPurchasedDate(e.target.value)}
                max={today}
                placeholder="Purchased Date"
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
              onClick={saveCoin}
              disabled={!(coinName && purchasedAmt > 0 && purchasedDate)}
              className="bg-popover"
            >
              Save Changes
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
