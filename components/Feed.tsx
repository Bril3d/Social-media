'use client'

import { useState } from 'react'
import CreatePost from './Posts/CreatePost'
import PostList from './Posts/PostList'
import { Post } from './types'
import { Button } from './ui/button'
import { signOut } from 'next-auth/react'

interface FeedProps {
  initialPosts: Post[]
}

export function Feed({ initialPosts }: FeedProps) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);

  const addPost = async (content: string) => {
    const response = await fetch('/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content }),
    });

    if (response.ok) {
      const newPost = await response.json();
      setPosts([newPost, ...posts]);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Feed</h1>
        <Button variant="destructive" onClick={() => signOut({ callbackUrl: '/signin' })}>Sign Out</Button>
      </div>
      <CreatePost onPostSubmit={addPost} />
      <PostList posts={posts} />
    </div>
  );
}