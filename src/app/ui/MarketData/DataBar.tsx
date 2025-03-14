// import BigNumber from 'bignumber.js';

import { Progress } from '@/components/ui/progress';

export const DataBar = () => {
  const { data } = require('../../data/marketData.json');
  // const totalCoins = require('../../data/coinsTraded.json');

  // const marketCap = Object.values(data.total_volume).reduce((total, val) => {
  //   total = BigNumber(total);
  //   return Math.trunc(total.plus(BigNumber(val)).toString());
  // });

  // total_market_cap[currency]; // where currency is the currency you selected in the app
  // total_volume[currency]; // where currency is the currency you selected in the app

  return (
    <span className="m-auto h-[10%] w-[60%] flex items-center justify-center gap-4 text-xs border-red-400 border-2 ">
      <div className="p-8">Coins {data.active_cryptocurrencies}</div>
      <div className="p-8">Exchange {data.markets} </div>
      <div className="p-8">$2.77T</div>
      <div className="flex flex-grow flex-nowrap items-center gap-2">
        $126.46B
        <Progress className="w-[50%] m-0" value={5} />
      </div>
      <div className="flex flex-grow flex-nowrap items-center gap-2">
        {Math.trunc(data.market_cap_percentage.btc)}%
        <Progress className="w-[50%] m-0" value={59} />
      </div>
      <div className="flex flex-grow flex-nowrap items-center gap-2">
        {Math.trunc(data.market_cap_percentage.eth)}%{' '}
        <Progress className="w-[50%] m-0" value={8} />
      </div>
    </span>
  );
};
