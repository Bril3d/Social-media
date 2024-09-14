import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { writeFile } from 'fs/promises';
import { join } from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

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
    
    return NextResponse.json(postsWithGroupedReactions);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ error: 'Error fetching posts' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const content = formData.get('content') as string;
    const authorId = formData.get('authorId') as string;
    const imageFile = formData.get('image') as File | null;

    let imagePath = null;

    if (imageFile) {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const fileName = `${Date.now()}-${imageFile.name}`;
      const uploadDir = join(process.cwd(), 'public', 'uploads');
      const filePath = join(uploadDir, fileName);

      await writeFile(filePath, buffer);
      imagePath = `/uploads/${fileName}`;
    }

    const post = await prisma.post.create({
      data: {
        content,
        authorId,
        image: imagePath,
      },
      include: {
        author: true,
        reactions: true,
        comments: true,
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json({ error: 'Error creating post' }, { status: 500 });
  }
}
