import { LoadingSpinner } from '@/components/ui/loadingSpinner';
import React from 'react';
import { formatPriceChange, numToPrice } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';
import { formatPrice } from '@/lib/utils';
//add stuff later to change price with currency in navbar

export const CoinCard = ({ coin, data }) => {
  console.log('COINCARD', coin, data);
  if (!data) {
    return <LoadingSpinner />;
  }

  //need to do api request for all the coins, to find out their current price
  const amtChangeSincePurchase = coin.currentPriceToday / coin.current_price;

  return (
    <div className="w-full shadow-lg rounded-lg overflow-hidden grid grid-cols-[20%_80%] gap-4 p-4">
      {/* Left Side: Square Image */}
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
            {numToPrice(data.currentPriceToday)}
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

        {/* <div className="flex-1 flex flex-col sm:flex-row justify-between items-center sm:items-start gap-4"> */}

        <div className="text-center sm:text-left">
          <h3 className="text-sm font-semibold">Coin Amount</h3>
          <span className="text-lg font-bold">
            {numToPrice(coin.purchasedAmt)}
          </span>
        </div>
        <div className="text-center sm:text-left">
          <h3 className="text-sm font-semibold">Amount Value</h3>
          <span className="text-lg font-bold">
            {numToPrice(coin.purchasedAmt * data.current_price)}
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
