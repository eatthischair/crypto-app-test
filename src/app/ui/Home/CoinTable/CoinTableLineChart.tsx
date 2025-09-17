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
import { useTheme } from 'next-themes';
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

export function CoinTableLineChart({ coin, fillColor, gradientColor }) {
  const sevenDayArr = coin.sparkline_in_7d.price;
  const priceGoingUp = sevenDayArr[sevenDayArr.length - 1] >= sevenDayArr[0];
  const labels = sevenDayArr.map((item) => new Date(item[0]));

  let width, height, gradient;
  function getGradient(ctx, chartArea) {
    const chartWidth = chartArea.right - chartArea.left;
    const chartHeight = chartArea.bottom - chartArea.top;
    if (!gradient || width !== chartWidth || height !== chartHeight) {
      // Create the gradient because this is either the first render
      // or the size of the chart has changed
      width = chartWidth;
      height = chartHeight;
      gradient = ctx.createLinearGradient(
        0,
        chartArea.bottom,
        0,
        chartArea.top
      );
      gradient.addColorStop(0, gradientColor);
      gradient.addColorStop(0.5, fillColor);
    }
    return gradient;
  }

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
        tension: 0.2,
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
        // borderColor: priceGoingUp ? 'green' : 'red',
        // borderColor: fillColor,
        borderColor: function (context) {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          if (!chartArea) {
            return;
          }
          return getGradient(ctx, chartArea);
        },

        backgroundColor: fillColor,
        fill: {
          target: 'origin',
          above: function (context) {
            const chart = context.chart;
            const { ctx, chartArea } = chart;

            if (!chartArea) {
              return;
            }
            return getGradient(ctx, chartArea);
          },
        },
      },
    ],
  };
  return (
    <>
      <div className="hidden sm:flex sm:w-full sm:h-full items-end">
        <Line options={options} data={data} height={25} width={100} />
      </div>
      <div className="flex sm:hidden h-24 w-full items-end ">
        <Line options={options} data={data} height={40} width={60} />
      </div>
    </>
  );
}
