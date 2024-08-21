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



  // Get a category by its ID
export async function getCategoryById(id: number) {
    try {
      const category = await prisma.category.findUnique({
        where: { id },
      });
      return category;
    } catch (error) {
      const err = error as Error;
      throw new Error(`Failed to get category with ID ${id}: ${err.message}`);
    }
  }


  // Get all categories
export async function getAllCategories() {
    try {
      const categories = await prisma.category.findMany();
      return categories;
    } catch (error) {
      const err = error as Error;
      throw new Error(`Failed to retrieve categories: ${err.message}`);
    }
  }