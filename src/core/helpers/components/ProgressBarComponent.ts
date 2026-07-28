import { BaseComponent } from "@core/helpers/components/BaseComponent";
import { expect, Locator, Page } from "@playwright/test";

export class ProgressBarComponent extends BaseComponent {
  private static readonly DEFAULT_TIMEOUT = 30000;

  constructor(page: Page, locator: Locator) {
    super(page, locator);
  }

  /**
   * Returns current progress percentage.
   */
  async percentage(): Promise<number> {
    const value = await this.locator.getAttribute("aria-valuenow");
    return Number(value ?? 0);
  }

  /**
   * Wait until progress reaches the expected percentage.
   */
  async waitUntilPercentage(expected: number, timeout?: number): Promise<void> {
    await expect
      .poll(
        async () => {
          const value = await this.locator.getAttribute("aria-valuenow");
          return Number(value ?? 0);
        },
        timeout ? { timeout } : {}
      )
      .toBeGreaterThanOrEqual(expected);
  }

  /**
   * Wait until progress completes.
   */
  async waitUntilComplete(timeout = ProgressBarComponent.DEFAULT_TIMEOUT): Promise<void> {
    await this.waitUntilPercentage(100, timeout);
  }

  /**
   * Verify progress percentage.
   */
  async verifyPercentage(expected: number): Promise<void> {
    const actual = await this.percentage();

    if (actual !== expected) {
      throw new Error(`Expected progress ${expected}% but found ${actual}%`);
    }
  }

  /**
   * Returns true if completed.
   */
  async isCompleted(): Promise<boolean> {
    return (await this.percentage()) === 100;
  }
}
