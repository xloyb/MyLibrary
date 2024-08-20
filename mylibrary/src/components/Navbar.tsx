"use client"

import Image from 'next/image';
import Link from 'next/link';
import { FaCircleRight } from "react-icons/fa6";
import { MdOutlineAdminPanelSettings } from "react-icons/md";

const Navbar = () => {
    const sitename = "MyLibrary"; 

    return (
        <div>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className='mr-2'>
                            <svg 
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h7" />
                            </svg> 
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            <li><a href='/'>Home</a></li>
                            <li><a href='/c'>Dashboard</a></li>
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
                    {/* <ThemeToggle/> */}

                    {/* Hardcoded Admin Panel access */}
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="mr-2"> 
                            <MdOutlineAdminPanelSettings className='h-7 w-7' />
                        </div>
                        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                            <li>
                                test
                                
                            </li>
                            <li>
                            test
                               
                            </li>
                            <li>
                            test
                               
                            </li>
                        </ul>
                    </div>

                    {/* Static login/register link */}
                    {/* <div className="flex items-center gap-2 text-sm">
                        <Image src="/img/login.png" alt="" width={20} height={20} />
                        <Link href="/sign-in">Login/Register</Link>
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default Navbar;
