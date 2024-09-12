import { getServerSession } from "next-auth/next"
import { authOptions } from "../../api/auth/[...nextauth]/route"
import ProfileWrapper from "@/components/Profile/ProfileWrapper.tsx"
import prisma from '@/lib/prisma'

export default async function ProfilePage() {
  const session = await getServerSession(authOptions)

  const user = await prisma.user.findUnique({
    where: { id: session!.user.id },
  });

  if (!user) {
    throw new Error("User not found")
  }

  return <ProfileWrapper user={user} />
}