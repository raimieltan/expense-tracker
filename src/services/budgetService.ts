// services/budgetService.ts

import { budgetRepository } from "@/repository/budgetRepository";


export const budgetService = {
  async createBudget(data: { title: string; amount: number; userId: number }) {
    if (!data.title || !data.amount) {
      throw new Error('Title and amount are required');
    }
    return budgetRepository.createBudget(data);
  },

  async getBudgets(userId: number) {
    return budgetRepository.getBudgets(userId);
  },

  async getBudgetById(budgetId: number) {
    return budgetRepository.getBudgetById(budgetId);
  },

  async updateBudget(budgetId: number, data: { title?: string; amount?: number }) {
    if (!data.title && !data.amount) {
      throw new Error('At least one field (title or amount) must be provided for update');
    }
    return budgetRepository.updateBudget(budgetId, data);
  },

  async deleteBudget(budgetId: number) {
    return budgetRepository.deleteBudget(budgetId);
  }
};
