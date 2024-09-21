'use client';

import { useEffect, useState } from 'react';
import Modal from './Modal';
import Pagination from './Pagination';

interface Expense {
  id: number;
  title: string;
  amount: number;
  date: string;
}

const ExpenseTable = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState<number>(0);
  const [date, setDate] = useState('');
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0); // State for total amount
  const ITEMS_PER_PAGE = 5;

  useEffect(() => {
    fetchExpenses();
  }, [page]);

  const fetchExpenses = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('User not authenticated. Please log in.');
      }

      const res = await fetch(`/api/expenses?page=${page}&limit=${ITEMS_PER_PAGE}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error('Failed to fetch expenses');
      }

      const data = await res.json();
      setExpenses(data.expenses);
      setTotalResults(data.totalExpenses); // totalResults from the API
      setTotalAmount(data.totalAmount); // totalAmount from the API
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddExpense = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('User not authenticated. Please log in.');
      }

      const res = await fetch('/api/expenses', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, amount, date }),
      });

      if (!res.ok) {
        throw new Error('Failed to add expense');
      }

      // After adding, close the modal and reset the form
      setIsModalOpen(false);
      setTitle('');
      setAmount(0);
      setDate('');

      // Refetch expenses after adding a new one
      fetchExpenses();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleDeleteExpense = async (id: number) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('User not authenticated. Please log in.');
      }

      const res = await fetch(`/api/expenses/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error('Failed to delete expense');
      }

      // Refetch data after deletion
      fetchExpenses();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  if (loading) return <p>Loading expenses...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-semibold text-center mb-4">Expenses</h1>

      {/* Display total amount */}
      <p className="text-center text-lg font-semibold mb-4">Total Amount: ${totalAmount.toFixed(2)}</p>

      {/* Button to open modal */}
      <div className="flex justify-end mb-4">
        <button
          onClick={handleOpenModal}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
        >
          Add Expense
        </button>
      </div>

      {/* Modal for Adding Expense */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <h2 className="text-lg font-semibold mb-4">Add New Expense</h2>
        <form onSubmit={handleAddExpense}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
            <input
              id="title"
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount</label>
            <input
              id="amount"
              type="number"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
            <input
              id="date"
              type="date"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
          >
            Add Expense
          </button>
        </form>
      </Modal>

      {/* Expense Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2 text-left">Title</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Amount</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Date</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-4">No expenses found.</td>
              </tr>
            ) : (
              expenses.map((expense) => (
                <tr key={expense.id} className="bg-white hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2">{expense.title}</td>
                  <td className="border border-gray-300 px-4 py-2">${expense.amount.toFixed(2)}</td>
                  <td className="border border-gray-300 px-4 py-2">{new Date(expense.date).toLocaleDateString()}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      onClick={() => handleDeleteExpense(expense.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Component */}
      <Pagination
        currentPage={page}
        totalResults={totalResults}
        resultsPerPage={ITEMS_PER_PAGE}
        onPageChange={setPage}
      />
    </div>
  );
};

export default ExpenseTable;
