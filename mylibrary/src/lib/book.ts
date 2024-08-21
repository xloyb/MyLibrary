import prisma from './client';

export async function createBook(title: string, description: string | null, publishedAt: Date, authorname: string | null, categoryId: number, userId: number, image?: string, size?: number) {
  try {
    const book = await prisma.book.create({
      data: {
        title,
        description,
        publishedAt,
        authorname,
        categoryId,
        userId,
        image,
        size,
      },
    });
    return book;
  } catch (error) {
    const err = error as Error;
    throw new Error(`Failed to create book: ${err.message}`);
  }
}


export async function getBookById(id: number) {
    try {
      const book = await prisma.book.findUnique({
        where: { id },
        include: { category: true, user: true },
      });
      return book;
    } catch (error) {
      const err = error as Error;
      throw new Error(`Failed to retrieve book with ID ${id}: ${err.message}`);
    }
  }


  export async function getAllBooks() {
    try {
      const books = await prisma.book.findMany({
        include: { category: true, user: true },
      });
      return books;
    } catch (error) {
      const err = error as Error;
      throw new Error(`Failed to retrieve books: ${err.message}`);
    }
  }