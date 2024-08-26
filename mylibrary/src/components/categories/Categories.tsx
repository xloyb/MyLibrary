"use client"; 
import { category } from '@prisma/client';
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';

const Categories = ({ categories }: { categories: category[] }) => {
  // console.log(categories)
  return (
    <div className="bg-base-100 card mx-6 mt-5 md:pt-4 px-6">
      <div className="text-xl font-semibold inline-block">MyDevify.com Library</div>
      <div className='text-gray-500 text-xs'>Discover your next great read with ease! Filter books by category and download as many as you want—no restrictions. With MyDevify.com, accessing IT eBooks is as simple as a click.</div>
      <div className="divider mt-2"></div>

      <div className={`content-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 bg-base-200 card mt-5 md:pt-4`}>
        {categories.length > 0 ? (
          categories.map((category) => (
            <div key={category.id} className="mt-6 card card-compact shadow-xl w-auto m-2 bg-base-100">
              <figure>
                <div style={{ width: '100%', position: 'relative', paddingBottom: '56.25%' }}>
                  {category.image && (
                    <Image
                      src={category.image}
                      alt={category.name}
                      layout="fill"
                      objectFit="contain" />
                  )}
                </div>
              </figure>
              <div className="card-body">
                <h2 className="card-title">{category.name}</h2>
                <p></p>
                <div className="card-actions justify-end">
                  <Link href={`/${category.servername}`}>
                    <button className="btn btn-primary btn-xs sm:btn-sm md:btn-md">Browse Books</button>
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center mt-5">No categories found.</p>
        )}
      </div>
    </div>
  );
};

export default Categories;
