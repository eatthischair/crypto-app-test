import { numToPrice, formatPriceChange } from '@/lib/utils';
export const CoinData = ({ coin }) => {
  const volumeMarketRatio =
    coin.market_data.total_volume.usd / coin.market_data.market_cap.usd;

  return (
    <>
      <div className="row-span-2 p-4 bg-[var(--card)] rounded-sm">
        <div className="grid grid-rows-3 gap-4 content-center p-4 h-full bg-[var(--card)] rounded-sm">
          <span className="flex text-4xl justify-center gap-2 items-center">
            <small> {numToPrice(coin.market_data.current_price.usd)}</small>
            <small className="text-base ">
              {formatPriceChange(
                coin.market_data.price_change_percentage_24h.toFixed(2)
              )}
            </small>
          </span>
          <div>
            All Time High: ${coin.market_data.ath.usd}{' '}
            {new Date(coin.market_data.ath_date.usd).toUTCString()}
          </div>
          <div>
            All Time Low: ${coin.market_data.atl.usd}{' '}
            {new Date(coin.market_data.atl_date.usd).toUTCString()}
          </div>
        </div>
      </div>
      <div className="row-span-2 bg-[var(--card)] rounded-sm">
        <div className="grid grid-rows-6 gap-2 h-[100%] content-center p-4">
          <div>
            <span className="font-semibold">Market Cap</span>:{' '}
            {numToPrice(coin.market_data.market_cap.usd)}
          </div>
          <div>
            <span className="font-semibold">Fully Diluted Valuation</span>:{' '}
            {numToPrice(coin.market_data.fully_diluted_valuation.usd)}
          </div>
          <div>
            <span className="font-semibold">Volume / Market</span>:{' '}
            {volumeMarketRatio.toFixed(5)}
          </div>
          <div>
            <span className="font-semibold">Total Volume</span>:{' '}
            {numToPrice(coin.market_data.total_volume.usd)}
          </div>
          <div>
            <span className="font-semibold">Circulating Supply</span>:{' '}
            {coin.symbol.toUpperCase()}{' '}
            {numToPrice(coin.market_data.circulating_supply).slice(1)}
          </div>
          <div>
            <span className="font-semibold">Max Supply</span>:{' '}
            {coin.symbol.toUpperCase()}{' '}
            {numToPrice(coin.market_data.max_supply).slice(1)}
          </div>
        </div>
      </div>
    </>
  );
};
