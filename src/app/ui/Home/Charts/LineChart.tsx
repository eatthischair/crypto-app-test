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
import { convert } from '../../Header/NavBar/convert';
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
  let prices = pricesData?.prices;
  const prices2 = secondChartData?.prices;

  const priceValues = useMemo(() => prices.map((item) => item[1]), [prices]);
  const labels = useMemo(
    () => prices?.map((item) => new Date(item[0])),
    [prices]
  );

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
  const lineColor = theme === 'dark' ? '#6b6be5' : '#b5b5fd';
  const fillColor = theme === 'dark' ? '#1e1e3f' : '#e4e4ff';

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
      // gradient.addColorStop(0, lineColor);
      // gradient.addColorStop(1, fillColor);
      if (isCompareChart) {
        gradient.addColorStop(0, 'rgba(216, 151, 255, 0.3)'); // Purple at bottom with 50% opacity
        gradient.addColorStop(1, 'rgba(245, 212, 255, 0.3)'); // Light purple at top with 50% opacity
      } else {
        gradient.addColorStop(0, lineColor);
        gradient.addColorStop(1, fillColor);
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
      ...(secondChartData?.prices
        ? [
            {
              label: 'Price',
              data: secondChartData.prices,
              borderColor: '#d897ff',
              backgroundColor: 'rgba(19, 19, 19 , .01)',
              yAxisID: 'y2',
              fill: {
                target: 'origin',
                above: function (context) {
                  const chart = context.chart;
                  const { ctx, chartArea } = chart;
                  if (!chartArea) return;
                  return getGradient(ctx, chartArea, true);
                },
              },
            },
          ]
        : []),
      {
        label: 'Price',
        data: prices,
        borderColor: lineColor,
        backgroundColor: 'rgba(19, 19, 39, .01)',
        fill: {
          target: 'origin',
          above: function (context) {
            const chart = context.chart;
            const { ctx, chartArea } = chart;

            if (!chartArea) {
              return;
            }
            return getGradient(ctx, chartArea, false);
          },
        },
        yAxisID: 'y1',
      },
    ],
  };

  const options = {
    spanGaps: true, // enable for all datasets

    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        display: false,
      },
    },
    // animation: false,
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
        tension: 0.1,
      },
      point: {
        pointRadius: 0,
      },
    },
  };

  return (
    <div className="dark:bg-[#131327] bg-white rounded-md border border-white dark:border-[#131327] px-2">
      <div className="absolute m-4 text-foreground">
        <h4 className=" sm:text-sm">
          {coinName.charAt(0).toUpperCase() + coinName.slice(1)}
        </h4>
        <h2 className=" text-sm sm:text-4xl font-bold">{latestPrice}</h2>
        <div className="text-sm">{formattedDate}</div>
      </div>
      <div className=" pt-6 mt-8">
        <Line options={options} data={data} height={400} width={800} />
      </div>
      <div className="flex justify-between items-center text-xs px-1 text-gray-500">
        <span>{new Date().toLocaleString()}</span>
      </div>
    </div>
  );
}
