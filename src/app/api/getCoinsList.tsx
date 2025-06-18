'use server';
import { fetchData } from './fetchData';

export async function getCoinsList() {
  const url = 'https://api.coingecko.com/api/v3/coins/list';
  const response = await fetchData(url);
  return response.body;
}
