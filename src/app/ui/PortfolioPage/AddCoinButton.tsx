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

export const AddCoinButton = ({
  setCoinsData,
  coinsList,
  coinsData,
  updateCoins,
}) => {
  const [coinName, setCoinName] = useState('');
  const [purchasedAmt, setPurchasedAmt] = useState(0);
  const [purchasedDate, setPurchasedDate] = useState('');
  const today = new Date().toISOString().split('T')[0];

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
    localStorage.setItem('coins', JSON.stringify([...coinsData, mergedObj]));
    setCoinsData([...coinsData, mergedObj]);
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
        <Button variant="outline">Add Coin</Button>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Add Coin</DialogTitle>
          <DialogDescription>Search for a coin to add</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Coin
            </Label>
            <div className="relative col-span-3">
              <Input
                id="name"
                onChange={(e) => handleInput(e.target.value)}
                value={coinName}
                className="col-span-3"
              />
              {coinName && (
                <AddCoinDropDown
                  filteredCoins={filteredCoins}
                  isDropdownOpen={isDropdownOpen}
                  setIsDropdownOpen={setIsDropdownOpen}
                  searchTerm={coinName}
                  setCoinName={setCoinName}
                />
              )}
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="amt" className="text-right">
              Purchased Amt
            </Label>
            <Input
              id="amt"
              type="number"
              className="col-span-3"
              onChange={(e) => setPurchasedAmt(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="date" className="text-right">
              Purchase Date
            </Label>
            <Input
              id="date"
              type="date"
              className="col-span-3"
              onChange={(e) => setPurchasedDate(e.target.value)}
              max={today}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
              onClick={saveCoin}
              disabled={!(coinName && purchasedAmt > 0 && purchasedDate)}
            >
              Save Changes
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
