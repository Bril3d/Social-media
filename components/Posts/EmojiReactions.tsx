import { Button } from "@/components/ui/button";

interface EmojiReactionsProps {
  groupedReactions: { reactionType: string; count: number }[];
  totalReactions: number;
  onReact: (reactionType: string) => void;
}

const emojis = {
  like: "👍",
  love: "❤️",
  haha: "😂",
  wow: "😮",
  sad: "😢",
  angry: "😠",
};

export default function EmojiReactions({ groupedReactions, totalReactions, onReact }: EmojiReactionsProps) {
  console.log(groupedReactions)
  return (
    <div className="flex items-center space-x-2">
      <div className="flex -space-x-1">
        {groupedReactions.length > 0 && groupedReactions.map((reaction) => (
          <div key={reaction.reactionType} className="w-5 h-5 rounded-full bg-white shadow flex items-center justify-center">
            {emojis[reaction.reactionType as keyof typeof emojis]}
          </div>
        ))}
      </div>
      <span className="text-sm text-gray-500">{totalReactions || 0}</span>
      <div className="flex space-x-1">
        {Object.entries(emojis).map(([type, emoji], index) => (
          <Button key={index} variant="ghost" size="sm" className="p-1" onClick={() => onReact(type)}>
            {emoji}
          </Button>
        ))}
      </div>
    </div>
  )
}