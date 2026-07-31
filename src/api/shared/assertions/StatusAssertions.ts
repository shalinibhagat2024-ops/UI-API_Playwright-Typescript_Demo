import { HttpStatus } from "@api/shared/constants/HttpStatus";
import { APIResponse, expect } from "@playwright/test";

export class StatusAssertions {
  static verifySuccess(response: APIResponse): void {
    expect(response.ok()).toBeTruthy();
  }

  static verifyStatus(response: APIResponse, expectedStatus: HttpStatus): void {
    expect(response.status()).toBe(expectedStatus);
  }
}
