import { UserListResponse } from "@api/modules/users/models/UserListResponse";
import { UserRequest } from "@api/modules/users/models/UserRequest";
import { UserResponse } from "@api/modules/users/models/UserResponse";
import { StatusAssertions } from "@api/shared/assertions/StatusAssertions";
import { HttpStatus } from "@api/shared/constants/HttpStatus";
import { APIResponse, expect } from "@playwright/test";
import { CommonAssertions } from "src/api/shared/assertions/CommonAssertions";

export class UserAssertions {
  // =====================================
  // Basic Validation
  // =====================================

  static verifyUser(user: UserResponse): void {
    CommonAssertions.verifyId(user.id);

    CommonAssertions.verifyNotEmpty(user.firstName);

    CommonAssertions.verifyNotEmpty(user.lastName);

    CommonAssertions.verifyContains(user.email, "@");
  }

  static verifyUserList(users: UserListResponse): void {
    CommonAssertions.verifyArrayNotEmpty(users.users);

    CommonAssertions.verifyGreaterThan(users.total, 0);
  }

  // =====================================
  // CRUD Validation
  // =====================================

  static verifyCreatedUser(response: APIResponse, request: UserRequest, user: UserResponse): void {
    StatusAssertions.verifyStatus(response, HttpStatus.CREATED);

    this.verifyUser(user);

    CommonAssertions.verifyString(user.firstName, request.firstName);

    CommonAssertions.verifyString(user.lastName, request.lastName);

    CommonAssertions.verifyString(user.email, request.email);
  }

  static verifyUpdatedUser(
    response: APIResponse,
    user: UserResponse,
    expectedFirstName: string
  ): void {
    StatusAssertions.verifySuccess(response);

    this.verifyUser(user);

    CommonAssertions.verifyString(user.firstName, expectedFirstName);
  }

  static verifyDeletedUser(response: APIResponse): void {
    StatusAssertions.verifySuccess(response);
  }

  static verifyUsersExist(users: UserListResponse): void {
    expect(users.users.length).toBeGreaterThan(0);
  }

  // =====================================
  // Workflow Validation
  // =====================================

  static verifyUserWorkflow(response: APIResponse, request: UserRequest, user: UserResponse): void {
    this.verifyCreatedUser(response, request, user);
  }
}
