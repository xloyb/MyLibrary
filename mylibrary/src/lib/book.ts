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