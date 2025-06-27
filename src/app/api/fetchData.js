'use server';

export const fetchData = async (url) => {
  const apiKey = process.env.COINGECKO_API_KEY;

  console.log('Server action running', apiKey);

  try {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'x-cg-demo-api-key': apiKey,
        'User-Agent': 'Mozilla/5.0 (Vercel)',
      },
      next: { revalidate: 3600 },
    };

    const response = await fetch(url, options);

    if (!response.ok) {
      console.error(
        `❌ Fetch failed: ${response.status} ${response.statusText} for ${url}`
      );
      return null;
    }

    const body = await response.json();
    // console.log('BODY', body);
    return { status: response.status, body };
  } catch (error) {
    console.error(`❌ Fetch error for ${url}:`, error);
    return null;
  }
};
