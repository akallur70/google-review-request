import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { pin } = await request.json();
  if (pin === process.env.APP_PIN) {
    return NextResponse.json({ ok: true });
  }
  return NextResponse.json({ error: 'Invalid PIN' }, { status: 401 });
}
