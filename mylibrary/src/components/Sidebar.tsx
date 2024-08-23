


/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Link from 'next/link';
import SidebarCategories from './categories/SidebarCategories';



const staticSettings = {
  sitename: "MyLibrary",
  //   logo: '/icon.png'
};

const Sidebar = () => {
  return (
    <div className='h-screen overflow-hidden sticky top-0 z-30 overflow-x-hidden '>
      <div className="z-50 drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center">
          {/* Page content here */}
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
          <ul className="menu bg-base-100 text-base-content min-h-full w-80 p-4 flex flex-col ">
            <li className="mb-2 font-semibold text-xl">
              <Link href={'/c'}>
                <img src='https://mydevify.com/assets/xLoyMybb.5944be68.png' alt="MyLibrary by MyDevify.com" width={30} height={30} /> MyDevify.com
              </Link>
            </li>
            {/* Sidebar content here */}
          <SidebarCategories />
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
