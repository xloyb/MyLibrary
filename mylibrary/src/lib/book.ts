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

  export async function updateBook(id: number, data: Partial<{ title: string; description: string; publishedAt: Date; authorname: string; categoryId: number; image: string; size: number }>) {
    try {
      const updatedBook = await prisma.book.update({
        where: { id },
        data,
      });
      return updatedBook;
    } catch (error) {
      const err = error as Error;
      throw new Error(`Failed to update book with ID ${id}: ${err.message}`);
    }
  }
  
  export async function deleteBook(id: number) {
    try {
      await prisma.book.delete({
        where: { id },
      });
      return { message: `Book with ID ${id} deleted successfully` };
    } catch (error) {
      const err = error as Error;
      throw new Error(`Failed to delete book with ID ${id}: ${err.message}`);
    }
  }