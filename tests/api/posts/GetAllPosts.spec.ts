import { PostAssertions } from "@api/modules/posts/assertions/PostAssertions";
import { PostListResponse } from "@api/modules/posts/models/PostListResponse";
import { SchemaAssertions } from "@api/shared/assertions/SchemaAssertions";
import { StatusAssertions } from "@api/shared/assertions/StatusAssertions";
import { Schemas } from "@api/shared/schemas/Schemas";
import { ResponseUtil } from "@api/shared/utils/ResponseUtil";
import { test } from "@fixtures/api.fixture";

test(
  "GET - Get All Posts",
  {
    tag: ["@api", "@regression", "@apiPost", "@p2"],
  },
  async ({ postService }) => {
    await test.step("Get all posts", async () => {
      const response = await postService.getAllPosts();

      StatusAssertions.verifySuccess(response);

      const posts = await ResponseUtil.json<PostListResponse>(response);

      SchemaAssertions.validate(Schemas.PostList, posts);

      PostAssertions.verifyPostList(posts);
    });
  }
);
