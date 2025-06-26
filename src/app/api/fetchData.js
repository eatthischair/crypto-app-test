'use server';

export const fetchData = async (url) => {
  try {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'x-cg-demo-api-key': 'CG-tLCRhygcvpcYho3BrWGp8J7m',
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
    return { status: response.status, body };
  } catch (error) {
    console.error(`❌ Fetch error for ${url}:`, error);
    return null;
  }
};
