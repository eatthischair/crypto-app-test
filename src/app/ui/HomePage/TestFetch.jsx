'use client';
import { useEffect } from 'react';

export default function TestFetch() {
  useEffect(() => {
    fetch('https://api.coingecko.com/api/v3/ping', {
      headers: {
        accept: 'application/json',
        'x-cg-demo-api-key': 'CG-tLCRhygcvpcYho3BrWGp8J7m',
        'User-Agent': 'Mozilla/5.0',
      },
    })
      .then((res) => res.json())
      .then(console.log)
      .catch(console.error);
  }, []);

  return <p>Check console for API response</p>;
}
