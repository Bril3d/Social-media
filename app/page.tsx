import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import { authOptions } from "./api/auth/[...nextauth]/route"
import { App } from "@/components/app"
import prisma from '@/lib/prisma'

export default async function Page() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/signin')
  }

  const posts = await prisma.post.findMany({
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true,
          avatar: true,
        },
      },
      reactions: true,
      comments: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return <App initialPosts={posts} />
}