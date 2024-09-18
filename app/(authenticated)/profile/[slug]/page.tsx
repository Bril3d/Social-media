
import ProfileWrapper from "@/components/Profile/ProfileWrapper.tsx"
import prisma from '@/lib/prisma'
import { useParams } from "next/navigation"

export default async function ProfilePage() {
  const params = useParams()
  const { slug } = params

  const user = await prisma.user.findUnique({
    where: { slug },
    include: {
      posts: {
        include: {
          author: true,
          reactions: true,
          comments: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      },
    },
  })

  if (!user) {
    throw new Error("User not found")
  }

  return <ProfileWrapper user={user} />
}