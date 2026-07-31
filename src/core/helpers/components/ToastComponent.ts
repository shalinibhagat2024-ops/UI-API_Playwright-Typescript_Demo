import { ComponentBase } from "@core/helpers/components/ComponentBase";
import { Locator, Page } from "@playwright/test";

export class ToastComponent extends ComponentBase {
  private static readonly DEFAULT_TIMEOUT = 15_000;

  constructor(page: Page, locator: Locator) {
    super(page, locator);
  }

  /**
   * Wait until the toast is visible.
   */
  async waitUntilVisible() {
    await this.waits.visible(this.locator, ToastComponent.DEFAULT_TIMEOUT);
  }

  /**
   * Wait until the toast disappears.
   */
  async waitUntilHidden() {
    await this.waits.hidden(this.locator, ToastComponent.DEFAULT_TIMEOUT);
  }

  /**
   * Verify the toast is visible.
   */
  async verifyVisible() {
    await this.waitUntilVisible();
    await this.assertions.visible(this.locator);
  }

  /**
   * Verify the toast is hidden.
   */
  async verifyHidden() {
    await this.waitUntilHidden();
    await this.assertions.hidden(this.locator);
  }

  /**
   * Verify the toast contains the expected message.
   */
  async verifyContains(expected: string | RegExp) {
    await this.verifyVisible();
    await this.assertions.containsText(this.locator, expected);
  }

  /**
   * Verify a success toast.
   */
  async verifySuccess(message: string | RegExp) {
    await this.verifyContains(message);
  }

  /**
   * Verify an error toast.
   */
  async verifyError(message: string | RegExp) {
    await this.verifyContains(message);
  }

  /**
   * Returns the toast message.
   */
  async getText(): Promise<string> {
    await this.waitUntilVisible();
    return this.getText();
  }
}
