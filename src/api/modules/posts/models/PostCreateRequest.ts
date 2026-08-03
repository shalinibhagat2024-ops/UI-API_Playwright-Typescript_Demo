export interface PostCreateRequest {
  title: string;

  body: string;

  userId: number;

  tags?: string[];

  reactions?: {
    likes: number;
    dislikes: number;
  };
}
