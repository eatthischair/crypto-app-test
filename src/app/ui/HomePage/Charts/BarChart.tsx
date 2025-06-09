'use client';
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { convert } from '../../HeaderComponents/NavBar/convert';
import { useSelector } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import { formatNum } from '@/lib/utils';
import { LoadingSpinner } from '@/components/ui/loadingSpinner';
import Skeleton from 'react-loading-skeleton';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export function BarChart({ pricesData }) {
  const currency = useSelector((state) => state.currencyReducer.currency);
  const exchangeRates = useSelector(
    (state) => state.exchangeRatesReducer.exchangeRates
  );

  if (
    !currency ||
    !exchangeRates ||
    !exchangeRates.rates ||
    !exchangeRates.rates[currency] ||
    !exchangeRates.rates.usd
  ) {
    return <Skeleton />;
  }
  const exchangeRateObj = exchangeRates?.rates?.[currency];

  const volume = pricesData.total_volumes;
  const dayVolume = volume.map((item) => item[1]);
  const labels = volume.map((item) => new Date(item[0]).getDate());

  const { currentPrice, unit } = convert(
    volume[volume.length - 1][1],
    exchangeRateObj,
    exchangeRates.rates.usd
  );

  const latestVolume = `${unit} ${formatNum(currentPrice)}`;

  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: dayVolume,
        backgroundColor: 'blue',
        color: 'white',
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
        beginAtZero: true,
        suggestedMin: Math.min(volume),
        suggestedMax: Math.max(volume),
        ticks: {
          stepSize: 5,
          display: false,
        },
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
      },
      x: {
        min: 0,
        max: 30,
        ticks: {
          display: true,
          stepSize: 5000,
        },
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="w-[40%]">
      <div className="absolute m-4 text-foreground p-4">
        <h4 className="text-sm">Volume 24h</h4>
        <h2 className="text-4xl font-bold">{latestVolume}</h2>
        <div className="text-sm">Apr 01 2025</div>
      </div>
      <Bar options={options} data={data} height={500} width={800} />
    </div>
  );
}
