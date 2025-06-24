import React from 'react';
import { formatPriceChange } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';
import { useSelector } from 'react-redux';
import { convert } from '../HeaderComponents/NavBar/convert';
import { formatNum } from '@/lib/utils';

export const CoinCard = ({ coin, data }) => {
  const currency = useSelector((state) => state.currencyReducer.currency);
  const exchangeRates = useSelector(
    (state) => state.exchangeRatesReducer.exchangeRates
  );
  const exchangeRateObj = exchangeRates?.rates?.[currency];

  const amtChangeSincePurchase = coin.currentPriceToday / coin.current_price;

  const { currentPrice, unit } = convert(
    data.currentPriceToday,
    exchangeRateObj,
    exchangeRates.rates.usd
  );

  const amtValue = formatNum(
    convert(data.currentPriceToday, exchangeRateObj, exchangeRates.rates.usd)
      .currentPrice * coin.purchasedAmt
  );

  return (
    <div className="h-full sm:w-full shadow-lg rounded-lg overflow-hidden sm:grid sm:grid-cols-[20%_80%] sm:gap-4 sm:p-12 mb-12 bg-[var(--card)]">
      <div className="flex flex-col items-center justify-start h-[20vh] sm:h-1/2 sm:w-1/2 w-full aspect-square p-2 sm:p-0 mt-4 sm:mt-8">
        <img
          src={data?.image}
          alt="Coin Icon"
          className="w-1/4 sm:w-full h-auto sm:h-full object-cover sm:pt-0"
        />
        <div className="mt-2 text-left">{coin.coinName}</div>
      </div>

      <div className="grid grid-cols-2 p-2 m-2 items-stretch sm:grid-cols-4 sm:grid-rows-2">
        <div className="text-left m-2 p-2 flex flex-col justify-between h-full">
          <h3 className="sm:text-base text-sm font-semibold">Current Price</h3>
          <span className="sm:text-lg text-base font-bold">
            {unit} {formatNum(currentPrice)}
          </span>
        </div>
        <div className="text-left m-2 p-2 flex flex-col justify-between h-full">
          <h3 className="sm:text-base text-sm font-semibold">
            Price Change 24h
          </h3>
          <span className="sm:text-lg text-base font-bold">
            {formatPriceChange(data.priceChangeToday) || (
              <div className="font-normal text-base">Data Not Available</div>
            )}
          </span>
        </div>

        <div className="hidden sm:grid sm:text-left m-2 p-2 flex flex-col justify-between h-full">
          <h3 className="sm:text-base text-sm font-semibold">
            Market Cap vs Volume
          </h3>
          <span className="mt-auto">
            {data.market_cap && data.total_volume ? (
              <>
                <div>
                  {Math.ceil((data.total_volume / data.market_cap) * 100)}
                  {'%'}
                </div>
                <Progress
                  className="sm:w-32 w-24"
                  value={Math.ceil((data.total_volume / data.market_cap) * 100)}
                />
              </>
            ) : (
              <div className="mt-auto">Data Not Available</div>
            )}
          </span>
        </div>

        <div className="hidden sm:grid sm:text-left m-2 p-2 flex flex-col justify-between h-full">
          <h3 className="sm:text-base text-sm font-semibold">
            Circ Supply vs Max Supply
          </h3>
          <span className="mt-auto">
            {data.market_cap && data.total_volume ? (
              <>
                <div>
                  {Math.ceil((data.circulating_supply / data.max_supply) * 100)}
                  {'%'}
                </div>
                <Progress
                  className="sm:w-32 w-24"
                  value={Math.ceil(
                    (data.circulating_supply / data.max_supply) * 100
                  )}
                />
              </>
            ) : (
              <div className="mt-auto">Data Not Available</div>
            )}
          </span>
        </div>

        <div className="text-left m-2 p-2 flex flex-col justify-between h-full">
          <h3 className="sm:text-base text-sm font-semibold">Coin Amount</h3>
          <span className="sm:text-lg text-base font-bold">
            {coin.purchasedAmt}
          </span>
        </div>

        <div className="text-left m-2 p-2 flex flex-col justify-between h-full">
          <h3 className="sm:text-base text-sm font-semibold">Amount Value</h3>
          <span className="sm:text-lg text-base font-bold">
            {unit} {amtValue}
          </span>
        </div>

        <div className="text-left m-2 p-2 flex flex-col justify-between h-full">
          <h3 className="sm:text-base text-sm font-semibold">
            Amount Price Change since Purchase
          </h3>
          <span className="sm:text-lg text-base font-bold">
            {formatPriceChange(amtChangeSincePurchase - 1)}
          </span>
        </div>

        <div className="text-left m-2 p-2 flex flex-col justify-between h-full">
          <h3 className="sm:text-base text-sm font-semibold">Purchase Date</h3>
          <span className="sm:text-lg text-base font-bold">
            {new Date(coin.purchasedDate).toLocaleDateString('en-US', {
              month: 'short',
              day: '2-digit',
              year: 'numeric',
            })}
          </span>
        </div>
      </div>
    </div>
  );
};
