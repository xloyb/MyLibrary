import { getUserByClerkUserId } from '@/lib/user';

export async function isAdmin(clerkUserId: string): Promise<boolean> {
  const user = await getUserByClerkUserId(clerkUserId);
  return user?.isAdmin ?? false;
}

export async function isMod(clerkUserId: string): Promise<boolean> {
  const user = await getUserByClerkUserId(clerkUserId);
  return user?.isMod ?? false;
}
