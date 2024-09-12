'use client'

import { useState, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import Sidebar from './Sidebar'
import CreatePost from './Posts/CreatePost'
import PostList from './Posts/PostList'
import PostSkeleton from './Posts/PostSkeleton'
import { Post } from './types'
import { Button } from './ui/button'
import { ModeToggle } from './ModeToggle'

interface AppProps {
  initialPosts: Post[]
}

export function App({ initialPosts }: AppProps) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [isLoading, setIsLoading] = useState(true);
  const { data: session, status } = useSession();

  useEffect(() => {
    console.log("Client-side session:", session);
    console.log("Session status:", status);
    if (status !== "loading") {
      setIsLoading(false);
    }
  }, [session, status]);

  const addPost = async (content: string) => {
    if (!session?.user?.id) {
      console.error('User not authenticated');
      return;
    }

    const response = await fetch('/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content,
        authorId: session.user.id,
      }),
    });

    if (response.ok) {
      const newPost = await response.json();
      setPosts([newPost, ...posts]);
    }
  };

  if (status === "loading") {
    return (
      <div className="flex bg-gray-100 dark:bg-slate-900 min-h-screen">
        <Sidebar />
        <main className="flex-1 p-4">
          <div className="space-y-4">
            {[...Array(3)].map((_, index) => (
              <PostSkeleton key={index} />
            ))}
          </div>
        </main>
      </div>
    );
  }

  if (!session) {
    return <div>Not authenticated</div>
  }

  return (
    <div className="flex bg-gray-100 dark:bg-slate-900 min-h-screen">
      <Sidebar />
      <main className="flex-1 p-4">
        <div className="flex justify-between items-center py-4">
          <p>Welcome, {session.user?.name}</p>
          <div className="flex items-center space-x-4">
            <ModeToggle />
            <Button variant="destructive" onClick={() => signOut({ callbackUrl: '/signin' })}>Sign Out</Button>
          </div>
        </div>
        <CreatePost onPostSubmit={addPost} />
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, index) => (
              <PostSkeleton key={index} />
            ))}
          </div>
        ) : (
          <PostList posts={posts} />
        )}
      </main>
    </div>
  );
}