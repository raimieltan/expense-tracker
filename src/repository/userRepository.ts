// repositories/userRepository.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const userRepository = {
  async findUserByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    });
  },

  async createUser(name: string, email: string, hashedPassword: string) {
    return prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,  // Save the hashed password
      },
    });
  },

  async findUserById(userId: number) {
    return prisma.user.findUnique({
      where: { id: userId },
    });
  },
};
