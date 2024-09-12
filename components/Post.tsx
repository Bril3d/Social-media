import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { MessageCircleIcon, ShareIcon } from 'lucide-react'
import { Post as PostType } from './types.ts'
import EmojiReactions from './EmojiReactions'
import { useSession } from "next-auth/react"
import { useState } from 'react'

interface PostProps {
  post: PostType;
}

export default function Post({ post }: PostProps) {
  const { data: session } = useSession()
  const [groupedReactions, setGroupedReactions] = useState(post.groupedReactions || []);
  const [totalReactions, setTotalReactions] = useState(post.reactionCount || 0);

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const handleReact = async (reactionType: string) => {
    if (!session?.user?.id) return;

    // Optimistic update
    setGroupedReactions(prev => {
      const existingReaction = prev.find(r => r.reactionType === reactionType);
      if (existingReaction) {
        return prev.map(r => 
          r.reactionType === reactionType 
            ? { ...r, count: r.count + 1 }
            : r
        );
      } else {
        return [...prev, { reactionType, count: 1 }];
      }
    });
    setTotalReactions(prev => prev + 1);

    try {
      const response = await fetch('/api/react', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId: post.id, reactionType, userId: session.user.id }),
      });

      if (!response.ok) throw new Error('Failed to react');

      const { groupedReactions: updatedGroupedReactions, reactionCount } = await response.json();

      // Update with server response
      setGroupedReactions(updatedGroupedReactions);
      setTotalReactions(reactionCount);
    } catch (error) {
      console.error('Error reacting to post:', error);
      // Revert optimistic update on error
      setGroupedReactions(prev => 
        prev.map(r => 
          r.reactionType === reactionType 
            ? { ...r, count: Math.max(0, r.count - 1) }
            : r
        ).filter(r => r.count > 0)
      );
      setTotalReactions(prev => prev - 1);
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src={post.author?.avatar} alt={post.author?.name} />
            <AvatarFallback>{post.author?.name.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">{post.author.name}</p>
            <p className="text-sm text-gray-500">{formatTimestamp(post.createdAt)}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p>{post.content}</p>
        {post.image && (
          <img src={post.image} alt="Post image" className="mt-4 rounded-lg w-full" />
        )}
      </CardContent>
      <CardFooter className="flex flex-col items-start">
        <EmojiReactions
          totalReactions={totalReactions}
          groupedReactions={groupedReactions || {}}
          onReact={handleReact}
        />
        <div className="flex justify-between w-full mt-2">
          <Button variant="ghost" size="sm">
            <MessageCircleIcon className="w-5 h-5 mr-2" />
            Comment
          </Button>
          <Button variant="ghost" size="sm">
            <ShareIcon className="w-5 h-5 mr-2" />
            Share
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}