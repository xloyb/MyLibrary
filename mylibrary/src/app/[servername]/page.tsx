
// import { getBooksByCategoryServername } from '@/lib/book';
// import { Book } from '@prisma/client';
// import React from 'react';
// import Image from 'next/image';

// interface BooksPageProps {
//   params: {
//     servername: string;
//   };
// }

// const BooksPage: React.FC<BooksPageProps> = async ({ params }) => {
//   const { servername } = params;

//   let books: Book[] = [];

//   try {
//     books = await getBooksByCategoryServername(servername);
//   } catch (error) {
//     console.error('Failed to fetch books:', error);
//   }

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">Books in {servername} Category</h1>
//       {books.length > 0 ? (
//         <ul className="space-y-4">
//           {books.map((book) => (
//             <li key={book.id} className="bg-white shadow-md rounded-lg p-4">
//               <div className="flex flex-col md:flex-row items-center">
//                 <div className="w-full md:w-1/3 mb-4 md:mb-0">
//                   <Image
//                     src={book.image || '/default-book-cover.jpg'}
//                     alt={book.title}
//                     width={200} // Adjust width and height as needed
//                     height={300}
//                     className="object-cover rounded"
//                   />
//                 </div>
//                 <div className="w-full md:w-2/3 md:ml-4">
//                   <h2 className="text-xl font-semibold">{book.title}</h2>
//                   <p className="text-gray-600">{book.description}</p>
//                   <p className="mt-2 text-gray-500">Author: {book.authorname}</p>
//                   <p className="text-gray-500">Published At: {book.publishedAt}</p>
//                   <p className="text-gray-500">Size: {book.size} MB</p>
//                 </div>
//               </div>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>No books available in this category.</p>
//       )}
//     </div>
//   );
// };

// export default BooksPage;

import { getBooksByCategoryServername } from '@/lib/book';
import { book } from '@prisma/client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SlideCaptchaModal from '@/components/Captcha/SlideCaptcha';
import SlideImageCaptcha from '@/components/Captcha/SlideImageCaptcha';
import MyHcaptcha from '@/components/Captcha/HCaptcha';

interface BooksPageProps {
  params: {
    servername: string;
  };
}

const BooksPage: React.FC<BooksPageProps> = async ({ params }) => {
  const { servername } = params;

  let books: book[] = [];

  try {
    books = await getBooksByCategoryServername(servername);
  } catch (error) {
    console.error('Failed to fetch books:', error);
  }

  return (
    <div className="bg-base-100 card mx-6 mt-5 md:pt-4 px-6">
      <div className="text-xl font-semibold inline-block">MyDevify.com Library</div>
      <div className='text-gray-500 text-xs'>
        Discover your next great read with ease! Filter books by category and download as many as you want—no restrictions. With MyDevify.com, accessing IT eBooks is as simple as a click.
      </div>
      <div className="divider mt-2"></div>

      {books.length > 0 ? (
        <div className="content-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 card mt-5 md:pt-4">
          {books.map((book) => (
            <div key={book.id} className="mt-6 card card-compact shadow-xl w-auto m-2 bg-base-100">
              <figure>
                <div style={{ width: '100%', position: 'relative', paddingBottom: '56.25%' }}>
                  <Image
                    src={`/images/books/${book.image || '/default-book-cover.jpg'}`}
                    alt={book.title}
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
              </figure>
              <div className="card-body">
                <h2 className="card-title">{book.title}</h2>
                <p>{book.description}</p>
                {/* <p className="mt-2 text-gray-500">Author: {book.authorname}</p>
                <p className="text-gray-500">Published At: {book.publishedAt}</p>
                <p className="text-gray-500">Size: {book.size} MB</p> */}
                <div className="card-actions justify-end">
                  <Link href={`/c/`}>
                    <button className="btn btn-primary btn-xs sm:btn-sm md:btn-md">Read Online or Download</button>
                  </Link>
                  {/* <SlideCaptchaModal/>
                  <SlideImageCaptcha/> */}
                  <MyHcaptcha/>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-4 text-center text-gray-500">
          <p>No books available in this category.</p>
        </div>
      )}
    </div>
  );
};

export default BooksPage;
