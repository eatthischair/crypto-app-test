import { LinksRow } from '../../ui/CoinPage/LinksRow';
import { ConvertCurrency } from '../../ui/CoinPage/ConvertCurrency';
import { BottomChart } from '@/app/ui/CoinPage/BottomChart';
import { CoinData } from '@/app/ui/CoinPage/CoinData';
import Image from 'next/image';

import { convert } from '@/app/ui/HeaderComponents/NavBar/convert';
import { formatNum } from '@/lib/utils';

export const Grid = ({ coin, allPrices }) => {
  // if (!data) return <LoadingSpinner />;

  return (
    <div>
      <div className="grid grid-cols-3 grid-rows-[80%_20%] h-[40vh] gap-8 p-8 ">
        <div className="flex flex-col justify-center items-center p-4 place-content-center bg-[var(--card)] rounded-sm">
          <Image
            height="100"
            width="100"
            src={coin.image.large}
            alt="Coin symbol"
          />
          <div className="w-36 flex place-content-center m-0 p-2 gap-0 ">
            {coin.name}({coin.symbol.toUpperCase()})
          </div>
        </div>
        <CoinData coin={coin} />
        <a
          href={coin.links.homepage}
          target="_blank"
          rel="noopener noreferrer"
          className="flex place-content-center flex-nowrap truncate overflow-hidden text-overflow-ellipsis items-center  bg-[var(--card)] rounded-sm"
        >
          {coin.links.homepage}
        </a>
      </div>
      <div className="grid grid-cols-3 grid-rows-[80%_20%] h-[50vh] gap-4 p-8 ">
        <div className="col-span-3 overflow-ellipsis overflow-scroll p-8 bg-[var(--card)] rounded-sm">
          {coin.description.en}
        </div>
        <LinksRow coin={coin} />
      </div>
      <ConvertCurrency coin={coin} />
      <BottomChart allPrices={allPrices.prices} />
    </div>
  );
};
