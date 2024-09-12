'use client'

import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { HomeIcon, UserIcon, BellIcon, SettingsIcon } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { ModeToggle } from './ModeToggle'

export default function Sidebar() {
	const { data: session } = useSession()

	return (
		<div className="w-64 bg-card text-card-foreground p-4 shadow-md flex flex-col min-h-full">
			<div className="flex items-center space-x-4 mb-6">
				<Avatar>
					<AvatarImage src={session?.user?.image || undefined} />
					<AvatarFallback>{session?.user?.name?.[0]}</AvatarFallback>
				</Avatar>
				<div>
					<p className="font-semibold">{session?.user?.name}</p>
					<p className="text-sm text-muted-foreground">View your profile</p>
				</div>
			</div>
			<nav className="space-y-2 flex-grow">
				<Button variant="ghost" className="w-full justify-start" asChild>
					<Link href="/feed">
						<HomeIcon className="mr-2 h-4 w-4" />
						Feed
					</Link>
				</Button>
				<Button variant="ghost" className="w-full justify-start" asChild>
					<Link href="/profile">
						<UserIcon className="mr-2 h-4 w-4" />
						Profile
					</Link>
				</Button>
				<Button variant="ghost" className="w-full justify-start" asChild>
					<Link href="/notifications">
						<BellIcon className="mr-2 h-4 w-4" />
						Notifications
					</Link>
				</Button>
				<Button variant="ghost" className="w-full justify-start" asChild>
					<Link href="/settings">
						<SettingsIcon className="mr-2 h-4 w-4" />
						Settings
					</Link>
				</Button>
			</nav>
			<div className="mt-auto">
				<ModeToggle />
			</div>
		</div>
	)
}