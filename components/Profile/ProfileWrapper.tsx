"use client"

import ProfileComponent from './ProfileComponent';

interface ProfileWrapperProps {
  user: {
    name: string;
    email: string;
    image?: string | null;
    // Add other user fields as needed
  }
}

export default function ProfileWrapper({ user }: ProfileWrapperProps) {
  return <ProfileComponent user={user} />
}