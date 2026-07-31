import { UserAssertions } from "@api/modules/users/assertions/UserAssertions";
import { UserBuilder } from "@api/modules/users/builders/UserBuilder";
import { UserResponse } from "@api/modules/users/models/UserResponse";
import { SchemaAssertions } from "@api/shared/assertions/SchemaAssertions";
import { StatusAssertions } from "@api/shared/assertions/StatusAssertions";
import { HttpStatus } from "@api/shared/constants/HttpStatus";
import { Schemas } from "@api/shared/schemas/Schemas";
import { ResponseUtil } from "@api/shared/utils/ResponseUtil";
import { test } from "@fixtures/api.fixture";

test(
  "POST - Create User",
  {
    tag: ["@api", "@sanity", "@apiUser", "@p2"],
  },
  async ({ userService }) => {
    await test.step("Create a new user", async () => {
      const userRequest = UserBuilder.create().build();

      const response = await userService.addUser(userRequest);

      StatusAssertions.verifyStatus(response, HttpStatus.CREATED);

      const user = await ResponseUtil.json<UserResponse>(response);

      SchemaAssertions.validate(Schemas.User, user);

      UserAssertions.verifyCreatedUser(response, userRequest, user);
    });
  }
);
