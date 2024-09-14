import { useState, useRef, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { ImageIcon, SmileIcon, VideoIcon } from 'lucide-react'

interface CreatePostProps {
  onPostSubmit: (post: any) => void;
}

export default function CreatePost({ onPostSubmit }: CreatePostProps) {
  const [content, setContent] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { data: session } = useSession()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setImage(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    if (!session?.user?.id || isSubmitting || !content.trim()) return

    setIsSubmitting(true)

    const formData = new FormData()
    formData.append('content', content)
    formData.append('authorId', session.user.id)
    if (image) {
      formData.append('image', image)
    }

    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        const newPost = await response.json()
        onPostSubmit(newPost)
        setContent('')
        setImage(null)
        setImagePreview(null)
      } else {
        console.error('Failed to create post')
      }
    } catch (error) {
      console.error('Error creating post:', error)
    } finally {
      setIsSubmitting(false)
    }
  }, [session, isSubmitting, content, image, onPostSubmit])

  return (
    <Card className="mb-4">
      <CardContent className="pt-4">
        <form onSubmit={handleSubmit}>
          <div className="flex items-start space-x-4">
            <Avatar>
              <AvatarImage src={session?.user?.image || undefined} />
              <AvatarFallback>{session?.user?.name?.[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <Textarea
                placeholder="What's on your mind?"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[100px]"
              />
              {imagePreview && (
                <div className="mt-2">
                  <img src={imagePreview} alt="Preview" className="max-w-full h-auto" />
                </div>
              )}
              <div className="flex justify-between items-center mt-4">
                <div className="flex space-x-2">
                  <Button type="button" variant="ghost" size="sm" onClick={() => fileInputRef.current?.click()}>
                    <ImageIcon className="mr-2 h-4 w-4" />
                    Image
                  </Button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    accept="image/*"
                    className="hidden"
                  />
                  <Button type="button" variant="ghost" size="sm">
                    <VideoIcon className="mr-2 h-4 w-4" />
                    Video
                  </Button>
                  <Button type="button" variant="ghost" size="sm">
                    <SmileIcon className="mr-2 h-4 w-4" />
                    Feeling
                  </Button>
                </div>
                <Button 
                  type="submit" 
                  disabled={isSubmitting || !content.trim()}
                >
                  {isSubmitting ? 'Posting...' : 'Post'}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}