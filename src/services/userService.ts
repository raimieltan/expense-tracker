// services/userService.ts
import { hashPassword, comparePassword } from '@/utils/hash';
import { signToken } from '@/utils/jwt';
import { userRepository } from '../repository/userRepository';

export const userService = {
  async registerUser(name: string, email: string, password: string) {
    // Check if user already exists
    const existingUser = await userRepository.findUserByEmail(email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Create user
    const newUser = await userRepository.createUser(name, email, hashedPassword);
    return newUser;
  },

  async loginUser(email: string, password: string) {
    // Find the user by email
    const user = await userRepository.findUserByEmail(email);
    if (!user) {
      throw new Error('Invalid email or password');
    }

    // Compare the password
    const passwordMatch = await comparePassword(password, user.password);
    if (!passwordMatch) {
      throw new Error('Invalid email or password');
    }

    // Generate JWT
    const token = signToken({ userId: user.id, email: user.email });
    return { user, token };
  },

  async getUserById(userId: number) {
    return userRepository.findUserById(userId);
  }
};
