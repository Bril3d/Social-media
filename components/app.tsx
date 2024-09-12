'use client'

import { useState, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import Sidebar from './Sidebar'
import CreatePost from './CreatePost'
import PostList from './PostList'
import { Post } from './types'
import { Button } from './ui/button'

interface AppProps {
  initialPosts: Post[]
}

export function App({ initialPosts }: AppProps) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  console.log(initialPosts)
  const { data: session, status } = useSession();

  useEffect(() => {
    console.log("Client-side session:", session);
    console.log("Session status:", status);
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
    return <div>Loading...</div>
  }

  if (!session) {
    return <div>Not authenticated</div>
  }

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />
      <main className="flex-1 p-4">
        <div className="flex justify-between items-center py-4">
          <p>Welcome, {session.user?.name}</p>
          <Button variant="destructive" onClick={() => signOut({ callbackUrl: '/signin' })}>Sign Out</Button>
        </div>
        <CreatePost onPostSubmit={addPost} />
        <PostList posts={posts} />
      </main>
    </div>
  );
}