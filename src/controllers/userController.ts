// controllers/userController.ts

import { userService } from "../services/userService";

export const userController = {
  async login(req: Request) {
    const { email, password } = await req.json();

    try {
      const { user, token } = await userService.loginUser(email, password);
      return new Response(JSON.stringify({ user, token }), { status: 200 });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: error.message }), { status: 401 });
    }
  },

  async register(req: Request) {
    const { name, email, password } = await req.json();

    try {
      const newUser = await userService.registerUser(name, email, password);
      return new Response(JSON.stringify({ message: 'User registered successfully', newUser }), { status: 201 });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: error.message }), { status: 400 });
    }
  }
};
