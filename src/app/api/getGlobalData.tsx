'use server';
import { fetchData } from './fetchData';

export async function getGlobalData() {
  const url = 'https://api.coingecko.com/api/v3/global';
  const response = await fetchData(url);
  return response.body;
}
