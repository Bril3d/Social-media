import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { App } from "@/components/app"
import prisma from '@/lib/prisma'

export default async function Page() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/signin')
  }

  const posts = await prisma.post.findMany({
    include: {
      author: true,
      reactions: true,
      comments: true,
    },
  });

  return <App initialPosts={posts} />
}