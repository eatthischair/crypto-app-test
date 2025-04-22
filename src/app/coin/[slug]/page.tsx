import { LinksRow } from '../../ui/CoinPage/LinksRow';
import { ConvertCurrency } from '../../ui/CoinPage/ConvertCurrency';
import { BottomChart } from '@/app/ui/CoinPage/BottomChart';
import { CoinData } from '@/app/ui/CoinPage/CoinData';
import Image from 'next/image';

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug.toLowerCase();
  const data = await fetch(
    `https://api.coingecko.com/api/v3/coins/${slug}?localization=false&tickers=false&market_data=true&community_data=true&developer_data=false&sparkline=false`
  );
  const coin = await data.json();

  const pricesData = await fetch(
    `https://api.coingecko.com/api/v3/coins/${slug}/market_chart?vs_currency=usd&days=180&interval=daily`
  );
  const allPrices = await pricesData.json();
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
}
