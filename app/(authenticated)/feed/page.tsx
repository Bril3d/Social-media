import { getServerSession } from "next-auth/next"
import { authOptions } from "../../api/auth/[...nextauth]/route"
import prisma from '@/lib/prisma'
import FeedWrapper from "@/components/FeedWrapper.tsx"

export default async function FeedPage() {
	const session = await getServerSession(authOptions)

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
			reactions: undefined,
		};
	});

	return <FeedWrapper initialPosts={postsWithGroupedReactions} />
}