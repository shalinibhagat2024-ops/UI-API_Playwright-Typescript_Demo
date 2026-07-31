import { UserAssertions } from "@api/modules/users/assertions/UserAssertions";
import { UserListResponse } from "@api/modules/users/models/UserListResponse";
import { StatusAssertions } from "@api/shared/assertions/StatusAssertions";
import { ResponseUtil } from "@api/shared/utils/ResponseUtil";
import { test } from "@fixtures/api.fixture";

test(
  "Search User",
  {
    tag: ["@api", "@sanity", "@apiUser", "@p2"],
  },
  async ({ userService }) => {
    await test.step('Search users using keyword "John"', async () => {
      const response = await userService.searchUsers("John");

      StatusAssertions.verifySuccess(response);

      const users = await ResponseUtil.json<UserListResponse>(response);

      UserAssertions.verifyUsersExist(users);
    });
  }
);
