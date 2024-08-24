// TeamStatusChecker.tsx

import { isAdmin, isTeam } from '@/lib/auth';
import React from 'react';
import { ClerkLoaded, ClerkLoading, SignedIn } from '@clerk/nextjs';
import { getUserByClerkUserId } from '@/lib/user';

const TeamStatusChecker: React.FC = async () => {
    // Fetch data directly from the server
    const clerkUserId = 'user_2ky0AVQcRk7XO5ccsevLo6M8U1S'; // Obtain this value as needed, e.g., from context or props
    const { isAdminMember, isTeamMember } = await fetchUserData(clerkUserId);

    if (isAdminMember === null && isTeamMember === null) {
        return <ClerkLoading><span className="loading loading-dots loading-md"></span></ClerkLoading>;
    }

    return (
        <ClerkLoaded>
            {isAdminMember && <li><a href="/c">Admin Access</a></li>}
            {isTeamMember && <li><a href="/c">Team Member Access</a></li>}
        </ClerkLoaded>
    );
};

// Function to fetch user data from the server
async function fetchUserData(clerkUserId: string) {
    let isAdminMember = false;
    let isTeamMember = false;

    try {
        const user = await getUserByClerkUserId(clerkUserId);
        if (user) {
            isAdminMember = user.isAdmin ?? false;
            isTeamMember = (user.isMod ?? false) || (user.isAdmin ?? false);
        }
    } catch (error) {
        console.error('Failed to check user status:', error);
    }

    return { isAdminMember, isTeamMember };
}

export default TeamStatusChecker;
