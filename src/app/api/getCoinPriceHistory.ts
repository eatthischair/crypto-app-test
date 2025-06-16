'use server';
import { fetchData } from './fetchData';

export async function getCoinPriceHistory(slug) {
  const url = `https://api.coingecko.com/api/v3/coins/${slug}/market_chart?vs_currency=usd&days=180&interval=daily`;
  const response = await fetchData(url);
  return response.body;
}
