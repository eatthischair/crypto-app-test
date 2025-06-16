import { getCoinById } from '@/app/api/getCoinById';
import { Grid } from './Grid';
import { getCoinPriceHistory } from '@/app/api/getCoinPriceHistory';
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug.toLowerCase();

  const coin = await getCoinById(slug);
  const allPrices = await getCoinPriceHistory(slug);

  return <Grid allPrices={allPrices} coin={coin} />;
}
