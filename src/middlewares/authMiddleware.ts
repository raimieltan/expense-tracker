// middleware/authMiddleware.ts

import { verifyToken } from '@/utils/jwt';


export async function authMiddleware(req: Request) {
  const authHeader = req.headers.get('Authorization');
  if (!authHeader) {
    return Response.json({ error: 'Authorization header is missing' }, { status: 401 });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return Response.json({ error: 'Token is missing' }, { status: 401 });
  }

  const decodedToken = verifyToken(token);
  if (!decodedToken) {
    return Response.json({ error: 'Invalid or expired token' }, { status: 401 });
  }


  req.headers.set('user', JSON.stringify(decodedToken));

  return undefined;
}
