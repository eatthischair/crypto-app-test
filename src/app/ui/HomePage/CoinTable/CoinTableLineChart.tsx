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

export function CoinTableLineChart({ coin, fillColor }) {
  const sevenDayArr = coin.sparkline_in_7d.price;
  const priceGoingUp = sevenDayArr[sevenDayArr.length - 1] >= sevenDayArr[0];
  const labels = sevenDayArr.map((item) => new Date(item[0]));
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
        suggestedMax: sevenDayArr.length,
        grid: {
          display: false,
        },
        gridLines: {
          display: false, // Disable grid lines (including bottom border) for X-axis
          drawBorder: false, // Specifically removes the axis line (bottom border)
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
        pointRadius: 0,
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: sevenDayArr,
        // borderColor: priceGoingUp ? 'green' : 'red',
        borderColor: fillColor,
        backgroundColor: fillColor,
        fill: {
          target: 'origin',
          // above: 'rgb(28, 26, 59)', // Area will be red above the origin
          above: fillColor,
          below: 'red',
        },
      },
    ],
  };
  return (
    <div className="flex h-full items-center sm:p-0 mt-2">
      <Line options={options} data={data} height={50} width={100} />
    </div>
  );
}
