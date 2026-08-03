import { PostResponse } from "./PostResponse";

export interface PostListResponse {
  posts: PostResponse[];

  total: number;

  skip: number;

  limit: number;
}
