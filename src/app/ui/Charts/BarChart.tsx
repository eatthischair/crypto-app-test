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
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

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

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
    },
  },
};

export function BarChart() {
  return (
    <div className="w-[40%]  border-blue-400 border-2">
      <Bar options={options} data={data} />
    </div>
  );
}
