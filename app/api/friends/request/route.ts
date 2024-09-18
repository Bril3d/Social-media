import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import prisma from '@/lib/prisma';
import { authOptions } from '../../auth/[...nextauth]/route';

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { receiverId } = await req.json();

  try {
    const existingRequest = await prisma.friendRequest.findFirst({
      where: {
        OR: [
          { senderId: session.user.id, receiverId },
          { senderId: receiverId, receiverId: session.user.id },
        ],
      },
    });

    if (existingRequest) {
      return NextResponse.json({ error: 'Friend request already exists' }, { status: 400 });
    }

    const friendRequest = await prisma.friendRequest.create({
      data: {
        senderId: session.user.id,
        receiverId,
      },
    });

    return NextResponse.json(friendRequest);
  } catch (error) {
    console.error('Error sending friend request:', error);
    return NextResponse.json({ error: 'Error sending friend request' }, { status: 500 });
  }
}