import { APIResponse, expect } from "@playwright/test";

export class ResponseAssertions {
  // Verify response is successful (2xx)

  static verifySuccess(response: APIResponse): void {
    expect(response.ok()).toBeTruthy();
  }

  //Verify Content-Type

  static verifyContentType(response: APIResponse, expectedContentType: string): void {
    const contentType = response.headers()["content-type"];

    expect(contentType).toContain(expectedContentType);
  }

  //Verify Header Exists

  static verifyHeaderExists(response: APIResponse, headerName: string): void {
    expect(response.headers()).toHaveProperty(headerName);
  }

  //Verify Header Value

  static verifyHeaderValue(response: APIResponse, headerName: string, expectedValue: string): void {
    expect(response.headers()[headerName]).toContain(expectedValue);
  }

  //Verify Response Body Exists

  static async verifyBodyNotEmpty(response: APIResponse) {
    const body = await response.text();

    expect(body.length).toBeGreaterThan(0);
  }

  //Verify Response Time

  static verifyResponseTime(duration: number, expectedTime: number): void {
    expect(duration).toBeLessThan(expectedTime);
  }

  // Verify JSON Response

  static async verifyJson(response: APIResponse) {
    await expect(async () => {
      await response.json();
    }).not.toThrow();
  }

  //Verify Empty Response

  static async verifyEmptyBody(response: APIResponse) {
    const body = await response.text();

    expect(body).toBe("");
  }
}
