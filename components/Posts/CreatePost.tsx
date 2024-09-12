import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { ImageIcon, SmileIcon, VideoIcon } from 'lucide-react'

interface CreatePostProps {
  onPostSubmit: (content: string) => void;
}

export default function CreatePost({ onPostSubmit }: CreatePostProps) {
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      onPostSubmit(content);
      setContent("");
    }
  };

  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <form onSubmit={handleSubmit}>
          <div className="flex items-center space-x-4 mb-4">
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Current User" />
              <AvatarFallback>CU</AvatarFallback>
            </Avatar>
            <Textarea
              placeholder="What's on your mind?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="flex-1"
            />
          </div>
          <div className="flex justify-between items-center">
            <div className="flex space-x-2">
              <Button type="button" variant="ghost" size="sm">
                <VideoIcon className="mr-2 h-4 w-4" />
                Live Video
              </Button>
              <Button type="button" variant="ghost" size="sm">
                <ImageIcon className="mr-2 h-4 w-4" />
                Photo/Video
              </Button>
              <Button type="button" variant="ghost" size="sm">
                <SmileIcon className="mr-2 h-4 w-4" />
                Feeling/Activity
              </Button>
            </div>
            <Button type="submit">Post</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}