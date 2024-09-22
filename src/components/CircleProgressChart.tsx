import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend);

interface CircularProgressChartProps {
  value: number;
  maxValue: number;
  color: string;
  overBudgetColor?: string;
  label: string;
  amount: number;
}

const CircularProgressChart = ({
  value,
  maxValue,
  color,
  overBudgetColor = '#EF4444', 
  label,
  amount,
}: CircularProgressChartProps) => {
  const isOverBudget = value > maxValue;
  const overBudgetValue = isOverBudget ? value - maxValue : 0; 

  const data = {
    datasets: [
      {
        data: isOverBudget
          ? [maxValue, overBudgetValue]
          : [value, maxValue - value],
        backgroundColor: isOverBudget
          ? [color, overBudgetColor] 
          : [color, '#e5e7eb'], 
        cutout: '70%',
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%',
  };

  return (
    <div className="flex flex-col items-center">

      <div className="w-24 h-24">
        <Doughnut data={data} options={options} />
      </div>

      
      <p className={`text-xl font-semibold mt-2 ${isOverBudget ? 'text-red-600' : ''}`}>
      ₱{amount} {isOverBudget && '(Over)'}
      </p>
      <p className="text-sm text-gray-500">{label}</p>
    </div>
  );
};

export default CircularProgressChart;
