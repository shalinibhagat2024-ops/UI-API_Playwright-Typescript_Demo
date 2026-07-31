import { UserAssertions } from "@api/modules/users/assertions/UserAssertions";
import { UserResponse } from "@api/modules/users/models/UserResponse";
import { StatusAssertions } from "@api/shared/assertions/StatusAssertions";
import { ResponseUtil } from "@api/shared/utils/ResponseUtil";
import { test } from "@fixtures/api.fixture";

test(
  "PUT - Update User",
  {
    tag: ["@api", "@sanity", "@apiUser", "@p2"],
  },
  async ({ userService }) => {
    await test.step("Update the user", async () => {
      const response = await userService.updateUser(1, {
        firstName: "Enterprise User",
      });

      StatusAssertions.verifySuccess(response);

      const user = await ResponseUtil.json<UserResponse>(response);

      UserAssertions.verifyUpdatedUser(response, user, "Enterprise User");
    });
  }
);
