'use client';
import React from 'react';
import { Colors } from 'chart.js/auto';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js/auto';
import { convert } from '../../Header/NavBar/convert';
import { useSelector } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import { formatNum } from '@/lib/utils';
import { LoadingSpinner } from '@/components/ui/loadingSpinner';
import Skeleton from 'react-loading-skeleton';
import { useTheme } from 'next-themes';
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
  const labels = volume?.map((item) => new Date(item[0]));

  const { currentPrice, unit } = convert(
    volume[volume.length - 1][1],
    exchangeRateObj,
    exchangeRates.rates.usd
  );

  const latestVolume = `${unit} ${formatNum(currentPrice)}`;

  const { theme } = useTheme();
  const lineColor = theme === 'dark' ? '#6b6be5' : '#b5b5fd';
  const fillColor = theme === 'dark' ? '#ac66e2' : '#a963e1';
  const dataset2FillColor = theme === 'dark' ? '#6b6ae4' : '#8585ff';

  let width, height, gradient;

  function getGradient(ctx, chartArea) {
    const chartWidth = chartArea.right - chartArea.left;
    const chartHeight = chartArea.bottom - chartArea.top;
    if (!gradient || width !== chartWidth || height !== chartHeight) {
      width = chartWidth;
      height = chartHeight;
      gradient = ctx.createLinearGradient(
        0,
        chartArea.bottom,
        0,
        chartArea.top
      );
      gradient.addColorStop(0, fillColor);
      gradient.addColorStop(1, lineColor);
    }
    return gradient;
  }

  const data = {
    labels,
    datasets: [
      {
        label: '24h Volume',
        data: dayVolume,
        borderColor: 'red',
        // backgroundColor: '#543374',
        backgroundColor: fillColor,
      },
      {
        label: '24h Volume',
        data: secondChartDayVolume,
        // borderColor: 'rgb(66, 99, 132)',
        borderColor: '#ffffff',
        backgroundColor: dataset2FillColor,
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
        forceOverride: false,
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
          display: false,
          stepSize: 5,
        },
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="dark:bg-[#1e1934] bg-white rounded-md border border-white dark:border-[#131327]">
      <div className="absolute m-4 text-foreground ">
        <h4 className="sm:text-sm">Volume 24h</h4>
        <h2 className=" text-sm sm:text-4xl font-bold">{latestVolume}</h2>
        <div className="text-sm">{formattedDate}</div>
      </div>
      <div className=" pt-8 mt-8">
        <Bar options={options} data={data} height={500} width={800} />
      </div>
      <div className="flex justify-between items-center text-xs px-1 text-gray-500 dark">
        <span>{new Date().toLocaleString()}</span>
      </div>
    </div>
  );
}
