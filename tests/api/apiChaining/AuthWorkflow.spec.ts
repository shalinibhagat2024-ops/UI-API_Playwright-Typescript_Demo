import { AuthAssertions } from "@api/modules/auth/assertions/AuthAssertions";
import { AuthBuilder } from "@api/modules/auth/builders/AuthBuilder";
import { CurrentUserResponse } from "@api/modules/auth/models/CurrentUserResponse";
import { LoginResponse } from "@api/modules/auth/models/LoginResponse";
import { StatusAssertions } from "@api/shared/assertions/StatusAssertions";
import { ResponseUtil } from "@api/shared/utils/ResponseUtil";
import { test } from "@fixtures/api.fixture";

test(
  "Workflow - Authenticate User",
  {
    tag: ["@api", "@sanity", "@apiChainWorkflow", "@p1"],
  },
  async ({ authService }) => {
    let login: LoginResponse;
    let currentUser: CurrentUserResponse;

    await test.step("Authenticate user", async () => {
      const loginRequest = AuthBuilder.defaultLogin();

      const loginResponse = await authService.login(loginRequest);

      StatusAssertions.verifySuccess(loginResponse);

      login = await ResponseUtil.json<LoginResponse>(loginResponse);

      AuthAssertions.verifyLogin(loginResponse, login);
    });

    await test.step("Retrieve current user details", async () => {
      const currentUserResponse = await authService.getCurrentUser(login.accessToken);

      StatusAssertions.verifySuccess(currentUserResponse);

      currentUser = await ResponseUtil.json<CurrentUserResponse>(currentUserResponse);
    });

    await test.step("Verify authenticated user details", async () => {
      AuthAssertions.verifyAuthenticatedUser(login, currentUser);
    });
  }
);
