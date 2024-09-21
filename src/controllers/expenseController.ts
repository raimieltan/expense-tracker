import { expenseService } from '@/services/expenseService';

export const expenseController = {
  // Create a new expense
  async create(req: Request) {
    const { title, amount, date } = await req.json();
    const user = JSON.parse(req.headers.get('user')!); // Extract user info from request headers
    const userId = user.userId; // Retrieve userId from token

    try {
      const expense = await expenseService.createExpense({ title, amount, date, userId });
      return new Response(JSON.stringify(expense), { status: 201 });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      return new Response(JSON.stringify({ error: errorMessage }), { status: 400 });
    }
  },

  // Get all expenses for the authenticated user
  async getAll(req: Request) {
    const user = JSON.parse(req.headers.get('user')!); // Extract user info
    const userId = user.userId; // Retrieve userId from token

    try {
      const expenses = await expenseService.getExpenses(userId);
      return new Response(JSON.stringify(expenses), { status: 200 });
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
