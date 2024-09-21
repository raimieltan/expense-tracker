// components/AmountTransferSection.tsx

import CircularProgressChart from "./CircleProgressChart";


const BudgetTracker = () => {
  const transfers = [
    {
      value: 1200,
      maxValue: 5000,
      color: '#60A5FA', // blue
      label: 'Transfer via Card',
      amount: 1200,
    },
    {
      value: 4500,
      maxValue: 5000,
      color: '#3B82F6', // darker blue
      label: 'Transfer to Same Bank',
      amount: 4500,
    },
    {
      value: 3200,
      maxValue: 5000,
      color: '#34D399', // green
      label: 'Transfer via Wallet',
      amount: 3200,
    },
    {
      value: 1150,
      maxValue: 5000,
      color: '#A78BFA', // purple
      label: 'Transfer to Other Bank',
      amount: 1150,
    },
  ];

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Budget</h2>
      <div className="grid grid-cols-4 gap-6">
        {transfers.map((transfer, index) => (
          <CircularProgressChart
            key={index}
            value={transfer.value}
            maxValue={transfer.maxValue}
            color={transfer.color}
            label={transfer.label}
            amount={transfer.amount}
          />
        ))}
      </div>
    </div>
  );
};

export default BudgetTracker;
