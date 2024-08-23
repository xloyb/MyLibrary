import React from 'react';

const TestBooksPage = ({ books }: { books: any[] }) => {
  return (
    <div>
      <h1>Books</h1>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <h2>{book.title}</h2>
            <p>{book.description}</p>
            <p>Category: {book.category.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TestBooksPage;