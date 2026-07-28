import { BaseComponent } from "@core/helpers/components/BaseComponent";
import { Locator, Page } from "@playwright/test";

export class SpinnerComponent extends BaseComponent {
  private static readonly DEFAULT_TIMEOUT = 15000;

  constructor(page: Page, locator: Locator) {
    super(page, locator);
  }

  /**
   * Wait until spinner becomes visible.
   */
  async waitUntilVisible(timeout: number = SpinnerComponent.DEFAULT_TIMEOUT): Promise<void> {
    await this.waits.visible(this.locator, timeout);
  }

  /**
   * Wait until spinner disappears.
   */
  async waitUntilHidden(timeout: number = SpinnerComponent.DEFAULT_TIMEOUT): Promise<void> {
    await this.waits.hidden(this.locator, timeout);
  }

  /**
   * Verify spinner is visible.
   */
  async verifyVisible(): Promise<void> {
    await this.assertions.visible(this.locator);
  }

  /**
   * Verify spinner is hidden.
   */
  async verifyHidden(): Promise<void> {
    await this.assertions.hidden(this.locator);
  }

  /**
   * Returns spinner visibility.
   */
  async isLoading(): Promise<boolean> {
    return await this.locator.isVisible();
  }
}
