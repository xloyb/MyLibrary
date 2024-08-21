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