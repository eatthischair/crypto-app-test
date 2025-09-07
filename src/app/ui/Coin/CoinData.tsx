'use client';
import { formatPriceChange } from '@/lib/utils';
import { convert } from '@/app/ui/Header/NavBar/convert';
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
    return <div className="">Loading...</div>;
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

  return (
    <>
      <div className="bg-card row-span-2 rounded-sm p-4 flex justify-center">
        <div className="bg-card grid h-full grid-rows-3 content-center gap-4 rounded-sm p-4 w-full max-w-md  sm:pl-20">
          <span className="flex items-center justify-start gap-2 text-4xl sm:text-6xl">
            <small>
              {unit} {formatNum(currentPrice)}
            </small>
            <small className="text-base flex items-baseline">
              {formatPriceChange(
                coin.market_data.price_change_percentage_24h?.toFixed(2)
              )}
            </small>
          </span>

          <div className="text-left">
            <div className="flex items-center justify-start gap-2">
              <FaCaretUp size={35} color="#00c9be" />
              <span>All Time High:</span>
              <span className="text-xl">
                {unit} {formatNum(allTimeHigh)}
              </span>
            </div>
            <div className="text-sm text-gray-500 text-left">
              {new Date(coin.market_data.ath_date.usd).toUTCString()}
            </div>
          </div>

          <div className="text-left">
            <div className="flex items-center justify-start gap-2">
              <FaCaretDown size={35} color="#f2015d" />
              <span>All Time Low:</span>
              <span className="text-xl">
                {unit} {formatNum(allTimeLow)}
              </span>
            </div>
            <div className="text-sm text-gray-500 text-left">
              {new Date(coin.market_data.atl_date.usd).toUTCString()}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-card row-span-3 rounded-sm p-4 flex justify-center">
        <div className="grid h-[100%] grid-rows-6 content-center gap-4 p-4 w-full max-w-lg">
          {[
            {
              label: 'Market Cap',
              value: formatNum(marketCap),
            },
            {
              label: 'Fully Diluted Valuation',
              value: formatNum(fullyDilutedValuation),
            },
            {
              label: 'Volume / Market',
              value: volumeMarketRatio.toFixed(5),
            },
            {
              label: 'Total Volume',
              value: formatNum(totalVolume),
            },
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
              className="m-0 flex items-center justify-start font-semibold"
            >
              <Plus
                size={20}
                strokeWidth={3}
                className="mr-4 rounded-full p-1 shadow-[0_0_20px] shadow-indigo-500"
                strokeLinejoin="round"
              />
              <span className="flex-nowrap font-semibold">{label}</span>:{' '}
              {value}
            </div>
          ))}

          <div className="hidden sm:grid sm:grid-cols-2 sm:grid-rows-[25%_75%] sm:p-0">
            <div
              className=""
              style={{
                color: '#e37100',
                margin: 0,
                padding: 0,
                paddingTop: '1.5rem',
                textAlign: 'left',
              }}
            >
              • {formatNum(progressPercentage)}%
            </div>
            <div className="m-0 p-9"></div>
            <div className="p-0 pt-6 text-left">
              • {100 - progressPercentage}%
            </div>
            <div className="col-span-3 m-0 p-0 py-1 flex items-center justify-start">
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
