'use client';

import { Line } from 'react-chartjs-2';
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function AnalyticsChart() {
  const data = {
    labels: ['09-01', '09-02', '09-04', '09-06', '09-08', '09-10', '09-12', '09-14', '09-16', '09-18', '09-20', '09-22', '09-24', '09-26', '09-28'],
    datasets: [
      {
        label: 'Engagement',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        pointRadius: 3,
        pointHoverRadius: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        max: 3,
        ticks: {
          stepSize: 1,
        },
        grid: {
          color: '#f1f5f9',
        },
        border: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-lg border p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Overview</h3>
      </div>
      <div className="h-64">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}
