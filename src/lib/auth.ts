import { getUserByClerkUserId } from '@/lib/user';

export async function isAdmin(clerkUserId: string): Promise<boolean> {
  const user = await getUserByClerkUserId(clerkUserId);
  return user?.isAdmin ?? false;
}

export async function isMod(clerkUserId: string): Promise<boolean> {
  const user = await getUserByClerkUserId(clerkUserId);
  return user?.isMod ?? false;
}

//to check if that mother fucker is Mod or Admin
// export async function isTeam(clerkUserId: string): Promise<boolean> {
//   const user = await getUserByClerkUserId(clerkUserId);
//   const isMod = user?.isMod ?? false;
//   const isAdmin = user?.isAdmin ?? false;
//   return isMod || isAdmin;
// }


// export async function isTeam(clerkUserId: string): Promise<{ isAdmin: boolean; isMod: boolean }> {
//   const user = await getUserByClerkUserId(clerkUserId);
//   const isMod = user?.isMod ?? false;
//   const isAdmin = user?.isAdmin ?? false;
//   return { isAdmin, isMod };  
// }


export async function isTeam(clerkUserId: string): Promise<{ isAdmin: boolean; isMod: boolean }> {
  const user = await getUserByClerkUserId(clerkUserId);
  
  if (!user) {
    return { isAdmin: false, isMod: false }; 
  }

  const isAdmin = user.isAdmin ?? false;
  const isMod = user.isMod ?? false;

  return { isAdmin, isMod };  
}

