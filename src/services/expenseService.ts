import { expenseRepository } from "@/repository/expenseRepository";

// services/expenseService.ts
export const expenseService = {
  async createExpense(data: { title: string; amount: number; date: Date; userId: number }) {
    if (!data.title || !data.amount || !data.date) {
      throw new Error('Missing required fields: title, amount, and date are required');
    }
    return expenseRepository.createExpense(data);
  },

  async getExpenses(userId: number) {
    return expenseRepository.getExpenses(userId);
  },

  async getExpenseById(expenseId: number) {
    return expenseRepository.getExpenseById(expenseId);
  },

  async updateExpense(expenseId: number, data: { title?: string; amount?: number; date?: Date }) {
    if (!data.title && !data.amount && !data.date) {
      throw new Error('At least one field (title, amount, or date) must be provided for update');
    }
    return expenseRepository.updateExpense(expenseId, data);
  },

  async deleteExpense(expenseId: number) {
    return expenseRepository.deleteExpense(expenseId);
  }
};
