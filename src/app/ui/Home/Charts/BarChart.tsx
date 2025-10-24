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
  const lineColor =
    theme === 'dark' ? 'rgba(107, 107, 229, 0.5)' : 'rgba(181, 181, 253, 1)';
  const fillColor =
    theme === 'dark' ? 'rgba(172, 102, 226, 0.5)' : 'rgba(169, 99, 225, 1)';
  const dataset2FillColor = theme === 'dark' ? '#6b6ae4' : '#8585ff';

  let width1, height1, gradient1;
  let width2, height2, gradient2;

  function getGradient(ctx, chartArea, isCompareChart) {
    let width = isCompareChart ? width2 : width1;
    let height = isCompareChart ? height2 : height1;
    let gradient = isCompareChart ? gradient2 : gradient1;

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

      if (isCompareChart) {
        gradient.addColorStop(0, 'rgba(99, 133, 211, 1)'); // Similar to dataset2FillColor with opacity
        gradient.addColorStop(1, 'rgba(99, 133, 211, 1 )'); // Lighter shade
      } else {
        gradient.addColorStop(0, fillColor);
        gradient.addColorStop(1, lineColor);
      }

      // Update the correct variables
      if (isCompareChart) {
        width2 = width;
        height2 = height;
        gradient2 = gradient;
      } else {
        width1 = width;
        height1 = height;
        gradient1 = gradient;
      }
    }
    return gradient;
  }

  const data = {
    labels,
    datasets: [
      ...(secondChartData?.total_volumes
        ? [
            {
              label: '24h Volume',
              data: secondChartDayVolume,
              borderColor: '#ffffff',
              backgroundColor: function (context) {
                const chart = context.chart;
                const { ctx, chartArea } = chart;
                if (!chartArea) return dataset2FillColor;
                return getGradient(ctx, chartArea, true);
              },
              // yAxisID: 'y2',
              fill: true,
              barThickness: 0.5,
              categoryPercentage: 0.8,
            },
          ]
        : []),
      {
        label: '24h Volume',
        data: dayVolume,
        borderColor: 'red',
        backgroundColor: function (context) {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return fillColor;
          return getGradient(ctx, chartArea, false);
        },
        barThickness: 0.1,
        categoryPercentage: 0.2,
        // yAxisID: 'y1',
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
        position: 'left',
        display: false,
      },
      y2: {
        type: 'linear',
        position: 'right',
        display: false,
      },
      y: {
        stacked: true,
        suggestedMin: secondChartData
          ? Math.min(...secondChartDayVolume, ...dayVolume)
          : Math.min(...dayVolume),
        suggestedMax: secondChartData
          ? Math.max(...secondChartDayVolume, ...dayVolume)
          : Math.max(...dayVolume),
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
        stacked: true,
        min: 0,
        // max: 500,
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
    <div className="dark:bg-[#1e1934] bg-white rounded-md border border-white dark:border-[#131327] px-2">
      <div className="absolute m-4 text-foreground ">
        <h4 className="sm:text-sm">Volume 24h</h4>
        <h2 className=" text-sm sm:text-4xl font-bold">{latestVolume}</h2>
        <div className="text-sm">{formattedDate}</div>
      </div>
      <div className="pt-6 mt-8">
        <Bar options={options} data={data} height={400} width={800} />
      </div>
      <div className="flex justify-between items-center text-xs px-1 text-gray-500">
        <span>{new Date().toLocaleString()}</span>
      </div>
    </div>
  );
}
