"use client"

import React from 'react'
import { User, Settings, MapPin, Briefcase, Calendar } from 'lucide-react'
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from '../ui/button'
import { signOut } from 'next-auth/react'

interface ProfileProps {
  user: {
    name: string;
    email: string;
    image?: string | null;
    // Add other user fields as needed
  }
}

const ProfileComponent: React.FC<ProfileProps> = ({ user }) => {
  return (
    <div className="min-h-screen  text-foreground">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Profile</h1>
        <Button variant="destructive" onClick={() => signOut({ callbackUrl: '/signin' })}>Sign Out</Button>
      </div>
      <main className="max-w-7xl mx-auto">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-border rounded-lg h-96 mb-6 relative">
            <img
              src="/placeholder.svg?height=384&width=1024"
              alt="Cover"
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
              <div className="flex items-end space-x-4">
                <Avatar className="w-32 h-32 border-4 border-background">
                  <AvatarImage src={user.image || undefined} alt={user.name} />
                  <AvatarFallback>{user.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-3xl font-bold text-white">{user.name}</h2>
                  <p className="text-xl text-gray-300">{user.email}</p>
                </div>
              </div>
            </div>
          </div>
          <Card>
            <CardHeader>
              <h3 className="text-lg font-medium">User Information</h3>
              <p className="text-sm text-muted-foreground">Personal details and application.</p>
            </CardHeader>
            <CardContent>
              <dl className="divide-y divide-border">
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="text-sm font-medium text-muted-foreground flex items-center">
                    <User className="mr-2" size={20} />
                    Full name
                  </dt>
                  <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">{user.name}</dd>
                </div>
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="text-sm font-medium text-muted-foreground flex items-center">
                    <MapPin className="mr-2" size={20} />
                    Location
                  </dt>
                  <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">San Francisco, CA</dd>
                </div>
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="text-sm font-medium text-muted-foreground flex items-center">
                    <Briefcase className="mr-2" size={20} />
                    Occupation
                  </dt>
                  <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">Software Engineer</dd>
                </div>
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="text-sm font-medium text-muted-foreground flex items-center">
                    <Calendar className="mr-2" size={20} />
                    Joined
                  </dt>
                  <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">January 2020</dd>
                </div>
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="text-sm font-medium text-muted-foreground flex items-center">
                    <Settings className="mr-2" size={20} />
                    Bio
                  </dt>
                  <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">
                    Passionate about technology and building great products. Love to travel and explore new cultures.
                  </dd>
                </div>
              </dl>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

export default ProfileComponent