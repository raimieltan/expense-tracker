// repositories/budgetRepository.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const budgetRepository = {
  async createBudget(data: { title: string; amount: number; userId: number }) {
    return prisma.budget.create({
      data,
    });
  },

  async getBudgets(userId: number) {
    return prisma.budget.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  },

  async getBudgetById(budgetId: number) {
    return prisma.budget.findUnique({
      where: { id: budgetId },
    });
  },

  async updateBudget(budgetId: number, data: { title?: string; amount?: number }) {
    return prisma.budget.update({
      where: { id: budgetId },
      data,
    });
  },

  async deleteBudget(budgetId: number) {
    return prisma.budget.delete({
      where: { id: budgetId },
    });
  },
};
