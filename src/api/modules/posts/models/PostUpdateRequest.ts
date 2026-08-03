export interface PostUpdateRequest {
  title?: string;

  body?: string;

  userId?: number;

  tags?: string[];

  reactions?: {
    likes: number;
    dislikes: number;
  };
}
