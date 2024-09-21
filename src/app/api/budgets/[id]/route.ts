// app/api/budgets/[id]/route.ts
import { budgetController } from '@/controllers/budgetController';
import { authMiddleware } from '@/middlewares/authMiddleware';


export async function GET(req: Request) {
  const authResult = await authMiddleware(req);
  if (authResult instanceof Response) return authResult; // If the middleware returns an error, stop here

  return budgetController.getById(req);
}

export async function PATCH(req: Request) {
  const authResult = await authMiddleware(req);
  if (authResult instanceof Response) return authResult; // If the middleware returns an error, stop here

  return budgetController.update(req);
}

export async function DELETE(req: Request) {
  const authResult = await authMiddleware(req);
  if (authResult instanceof Response) return authResult; // If the middleware returns an error, stop here

  return budgetController.delete(req);
}
