import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { username, password } = await request.json();

  const validUser = process.env.ADMIN_USERNAME;
  const validPass = process.env.ADMIN_PASSWORD;
  const secret    = process.env.ADMIN_SECRET;

  if (!validUser || !validPass || !secret) {
    return NextResponse.json(
      { error: 'Server not configured. Set ADMIN_USERNAME, ADMIN_PASSWORD, ADMIN_SECRET in environment.' },
      { status: 500 }
    );
  }

  if (username !== validUser || password !== validPass) {
    return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set('admin_session', secret, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 8, // 8 hours
    path: '/',
  });
  return response;
}
