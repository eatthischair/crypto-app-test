import { ChevronDown } from 'lucide-react';
import { convert } from '../Header/NavBar/convert';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useState, useEffect } from 'react';
import { getCoinTableData } from '@/app/api/getCoinTableData';
import { useSelector } from 'react-redux';

export const ConvertCard = ({
  setCoin1CurPrice,
  coin1CurPrice,
  setCoin2CurPrice,
  coin2CurPrice,
  setAmtToConvert,
  convertedAmt,
  setCoin1Id,
  setCoin2Id,
  setCoin1Name,
  setCoin2Name,
  coin1Name,
  coin2Name,
  setCoin1Symbol,
  setCoin2Symbol,
}) => {
  const isFromCurrency = !!setCoin1CurPrice;
  const [quantity, setQuantity] = useState(0);
  const [coins, setCoins] = useState([]);

  const currency = useSelector((state: any) => state.currencyReducer.currency);
  const exchangeRates = useSelector(
    (state: any) => state.exchangeRatesReducer.exchangeRates
  );
  const exchangeRateObj = exchangeRates?.rates?.[currency];

  useEffect(() => {
    const getData = async () => {
      const coinData = await getCoinTableData(1);
      setCoins(coinData);
    };
    getData();
  }, []);

  if (
    !currency ||
    !exchangeRates ||
    !exchangeRates.rates ||
    !exchangeRates.rates[currency] ||
    !exchangeRates.rates.usd
  ) {
    return <div>Loading...</div>;
  }

  const handleClick = (cur) => {
    if (setCoin1CurPrice) {
      setCoin1CurPrice(cur.current_price);
      setCoin1Id(cur.id);
      setCoin1Name(cur.name);
      setCoin1Symbol(cur.symbol);
    } else {
      setCoin2CurPrice(cur.current_price);
      setCoin2Id(cur.id);
      setCoin2Name(cur.name);
      setCoin2Symbol(cur.symbol);
    }
  };

  const handleInput = (q) => {
    setQuantity(q);
    if (setCoin1CurPrice) {
      setAmtToConvert(q * coin1CurPrice);
    }
  };

  const displayName = coin1Name ? coin1Name : coin2Name;
  const exchangeRate = coin1CurPrice ? coin1CurPrice : coin2CurPrice;

  const { currentPrice, unit } = convert(
    exchangeRate,
    exchangeRateObj,
    exchangeRates.rates.usd
  );

  return (
    <div
      className={`text-indigo-900 dark:text-white bg-white rounded-md md:rounded-lg lg:rounded-xl xl:rounded-2xl p-3 md:flex-1 md:p-6 dark:bg-indigo-900/30`}
    >
      <p className="text-xs md:text-base font-light text-indigo-900 dark:text-gray-100">
        {isFromCurrency ? 'You sell' : 'You buy'}
      </p>
      <div className="flex justify-between items-center border-b md:border-b-2 border-b-indigo-800 dark:border-b-white py-4 md:py-6">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="flex">
              {displayName || 'Select Currency'}
              <ChevronDown />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="sm:max-h-60 flex-col flex-shrink ml-16 dark:bg-indigo-950 border ">
            {/* {coins.map((cur) => {
              return (
                <DropdownMenuItem key={cur.id} onClick={() => handleClick(cur)}>
                  {cur.id} ({cur.symbol.toUpperCase()})
                </DropdownMenuItem>
              );
            })} */}
            {coins.map((cur) => {
              return (
                <DropdownMenuItem key={cur.id} onClick={() => handleClick(cur)}>
                  {cur.id.charAt(0).toUpperCase() + cur.id.slice(1)} (
                  {cur.symbol.toUpperCase()})
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
        {isFromCurrency ? (
          <input
            type="number"
            className="bg-transparent outline-none text-right w-2/ hover:opacity-75 active:opacity-50"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => handleInput(e.target.value)}
          />
        ) : (
          <p className="text-right w-2/5 lg:text-lg">
            {convertedAmt || 'Quantity'}
          </p>
        )}
      </div>
      <div>
        {coin1Name || coin2Name ? (
          <div>
            1 {coin1Name || coin2Name} = {unit}
            {currentPrice}
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};
