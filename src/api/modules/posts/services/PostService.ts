import { ApiClient } from "@api/core/client/ApiClient";
import { PostCreateRequest } from "@api/modules/posts/models/PostCreateRequest";
import { PostUpdateRequest } from "@api/modules/posts/models/PostUpdateRequest";
import { ApiEndpoints } from "@api/shared/endpoints/ApiEndpoints";
import { BaseCrudService } from "@api/shared/services/BaseCrudService";

export class PostService extends BaseCrudService<PostCreateRequest> {
  constructor(apiClient: ApiClient) {
    super(apiClient, ApiEndpoints.POSTS.ALL);
  }

  async getAllPosts() {
    return this.getAll();
  }

  async getPostById(id: number) {
    return this.getById(id);
  }

  async addPost(request: PostCreateRequest) {
    return this.create(request);
  }

  async updatePost(id: number, request: Partial<PostUpdateRequest>) {
    return this.update(id, request);
  }

  async deletePost(id: number) {
    return this.delete(id);
  }

  async searchPosts(search: string) {
    return this.apiClient.get(ApiEndpoints.POSTS.SEARCH, {
      queryParams: {
        q: search,
      },
    });
  }

  async getPostsByUser(userId: number) {
    return this.apiClient.get(ApiEndpoints.POSTS.USER(userId));
  }

  async getPostsByTag(tag: string) {
    return this.apiClient.get(ApiEndpoints.POSTS.TAG(tag));
  }
}
