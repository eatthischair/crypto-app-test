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

export function LineChart({ pricesData }) {
  const prices = pricesData?.prices;
  const labels = prices?.map((item) => new Date(item[0]).getDate());

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
        suggestedMin: Math.min(prices),
        suggestedMax: Math.max(prices),
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
    <div className="w-[40%] ">
      <div className="absolute m-4 text-foreground p-4">
        <h4 className="text-sm">Bitcoin</h4>
        <h2 className="text-4xl font-bold">$85,029.51</h2>
        <div className="text-sm">Apr 01 2025</div>
      </div>
      <Line options={options} data={data} height={500} width={800} />
    </div>
  );
}
