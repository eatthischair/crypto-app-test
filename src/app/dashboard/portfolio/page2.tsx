'use client';
import { useEffect, useState } from 'react';
import { AddCoinButton } from '@/app/ui/PortfolioPage/AddCoinButton';
import { CoinCard } from '@/app/ui/PortfolioPage/CoinCard';
import { getPortfolioCoinData } from '@/app/api/getPortfolioCoinData';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function Page2({ coinsList }) {
  const [coinsData, setCoinsData] = useState([]);

  const updateCoins = async () => {
    const coins = JSON.parse(localStorage.getItem('coins')) || [];
    const coinNames = coins.map((coin) => coin.coinName);
    try {
      const coinData = await getPortfolioCoinData(coinNames);
      const coinResponse = await coinData;
      const combinedData = coins.map((data) => {
        //find current price, price change 24h
        //then compute price change and amount value
        const coinInfo = coinResponse.find((coin) => coin.id === data.coinName);
        const currentPriceToday = coinInfo.current_price;
        const priceChangeToday = coinInfo.price_change_percentage_24h;
        data.currentPriceToday = currentPriceToday;
        data.priceChangeToday = priceChangeToday;
        return {
          ...data,
        };
      });
      console.log('combined data', combinedData);
      setCoinsData(combinedData);
    } catch (error) {
      console.error('Error fetching data: in getData', error);
    }
  };

  useEffect(() => {
    updateCoins();
  }, []);

  return (
    <>
      <div className="grid justify-items-end p-4 pt-0">
        <AddCoinButton
          coinsData={coinsData}
          coinsList={coinsList}
          setCoinsData={setCoinsData}
          updateCoins={updateCoins}
        />
      </div>
      <div className="w-full pt-16 mb-12 text-sm sm:text-base">
        {coinsData ? (
          coinsData.map((coin, index) => {
            return (
              <CoinCard
                key={coin.coinName}
                coin={coin}
                data={coinsData[index]}
              />
            );
          })
        ) : (
          <>
            <Skeleton count={5} />
            <Skeleton count={5} />
            <Skeleton count={5} />
          </>
        )}
      </div>
    </>
  );
}
