// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { FaCircleRight } from "react-icons/fa6";
// import { MdOutlineAdminPanelSettings } from "react-icons/md";
// import ThemeToggle from "./ThemeToggle";
// import { ClerkLoaded, ClerkLoading, SignedIn, useAuth } from "@clerk/nextjs";
// import { SignedOut, UserButton } from "@clerk/clerk-react";
// import { useEffect, useState } from "react";
// import { isTeam } from "@/lib/auth";
// // import { UserStatus } from "./UserStatus";

// const Navbar = () => {
//   const userId = useAuth()

//   const sitename = "MyLibrary";

//   return (
//     <div>
//       <div className="navbar bg-base-100">
//         <div className="navbar-start">
//           <div className="dropdown">
//             <div tabIndex={0} role="button" className="mr-2">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-5 w-5"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M4 6h16M4 12h16M4 18h7"
//                 />
//               </svg>
//             </div>
//             <ul
//               tabIndex={0}
//               className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
//             >
//               <li>
//                 <a href="/">Home</a>
//               </li>
//               <li>
//                 <a href="/c">Dashboard</a>
//               </li>
//               {/* <UserStatus/> */}
//               <ClerkLoaded>
//               <SignedIn>
//                 {/* check if is iteam and isadmin here */}
//               </SignedIn>
//               </ClerkLoaded>

//             </ul>
//           </div>

//           <label htmlFor="my-drawer-2" className=" drawer-button lg:hidden">
//             <FaCircleRight />
//           </label>
//         </div>
//         <div className="navbar-center">
//           <a className="btn btn-ghost text-xl">{sitename}</a>
//         </div>
//         <div className="navbar-end">
//           {/* <ThemeToggle/> */}
//           <ThemeToggle />
//           {/* Hardcoded Admin Panel access */}

//           <ClerkLoading>
//             <span className="loading loading-dots loading-md"></span>
//           </ClerkLoading>
//           <ClerkLoaded>
//             <SignedIn>
//               {/* <div className="dropdown dropdown-end">
//                 <div tabIndex={0} role="button" className="mr-2">
//                   <MdOutlineAdminPanelSettings className="h-7 w-7" />
//                 </div>
//                 <ul
//                   tabIndex={0}
//                   className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
//                 >
//                   <li>test</li>
//                   <li>test</li>
//                   <li>test</li>
//                 </ul>
//               </div> */}
//               <UserButton />
//             </SignedIn>
//             <SignedOut>
//               <Link href={"/sign-in"}>Login/Register</Link>
//             </SignedOut>
//           </ClerkLoaded>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;

"use client";

import Image from "next/image";
import Link from "next/link";
import { FaCircleRight } from "react-icons/fa6";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import ThemeToggle from "./ThemeToggle";
import { ClerkLoaded, ClerkLoading, SignedIn, useAuth } from "@clerk/nextjs";
import { SignedOut, UserButton } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { isTeam } from "@/lib/auth";

const Navbar = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isMod, setIsMod] = useState(false);

  const { userId: clerkUserId } = useAuth();

  useEffect(() => {
    const fetchUserRoles = async () => {
      if (!clerkUserId) {
        console.error("Clerk User ID is not available");
        return;
      }

      try {
        const response = await fetch(`/api/userRoles?clerkUserId=${clerkUserId}`);
        if (response.ok) {
          const user = await response.json();
          setIsAdmin(user.isAdmin);
          setIsMod(user.isMod);
        } else {
          console.error("Failed to fetch user roles");
        }
      } catch (error) {
        console.error("Error fetching user roles:", error);
      }
    };

    fetchUserRoles();
  }, [clerkUserId]);

  const sitename = "MyLibrary";

  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/c">Dashboard</Link>
              </li>
              <ClerkLoaded>
                <SignedIn>
                  {isAdmin && (
                    <li>
                      <Link href="/admincp">Admin Panel</Link>
                      <span className="ml-4">
                        <Link href="/admincp/categories">Categories</Link>
                      </span>
                      <span className="ml-4">
                        <Link href="/admincp/books">Books</Link>
                      </span>
                    </li>
                  )}
                  {isMod && (
                    <li>
                      <Link href="/mod">Mod Panel</Link>
                    </li>
                  )}
                </SignedIn>
              </ClerkLoaded>
            </ul>
          </div>

          <label htmlFor="my-drawer-2" className=" drawer-button lg:hidden">
            <FaCircleRight />
          </label>
        </div>
        <div className="navbar-center">
          <a className="btn btn-ghost text-xl">{sitename}</a>
        </div>
        <div className="navbar-end">
          <ThemeToggle />
          <ClerkLoading>
            <span className="loading loading-dots loading-md"></span>
          </ClerkLoading>
          <ClerkLoaded>
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <Link href={"/sign-in"}>Login/Register</Link>
            </SignedOut>
          </ClerkLoaded>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
