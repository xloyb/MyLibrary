// 'use client'
// import Books from "@/components/Home/BooksList";
// import Layout from "./layout";
// import MyHome from "@/components/Home";
// import Categories from "@/components/categories/Categories";
// import { useEffect, useState } from "react";
// import { getAllCategories } from "@/lib/category";
// import { Category } from "@prisma/client";

// export default function Home() {

//   const [categories, setCategories] = useState<Category[]>([]);
  
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const data = await getAllCategories();
//         setCategories(data);
//         console.log("dataaa:",data)
//       } catch (error) {
//         console.error('Failed to fetch categories:', error);
//       }
//     };

//     fetchCategories();
//   }, []);


//   return (
//     <div>

//       {/* <MyHome/> */}
//       {/* <Books/> */}
//       {/* <Categories/> */}

//     </div>
//   );
// }




import { Category } from '@prisma/client';
import { getAllCategories } from '@/lib/category';
import Categories from '@/components/categories/Categories';

const CategoriesPage = async () => {
  let categories: Category[] = [];

  try {
    categories = await getAllCategories();
  } catch (error) {
    console.error('Failed to fetch categories:', error);
  }

  return <Categories categories={categories} />;
};

export default CategoriesPage;