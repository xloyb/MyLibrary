"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ClerkLoaded, SignedIn } from "@clerk/nextjs";
import { useAuth } from "@clerk/nextjs";

const DropdownMenu = () => {
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

    return (
        <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 p-2 shadow"
        >
            <li className="mt-2">
                <Link href="/" className="btn btn-outline btn-sm btn-primary w-full lg:w-auto">Home</Link>
            </li>
            
            <ClerkLoaded>
                <SignedIn>
                    
                    {isAdmin && (
                        <>
                            <li className="mt-2">
                                <Link href="/admincp" className="btn btn-outline btn-sm btn-warning w-full lg:w-auto">
                                    Admin Panel
                                </Link>
                            </li>
                            <li className="mt-2">
                                <Link href="/admincp/categories" className="btn btn-outline btn-sm btn-warning w-full lg:w-auto">
                                    Categories
                                </Link>
                            </li>
                            <li className="mt-2">
                                <Link href="/admincp/books" className="btn btn-outline btn-sm btn-warning w-full lg:w-auto">
                                    Books
                                </Link>
                            </li>
                        </>
                    )}
                    {isMod && (
                        <li className="mt-2">
                            <Link href="/mod" className="btn btn-outline btn-sm btn-warning w-full lg:w-auto">
                                Mod Panel
                            </Link>
                        </li>
                    )}

                </SignedIn>
            </ClerkLoaded>
        </ul>
    );
};

export default DropdownMenu;
