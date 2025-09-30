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
import { useEffect } from 'react';
import { getSearchResults } from '@/app/api/getSearchResults';
import { debounce } from 'lodash';
import { Calendar22 } from './Calendar';

export const AddCoinButton = ({ setCoinsData, coinsData, updateCoins }) => {
  const [coinName, setCoinName] = useState('');
  const [purchasedAmt, setPurchasedAmt] = useState(0);
  const [purchasedDate, setPurchasedDate] = useState('');
  const [coinImage, setCoinImage] = useState('');
  const [validationErrors, setValidationErrors] = useState({
    coinName: '',
    purchasedAmt: '',
    purchasedDate: '',
  });
  const today = new Date().toISOString().split('T')[0];

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [filteredCoins, setFilteredCoins] = useState('');

  const handleInput = (searchTerm) => {
    setCoinName(searchTerm);
    setIsDropdownOpen(searchTerm.length > 0);
    // Clear coin name error when user starts typing
    if (validationErrors.coinName) {
      setValidationErrors((prev) => ({ ...prev, coinName: '' }));
    }
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

  const validateForm = () => {
    const errors = {
      coinName: '',
      purchasedAmt: '',
      purchasedDate: '',
    };
    // Validate coin selection
    if (!coinName || coinName.trim() === '') {
      errors.coinName = 'Please select a coin';
    }
    // Validate purchase amount
    if (!purchasedAmt || purchasedAmt <= 0) {
      errors.purchasedAmt = 'Amount must be greater than 0';
    }
    // Validate purchase date
    if (!purchasedDate) {
      errors.purchasedDate = 'Please select a purchase date';
    } else if (new Date(purchasedDate) > new Date(today)) {
      errors.purchasedDate = 'Date cannot be in the future';
    }

    setValidationErrors(errors);

    return !errors.coinName && !errors.purchasedAmt && !errors.purchasedDate;
  };

  const saveCoin = async () => {
    if (!validateForm()) {
      return;
    }

    const coinData = { coinName, purchasedAmt, purchasedDate };
    setCoinName('');
    setPurchasedAmt(0);
    setPurchasedDate('');
    setCoinImage('');
    setValidationErrors({ coinName: '', purchasedAmt: '', purchasedDate: '' });

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
        <Button
          className="bg-[var(--card)] hover:bg-[var(--hover)]"
          variant="outline"
        >
          Add Coin
        </Button>
      </DialogTrigger>
      <DialogContent
        className="w-full rounded-sm bg-white dark:bg-card"
        // onInteractOutside={(e) => e.preventDefault()}
      >
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
                  className={`col-span-4 rounded-xs placeholder:text-inherit/90 ${
                    validationErrors.coinName
                      ? 'border-red-500 focus:border-red-500'
                      : ''
                  }`}
                  placeholder="Select Coin"
                />
                {validationErrors.coinName && (
                  <p className="text-red-500 text-sm mt-1">
                    {validationErrors.coinName}
                  </p>
                )}
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
                className={`col-span-4 rounded-xs placeholder:text-inherit/90 ${
                  validationErrors.purchasedAmt
                    ? 'border-red-500 focus:border-red-500'
                    : ''
                }`}
                onChange={(e) => {
                  setPurchasedAmt(e.target.value);
                  if (validationErrors.purchasedAmt) {
                    setValidationErrors((prev) => ({
                      ...prev,
                      purchasedAmt: '',
                    }));
                  }
                }}
                placeholder="Purchased Amt"
              />
              {validationErrors.purchasedAmt && (
                <p className="text-red-500 text-sm mt-1 col-span-4">
                  {validationErrors.purchasedAmt}
                </p>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Input
                id="date"
                type="date"
                className={`col-span-4 rounded-xs ${
                  validationErrors.purchasedDate
                    ? 'border-red-500 focus:border-red-500'
                    : ''
                }`}
                onChange={(e) => {
                  setPurchasedDate(e.target.value);
                  if (validationErrors.purchasedDate) {
                    setValidationErrors((prev) => ({
                      ...prev,
                      purchasedDate: '',
                    }));
                  }
                }}
                max={today}
                placeholder="Purchased Date"
              />
              {validationErrors.purchasedDate && (
                <p className="text-red-500 text-sm mt-1 col-span-4">
                  {validationErrors.purchasedDate}
                </p>
              )}
            </div>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
              onClick={saveCoin}
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
