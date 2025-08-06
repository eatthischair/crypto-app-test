'use client';
import React from 'react';
import { Colors } from 'chart.js';

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
  Legend,
  Colors
);

export function BarChart({ pricesData, formattedDate, secondChartData }) {
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
    return <Skeleton />;
  }
  const exchangeRateObj = exchangeRates?.rates?.[currency];

  const volume = pricesData?.total_volumes;
  const secondChartVolume = secondChartData?.total_volumes;

  //strip unix timestamps
  const secondChartDayVolume = secondChartVolume?.map((item) => item[1]);
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
      {
        label: 'Dataset 2',
        data: secondChartDayVolume,
        borderColor: 'rgb(66, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        yAxisID: 'y2',
        fill: true,
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
      colors: {
        forceOverride: true,
      },
    },
    scales: {
      y1: {
        type: 'linear',
        position: 'left', // Left Y-axis for Dataset 1
        display: false, // Hide the entire Y-axis (labels, ticks, grid)
      },
      y2: {
        type: 'linear',
        position: 'right', // Right Y-axis for Dataset 2
        display: false, // Hide the entire Y-axis (labels, ticks, grid)
      },
      y: {
        beginAtZero: true,
        suggestedMin: Math.min(volume),
        suggestedMax: Math.max(volume),
        ticks: {
          // stepSize: 500,
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
        // max: 30,
        ticks: {
          display: false,
          stepSize: 5000,
        },
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="w-full sm:w-[90%]">
      <div className="absolute m-4 text-foreground p-4">
        <h4 className="text-xs sm:text-sm">Volume 24h</h4>
        <h2 className=" text-sm sm:text-4xl font-bold">{latestVolume}</h2>
        <div className="text-sm">{formattedDate}</div>
      </div>
      <Bar options={options} data={data} height={500} width={800} />
    </div>
  );
}
