import Link from 'next/link'
import {
  Avatar, AvatarFallback,

  AvatarImage
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { HomeIcon, UserIcon, BellIcon, SettingsIcon } from 'lucide-react'
import { useSession } from 'next-auth/react'

export default function Sidebar() {
  const { data: session } = useSession()
  return (
    <div className="w-64 bg-white dark:bg-gray-800 p-4 shadow-md flex flex-col h-screen">
      <div className="flex items-center space-x-4 mb-6">
        <Avatar className="w-12 h-12">
          <AvatarImage src={session?.user?.image || "/placeholder.svg?height=48&width=48"} alt="Current User" />
          <AvatarFallback className='capitalize'>{session?.user?.name?.charAt(0) || 'CU'}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold capitalize text-gray-900 dark:text-gray-100">{session?.user?.name}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">View your profile</p>
        </div>
      </div>
      <nav className="space-y-2">
        <Button variant="ghost" className="w-full justify-start text-gray-700 dark:text-gray-300" asChild>
          <Link href="/">
            <HomeIcon className="mr-2 h-4 w-4" />
            Home
          </Link>
        </Button>
        <Button variant="ghost" className="w-full justify-start text-gray-700 dark:text-gray-300" asChild>
          <Link href="/friends">
            <UserIcon className="mr-2 h-4 w-4" />
            Friends
          </Link>
        </Button>
        <Button variant="ghost" className="w-full justify-start text-gray-700 dark:text-gray-300" asChild>
          <Link href="/notifications">
            <BellIcon className="mr-2 h-4 w-4" />
            Notifications
          </Link>
        </Button>
        <Button variant="ghost" className="w-full justify-start text-gray-700 dark:text-gray-300" asChild>
          <Link href="/settings">
            <SettingsIcon className="mr-2 h-4 w-4" />
            Settings
          </Link>
        </Button>
      </nav>
    </div>
  )
}