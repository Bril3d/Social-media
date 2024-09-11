import { Button } from "@/components/ui/button";

interface EmojiReactionsProps {
  reactions: { [key: string]: number };
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

export default function EmojiReactions({ reactions, totalReactions, onReact }: EmojiReactionsProps) {
  console.log(reactions)
  return (
    <div className="flex items-center space-x-2">
      <div className="flex -space-x-1">
        {reactions.length > 0 && reactions.map((reaction) => (
         
            <div key={reaction.id} className="w-5 h-5 rounded-full bg-white shadow flex items-center justify-center">
              {emojis[reaction.reactionType as keyof typeof emojis]}
            </div>
          
        ))}
      </div>
      <span className="text-sm text-gray-500">{totalReactions}</span>
      <div className="flex space-x-1">
        {Object.entries(emojis).map(([type, emoji],index) => (
          <Button key={index} variant="ghost" size="sm" className="p-1" onClick={() => onReact(type)}>
            {emoji}
          </Button>
        ))}
      </div>
    </div>
  )
}