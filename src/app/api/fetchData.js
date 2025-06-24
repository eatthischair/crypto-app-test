// 'use server';

// export const fetchData = async (url) => {
//   if (process.env.NODE_ENV === 'development') {
//     console.log('API KEY:', process.env.COINGECKO_API_KEY);
//   }

//   const options = {
//     method: 'GET',
//     headers: {
//       accept: 'application/json',
//       'x-cg-demo-api-key': 'CG-tLCRhygcvpcYho3BrWGp8J7m',
//     },
//     next: { revalidate: 3600 },
//   };

//   const response = await fetch(url, options);

//   if (!response.ok) {
//     console.error(`Fetch failed: ${response.status} ${response.statusText}`);
//     return null; // or fallback data
//   }

//   const body = await response.json();
//   console.log('RESPONSE', body);
//   return { status: response.status, body };

//   //   catch (error) {
//   //     console.error('Fetch error:', error);
//   //     return null; // or fallback data
//   //   }
//   // }
// };

// // const body = await response.json();
// // return { status: response.status, body };
// // };
'use server';

export const fetchData = async (url: string) => {
  try {
    if (process.env.NODE_ENV === 'development') {
      console.log('API KEY:', process.env.COINGECKO_API_KEY);
    }

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'x-cg-demo-api-key': 'CG-tLCRhygcvpcYho3BrWGp8J7m', // ✅ hardcoded for now
        'User-Agent': 'Mozilla/5.0 (Vercel)',
      },
      next: { revalidate: 3600 },
    };

    const response = await fetch(url, options);

    if (!response.ok) {
      console.error(
        `❌ Fetch failed: ${response.status} ${response.statusText} for ${url}`
      );
      return null; // fallback or safe return
    }

    const body = await response.json();
    console.log(`✅ Success [${url}]:`, body); // Optional: limit or remove in prod
    return { status: response.status, body };
  } catch (error) {
    console.error(`❌ Fetch error for ${url}:`, error);
    return null;
  }
};
