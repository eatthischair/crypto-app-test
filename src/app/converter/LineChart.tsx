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
import { useTheme } from 'next-themes';

export function LineChart({ coin1Prices, coin2Prices, chartTitle }) {
  if (!coin1Prices) return;

  const { theme } = useTheme();
  const lineColor = theme === 'dark' ? '#6b6be5' : '#b5b5fd';
  const fillColor = theme === 'dark' ? '#1e1e3f' : '#e4e4ff';

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
      gradient.addColorStop(0, fillColor);
      gradient.addColorStop(1, lineColor);
    }
    return gradient;
  }

  const labels = coin1Prices.prices.map((item) => null);

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: coin1Prices.prices,
        borderColor: lineColor,
        backgroundColor: fillColor, // Color for the fill
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
          below: 'red',
        },
      },
    ],
  };

  const options = {
    elements: {
      line: {
        tension: 0.5,
      },
      point: {
        radius: 0,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    y: {
      ticks: {
        display: false,
      },
      grid: {
        display: false,
      },
    },

    layout: {
      autoPadding: false,
      padding: -4,
    },
    maintainAspectRatio: false,

    scales: {
      y: {
        display: false,
        gridLines: {
          display: false,
        },
        min: Math.min(...coin1Prices.prices),
        max: Math.max(...coin1Prices.prices),
      },
      x: {
        gridLines: {
          display: false,
        },
      },
    },
  };

  return (
    <div className=" rounded-md w-full max-h-[300px] mb-36 mt-12 dark:bg-[#191934]">
      <div>{chartTitle}</div>
      <Line options={options} data={data} height={200} width={2200} />
    </div>
  );
}
