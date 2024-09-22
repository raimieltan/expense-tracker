import { useEffect, useState } from 'react';
import CircularProgressChart from './CircleProgressChart';
import Modal from './Modal';

interface Budget {
  id: number;
  title: string;
  amount: number;
  totalExpenseAmount: number; // Include total expenses for each budget
}

interface BudgetTrackerProps {
  budgets: Budget[];
  fetchBudgets: () => void
}

const BudgetTracker = ({ budgets, fetchBudgets }: BudgetTrackerProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newBudgetTitle, setNewBudgetTitle] = useState('');
  const [newBudgetAmount, setNewBudgetAmount] = useState(0);


  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleAddBudget = async (e: React.FormEvent) => {
    e.preventDefault();

    // Create a new budget object to be sent to the API
    const newBudget = {
      title: newBudgetTitle,
      amount: newBudgetAmount,
    };

    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('User not authenticated. Please log in.');


      const response = await fetch('http://localhost:3000/api/budgets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newBudget),
      });

      if (!response.ok) {
        throw new Error('Failed to add budget');
      }


      fetchBudgets()
      setNewBudgetTitle('');
      setNewBudgetAmount(0);
      handleCloseModal();
    } catch (error) {
      console.error('Error adding budget:', error);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <h2 className="text-lg font-semibold mb-4">Add New Budget</h2>
        <form onSubmit={handleAddBudget}>
          <div className="mb-4">
            <label htmlFor="newBudgetTitle" className="block text-sm font-medium text-gray-700">Budget Title</label>
            <input
              id="newBudgetTitle"
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              value={newBudgetTitle}
              onChange={(e) => setNewBudgetTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="newBudgetAmount" className="block text-sm font-medium text-gray-700">Budget Amount</label>
            <input
              id="newBudgetAmount"
              type="number"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              value={newBudgetAmount}
              onChange={(e) => setNewBudgetAmount(Number(e.target.value))}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
          >
            Add Budget
          </button>
        </form>
      </Modal>
      <div className="flex justify-end mb-4 mt-2">
        <button
          onClick={handleOpenModal}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
        >
          Add Budget
        </button>
      </div>
      <h2 className="text-lg font-semibold mb-4">Budget Overview</h2>

      <div className="grid grid-cols-4 gap-6">
        {budgets.map((budget) => {

          return (
            <CircularProgressChart
              key={budget.id}
              value={budget.totalExpenseAmount}
              maxValue={budget.amount}
              color="#60A5FA"
              overBudgetColor="#EF4444"
              label={budget.title}
              amount={budget.totalExpenseAmount}
            />
          );
        })}
      </div>
    </div>
  );
};

export default BudgetTracker;
