'use client';
// export const Charts = () => {
//   return <div className="w-full h-[50%] border-blue-400 border-2">
//     charts</div>;
// };
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

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
};

export const prices = require('../../data/prices.json').prices;
export const pricesData = require('../../data/prices.json');

export const labels = prices.map((price) => '1');

console.log('prices', prices, 'pricesdata', pricesData);

export const data = {
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

export function LineChart() {
  return (
    <div className="w-[40%]  border-blue-400 border-2">
      <Line options={options} data={data} />
    </div>
  );
}
