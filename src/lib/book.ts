import prisma from './client';


export const getAllBooksWithCategory = async () => {
  try {
    const books = await prisma.book.findMany({
      include: {
        category: true, 
      },
    });
    return books;
  } catch (error) {
    console.error('Error fetching books with categories:', error);
    throw error;
  }
};


export async function getBooksByCategoryServername(servername: string) {
  try {
    const category = await prisma.category.findUnique({
      where: { servername },
    });
    if (!category) {
      throw new Error('Category not found');
    }
    const books = await prisma.book.findMany({
      where: { categoryId: category.id }, 
    });
    return books;
  } catch (error) {
    console.error('Failed to fetch books by category servername:', error);
    throw new Error(`Failed to fetch books`);
  }
}