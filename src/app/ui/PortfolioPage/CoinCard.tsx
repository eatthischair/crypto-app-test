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
    <div className="w-full shadow-lg rounded-lg overflow-hidden grid grid-cols-[20%_80%] gap-4 p-12 mb-12">
      <div className="sm:w-1/3 w-full aspect-square">
        <img
          src={data?.image}
          alt="Coin Icon"
          className="w-full h-full object-cover"
        />
        <div className="justify-center items-center">{coin.coinName}</div>
      </div>

      <div className="grid grid-cols-4 grid-rows-2">
        <div className="text-center sm:text-left">
          <h3 className="text-sm font-semibold">Current Price</h3>
          <span className="text-lg font-bold">
            {unit} {formatNum(currentPrice)}
          </span>
        </div>
        <div className="text-center sm:text-left">
          <h3 className="text-sm font-semibold">Price Change 24h</h3>
          <span className="text-lg font-bold">
            {formatPriceChange(data.priceChangeToday)}
          </span>
        </div>
        <div className="text-left ">
          <h3 className="text-sm font-semibold">Market Cap vs Volume</h3>

          {data.market_cap && data.total_volume ? (
            <span className="">
              <Progress
                className="w-32 mt-2"
                value={data.market_cap / data.total_volume}
              />
            </span>
          ) : (
            <div>Data Not Available</div>
          )}
        </div>
        <div className="text-left">
          <h3 className="text-sm font-semibold">Circ Supply vs Max Supply</h3>
          <span className="">
            {data.market_cap && data.total_volume ? (
              <Progress
                className="w-32 mt-2"
                value={100 * (data.circulating_supply / data.total_supply)}
              />
            ) : (
              <div>Data Not Available</div>
            )}
          </span>
        </div>

        <div className="text-center sm:text-left">
          <h3 className="text-sm font-semibold">Coin Amount</h3>
          <span className="text-lg font-bold">{coin.purchasedAmt}</span>
        </div>
        <div className="text-center sm:text-left">
          <h3 className="text-sm font-semibold">Amount Value</h3>
          <span className="text-lg font-bold">
            {unit} {amtValue}
          </span>
        </div>
        <div className="text-center sm:text-left">
          <h3 className="text-sm font-semibold">
            Amount Price Change since Purchase
          </h3>
          <span className="text-lg font-bold">
            {formatPriceChange(amtChangeSincePurchase - 1)}
          </span>
        </div>
        <div className="text-center sm:text-left">
          <h3 className="text-sm font-semibold">Purchase Date</h3>
          <span className="text-lg font-bold">{coin.purchasedDate}</span>
        </div>
      </div>
    </div>
  );
};
