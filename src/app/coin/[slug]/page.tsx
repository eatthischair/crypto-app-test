import { Grid } from './Grid';
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug.toLowerCase();
  // const data = await fetch(
  //   `https://api.coingecko.com/api/v3/coins/${slug}?localization=false&tickers=false&market_data=true&community_data=true&developer_data=false&sparkline=false`
  // );
  // const coin = await data.json();

  // const pricesData = await fetch(
  //   `https://api.coingecko.com/api/v3/coins/${slug}/market_chart?vs_currency=usd&days=180&interval=daily`
  // );
  // const allPrices = await pricesData.json();

  const [coinResponse, pricesResponse] = await Promise.all([
    fetch(
      `https://api.coingecko.com/api/v3/coins/${slug}?localization=false&tickers=false&market_data=true&community_data=true&developer_data=false&sparkline=false`
    ),
    fetch(
      `https://api.coingecko.com/api/v3/coins/${slug}/market_chart?vs_currency=usd&days=180&interval=daily`
    ),
  ]);

  const coin = await coinResponse.json();
  const allPrices = await pricesResponse.json();

  return <Grid allPrices={allPrices} coin={coin} />;
}
