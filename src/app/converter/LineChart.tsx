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

export function LineChart({ coin1Prices, coin2Prices, chartTitle }) {
  if (!coin1Prices) return;

  console.log('coin1prices', coin1Prices);
  const labels = coin1Prices.prices.map((item) => null);

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: coin1Prices.prices,
        borderColor: 'blue',
        backgroundColor: 'green', // Color for the fill
        fill: {
          target: 'origin',
          above: '#1c1a3b', // Area will be red above the origin
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
        radius: 1,
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
    <div className="border w-full h-[40vh]">
      <div>{chartTitle}</div>
      <Line options={options} data={data} height={200} width={2200} />
    </div>
  );
}
