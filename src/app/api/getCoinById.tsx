'use server';
import { fetchData } from './fetchData';

export async function getCoinById(id) {
  const url = `https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&community_data=false&developer_data=false`;

  const response = await fetchData(url);
  return response.body;
}
