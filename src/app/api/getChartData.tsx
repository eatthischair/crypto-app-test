'use server';
import { fetchData } from './fetchData';

export async function getChartData(coin, days = 30) {
  const url = `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=${days}`;

  const response = await fetchData(url);
  return response.body;
}
