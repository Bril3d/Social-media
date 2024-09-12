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

  // Group reactions for each post
  const postsWithGroupedReactions = posts.map(post => {
    const groupedReactions = post.reactions.reduce((acc, reaction) => {
      acc[reaction.reactionType] = (acc[reaction.reactionType] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      ...post,
      groupedReactions: Object.entries(groupedReactions).map(([reactionType, count]) => ({
        reactionType,
        count,
      })),
      reactionCount: post.reactions.length,
      reactions: undefined, // Remove the original reactions array to reduce data sent to client
    };
  });

  return <App initialPosts={postsWithGroupedReactions} />
}