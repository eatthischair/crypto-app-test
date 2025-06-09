'use client';
import { useEffect, useState } from 'react';
import { AddCoinButton } from '@/app/ui/PortfolioPage/AddCoinButton';
import { CoinCard } from '@/app/ui/PortfolioPage/CoinCard';

export default function Page2({ coinsList }) {
  const [coins, setCoins] = useState([]);
  const [coinsData, setCoinsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const coins = JSON.parse(localStorage.getItem('coins')) || [];
      const coinNames = coins.map((coin) => coin.coinName);

      const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinNames}&per_page=${coinNames.length}&page=1&sparkline=false&price_change_percentage=24h`;
      try {
        const coinData = await fetch(url);
        const coinResponse = await coinData.json();

        const combinedData = coins.map((data) => {
          //find current price, price change 24h
          //then compute price change and amount value
          const coinInfo = coinResponse.find(
            (coin) => coin.id === data.coinName
          );
          const currentPriceToday = coinInfo.current_price;
          const priceChangeToday = coinInfo.price_change_percentage_24h;
          data.currentPriceToday = currentPriceToday;
          data.priceChangeToday = priceChangeToday;
          return {
            ...data,
          };
        });
        setCoinsData(combinedData);
      } catch (error) {
        console.error('Error fetching data: in getData', error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div>
        <AddCoinButton
          coins={coins}
          setCoins={setCoins}
          coinsList={coinsList}
        />
      </div>
      <div className="w-full pt-16">
        {coinsData
          ? coinsData.map((coin, index) => {
              return (
                <CoinCard
                  key={coin.coinName}
                  coin={coin}
                  data={coinsData[index]}
                />
              );
            })
          : ''}
      </div>
    </>
  );
}
