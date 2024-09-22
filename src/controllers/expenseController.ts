import { expenseService } from '@/services/expenseService';

export const expenseController = {
  // Create a new expense
  async create(req: Request) {
    const { title, amount, date, budgetId } = await req.json();
    const user = JSON.parse(req.headers.get('user')!); // Extract user info from request headers
    const userId = user.userId; // Retrieve userId from token

    try {
      // Convert the date string into a valid Date object
      const parsedDate = new Date(date);

      if (isNaN(parsedDate.getTime())) {
        throw new Error('Invalid date format');
      }

      const expense = await expenseService.createExpense({ title, amount, date: parsedDate, userId, budgetId });
      return new Response(JSON.stringify(expense), { status: 201 });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      return new Response(JSON.stringify({ error: errorMessage }), { status: 400 });
    }
  },

  async getAll(req: Request) {
    const user = JSON.parse(req.headers.get('user')!);
    const userId = user.userId;

    const url = new URL(req.url);
    const page = Number(url.searchParams.get('page')) || 1;
    const limit = Number(url.searchParams.get('limit')) || 5;

    try {
      const { expenses, totalPages, totalExpenses, totalAmount } = await expenseService.getExpenses(userId, page, limit);
      return new Response(JSON.stringify({ expenses, totalPages, currentPage: page, totalExpenses, totalAmount }), { status: 200 });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      return new Response(JSON.stringify({ error: errorMessage }), { status: 400 });
    }
  },

  // Get a specific expense by ID
  async getById(req: Request) {
    const expenseId = Number(req.url.split('/').pop()); // Get ID from URL
    const user = JSON.parse(req.headers.get('user')!); // Extract user info
    const userId = user.userId; // Retrieve userId from token

    try {
      const expense = await expenseService.getExpenseById(expenseId);

      // Check if the expense belongs to the user
      if (expense?.userId !== userId) {
        return new Response(JSON.stringify({ error: 'Unauthorized access' }), { status: 403 });
      }

      return new Response(JSON.stringify(expense), { status: 200 });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      return new Response(JSON.stringify({ error: errorMessage }), { status: 400 });
    }
  },

  // Update an existing expense by ID
  async update(req: Request) {
    const expenseId = Number(req.url.split('/').pop()); // Get ID from URL
    const data = await req.json();
    const user = JSON.parse(req.headers.get('user')!); // Extract user info
    const userId = user.userId; // Retrieve userId from token

    try {
      // Fetch the expense to check ownership
      const existingExpense = await expenseService.getExpenseById(expenseId);
      if (existingExpense?.userId !== userId) {
        return new Response(JSON.stringify({ error: 'Unauthorized access' }), { status: 403 });
      }

      const updatedExpense = await expenseService.updateExpense(expenseId, data);
      return new Response(JSON.stringify(updatedExpense), { status: 200 });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      return new Response(JSON.stringify({ error: errorMessage }), { status: 400 });
    }
  },

  // Delete an expense by ID
  async delete(req: Request) {
    const expenseId = Number(req.url.split('/').pop()); // Get ID from URL
    const user = JSON.parse(req.headers.get('user')!); // Extract user info
    const userId = user.userId; // Retrieve userId from token

    try {
      // Fetch the expense to check ownership
      const existingExpense = await expenseService.getExpenseById(expenseId);
      if (existingExpense?.userId !== userId) {
        return new Response(JSON.stringify({ error: 'Unauthorized access' }), { status: 403 });
      }

      await expenseService.deleteExpense(expenseId);
      return new Response(null, { status: 204 });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      return new Response(JSON.stringify({ error: errorMessage }), { status: 400 });
    }
  }
};
