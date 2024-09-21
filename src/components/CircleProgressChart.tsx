import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend);

interface CircularProgressChartProps {
  value: number;
  maxValue: number;
  color: string;
  label: string;
  amount: number;
}

const CircularProgressChart = ({
  value,
  maxValue,
  color,
  label,
  amount,
}: CircularProgressChartProps) => {
  const data = {
    datasets: [
      {
        data: [value, maxValue - value],
        backgroundColor: [color, '#e5e7eb'], // primary color and light gray for the remaining part
        cutout: '70%',
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%', // hollow center for the circle
  };

  return (
    <div className="flex flex-col items-center">
      {/* Chart */}
      <div className="w-24 h-24">
        <Doughnut data={data} options={options} />
      </div>

      {/* Amount and Label */}
      <p className="text-xl font-semibold mt-2">${amount}</p>
      <p className="text-sm text-gray-500">{label}</p>
    </div>
  );
};

export default CircularProgressChart;
