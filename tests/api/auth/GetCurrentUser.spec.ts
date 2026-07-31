import { AuthBuilder } from "@api/modules/auth/builders/AuthBuilder";
import { CurrentUserResponse } from "@api/modules/auth/models/CurrentUserResponse";
import { LoginResponse } from "@api/modules/auth/models/LoginResponse";
import { CommonAssertions } from "@api/shared/assertions/CommonAssertions";
import { StatusAssertions } from "@api/shared/assertions/StatusAssertions";
import { ResponseUtil } from "@api/shared/utils/ResponseUtil";
import { test } from "@fixtures/api.fixture";

test(
  "GET - Current User",
  {
    tag: ["@api", "@smoke", "@regression", "@p2"],
  },
  async ({ authService }) => {
    let login: LoginResponse;

    await test.step("Authenticate user", async () => {
      const loginResponse = await authService.login(AuthBuilder.defaultLogin());

      StatusAssertions.verifySuccess(loginResponse);

      login = await ResponseUtil.json<LoginResponse>(loginResponse);
    });

    await test.step("Retrieve current user", async () => {
      const response = await authService.getCurrentUser(login.accessToken);

      StatusAssertions.verifySuccess(response);

      const user = await ResponseUtil.json<CurrentUserResponse>(response);

      CommonAssertions.verifyId(user.id);
    });
  }
);
