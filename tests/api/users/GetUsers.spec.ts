import { UserAssertions } from "@api/modules/users/assertions/UserAssertions";
import { UserListResponse } from "@api/modules/users/models/UserListResponse";
import { SchemaAssertions } from "@api/shared/assertions/SchemaAssertions";
import { StatusAssertions } from "@api/shared/assertions/StatusAssertions";
import { Schemas } from "@api/shared/schemas/Schemas";
import { ResponseUtil } from "@api/shared/utils/ResponseUtil";
import { test } from "@fixtures/api.fixture";

test(
  "GET - Get All Users",
  {
    tag: ["@api", "@sanity", "@apiUser", "@p2"],
  },
  async ({ userService }) => {
    await test.step("Retrieve all users", async () => {
      const response = await userService.getAllUsers();

      StatusAssertions.verifySuccess(response);

      const users = await ResponseUtil.json<UserListResponse>(response);

      SchemaAssertions.validate(Schemas.UserList, users);

      UserAssertions.verifyUserList(users);
    });
  }
);
