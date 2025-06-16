'use server';
import { fetchData } from './fetchData';

export async function getCoinPriceHistory(coinNames) {
  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinNames}&per_page=${coinNames.length}&page=1&sparkline=false&price_change_percentage=24h`;
  const response = await fetchData(url);
  return response.body;
}
