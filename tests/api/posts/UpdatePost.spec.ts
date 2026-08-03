import { PostAssertions } from "@api/modules/posts/assertions/PostAssertions";
import { PostBuilder } from "@api/modules/posts/builders/PostBuilder";
import { PostResponse } from "@api/modules/posts/models/PostResponse";
import { SchemaAssertions } from "@api/shared/assertions/SchemaAssertions";
import { Schemas } from "@api/shared/schemas/Schemas";
import { ResponseUtil } from "@api/shared/utils/ResponseUtil";
import { test } from "@fixtures/api.fixture";

test(
  "PUT - Update Post",
  {
    tag: ["@api", "@regression", "@apiPost", "@p2"],
  },
  async ({ postService }) => {
    await test.step("Update existing post", async () => {
      const request = await PostBuilder.fromJson("posts/updatePost.json");

      const response = await postService.updatePost(1, request);

      const post = await ResponseUtil.json<PostResponse>(response);

      SchemaAssertions.validate(Schemas.Post, post);

      PostAssertions.verifyUpdatedPost(response, post, request.title!, request.body!);
    });
  }
);
