import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Book {
  id: number;
  image: string;
  title: string;
  description: string;
  price: number;
}

const books: Book[] = [
  {
    id: 1,
    image: 'https://www.mydevify.com/assets/index.494ac568.png', 
    title: 'Book 1',
    description: 'Description for Book 1',
    price: 19.99,
  },
  {
    id: 2,
    image: 'https://www.mydevify.com/assets/index.494ac568.png', 
    title: 'Book 2',
    description: 'Description for Book 2',
    price: 29.99,
  },
];

const Books = () => {
  if (books.length === 0) {
    return <div>No books yet!</div>;
  }

  return (
    <div className='content-center bg-base-200 card mx-6 mt-5 md:pt-4 px-6'>
      <div className={`content-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 bg-base-200 card mx-6 mt-5 md:pt-4 px-6`}>
        {books.map((book) => (
          <div key={book.id} className="mt-6 card card-compact shadow-xl w-auto m-2 bg-base-100">
            <figure>
              <div style={{ width: '100%', position: 'relative', paddingBottom: '56.25%' }}>
                <Image
                  src={book.image}
                  alt={book.title}
                  layout="fill"
                  objectFit="contain"
                />
              </div>
            </figure>
            <div className="card-body">
              <h2 className="card-title">{book.title}</h2>
              <p>{book.description}</p>
              <div className="card-actions justify-end">
                <p className="text-lg font-bold leading-10">${book.price.toFixed(2)}</p>
                <Link href={`/c/`}>
                  <button className="btn btn-primary">Order</button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Books;
