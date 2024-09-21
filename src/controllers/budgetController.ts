// controllers/budgetController.ts
import { budgetService } from '@/services/budgetService';

export const budgetController = {
  async create(req: Request) {
    const { title, amount } = await req.json();
    const user = JSON.parse(req.headers.get('user')!); // Extract user info from request headers
    const userId = user.userId; // Retrieve userId from token

    try {
      const budget = await budgetService.createBudget({ title, amount, userId });
      return new Response(JSON.stringify(budget), { status: 201 });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      return new Response(JSON.stringify({ error: errorMessage }), { status: 400 });
    }
  },

  async getAll(req: Request) {
    const user = JSON.parse(req.headers.get('user')!); // Extract user info
    const userId = user.userId; // Retrieve userId from token

    try {
      const budgets = await budgetService.getBudgets(userId);
      return new Response(JSON.stringify(budgets), { status: 200 });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      return new Response(JSON.stringify({ error: errorMessage }), { status: 400 });
    }
  },

  async getById(req: Request) {
    const budgetId = Number(req.url.split('/').pop()); // Get ID from URL
    const user = JSON.parse(req.headers.get('user')!); // Extract user info
    const userId = user.userId; // Retrieve userId from token

    try {
      const budget = await budgetService.getBudgetById(budgetId);

      // Check if the budget belongs to the user
      if (budget?.userId !== userId) {
        return new Response(JSON.stringify({ error: 'Unauthorized access' }), { status: 403 });
      }

      return new Response(JSON.stringify(budget), { status: 200 });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      return new Response(JSON.stringify({ error: errorMessage }), { status: 400 });
    }
  },

  async update(req: Request) {
    const budgetId = Number(req.url.split('/').pop()); // Get ID from URL
    const data = await req.json();
    const user = JSON.parse(req.headers.get('user')!); // Extract user info
    const userId = user.userId; // Retrieve userId from token

    try {
      const existingBudget = await budgetService.getBudgetById(budgetId);
      if (existingBudget?.userId !== userId) {
        return new Response(JSON.stringify({ error: 'Unauthorized access' }), { status: 403 });
      }

      const updatedBudget = await budgetService.updateBudget(budgetId, data);
      return new Response(JSON.stringify(updatedBudget), { status: 200 });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      return new Response(JSON.stringify({ error: errorMessage }), { status: 400 });
    }
  },

  async delete(req: Request) {
    const budgetId = Number(req.url.split('/').pop()); // Get ID from URL
    const user = JSON.parse(req.headers.get('user')!); // Extract user info
    const userId = user.userId; // Retrieve userId from token

    try {
      const existingBudget = await budgetService.getBudgetById(budgetId);
      if (existingBudget?.userId !== userId) {
        return new Response(JSON.stringify({ error: 'Unauthorized access' }), { status: 403 });
      }

      await budgetService.deleteBudget(budgetId);
      return new Response(null, { status: 204 });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      return new Response(JSON.stringify({ error: errorMessage }), { status: 400 });
    }
  }
};
