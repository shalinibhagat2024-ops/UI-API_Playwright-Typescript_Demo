import { PostAssertions } from "@api/modules/posts/assertions/PostAssertions";
import { PostResponse } from "@api/modules/posts/models/PostResponse";
import { SchemaAssertions } from "@api/shared/assertions/SchemaAssertions";
import { StatusAssertions } from "@api/shared/assertions/StatusAssertions";
import { Schemas } from "@api/shared/schemas/Schemas";
import { ResponseUtil } from "@api/shared/utils/ResponseUtil";
import { test } from "@fixtures/api.fixture";

test(
  "GET - Get Post By Id",
  {
    tag: ["@api", "@regression", "@apiPost", "@p2"],
  },
  async ({ postService }) => {
    await test.step("Get post by id", async () => {
      const response = await postService.getPostById(1);

      StatusAssertions.verifySuccess(response);

      const post = await ResponseUtil.json<PostResponse>(response);

      SchemaAssertions.validate(Schemas.Post, post);

      PostAssertions.verifyPost(post);
    });
  }
);
