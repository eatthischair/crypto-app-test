export const dynamic = 'force-static';

// export async function GetChartData(coin) {
//   try {
//     const res = await fetch(
//       `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=180&interval=daily`,
//       { next: { revalidate: 3600 } }
//     );
//     if (!res.ok) {
//       throw new Error(`HTTP error! status: ${res.status}`);
//     }

//     const data = await res.json();
//     return data;
//   } catch (error) {
//     // eslint-disable-next-line no-console
//     console.error('Database Error:', error);
//   }
// }

export async function getCoinTableData(page) {
  try {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=${page}&sparkline=true&price_change_percentage=1h%2C24h%2C7d`,
      { next: { revalidate: 3600 } }
    );

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching data:', error.message);
  }
}

export async function getCoinsList() {
  try {
    const res = await fetch('https://api.coingecko.com/api/v3/coins/list', {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching data:', error.message);
  }
}
export const fetcher = (...args) => fetch(...args).then((res) => res.json());
