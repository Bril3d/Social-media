"use client"

import ProfileComponent from './ProfileComponent';

interface ProfileWrapperProps {
  user: {
    name: string;
    email: string;
    image?: string | null;
    slug: string;
    avatar: string;
    cover: string;
    bio: string;
    location: string;
    website: string;
    id: string;
  }
}

export default function ProfileWrapper({ user }: ProfileWrapperProps) {
  return <ProfileComponent user={user} />
}