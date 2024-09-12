import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      include: {
        author: true,
        reactions: true,
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

    // Group reactions by type for each post
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
      };
    });
    console.log(postsWithGroupedReactions)
    return NextResponse.json(postsWithGroupedReactions);
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
