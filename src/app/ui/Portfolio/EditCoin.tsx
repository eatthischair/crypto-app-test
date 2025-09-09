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
import { AddCoinDropDown } from './AddCoinDropDown';
import { useState } from 'react';
import Image from 'next/image';
import { LuPencil } from 'react-icons/lu';

export const EditCoin = ({ setCoinsData, updateCoins, coin, coinImage }) => {
  const [coinName, setCoinName] = useState(
    coin.coinName.charAt(0).toUpperCase() + coin.coinName.slice(1)
  );
  const [purchasedAmt, setPurchasedAmt] = useState(coin.purchasedAmt);
  const [purchasedDate, setPurchasedDate] = useState(coin.purchasedDate || '');
  const today = new Date().toISOString().split('T')[0];

  const saveCoin = async () => {
    const coinData = { coinName, purchasedAmt, purchasedDate };
    const apiData = await fetchCoinData(coinName);
    const mergedObj = {
      ...coinData,
      ...apiData,
    };
    const storedCoins = localStorage.getItem('coins');
    let updatedCoins = storedCoins ? JSON.parse(storedCoins) : [];
    const coinIndex = updatedCoins.findIndex(
      (coin) => coin.coinName === coinName
    );
    if (coinIndex !== -1) {
      updatedCoins[coinIndex] = mergedObj;
    } else {
      updatedCoins = [...updatedCoins, mergedObj];
    }
    localStorage.setItem('coins', JSON.stringify(updatedCoins));
    setCoinsData(updatedCoins);
    updateCoins();
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
        <LuPencil
          className="text-gray-500 hover:text-blue-500 cursor-pointer"
          size={20}
        />
      </DialogTrigger>
      <DialogContent className="w-full rounded-sm bg-white dark:bg-card">
        <DialogHeader>
          <DialogTitle className="text-inherit">Edit Coin</DialogTitle>
          <DialogDescription className="text-inherit">
            Edit your portfolio for this coin
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-[40%_60%] w-full bg-card ">
          {coinImage ? (
            <div className="flex flex-col items-center justify-center h-[20vh] p-2 sm:p-0 mt-4 ">
              <img
                src={coinImage}
                alt="Coin Icon"
                className="max-h-[50%] aspect-square lg:max-h-[128px] h-auto object-cover sm:pt-0"
              />
              <div className="mt-2 text-center">
                {coinName} ({coin.symbol.toUpperCase()})
              </div>
            </div>
          ) : (
            <div className="w-full"></div>
          )}
          <div className="flex flex-col justify-between py-4 px-4  h-[20vh]">
            <div className="flex flex-col">
              <Input
                id="amt"
                type="number"
                className="w-full rounded-xs !placeholder-gray-400"
                onChange={(e) => setPurchasedAmt(e.target.value)}
                placeholder={coin.purchasedAmt}
                value={purchasedAmt}
              />
              <span className="text-xs text-gray-500 dark:text-gray-100 mt-2 self-start">
                Edit amount purchased
              </span>
            </div>
            <div className="flex flex-col">
              <Input
                id="date"
                type="date"
                className="w-full rounded-xs"
                onChange={(e) => setPurchasedDate(e.target.value)}
                max={today}
                value={purchasedDate || coin.purchasedDate}
              />
              <span className="text-xs text-gray-500 dark:text-gray-200 mt-2 self-start">
                Edit date purchased
              </span>
            </div>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
              onClick={saveCoin}
              className="bg-card border hover:bg-[var(--hover)]"
            >
              Save Changes
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
