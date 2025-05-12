'use client';
import { formatPriceChange } from '@/lib/utils';
import { convert } from '@/app/ui/HeaderComponents/NavBar/convert';
import { formatNum } from '@/lib/utils';
import { useSelector } from 'react-redux';

export const CoinData = ({ coin }) => {
  const test = useSelector((state) => state.testReducer.test);

  const volumeMarketRatio =
    coin.market_data.total_volume.usd / coin.market_data.market_cap.usd;

  const { currentPrice, unit } = convert(
    coin.market_data.current_price.usd,
    test
  );

  const allTimeHigh = convert(coin.market_data.ath.usd, test).currentPrice;
  const allTimeLow = convert(coin.market_data.atl.usd, test).currentPrice;
  const marketCap = convert(coin.market_data.market_cap.usd, test).currentPrice;
  const fullyDilutedValuation = convert(
    coin.market_data.fully_diluted_valuation.usd,
    test
  ).currentPrice;
  const totalVolume = convert(
    coin.market_data.total_volume.usd,
    test
  ).currentPrice;
  return (
    <>
      <div className="row-span-2 p-4 bg-[var(--card)] rounded-sm">
        <div className="grid grid-rows-3 gap-4 content-center p-4 h-full bg-[var(--card)] rounded-sm">
          <span className="flex text-4xl justify-center gap-2 items-center">
            <small>
              {unit} {formatNum(currentPrice)}
            </small>

            <small className="text-base ">
              {formatPriceChange(
                coin.market_data.price_change_percentage_24h.toFixed(2)
              )}
            </small>
          </span>
          <div>
            All Time High: {unit} {formatNum(allTimeHigh)}{' '}
            {new Date(coin.market_data.ath_date.usd).toUTCString()}
          </div>
          <div>
            All Time Low: {unit} {formatNum(allTimeLow)}{' '}
            {new Date(coin.market_data.atl_date.usd).toUTCString()}
          </div>
        </div>
      </div>
      <div className="row-span-2 bg-[var(--card)] rounded-sm">
        <div className="grid grid-rows-6 gap-2 h-[100%] content-center p-4">
          <div>
            <span className="font-semibold">Market Cap</span>:{' '}
            {formatNum(marketCap)}
          </div>
          <div>
            <span className="font-semibold">Fully Diluted Valuation</span>:{' '}
            {formatNum(fullyDilutedValuation)}
          </div>
          <div>
            <span className="font-semibold">Volume / Market</span>:{' '}
            {volumeMarketRatio.toFixed(5)}
          </div>
          <div>
            <span className="font-semibold">Total Volume</span>:{' '}
            {formatNum(totalVolume)}
          </div>
          <div>
            <span className="font-semibold">Circulating Supply</span>:{' '}
            {coin.symbol.toUpperCase()}{' '}
            {formatNum(coin.market_data.circulating_supply)}
          </div>
          <div>
            <span className="font-semibold">Max Supply</span>:{' '}
            {coin.symbol.toUpperCase()} {formatNum(coin.market_data.max_supply)}
          </div>
        </div>
      </div>
    </>
  );
};
