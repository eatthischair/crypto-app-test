'use client';
import { formatPriceChange } from '@/lib/utils';
import { convert } from '@/app/ui/HeaderComponents/NavBar/convert';
import { formatNum } from '@/lib/utils';
import { useSelector } from 'react-redux';
export const CoinData = ({ coin }) => {
  const currency = useSelector((state) => state.currencyReducer.currency);
  const exchangeRates = useSelector(
    (state) => state.exchangeRatesReducer.exchangeRates
  );

  if (
    !currency ||
    !exchangeRates ||
    !exchangeRates.rates ||
    !exchangeRates.rates[currency] ||
    !exchangeRates.rates.usd
  ) {
    return <div>Loading...</div>;
  }
  const exchangeRateObj = exchangeRates?.rates?.[currency];

  const volumeMarketRatio =
    coin.market_data.total_volume.usd / coin.market_data.market_cap.usd;

  const { currentPrice, unit } = convert(
    coin.market_data.current_price.usd,
    exchangeRateObj,
    exchangeRates.rates.usd
  );

  const allTimeHigh = convert(
    coin.market_data.ath.usd,
    exchangeRateObj,
    exchangeRates.rates.usd
  ).currentPrice;
  const allTimeLow = convert(
    coin.market_data.atl.usd,
    exchangeRateObj,
    exchangeRates.rates.usd
  ).currentPrice;
  const marketCap = convert(
    coin.market_data.market_cap.usd,
    exchangeRateObj,
    exchangeRates.rates.usd
  ).currentPrice;
  const fullyDilutedValuation = convert(
    coin.market_data.fully_diluted_valuation.usd,
    exchangeRateObj,
    exchangeRates.rates.usd
  ).currentPrice;
  const totalVolume = convert(
    coin.market_data.total_volume.usd,
    exchangeRateObj,
    exchangeRates.rates.usd
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
