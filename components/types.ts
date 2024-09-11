export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string; // Make avatar optional
}

export interface Reaction {
  id: number;
  type: string;
  userId: string;
  user: User;
}

export interface Comment {
  id: number;
  content: string;
  authorId: string;
  author: User;
  createdAt: string;
}

export interface Post {
  reactionCount: number;
  id: number;
  content: string;
  image?: string;
  authorId: string;
  author: User;
  reactions: Reaction[];
  comments: Comment[];
  createdAt: string;
  updatedAt: string;
}