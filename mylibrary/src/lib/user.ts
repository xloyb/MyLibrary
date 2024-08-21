import prisma from './client';

export async function getUserById(id: number) {
    try {
      const user = await prisma.user.findUnique({
        where: { id },
      });
      return user;
    } catch (error) {
      const err = error as Error;
      throw new Error(`Failed to retrieve user with ID ${id}: ${err.message}`);
    }
  }