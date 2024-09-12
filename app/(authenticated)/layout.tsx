import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import { authOptions } from "../api/auth/[...nextauth]/route"
import Sidebar from "@/components/Sidebar"

export default async function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/signin')
  }

  return (
    <div className="flex dark:bg-slate-700 min-h-screen">
      <Sidebar />
      <main className="flex-1 p-4">
        {children}
      </main>
    </div>
  )
}