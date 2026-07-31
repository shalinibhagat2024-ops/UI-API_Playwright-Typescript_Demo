import { ComponentBase } from "@core/helpers/components/ComponentBase";
import { Locator, Page } from "@playwright/test";

export class SpinnerComponent extends ComponentBase {
  private static readonly DEFAULT_TIMEOUT = 15000;

  constructor(page: Page, locator: Locator) {
    super(page, locator);
  }

  /**
   * Wait until spinner becomes visible.
   */
  async waitUntilVisible(timeout: number = SpinnerComponent.DEFAULT_TIMEOUT) {
    await this.waits.visible(this.locator, timeout);
  }

  /**
   * Wait until spinner disappears.
   */
  async waitUntilHidden(timeout: number = SpinnerComponent.DEFAULT_TIMEOUT) {
    await this.waits.hidden(this.locator, timeout);
  }

  /**
   * Verify spinner is visible.
   */
  async verifyVisible() {
    await this.assertions.visible(this.locator);
  }

  /**
   * Verify spinner is hidden.
   */
  async verifyHidden() {
    await this.assertions.hidden(this.locator);
  }

  /**
   * Returns spinner visibility.
   */
  async isLoading(): Promise<boolean> {
    return await this.locator.isVisible();
  }
}
