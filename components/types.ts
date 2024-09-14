export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  cover?: string;
  bio?: string;
  location?: string;
  website?: string;
  posts?: Post[];
  reactions?: Reaction[];
  comments?: Comment[];
  createdAt: string;
  updatedAt: string;
}

export interface Reaction {
  id: number;
  type: string;
  userId: string;
  user: User;
  postId: number;
  post: Post;
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: number;
  content: string;
  authorId: string;
  author: User;
  createdAt: string;
  updatedAt: string;
  postId: number;
  post: Post;
  reactions: Reaction[];
  comments: Comment[];
  parentId?: number;
  parent?: Comment;
  children?: Comment[];
}

export interface Post {
  reactionCount: number;
  groupedReactions: {
    reactionType: string;
    count: number;
  }[];
  id: number;
  content: string;
  image?: string;
  authorId: string;
  author: User;
  reactions: Reaction[];
  comments: Comment[];
  createdAt: string;
  updatedAt: string;
  commentsCount?: number;
}