import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { ImageIcon, SmileIcon, VideoIcon } from 'lucide-react'
import { useSession } from 'next-auth/react'

interface CreatePostProps {
  onPostSubmit: (content: string) => void;
}

export default function CreatePost({ onPostSubmit }: CreatePostProps) {
  const [content, setContent] = useState("");
  const { data: session } = useSession();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      onPostSubmit(content);
      setContent("");
    }
  };

  return (
    <Card className="mb-4 bg-white dark:bg-gray-800">
      <CardContent className="pt-4">
        <form onSubmit={handleSubmit}>
          <div className="flex items-start space-x-4">
            <Avatar>
              <AvatarImage src={session?.user?.image || undefined} />
              <AvatarFallback>{session?.user?.name?.[0]}</AvatarFallback>
            </Avatar>
            <Textarea
              placeholder="What's on your mind?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="flex-grow bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>
          <div className="flex justify-between items-center mt-4">
            <div className="flex space-x-2">
              <Button type="button" variant="ghost" size="sm" className="text-gray-600 dark:text-gray-400">
                <ImageIcon className="w-5 h-5 mr-2" />
                Image
              </Button>
              <Button type="button" variant="ghost" size="sm" className="text-gray-600 dark:text-gray-400">
                <VideoIcon className="w-5 h-5 mr-2" />
                Video
              </Button>
              <Button type="button" variant="ghost" size="sm" className="text-gray-600 dark:text-gray-400">
                <SmileIcon className="w-5 h-5 mr-2" />
                Feeling
              </Button>
            </div>
            <Button type="submit" disabled={!content.trim()}>Post</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}