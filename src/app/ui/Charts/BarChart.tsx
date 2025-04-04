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
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const volume = require('../../data/prices.json').total_volumes;
export const pricesData = require('../../data/prices.json');

export const dayVolume = volume.slice(-30).map((item) => item[1]);
export const labels = volume.map((item) => new Date(item[0]).getDate());

export const data = {
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
export const options = {
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
      max: 600000000000,
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

export function BarChart() {
  return (
    <div className="w-[40%] ">
      <div className="absolute m-4 text-foreground p-4">
        <h4 className="text-sm">Volume 24h</h4>
        <h2 className="text-4xl font-bold">$26.121B</h2>
        <div className="text-sm">Apr 01 2025</div>
      </div>
      <Bar options={options} data={data} height={500} width={800} />
    </div>
  );
}
