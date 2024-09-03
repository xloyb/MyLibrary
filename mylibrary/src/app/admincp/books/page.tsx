"use client";
import DeniedAccessMotherFucker from "@/components/CustomPages/403";
import Loading from "@/components/Loading";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import ManageBooks from '@/components/admincp/books/ManageBooks'

const BooksPage = () => {
  const { user } = useUser();
  const [loading, setLoading] = useState<boolean>(true);
  // const [isAdminMember, setisAdminMember] = useState<boolean>(false);
  const [isTeamMember, setisTeamMember] = useState<boolean>(false);

  useEffect(() => {
    const fetchUserRoles = async () => {
      if (user?.id) {
        try {
          const response = await fetch(`/api/userRoles?clerkUserId=${user.id}`);
          if (response.ok) {
            const fetchedUser = await response.json();
            setisTeamMember(fetchedUser?.isAdmin || false);
            setLoading(false);
          } else {
            console.error('Failed to fetch user roles');
          }
        } catch (error) {
          console.error('Error fetching user roles:', error);
        }
      }
    };
    
    fetchUserRoles();
  }, [user]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      {isTeamMember ? <ManageBooks/> : <DeniedAccessMotherFucker />}
    </div>
  );
};


export default BooksPage


