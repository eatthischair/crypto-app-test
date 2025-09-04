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

export const EditCoin = ({
  setCoinsData,
  coinsList,
  coinsData,
  updateCoins,
  coin,
}) => {
  const [coinName, setCoinName] = useState(coin.coinName);
  const [purchasedAmt, setPurchasedAmt] = useState(0);
  const [purchasedDate, setPurchasedDate] = useState('');
  const [coinImage, setCoinImage] = useState('');
  const today = new Date().toISOString().split('T')[0];

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  console.log('coindate', coin.purchasedDate);
  const handleInput = (searchTerm) => {
    setCoinName(searchTerm);
    setIsDropdownOpen(searchTerm.length > 0);
  };

  const filteredCoins = coinsList?.filter((coin) =>
    coin.id.toLowerCase().startsWith(coinName.toLowerCase())
  );

  const saveCoin = async () => {
    const coinData = { coinName, purchasedAmt, purchasedDate };
    setCoinName('');
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
      <DialogContent className="w-full rounded-sm bg-white dark:bg-background">
        <DialogHeader>
          <DialogTitle className="text-inherit">Edit Coin</DialogTitle>
          <DialogDescription className="text-inherit">
            Edit your portfolio for this coin
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-[40%_60%] w-full bg-[var(--background)]">
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
            <div className="grid grid-cols-4 items-center gap-4"></div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Input
                id="amt"
                type="number"
                className="col-span-4 rounded-xs !placeholder-gray-400"
                onChange={(e) => setPurchasedAmt(e.target.value)}
                placeholder={coin.purchasedAmt}
                value={purchasedAmt || coin.purchasedAmt}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Input
                id="date"
                type="date"
                className="col-span-4 rounded-xs"
                onChange={(e) => setPurchasedDate(e.target.value)}
                max={today}
                value={purchasedDate || coin.purchasedDate}
                // onFocus={(this.type = 'date')}
                // onBlur={(this.type = 'text')}
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
              disabled={!(purchasedAmt > 0 && purchasedDate)}
              className="bg-[#3a397c]"
            >
              Save Changes
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
