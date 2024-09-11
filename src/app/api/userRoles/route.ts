import { NextRequest, NextResponse } from 'next/server';
import { getUserByClerkUserId } from '@/lib/user'; 

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const clerkUserId = url.searchParams.get('clerkUserId');

  if (!clerkUserId) {
    return NextResponse.json({ error: 'Missing clerkUserId query parameter' }, { status: 400 });
  }

  try {
    const user = await getUserByClerkUserId(clerkUserId);
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch user roles' }, { status: 500 });
  }
}
