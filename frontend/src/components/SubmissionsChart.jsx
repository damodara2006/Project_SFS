import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SubmissionsChart = () => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Submissions',
        data: [65, 59, 80, 81, 56, 55],
        backgroundColor: 'rgba(255, 153, 0, 0.6)', // Primary accent with opacity
        borderColor: 'rgba(255, 153, 0, 1)',
        borderWidth: 1,
        borderRadius: 8,
        barThickness: 20,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // We don't need the legend for a single dataset
      },
      title: {
        display: true,
        text: 'Monthly Submissions Overview',
        font: {
          size: 18,
          weight: '600',
        },
        color: '#1A202C',
        padding: {
          bottom: 20,
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: '#E2E8F0', // Use our border color for grid lines
          borderDash: [5, 5], // Dashed grid lines
        },
        ticks: {
          color: '#718096', // Secondary text color for labels
        },
      },
      x: {
        grid: {
          display: false, // Hide vertical grid lines
        },
        ticks: {
          color: '#718096',
        },
      },
    },
  };

  return (
    <div className="bg-background-white p-6 rounded-2xl shadow-card h-[400px]">
      <Bar data={data} options={options} />
    </div>
  );
};

export default SubmissionsChart;