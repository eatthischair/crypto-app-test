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
} from 'chart.js/auto';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { convert } from '../../HeaderComponents/NavBar/convert';
import { Line } from 'react-chartjs-2';
import { formatNum } from '@/lib/utils';
import { useTheme } from 'next-themes';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
export function LineChart({
  pricesData,
  formattedDate,
  coinName,
  secondChartData,
}) {
  const prices = pricesData?.prices;
  const prices2 = secondChartData?.prices;

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

  const { theme } = useTheme();
  const fillColor = theme === 'dark' ? '#25254e' : 'rgb(206,206,254)';
  const lineColor = theme === 'dark' ? '#4e4ea8' : '#8989fe';

  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: prices,
        // borderColor: '#4e4ea8',
        borderColor: lineColor,
        backgroundColor: 'rgba(19, 19, 39, .01)',
        // backgroundColor: bgColor,
        yAxisID: 'y1',
        // fill: {
        //   target: 'origin',
        //   // above: 'rgb(28, 26, 59)', // Area will be red above the origin
        //   above: fillColor,
        //   below: 'red',
        // },
      },
      {
        label: 'Dataset 2',
        data: prices2,
        borderColor: 'rgb(66, 99, 132)',
        backgroundColor: 'rgba(19, 19, 39, .01)',
        yAxisID: 'y2',
        fill: false,
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
        display: false,
        grid: {
          display: false,
        },
        suggestedMin: Math.min(...priceValues),
        suggestedMax: Math.max(...priceValues),
      },
      x: {
        min: 0,
        // max: 30,
        ticks: {
          display: false,
        },
        grid: {
          display: false,
        },
      },
    },
    elements: {
      line: {
        tension: 0.2,
      },
      point: {
        pointRadius: 0,
      },
    },
  };

  return (
    <div className="w-full max-w-[600px] dark:bg-[#131327] rounded-md">
      <div className="absolute m-4 text-foreground p-4">
        <h4 className=" sm:text-sm">
          {coinName.charAt(0).toUpperCase() + coinName.slice(1)}
        </h4>
        <h2 className=" text-sm sm:text-4xl font-bold">{latestPrice}</h2>
        <div className="text-sm">{formattedDate}</div>
      </div>
      <Line options={options} data={data} height={500} width={800} />
    </div>
  );
}
