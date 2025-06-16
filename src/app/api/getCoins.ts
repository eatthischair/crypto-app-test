'use server';
import { fetchData } from './fetchData';

export async function getCoins(page) {
  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=${
    page + 1
  }&sparkline=true&price_change_percentage=1h%2C24h%2C7d`;

  const response = await fetchData(url);
  return response.body;
}
