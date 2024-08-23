import TestBooksPage from '@/components/Home/Books';
import { getAllBooksWithCategory } from '@/lib/book';
import React from 'react';

const TestPage = async () => {
  const books = await getAllBooksWithCategory();

  return (
    <div>
      <TestBooksPage books={books} />
    </div>
  );
};

export default TestPage;
