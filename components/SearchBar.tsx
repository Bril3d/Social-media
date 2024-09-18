'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { User } from './types'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useSession } from 'next-auth/react'

export default function SearchBar() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const { data: session } = useSession()

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    const searchUsers = async () => {
      if (query.length < 2) {
        setResults([])
        return
      }

      setIsLoading(true)
      try {
        const response = await fetch(`/api/users/search?q=${encodeURIComponent(query)}`)
        if (response.ok) {
          const data = await response.json()
          setResults(data)
          setShowResults(true)
        }
      } catch (error) {
        console.error('Error searching users:', error)
      } finally {
        setIsLoading(false)
      }
    }

    const debounce = setTimeout(searchUsers, 300)
    return () => clearTimeout(debounce)
  }, [query])

  const handleSendFriendRequest = async (userId: string) => {
    if (!session) {
      console.error('User not authenticated')
      return
    }

    try {
      const response = await fetch('/api/friends/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ receiverId: userId }),
      })

      if (response.ok) {
        console.log('Friend request sent successfully')
        // You can update the UI here to reflect the sent request
      } else {
        const data = await response.json()
        console.error('Error sending friend request:', data.error)
      }
    } catch (error) {
      console.error('Error sending friend request:', error)
    }
  }

  return (
    <div className="relative" ref={searchRef}>
      <Input
        type="text"
        placeholder="Search users..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full"
      />
      {showResults && (
        <div className="absolute z-10 w-full mt-1 bg-white dark:bg-slate-700 rounded-md shadow-lg">
          {isLoading ? (
            <div className="p-2 text-center">Loading...</div>
          ) : results.length > 0 ? (
            <ul>
              {results.map((user) => (
                <li key={user.id} className="flex items-center justify-between p-2 hover:bg-gray-100 hover:dark:bg-slate-600">
                  <div className="flex items-center" onClick={() => router.push(`/profile/${user.slug}`)}>
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage src={user.avatar || undefined} />
                      <AvatarFallback>{user.name[0]}</AvatarFallback>
                    </Avatar>
                    <span>{user.name}</span>
                  </div>
                  <Button onClick={() => handleSendFriendRequest(user.id)} size="sm">
                    Add Friend
                  </Button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-2 text-center dark:bg-slate-700">No users found</div>
          )}
        </div>
      )}
    </div>
  )
}