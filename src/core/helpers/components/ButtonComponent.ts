import { BaseComponent } from "@core/helpers/components/BaseComponent";
import { Locator, Page } from "@playwright/test";

export class ButtonComponent extends BaseComponent {
  constructor(page: Page, locator: Locator) {
    super(page, locator);
  }

  /**
   * Click button.
   * Supports Playwright click options.
   */
  async click(options?: Parameters<Locator["click"]>[0]): Promise<void> {
    await this.actions.click(this.locator, options);
  }

  /**
   * Double click button.
   */
  async doubleClick(): Promise<void> {
    await this.actions.doubleClick(this.locator);
  }

  /**
   * Right click button.
   */
  async rightClick(): Promise<void> {
    await this.actions.rightClick(this.locator);
  }

  /**
   * Verify button text.
   */
  async verifyText(expected: string | RegExp): Promise<void> {
    await this.assertions.text(this.locator, expected);
  }

  /**
   * Verify button is enabled.
   */
  async verifyEnabled(): Promise<void> {
    await this.assertions.enabled(this.locator);
  }

  /**
   * Verify button is disabled.
   */
  async verifyDisabled(): Promise<void> {
    await this.assertions.disabled(this.locator);
  }
}
