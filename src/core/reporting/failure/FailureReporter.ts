import { TestInfo } from "@playwright/test";

export class FailureReporter {
  public static async attach(testInfo: TestInfo) {
    // Exit if the test passed
    if (testInfo.status === testInfo.expectedStatus) {
      return;
    }
  }
}
