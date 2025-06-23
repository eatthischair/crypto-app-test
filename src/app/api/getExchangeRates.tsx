'use server';
import { fetchData } from './fetchData';

export async function getExchangeRates() {
  const url = 'https://api.coingecko.com/api/v3/exchange_rates';
  const response = await fetchData(url);
  console.log('exhcangerates', response.body);
  return response.body;
}
