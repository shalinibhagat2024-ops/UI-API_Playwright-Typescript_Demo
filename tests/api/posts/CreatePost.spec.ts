import { PostAssertions } from "@api/modules/posts/assertions/PostAssertions";
import { PostBuilder } from "@api/modules/posts/builders/PostBuilder";
import { PostResponse } from "@api/modules/posts/models/PostResponse";
import { SchemaAssertions } from "@api/shared/assertions/SchemaAssertions";
import { StatusAssertions } from "@api/shared/assertions/StatusAssertions";
import { HttpStatus } from "@api/shared/constants/HttpStatus";
import { Schemas } from "@api/shared/schemas/Schemas";
import { ResponseUtil } from "@api/shared/utils/ResponseUtil";
import { test } from "@fixtures/api.fixture";

test(
  "POST - Create Post",
  {
    tag: ["@api", "@sanity", "@apiPost", "@p2"],
  },
  async ({ postService }) => {
    await test.step("Create a new post", async () => {
      // Arrange
      const request = await PostBuilder.fromJson("posts/post.json");

      // Act
      const response = await postService.addPost(request);

      // Assert - Status Code
      StatusAssertions.verifyStatus(response, HttpStatus.CREATED);

      // Convert APIResponse -> PostResponse
      const post = await ResponseUtil.json<PostResponse>(response);

      // Schema Validation
      SchemaAssertions.validate(Schemas.Post, post);

      // Business Validation
      PostAssertions.verifyCreatedPost(response, request, post);
    });
  }
);
