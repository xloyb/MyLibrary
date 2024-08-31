import { getAllCategories } from "@/lib/category";
import { category } from "@prisma/client";
import Link from "next/link";
import React from "react";
import { FaBookOpen } from "react-icons/fa";
import { GiBlackBook } from "react-icons/gi";

const SidebarCategories = async () => {
  let categories: category[] = [];

  try {
    categories = await getAllCategories();
  } catch (error) {
    console.error("Failed to fetch categories:", error);
  }

  return (
    <div className="bg-base-100 card p-6 mx-auto mt-5 w-full max-w-lg">
      <ul className="menu rounded-box w-56">
        {categories.map((category) => (
          <Link key={category.id} href={`/${category.servername}`}>
            <li>
              <span>
                <GiBlackBook /> {category.name}
              </span>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default SidebarCategories;
