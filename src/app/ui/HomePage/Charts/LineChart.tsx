'use client';
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { convert } from '../../HeaderComponents/NavBar/convert';
import { Line } from 'react-chartjs-2';
import { formatNum } from '@/lib/utils';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
export function LineChart({ pricesData, formattedDate }) {
  const prices = pricesData?.prices;
  const priceValues = prices.map((item) => item[1]);
  const labels = prices?.map((item) => new Date(item[0]).getDate());

  const currency = useSelector((state: any) => state.currencyReducer.currency);
  const exchangeRates = useSelector(
    (state: any) => state.exchangeRatesReducer.exchangeRates
  );

  if (
    !currency ||
    !exchangeRates ||
    !exchangeRates.rates ||
    !exchangeRates.rates[currency] ||
    !exchangeRates.rates.usd
  ) {
    return <div>Loading...</div>;
  }

  const exchangeRateObj = exchangeRates?.rates?.[currency];

  const { currentPrice, unit } = convert(
    prices[prices.length - 1][1],
    exchangeRateObj,
    exchangeRates.rates.usd
  );

  const latestPrice = `${unit} ${formatNum(currentPrice)}`;

  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: prices,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        display: false,
      },
    },
    scales: {
      y: {
        display: false,
        grid: {
          display: false,
        },
        suggestedMin: Math.min(...priceValues),
        suggestedMax: Math.max(...priceValues),
      },
      x: {
        min: 0,
        max: 30,
        grid: {
          display: false,
        },
      },
    },
    elements: {
      line: {
        tension: 0.1,
      },
      point: {
        pointRadius: 1,
      },
    },
  };

  return (
    <div className="w-full sm:w-[90%]">
      <div className="absolute m-4 text-foreground p-4">
        <h4 className="text-xs sm:text-sm">Bitcoin</h4>
        <h2 className=" text-sm sm:text-4xl font-bold">{latestPrice}</h2>
        <div className="text-sm">{formattedDate}</div>
      </div>
      <Line options={options} data={data} height={500} width={800} />
    </div>
  );
}
