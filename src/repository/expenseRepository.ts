// repositories/expenseRepository.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const expenseRepository = {
  async createExpense(data: { title: string; amount: number; date: Date; userId: number }) {
    return prisma.expense.create({
      data,
    });
  },

  async getExpenses(userId: number, skip: number, take: number) {
    // Count total expenses
    const totalExpenses = await prisma.expense.count({
      where: { userId },
    });

    // Sum all expenses amount for the user
    const totalAmount = await prisma.expense.aggregate({
      _sum: {
        amount: true,
      },
      where: { userId },
    });

    // Find paginated expenses
    const expenses = await prisma.expense.findMany({
      where: { userId },
      orderBy: { date: 'desc' }, // Sort by most recent
      skip,
      take,
    });

    return { expenses, totalExpenses, totalAmount: totalAmount._sum.amount || 0 };
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
