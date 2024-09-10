import { getAllArabicCategories, getAllEnglishCategories } from "@/lib/category";
import { category } from "@prisma/client";
import ClientSideLink from "./ClientSideLink";
import { GiBlackBook } from "react-icons/gi";
import styles from '@/app/main.module.css';


const SidebarCategories2 = async () => {
  let engcategories: category[] = [];
  let arcategories: category[] = [];

  try {
    engcategories = await getAllEnglishCategories();
    arcategories = await getAllArabicCategories();
  } catch (error) {
    console.error("Failed to fetch categories:", error);
  }

  return (
    <div className="bg-base-100 card p-6 mx-auto w-full max-w-lg">
      <div className="menu w-64 min-h-full">
        <div>
          <div className="collapse collapse-plus border border-base-300">
            <input type="checkbox" className="peer" />
            <div className="collapse-title flex items-center">
              English Books
            </div>
            <div className="collapse-content">
              <ul>
                {engcategories.map((category) => (
                  <ClientSideLink key={category.id} href={`/${category.servername}`}>
                    <li>
                      <span>
                        <GiBlackBook /> {category.name}
                      </span>
                    </li>
                  </ClientSideLink>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>


      <div className="menu w-64 min-h-full">
        <div>
          <div className="collapse collapse-plus border border-base-300">
            <input type="checkbox" className="peer" />

            <div className={`collapse-title flex items-center rtl-direction ${styles.rtl_direction} `}>
              <span className="text-2xl mr-2"> {/* Icon or placeholder */} </span>
              <span>كتب عربية</span>
            </div>

            <div className="collapse-content">
              <ul>
                {arcategories.map((category) => (
                //   <Link key={category.id} href={`/${category.servername}`}>
                //     <li>
                //       <span className={`${styles.rtl_direction}`}>
                //         <GiBlackBook className="mr-1" /> {category.name}
                //       </span>
                //     </li>
                //   </Link>

<ClientSideLink key={category.id} href={`/${category.servername}`}>
                    <li>
                      <span className={`${styles.rtl_direction}`}>
                        <GiBlackBook className="mr-1" /> {category.name}
                      </span>
                    </li>
                  </ClientSideLink>


                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>



    </div>
  );
};

export default SidebarCategories2;
