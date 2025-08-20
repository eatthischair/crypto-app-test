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
  const fillColor = theme === 'dark' ? '#191934' : 'rgb(206,206,254)';
  const lineColor = theme === 'dark' ? '#4e4ea8' : '#8989fe';

  const labels = coin1Prices.prices.map((item) => null);

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: coin1Prices.prices,
        borderColor: 'blue',
        backgroundColor: fillColor, // Color for the fill
        fill: {
          target: 'origin',
          above: lineColor, // Area will be red above the origin
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
    <div className=" rounded-md w-full h-[40vh] mb-36 mt-12 dark:bg-[#191934]">
      <div>{chartTitle}</div>
      <Line options={options} data={data} height={200} width={2200} />
    </div>
  );
}
