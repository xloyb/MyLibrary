import prisma from '@/lib/client';
import { NextResponse } from 'next/server';

// Create a new book
export async function POST(request: Request) {
  const { title, description, publishedAt, authorname, categoryId, userId, downloads, image, size, path } = await request.json();

  try {
    const newBook = await prisma.book.create({
      data: {
        title,
        description,
        publishedAt: new Date(publishedAt),
        authorname,
        categoryId,
        userId,
        downloads,
        image,
        size,
        path,
      },
    });
    return NextResponse.json(newBook);
  } catch (error) {
    console.error('Failed to create book:', error);
    return NextResponse.error();
  }
}

// Update an existing book
export async function PUT(request: Request) {
  const { id, title, description, publishedAt, authorname, categoryId, userId, downloads, image, size, path } = await request.json();

  try {
    const updatedBook = await prisma.book.update({
      where: { id },
      data: {
        title,
        description,
        publishedAt: new Date(publishedAt),
        authorname,
        categoryId,
        userId,
        downloads,
        image,
        size,
        path,
      },
    });
    return NextResponse.json(updatedBook);
  } catch (error) {
    console.error('Failed to update book:', error);
    return NextResponse.error();
  }
}

// Delete a book
export async function DELETE(request: Request) {
  const { id } = await request.json();

  try {
    await prisma.book.delete({
      where: { id },
    });
    return NextResponse.json({ message: 'Book deleted successfully' });
  } catch (error) {
    console.error('Failed to delete book:', error);
    return NextResponse.error();
  }
}
