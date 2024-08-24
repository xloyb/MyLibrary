import prisma from './client';

// Get user by Clerk user ID
export async function getUserByClerkUserId(clerkuserid: string) {
  console.log("clerkuserid:nn",clerkuserid)
  try {
    const user = await prisma.user.findUnique({
      where: { clerkuserid },
      select: {
        id: true,
        email: true,
        username: true,
        avatar: true,
        isAdmin: true,
        isMod: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return user;
  } catch (error) {
    const err = error as Error;
    throw new Error(`Failed to retrieve user with Clerk user ID ${clerkuserid}`);
  }
}

// Update user by Clerk user ID, allowing updates for isAdmin and isMod fields
export async function updateUserByClerkUserId(
  clerkuserid: string,
  data: Partial<{ email: string; password: string; username: string; avatar: string; isAdmin: boolean; isMod: boolean }>
) {
  try {
    const updatedUser = await prisma.user.update({
      where: { clerkuserid },
      data,
    });
    return updatedUser;
  } catch (error) {
    const err = error as Error;
    throw new Error(`Failed to update user with Clerk user ID ${clerkuserid}: ${err.message}`);
  }
}

// Delete user by Clerk user ID
export async function deleteUserByClerkUserId(clerkuserid: string) {
  try {
    await prisma.user.delete({
      where: { clerkuserid },
    });
    return { message: `User with Clerk user ID ${clerkuserid} deleted successfully` };
  } catch (error) {
    const err = error as Error;
    throw new Error(`Failed to delete user with Clerk user ID ${clerkuserid}: ${err.message}`);
  }
}



