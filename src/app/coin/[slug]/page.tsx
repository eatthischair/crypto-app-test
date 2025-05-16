import { Grid } from './Grid';
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug.toLowerCase();

  const [coinResponse, pricesResponse] = await Promise.all([
    fetch(
      `https://api.coingecko.com/api/v3/coins/${slug}?localization=false&tickers=false&market_data=true&community_data=true&developer_data=false&sparkline=false`,
      {
        next: { revalidate: 3600 },
      }
    ),
    fetch(
      `https://api.coingecko.com/api/v3/coins/${slug}/market_chart?vs_currency=usd&days=180&interval=daily`,
      {
        next: { revalidate: 3600 },
      }
    ),
  ]);

  const coin = await coinResponse.json();
  const allPrices = await pricesResponse.json();

  return <Grid allPrices={allPrices} coin={coin} />;
}
