import { AuthAssertions } from "@api/modules/auth/assertions/AuthAssertions";
import { AuthBuilder } from "@api/modules/auth/builders/AuthBuilder";
import { LoginResponse } from "@api/modules/auth/models/LoginResponse";
import { StatusAssertions } from "@api/shared/assertions/StatusAssertions";
import { ResponseUtil } from "@api/shared/utils/ResponseUtil";
import { test } from "@fixtures/api.fixture";

test(
  "POST - Login",
  {
    tag: ["@api", "@smoke", "@regression", "@p1"],
  },
  async ({ authService }) => {
    await test.step("Authenticate user", async () => {
      const loginRequest = AuthBuilder.defaultLogin();

      const response = await authService.login(loginRequest);

      StatusAssertions.verifySuccess(response);

      const loginResponse = await ResponseUtil.json<LoginResponse>(response);

      AuthAssertions.verifyLogin(response, loginResponse);
    });
  }
);
