import prisma from './client'; 


// Create a new category
export async function createCategory(name: string) {
    try {
      const category = await prisma.category.create({
        data: { name },
      });
      return category;
    } catch (error) {
      // Cast error to Error type
      const err = error as Error;
      throw new Error(`Failed to create category: ${err.message}`);
    }
  }
