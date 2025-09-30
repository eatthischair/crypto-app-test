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

export function LineChart({ prices }) {
  const labels = prices.map(() => null);

  const priceIsUp = prices[0][1] < prices[prices.length - 1][1];
  // const lineColor = priceIsUp ? 'green' : 'red';

  const { theme } = useTheme();
  const lineColor = theme === 'dark' ? '#6b6be5' : '#b5b5fd';
  const fillColor = theme === 'dark' ? '#1e1e3f' : '#e4e4ff';

  let width, height, gradient;

  function getGradient(ctx, chartArea, isCompareChart) {
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
      gradient.addColorStop(0, lineColor);
      gradient.addColorStop(1, fillColor);
    }
    return gradient;
  }

  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: prices,
        // borderColor: 'rgb(255, 99, 132)',
        borderColor: lineColor,

        backgroundColor: 'rgba(255, 99, 132, 0.5)',
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
        tension: 0.2,
      },
      point: {
        pointRadius: 1,
      },
    },
  };

  return (
    <div className=" min-w-full min-h-1/3 p-0 pt-8 mb-24">
      <Line options={options} data={data} height={200} width={1000} />
    </div>
  );
}
