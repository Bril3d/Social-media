import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { postId, userId, reactionType } = await request.json();

    const result = await prisma.$transaction(async (prisma) => {
      // Check if a reaction already exists
      const existingReaction = await prisma.reaction.findUnique({
        where: {
          postId_userId: {
            postId,
            userId,
          },
        },
      });

      let react;
      let reactionCountDelta = 0;

      if (existingReaction) {
        // Update existing reaction
        react = await prisma.reaction.update({
          where: { id: existingReaction.id },
          data: { reactionType },
        });
      } else {
        // Create new reaction
        react = await prisma.reaction.create({
          data: {
            postId,
            userId,
            reactionType,
          },
        });
        reactionCountDelta = 1;
      }

      // Update post reaction count if necessary
      const updatedPost = await prisma.post.update({
        where: { id: postId },
        data: { reactionCount: { increment: reactionCountDelta } },
        include: {
          reactions: true,
        },
      });

      // Group reactions by type
      const groupedReactions = Object.entries(
        updatedPost.reactions.reduce((acc, reaction) => {
          acc[reaction.reactionType] = (acc[reaction.reactionType] || 0) + 1;
          return acc;
        }, {} as Record<string, number>)
      ).map(([reactionType, count]) => ({ reactionType, count }));

      return { 
        react, 
        updatedReactionCount: updatedPost.reactionCount,
        groupedReactions,
      };
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error handling reaction:', error);
    return NextResponse.json({ error: 'Error handling reaction' }, { status: 500 });
  }
}
