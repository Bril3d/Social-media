import Post from './Post.tsx';
import { Post as PostType } from '../types.js';

interface PostListProps {
  posts: PostType[];
}

export default function PostList({ posts }: PostListProps) {
  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  )
}