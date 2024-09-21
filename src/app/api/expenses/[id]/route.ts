import { expenseController } from '@/controllers/expenseController';
import { authMiddleware } from '@/middlewares/authMiddleware';


export async function GET(req: Request) {
  const authResult = await authMiddleware(req);
  if (authResult instanceof Response) return authResult; // If the middleware returns an error

  return expenseController.getById(req);
}

export async function PATCH(req: Request) {
  const authResult = await authMiddleware(req);
  if (authResult instanceof Response) return authResult; // If the middleware returns an error

  return expenseController.update(req);
}

export async function DELETE(req: Request) {
  const authResult = await authMiddleware(req);
  if (authResult instanceof Response) return authResult; // If the middleware returns an error

  return expenseController.delete(req);
}
