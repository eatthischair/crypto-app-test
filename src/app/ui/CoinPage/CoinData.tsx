'use client';
import { formatPriceChange } from '@/lib/utils';
import { convert } from '@/app/ui/HeaderComponents/NavBar/convert';
import { formatNum } from '@/lib/utils';
import { useSelector } from 'react-redux';
import { Plus } from 'lucide-react';
import ProgressBar from '@ramonak/react-progress-bar';
import { FaCaretDown, FaCaretUp } from 'react-icons/fa';

export const CoinData = ({ coin }) => {
  const currency = useSelector((state: any) => state.currencyReducer.currency);
  const exchangeRates = useSelector(
    (state: any) => state.exchangeRatesReducer.exchangeRates
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

  const progressPercentage = Math.trunc(
    (coin.market_data.circulating_supply / coin.market_data.max_supply) * 100
  );

  console.log('coin', coin);

  return (
    <>
      <div className="row-span-2 p-4 bg-[var(--card)] rounded-sm border-red-200 border justify-center">
        <div className="grid grid-rows-3 gap-4 content-center p-4 h-full bg-[var(--card)] rounded-sm">
          <span className="flex text-4xl justify-center gap-2 items-center">
            <small>
              {unit} {formatNum(currentPrice)}
            </small>
            <small className="text-base">
              {formatPriceChange(
                coin.market_data.price_change_percentage_24h?.toFixed(2)
              )}
            </small>
          </span>

          <div className="text-center">
            <div className="flex justify-center items-center gap-2">
              <FaCaretUp size={35} color="#00c9be" />
              <span>All Time High:</span>
              <span className="text-xl">
                {unit} {formatNum(allTimeHigh)}
              </span>
            </div>
            <div className="text-gray-500 text-sm">
              {new Date(coin.market_data.ath_date.usd).toUTCString()}
            </div>
          </div>

          <div className="text-center">
            <div className="flex justify-center items-center gap-2">
              <FaCaretDown size={35} color="#f2015d" />
              <span>All Time Low:</span>
              <span className="text-xl ">
                {unit} {formatNum(allTimeLow)}
              </span>
            </div>
            <div className="text-gray-500 text-sm">
              {new Date(coin.market_data.atl_date.usd).toUTCString()}
            </div>
          </div>
        </div>
      </div>

      <div className="row-span-3 bg-[var(--card)] rounded-sm ">
        <div className="grid grid-rows-6 gap-4 h-[100%] content-center p-4  ">
          {[
            { label: 'Market Cap', value: formatNum(marketCap) },
            {
              label: 'Fully Diluted Valuation',
              value: formatNum(fullyDilutedValuation),
            },
            { label: 'Volume / Market', value: volumeMarketRatio.toFixed(5) },
            { label: 'Total Volume', value: formatNum(totalVolume) },
            {
              label: 'Circulating Supply',
              value: `${coin.symbol.toUpperCase()} ${formatNum(
                coin.market_data.circulating_supply
              )}`,
            },
            {
              label: 'Max Supply',
              value: `${coin.symbol.toUpperCase()} ${formatNum(
                coin.market_data.max_supply
              )}`,
            },
          ].map(({ label, value }, idx) => (
            <div
              key={idx}
              className="font-semibold m-0 grid grid-flow-col justify-start"
            >
              <Plus
                size={20}
                strokeWidth={3}
                className="p-1 mr-4 mt-.5 shadow-indigo-500 rounded-full shadow-[0_0_20px]"
                strokeLinejoin="round"
              />
              <span className="font-semibold flex-nowrap">{label}</span>:{' '}
              {value}
            </div>
          ))}

          <div className="hidden sm:grid sm:grid-cols-2 sm:grid-rows-[25%_75%] sm:m-0 sm:p-0">
            <div
              style={{
                color: '#e37100',
                margin: 0,
                padding: 0,
                paddingTop: '1.5rem',
              }}
            >
              • {formatNum(progressPercentage)}%
            </div>
            <div className="m-0 p-9"></div>
            <div className="p-0 pt-6">• {100 - progressPercentage}%</div>
            <div className="col-span-3 m-0 p-0 py-1 sm:flex sm:items-center">
              <ProgressBar
                completed={progressPercentage}
                maxCompleted={100}
                height={'6px'}
                bgColor={'#e37100'}
                customLabel=" "
                className="w-full"
                barContainerClassName={`rounded-sm bg-[#ffd0a0]`}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
