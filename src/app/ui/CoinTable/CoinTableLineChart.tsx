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
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const prices = require('../../data/prices.json').prices.slice(-30);
export const labels = prices.map((item) => new Date(item[0]).getDate());

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
      display: false,
    },
    decimation: {
      enabled: true,
      algorithm: 'min-max',
    },
  },
  scales: {
    y: {
      display: false,
      grid: {
        display: false,
      },
      suggestedMin: Math.min(),
    },
    x: {
      min: 0,
      max: 30,
      grid: {
        display: false,
      },
      ticks: {
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

export function CoinTableLineChart({ coin }) {
  const sevenDayArr = coin.sparkline_in_7d.price;
  const priceGoingUp = sevenDayArr[sevenDayArr.length - 1] > sevenDayArr[0];
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        display: false,
      },
      decimation: {
        enabled: true,
        algorithm: 'min-max',
      },
    },
    scales: {
      y: {
        display: false,
        grid: {
          display: false,
        },
        suggestedMin: Math.min(sevenDayArr),
        suggestedMax: Math.max(sevenDayArr),
      },
      x: {
        min: 0,
        max: 30,
        grid: {
          display: false,
        },
        ticks: {
          display: false,
        },
      },
    },
    elements: {
      line: {
        tension: 1,
      },
      point: {
        pointRadius: 1,
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: sevenDayArr,
        borderColor: priceGoingUp ? 'green' : 'red',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };
  return (
    <div>
      <Line options={options} data={data} height={50} width={100} />
    </div>
  );
}
