'use server';
import { fetchData } from './fetchData';

export async function getSearchResults(searchTerm) {
  const url = `https://api.coingecko.com/api/v3/search?query=${searchTerm}`;
  const response = await fetchData(url);
  return response.body;
}
