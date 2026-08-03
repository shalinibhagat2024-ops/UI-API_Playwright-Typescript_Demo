import { PostAssertions } from "@api/modules/posts/assertions/PostAssertions";
import { StatusAssertions } from "@api/shared/assertions/StatusAssertions";
import { test } from "@fixtures/api.fixture";

test(
  "DELETE - Delete Post",
  {
    tag: ["@api", "@regression", "@apiPost", "@p2"],
  },
  async ({ postService }) => {
    await test.step("Delete existing post", async () => {
      const response = await postService.deletePost(1);

      StatusAssertions.verifySuccess(response);

      PostAssertions.verifyDeletedPost(response);
    });
  }
);
