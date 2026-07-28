import { BaseComponent } from "@core/helpers/components/BaseComponent";
import { Locator, Page } from "@playwright/test";

export class ToastComponent extends BaseComponent {
  private static readonly DEFAULT_TIMEOUT = 15_000;

  constructor(page: Page, locator: Locator) {
    super(page, locator);
  }

  /**
   * Wait until the toast is visible.
   */
  async waitForToast(): Promise<void> {
    await this.waits.visible(this.locator, ToastComponent.DEFAULT_TIMEOUT);
  }

  /**
   * Verify toast contains text.
   */
  async verifyContains(expected: string | RegExp): Promise<void> {
    await this.waitForToast();

    await this.assertions.containsText(this.locator, expected);
  }

  /**
   * Verify success toast.
   * Wrapper around verifyContains() for readability.
   */
  async verifySuccess(message: string | RegExp): Promise<void> {
    await this.verifyContains(message);
  }

  /**
   * Verify error toast.
   * Wrapper around verifyContains() for readability.
   */
  async verifyError(message: string | RegExp): Promise<void> {
    await this.verifyContains(message);
  }
}
