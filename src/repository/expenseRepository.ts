// repositories/expenseRepository.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const expenseRepository = {
  async createExpense(data: { title: string; amount: number; date: Date; userId: number }) {
    return prisma.expense.create({
      data,
    });
  },

  async getExpenses(userId: number) {
    return prisma.expense.findMany({
      where: { userId },
      orderBy: { date: 'desc' },  // Sort by most recent
    });
  },

  async getExpenseById(expenseId: number) {
    return prisma.expense.findUnique({
      where: { id: expenseId },
      include: {
        budget: true
      }
    });
  },

  async updateExpense(expenseId: number, data: { title?: string; amount?: number; date?: Date }) {
    return prisma.expense.update({
      where: { id: expenseId },
      data,
    });
  },

  async deleteExpense(expenseId: number) {
    return prisma.expense.delete({
      where: { id: expenseId },
    });
  },
};
