
import { getBooksByCategoryServername } from '@/lib/book';
import { Book } from '@prisma/client';
import React from 'react';
import Image from 'next/image';

interface BooksPageProps {
  params: {
    servername: string;
  };
}

const BooksPage: React.FC<BooksPageProps> = async ({ params }) => {
  const { servername } = params;

  let books: Book[] = [];

  try {
    books = await getBooksByCategoryServername(servername);
  } catch (error) {
    console.error('Failed to fetch books:', error);
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Books in {servername} Category</h1>
      {books.length > 0 ? (
        <ul className="space-y-4">
          {books.map((book) => (
            <li key={book.id} className="bg-white shadow-md rounded-lg p-4">
              <div className="flex flex-col md:flex-row items-center">
                <div className="w-full md:w-1/3 mb-4 md:mb-0">
                  <Image
                    src={book.image || '/default-book-cover.jpg'}
                    alt={book.title}
                    width={200} // Adjust width and height as needed
                    height={300}
                    className="object-cover rounded"
                  />
                </div>
                <div className="w-full md:w-2/3 md:ml-4">
                  <h2 className="text-xl font-semibold">{book.title}</h2>
                  <p className="text-gray-600">{book.description}</p>
                  <p className="mt-2 text-gray-500">Author: {book.authorname}</p>
                  <p className="text-gray-500">Published At: {book.publishedAt}</p>
                  <p className="text-gray-500">Size: {book.size} MB</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No books available in this category.</p>
      )}
    </div>
  );
};

export default BooksPage;
