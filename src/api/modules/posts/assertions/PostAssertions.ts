import { PostCreateRequest } from "@api/modules/posts/models/PostCreateRequest";
import { PostListResponse } from "@api/modules/posts/models/PostListResponse";
import { PostResponse } from "@api/modules/posts/models/PostResponse";
import { CommonAssertions } from "@api/shared/assertions/CommonAssertions";
import { StatusAssertions } from "@api/shared/assertions/StatusAssertions";
import { HttpStatus } from "@api/shared/constants/HttpStatus";
import { APIResponse, expect } from "@playwright/test";

export class PostAssertions {
  // =====================================
  // Basic Validation
  // =====================================

  static verifyPost(post: PostResponse): void {
    CommonAssertions.verifyId(post.id);

    CommonAssertions.verifyNotEmpty(post.title);

    CommonAssertions.verifyNotEmpty(post.body);

    CommonAssertions.verifyGreaterThan(post.userId, 0);

    if (post.tags) {
      CommonAssertions.verifyArrayNotEmpty(post.tags);
    }

    if (post.reactions) {
      CommonAssertions.verifyGreaterThanOrEqual(post.reactions.likes, 0);

      CommonAssertions.verifyGreaterThanOrEqual(post.reactions.dislikes, 0);
    }

    if (post.views !== undefined) {
      CommonAssertions.verifyGreaterThanOrEqual(post.views, 0);
    }
  }

  static verifyPostList(posts: PostListResponse): void {
    CommonAssertions.verifyArrayNotEmpty(posts.posts);

    CommonAssertions.verifyGreaterThan(posts.total, 0);

    CommonAssertions.verifyGreaterThan(posts.limit, 0);
  }

  // =====================================
  // CRUD Validation
  // =====================================

  static verifyCreatedPost(
    response: APIResponse,
    request: PostCreateRequest,
    post: PostResponse
  ): void {
    StatusAssertions.verifyStatus(response, HttpStatus.CREATED);

    this.verifyPost(post);

    CommonAssertions.verifyString(post.title, request.title);

    CommonAssertions.verifyString(post.body, request.body);

    CommonAssertions.verifyNumber(post.userId, request.userId);

    if (request.tags && post.tags) {
      expect(post.tags).toStrictEqual(request.tags);
    }

    if (request.reactions && post.reactions) {
      expect(post.reactions).toStrictEqual(request.reactions);
    }
  }

  static verifyUpdatedPost(
    response: APIResponse,
    post: PostResponse,
    expectedTitle: string,
    expectedBody: string
  ): void {
    StatusAssertions.verifySuccess(response);

    this.verifyPost(post);

    CommonAssertions.verifyString(post.title, expectedTitle);

    CommonAssertions.verifyString(post.body, expectedBody);
  }

  static verifyDeletedPost(response: APIResponse): void {
    StatusAssertions.verifySuccess(response);
  }

  // =====================================
  // Workflow Validation
  // =====================================

  static verifyPostWorkflow(
    response: APIResponse,
    request: PostCreateRequest,
    post: PostResponse
  ): void {
    this.verifyCreatedPost(response, request, post);
  }
}
