import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      include: {
        author: true,
        reactions: {
          include: {
            user: true,
          },
        },
        comments: {
          include: {
            author: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ error: 'Error fetching posts' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { content, authorId, image } = await request.json();
    const post = await prisma.post.create({
      data: {
        content,
        authorId,
        image,
      },
      include: {
        author: true,
        reactions: true,
        comments: true,
      },
    });
    return NextResponse.json(post);
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json({ error: 'Error creating post' }, { status: 500 });
  }
}
