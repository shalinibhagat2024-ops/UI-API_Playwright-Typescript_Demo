import { StatusAssertions } from "@api/shared/assertions/StatusAssertions";
import { test } from "@fixtures/api.fixture";

test(
  "DELETE - Delete User",
  {
    tag: ["@api", "@sanity", "@apiUser", "@p2"],
  },
  async ({ userService }) => {
    await test.step("Delete the user", async () => {
      const response = await userService.deleteUser(1);

      StatusAssertions.verifySuccess(response);
    });
  }
);
