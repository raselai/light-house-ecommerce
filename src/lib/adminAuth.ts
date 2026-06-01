import { NextRequest } from 'next/server';

export function checkAdminAuth(request: NextRequest): boolean {
  const cookie = request.cookies.get('admin_session');
  const secret = process.env.ADMIN_SECRET;
  if (!secret || !cookie) return false;
  return cookie.value === secret;
}

export function unauthorizedResponse() {
  return Response.json({ error: 'Unauthorized' }, { status: 401 });
}
