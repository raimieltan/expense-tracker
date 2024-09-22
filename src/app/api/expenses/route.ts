import { expenseController } from '@/controllers/expenseController';
import { authMiddleware } from '@/middlewares/authMiddleware';


export async function POST(req: Request) {
  const authResult = await authMiddleware(req);
  if (authResult instanceof Response) return authResult; // If the middleware returns an error

  return expenseController.create(req);
}

export async function GET(req: Request) {
  const authResult = await authMiddleware(req);
  if (authResult instanceof Response) return authResult; // If the middleware returns an error

  return expenseController.getAll(req);
}
