import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
  return (

    <div className="flex items-center space-x-2">
      <div className="flex -space-x-1">

        {groupedReactions.length > 0 && groupedReactions.map((reaction) => (
          <TooltipProvider key={reaction.reactionType}>
            <Tooltip>
              <TooltipTrigger>
                <div className="w-5 h-5 rounded-full bg-white dark:bg-gray-700 shadow flex items-center justify-center">
                  {emojis[reaction.reactionType as keyof typeof emojis]}
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{reaction.count}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}

      </div>
      <span className="text-sm text-gray-500 dark:text-gray-400">{totalReactions || 0}</span>
      <div className="flex space-x-1">
        {Object.entries(emojis).map(([type, emoji], index) => (
          <Button key={index} variant="ghost" size="sm" className="p-1 text-gray-600 dark:text-gray-400" onClick={() => onReact(type)}>
            {emoji}
          </Button>
        ))}
      </div>
    </div>
  )
}