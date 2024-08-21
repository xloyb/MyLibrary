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


  export async function getUserByEmail(email: string) {
    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });
      return user;
    } catch (error) {
      const err = error as Error;
      throw new Error(`Failed to retrieve user with email ${email}: ${err.message}`);
    }
  }




export async function updateUser(id: number, data: Partial<{ email: string; password: string; username: string; avatar: string }>) {
    try {
      const updatedUser = await prisma.user.update({
        where: { id },
        data,
      });
      return updatedUser;
    } catch (error) {
      const err = error as Error;
      throw new Error(`Failed to update user with ID ${id}: ${err.message}`);
    }
  }