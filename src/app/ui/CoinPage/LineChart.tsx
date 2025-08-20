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

export function LineChart({ prices }) {
  const labels = prices.map(() => null);

  const priceIsUp = prices[0][1] < prices[prices.length - 1][1];
  const lineColor = priceIsUp ? 'green' : 'red';

  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: prices,
        // borderColor: 'rgb(255, 99, 132)',
        borderColor: lineColor,

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
    <div className="w-screen min-w-screen p-0 sm:-ml-12 mb-24">
      <Line options={options} data={data} height={200} width={1000} />
    </div>
  );
}
