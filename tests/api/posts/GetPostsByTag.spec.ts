import { PostAssertions } from "@api/modules/posts/assertions/PostAssertions";
import { PostListResponse } from "@api/modules/posts/models/PostListResponse";
import { SchemaAssertions } from "@api/shared/assertions/SchemaAssertions";
import { Schemas } from "@api/shared/schemas/Schemas";
import { ResponseUtil } from "@api/shared/utils/ResponseUtil";
import { test } from "@fixtures/api.fixture";

test(
  "GET - Get Posts By Tag",
  {
    tag: ["@api", "@regression", "@apiPost", "@p2"],
  },
  async ({ postService }) => {
    await test.step("Get posts by tag", async () => {
      const response = await postService.getPostsByTag("history");

      const posts = await ResponseUtil.json<PostListResponse>(response);

      SchemaAssertions.validate(Schemas.PostList, posts);

      PostAssertions.verifyPostList(posts);
    });
  }
);
