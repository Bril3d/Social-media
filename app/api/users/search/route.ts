import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json({ error: 'Search query is required' }, { status: 400 });
  }

  const session = await getServerSession(authOptions);
  const currentUserId = session?.user?.id;

  try {
    const users = await prisma.user.findMany({
      where: {
        AND: [
          {
            OR: [
              { name: { contains: query } },
              { email: { contains: query } },
            ],
          },
          {
            id: { not: currentUserId }, // Exclude the current user
          },
        ],
      },
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        slug: true,
      },
      take: 10,
    });

    return NextResponse.json(users);
  } catch (error) {
    console.error('Error searching users:', error);
    return NextResponse.json({ error: 'Error searching users' }, { status: 500 });
  }
}