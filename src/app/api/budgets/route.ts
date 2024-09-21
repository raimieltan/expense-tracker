// app/api/budgets/route.ts
import { budgetController } from '@/controllers/budgetController';
import { authMiddleware } from '@/middlewares/authMiddleware';


export async function POST(req: Request) {
  const authResult = await authMiddleware(req);
  if (authResult instanceof Response) return authResult; // If the middleware returns an error, stop here

  return budgetController.create(req);
}

export async function GET(req: Request) {
  const authResult = await authMiddleware(req);
  if (authResult instanceof Response) return authResult; // If the middleware returns an error, stop here

  return budgetController.getAll(req);
}
