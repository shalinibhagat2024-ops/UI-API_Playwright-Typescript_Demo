import { UserAssertions } from "@api/modules/users/assertions/UserAssertions";
import { UserResponse } from "@api/modules/users/models/UserResponse";
import { SchemaAssertions } from "@api/shared/assertions/SchemaAssertions";
import { StatusAssertions } from "@api/shared/assertions/StatusAssertions";
import { Schemas } from "@api/shared/schemas/Schemas";
import { ResponseUtil } from "@api/shared/utils/ResponseUtil";
import { test } from "@fixtures/api.fixture";

test(
  "GET - Get User By Id",
  {
    tag: ["@api", "@sanity", "@apiUser", "@p2"],
  },
  async ({ userService }) => {
    await test.step("Retrieve user by ID", async () => {
      const response = await userService.getUserById(1);

      StatusAssertions.verifySuccess(response);

      const user = await ResponseUtil.json<UserResponse>(response);

      SchemaAssertions.validate(Schemas.User, user);

      UserAssertions.verifyUser(user);
    });
  }
);
