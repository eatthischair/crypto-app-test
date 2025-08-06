'use server';
import { fetchData } from './fetchData';

export async function getCoinPriceHistory(slug, cur = 'usd') {
  console.log('getcoinpricehistory', slug, cur);
  const url = `https://api.coingecko.com/api/v3/coins/${slug}/market_chart?vs_currency=${cur}&days=180&interval=daily`;
  const response = await fetchData(url);
  return response.body;
}
