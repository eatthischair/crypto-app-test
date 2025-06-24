'use server';

export const fetchData = async (url) => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      // 'x-cg-demo-api-key': process.env.REACT_APP_COINGECKO_API_KEY,
      'x-cg-demo-api-key': CG - tLCRhygcvpcYho3BrWGp8J7m,
    },
    // cache: 'force-cache',
    next: { revalidate: 3600 },
  };

  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error('Failed to connect to CoinGecko API');
  }
  const body = await response.json();

  return { status: response.status, body };
};
