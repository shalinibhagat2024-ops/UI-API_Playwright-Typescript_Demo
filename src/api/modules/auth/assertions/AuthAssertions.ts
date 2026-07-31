import { CurrentUserResponse } from "@api/modules/auth/models/CurrentUserResponse";
import { LoginResponse } from "@api/modules/auth/models/LoginResponse";
import { CommonAssertions } from "@api/shared/assertions/CommonAssertions";
import { StatusAssertions } from "@api/shared/assertions/StatusAssertions";
import { APIResponse } from "@playwright/test";

export class AuthAssertions {
  // =====================================
  // Basic Validation
  // =====================================

  static verifyLoginResponse(login: LoginResponse): void {
    CommonAssertions.verifyId(login.id);

    CommonAssertions.verifyNotEmpty(login.username);

    CommonAssertions.verifyContains(login.email, "@");

    CommonAssertions.verifyNotEmpty(login.accessToken);

    CommonAssertions.verifyNotEmpty(login.refreshToken);
  }

  // =====================================
  // Login Validation
  // =====================================

  static verifyLogin(response: APIResponse, login: LoginResponse): void {
    StatusAssertions.verifySuccess(response);

    this.verifyLoginResponse(login);
  }

  // =====================================
  // Workflow Validation
  // =====================================

  static verifyAuthenticatedUser(login: LoginResponse, currentUser: CurrentUserResponse): void {
    this.verifyCurrentUser(currentUser);

    CommonAssertions.verifyNumber(currentUser.id, login.id);

    CommonAssertions.verifyString(currentUser.username, login.username);

    CommonAssertions.verifyString(currentUser.email, login.email);
  }

  static verifyCurrentUser(currentUser: CurrentUserResponse): void {
    CommonAssertions.verifyId(currentUser.id);

    CommonAssertions.verifyNotEmpty(currentUser.username);

    CommonAssertions.verifyContains(currentUser.email, "@");

    CommonAssertions.verifyNotEmpty(currentUser.firstName);

    CommonAssertions.verifyNotEmpty(currentUser.lastName);
  }
}
