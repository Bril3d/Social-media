"use client"

import { Feed } from './Feed'
import { Post } from './types'

interface FeedWrapperProps {
  initialPosts: Post[]
}

export default function FeedWrapper({ initialPosts }: FeedWrapperProps) {
  return <Feed initialPosts={initialPosts} />
}